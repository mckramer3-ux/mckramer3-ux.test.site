(function () {
  var cfg = window.RS_TEST_CONFIG || {};
  var MAX_ERRORS = 8;
  var errors = [];
  var dsCache = {};
  var dsLastReadAt = 0;
  var dsInFlight = false;

  function hasWebApp() {
    return !!(window.Telegram && Telegram.WebApp);
  }

  function getTelegramStorage() {
    if (!hasWebApp()) {
      return null;
    }

    var webApp = Telegram.WebApp;
    return webApp.DeviceStorage || webApp.deviceStorage || webApp.CloudStorage || webApp.cloudStorage || null;
  }

  function hasDeviceStorage() {
    return !!getTelegramStorage();
  }

  function safe(fn, fallback) {
    try {
      return fn();
    } catch (_) {
      return fallback;
    }
  }

  function getCookie(name) {
    var esc = name.replace(/[$()*+./?[\\\]^{|}-]/g, "\\$&");
    var m = document.cookie.match(new RegExp("(?:^|; )" + esc + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : null;
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

  function getProjectKey() {
    return String(cfg.projectKey || cfg.projectId || "");
  }

  function telegramScopedKey(name) {
    return resolvePrefix() + "_" + getProjectKey() + "_" + name;
  }

  function getReadKeys() {
    var keys = [];
    (cfg.storageKeys || []).forEach(function (k) {
      keys.push(telegramScopedKey(k));
    });

    if (keys.indexOf("roistat_visit") === -1) {
      keys.push("roistat_visit");
    }

    return keys;
  }

  function pushErr(msg) {
    errors.push(new Date().toISOString() + " " + msg);
    if (errors.length > MAX_ERRORS) {
      errors.shift();
    }
  }

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

  window.addEventListener("error", function (e) {
    pushErr("error: " + (e.message || e.type) + " @" + (e.filename || "") + ":" + (e.lineno || 0));
  });

  window.addEventListener("unhandledrejection", function (e) {
    var r = e.reason && (e.reason.message || String(e.reason));
    pushErr("promise: " + (r || "unknown"));
  });

  function dsGetItem(storage, key, cb) {
    var done = once(function (err, value) {
      cb(err, value);
    });

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

  function readDeviceStorage(force) {
    var storage = getTelegramStorage();
    if (!storage) {
      return;
    }

    var now = Date.now();
    if (!force && now - dsLastReadAt < 1000) {
      return;
    }

    if (dsInFlight) {
      return;
    }

    dsInFlight = true;
    dsLastReadAt = now;

    var keys = getReadKeys();
    var left = keys.length;
    if (!left) {
      dsInFlight = false;
      return;
    }

    keys.forEach(function (k) {
      dsGetItem(storage, k, function (err, value) {
        if (err) {
          dsCache[k] = "ERR: " + (err.message || String(err));
        } else if (value == null || value === "") {
          dsCache[k] = "(empty)";
        } else {
          dsCache[k] = String(value);
        }

        left -= 1;
        if (left === 0) {
          dsInFlight = false;
        }
      });
    });
  }

  function clearRoistatCookies() {
    ["roistat_visit", "roistat_first_visit", "roistat_marker"].forEach(function (k) {
      document.cookie = k + "=; Max-Age=0; path=/; SameSite=Lax";
    });
  }

  function clearRoistatLs() {
    safe(function () {
      localStorage.removeItem("roistat_visit");
      localStorage.removeItem("roistat_first_visit");
      localStorage.removeItem("roistat_marker");
    }, null);
  }

  function render() {
    var lines = [];
    var wa = hasWebApp();

    lines.push("Telegram:");
    lines.push("  has Telegram.WebApp: " + wa);
    lines.push("  has Device/CloudStorage: " + hasDeviceStorage());
    lines.push("  initData length: " + (wa ? safe(function () { return (Telegram.WebApp.initData || "").length; }, 0) : 0));
    lines.push("  platform/version: " + (wa ? (safe(function () { return Telegram.WebApp.platform; }, "n/a") + "/" + safe(function () { return Telegram.WebApp.version; }, "n/a")) : "n/a"));

    lines.push("");
    lines.push("Test config:");
    lines.push("  projectKey: " + getProjectKey());
    lines.push("  storagePrefix: " + resolvePrefix());

    var st = window.__rsLoaderStatus || { state: "idle", stage: "idle", src: "", error: "" };
    lines.push("");
    lines.push("Module loader:");
    lines.push("  state: " + st.state);
    lines.push("  stage: " + st.stage);
    lines.push("  usedInitEndpoint: " + !!st.usedInitEndpoint);
    lines.push("  src: " + st.src);
    lines.push("  storageKey(main): " + (st.storageKey || ""));
    lines.push("  storageKey(legacy): roistat_visit");
    if (st.restoredVisit) {
      lines.push("  restoredVisit: " + st.restoredVisit);
    }
    if (st.error) {
      lines.push("  error: " + st.error);
    }

    lines.push("");
    lines.push("Roistat:");
    lines.push("  window.roistat: " + !!window.roistat);
    lines.push("  getVisit(): " + safe(function () { return window.roistat && window.roistat.getVisit && window.roistat.getVisit(); }, "n/a"));
    lines.push("  getSource(): " + safe(function () { return window.roistat && window.roistat.getSource && window.roistat.getSource(); }, "n/a"));

    lines.push("");
    lines.push("Cookies/localStorage:");
    ["roistat_visit", "roistat_first_visit", "roistat_marker"].forEach(function (k) {
      lines.push("  cookie " + k + ": " + String(getCookie(k)));
      lines.push("  localStorage " + k + ": " + String(safe(function () { return localStorage.getItem(k); }, null)));
    });

    lines.push("");
    lines.push("DeviceStorage:");
    getReadKeys().forEach(function (k) {
      lines.push("  " + k + " = " + String(dsCache[k] || "(not read yet)"));
    });

    if (errors.length) {
      lines.push("");
      lines.push("Errors:");
      errors.forEach(function (e) {
        lines.push("  " + e);
      });
    }

    overlay.textContent = lines.join("\n");
  }

  var overlay = document.createElement("pre");
  overlay.style.cssText = [
    "position:fixed", "left:0", "right:0", "bottom:0", "max-height:55vh",
    "margin:0", "padding:10px", "overflow:auto", "z-index:2147483647",
    "background:#10151c", "color:#9fffa4", "font:12px/1.45 ui-monospace, SFMono-Regular, Menlo, monospace",
    "white-space:pre-wrap", "border-top:1px solid #263243"
  ].join(";");

  window.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(overlay);

    var btnRefresh = document.getElementById("btn-force-refresh");
    var btnCookie = document.getElementById("btn-clear-cookie");
    var btnLs = document.getElementById("btn-clear-ls");

    if (btnRefresh) {
      btnRefresh.addEventListener("click", function () {
        readDeviceStorage(true);
        render();
      });
    }

    if (btnCookie) {
      btnCookie.addEventListener("click", function () {
        clearRoistatCookies();
        render();
      });
    }

    if (btnLs) {
      btnLs.addEventListener("click", function () {
        clearRoistatLs();
        render();
      });
    }
  });

  window.addEventListener("rs:module-status", render);

  setInterval(function () {
    readDeviceStorage(false);
    render();
  }, 250);
})();
