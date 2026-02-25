(function () {
  var cfg = window.RS_TEST_CONFIG || {};
  var VISIT_COOKIE = "roistat_visit";
  var LEGACY_TELEGRAM_VISIT_STORAGE_KEY = VISIT_COOKIE;
  var UTM_SOURCE_QUERY_PARAM = "utm_source";
  var TELEGRAM_MINI_APP_UTM_SOURCE = "telegram_mini_app";
  var saveVisitToTelegramStorageHook = "roistatSaveVisitToTelegramStorage";

  var status = {
    state: "idle",
    stage: "init",
    src: "",
    error: "",
    storageKey: "",
    legacyStorageKey: LEGACY_TELEGRAM_VISIT_STORAGE_KEY,
    restoredVisit: "",
    usedInitEndpoint: false
  };
  window.__rsLoaderStatus = status;

  function emit() {
    window.dispatchEvent(new CustomEvent("rs:module-status", { detail: status }));
  }

  function handleErrorSilently() {}

  function once(callback) {
    var isCalled = false;
    return function () {
      if (isCalled) {
        return;
      }

      isCalled = true;
      callback.apply(null, arguments);
    };
  }

  function getProjectKey() {
    return String(cfg.projectKey || cfg.projectId || "");
  }

  function isVisitValueValid(visitValue) {
    if (typeof visitValue !== "string" || visitValue === "") {
      return false;
    }

    return visitValue !== "null" && visitValue !== "undefined";
  }

  function hasVisitCookie() {
    return /^.*roistat_visit=[^;]+(.*)?$/.test(document.cookie);
  }

  function getCookie(name) {
    var esc = name.replace(/[$()*+./?[\\\]^{|}-]/g, "\\$&");
    var m = document.cookie.match(new RegExp("(?:^|; )" + esc + "=([^;]*)"));
    if (!m) {
      return null;
    }

    try {
      return decodeURIComponent(m[1]);
    } catch (_) {
      return m[1];
    }
  }

  function resolveCookieDomain() {
    if (typeof window.roistatCookieDomain === "string" && window.roistatCookieDomain !== "") {
      return window.roistatCookieDomain;
    }

    if (typeof cfg.cookieDomain === "string" && cfg.cookieDomain !== "") {
      return cfg.cookieDomain;
    }

    return "";
  }

  function setVisitCookie(visitValue) {
    if (!isVisitValueValid(visitValue)) {
      return;
    }

    var cookie = VISIT_COOKIE + "=" + encodeURIComponent(visitValue) + "; path=/";
    var cookieDomain = resolveCookieDomain();
    if (cookieDomain) {
      cookie += "; domain=" + cookieDomain;
    }

    document.cookie = cookie;
  }

  function resolvePrefix() {
    if (typeof cfg.storagePrefix === "string" && cfg.storagePrefix !== "") {
      return cfg.storagePrefix;
    }

    if (typeof window.maCookiePrefix === "string" && window.maCookiePrefix !== "") {
      return window.maCookiePrefix;
    }

    return "roistat";
  }

  function getTelegramVisitStorageKey() {
    return resolvePrefix() + "_" + getProjectKey() + "_" + VISIT_COOKIE;
  }

  function isTelegramMiniAppContext() {
    return !!(window.Telegram && Telegram.WebApp);
  }

  function canAppendTelegramUtmSource() {
    try {
      if (typeof window.URLSearchParams === "function") {
        var utmSource = new window.URLSearchParams(document.location.search || "").get(UTM_SOURCE_QUERY_PARAM);
        return typeof utmSource !== "string" || utmSource === "";
      }
    } catch (e) {
      handleErrorSilently(e);
    }

    var utmSourceMatch = (document.location.search || "").match(/(?:^|[?&])utm_source=([^&]*)/);
    if (utmSourceMatch === null) {
      return true;
    }

    try {
      return decodeURIComponent(utmSourceMatch[1] || "") === "";
    } catch (_) {
      return (utmSourceMatch[1] || "") === "";
    }
  }

  function buildInitUrl() {
    var initUrl = "/api/site/1.0/" + encodeURIComponent(getProjectKey()) + "/init?referrer=" + encodeURIComponent(document.location.href);
    if (isTelegramMiniAppContext() && canAppendTelegramUtmSource()) {
      initUrl += "&utm_source=" + encodeURIComponent(TELEGRAM_MINI_APP_UTM_SOURCE);
    }

    return initUrl;
  }

  function getTelegramStorage() {
    var webApp = window.Telegram && Telegram.WebApp;
    if (!webApp) {
      return null;
    }

    return webApp.DeviceStorage || webApp.deviceStorage || webApp.CloudStorage || webApp.cloudStorage || null;
  }

  function getStorageItem(storage, key, callback) {
    var done = once(function (error, value) {
      callback(error, value);
    });

    try {
      var result = storage.getItem(key, function (error, value) {
        done(error, value);
      });

      if (result && typeof result.then === "function") {
        result.then(function (value) {
          done(null, value);
        }, function (error) {
          done(error);
        });
        return;
      }

      if (typeof result !== "undefined") {
        done(null, result);
      }
    } catch (e) {
      done(e);
    }
  }

  function setStorageItem(storage, key, value, callback) {
    var done = once(function (error) {
      callback(error);
    });

    if (!storage || typeof storage.setItem !== "function") {
      done(new Error("StorageSetItemUnsupported"));
      return;
    }

    try {
      var result = storage.setItem(key, value, function (error) {
        done(error || null);
      });

      if (result && typeof result.then === "function") {
        result.then(function () {
          done(null);
        }, function (error) {
          done(error);
        });
        return;
      }

      if (typeof result !== "undefined") {
        done(null);
      }
    } catch (e) {
      done(e);
    }
  }

  function saveVisitToTelegramStorage(visitValue) {
    if (!isVisitValueValid(visitValue)) {
      return;
    }

    var storage = getTelegramStorage();
    if (!storage) {
      return;
    }

    var storageKey = getTelegramVisitStorageKey();
    setStorageItem(storage, storageKey, visitValue, function () {});
    if (storageKey !== LEGACY_TELEGRAM_VISIT_STORAGE_KEY) {
      setStorageItem(storage, LEGACY_TELEGRAM_VISIT_STORAGE_KEY, visitValue, function () {});
    }
  }

  function loadCounter() {
    var host = String(cfg.roistatHost || "cloud.roistat.com");
    var protocol = document.location.protocol === "https:" ? "https://" : "http://";
    var hasCookie = hasVisitCookie();
    var src = "";

    window.roistatHost = host;
    window.roistatProjectId = getProjectKey();

    if (typeof cfg.moduleUrl === "string" && cfg.moduleUrl !== "") {
      src = cfg.moduleUrl;
      status.usedInitEndpoint = false;
    } else if (hasCookie) {
      src = protocol + host + "/dist/module.js";
      status.usedInitEndpoint = false;
    } else {
      src = protocol + host + buildInitUrl();
      status.usedInitEndpoint = true;
    }

    status.state = "loading";
    status.stage = hasCookie ? "load-module-direct" : "load-module-init";
    status.src = src;
    status.error = "";
    emit();

    var script = document.createElement("script");
    script.async = true;
    script.charset = "UTF-8";
    script.src = src;

    script.onload = function () {
      status.state = "loaded";
      status.stage = "module-loaded";
      status.error = "";
      emit();
    };

    script.onerror = function () {
      status.state = "error";
      status.stage = "module-load-error";
      status.error = "Failed to load " + src;
      emit();
    };

    document.head.appendChild(script);
  }

  function setupRoistatHooks() {
    window.roistatMultiWidgetOnly = true;
    window.roistatOnlineChatOnly = false;

    window[saveVisitToTelegramStorageHook] = function () {
      var cookieVisit = getCookie(VISIT_COOKIE);
      if (isVisitValueValid(cookieVisit)) {
        saveVisitToTelegramStorage(cookieVisit);
        return;
      }

      try {
        if (window.roistat && typeof window.roistat.getVisit === "function") {
          var roistatVisit = window.roistat.getVisit();
          if (roistatVisit !== null && typeof roistatVisit !== "undefined") {
            saveVisitToTelegramStorage(String(roistatVisit));
          }
        }
      } catch (e) {
        handleErrorSilently(e);
      }
    };

    window.onRoistatAllModulesLoaded = function () {
      var sharedData = window.__sharedData || {};

      if (typeof window.setRoistatOnlineChatCustomParams === "function") {
        window.setRoistatOnlineChatCustomParams({
          user_id: sharedData.user_id || null,
          user_name: sharedData.user_name || null,
          user_email: sharedData.chat_user_email || null,
          project_id: sharedData.project_id || getProjectKey(),
          user_agent: window.navigator.userAgent,
          current_page: window.location.pathname
        });
      }

      if (typeof window[saveVisitToTelegramStorageHook] === "function") {
        window[saveVisitToTelegramStorageHook]();
      }
    };
  }

  function resolveVisitAndLoadCounter(visitValue) {
    if (isVisitValueValid(visitValue)) {
      status.restoredVisit = visitValue;
      setVisitCookie(visitValue);
      saveVisitToTelegramStorage(visitValue);
    }

    loadCounter();
  }

  function readStorageAndLoadCounter() {
    status.stage = "read-storage";
    status.storageKey = getTelegramVisitStorageKey();
    status.error = "";
    emit();

    if (hasVisitCookie()) {
      status.stage = "cookie-already-exists";
      status.restoredVisit = getCookie(VISIT_COOKIE) || "";
      emit();
      saveVisitToTelegramStorage(status.restoredVisit);
      loadCounter();
      return;
    }

    var storage = getTelegramStorage();
    if (!storage || typeof storage.getItem !== "function") {
      status.stage = "storage-unavailable";
      emit();
      loadCounter();
      return;
    }

    getStorageItem(storage, status.storageKey, function (error, visitValue) {
      if (error) {
        status.stage = "storage-main-error";
        status.error = String(error && (error.message || error));
        emit();
        resolveVisitAndLoadCounter(null);
        return;
      }

      if (isVisitValueValid(visitValue)) {
        status.stage = "storage-main-hit";
        emit();
        resolveVisitAndLoadCounter(visitValue);
        return;
      }

      status.stage = "storage-main-empty";
      emit();

      getStorageItem(storage, LEGACY_TELEGRAM_VISIT_STORAGE_KEY, function (legacyError, legacyVisitValue) {
        if (legacyError) {
          status.stage = "storage-legacy-error";
          status.error = String(legacyError && (legacyError.message || legacyError));
          emit();
          resolveVisitAndLoadCounter(null);
          return;
        }

        status.stage = isVisitValueValid(legacyVisitValue) ? "storage-legacy-hit" : "storage-legacy-empty";
        emit();
        resolveVisitAndLoadCounter(legacyVisitValue);
      });
    });
  }

  window.addEventListener("DOMContentLoaded", function () {
    var pid = document.getElementById("pid");
    var murl = document.getElementById("murl");

    if (pid) {
      pid.textContent = getProjectKey();
    }

    if (murl) {
      murl.textContent = cfg.moduleUrl || "(auto: init/dist from roistatHost)";
    }

    if (window.Telegram && Telegram.WebApp) {
      try {
        Telegram.WebApp.ready();
      } catch (_) {}
    }

    setupRoistatHooks();
    readStorageAndLoadCounter();
  });
})();
