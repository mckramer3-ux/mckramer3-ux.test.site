(function () {
  var cfg = window.RS_TEST_CONFIG || {};
  window.roistatProjectId = cfg.projectId;
  window.roistatHost = cfg.roistatHost;

  var status = { state: "idle", src: "", error: "" };
  window.__rsLoaderStatus = status;

  function emit() {
    window.dispatchEvent(new CustomEvent("rs:module-status", { detail: status }));
  }

  function buildSrc() {
    var src = cfg.moduleUrl || "";
    var params = [];
    if (cfg.fixedVersion) params.push("v=" + encodeURIComponent(cfg.fixedVersion));
    if (cfg.cacheBust) params.push("cb=" + Date.now());
    if (!params.length) return src;
    return src + (src.indexOf("?") >= 0 ? "&" : "?") + params.join("&");
  }

  function loadModule() {
    var src = buildSrc();
    status.state = "loading";
    status.src = src;
    status.error = "";
    emit();

    var s = document.createElement("script");
    s.async = true;
    s.charset = "UTF-8";
    s.src = src;

    s.onload = function () {
      status.state = "loaded";
      status.error = "";
      emit();
    };

    s.onerror = function () {
      status.state = "error";
      status.error = "Failed to load " + src;
      emit();
    };

    document.head.appendChild(s);
  }

  window.addEventListener("DOMContentLoaded", function () {
    var pid = document.getElementById("pid");
    var murl = document.getElementById("murl");
    if (pid) pid.textContent = String(cfg.projectId || "");
    if (murl) murl.textContent = String(cfg.moduleUrl || "");

    if (window.Telegram && Telegram.WebApp) {
      try { Telegram.WebApp.ready(); } catch (_) {}
    }

    loadModule();
  });
})();
