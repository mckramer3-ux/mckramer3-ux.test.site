(function () {
  var cfg = window.RS_TEST_CONFIG || {};
  var VISIT_COOKIE = "roistat_visit";
  var LEGACY_TELEGRAM_VISIT_STORAGE_KEY = VISIT_COOKIE;

  var status = {
    state: "idle",
    stage: "init",
    src: "",
    error: "",
    storageKey: "",
    legacyStorageKey: LEGACY_TELEGRAM_VISIT_STORAGE_KEY,
    restoredVisit: ""
  };
  window.__rsLoaderStatus = status;

  function emit() {
    window.dispatchEvent(new CustomEvent("rs:module-status", { detail: status }));
  }

  function isVisitValueValid(visitValue) {
    return typeof visitValue === "string" && visitValue !== "";
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

  function setVisitCookie(visitValue) {
    if (!isVisitValueValid(visitValue)) {
      return;
    }

    var cookie = VISIT_COOKIE + "=" + encodeURIComponent(visitValue) + "; path=/";
    if (cfg.cookieDomain) {
      cookie += "; domain=" + cfg.cookieDomain;
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
    var projectKey = String(cfg.projectKey || cfg.projectId || "");
    return resolvePrefix() + "_" + projectKey + "_" + VISIT_COOKIE;
  }

  function getTelegramStorage() {
    var webApp = window.Telegram && Telegram.WebApp;
    if (!webApp) {
      return null;
    }

    return webApp.DeviceStorage || webApp.deviceStorage || webApp.CloudStorage || webApp.cloudStorage || null;
  }

  function getStorageItem(storage, key, cb) {
    var called = false;

    function done(err, value) {
      if (called) {
        return;
      }

      called = true;
      cb(err, value);
    }

    try {
      var ret = storage.getItem(key, function (err, value) {
        done(err, value);
      });

      if (ret && typeof ret.then === "function") {
        ret.then(function (value) {
          done(null, value);
        }).catch(function (err) {
          done(err);
        });
      } else if (typeof ret !== "undefined") {
        done(null, ret);
      }
    } catch (e) {
      done(e);
    }
  }

  function buildSrc() {
    var src = cfg.moduleUrl || "";
    var params = [];

    if (cfg.fixedVersion) {
      params.push("v=" + encodeURIComponent(cfg.fixedVersion));
    }

    if (cfg.cacheBust) {
      params.push("cb=" + Date.now());
    }

    if (!params.length) {
      return src;
    }

    return src + (src.indexOf("?") >= 0 ? "&" : "?") + params.join("&");
  }

  function loadModule() {
    var src = buildSrc();

    window.roistatProjectId = cfg.projectKey || cfg.projectId;
    window.roistatHost = cfg.roistatHost;

    status.state = "loading";
    status.stage = "load-module";
    status.src = src;
    status.error = "";
    emit();

    var s = document.createElement("script");
    s.async = true;
    s.charset = "UTF-8";
    s.src = src;

    s.onload = function () {
      status.state = "loaded";
      status.stage = "module-loaded";
      status.error = "";
      emit();
    };

    s.onerror = function () {
      status.state = "error";
      status.stage = "module-load-error";
      status.error = "Failed to load " + src;
      emit();
    };

    document.head.appendChild(s);
  }

  function resolveVisitAndLoadCounter(visitValue) {
    if (isVisitValueValid(visitValue)) {
      status.restoredVisit = visitValue;
      setVisitCookie(visitValue);
    }

    loadModule();
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
      loadModule();
      return;
    }

    var storage = getTelegramStorage();
    if (!storage || typeof storage.getItem !== "function") {
      status.stage = "storage-unavailable";
      emit();
      loadModule();
      return;
    }

    getStorageItem(storage, status.storageKey, function (err, visitValue) {
      if (err) {
        status.stage = "storage-main-error";
        status.error = String(err && (err.message || err));
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
      getStorageItem(storage, LEGACY_TELEGRAM_VISIT_STORAGE_KEY, function (legacyErr, legacyVisitValue) {
        if (legacyErr) {
          status.stage = "storage-legacy-error";
          status.error = String(legacyErr && (legacyErr.message || legacyErr));
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
      pid.textContent = String(cfg.projectKey || cfg.projectId || "");
    }

    if (murl) {
      murl.textContent = String(cfg.moduleUrl || "");
    }

    if (window.Telegram && Telegram.WebApp) {
      try {
        Telegram.WebApp.ready();
      } catch (_) {}
    }

    readStorageAndLoadCounter();
  });
})();
