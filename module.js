/* JSON */
if (!JSON) {
    var JSON; if (!JSON) { JSON = {}; } (function () { 'use strict'; function f(n) { return n < 10 ? '0' + n : n; } if (typeof Date.prototype.toJSON !== 'function') { Date.prototype.toJSON = function (key) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null; }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) { return this.valueOf(); }; } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\' }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }) + '"' : '"' + string + '"'; } function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === 'object' && typeof value.toJSON === 'function') { value = value.toJSON(key); } if (typeof rep === 'function') { value = rep.call(holder, key, value); } switch (typeof value) { case 'string': return quote(value); case 'number': return isFinite(value) ? String(value) : 'null'; case 'boolean': case 'null': return String(value); case 'object': if (!value) { return 'null'; } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === '[object Array]') { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || 'null'; } v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']'; gap = mind; return v; } if (rep && typeof rep === 'object') { length = rep.length; for (i = 0; i < length; i += 1) { if (typeof rep[i] === 'string') { k = rep[i]; v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } else { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}'; gap = mind; return v; } } if (typeof JSON.stringify !== 'function') { JSON.stringify = function (value, replacer, space) { var i; gap = ''; indent = ''; if (typeof space === 'number') { for (i = 0; i < space; i += 1) { indent += ' '; } } else if (typeof space === 'string') { indent = space; } rep = replacer; if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) { throw new Error('JSON.stringify'); } return str('', {'': value}); }; } if (typeof JSON.parse !== 'function') { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === 'object') { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v; } else { delete value[k]; } } } } return reviver.call(holder, key, value); } text = String(text); cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }); } if (/^[\],:{}\s]*$/ .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@') .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']') .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) { j = eval('(' + text + ')'); return typeof reviver === 'function' ? walk({'': j}, '') : j; } throw new SyntaxError('JSON.parse'); }; } }());
}

/* Trim */
if (!String.prototype.trim) {
    (function() {
        var regTrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
            return this.replace(regTrim, '');
        };
    })();
}

/* Element.prototype.closest IE8+ polyfill */
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while ((i < 0) && (el = el.parentElement));
        return el;
    };
}

/* Module */
(function(window, document, undefined) {
    function documentReadyCallback(callback) {
        if (typeof callback !== 'function') {
            return;
        }

        var called = false;
        function wrappedCallback() {
            if (!called) {
                called = true;
                callback();
                if (typeof document.removeEventListener === 'function') {
                    document.removeEventListener('DOMContentLoaded', wrappedCallback);
                }
            }
        }

        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            wrappedCallback();
        } else {
            _addEventListener(document, 'DOMContentLoaded', wrappedCallback);
        }
    }

    /**
     * @returns {String}
     */
    var getWhiteLabelPrefix = function () {
        var redefinedPrefix = window.maCookiePrefix;
        return typeof redefinedPrefix === 'string' ? redefinedPrefix : 'roistat';
    };
    var WHITE_LABEL_PREFIX = getWhiteLabelPrefix();

    /**
     * @returns {String}
     */
    var getHost = function () {
        return window[WHITE_LABEL_PREFIX + 'Host'];
    }

    var DEBUG_MODE                           = false,
        SCRIPT_VERSION                       = '401',
        SETTINGS_VERSION                     = 13,
        XOR_KEY                              = 42,
        ROISTAT_HOST                         = getHost(),
        API_VERSION                          = '0.2',
        API_VERSION_NEW                      = '1.0',
        ROISTAT_VISIT_COOKIE_EXPIRE          = 'roistat_visit_cookie_expire',
        ROISTAT_VISIT_COOKIE                 = 'roistat_visit',
        ROISTAT_COOKIES_TO_RESAVE_COOKIE     = 'roistat_cookies_to_resave',
        ROISTAT_GUID_COOKIE                  = 'roistat_guid',
        ROISTAT_NEXT_GUID_COOKIE             = 'roistat_next_guid',
        ROISTAT_FIRST_VISIT_COOKIE           = 'roistat_first_visit',
        ROISTAT_LISTEN_REQUESTS_COOKIE       = 'roistat_is_need_listen_requests',
        ROISTAT_SAVE_DATA_IN_COOKIE          = 'roistat_is_save_data_in_cookie',
        ROISTAT_IS_NEED_DISABLE_COLLECTOR    = 'roistat_is_need_disable_collector',
        ROISTAT_PHONE_COOKIE                 = 'roistat_phone',
        ROISTAT_RAW_PHONE_COOKIE             = 'roistat_raw_phone',
        EXTERNAL_COUNTERS_ENABLED            = 'roistat_externalCountersEnabled',
        REFERRER_COOKIE                      = 'roistat_referrer',
        MARKER_COOKIE                        = 'roistat_marker',
        MARKER_OLD_COOKIE                    = 'roistat_marker_old',
        ROISTAT_AB_COOKIE                    = 'roistat_ab',
        ROISTAT_PREVIOUS_AB_COOKIE           = 'roistat_previous_ab',
        ROISTAT_AB_SUBMIT_COOKIE             = 'roistat_ab_submit',
        PREVIOUS_AB_COOKIE_EXPIRE_TIME       = 35*24*60*60,
        ROISTAT_MARKER_PARAM                 = 'rs',
        ROISTAT_MARKER_PARAM_FULL            = 'roistat',
        LEAD_HUNTER_EXPIRE_COOKIE            = 'leadhunter_expire',
        LEAD_HUNTER_EXPIRE_TIME              = 5*60*60,
        LEAD_HUNTER_ENABLED                  = 'roistat_leadHunterEnabled',
        LEAD_HUNTER_TARGET_PAGES_MAP         = 'roistat_leadHunterTargetPagesMap',
        LEAD_HUNTER_CALLBACK_SETTINGS        = 'roistat_leadHunterCallbackSettings',
        LEAD_HUNTER_DEFAULT_SCRIPT_ID        = 'roistat_leadHunterScriptId',
        LEAD_HUNTER_CURRENT_SCRIPT_ID        = 'roistat_isleadHunterScriptIdActive',
        MULTIWIDGETS_ENABLED                 = 'roistat_multiwidgetEnabled',
        MULTIWIDGET_VK_ENABLED               = 'roistat_multiwidgetVKEnabled',
        MULTIWIDGET_VK_LINK                  = 'roistat_multiwidgetVKLink',
        MULTIWIDGET_FB_ENABLED               = 'roistat_multiwidgetFBEnabled',
        MULTIWIDGET_FB_LINK                  = 'roistat_multiwidgetFBLink',
        MULTIWIDGET_TELEGRAM_ENABLED         = 'roistat_multiwidgetTelegramEnabled',
        MULTIWIDGET_TELEGRAM_LINK            = 'roistat_multiwidgetTelegramLink',
        MULTIWIDGET_WHATS_APP_ENABLED        = 'roistat_multiwidgetWhatsAppEnabled',
        MULTIWIDGET_WHATS_APP_LINK           = 'roistat_multiwidgetWhatsAppLink',
        MULTIWIDGET_VIBER_ENABLED            = 'roistat_multiwidgetViberEnabled',
        MULTIWIDGET_VIBER_LINK               = 'roistat_multiwidgetViberLink',
        MULTIWIDGET_SETTINGS                 = 'roistat_multiwidgetSettings',
        ONLINE_CHAT_ENABLED                  = 'roistat_onlineChatEnabled',
        ONLINE_CHAT_SETTINGS                 = 'roistat_onlineChatSettings',
        COOKIE_EXPIRE                        = 7*24*60*60,
        COOKIE_CONFIG                        = { expires: COOKIE_EXPIRE, path: '/'},
        PROMO_CODE_CLASS                     = 'roistat-promo',
        CALL_TRACKING_CLASS                  = 'roistat-phone',
        CALL_TRACKING_COUNTRY_CLASS          = 'roistat-phone-country',
        CALL_TRACKING_REGION_CLASS           = 'roistat-phone-region',
        CALL_TRACKING_NUMBER_CLASS           = 'roistat-phone-number',
        CALL_TRACKING_TEL_CLASS              = 'roistat-phone-tel',
        CALL_TRACKING_POSTFIX_COUNTRY        = 'country',
        CALL_TRACKING_POSTFIX_REGION         = 'region',
        CALL_TRACKING_POSTFIX_NUMBER         = 'number',
        CALL_TRACKING_POSTFIX_TEL            = 'tel',
        CALL_TRACKING_GET_PHONE_SCRIPT_ID    = 'get-phone',
        ROISTAT_CALL_TRACKING                = 'roistat_call_tracking',
        ROISTAT_SCRIPT_ID                    = 'roistat-js-script',
        ROISTAT_PHONE_REPLACEMENT            = 'roistat_phone_replacement',
        ROISTAT_PHONE_SCRIPT_DATA            = 'roistat_phone_script_data',
        METRIKA_VISIT_ID_PARAM_NAME          = 'roistat-visit-id',
        METRIKA_COUNTER_ID_COOKIE            = 'roistat_metrika_counter_id',
        MARKER_FROM_REFERRER_COOKIE          = 'roistat_marker_from_referrer',
        ROISTAT_EMAILTRACKING_EMAIL          = 'roistat_emailtracking_email',
        ROISTAT_EMAILTRACKING_TRACKING_EMAIL = 'roistat_emailtracking_tracking_email',
        ROISTAT_EMAILTRACKING_EMAILS         = 'roistat_emailtracking_emails',
        ROISTAT_GEO_DATA                     = 'roistat_geo_data',
        ROISTAT_PROMO_CODE                   = 'roistat_promo_code',
        ROISTAT_LINKS_MARKUP                 = 'roistat_links_markup',
        ROISTAT_PROXY_FORMS                  = 'roistat_proxy_forms',
        ROISTAT_IS_MULTI_DOMAIN              = 'roistat_isMultiDomain',
        ADDITIONAL_PAGE_PARAM_LIST           = ['roistat_param1', 'roistat_param2', 'roistat_param3', 'roistat_param4', 'roistat_param5'],
        ROISTAT_DEBUG_KEY                    = 'roistat_debug',
        ROISTAT_IS_SETTINGS_SAVED_COOKIE     = 'roistat_settings_saved',
        ROISTAT_NO_VISIT_ID_COOKIE_VALUE     = 'nocookie',
        IGNORED_HOSTS_FOR_CUSTOM_TAG         = ['yandex.ru'],
        COOKIE_BETA_TEST                     = 'beta_test',
        ROISTAT_SETTINGS_VERSION             = 'roistat_settings_version',
        LEAD_HUNTER_FORM_TEMPLATE            = 'roistat-leadhunter-form-template',
        LEAD_HUNTER_PULSATOR_TEMPLATE        = 'roistat-leadhunter-pulsator-template',
        LEAD_HUNTER_PULSATOR_SETTINGS        = 'roistat-leadhunter-pulsator-settings',
        ONLINE_CHAT_PULSATOR_TEMPLATE        = 'roistat-online-chat-pulsator-template',
        ONLINE_CHAT_IFRAME_TEMPLATE          = 'roistat-online-chat-iframe-template',
        MULTIWIDGET_PULSATOR_TEMPLATE        = 'roistat-multiwidget-pulsator-template',
        MULTIWIDGET_PULSATOR_SETTINGS        = 'roistat-multiwidget-pulsator-settings',
        SETTINGS_UPDATE_TIME_KEY             = 'roistat_last_settings_update_time',
        STORAGE_KEY_AUTHORIZED_CLIENT        = 'roistat_authorized_client',
        STORAGE_KEY_ROISTAT_PARAMS           = 'roistat_params',
        ROISTAT_PARAMS_MAX_COUNT             = 50,
        MOBILE_DEVICE_NAME                   = 'mobile',
        TABLET_DEVICE_NAME                   = 'tablet',
        DESKTOP_DEVICE_NAME                  = 'desktop',
        MOBILE_MARKUP_BREAKPOINT             = 500,
        TABLET_MARKUP_BREAKPOINT             = 1024,
        // TODO: implement the correct counter branding logic, where the mention of roistat will be hidden
        // TODO: in https://roistat.platrum.ru/tasks/task/597577
        IS_MA                                = 'roistat' === 'ma';

    var RU_LANGUAGE_KEY = 'ru',
        EN_LANGUAGE_KEY = 'en',
        DEFAULT_LANGUAGES_TITLE_VARIATIONS = {
            ru: ['Русский', 'Russian'],
            en: ['Английский', 'English']
        },
        leadHunterLanguage,
        onlineChatLanguage;

    var settings = {
        callTrackingEnabled: true,
        callTrackingManual: false,
        jsonpRequestTimeout: 100
    };
    var state = {
        isVisitProcessed: false,
        visitFromUser: null,
        cookies: {},
        pageParams: {},
        source: {
            marker: null
        },
        isSettingsUpdating: false,
        isAbTestsApplied: false
    };
    var callbacks = {
        onVisitProcessed: [],
        onCallTrackingPhoneReceived: [],
        onSPAPageChanged: [],
        onAbTestsApplied: {}
    };
    if (window.roistatAlreadyStarted) {
        if (typeof console !== 'undefined' && console.log) {
            console.log("Call: roistat already started, skip");
        }
        return;
    }
    window.roistatAlreadyStarted = true;

    if (window.roistatCookieDomain) {
        COOKIE_CONFIG.domain = window.roistatCookieDomain;
    }

    /**
     * @returns {Number}
     */
    var currentTime = function() {
        return new Date().getTime();
    };

    /**
     * @param {String} message
     */
    var debug = function(message) {
        if (!DEBUG_MODE || typeof console === 'undefined' || typeof console.log !== 'function') {
            return;
        }

        var timeSpent = currentTime() - startTime;
        var decoratedMessage = "[" + (timeSpent / 1000) + "s] " + message;
        debugLog =  debugLog + "; " + decoratedMessage;
        console.log(decoratedMessage);
    };

    /**
     * @param {String} url
     * @returns {String}
     */
    var getBaseHost = function(url) {
        var urlParts = url.split('.');
        var length = urlParts.length;
        if (length < 2) {
            return url;
        }
        return urlParts[length - 2] + '.' + urlParts[length - 1];
    }

    var getDeviceParams = function () {
        var screen       = window.screen || null;
        var navigator    = window.navigator || null;
        return  {
            screenWidth         : screen !== null ? (screen.width || null) : null,
            screenHeight        : screen !== null ? (screen.height || null) : null,
            screenIsExtended    : screen !== null ? (screen.isExtended || null) : null,
            screenPixelDepth    : screen !== null ? (screen.pixelDepth || null) : null,
            screenColorDepth    : screen !== null ? (screen.colorDepth || null) : null,
            deviceMemory        : navigator !== null ? (navigator.deviceMemory || null) : null,
            hardwareConcurrency : navigator !== null ? (navigator.hardwareConcurrency || null) : null,
            language            : navigator !== null ? (navigator.language || null) : null,
            maxTouchPoints      : navigator !== null ? (navigator.maxTouchPoints || null) : null,
            platform            : navigator !== null ? (navigator.platform || null) : null
        };
    };

    var COLLECTOR_HOST = 'cllctr.' + getBaseHost(ROISTAT_HOST);

    /* Larva of new module API: Begin */
    window.roistat = {
        version: SCRIPT_VERSION,
        getSource: function() {
            return state.source.marker;
        },
        /** @deprecated use roistat.getVisit() instead */
        visit: null,
        getVisit: function() {
            return roistat.visit;
        },
        setVisit: function(visit) {
            state.visitFromUser = visit;
        },
        registerOnVisitProcessedCallback: function(callback) {
            addVisitProcessedCallback(callback);
        },
        registerOnCalltrackingPhoneReceivedCallback: function(callback) {
            addCalltrackingPhoneReceivedCallback(callback);
        },
        disableCallTracking: function() {
            settings.callTrackingEnabled = false;
        },
        setCallTrackingManualMode: function() {
            settings.callTrackingManual = true;
        },
        /**
         * @param {Number} timeout ms
         */
        setJSONPRequestTimeout: function(timeout) {
            settings.jsonpRequestTimeout = timeout;
        },
        callTracking: {
            enabled: 0,
            phone: '',
            sessionTime: 0,
            replacementClasses: '',
            phonePrefix: "",
            rawPhone: ''
        },
        emailtracking: {
            enabled: true,
            loaded: false,
            email: null,
            trackingEmail: null,
            emails: null,
            refresh: function() {debug('Warning: used emailtracking refresh before module init');}
        },
        geo: {
            city: null,
            country: null,
            region: null,
        },
        leadHunter: {
            isEnabled: true,
            onBeforeAppear: null,
            onAfterAppear: null,
            onBeforeSubmit: null,
            onAfterSubmit: null,
            additionalNotifyEmail: null,
            localization: {
                translateToRussian: null,
                translateToEnglish: null
            },
            form: {
                title: null,
                subTitle: null,
                thankYouText: null,
                buttonText: null,
                nameLabel: null,
                contactLabel: null,
                isNameRequired: false,
                autoShowTime: null,
                isNeedExplicitAgreement: null
            }
        },
        onlineChat: {
            isEnabled: true,
            customTriggerSelector: null,
            customPosition: {
                top: null,
                right: null,
                bottom: null,
                left: null
            },
            localization: {
                translateToRussian: null,
                translateToEnglish: null,
                translate: null
            },
            actions: {
                initWithMessage: null,
                openChat: null
            },
            notificationsCustomHolderSelector: null,
            isAvailableForCurrentUserAgent: true,
            pagesFilter: {
                isEnabled: false,
                pages: []
            }
        },
        promoCode: {
            isEnabled: true,
        },
        linksMarkup: {
            ozonId: null,
            wildberriesId: null,
        },
        multiwidget: {
            isEnabled: true,
            isVisible: true,
            vk: {
                isEnabled: false,
                link: null
            },
            fb: {
                isEnabled: false,
                link: null
            },
            telegram: {
                isEnabled: false,
                link: null
            },
            whatsApp: {
                isEnabled: false,
                link: null
            },
            viber: {
                isEnabled: false,
                link: null
            }
        },
        page: {
            params: {}
        },
        proxyForms: {
            enabled: true,
            loaded: false,
            settings: []
        },
        registerAbTestCallback: function (testId, callback) {
            if (!state.isAbTestsApplied && typeof callback === 'function') {
                callbacks.onAbTestsApplied[testId] = callback;
            }
        },
        authClientById: function (clientId) {
            authClient(clientId, undefined);
        },
        authClientByEmail: function (email) {
            authClient(undefined, email);
        },
        sendDeviceFingerprint: function () {
            debug('Send device fingerprint start');
            var visitId = getRoistatVisitId();
            var deviceParams = getDeviceParams();
            var encodedDeviceParams = '';
            for (var paramName in deviceParams) {
                if (!deviceParams.hasOwnProperty(paramName)) {
                    continue;
                }
                var value = deviceParams[paramName];
                if (value !== null) {
                    encodedDeviceParams += '&' + paramName + '=' + encodeURIComponent(value);
                }
            }
            var url = getApiBaseUrl() + '/device/info/register?visit=' + visitId + encodedDeviceParams;

            sendApiRequestJSONP(url);
            debug('Send device fingerprint completed');
        },
        setDeviceParams: function () {
            if (!state.isVisitProcessed) {
                debug('Visit is not processed, return');
                return;
            }

            var visitId = getRoistatVisitId();
            if (visitId <= 0) {
                debug('Invalid arguments, return');
                return;
            }

            var deviceParams = getDeviceParams();
            var url = getApiBaseUrl() + '/update-visit-by-device-params?visit=' + visitId + '&v=' + SCRIPT_VERSION;
            for (var paramName in deviceParams) {
                if (!deviceParams.hasOwnProperty(paramName)) {
                    continue;
                }

                var value = deviceParams[paramName];
                if (value === null) {
                    continue;
                }

                url += '&' + paramName + '=' + encodeURIComponent(value);
            }

            sendApiRequestJSONP(url);
        },
        setRoistatParams: function (roistatParam1, roistatParam2, roistatParam3, roistatParam4, roistatParam5) {
            var roistatParams = roistatParam1 !== null && isObject(roistatParam1)
                ? roistatParam1
                : {
                    roistat_param1: roistatParam1,
                    roistat_param2: roistatParam2,
                    roistat_param3: roistatParam3,
                    roistat_param4: roistatParam4,
                    roistat_param5: roistatParam5
                };

            if (!state.isVisitProcessed) {
                debug('Visit is not processed, return');
                return;
            }

            var visitId = getRoistatVisitId();
            if (visitId <= 0) {
                debug('Invalid arguments, return');
                return;
            }

            var validRoistatParams = getValidRoistatParams(roistatParams);

            if (!isNonEmptyObject(validRoistatParams)) {
                debug('Has no valid roistat params for visit update, return');
                return;
            }

            setRoistatParamsToPageData(validRoistatParams);

            var url = getApiBaseUrl() + '/update-visit-by-params?visit=' + visitId + '&v=' + SCRIPT_VERSION;

            for (var roistatParam in validRoistatParams) {
                if (!Object.prototype.hasOwnProperty.call(validRoistatParams, roistatParam)) {
                    continue;
                }

                url += '&' + roistatParam + '=' + encodeURIComponent(validRoistatParams[roistatParam]);
            }

            sendApiRequestJSONP(url);
        },
    };

    var getValidRoistatParams = function (roistatParams) {
        var validRoistatParams = {};
        for (var i = 1; i <= ROISTAT_PARAMS_MAX_COUNT; i++) {
            var key = 'roistat_param' + i;
            if (!Object.prototype.hasOwnProperty.call(roistatParams, key)) {
                continue;
            }

            var value = roistatParams[key];
            if (value !== undefined && value !== null && value.toString().length > 0) {
                validRoistatParams[key] = value;
            }
        }

        return validRoistatParams;
    }

    var setRoistatParamsToPageData = function (roistatParams) {
        var storageKey               = STORAGE_KEY_ROISTAT_PARAMS;
        var encodedPrevRoistatParams = storage.get(storageKey);
        var encodedRoistatParams     = JSON.stringify(roistatParams);
        var isAlreadyUpdated         = encodedPrevRoistatParams === encodedRoistatParams;

        if (encodedRoistatParams != null && encodedRoistatParams.length > 0) {
            setRoistatParamsToPageParams(roistatParams);
        }

        if (isAlreadyUpdated) {
            debug('Params already updated, return');
            return;
        }

        storage.set(storageKey, encodedRoistatParams);
    }

    var setRoistatParamsToPageParams = function (roistatParams) {
        for (var i = 1; i <= ROISTAT_PARAMS_MAX_COUNT; i++) {
            var roistatParamKey = 'roistat_param' + i;
            if (roistatParams.hasOwnProperty(roistatParamKey)) {
                window.roistat.page.params[roistatParamKey] = roistatParams[roistatParamKey];
            }
        }
    }

    var authClient = function (clientId, clientEmail) {
        if (!state.isVisitProcessed) {
            debug('Visit is not processed, return');
            return;
        }

        var isValidClientId = clientId !== undefined && clientId.length > 0,
            isValidClientEmail = clientEmail !== undefined && clientEmail.length > 0;
        if (!isValidClientId && !isValidClientEmail) {
            debug('Invalid client params, return');
            return;
        }

        var visitId = getRoistatVisitId();
        if (visitId <= 0) {
            debug('Invalid arguments, return');
            return;
        }

        var storageKey = STORAGE_KEY_AUTHORIZED_CLIENT,
            authorizedClient = storage.get(storageKey),
            client = isValidClientId ? clientId : clientEmail;
        if (authorizedClient === client) {
            debug('Client "' + client + '" is already authorized, return');
            return;
        }

        debug('Auth client: ' + client);

        storage.set(storageKey, client);

        var url = getApiBaseUrl() +
            '/update-visit-by-client' +
            '?visit=' + visitId +
            '&v=' + SCRIPT_VERSION;

        if (isValidClientId) {
            url += '&client_id=' + encodeURIComponent(clientId);
        }

        if (isValidClientEmail) {
            url += '&client_email=' + encodeURIComponent(clientEmail);
        }

        sendApiRequestJSONP(url);
    };

    /**
     * @param {Array} array
     * @param searchValue
     * @returns {Boolean}
     */
    var isValueInArray = function(array, searchValue) {
        var arrayLength = array.length;
        for (var i = 0; i < arrayLength; i++) {
            if (searchValue === array[i]) {
                return true;
            }
        }

        return false;
    }

    var isBetaTest = function () {
        return roistatGetCookie(COOKIE_BETA_TEST) > 0;
    };

    var getCurrentPage = function () {
        return window.location.protocol + '//' + window.location.host + window.location.pathname;
    };

    var getCurrentDeviceName = function () {
        if (isMobileWindowWidth()) {
            return MOBILE_DEVICE_NAME;
        }

        if (isTabletWindowWidth()) {
            return TABLET_DEVICE_NAME;
        }

        return DESKTOP_DEVICE_NAME;
    }

    var isMobileWindowWidth = function () {
        return window.innerWidth <= MOBILE_MARKUP_BREAKPOINT;
    }

    var isTabletWindowWidth = function () {
        return window.innerWidth > MOBILE_MARKUP_BREAKPOINT
            && window.innerWidth <= TABLET_MARKUP_BREAKPOINT;
    }

    var isMobileOrTabletWindowWidth = function () {
        return isMobileWindowWidth() || isTabletWindowWidth();
    }

    /**
     * @returns {String}
     */
    var getProjectForUrl = function() {
        return window[WHITE_LABEL_PREFIX + 'ProjectId'];
    };

    /**
     * @return {String}
     */
    var getProjectHash = function() {
        var hash = getProjectForUrl().replace(/\D/g, '');
        debug('getProjectHash: ' + hash);
        return hash;
    };

    /**
     * @param {Array} projectFocusGroupHashes
     * @return {Boolean}
     */
    var isProjectInFocusGroup = function (projectFocusGroupHashes) {
        var projectHash = getProjectHash();
        return isValueInArray(projectFocusGroupHashes, projectHash);
    };

    /**
     * @param {Object} object
     * @returns {Object}
     */
    var clone = function (object) {
        return JSON.parse(JSON.stringify(object));
    };

    /**
     * @returns {Object}
     */
    var getVisitCookieConfig = function () {
        var cookieConfig = clone(COOKIE_CONFIG),
            expireFromStorage = parseInt(storage.get(ROISTAT_VISIT_COOKIE_EXPIRE));
        cookieConfig.expires = expireFromStorage > 0 ? expireFromStorage : COOKIE_EXPIRE;
        return cookieConfig;
    };

    var addVisitProcessedCallback = function(callback) {
        if (!state.isVisitProcessed) {
            callbacks.onVisitProcessed.push(callback);
        } else {
            callback();
        }
    };
    var visitProcessed = function() {
        state.isVisitProcessed = true;
        debug('[Roistat] visit id set. Processing callbacks');
        var arrayLength = callbacks.onVisitProcessed.length;
        for (var i = 0; i < arrayLength; i++) {
            callbacks.onVisitProcessed[i]();
        }
        if (window.roistatVisitCallback !== undefined) {
            window.roistatVisitCallback(window.roistat.getVisit());
        }
    };

    var addCalltrackingPhoneReceivedCallback = function(callback) {
        callbacks.onCallTrackingPhoneReceived.push(callback);
    };
    var callTrackingPhoneReceived = function() {
        var arrayLength = callbacks.onCallTrackingPhoneReceived.length;
        for (var i = 0; i < arrayLength; i++) {
            callbacks.onCallTrackingPhoneReceived[i]();
        }
    };

    var addSPAPageChangedCallback = function addSPAPageChangedCallback(callback) {
        callbacks.onSPAPageChanged.push(callback);
    };
    var spaPageChanged = function spaPageChanged() {
        debug('[Roistat] SPA page changed. Processing callbacks');
        var arrayLength = callbacks.onSPAPageChanged.length;
        for (var i = 0; i < arrayLength; i++) {
            callbacks.onSPAPageChanged[i]();
        }
    };

    /**
     * @param {HTMLElement} elem
     * @param {String} className
     */
    var addClass = function(elem, className) {
        var classes = elem.className.split(' '), hasClass = false, i;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] === className) {
                hasClass = true;
                break;
            }
        }
        if (!hasClass) {
            classes.push(className);
            elem.className = classes.join(' ');
        }
    };

    /**
     * @param {HTMLElement} elem
     * @param {String} className
     */
    var removeClass = function(elem, className) {
        var classes = elem.className.split(' '), i;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                elem.className = classes.join(' ');
                break;
            }
        }
    };

    /**
     * @param {String} encodedURIComponent
     * @return {String}
     */
    var decodeURIComponentSafe = function(encodedURIComponent) {
        try {
            return decodeURIComponent(encodedURIComponent);
        } catch (e) {
            var result;

            result = tryConvertWin1251(encodedURIComponent);
            if (result === null) {
                return encodedURIComponent;
            }

            return result;
        }
    };

    /**
     * @return {Function[]}
     */
    var additionalParametersCallbacks = {
        'visitor_uid': function() {
            debug("AmoCrmUID: starting collecting AmoCRM visitor_uid");
            if (!isObject(window.AMOPIXEL_IDENTIFIER) || !isFunction(window.AMOPIXEL_IDENTIFIER.getVisitorUid)) {
                debug("AmoCrmUID: AMOPIXEL_IDENTIFIER not an object or 'getVisitorUid()' function not found");
                return null;
            }
            var visitorUid = AMOPIXEL_IDENTIFIER.getVisitorUid();
            if (!isStringValue(visitorUid)) {
                debug("AmoCrmUID: visitor_uid value must be a string");
                return null;
            }
            return visitorUid;
        },
        'roistat_yclid': function () {
            return getUrlParamValue('yclid', false);
        },
        'roistat_gclid': function () {
            return getUrlParamValue('gclid', false);
        },
        'roistat_rb_clickid': function () {
            return getUrlParamValue('rb_clickid', false);
        }
    };

    var setCookieAdditionalParameters = function() {
        for (var parameter in additionalParametersCallbacks) {
            var parameterValue = additionalParametersCallbacks[parameter]();
            if (parameterValue === null) {
                continue;
            }
            roistatSetCookie(parameter, parameterValue, COOKIE_CONFIG);
        }
    };

    /**
     * @returns {String[]}
     */
    var additionalCookieList = function() {
        return ['_ym_uid', '_ga', '_fbp', '_fbc'].concat(objectKeys(additionalParametersCallbacks));
    };

    /**
     * @param {String} encodedURIComponent
     * @return {String|null}
     */
    var tryConvertWin1251 = function(encodedURIComponent) {
        var win1251toUtf8Map = {'%E0': '%D0%B0', '%E1': '%D0%B1', '%E2': '%D0%B2', '%E3': '%D0%B3', '%E4': '%D0%B4', '%E5': '%D0%B5', '%B8': '%D1%91', '%E6': '%D0%B6', '%E7': '%D0%B7', '%E8': '%D0%B8', '%E9': '%D0%B9', '%EA': '%D0%BA', '%EB': '%D0%BB', '%EC': '%D0%BC', '%ED': '%D0%BD', '%EE': '%D0%BE', '%EF': '%D0%BF', '%F0': '%D1%80', '%F1': '%D1%81', '%F2': '%D1%82', '%F3': '%D1%83', '%F4': '%D1%84', '%F5': '%D1%85', '%F6': '%D1%86', '%F7': '%D1%87', '%F8': '%D1%88', '%F9': '%D1%89', '%FC': '%D1%8C', '%FB': '%D1%8B', '%FA': '%D1%8A', '%FD': '%D1%8D', '%FE': '%D1%8E', '%FF': '%D1%8F', '%C0': '%D0%90', '%C1': '%D0%91', '%C2': '%D0%92', '%C3': '%D0%93', '%C4': '%D0%94', '%C5': '%D0%95', '%A8': '%D0%81', '%C6': '%D0%96', '%C7': '%D0%97', '%C8': '%D0%98', '%C9': '%D0%99', '%CA': '%D0%9A', '%CB': '%D0%9B', '%CC': '%D0%9C', '%CD': '%D0%9D', '%CE': '%D0%9E', '%CF': '%D0%9F', '%D0': '%D0%A0', '%D1': '%D0%A1', '%D2': '%D0%A2', '%D3': '%D0%A3', '%D4': '%D0%A4', '%D5': '%D0%A5', '%D6': '%D0%A6', '%D7': '%D0%A7', '%D8': '%D0%A8', '%D9': '%D0%A9', '%DC': '%D0%AC', '%DB': '%D0%AB', '%DA': '%D0%AA', '%DD': '%D0%AD', '%DE': '%D0%AE', '%DF': '%D0%AF'};
        var result = '';
        var i = 0;

        while (i < encodedURIComponent.length) {
            var matchSubstring =  encodedURIComponent.substring(i, i + 3);
            if (Object.prototype.hasOwnProperty.call(win1251toUtf8Map, matchSubstring)) {
                result += win1251toUtf8Map[matchSubstring];
                i += 3;
            } else {
                result += encodedURIComponent.substring(i, i + 1);
                i++;
            }
        }

        try {
            return decodeURIComponent(result);
        } catch(e) {
            return null;
        }
    };

    /* Larva of new module API: End */

    var getInitPageUrl = function() {
        if (
            typeof window.roistatInitPage !== 'string'
            || window.roistatInitPage === ''
            || window.roistatInitPage === '{ROISTAT_INIT_PAGE}'
        ) {
            return document.location.href;
        }

        return window.roistatInitPage;
    };

    window.roistatVersion = SCRIPT_VERSION;
    var marker,
        isApiLogFocusGroupEnabled = isProjectInFocusGroup([]),
        isWhiteLabelFocusGroupEnabled = isProjectInFocusGroup([
            '97532377849195770346229',
            '592829167247144932861',
            '5920396192098309402868',
            '591183866179479527',
            '19640141722769938679',
            '7517211421734017584031',
            '3101387160241499728',
            '48846105634802027',
            '353439800158189719',
            '89748922669691497827',
            '565074965442390546245',
        ]),
        isLeadHunterShowsLimitFocusGroupEnabled = isProjectInFocusGroup([
            '756305455392462179', //214195
            '5920396192098309402868', //208347
        ]),
        isMultiwidgetChangeButtonsTextFocusGroupEnabled = isProjectInFocusGroup([
            '3640376563070976595', //207154
            '5920396192098309402868', //208347
        ]),
        isVisitLogsFocusGroupEnabled = isProjectInFocusGroup([
            '756305455392462179', //214195
            '5920396192098309402868', //208347

            '385366725288649150721', //117800
            '79444741580829891656', //295753
            '1455160669611096564', //186767
            '87201407176252054537', //241313
            '320784366854304269447164' //30889
        ]),
        referrer,
        isMarkerParsedFromEnv = true,
        initUrl = decodeURIComponent(getInitPageUrl()),
        debugLog = "",
        overrideDebug = "",
        startTime = new Date().getTime(),
        isNewVisit = false,
        roistatPhonePrefix = window.roistatPhonePrefix ? window.roistatPhonePrefix : "",
        roistatPhonePrefixBind = window.roistatPhonePrefixBind ? window.roistatPhonePrefixBind : "",
        roistatCalltrackingScripts = window.roistatCalltrackingScripts && window.roistatCalltrackingScripts.join ? window.roistatCalltrackingScripts.join(",") : "";
    var pageVisitId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var isVisibilityStateSupported =
        typeof document.hidden === 'boolean'
        && typeof document.visibilityState === 'string'
        && typeof document.addEventListener === 'function';

    /**
     * @param {String} name
     * @returns {String}
     */
    var buildCookieName = function (name) {
        if (!isWhiteLabelFocusGroupEnabled) {
            return name;
        }

        // TODO: remove after clear all cookie names from the 'roistat_' prefix
        var nameWithoutPrefix = name.replace(/^roistat[_-]/, '');
        return WHITE_LABEL_PREFIX + '_' + nameWithoutPrefix;
    };

    var appendMaParam = function (url) {
        if (!IS_MA) {
            return url;
        }

        var hashIndex      = url.indexOf('#'),
            hash           = '',
            urlWithoutHash = url;

        if (hashIndex !== -1) {
            hash = url.substring(hashIndex);
            urlWithoutHash = url.substring(0, hashIndex);
        }

        var separator = urlWithoutHash.indexOf('?') !== -1 ? '&' : '?';
        return urlWithoutHash + separator + 'ma=1' + hash;
    }

    var roistatGetCookie, roistatSetCookie, setCookie, roistatClearCookie;
    roistatGetCookie = window.roistatGetCookie = function (name) {var preparedName = buildCookieName(name); var matches = document.cookie.match(new RegExp("(?:^|; )" + preparedName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));return matches ? decodeURIComponentSafe(matches[1]) : undefined;};
    setCookie = function (name, value, options) {var preparedName = buildCookieName(name); options = options || {};var expires = options.expires;if (typeof expires == "number" && expires) {var d = new Date();d.setTime(d.getTime() + expires*1000);expires = options.expires = d;}if (expires && expires.toUTCString) { options.expires = expires.toUTCString();}value = encodeURIComponent(value);var updatedCookie = preparedName + "=" + value;for(var propName in options) {updatedCookie += "; " + propName;var propValue = options[propName];    if (propValue !== true) { updatedCookie += "=" + propValue;}}document.cookie = updatedCookie;};

    var COOKIE_VALUE_MAX_SIZE = 1024;
    roistatSetCookie = window.roistatSetCookie = function roistatSetCookie(name, value, options) {
        if (String(value).length > COOKIE_VALUE_MAX_SIZE) {
            return;
        }

        setCookie(name, value, options);

        var updateCookies;
        updateCookies = roistatGetCookie(ROISTAT_COOKIES_TO_RESAVE_COOKIE);
        updateCookies = isStringValue(updateCookies) ? updateCookies.split(',') : [];
        for (var i in updateCookies) {
            if (updateCookies[i] === name) {
                return;
            }
        }
        updateCookies.push(name);
        setCookie(ROISTAT_COOKIES_TO_RESAVE_COOKIE, updateCookies.join(','), {'path': '/'});
    }

    roistatClearCookie = function roistatClearCookie(name, options) {
        var clearOptions = clone(options);

        clearOptions.expires = new Date(0).toUTCString();

        setCookie(name, '', clearOptions);
    }

    var _wrapCallProperty = function(obj, prop, callback) {
        var oldCallback = obj[prop];
        obj[prop] = function() {
            if (oldCallback) {
                oldCallback.apply(this, arguments);
            }
            callback.apply(this, arguments);
        };
    };
    var _addEventListener = function(obj, eventType, callback) {
        if (obj.addEventListener) {
            obj.addEventListener(eventType, callback, false);
            return;
        }

        var onType = "on" + eventType;
        if (obj.attachEvent) {
            obj.attachEvent(onType, callback);
            return;
        }
        if (onType in obj){
            _wrapCallProperty(obj, onType, callback);
            return;
        }
        if (eventType in obj) {
            _wrapCallProperty(obj, eventType, callback);
            return;
        }
        debug("Handler could not be attached");
    };

    /**
     * @param {Array} array
     * @param {Function} callback
     */
    var arrayIterate = function(array, callback) {
        var arrayLength = array.length;
        for (var i = 0; i < arrayLength; i++) {
            callback(array[i]);
        }
    };

    /**
     *
     * @param object
     * @returns {Array}
     */
    var objectKeys = function(object) {
        var keys = [];
        objectIterate(object, function (key, value) { keys.push(key); });
        return keys;
    };

    /**
     * @param {Object} object
     * @param {Function} callback
     */
    var objectIterate = function(object, callback) {
        for (var objectFieldName in object) {
            if (Object.prototype.hasOwnProperty.call(object, objectFieldName)) {
                callback(objectFieldName, object[objectFieldName]);
            }
        }
    };

    /**
     * @param {Array} array
     */
    var isArray = function(array) {
        return Object.prototype.toString.call(array) === '[object Array]';
    };

    /**
     * @param value
     * @returns {Boolean}
     */
    var isNonEmptyObject = function(value) {
        if (typeof value !== 'object') {
            return false;
        }
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                return true;
            }
        }
        return false;
    };

    /**
     * @param {String} value
     * @returns {Array|null}
     */
    var tryParseJson = function(value) {
        try {
            var parsedValue = JSON.parse(value);
            if (parsedValue && typeof parsedValue === "object") {
                return parsedValue;
            }
        }
        catch (e) { }

        return null;
    };

    if (document.getElementsByClassName == undefined) {
        document.getElementsByClassName = function(cl) {
            var retnode = [];
            var myclass = new RegExp('\\b'+cl+'\\b');
            var elem = this.getElementsByTagName('*');
            for (var i = 0; i < elem.length; i++) {
                var classes = elem[i].className;
                if (myclass.test(classes)) {
                    retnode.push(elem[i]);
                }
            }
            return retnode;
        }
    }

    /**
     * @returns {Function}
     */
    var stringFromCharCode = function() {
        return String.fromCharCode;
    };

    /**
     * @param {String} str
     * @returns {String}
     */
    var xorCrypt = function(str) {
        var output = '';
        for (var i = 0; i < str.length; ++i) {
            output += stringFromCharCode()(XOR_KEY ^ str.charCodeAt(i));
        }
        return output;
    };

    /**
     * @param {String} str
     * @returns {String}
     */
    var urlCrypt = function(str) {
        return encodeURIComponent(xorCrypt(Base64.encode(str)));
    };

    var Base64 = {
        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = Base64._utf8_encode(input);

            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

            }
            return output;
        },
        decode : function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            output = Base64._utf8_decode(output);

            return output;

        },
        _utf8_encode : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        },
        _utf8_decode : function (utftext) {
            var string = "";
            var i = 0;
            var c = 0;
            var c2 =0;
            var c3 = 0;

            while ( i < utftext.length ) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }
            return string;
        }
    };

    /* CryptoJS v3.1.2 code.google.com/p/crypto-js (c) 2009-2013 by Jeff Mott. All rights reserved. code.google.com/p/crypto-js/wiki/License */
    var CryptoJS = CryptoJS || function (s, p) {
        var m = {}, l = m.lib = {}, n = function () {
        }, r = l.Base = {
            extend: function (b) {
                n.prototype = this;
                var h = new n;
                b && h.mixIn(b);
                h.hasOwnProperty("init") || (h.init = function () {
                    h.$super.init.apply(this, arguments)
                });
                h.init.prototype = h;
                h.$super = this;
                return h
            }, create: function () {
                var b = this.extend();
                b.init.apply(b, arguments);
                return b
            }, init: function () {
            }, mixIn: function (b) {
                for (var h in b) b.hasOwnProperty(h) && (this[h] = b[h]);
                b.hasOwnProperty("toString") && (this.toString = b.toString)
            }, clone: function () {
                return this.init.prototype.extend(this)
            }
        }, q = l.WordArray = r.extend({
            init: function (b, h) {
                b = this.words = b || [];
                this.sigBytes = h != p ? h : 4 * b.length
            }, toString: function (b) {
                return (b || t).stringify(this)
            }, concat: function (b) {
                var h = this.words, a = b.words, j = this.sigBytes;
                b = b.sigBytes;
                this.clamp();
                if (j % 4) for (var g = 0; g < b; g++) h[j + g >>> 2] |= (a[g >>> 2] >>> 24 - 8 * (g % 4) & 255) << 24 - 8 * ((j + g) % 4); else if (65535 < a.length) for (g = 0; g < b; g += 4) h[j + g >>> 2] = a[g >>> 2]; else h.push.apply(h, a);
                this.sigBytes += b;
                return this
            }, clamp: function () {
                var b = this.words, h = this.sigBytes;
                b[h >>> 2] &= 4294967295 << 32 - 8 * (h % 4);
                b.length = s.ceil(h / 4)
            }, clone: function () {
                var b = r.clone.call(this);
                b.words = this.words.slice(0);
                return b
            }, random: function (b) {
                for (var h = [], a = 0; a < b; a += 4) h.push(4294967296 * s.random() | 0);
                return new q.init(h, b)
            }
        }), v = m.enc = {}, t = v.Hex = {
            stringify: function (b) {
                var a = b.words;
                b = b.sigBytes;
                for (var g = [], j = 0; j < b; j++) {
                    var k = a[j >>> 2] >>> 24 - 8 * (j % 4) & 255;
                    g.push((k >>> 4).toString(16));
                    g.push((k & 15).toString(16))
                }
                return g.join("")
            }, parse: function (b) {
                for (var a = b.length, g = [], j = 0; j < a; j += 2) g[j >>> 3] |= parseInt(b.substr(j, 2), 16) << 24 - 4 * (j % 8);
                return new q.init(g, a / 2)
            }
        }, a = v.Latin1 = {
            stringify: function (b) {
                var a = b.words;
                b = b.sigBytes;
                for (var g = [], j = 0; j < b; j++) g.push(String.fromCharCode(a[j >>> 2] >>> 24 - 8 * (j % 4) & 255));
                return g.join("")
            }, parse: function (b) {
                for (var a = b.length, g = [], j = 0; j < a; j++) g[j >>> 2] |= (b.charCodeAt(j) & 255) << 24 - 8 * (j % 4);
                return new q.init(g, a)
            }
        }, u = v.Utf8 = {
            stringify: function (b) {
                try {
                    return decodeURIComponent(escape(a.stringify(b)))
                } catch (g) {
                    throw Error("Malformed UTF-8 data");
                }
            }, parse: function (b) {
                return a.parse(unescape(encodeURIComponent(b)))
            }
        }, g = l.BufferedBlockAlgorithm = r.extend({
            reset: function () {
                this._data = new q.init;
                this._nDataBytes = 0
            }, _append: function (b) {
                "string" == typeof b && (b = u.parse(b));
                this._data.concat(b);
                this._nDataBytes += b.sigBytes
            }, _process: function (b) {
                var a = this._data, g = a.words, j = a.sigBytes, k = this.blockSize, m = j / (4 * k),
                    m = b ? s.ceil(m) : s.max((m | 0) - this._minBufferSize, 0);
                b = m * k;
                j = s.min(4 * b, j);
                if (b) {
                    for (var l = 0; l < b; l += k) this._doProcessBlock(g, l);
                    l = g.splice(0, b);
                    a.sigBytes -= j
                }
                return new q.init(l, j)
            }, clone: function () {
                var b = r.clone.call(this);
                b._data = this._data.clone();
                return b
            }, _minBufferSize: 0
        });
        l.Hasher = g.extend({
            cfg: r.extend(), init: function (b) {
                this.cfg = this.cfg.extend(b);
                this.reset()
            }, reset: function () {
                g.reset.call(this);
                this._doReset()
            }, update: function (b) {
                this._append(b);
                this._process();
                return this
            }, finalize: function (b) {
                b && this._append(b);
                return this._doFinalize()
            }, blockSize: 16, _createHelper: function (b) {
                return function (a, g) {
                    return (new b.init(g)).finalize(a)
                }
            }, _createHmacHelper: function (b) {
                return function (a, g) {
                    return (new k.HMAC.init(b, g)).finalize(a)
                }
            }
        });
        var k = m.algo = {};
        return m
    }(Math);
    (function (s) {
        function p(a, k, b, h, l, j, m) {
            a = a + (k & b | ~k & h) + l + m;
            return (a << j | a >>> 32 - j) + k
        }

        function m(a, k, b, h, l, j, m) {
            a = a + (k & h | b & ~h) + l + m;
            return (a << j | a >>> 32 - j) + k
        }

        function l(a, k, b, h, l, j, m) {
            a = a + (k ^ b ^ h) + l + m;
            return (a << j | a >>> 32 - j) + k
        }

        function n(a, k, b, h, l, j, m) {
            a = a + (b ^ (k | ~h)) + l + m;
            return (a << j | a >>> 32 - j) + k
        }

        for (var r = CryptoJS, q = r.lib, v = q.WordArray, t = q.Hasher, q = r.algo, a = [], u = 0; 64 > u; u++) a[u] = 4294967296 * s.abs(s.sin(u + 1)) | 0;
        q = q.MD5 = t.extend({
            _doReset: function () {
                this._hash = new v.init([1732584193, 4023233417, 2562383102, 271733878])
            }, _doProcessBlock: function (g, k) {
                for (var b = 0; 16 > b; b++) {
                    var h = k + b, w = g[h];
                    g[h] = (w << 8 | w >>> 24) & 16711935 | (w << 24 | w >>> 8) & 4278255360
                }
                var b = this._hash.words, h = g[k + 0], w = g[k + 1], j = g[k + 2], q = g[k + 3], r = g[k + 4],
                    s = g[k + 5], t = g[k + 6], u = g[k + 7], v = g[k + 8], x = g[k + 9], y = g[k + 10], z = g[k + 11],
                    A = g[k + 12], B = g[k + 13], C = g[k + 14], D = g[k + 15], c = b[0], d = b[1], e = b[2], f = b[3],
                    c = p(c, d, e, f, h, 7, a[0]), f = p(f, c, d, e, w, 12, a[1]), e = p(e, f, c, d, j, 17, a[2]),
                    d = p(d, e, f, c, q, 22, a[3]), c = p(c, d, e, f, r, 7, a[4]), f = p(f, c, d, e, s, 12, a[5]),
                    e = p(e, f, c, d, t, 17, a[6]), d = p(d, e, f, c, u, 22, a[7]), c = p(c, d, e, f, v, 7, a[8]),
                    f = p(f, c, d, e, x, 12, a[9]), e = p(e, f, c, d, y, 17, a[10]), d = p(d, e, f, c, z, 22, a[11]),
                    c = p(c, d, e, f, A, 7, a[12]), f = p(f, c, d, e, B, 12, a[13]), e = p(e, f, c, d, C, 17, a[14]),
                    d = p(d, e, f, c, D, 22, a[15]), c = m(c, d, e, f, w, 5, a[16]), f = m(f, c, d, e, t, 9, a[17]),
                    e = m(e, f, c, d, z, 14, a[18]), d = m(d, e, f, c, h, 20, a[19]), c = m(c, d, e, f, s, 5, a[20]),
                    f = m(f, c, d, e, y, 9, a[21]), e = m(e, f, c, d, D, 14, a[22]), d = m(d, e, f, c, r, 20, a[23]),
                    c = m(c, d, e, f, x, 5, a[24]), f = m(f, c, d, e, C, 9, a[25]), e = m(e, f, c, d, q, 14, a[26]),
                    d = m(d, e, f, c, v, 20, a[27]), c = m(c, d, e, f, B, 5, a[28]), f = m(f, c, d, e, j, 9, a[29]),
                    e = m(e, f, c, d, u, 14, a[30]), d = m(d, e, f, c, A, 20, a[31]), c = l(c, d, e, f, s, 4, a[32]),
                    f = l(f, c, d, e, v, 11, a[33]), e = l(e, f, c, d, z, 16, a[34]), d = l(d, e, f, c, C, 23, a[35]),
                    c = l(c, d, e, f, w, 4, a[36]), f = l(f, c, d, e, r, 11, a[37]), e = l(e, f, c, d, u, 16, a[38]),
                    d = l(d, e, f, c, y, 23, a[39]), c = l(c, d, e, f, B, 4, a[40]), f = l(f, c, d, e, h, 11, a[41]),
                    e = l(e, f, c, d, q, 16, a[42]), d = l(d, e, f, c, t, 23, a[43]), c = l(c, d, e, f, x, 4, a[44]),
                    f = l(f, c, d, e, A, 11, a[45]), e = l(e, f, c, d, D, 16, a[46]), d = l(d, e, f, c, j, 23, a[47]),
                    c = n(c, d, e, f, h, 6, a[48]), f = n(f, c, d, e, u, 10, a[49]), e = n(e, f, c, d, C, 15, a[50]),
                    d = n(d, e, f, c, s, 21, a[51]), c = n(c, d, e, f, A, 6, a[52]), f = n(f, c, d, e, q, 10, a[53]),
                    e = n(e, f, c, d, y, 15, a[54]), d = n(d, e, f, c, w, 21, a[55]), c = n(c, d, e, f, v, 6, a[56]),
                    f = n(f, c, d, e, D, 10, a[57]), e = n(e, f, c, d, t, 15, a[58]), d = n(d, e, f, c, B, 21, a[59]),
                    c = n(c, d, e, f, r, 6, a[60]), f = n(f, c, d, e, z, 10, a[61]), e = n(e, f, c, d, j, 15, a[62]),
                    d = n(d, e, f, c, x, 21, a[63]);
                b[0] = b[0] + c | 0;
                b[1] = b[1] + d | 0;
                b[2] = b[2] + e | 0;
                b[3] = b[3] + f | 0
            }, _doFinalize: function () {
                var a = this._data, k = a.words, b = 8 * this._nDataBytes, h = 8 * a.sigBytes;
                k[h >>> 5] |= 128 << 24 - h % 32;
                var l = s.floor(b / 4294967296);
                k[(h + 64 >>> 9 << 4) + 15] = (l << 8 | l >>> 24) & 16711935 | (l << 24 | l >>> 8) & 4278255360;
                k[(h + 64 >>> 9 << 4) + 14] = (b << 8 | b >>> 24) & 16711935 | (b << 24 | b >>> 8) & 4278255360;
                a.sigBytes = 4 * (k.length + 1);
                this._process();
                a = this._hash;
                k = a.words;
                for (b = 0; 4 > b; b++) h = k[b], k[b] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;
                return a
            }, clone: function () {
                var a = t.clone.call(this);
                a._hash = this._hash.clone();
                return a
            }
        });
        r.MD5 = t._createHelper(q);
        r.HmacMD5 = t._createHmacHelper(q)
    })(Math);

    /**
     * @returns {String}
     */
    var getDocumentCookie = function() {
        return document[stringFromCharCode()(99, 111, 111, 107, 105, 101)];
    };

    /**
     * @returns {String}
     */
    var getVisitHash = function() {
        updateCookieInState();
        var hash = {c: getCookiesFromState()};
        return urlCrypt(JSON.stringify(hash));
    };

    /**
     * @returns {string}
     */
    var getVisitIdForLeadCreation = function () {
        var roistatVisitCookieValue = getRoistatVisitId();
        return (roistatVisitCookieValue === undefined || roistatVisitCookieValue === null) ? ROISTAT_NO_VISIT_ID_COOKIE_VALUE : roistatVisitCookieValue;
    };

    /**
     * @returns {String}
     */
    var getCookiesFromState = function() {
        var cookies = [];
        for (var cookieName in state.cookies) {
            if (!Object.prototype.hasOwnProperty.call(state.cookies, cookieName)) {
                continue;
            }
            cookies.push(cookieName + '=' + state.cookies[cookieName]);
        }
        return cookies.join('; ');
    };

    var updateCookieInState = function () {
        var currentParsedCookies = getParsedCookies();

        for (var cookieName in currentParsedCookies) {
            if (!Object.prototype.hasOwnProperty.call(currentParsedCookies, cookieName)) {
                continue;
            }
            state.cookies[cookieName] = currentParsedCookies[cookieName];
        }
    };

    /**
     * @param {string} marker
     */
    var setMarkerCookie = function (marker) {
        state.source.marker = marker;
        var cookieConfig = getVisitCookieConfig();
        cookieConfig["max-age"] = cookieConfig.expires;
        roistatSetCookie(MARKER_COOKIE, marker, cookieConfig);
    };

    /**
     * @returns {string}
     */
    var getMarkerFromCookie = function () {
        return roistatGetCookie(MARKER_COOKIE);
    };

    var updatePageParamsInState = function () {
        objectIterate(window.roistat.page.params, function(fieldName, fieldValue) {
            state.pageParams[fieldName] = fieldValue;
        });
    };

    /**
     * @returns {Object}
     */
    var getParsedCookies = function() {
        var cookies = getDocumentCookie();
        var cookiesParts = cookies.split('; ');
        var result = {};

        for (var i = 0; i < cookiesParts.length; i++) {
            var cookiePart = cookiesParts[i];
            if (cookiePart === '') {
                continue;
            }
            var cookie = cookiePart.split('=');
            if (cookie.length < 2) {
                continue;
            }
            var cookieName = cookie[0].trim();
            var cookieValue = cookie[1].trim();
            result[cookieName] = cookieValue;
        }
        return result;
    };

    /**
     * @returns {String}
     */
    var getVisitHashParamName = function() {
        return stringFromCharCode()(104, 97, 115, 104);
    };

    /**
     * @param {string} url
     * @return {string}
     */
    var extractHostAndPath = function(url) {
        return url.split("http://").join("").split("https://").join("").split("#")[0].split("?")[0].split("www.").join("").replace(/\/+$/, "");
    };

    var tempStorage = {
        isAvailable: function() {
            var result = false;
            try {
                if (!window.sessionStorage || !window.sessionStorage.setItem || !window.sessionStorage.getItem || !window.sessionStorage.removeItem) {
                    return result;
                }
                window.sessionStorage.setItem('roistat_testKey', 'testValue');
                result = window.sessionStorage.getItem('roistat_testKey') === 'testValue';
                window.sessionStorage.removeItem('roistat_testKey');
            } catch (e) {
                return false;
            }
            return result;
        },
        remove: function(name) {
            if (this.isAvailable()) {
                window.sessionStorage.removeItem(buildCookieName(name));
            }
        },
        setObject: function(name, data){
            if (this.isAvailable()) {
                window.sessionStorage.setItem(buildCookieName(name), JSON.stringify(data));
            }
        },
        getObject: function(name) {
            var result = null;
            if (this.isAvailable()) {
                result = window.sessionStorage.getItem(buildCookieName(name));
                result = JSON.parse(result);
            }
            return result;
        },
        set: function(name, value) {
            if (this.isAvailable()) {
                window.sessionStorage.setItem(buildCookieName(name), value);
            }
        },
        get: function(name) {
            var result = null;
            if (this.isAvailable()) {
                result = window.sessionStorage.getItem(buildCookieName(name));
            }
            return result;
        }
    };

    //TODO:исправить dry в методах storage https://roistat.platrum.ru/tasks/task/632239
    window.storage = {
        fallbackData: {},
        isAvailable: function() {
            var result = false;
            try {
                if (!window.localStorage || !window.localStorage.setItem || !window.localStorage.getItem || !window.localStorage.removeItem) {
                    return result;
                }
                window.localStorage.setItem('roistat_testKey', 'testValue');
                result = window.localStorage.getItem('roistat_testKey') === 'testValue';
                window.localStorage.removeItem('roistat_testKey');
            } catch (e) {
                return false;
            }
            return result;
        },
        remove: function(name) {
            var key = buildCookieName(name);

            // === Telegram DeviceStorage remove ===
            if (
                name === 'roistat_visit' &&
                window.Telegram &&
                Telegram.WebApp &&
                Telegram.WebApp.DeviceStorage
            ) {
                try {
                    Telegram.WebApp.DeviceStorage.remove(name);
                } catch (e) {}
            }

            if (this.isAvailable()) {
                window.localStorage.removeItem(key);
            } else {
                var date = new Date(1970, 1, 1);
                roistatSetCookie(name, '', {expires: date.toUTCString()});
            }

            delete this.fallbackData[key];
        },
        setObject: function(name, data){
            if (this.isAvailable()) {
                localStorage.setItem(buildCookieName(name), JSON.stringify(data));
            }
            this.fallbackData[buildCookieName(name)] = data;
        },
        getObject: function(name) {
            var result = null;
            if (this.isAvailable()) {
                result = localStorage.getItem(buildCookieName(name));
                result = tryParseJson(result);
            }
            if (result === null) {
                var fallbackResult = this.fallbackData[buildCookieName(name)];
                if (typeof fallbackResult !== 'undefined123123123') {
                    result = fallbackResult;
                }
            }
            return result;
        },
        set: function(name, value) {
            var key = buildCookieName(name);

            // === Telegram DeviceStorage (minimal) ===
            if (
                name === 'roistat_visit' &&
                window.Telegram &&
                Telegram.WebApp &&
                Telegram.WebApp.DeviceStorage
            ) {
                try {
                    Telegram.WebApp.DeviceStorage.set(name, String(value));
                } catch (e) {}
            }

            if (this.isAvailable()) {
                localStorage.setItem(key, value);
            } else if (this.isSaveInCookieEnabled()) {
                roistatSetCookie(name, value, COOKIE_CONFIG);
            }

            this.fallbackData[key] = value;
        },
        setLocal: function(name, value) {
            if (this.isAvailable()) {
                localStorage.setItem(buildCookieName(name), value);
            }
            this.fallbackData[buildCookieName(name)] = value;
        },
        save: function(name, value, options) {
            if (this.isAvailable()) {
                localStorage.setItem(buildCookieName(name), value);
            }
            roistatSetCookie(name, value, options);
            this.fallbackData[buildCookieName(name)] = value;
        },
        get: function(name) {
            var key = buildCookieName(name);
            var result = null;

            // === DeviceStorage cache for roistat_visit ===
            if (name === 'roistat_visit') {
                var cached = this.fallbackData[key];
                if (typeof cached !== 'undefined') {
                    return cached;
                }
            }

            if (this.isAvailable()) {
                result = localStorage.getItem(key);
            }

            if (result === null) {
                result = roistatGetCookie(name);
            }

            if (typeof result === 'undefined') {
                result = this.fallbackData[key];
            }

            return result;
        },
        isSaveInCookieEnabled: function () {
            return this.get(ROISTAT_SAVE_DATA_IN_COOKIE) > 0;
        },
        isExternalCountersEnabled: function () {
            return this.get(EXTERNAL_COUNTERS_ENABLED) > 0;
        }
    };

    /**
     * @returns {string}
     */
    var extractReferrer = function() {
        return !isReferrerIsCurrentSite(document.referrer) ? document.referrer : null;
    };

    /**
     * @param value
     * @returns {boolean}
     */
    var isFunction = function (value) {
        return typeof value === 'function';
    };

    /**
     * @param value
     * @returns {boolean}
     */
    var isObject = function (value) {
        return typeof value === 'object';
    };

    /**
     *
     * @param {mixed} value
     * @returns {boolean}
     */
    var isStringValue = function (value) {
        return typeof value === 'string';
    };

    /**
     * @param {String} paramName
     * @param {Boolean} isNeedCheckReferrer
     * @returns {*}
     */
    var getUrlParamValue = function(paramName, isNeedCheckReferrer) {
        isNeedCheckReferrer = typeof isNeedCheckReferrer !== 'undefined' ? isNeedCheckReferrer : false;
        var _getParamValueFrom = function(url) {
            var pattern = new RegExp('[#&?]' + paramName + '=([^#&?]+)');
            var match = pattern.exec(url);
            if (isArray(match) && typeof match[1] === 'string' && match[1].length > 0) {
                var result = decodeURIComponentSafe(match[1]);
                return typeof result === 'string' && result.length > 0
                    ? result
                    : match[1];
            }
            return null;
        };

        var result = _getParamValueFrom(initUrl);
        if (isNeedCheckReferrer) {
            var referrer = document.referrer;
            if (result === null && referrer) {
                result = _getParamValueFrom(referrer);
            }
        }
        return result;
    };

    /**
     * @param {String} haystack
     * @param {String} needle
     * @returns {Boolean}
     */
    var inString = function(haystack, needle) {
        var result = false;
        if (haystack && needle) {
            result = haystack.split(needle).join('') !== haystack;
        }
        return result;
    };

    if (getUrlParamValue(ROISTAT_DEBUG_KEY) === "1" || getParsedCookies()[ROISTAT_DEBUG_KEY] === "1") {
        DEBUG_MODE = true;
    }

    /**
     * @TODO temp method. Will be removed here https://roistat.platrum.ru/tasks/task/41105
     * @returns {boolean}
     */
    var isTestRoistatMultiWidgetOnlyMode = function () {
        return true;
    };

    var isRoistatMultiWidgetOnly = function () {
        return isTestRoistatMultiWidgetOnlyMode() ? window.roistatMultiWidgetOnly : window.roistatOnlineChatOnly;
    };

    var isCurrentProjectIsRoistat = function () {
        var isRoistatProject        = getProjectForUrl() === '86ee03e4ba0f978620d7a0ee0e2e51dc' || getProjectForUrl() === '4';
        var isAvailableRoistatPages = (window.location.host === 'cloud.roistat.com' || window.location.host === 'cloud-eu.roistat.com') && window.location.pathname !== '/user/login' && window.location.pathname !== '/user/register';

        if (isRoistatProject && !isAvailableRoistatPages) {
            debug('Current project is Roistat but page is not cloud.roistat.com. Drop init multiwidget');

            return true;
        }

        return false;
    };

    /**
     * @return {String}
     */
    var protocol = function() {
        if ('https:' === document.location.protocol) {
            return "https:";
        } else {
            return "http:";
        }
    };

    /**
     * @param {String} url
     */
    var sendRequestByUrl = function(url) {
        var img = document.createElement('img');
        img.src = url;

        debug("sendRequestByUrl: " + url);
    };

    /**
     * @param {String} url
     */
    var sendApiRequestJSONP = function(url, scriptId, errorCallback) {
        debug("sendApiRequestJSONP: init with url " + url);
        var script = document.createElement('script');
        script.onload = script.onreadystatechange = function() {
            var state = this.readyState ? this.readyState : "unknown";
            debug("sendApiRequestJSONP: script state changed to " + state);
        };
        if (typeof errorCallback === 'function') {
            script.onerror = function() {
                errorCallback();
            };
        }
        script.src = appendMaParam(url);
        if (scriptId) {
            script.setAttribute('data-roistat-script-id', scriptId);
        }
        script.type = "text/javascript";
        script.async = true;

        var otherScript = document.getElementsByTagName('script')[0];
        otherScript.parentNode.insertBefore(script, otherScript);
        debug("sendApiRequestJSONP: script appended");
    };

    var requireCss = function () {
        if (state.isCssLoaded) {
            return;
        }

        (function() {
            var link        = document.createElement('link'),
                heads       = document.getElementsByTagName('head'),
                cssFileName = IS_MA ? 'module_ma.css' : 'module.css';

            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', protocol() + "//"+ROISTAT_HOST+'/dist/' + cssFileName + '?'+SCRIPT_VERSION);
            if (heads.length > 0) {
                state.isCssLoaded = true;
                heads[0].appendChild(link);
            }
        })()
    };

    /**
     * @return {Boolean}
     */
    var isVisitIdInEnvironment = function() {
        return isVisitIdInParam() || isVisitIdFromUser();
    };

    /**
     * @return {Boolean}
     */
    var isVisitIdInParam = function() {
        return getVisitIdFromParam() !== null;
    };

    /**
     * @return {Boolean}
     */
    var isVisitIdFromUser = function() {
        return getVisitIdFromUser() !== null;
    };

    var setVisitIdFromEnvironment = function() {
        var visitId = getVisitIdFromEnvironment();
        if (visitId !== null) {
            roistatSetCookie(ROISTAT_VISIT_COOKIE, visitId, getVisitCookieConfig());
        }
    };

    var getVisitIdFromEnvironment = function() {
        return getVisitIdFromParam() || getVisitIdFromUser() || null;
    };

    var getVisitIdFromParam = function() {
        return getUrlParamValue('roistat_visit');
    };

    var getVisitIdFromUser = function() {
        return state.visitFromUser;
    };

    var requestNewSettings = function(visitId, isForceUpdate) {
        if (
            !isForceUpdate
            && (
                state.isSettingsUpdating
                || (isVisibilityStateSupported && document.visibilityState === 'hidden')
                || (!isVisibilityStateSupported && !document.hasFocus())
            )
        ) {
            debug("Already updating settings or document not in focus, return");
            return;
        }
        var url = getApiBaseUrl()+'/get-settings?v=' + SCRIPT_VERSION + '&visit=' + visitId;
        debug('Request new settings');
        state.isSettingsUpdating = true;
        sendApiRequestJSONP(url);
    };

    var isSettingsSaved = function () {
        return storage.get(ROISTAT_IS_SETTINGS_SAVED_COOKIE) > 0;
    };

    var setSettingsSavedSuccessfully = function () {
        storage.set(ROISTAT_IS_SETTINGS_SAVED_COOKIE, 1);
    };

    var clearStorageWidgetSettings = function() {
        storage.remove(LEAD_HUNTER_FORM_TEMPLATE);
        storage.remove(LEAD_HUNTER_PULSATOR_TEMPLATE);
        storage.remove(LEAD_HUNTER_PULSATOR_SETTINGS);
        storage.remove(ONLINE_CHAT_PULSATOR_TEMPLATE);
        storage.remove(ONLINE_CHAT_IFRAME_TEMPLATE);
        storage.remove(ONLINE_CHAT_ENABLED);
        storage.remove(MULTIWIDGET_PULSATOR_TEMPLATE);
        storage.remove(MULTIWIDGET_PULSATOR_SETTINGS);
    }

    var checkAndClearSettings = function() {
        var _getCurrentSettingsVersion = function() {
            return storage.get(ROISTAT_SETTINGS_VERSION);
        };

        var _saveCurrentSettingsVersion = function() {
            storage.set(ROISTAT_SETTINGS_VERSION, SETTINGS_VERSION);
        };

        var _hasSettingVersion = function() {
            return typeof _getCurrentSettingsVersion() === 'string';
        }

        var _isInvalidSettingsVersion = function() {
            var isChangedSettingsVersion = Number(_getCurrentSettingsVersion()) > SETTINGS_VERSION;

            debug("Settings Version: settings version change status - " + isChangedSettingsVersion);
            return isChangedSettingsVersion;
        }

        var _isSettingsOutOfDate = function() {
            var _oneDayDiffInMs = 1000 * 60 * 60 * 24;
            var _lastUpdateTime = getLastUpdateTime();
            var _lastUpdateTimeDiff = currentTime() - _lastUpdateTime;
            var _result = _lastUpdateTimeDiff > _oneDayDiffInMs;

            debug("Settings Version:: expiration day check: lastUpdateTime=" + _lastUpdateTime +
                ", _lastUpdateTimeDiff=" + _lastUpdateTimeDiff +
                ", _oneDayDiffInMs=" + _oneDayDiffInMs +
                ", result=" + (_result ? 1 : 0));

            return _result;
        }

        if (!_hasSettingVersion()) {
            debug("Settings Version: set settings version up to 1");
            _saveCurrentSettingsVersion();
        }

        if (_isSettingsOutOfDate() || _isInvalidSettingsVersion()) {
            debug("Settings Version: clear settings");
            clearStorageWidgetSettings();
        }
    }

    var init = function() {
        debug("Call: Init");
        debug("Counter version: "+SCRIPT_VERSION);
        if (getUrlParamValue('roistat_ab_demo') === "1") {
            debug("Roistat initialisation rejected: ab test preview mode");
            return;
        }

        initMarker();
        initReferrer();

        if (isVisitLogsFocusGroupEnabled) {
            sendLogRequest(
                'visit init - start: '
                + 'pageVisitId: ' + pageVisitId
                + ', marker: ' + marker
                + ', visit: ' + getRoistatVisitId()
                + ', first visit: ' + getRoistatFirstVisitId()
                + ', url: ' + window.location.href
                + ', initUrl: ' + initUrl
                + ', document.referrer: ' + document.referrer
                + ', local referrer: ' + referrer
                + ', userAgent: ' + window.navigator.userAgent
            );

            setTimeout(function() {
                sendLogRequest(
                    'visit init - after timeout 1: '
                    + 'pageVisitId: ' + pageVisitId
                    + ', marker: ' + marker
                    + ', visit: ' + getRoistatVisitId()
                    + ', first visit: ' + getRoistatFirstVisitId()
                    + ', url: ' + window.location.href
                    + ', initUrl: ' + initUrl
                    + ', document.referrer: ' + document.referrer
                    + ', local referrer: ' + referrer
                    + ', userAgent: ' + window.navigator.userAgent
                );
            }, 5000);

            setTimeout(function() {
                sendLogRequest(
                    'visit init - after timeout 2: '
                    + 'pageVisitId: ' + pageVisitId
                    + ', marker: ' + marker
                    + ', visit: ' + getRoistatVisitId()
                    + ', first visit: ' + getRoistatFirstVisitId()
                    + ', url: ' + window.location.href
                    + ', initUrl: ' + initUrl
                    + ', document.referrer: ' + document.referrer
                    + ', local referrer: ' + referrer
                    + ', userAgent: ' + window.navigator.userAgent
                );
            }, 10000);

            setTimeout(function() {
                sendLogRequest(
                    'visit init - after timeout 3: '
                    + 'pageVisitId: ' + pageVisitId
                    + ', marker: ' + marker
                    + ', visit: ' + getRoistatVisitId()
                    + ', first visit: ' + getRoistatFirstVisitId()
                    + ', url: ' + window.location.href
                    + ', initUrl: ' + initUrl
                    + ', document.referrer: ' + document.referrer
                    + ', local referrer: ' + referrer
                    + ', userAgent: ' + window.navigator.userAgent
                );
            }, 20000);
        }

        if ((!alreadyVisited() || needOverride()) && !isRoistatMultiWidgetOnly()) {
            isNewVisit = true;
            setVisitIdCookie();
        } else {
            checkAndClearSettings();
            setVisitIdFromEnvironment();
            var visitId = getRoistatVisitId();
            sendAbTests();
            renderPromoCode();
            refreshPromoCode();
            roistat.visit        = visitId;
            state.source.marker  = getMarkerFromCookie();
            window.roistat.geo   = storage.getObject(ROISTAT_GEO_DATA);
            var isSettingsExists = storage.isAvailable() && isSettingsSaved();
            if (!isSettingsExists) {
                requestNewSettings(visitId);
            } else {
                visitProcessed();

                if (isVisitLogsFocusGroupEnabled) {
                    sendLogRequest(
                        'visit init - settings exist: '
                        + 'pageVisitId: ' + pageVisitId
                        + ', marker: ' + marker
                        + ', visit: ' + getRoistatVisitId()
                        + ', first visit: ' + getRoistatFirstVisitId()
                        + ', url: ' + window.location.href
                        + ', initUrl: ' + initUrl
                        + ', document.referrer: ' + document.referrer
                        + ', local referrer: ' + referrer
                        + ', userAgent: ' + window.navigator.userAgent
                    );
                }
            }
        }
        addVisitProcessedCallback(initExternalCounters);
        addVisitProcessedCallback(parseRoistatParams);
    };

    var initExternalCounters = function () {
        debug('InitExternalCounter');
        if (!storage.isExternalCountersEnabled()) {
            debug('ExternalCounters is not available, return');
            return;
        }
        var projectId = getProjectForUrl();
        var firstVisit = getRoistatFirstVisitId();
        var userIdPostfix = firstVisit ? firstVisit : getRoistatVisitId();
        var userId = projectId + ':' + userIdPostfix;
        var landingId = projectId + ':' + CryptoJS.MD5(getDomainFromUrl(document.domain)).toString();

        var sendRequest = function(userId, landingId) {
            var url = (document.location.protocol === "https:" ? "https:" : "http:") + "//tech.rtb.mts.ru/roistat?landing=" + landingId  + "&event_type=view&user_id=" + userId;
            var ajax = new XMLHttpRequest;
            ajax.open("GET", url, true);
            ajax.withCredentials = true;
            ajax.onload = function () {
                if (ajax.readyState === 4) {
                    if (ajax.status !== 204) {
                        console.error(ajax.statusText)
                    }
                }
            };
            ajax.onerror = function () {
                console.error(ajax.statusText)
            };
            ajax.send(null)
        }

        sendRequest(userId, landingId);
        debug('InitExternalCounter: script appended');
    };

    var isCurrentTimeFitTimeTable = function (timeTable) {
        if (!timeTable.isEnabled) {
            return true;
        }

        var currentDate = new Date();
        var currentFormattedTime = new Date().toISOString();
        var currentDay = currentDate.getUTCDay() === 0 ? 7 : currentDate.getDay();
        var isCurentDayWeekend = currentDay === 6 || currentDay === 7;
        var isProperDay = false;

        for (var i = 0; i < timeTable.days.length; i++) {
            if (currentDay === timeTable.days[i]) {
                isProperDay = true;
            }
        }

        if (!isProperDay) {
            return false;
        }

        if (isCurentDayWeekend && timeTable.weekendsTime !== null) {
            var weekendsStartTime = new Date(timeTable.weekendsTime.from).toISOString();
            var weekendsEndTime = new Date(timeTable.weekendsTime.to).toISOString();
            return currentFormattedTime >= weekendsStartTime &&  currentFormattedTime <=  weekendsEndTime;
        }

        var weekdaysStartTime = new Date(timeTable.weekdaysTime.from).toISOString();
        var weekdaysEndTime = new Date(timeTable.weekdaysTime.to).toISOString();

        return currentFormattedTime >= weekdaysStartTime &&  currentFormattedTime <=  weekdaysEndTime;
    };

    var initMarker = function() {
        debug("Call: initMarker");
        marker = calculateMarkerFromEnvironment();
        debug("Call: inited marker: " + marker);
    };

    var initReferrer = function() {
        debug('Call: initReferrer');
        referrer = extractReferrer();
        debug('Call: end initReferrer: ' + referrer);
    };

    var parseRoistatParams = function() {
        debug('Call: parsing roistat params from url');
        var roistatParams = {};

        for (var i = 1; i <= ROISTAT_PARAMS_MAX_COUNT; i++) {
            var key = 'roistat_param' + i;
            roistatParams[key] = getUrlParamValue(key, false);
        }

        var validRoistatParams = getValidRoistatParams(roistatParams);

        if (isNonEmptyObject(validRoistatParams) && Object.keys(validRoistatParams).length > 0) {
            setRoistatParamsToPageData(validRoistatParams);
        }

        debug('Call: end parsing roistat params from url');
    }

    /**
     * @param {String} ref
     * @returns {Boolean}
     */
    var isReferrerIsCurrentSite = function(ref) {
        if (!ref) {
            return true;
        }

        var referrerDomain = getDomainFromUrl(ref);
        var currentDomain  = getDomainFromUrl(document.domain);
        if (referrerDomain === currentDomain) {
            return true;
        }

        var counterDomain = getCounterDomain();
        if (counterDomain === null) {
            return false;
        }

        if (inString(referrerDomain, counterDomain) && inString(currentDomain, counterDomain)) {
            return true;
        }

        return false;
    };

    /**
     * @returns {String}
     */
    var getCounterDomain = function () {
        if (typeof COOKIE_CONFIG.domain === 'string' && COOKIE_CONFIG.domain !== '') {
            return getDomainFromUrl(COOKIE_CONFIG.domain);
        }
        return null;
    };

    /**
     *
     * @param {String} url
     * @returns {String}
     */
    var getDomainFromUrl = function(url) {
        var tempUrl = url.split('http://').join('').split('https://').join('').split('www.').join('').replace(/^\./, '');
        return tempUrl.split('/')[0];
    };

    var calculateMarkerFromEnvironment = function() {
        var isNeedParseReferrer = roistatGetCookie(MARKER_FROM_REFERRER_COOKIE) > 0;
        var markerFromEnv = null;
        var replaceUnderScore = function(string) {
            return string.split("_").join(":u:");
        };
        var tryToGetMarkerFromRsParam = function() {
            var result = false;
            var markerFromUrl;

            markerFromUrl = getUrlParamValue(ROISTAT_MARKER_PARAM_FULL, isNeedParseReferrer);
            if (markerFromUrl !== null) {
                markerFromEnv = markerFromUrl;
                result = true;
            }

            markerFromUrl = getUrlParamValue(ROISTAT_MARKER_PARAM, isNeedParseReferrer);
            if (markerFromUrl !== null) {
                markerFromEnv = markerFromUrl;
                result = true;
            }

            return result;
        };
        var tryToGetMarkerFromCookie = function() {
            var result = false;
            var markerFromCookie = getMarkerFromCookie();
            if (markerFromCookie) {
                markerFromEnv = markerFromCookie;
                result = true;
                isMarkerParsedFromEnv = false;
            }
            return result;
        };
        var tryToGetMarkerFromUTM = function() {
            var result = false;
            var utmSource = getUrlParamValue('utm_source', isNeedParseReferrer);
            if (utmSource !== null) {
                result = true;
                markerFromEnv = ":utm:"+replaceUnderScore(utmSource);
                var otherUTMs = ['utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
                var otherUTMValue;
                for (var i = 0; i < otherUTMs.length; i++) {
                    otherUTMValue = getUrlParamValue(otherUTMs[i], isNeedParseReferrer);
                    if (otherUTMValue !== null) {
                        markerFromEnv = markerFromEnv + "_" + replaceUnderScore(otherUTMValue);
                    }
                }
            }
            return result;
        };

        var tryToGetMarkerFromOpenstat = function() {
            var openstatSource, openstatUriPart, result = false;
            openstatUriPart = getUrlParamValue('_openstat', isNeedParseReferrer);

            if (!openstatUriPart) {
                return false;
            }

            if (isValidOpenStatMarker(openstatUriPart)) {
                openstatSource = openstatUriPart;
            } else {
                openstatSource = encodeURI(Base64.decode(openstatUriPart));
                if (!isValidOpenStatMarker(openstatSource)) {
                    openstatSource = openstatUriPart;
                }
            }

            if (openstatSource) {
                openstatSource = replaceUnderScore(openstatSource).split(";").join('_');
                markerFromEnv = ":openstat:"+openstatSource;
                result = true;
            }
            return result;
        };

        /**
         * @param {String} openStatMarker
         * @return {Boolean}
         */
        var isValidOpenStatMarker = function(openStatMarker) {
            return openStatMarker.match(/^([^;]*(;[^;]*){3})$/) !== null;
        };

        if (tryToGetMarkerFromRsParam()) {
            debug("Init marker: init from RS param " + markerFromEnv);
            return markerFromEnv;
        }
        if (tryToGetMarkerFromUTM()) {
            debug("Init marker: init from UTM " + markerFromEnv);
            return markerFromEnv;
        }
        if (tryToGetMarkerFromOpenstat()) {
            debug("Init marker: init from OpenStat " + markerFromEnv);
            return markerFromEnv;
        }
        debug("Init marker: try init from cookie " + markerFromEnv);
        tryToGetMarkerFromCookie();

        return markerFromEnv;
    };

    /**
     * @return {Number}
     */
    var getRoistatVisitId = function() {
        return storage.get(ROISTAT_VISIT_COOKIE);
    };

    /**
     * @return {Number}
     */
    var getRoistatFirstVisitId = function () {
        return storage.get(ROISTAT_FIRST_VISIT_COOKIE);
    };

    var saveReferrer = function() {
        debug('Call: saveReferrer');
        storage.set(REFERRER_COOKIE, referrer);
    };

    var removeReferrer = function() {
        debug('Call: removeReferrer');
        storage.remove(REFERRER_COOKIE);
    };

    var saveMarkerOld = function() {
        roistatSetCookie(MARKER_OLD_COOKIE, decodeURIComponentSafe(marker), getVisitCookieConfig());
    };

    var refreshPromoCode = function() {
        debug("Call: refreshPromoCode");

        if (isRoistatMultiWidgetOnly()) {
            debug('PromoCode: Shut down because only online chat need to be inited')
            return;
        }

        var getVisitId = function() {
            return roistatGetCookie(ROISTAT_VISIT_COOKIE);
        };
        setPromoCode(getVisitId());
        if (!window.onload) {
            window.onload = function() {
                setPromoCode(getVisitId());
            };
        }
        setTimeout(function() {
            setPromoCode(getVisitId());
        }, 50);
        setTimeout(function() {
            setPromoCode(getVisitId());
        }, 200);
        setTimeout(function() {
            setPromoCode(getVisitId());
        }, 2000);
        setTimeout(function() {
            setPromoCode(getVisitId());
        }, 10000);
    };
    window.roistatPromoCodeRefresh = refreshPromoCode;

    /**
     * @returns {Array}
     */
    var getPromoElements = function() {
        var result = [];
        var elements = document.getElementsByClassName(PROMO_CODE_CLASS);
        if (elements && elements.length) {
            result = elements;
        }
        return result;
    };

    /**
     * @param {Number} visitId
     */
    var setPromoCode = function(visitId) {
        var promoElements = getPromoElements();
        debug("setPromoCode: " + visitId + " in " + promoElements.length + " elements");
        for (var i = 0; i < promoElements.length; i++) {
            var element = promoElements[i];
            element.innerHTML = visitId ? visitId : "";
        }
    };

    /**
     * @returns {Boolean}
     */
    var needOverrideByMarker = function() {
        var currentMarkerEnvironment = calculateMarkerFromEnvironment(),
            oldMarker = roistatGetCookie(MARKER_OLD_COOKIE),
            markerExistsInEnvironment = currentMarkerEnvironment !== null,
            markerIsChanged = true;

        var currentMarkerForCompare = decodeURIComponentSafe(decodeURIComponentSafe(currentMarkerEnvironment)).toLowerCase().split("+").join(" "),
            oldMarkerForCompare = decodeURIComponentSafe(decodeURIComponentSafe(oldMarker)).toLowerCase().split("+").join(" ");

        if (currentMarkerEnvironment && oldMarker) {
            markerIsChanged = currentMarkerForCompare !== oldMarkerForCompare;
        }

        var result = markerExistsInEnvironment && markerIsChanged;
        overrideDebug = "Call: needOverrideByMarker (result " + (result ? "true" : "false") + ") with current " + currentMarkerEnvironment + ":" + currentMarkerForCompare + " and old " + oldMarker + ":" + oldMarkerForCompare;
        debug(overrideDebug);
        return result;
    };

    /**
     * @returns {Boolean}
     */
    var needOverrideByReferrer = function() {

        /**
         * @param {String} text
         * @return {Boolean}
         */
        var _isCyrillic = function(text) {
            return /[\u0400-\u04FF]/.test(text);
        };

        var result = false,
            currentReferrer = referrer,
            oldReferrer = storage.get(REFERRER_COOKIE),
            currentHost = window.location.host;

        if (!currentReferrer || !currentHost) {
            debug("Call: needOverrideByReferrer (result " + (result ? "true" : "false") + "), skip because one of params is empty");
            return result;
        }

        currentHost = getDomainFromUrl(currentHost);
        currentReferrer = decodeURIComponentSafe(currentReferrer);
        oldReferrer = decodeURIComponentSafe(oldReferrer);
        var currentHostFromReferrer = getDomainFromUrl(currentReferrer);

        if (inString(currentReferrer, "xn--") && _isCyrillic(currentHost)) {
            debug("Call: needOverrideByReferrer (result " + (result ? "true" : "false") + "), skip because of bugs with punycode in FF");
            return result;
        }

        if (!currentHostFromReferrer) {
            debug("Call: needOverrideByReferrer (result " + (result ? "true" : "false") + "), skip because current referrer is null");
            return result;
        }

        if (!oldReferrer) {
            result = !inString(currentHostFromReferrer, currentHost);
            debug("Call: needOverrideByReferrer (result " + (result ? "true" : "false") + "), compare current referrer and host");
            return result;
        }

        if (inString(currentReferrer, oldReferrer)) {
            debug("Call: needOverrideByReferrer (result " + (result ? "true" : "false") + "), skip because the same referrer");
            return result;
        }

        var isHostAndReferrerHaveSubDomains = currentHost.split('.').length > 2 && currentHostFromReferrer.split('.').length > 2;
        var isCookieDomainSetByUser = window.roistatCookieDomain !== undefined && window.roistatCookieDomain !== currentHost;
        var isSubDomainsOfSameDomain = currentHostFromReferrer.split('.').slice(1).join('.') === currentHost.split('.').slice(1).join('.');
        if (isHostAndReferrerHaveSubDomains && isCookieDomainSetByUser && isSubDomainsOfSameDomain) {
            debug("Call: needOverrideByReferrer (result " + (result ? "true" : "false") + "), skip because sub domains of same domain");
            return result;
        }
        result = !(inString(currentHostFromReferrer, currentHost) || (inString(currentHost, currentHostFromReferrer)));
        debug("Call: needOverrideByReferrer (result " + (result ? "true" : "false") + ") referrerHost: " + currentHostFromReferrer + ", currentHost: " + currentHost);
        return result;
    };

    /**
     * @returns {Boolean}
     */
    var noOverrideByUTM = function() {
        return getUrlParamValue('utm_nooverride') === '1';
    };

    /**
     * @returns {Boolean}
     */
    var needOverride = function() {
        return !isVisitIdInEnvironment() && !noOverrideByUTM() && (needOverrideByMarker() || needOverrideByReferrer());
    };

    /**
     * @param {*} oldVisitId
     * @param {*} newVisitId
     * @returns {Boolean}
     */
    var isVisitIdChanged = function(oldVisitId, newVisitId) {
        return (oldVisitId && newVisitId && oldVisitId != newVisitId);
    };

    /**
     * @param {Object} jsSettings
     */
    var saveJsSettings = function(jsSettings) {
        var nonSettingsCookies = ['cookieExpire'];
        var leadHunterEnabled = jsSettings.leadHunterEnabled;

        if (Number(storage.get(LEAD_HUNTER_ENABLED)) !== Number(jsSettings.leadHunterEnabled)) {
            storage.set(LEAD_HUNTER_ENABLED, Number(jsSettings.leadHunterEnabled));
        }

        if (leadHunterEnabled) {
            var cookieConfigLeadHunter = { expires: LEAD_HUNTER_EXPIRE_TIME, path: '/' };
            if (COOKIE_CONFIG.domain) {
                cookieConfigLeadHunter.domain = COOKIE_CONFIG.domain;
            }
            roistatSetCookie(LEAD_HUNTER_EXPIRE_COOKIE, 1, cookieConfigLeadHunter);
        }
        for (var settingName in jsSettings) {
            if (!Object.prototype.hasOwnProperty.call(jsSettings, settingName)) {
                continue;
            }
            if (!leadHunterEnabled && settingName.indexOf('leadHunter') >= 0 && settingName.indexOf('leadHunterTargetPagesMap') === -1)  {
                continue;
            }
            if (!arrayContains(nonSettingsCookies, settingName)) {
                if (settingName.indexOf('leadHunterTargetPagesMap') !== -1) {
                    var leadHunterTargetPagesMap = tryParseJson(jsSettings[settingName]);
                    if (leadHunterTargetPagesMap !== null) {
                        storage.setObject('roistat_' + settingName, leadHunterTargetPagesMap);
                    }
                    continue;
                }

                storage.set('roistat_' + settingName, jsSettings[settingName]);
            }
        }
    };

    /**
     *
     * @param {Object} settings
     */
    var saveMultiwidgetSettings = function (settings) {
        if (!settings) {
            return;
        }

        roistat.multiwidget = {
            isEnabled: settings.is_enabled,
            isVisible: roistat.multiwidget.isVisible,
            vk: {
                isEnabled: settings.vk.is_enabled,
                link: roistat.multiwidget.vk.link || settings.vk.link
            },
            fb: {
                isEnabled: settings.fb.is_enabled,
                link: roistat.multiwidget.fb.link || settings.fb.link
            },
            telegram: {
                isEnabled: settings.telegram.is_enabled,
                link: roistat.multiwidget.telegram.link || settings.telegram.link
            },
            whatsApp: {
                isEnabled: settings.whats_app.is_enabled,
                link: roistat.multiwidget.whatsApp.link || settings.whats_app.link
            },
            viber: {
                isEnabled: settings.viber.is_enabled,
                link: roistat.multiwidget.viber.link || settings.viber.link
            }
        };

        if (Number(storage.get(MULTIWIDGETS_ENABLED)) !== Number(settings.is_enabled)) {
            storage.set(MULTIWIDGETS_ENABLED, Number(settings.is_enabled));
        }

        if (Number(storage.get(MULTIWIDGET_VK_ENABLED)) !== Number(settings.vk.is_enabled)) {
            storage.set(MULTIWIDGET_VK_ENABLED, Number(settings.vk.is_enabled));
        }

        if (storage.get(MULTIWIDGET_VK_LINK) !== roistat.multiwidget.vk.link) {
            storage.set(MULTIWIDGET_VK_LINK, roistat.multiwidget.vk.link);
        }

        if (Number(storage.get(MULTIWIDGET_FB_ENABLED)) !== Number(settings.fb.is_enabled)) {
            storage.set(MULTIWIDGET_FB_ENABLED, Number(settings.fb.is_enabled));
        }

        if (storage.get(MULTIWIDGET_FB_LINK) !== roistat.multiwidget.fb.link) {
            storage.set(MULTIWIDGET_FB_LINK, roistat.multiwidget.fb.link);
        }

        if (Number(storage.get(MULTIWIDGET_TELEGRAM_ENABLED)) !== settings.telegram.is_enabled) {
            storage.set(MULTIWIDGET_TELEGRAM_ENABLED, Number(settings.telegram.is_enabled));
        }

        if (storage.get(MULTIWIDGET_TELEGRAM_LINK) !== roistat.multiwidget.telegram.link) {
            storage.set(MULTIWIDGET_TELEGRAM_LINK, roistat.multiwidget.telegram.link);
        }

        if (Number(storage.get(MULTIWIDGET_WHATS_APP_ENABLED)) !== settings.whats_app.is_enabled) {
            storage.set(MULTIWIDGET_WHATS_APP_ENABLED, Number(settings.whats_app.is_enabled));
        }

        if (storage.get(MULTIWIDGET_WHATS_APP_LINK) !== roistat.multiwidget.whatsApp.link) {
            storage.set(MULTIWIDGET_WHATS_APP_LINK, roistat.multiwidget.whatsApp.link);
        }

        if (Number(storage.get(MULTIWIDGET_VIBER_ENABLED)) !== settings.viber.is_enabled) {
            storage.set(MULTIWIDGET_VIBER_ENABLED, Number(settings.viber.is_enabled));
        }

        if (storage.get(MULTIWIDGET_VIBER_LINK) !== roistat.multiwidget.viber.link) {
            storage.set(MULTIWIDGET_VIBER_LINK, roistat.multiwidget.viber.link);
        }

        storage.setObject(MULTIWIDGET_SETTINGS, settings);
    };

    /**
     * @param {Object} settings
     */
    var saveOnlineChatSettings = function (settings) {
        roistat.onlineChat.isEnabled = settings.is_enabled;

        if (Number(storage.get(ONLINE_CHAT_ENABLED)) !== Number(settings.is_enabled)) {
            storage.set(ONLINE_CHAT_ENABLED, Number(settings.is_enabled));
        }

        roistat.onlineChat.isAvailableForCurrentUserAgent = settings.advanced_settings.is_available_for_current_user_agent;
        roistat.onlineChat.pagesFilter = settings.advanced_settings.pages_filter;

        storage.setObject(ONLINE_CHAT_SETTINGS, settings.advanced_settings);
    };

    /**
     * @param {object} settings
     */
    var saveGeoSettings = function (settings) {
        window.roistat.geo = settings;
        storage.setObject(ROISTAT_GEO_DATA, settings);
    }

    /**
     * @param {object} settings
     */
    var savePromoCodeSettings = function (settings) {
        debug('PromoCode: save settings');

        storage.setObject(ROISTAT_PROMO_CODE, settings);
    }

    /**
     * @param {object} settings
     */
    var saveLinksMarkupSettings = function (settings) {
        debug('LinksMarkup: save settings');

        storage.setObject(ROISTAT_LINKS_MARKUP, settings);
    }

    /**
     * @param {Object} jsSettings
     * @param {Object} calltrackingSettings
     * @param {Object} emailtrackingSettings
     * @param {Object} geoSettings
     * @param {Array} proxyFormSettings
     * @param {Object} multiwidgetSettings
     * @param {Object} onlineChatSettings
     * @param {Object} promoCodeSettings
     * @param {Object} linksMarkupSettings
     */
    var updateSettings = function (
        jsSettings,
        calltrackingSettings,
        emailtrackingSettings,
        geoSettings,
        proxyFormSettings,
        multiwidgetSettings,
        onlineChatSettings,
        promoCodeSettings,
        linksMarkupSettings
    ) {
        saveJsSettings(jsSettings);
        roistat.callTracking.enabled        = calltrackingSettings.is_enabled;
        roistat.emailtracking.loaded        = true;
        roistat.emailtracking.email         = emailtrackingSettings.email;
        roistat.emailtracking.trackingEmail = emailtrackingSettings.trackingEmail;
        roistat.emailtracking.emails        = emailtrackingSettings.emails;
        roistat.proxyForms.loaded           = true;
        roistat.proxyForms.settings         = proxyFormSettings;

        saveMultiwidgetSettings(multiwidgetSettings);
        saveOnlineChatSettings(onlineChatSettings);
        saveGeoSettings(geoSettings);
        savePromoCodeSettings(promoCodeSettings);
        saveLinksMarkupSettings(linksMarkupSettings);
    };

    /**
     * @param {Number} visitId
     * @param {String} markerName
     * @param {Object} settings
     * @param {{is_enabled: Number, phone: String, sessionTime: Number, replacementClasses: String, scripts: String, raw_phone: String}} callTrackingSettings
     * @param {{email: String}} emailtrackingSettings
     * @param {{geo: String}} geoSettings
     * @param {Array} proxyFormSettings
     * @param {Object} multiwidget
     * @param {Object} onlineChatSettings
     * @param {Object} promoCodeSettings
     * @param {Object} linksMarkupSettings
     */
    window.roistatModuleSetVisitCookie = function (
        visitId,
        markerName,
        settings,
        callTrackingSettings,
        emailtrackingSettings,
        geoSettings,
        proxyFormSettings,
        multiwidget,
        onlineChatSettings,
        promoCodeSettings,
        linksMarkupSettings
    ) {
        debug("Call: roistatModuleSetVisitCookie("+visitId+")");

        var cookieExpire;
        if (typeof settings.cookieExpire !== 'number') {
            cookieExpire = getVisitCookieConfig().expires;
        } else {
            cookieExpire = settings.cookieExpire;
        }

        var oldVisitId = roistatGetCookie(ROISTAT_VISIT_COOKIE);
        var cookieConfig = { expires: cookieExpire, path: '/' };
        if (COOKIE_CONFIG.domain) {
            cookieConfig.domain = COOKIE_CONFIG.domain;
        }

        storage.save(ROISTAT_VISIT_COOKIE, visitId, cookieConfig);

        if (!getRoistatFirstVisitId()) {
            var cookieConfigLong = { expires: 10*365*24*60*60, path: '/' };
            if (COOKIE_CONFIG.domain) {
                cookieConfigLong.domain = COOKIE_CONFIG.domain;
            }
            storage.save(ROISTAT_FIRST_VISIT_COOKIE, visitId, cookieConfigLong);
        }

        var abTests = settings.abTests;
        if ((typeof abTests !== 'undefined') && storage.isAvailable()) {
            storage.setObject('abTesting', abTests);
        }
        applyTests();

        var roistatListenRequests = settings.isNeedToListenRequests;
        if ((typeof roistatListenRequests !== 'undefined') && storage.isAvailable()) {
            storage.set(ROISTAT_LISTEN_REQUESTS_COOKIE, roistatListenRequests);
        }

        setPromoCode(visitId);

        if (markerName) {
            setMarkerCookie(markerName);
            roistatSetCookie(MARKER_OLD_COOKIE, markerName, cookieConfig);
        }

        if (window.roistatCallback !== undefined) {
            window.roistatCallback(visitId, markerName);
        }

        if (!multiwidget) {
            multiwidget = {};
        }

        updateSettings(
            settings,
            callTrackingSettings,
            emailtrackingSettings,
            geoSettings,
            proxyFormSettings,
            multiwidget.multiwidget_settings,
            onlineChatSettings,
            promoCodeSettings,
            linksMarkupSettings
        );

        roistat.callTracking.phone              = callTrackingSettings.phone;
        roistat.callTracking.sessionTime        = callTrackingSettings.sessionTime;
        roistat.callTracking.replacementClasses = callTrackingSettings.replacementClasses;
        roistat.callTracking.phoneScriptsJson   = callTrackingSettings.scripts;
        roistat.callTracking.rawPhone           = callTrackingSettings.raw_phone;
        roistat.visit                           = visitId;

        debug("Call: pre renderPromoCode");
        renderPromoCode();
        refreshPromoCode();
        if (isVisitIdChanged(oldVisitId, visitId)) {
            debug("roistatModuleSetVisitCookie: visit changed from " + oldVisitId + " to " + visitId);
        }

        callTrackingPhoneReceived();
        setSettingsSavedSuccessfully();
        visitProcessed();

        if (isVisitLogsFocusGroupEnabled) {
            sendLogRequest(
                'visit init - new visit: '
                + 'pageVisitId: ' + pageVisitId
                + ', marker: ' + marker
                + ', visit: ' + getRoistatVisitId()
                + ', first visit: ' + getRoistatFirstVisitId()
                + ', url: ' + window.location.href
                + ', initUrl: ' + initUrl
                + ', document.referrer: ' + document.referrer
                + ', local referrer: ' + referrer
                + ', userAgent: ' + window.navigator.userAgent
            );
        }
    };

    /**
     * @param {Object} settings
     * @param {Object} [settings.calltracking]
     * @param {Object} [settings.emailtracking]
     * @param {Object} [settings.geo]
     * @param {Object} [settings.js_settings]
     * @param {Object} [settings.leadhunter_templates]
     * @param {Object} [settings.multiwidget]
     * @param {Object} [settings.multiwidget_templates]
     * @param {Object} [settings.online_chat]
     * @param {Object} [settings.online_chat_templates]
     * @param {Array} [settings.proxy_forms]
     * @param {Object} [settings.promo_code]
     * @param {Object} [settings.links_markup]
     */
    window.roistatUpdateSettings = function (settings) {
        debug('Set settings.');
        state.isSettingsUpdating = false;
        updateSettings(
            settings.js_settings,
            settings.calltracking,
            settings.emailtracking,
            settings.geo,
            settings.proxy_forms,
            settings.multiwidget.multiwidget_settings,
            settings.online_chat,
            settings.promo_code,
            settings.links_markup
        );
        setSettingsSavedSuccessfully();
        visitProcessed();

        if (isVisitLogsFocusGroupEnabled) {
            sendLogRequest(
                'visit init - update settings: '
                + 'pageVisitId: ' + pageVisitId
                + ', marker: ' + marker
                + ', visit: ' + getRoistatVisitId()
                + ', first visit: ' + getRoistatFirstVisitId()
                + ', url: ' + window.location.href
                + ', initUrl: ' + initUrl
                + ', document.referrer: ' + document.referrer
                + ', local referrer: ' + referrer
                + ', userAgent: ' + window.navigator.userAgent
            );
        }
    };

    /**
     * @returns {Boolean}
     */
    var alreadyVisited = function() {
        var result;
        if (window.roistatIsInitVisit === true) {
            result = false;
        } else {
            result = storage.get(ROISTAT_VISIT_COOKIE) > 0;
        }
        debug("Call: alreadyVisited (return " + (result ? "true" : "false") + ")");
        return result;
    };

    /**
     * @returns {string}
     */
    var getEscapedQueryString = function(param) {
        return encodeURIComponent ? encodeURIComponent(param) : encodeURI(param);
    };

    /**
     * @returns {string}
     */
    var getEscapedReferrer = function() {
        return referrer ? getEscapedQueryString(referrer) : '';
    };

    /**
     * @returns {String}
     */
    var getApiBaseUrl = function() {
        return protocol() + "//"+ROISTAT_HOST+"/api/site/"+API_VERSION_NEW+"/"+getProjectForUrl();
    };

    var clearAbCookie = function() {
        var cookieConfigForDelete = {expires: 1, path: '/'};
        var cookieConfigForSave   = {expires: PREVIOUS_AB_COOKIE_EXPIRE_TIME, path: '/'};
        if (COOKIE_CONFIG.domain) {
            cookieConfigForDelete.domain = COOKIE_CONFIG.domain;
            cookieConfigForSave.domain   = COOKIE_CONFIG.domain;
        }

        var abCookie = roistatGetCookie(ROISTAT_AB_COOKIE);
        if (abCookie) {
            roistatSetCookie(ROISTAT_PREVIOUS_AB_COOKIE, abCookie, cookieConfigForSave);
        }

        roistatSetCookie(ROISTAT_AB_COOKIE, '', cookieConfigForDelete);
        roistatSetCookie(ROISTAT_AB_SUBMIT_COOKIE, '', cookieConfigForDelete);
    };

    var getAbVariants = function () {
        var tests = storage.getObject('abTesting');
        if (!isObject(tests)) {
            return '';
        }

        var testKey, test, variants = [];
        for (testKey in tests) {
            if (!Object.prototype.hasOwnProperty.call(tests, testKey)) {
                continue;
            }
            test = tests[testKey];
            variants.push(test.id + ':' + test.variantId);
        }

        return variants.join(',');
    }

    var setVisitIdCookie = function() {
        debug('Call: setVisitIdCookie');
        var calculateApiUrl = function() {
            var referrer = getEscapedReferrer(),
                visitId = window.roistatIsInitVisit === true ? getRoistatVisitId() : 0,
                ab = roistatGetCookie(ROISTAT_AB_COOKIE),
                guid = roistatGetCookie(ROISTAT_GUID_COOKIE),
                firstVisit = getRoistatFirstVisitId();
            ab = ab ? ab : '';
            firstVisit = firstVisit ? firstVisit : '';

            marker = marker && (!needOverrideByReferrer() || isMarkerParsedFromEnv) ? decodeURIComponentSafe(decodeURIComponentSafe(marker)) : '';
            var escapedInitUrl = encodeURIComponent(initUrl);
            debug('Calltracking: enabled=' + settings.callTrackingEnabled + ', manual=' + settings.callTrackingManual);
            var pageParams = JSON.stringify(window.roistat.page.params);
            var deviceParams = getDeviceParams();
            var encodedDeviceParams = '';
            for (var paramName in deviceParams) {
                if (!deviceParams.hasOwnProperty(paramName)) {
                    continue;
                }
                var value = deviceParams[paramName];
                if (value !== null) {
                    encodedDeviceParams += '&' + paramName + '=' + encodeURIComponent(value);
                }
            }
            var calculatedApiUrl = getApiBaseUrl()
                + '/addVisit?v=' + SCRIPT_VERSION
                + '&marker=' + encodeURIComponent(marker)
                + '&visit=' + visitId
                + '&first_visit=' + firstVisit
                + '&guid=' + guid
                + '&phone_prefix=' + roistatPhonePrefix
                + '&phone_prefix_bind=' + roistatPhonePrefixBind
                + '&phone_scripts_bind=' + roistatCalltrackingScripts
                + '&referrer=' + referrer
                + '&page=' + escapedInitUrl
                + '&ab=' + getEscapedQueryString(ab)
                + '&ab_variants=' + getEscapedQueryString(getAbVariants())
                + '&' + getVisitHashParamName() + '=' + getVisitHash()
                + (pageParams === '{}' ? '' : '&page_params=' + encodeURIComponent(pageParams))
                + ((!settings.callTrackingEnabled || settings.callTrackingManual) ? '&call_tracking_disabled=1' : '') + encodedDeviceParams;

            if (isVisitLogsFocusGroupEnabled) {
                sendLogRequest(
                    'visit init - calculateApiUrl: '
                    + 'pageVisitId: ' + pageVisitId
                    + ', marker: ' + marker
                    + ', visit: ' + getRoistatVisitId()
                    + ', first visit: ' + getRoistatFirstVisitId()
                    + ', url: ' + window.location.href
                    + ', initUrl: ' + initUrl
                    + ', document.referrer: ' + document.referrer
                    + ', local referrer: ' + referrer
                    + ', userAgent: ' + window.navigator.userAgent
                );
            }

            return calculatedApiUrl;
        };

        var sendJSONPRequest = function(apiUrl) {
            setTimeout(function() {
                debug('Call: setVisitIdCookie script creation after timeout');
                var script = document.createElement('script');
                script.onload = function() {
                    debug('Call: setVisitIdCookie script loaded');

                    if (isVisitLogsFocusGroupEnabled) {
                        sendLogRequest(
                            'visit init - setVisitIdCookie loaded: '
                            + 'pageVisitId: ' + pageVisitId
                            + ', marker: ' + marker
                            + ', visit: ' + getRoistatVisitId()
                            + ', first visit: ' + getRoistatFirstVisitId()
                            + ', url: ' + window.location.href
                            + ', initUrl: ' + initUrl
                            + ', document.referrer: ' + document.referrer
                            + ', local referrer: ' + referrer
                            + ', userAgent: ' + window.navigator.userAgent
                        );
                    }
                };
                script.src = appendMaParam(apiUrl);
                script.type = 'text/javascript';
                script.async = true;
                script.id = ROISTAT_SCRIPT_ID;
                var otherScript = document.getElementsByTagName('script')[0];
                otherScript.parentNode.insertBefore(script, otherScript);
                debug('Call: setVisitIdCookie appended ' + ((document.getElementById(ROISTAT_SCRIPT_ID)) ? 'true' : 'false'));
                debug('Call: sendJSONPRequest to URL ' + apiUrl);
                clearAbCookie();
            }, settings.jsonpRequestTimeout);
        };

        if (marker) {
            setMarkerCookie(marker);
            saveMarkerOld();
        }

        var nextGuid = roistatGetCookie(ROISTAT_NEXT_GUID_COOKIE);
        if (nextGuid) {
            roistatSetCookie(ROISTAT_GUID_COOKIE, nextGuid, COOKIE_CONFIG);
        }

        setCookieAdditionalParameters();
        var apiUrl = calculateApiUrl();
        sendJSONPRequest(apiUrl);
        referrer ? saveReferrer() : removeReferrer();
    };

    var sendAbTests = function() {
        debug("Call: sendAbTests");
        var calculateApiUrl = function() {
            var project = getProjectForUrl(),
                visitId = roistatGetCookie(ROISTAT_VISIT_COOKIE);
            return appendMaParam(protocol() + "//"+ROISTAT_HOST+"/site-api/"+API_VERSION+"/"+project+"/visit/"+visitId+"/addAbVariant");
        };

        var ab = roistatGetCookie(ROISTAT_AB_COOKIE);
        var previousAb = roistatGetCookie(ROISTAT_PREVIOUS_AB_COOKIE);

        if (ab === previousAb || !ab) {
            clearAbCookie();
            return;
        }

        var apiUrl = calculateApiUrl();
        apiUrl = apiUrl + "?ab=" + getEscapedQueryString(ab);

        var img = document.createElement('img');
        img.src = apiUrl;
        clearAbCookie();
    };

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var Browser = {
        isIE: function (version, comparison) {
            var cc      = 'IE',
                b       = document.createElement('B'),
                docElem = document.documentElement,
                isIE;

            if(version){
                cc += ' ' + version;
                if(comparison){ cc = comparison + ' ' + cc; }
            }

            b.innerHTML = '<!--[if '+ cc +']><b id="iecctest"></b><![endif]-->';
            docElem.appendChild(b);
            isIE = !!document.getElementById('iecctest');
            docElem.removeChild(b);
            return isIE;
        },
        isSafari: function() {
            var userAgent = window.navigator.userAgent.toLowerCase();
            return userAgent.includes('safari') && !userAgent.includes('chrome');
        }
    };

    var getLastUpdateTime = function() {
        return storage.get(SETTINGS_UPDATE_TIME_KEY);
    };

    var sendDebug = function() {
        var jsError = "";
        window.onerror = function(msg, url, line, col, error) {
            var extra = !col ? '' : ', column: ' + col;
            extra += !error ? '' : ', error: ' + error;
            jsError = jsError + ", " + "Error: " + msg + ", url: " + url + ", line: " + line + extra;
        };
        setTimeout(function() {
            var isError = false,
                message = "";
            var promoElements = getPromoElements();
            for (var i = 0; i < promoElements.length; i++) {
                var promoElement = promoElements[i];

                if (promoElement !== null && !promoElement.innerHTML) {
                    isError = true;
                    message = "Promo HTML: " + promoElement.innerHTML;
                }
            }
            if (!(roistatGetCookie(ROISTAT_VISIT_COOKIE) > 0)) {
                isError = true;
                message = message + "; roistat_visit = " + roistatGetCookie(ROISTAT_VISIT_COOKIE);
            }
            if (isError) {
                var responseScriptElement = document.getElementById(ROISTAT_SCRIPT_ID);
                var scriptExists = responseScriptElement ? 1 : 0;
                var agent = window.navigator.userAgent;
                message = encodeURIComponent(message);
                var img = document.createElement('img');
                img.src = appendMaParam(protocol() + "//"+ROISTAT_HOST+"/site-api/"+API_VERSION+"/"+getProjectForUrl()+"/debug?message="+message+"&agent="+agent+"&"+getVisitHashParamName()+"="+getVisitHash()+"&jserror="+jsError+"&scriptResponse="+scriptExists+"&version="+SCRIPT_VERSION+"&debug="+debugLog);
            }
        }, 20000);
    };

    /**
     * @returns {{width: (Number), height: (Number)}}
     */
    var getWindowSize = function() {
        var bodyTag = document.getElementsByTagName('body');
        var documentElement = document.documentElement;
        var x = 0,
            y = 0;
        if (bodyTag.length) {
            var body = bodyTag[0];
            x = window.innerWidth || documentElement.clientWidth || body.clientWidth;
            y = window.innerHeight|| documentElement.clientHeight|| body.clientHeight;
        } else {
            x = window.innerWidth || documentElement.clientWidth;
            y = window.innerHeight|| documentElement.clientHeight;
        }
        return { width: x, height: y };
    };

    var renderPromoCode = function() {
        var oldPromoCode = document.getElementsByClassName('roistat-promo-wrap');
        if (oldPromoCode.length) {
            debug('PromoCode: old promo code length - exit');
            return;
        }

        if (isRoistatMultiWidgetOnly()) {
            debug('PromoCode: Shut down because only online chat need to be inited');
            return;
        }

        var promoCodeSettings = storage.getObject(ROISTAT_PROMO_CODE);
        if (promoCodeSettings && promoCodeSettings.hasOwnProperty('is_enabled')) {
            window.roistat.promoCode.isEnabled = promoCodeSettings.is_enabled;
            debug('PromoCode: set is_enabled from storage');
        }

        var _renderPromoCode = function() {
            var div = document.createElement('div');
            div.innerHTML = roistatPromoCode;
            var bodyTag = document.getElementsByTagName('body');
            if (bodyTag.length) {
                bodyTag[0].appendChild(div);
            }
            debug('PromoCode: appended to body ' + roistatPromoCode.length);

            var promoCodeDiv = document.getElementsByClassName('roistat-promo-wrap')[0];
            if (!promoCodeDiv) {
                debug('PromoCode: roistat-promo-wrap not found, skip');
                return;
            }
            var promoCodeStyle = promoCodeDiv.style;

            var windowSize, promoCodeWidth, promoCodeHeight;

            setInterval(function() {
                windowSize = getWindowSize();
                promoCodeWidth = promoCodeDiv.offsetWidth;
                promoCodeHeight = promoCodeDiv.offsetHeight * 2;


                /*var fontSize = 1;
                 if (isMobile.any()) {
                 fontSize = fontSize * 2;
                 }
                 promoCodeStyle.fontSize = fontSize + 'em';*/

                switch(roistatPosition) {
                    case 'top_left': promoCodeStyle.left = 0; promoCodeStyle.top = 0; break;
                    case 'top': promoCodeStyle.left = ((windowSize.width - promoCodeWidth) / 2)+'px'; promoCodeStyle.top = 0; break;
                    case 'top_right': promoCodeStyle.right = 0; promoCodeStyle.top = 0; break;
                    case 'left': promoCodeStyle.left = 0; promoCodeStyle.top = ((windowSize.height - promoCodeHeight) / 2)+'px'; break;
                    case 'right': promoCodeStyle.right = 0; promoCodeStyle.top = ((windowSize.height - promoCodeHeight) / 2)+'px'; break;
                    case 'bottom_left': promoCodeStyle.left = 0; promoCodeStyle.bottom = 0; break;
                    case 'bottom': promoCodeStyle.left = ((windowSize.width - promoCodeWidth) / 2)+'px'; promoCodeStyle.bottom = 0; break;
                    case 'bottom_right': promoCodeStyle.right = 0; promoCodeStyle.bottom = 0; break;
                    default: promoCodeStyle.left = 0; promoCodeStyle.top = 0;
                }
            }, 500);
        };

        var promoCodeOptions = storage.getObject('promo_code_options');
        if (promoCodeOptions) {
            debug('PromoCode: options already set');
            window.roistatPromoCode = promoCodeOptions.template;
            window.roistatPosition = promoCodeOptions.position;
            _renderPromoCode();
        } else {
            if (!window.roistat.promoCode.isEnabled) {
                debug('PromoCode: is not available, skip');
                return;
            }

            var head = document.getElementsByTagName("head")[0] || document.documentElement;
            var script = document.createElement('script');
            script.src = appendMaParam(protocol() + "//"+ROISTAT_HOST+"/site-api/"+API_VERSION+"/"+getProjectForUrl()+"/getPromoCode");
            head.insertBefore( script, head.firstChild );
            debug('PromoCode: loading started');
            var done = false;
            script.onload = script.onreadystatechange = function() {
                if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
                    done = true;

                    // Handle memory leak in IE
                    script.onload = script.onreadystatechange = null;
                    if ( head && script.parentNode ) {
                        head.removeChild( script );
                    }
                }
                if (!done) {
                    return;
                }
                debug('PromoCode: loaded');
                if (typeof roistatPromoCode === 'undefined' || roistatPromoCode.length < 1) {
                    debug('PromoCode: is disabled');
                    return;
                }
                promoCodeOptions = {
                    template: roistatPromoCode,
                    position: roistatPosition
                };
                storage.setObject('promo_code_options', promoCodeOptions);
                _renderPromoCode();
            };
        }
    };

    /**
     * @param {Array} haystack
     * @param {*} needle
     * @returns {boolean} whether needle found in haystack
     */
    var arrayContains = function (haystack, needle) {
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle) {
                return true;
            }
        }
        return false;
    };

    var sendLogMessage = function(message) {
        if (!isApiLogFocusGroupEnabled || message === "") {
            return;
        }

        var visitId = getRoistatVisitId();
        sendLogRequest("visit: " + visitId + " " + message);
    };

    var sendLogRequest = function(message) {
        var url = getApiBaseUrl() + '/log?log=' + encodeURIComponent(message);
        sendApiRequestJSONP(url);
    };

    var bindSPAEvents = function bindSPAEvents() {
        var userSideClientPopStateListener = window.onpopstate;
        var userSideClientPushStateListener = window.history.pushState;
        var userSideClientReplaceStateListener = window.history.replaceState;

        _addEventListener(window, 'popstate', function spaOnPopState(event){
            debug('[Roistat]: popstate event catch');
            spaPageChanged();

            if (isBetaTest() && typeof userSideClientPopStateListener === 'function') {
                userSideClientPopStateListener(event);
            }
        });
        _addEventListener(window.history, 'pushState', function spaOnPushState(state, title, url){
            debug('[Roistat]: pushState event catch');
            spaPageChanged();

            if (isBetaTest() && typeof userSideClientPushStateListener === 'function') {
                userSideClientPushStateListener.apply(this, [state, title, url]);
            }
        });
        _addEventListener(window.history, 'replaceState', function spaOnReplaceState(stateObject, title, url){
            debug('[Roistat]: replaceState event catch');
            spaPageChanged();

            if (isBetaTest() && typeof userSideClientReplaceStateListener === 'function') {
                userSideClientReplaceStateListener.apply(this, [stateObject, title, url]);
            }
        });
    };

    (function onRoistatModuleLoadingComplete(){
        bindSPAEvents();
        if (window.onRoistatModuleLoaded !== undefined && typeof window.onRoistatModuleLoaded === 'function') {
            window.onRoistatModuleLoaded();
        }
    })();

    (function crossdevice(){
        var ROISTAT_CROSSDEVICE_HOST = 'fngr.' + getBaseHost(ROISTAT_HOST);

        var IS_ENABLED = false;

        if (!IS_ENABLED) {
            debug('Fingerprint: disabled');
            return;
        }

        window.roistat.crossdevice = {
            registerFingerprint: function crossdeviceRegisterFingerprint(fingerprintData) {
                debug('Fingerprint: collected data ' + JSON.stringify(fingerprintData));
                roistat.registerOnVisitProcessedCallback(function () {
                    debug('Fingerprint: sending to service');
                    var values = Object.keys(fingerprintData)
                        .map(function(key){
                            return fingerprintData[key].key+"="+encodeURIComponent(fingerprintData[key].data)
                        })
                        .join('&');

                    values = values + '&visit='+getProjectForUrl()+'|'+getRoistatFirstVisitId()+'|'+roistat.getVisit();
                    values += '&host=' + encodeURIComponent(window.location.host);

                    var apiUrl = protocol() + '//'+ROISTAT_CROSSDEVICE_HOST+'/register?'+values;
                    sendApiRequestJSONP(apiUrl);
                });
            },
            markVisit: function crossdeviceMarkVisit(value) {
                debug('Fingerprint: marking visit ' + value);
                // todo set visit crossdevice param called by jsonp request by crossdevice service on /register
            },
        };

        debug("Fingerprint: initialising library");
        var apiUrl = protocol() + "//"+ROISTAT_CROSSDEVICE_HOST+"/static/fingerprint.js";
        sendApiRequestJSONP(apiUrl);
    })();

    var isPageEnabled = function(targetPagesList) {
        /**
         * @param {String} currentUrl
         * @param {String} settingUrl
         * @returns {Boolean}
         */
        var _checkHref = function(currentUrl, settingUrl) {
            var result;
            if (inString(settingUrl, '*')) {
                var pattern = new RegExp(settingUrl.split("*").join(".*"));
                result =  pattern.test(currentUrl);
            } else {
                result = currentUrl === settingUrl;
            }
            debug('LeadHunter: compare current: ' + currentUrl + ', setting: ' + settingUrl + ' with result = ' + (result ? 1 : 0));
            return result;
        };

        var href = window.location.href,
            isCurrentPageEnabled = false,
            isCurrentPageDisabled = false,
            cleanHref = '',
            whiteListCount = 0,
            targetPages;

        targetPages = targetPagesList ? targetPagesList.split(",") : [];

        if (!href || targetPages.length === 0) {
            isCurrentPageEnabled = true;
        } else {
            cleanHref = extractHostAndPath(href);
            var targetPage;
            for (var i = 0; i < targetPages.length; i++) {
                targetPage = targetPages[i].split("www.").join("").split("http://").join("").split("https://").join("").replace(/\/+$/, "");
                if (/^!/.test(targetPage)) {
                    if (_checkHref(cleanHref, targetPage.split(/^!/).join(""))) {
                        isCurrentPageDisabled = true;
                        break;
                    }
                } else {
                    whiteListCount++;
                    if (_checkHref(cleanHref, targetPage)) {
                        isCurrentPageEnabled = true;
                        break;
                    }
                }
            }
        }

        if (isCurrentPageDisabled) {
            debug('LeadHunter: current page "' + cleanHref + '" is disabled by list');
            return false;
        }
        if (!isCurrentPageEnabled && whiteListCount > 0) {
            debug('LeadHunter: current page "' + cleanHref + '" is not listed');
            return false;
        }
        debug('LeadHunter: current page "' + href + '", cleaned: "' + cleanHref + '" is not disabled in ' + targetPages.length + ' list of pages');
        return true;
    };

    // @todo move module init to bottom, because submodules are to register their global functions before onRoistatModuleLoadedEvent
    try {
        init();
    } catch(e) {
        sendLogMessage(e);
    }

    (function widgets() {
        var EMPTY_FLAG                          = 'empty',
            isLeadHunterPulsatorEnabled         = false,
            isLeadHunterPulsatorShownAtThisPage = true,
            hasMultiwidgetFocusGroup            = false;

        var onlineChatParams = {
            roistat_visit: roistatGetCookie(ROISTAT_VISIT_COOKIE),
            marker: marker,
            user_agent: window.navigator.userAgent,
            current_page: {
                title: document.title,
                href: window.location.protocol + '//' + window.location.host + window.location.pathname,
            },
        };
        /**
         * @param {HTMLElement} obj
         * @param {String} evType
         * @param {Function} fn
         */
        var _addEvent = function(obj, evType, fn) {
            if (obj.addEventListener) {
                obj.addEventListener(evType, fn, false);
            } else if (obj.attachEvent) {
                obj.attachEvent("on" + evType, fn);
            } else {
                debug("Handler could not be attached");
            }
        };

        /**
         *
         * @param {HTMLElement} obj
         * @param {String} className
         * @private
         */
        var _getSafeFirstElementByClassName = function (obj, className) {
            if (obj === undefined || typeof className !== 'string' || className.length === 0) {
                return;
            }

            var elements = obj.getElementsByClassName(className);

            if (elements === undefined || elements.length === 0) {
                return;
            }

            return elements[0];
        }

        /**
         *
         * @param {HTMLElement} node
         * @private
         */
        var _isNodeElement = function (node) {
            return typeof node === 'object' && node !== null;
        }

        var toggleElementClass = function(element, elementClass, needAddClass) {
            if (_isNodeElement(element)) {

                if (needAddClass) {
                    element.classList.add(elementClass);

                    return;
                }

                element.classList.remove(elementClass);
            }
        };

        var visualViewport = window.visualViewport;
        var isVisualViewportSupported = 'visualViewport' in window;

        var getSafeDivisor = function(value) {
            return (value === 0) ? 1 : value;
        };

        var getPulsatorScaleValue = function() {
            var scaleValue;
            if (isVisualViewportSupported) {
                scaleValue = 1 / getSafeDivisor(visualViewport.scale);
            } else {
                scaleValue = window.innerWidth / getSafeDivisor(window.outerWidth);
            }
            return scaleValue;
        };

        var getPulsatorScale = function() {
            if (isMobileOrTabletWindowWidth()) {
                return 'none';
            }

            return 'scale(' + getPulsatorScaleValue() + ')';
        };

        var getPulsatorTriggerScale = function() {
            if (!isMobileOrTabletWindowWidth()) {
                return 'none';
            }

            return 'scale(' + getPulsatorScaleValue() + ')';
        }

        var availableWidgets = {
            leadHunter: function() {
                var FORM_CLASS           = 'roistat-lh-form',
                    FORM_ID                = 'roistat-lh-form',
                    HEAD_CLASS             = 'roistat-lh-head-text',
                    HEAD_ID                = 'roistat-lh-head',
                    THANK_YOU_CLASS        = 'roistat-lh-thank-you',
                    THANK_YOU_ID           = 'roistat-lh-thank-you',
                    CLOSE_ID               = 'roistat-lh-close',
                    SUBMIT_ID              = 'roistat-lh-submit',
                    HIDDEN_CLASS           = 'roistat-lh-hidden',
                    WRAP_CLASS             = 'roistat-lh-wrap',
                    POPUP_ROOT_CLASS       = 'roistat-lh-popup-wrapper',
                    POPUP_CLASS            = 'roistat-lh-popup',
                    AGREEMENT_ID           = 'roistat-lh-agreement',
                    AGREEMENT_CLASSES      = 'roistat-lh-agreement roistat-lh-mobile',
                    AGREEMENT_INPUT_ID     = 'roistat-lh-agreement-input',
                    AGREEMENT_LINK_ID      = 'roistat-lh-agreement-link',
                    AGREEMENT_DOC_ID       = 'roistat-lh-agreement-doc',
                    AGREEMENT_ERROR_ID     = 'roistat-lh-alert-row',
                    AGREEMENT_CONTAINER_ID = 'roistat-lh-agreement',
                    IFRAME_ID              = 'roistat-lh-popup-iframe',

                    // Cookie settings
                    URL                             = "roistat_leadHunterUrl",
                    APPEARANCE_URL                  = "roistat_leadHunterAppearanceUrl",
                    PAGES_LIST                      = "roistat_leadHunterTargetPagesList",
                    CAUGHT                          = 'roistat_leadHunterCaught',
                    MINIMUM_TIME                    = 'roistat_leadHunterMinTime',
                    AUTO_SHOW_TIME                  = 'roistat_leadHunterAutoShowTime',
                    PULSATOR_ENABLED                = 'roistat_leadHunterPulsatorEnabled',
                    LEAD_HUNTER_SCRIPTS_CAUGHT      = 'roistat_leadHunterScriptsCaught',
                    LEAD_HUNTER_SCRIPTS_SHOWN_COUNT = 'roistat_leadHunterScriptsShownCount',

                    // Messages types
                    LOAD_DONE_MESSAGE          = 'roistat-lh-load-done',
                    CLOSE_MODAL_MESSAGE        = 'roistat-lh-close-modal',
                    SCRIPT_SETTINGS_MESSAGE    = 'roistat-lh-script-settings',
                    IFRAME_SETTING_SIZE        = 'roistat-lh-setting-size',
                    BEFORE_SUBMIT_MESSAGE      = 'roistat-lh-before-submit',
                    BEFORE_SUBMIT_DONE_MESSAGE = 'roistat-lh-before-submit-done',
                    AFTER_SUBMIT_MESSAGE       = 'roistat-lh-after-submit',
                    EVENT_DATA_MESSAGE         = 'roistat-lh-event-data',
                    TRANSLATE_FORM_MESSAGE     = 'roistat-lh-translate-form',

                    PULSATOR_POSITION_BY_LABEL = {
                        topLeft: {
                            bottom: '80%',
                            right: 'auto',
                            transformOrigin: 'top left'
                        },
                        topRight: {
                            bottom: '80%',
                            right: '3%',
                            transformOrigin: 'top right'
                        },
                        bottomRight: {
                            bottom: '10%',
                            right: '3%',
                            transformOrigin: 'bottom right'
                        },
                        bottomLeft: {
                            bottom: '10%',
                            right: 'auto',
                            transformOrigin: 'bottom left'
                        }
                    };

                var calculatingZone    = .3,
                    modalZone            = .001,
                    isModalShown         = false,
                    startTime            = 0,
                    previousTop          = 0,
                    lastY                = 0,
                    minTime              = 0,
                    autoTime             = 0,
                    isExpired            = false,
                    isCentered           = false,
                    isIframeLeadHunterSuccessfullyLoaded = false,

                    pulsatorElement, pulsatorFill, pulsatorIcon, popupElement, wrapElement, headElement, formElement, thankYouElement, closeElement, submitElement,
                    agreementElement, agreementLink, agreementInput, agreementDoc, agreementError, agreementContainer, leadHunterUrl, leadHunterAppearanceUrl, isIframedLeadHunter,
                    iframeTargetOrigin, lhIframe, lhScriptId, lhScriptMaxShownCount, leadHunterPulsatorSettings;

                var localState = {
                    pulsator: {
                        previousClass: ''
                    },
                    leave: {
                        isShowEnabled: false
                    },
                    timeoutId: 0
                };

                /**
                 * @param {String|Number} value
                 * @returns {string}
                 */
                var encodeForUrl = function(value) {
                    var tempEncodeURIComponent = encodeURIComponent ? encodeURIComponent : encodeURI;
                    return tempEncodeURIComponent(value);
                };

                /**
                 * @return {Boolean} true if continue
                 */
                var checkLeadHunterLaunch = function() {
                    if (!window.roistat.leadHunter.isEnabled) {
                        return false;
                    }
                    if (window.roistatLeadHunterInited) {
                        return false;
                    }
                    window.roistatLeadHunterInited = true;
                    if (storage.get(LEAD_HUNTER_ENABLED) < 1) {
                        debug('LeadHunter: disabled');
                        return false;
                    }
                    return true;
                };

                /**
                 * @return {Boolean} True if all necessary settings setupped
                 */
                var initSettings = function() {
                    leadHunterUrl = storage.get(URL);
                    if (!leadHunterUrl) {
                        debug("LeadHunter: not active cause of empty url");
                        return false;
                    }

                    requireCss();
                    leadHunterAppearanceUrl = storage.get(APPEARANCE_URL);
                    minTime = storage.get(MINIMUM_TIME);
                    autoTime = window.roistat.leadHunter.form.autoShowTime === null ? storage.get(AUTO_SHOW_TIME) : window.roistat.leadHunter.form.autoShowTime;
                    isLeadHunterPulsatorEnabled = storage.get(PULSATOR_ENABLED) == 1;
                    checkExpired();
                    debug('LeadHunter: initSettings end, isLeadHunterPulsatorEnabled: ' + (isLeadHunterPulsatorEnabled ? 1 : 0));
                    return true;
                };

                var isAlreadyCaught = function() {
                    if (isLeadHunterShowsLimitFocusGroupEnabled) {
                        return isCurrentLeadHunterScriptSubmitted() || isCurrentScriptMaxShownCountReached();
                    }

                    return storage.get(CAUGHT) > 0;
                };

                var checkExpired = function() {
                    if (!(roistatGetCookie(LEAD_HUNTER_EXPIRE_COOKIE) > 0)) {
                        debug('LeadHunter: not active, expired for this visit');
                        isExpired = true;
                    }
                };

                var triggerLoadDoneEvent = function(needUpdateShownCount) {
                    isIframeLeadHunterSuccessfullyLoaded = true;
                    iframeTargetOrigin = lhIframe.src;

                    var data = {
                        version: SCRIPT_VERSION,
                        additionalNotifyEmail: window.roistat.leadHunter.additionalNotifyEmail,
                        projectKey: getProjectForUrl(),
                        language: leadHunterLanguage,
                        visitId: getVisitIdForLeadCreation(),
                        moduleTargetOrigin: window.location.origin,
                        referrer: window.location.href,
                        windowWidth: window.innerWidth || 0,
                        iframeWrapperWidth: popupElement.offsetWidth || 0,
                        sendRequestUrl: storage.get(URL),
                        message: LOAD_DONE_MESSAGE
                    };

                    lhIframe.contentWindow.postMessage(data, iframeTargetOrigin);
                    sendEventMessage();

                    if (needUpdateShownCount && isPageEnabled(storage.get(PAGES_LIST))) {
                        debug('iframe fired, rise up iframe show count state');
                        increaseLeadHunterScriptShownCount();
                    }
                };

                var leadHunterShowInCenter = function() {
                    isCentered = true;
                    showModal('click');
                    triggerLoadDoneEvent();
                    moveModalCenter();
                };

                var checkHashForShow = function() {
                    var hash = window.location.hash;
                    if (!hash) {
                        return;
                    }
                    if (inString(hash, 'roistat-lead-hunter')) {
                        leadHunterShowInCenter();
                    }
                };

                var bindShowOnTimeout = function leadHunterBindShowOnTimeOut() {
                    debug('LeadHunter: binding timeout');

                    if (isExpired) {
                        debug('LeadHunter: leadhunter is expired, no timeout show allowed');
                        return;
                    }
                    if (isModalShown) {
                        debug('LeadHunter: leadhunter was shown, no timeout show allowed');
                        return;
                    }

                    if (autoTime > 0) {
                        var delay = (startTime - currentTime()) + autoTime*1000;
                        debug('LeadHunter: binding timeout with delay '+delay+' ms');
                        clearTimeout(localState.timeoutId);
                        localState.timeoutId = setTimeout(function() {
                            debug('LeadHunter: form auto activate with autoTime = ' + autoTime);

                            if (isLeadHunterShowsLimitFocusGroupEnabled && isAlreadyCaught()) {
                                return;
                            }

                            // This is timeout function call, it is possible, that form was shown after timeout was set
                            if (!isModalShown) {
                                debug('LeadHunter: show by timeout');
                                isCentered = true;
                                showModal('auto');
                                triggerLoadDoneEvent(true);
                                moveModalCenter();
                            }
                        }, delay);
                    } else {
                        clearTimeout(localState.timeoutId);
                        debug('LeadHunter: auto show time is not positive, feature disabled');
                    }
                };

                var bindEvents = function() {
                    closeElement.onclick = wrapElement.onclick = hideModal;
                    submitElement.onclick = submit;

                    if (_isNodeElement(agreementLink)) {
                        _addEvent(agreementLink, 'click', showPolicy);
                    }

                    if (_isNodeElement(agreementInput)) {
                        _addEvent(agreementInput, 'change', toggleAgreement);
                    }

                    var inputs = document.getElementsByClassName('roistat-lh-input');
                    if (Array.isArray(inputs)) {
                        for (var i = 0; i < inputs.length; i++) {
                            _addEvent(inputs[i], 'keyup', function (e) {
                                e = e || event;
                                var code = (e.keyCode ? e.keyCode : e.which);
                                if (code == 13) {
                                    submit();
                                }
                            });
                        }
                    }

                    var currentOnResize = window.onresize;
                    window.onresize = function (e) {
                        if (currentOnResize) {
                            currentOnResize(e);
                        }
                        arrange(e);
                    };

                    if (!isExpired) {
                        var currentOnMouseOut = document.onmouseout;
                        document.onmouseout = function (e) {
                            if (currentOnMouseOut) {
                                currentOnMouseOut(e);
                            }
                            checkCursor(e);
                        };
                    }

                    if (isLeadHunterPulsatorEnabled && !isNeedRenderMultiwidget() && _isNodeElement(pulsatorElement)) {
                        pulsatorElement.onmouseover = function(){
                            addClass(pulsatorElement, 'roistat-lh-pulsator-hover');
                        };
                        pulsatorElement.onmouseout = function(){
                            removeClass(pulsatorElement, 'roistat-lh-pulsator-hover');
                        };

                        pulsatorElement.onclick = function() {
                            leadHunterShowInCenter();
                        }

                        window.addEventListener('resize', function handleWindowResize() {
                            if (_isNodeElement(pulsatorElement)) {
                                pulsatorElement.style.transform = getPulsatorScale();
                            }
                        });

                        if (isVisualViewportSupported) {
                            visualViewport.addEventListener('resize', function handleViewportResize() {
                                if (_isNodeElement(pulsatorElement)) {
                                    pulsatorElement.style.transform = getPulsatorScale();
                                }
                            });
                        }
                    }

                    var oldHashChange = window.onhashchange;
                    window.onhashchange = function () {
                        if (oldHashChange) {
                            oldHashChange.apply(this, arguments);
                        }
                        checkHashForShow();
                    };
                };

                var bindIframeEvents = function() {
                    if (isLeadHunterPulsatorEnabled && !isNeedRenderMultiwidget() && _isNodeElement(pulsatorElement)) {
                        pulsatorElement.onmouseover = function(){
                            addClass(pulsatorElement, 'roistat-lh-pulsator-hover');
                        };
                        pulsatorElement.onmouseout = function(){
                            removeClass(pulsatorElement, 'roistat-lh-pulsator-hover');
                        };

                        pulsatorElement.onclick = function() {
                            leadHunterShowInCenter();
                        }

                        window.addEventListener('resize', function handleWindowResize() {
                            pulsatorElement.style.transform = getPulsatorScale();
                        });

                        if (isVisualViewportSupported) {
                            visualViewport.addEventListener('resize', function handleViewportResize() {
                                if (_isNodeElement(pulsatorElement)) {
                                    pulsatorElement.style.transform = getPulsatorScale();
                                }
                            });
                        }
                    }

                    wrapElement.onclick = hideModal;
                    lhIframe = document.getElementById(IFRAME_ID);

                    if (_isNodeElement(lhIframe)) {
                        _addEvent(lhIframe, 'load', function () {
                            triggerLoadDoneEvent();
                            tuneAppearanceForPage();
                        });
                    }

                    var currentOnResize = window.onresize;
                    window.onresize = function (e) {
                        if (currentOnResize) {
                            currentOnResize(e);
                        }
                        arrange(e);
                    };

                    if (!isExpired) {
                        var currentOnMouseOut = document.onmouseout;
                        document.onmouseout = function (e) {
                            if (currentOnMouseOut) {
                                currentOnMouseOut(e);
                            }

                            if (!isLeadHunterShowsLimitFocusGroupEnabled) {
                                debug('ShowLimit: Beta Test off, check cursor usually');
                                checkCursor(e);
                            } else {
                                debug('ShowLimit: check cursor by caught or max show limit');

                                if (!isAlreadyCaught()) {
                                    debug('ShowLimit: Check cursor allowed');
                                    checkCursor(e, true);
                                }
                            }
                        };
                    }

                    var oldHashChange = window.onhashchange;
                    window.onhashchange = function () {
                        if (oldHashChange) {
                            oldHashChange.apply(this, arguments);
                        }
                        checkHashForShow();
                    };
                };

                /**
                 * @param {String} className
                 * @returns {HTMLElement}
                 */
                var _getElementByClass = function(className) {
                    var element = document.getElementsByClassName(className);
                    if (element.length > 0) {
                        return element[0];
                    } else {
                        return null;
                    }
                };

                var processJsFormSettings = function() {
                    var titleElement = _getElementByClass('roistat-lh-title');
                    if (_isNodeElement(titleElement) && roistat.leadHunter.form.title) {
                        titleElement.innerHTML = roistat.leadHunter.form.title;
                    }
                    var subTitleElement = _getElementByClass('roistat-lh-sub-title');
                    if (_isNodeElement(subTitleElement) && roistat.leadHunter.form.subTitle) {
                        subTitleElement.innerHTML = roistat.leadHunter.form.subTitle;
                    }
                    var thankYouElement = _getElementByClass('roistat-lh-thank-you');
                    if (_isNodeElement(thankYouElement) && roistat.leadHunter.form.thankYouText) {
                        thankYouElement.innerHTML = roistat.leadHunter.form.thankYouText;
                    }
                    var buttonElement = _getElementByClass('roistat-lh-submit');
                    if (_isNodeElement(buttonElement) && roistat.leadHunter.form.buttonText) {
                        buttonElement.value = roistat.leadHunter.form.buttonText;
                    }
                    var nameLabelElement = _getElementByClass('roistat-lh-text-label-name');
                    if (_isNodeElement(nameLabelElement) && roistat.leadHunter.form.nameLabel) {
                        nameLabelElement.innerHTML = roistat.leadHunter.form.nameLabel;
                    }
                    var contactLabelElement = _getElementByClass('roistat-lh-text-label-contact');
                    if (_isNodeElement(contactLabelElement) && roistat.leadHunter.form.contactLabel) {
                        contactLabelElement.innerHTML = roistat.leadHunter.form.contactLabel;
                    }
                };

                /**
                 * @param {String} formTemplate
                 * @param {String} pulsatorTemplate
                 * @param {Object} pulsatorSettings
                 */
                var processForm = function(formTemplate, pulsatorTemplate, pulsatorSettings) {
                    if (document.body === null) {
                        return;
                    }

                    var tempElement;
                    if (!formTemplate) {
                        debug('LeadHunter: deactivating, empty form');
                    } else {
                        debug('LeadHunter: rendering hidden form');
                    }

                    wrapElement     = document.createElement('div');
                    popupElement    = document.createElement('div');
                    popupElement.innerHTML = formTemplate;
                    wrapElement.className  = HIDDEN_CLASS;
                    popupElement.className = HIDDEN_CLASS;
                    debug('LeadHunter: processForm, isLeadHunterPulsatorEnabled: ' + (isLeadHunterPulsatorEnabled ? 1 : 0));

                    if (pulsatorTemplate && isLeadHunterPulsatorEnabled && pulsatorSettings && !isNeedRenderMultiwidget()) {
                        var pulsatorPosition = typeof pulsatorSettings.position === 'string' && pulsatorSettings.position !== ''
                            ? pulsatorSettings.position
                            : 'bottomRight';

                        tempElement = document.createElement('div');
                        tempElement.innerHTML = pulsatorTemplate;
                        pulsatorElement = tempElement.childNodes.item(0);
                        pulsatorFill = pulsatorElement.childNodes.item(1);
                        pulsatorIcon = pulsatorElement.childNodes.item(2).childNodes.item(0);

                        pulsatorFill.setAttribute('style', 'background: ' + pulsatorSettings.button.background + ';');
                        pulsatorIcon.setAttribute('style', 'fill: ' + pulsatorSettings.button.color + ';');
                        pulsatorElement.setAttribute('style',
                            'bottom: ' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].bottom + ';'
                            + 'right:' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].right + ';'
                        );

                        pulsatorElement.style.transformOrigin = PULSATOR_POSITION_BY_LABEL[pulsatorPosition].transformOrigin;
                        pulsatorElement.style.transform = getPulsatorScale();

                        localState.pulsator.previousClass = pulsatorElement.className;
                        pulsatorElement.className = HIDDEN_CLASS;
                        document.body.appendChild(pulsatorElement);
                    }

                    document.body.appendChild(wrapElement);
                    document.body.appendChild(popupElement);

                    headElement        = document.getElementById(HEAD_ID);
                    formElement        = document.getElementById(FORM_ID);
                    thankYouElement    = document.getElementById(THANK_YOU_ID);
                    closeElement       = document.getElementById(CLOSE_ID);
                    submitElement      = document.getElementById(SUBMIT_ID);
                    agreementElement   = document.getElementById(AGREEMENT_ID);
                    agreementInput     = document.getElementById(AGREEMENT_INPUT_ID);
                    agreementLink      = document.getElementById(AGREEMENT_LINK_ID);
                    agreementDoc       = document.getElementById(AGREEMENT_DOC_ID);
                    agreementError     = document.getElementById(AGREEMENT_ERROR_ID);
                    agreementContainer = document.getElementById(AGREEMENT_CONTAINER_ID);

                    var popupRoot = _getElementByClass(POPUP_ROOT_CLASS);
                    isIframedLeadHunter = _isNodeElement(popupRoot) && popupRoot.getAttribute('data-is-iframe');

                    if (isIframedLeadHunter) {
                        bindIframeEvents();
                    } else {
                        processJsFormSettings();
                        bindEvents();
                        checkHashForShow();
                        tuneAppearanceForPage();
                    }
                };

                var updatePulsatorStyles = function (pulsatorSettings) {
                    var hasPulsatorStyles = pulsatorSettings.button
                        && pulsatorSettings.button.background
                        && pulsatorSettings.button.color;

                    if (!hasPulsatorStyles) {
                        return;
                    }

                    storage.setObject(LEAD_HUNTER_PULSATOR_SETTINGS, leadHunterPulsatorSettings);

                    var pulsatorPosition = typeof pulsatorSettings.position === 'string' && pulsatorSettings.position !== ''
                        ? pulsatorSettings.position
                        : 'bottomRight';

                    if (_isNodeElement(pulsatorFill)) {
                        pulsatorFill.setAttribute('style', 'background: ' + pulsatorSettings.button.background + ';');
                    }

                    if (_isNodeElement(pulsatorIcon)) {
                        pulsatorIcon.setAttribute('style', 'fill: ' + pulsatorSettings.button.color + ';');
                    }

                    if (_isNodeElement(pulsatorElement)) {
                        pulsatorElement.setAttribute('style',
                            'bottom: ' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].bottom + ';'
                            + 'right:' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].right + ';'
                        );

                        pulsatorElement.style.transformOrigin = PULSATOR_POSITION_BY_LABEL[pulsatorPosition].transformOrigin;
                        pulsatorElement.style.transform = getPulsatorScale();
                    }
                };

                var initForm = function() {
                    var formTemplate = storage.get(LEAD_HUNTER_FORM_TEMPLATE),
                        pulsatorTemplate = storage.get(LEAD_HUNTER_PULSATOR_TEMPLATE),
                        pulsatorSettings = storage.getObject(LEAD_HUNTER_PULSATOR_SETTINGS);

                    if (pulsatorSettings !== null) {
                        processForm(Base64.decode(formTemplate), Base64.decode(pulsatorTemplate), pulsatorSettings);
                    }
                };

                var showThankYou = function() {
                    var width = popupElement.clientWidth,
                        height = popupElement.clientHeight;

                    if (_isNodeElement(popupElement)) {
                        popupElement.setAttribute('style', popupElement.getAttribute('style') + ' width: ' + width + 'px; height: ' + height + 'px;');
                    }

                    if (_isNodeElement(formElement)) {
                        formElement.className = HIDDEN_CLASS;
                    }

                    if (_isNodeElement(headElement)) {
                        headElement.className = HIDDEN_CLASS;
                    }

                    if (_isNodeElement(agreementElement)) {
                        agreementElement.className = HIDDEN_CLASS;
                    }

                    if (_isNodeElement(thankYouElement)) {
                        thankYouElement.setAttribute('style', 'width: '+width+'px; height: '+height+'px; display: table-cell;');
                        thankYouElement.className = THANK_YOU_CLASS;
                    }
                    setTimeout(function() {
                        debug('LeadHunter: close form after timeout');
                        hideModal();
                    }, 7000);
                };

                var moveModalCenter = function(){
                    var top = Math.round((getWindowHeight() - popupElement.clientHeight) / 2);
                    var left = Math.round((getWindowWidth() - popupElement.clientWidth) / 2);

                    if (_isNodeElement(popupElement)) {
                        popupElement.setAttribute('style', 'left: ' + left + 'px; top: ' + Math.max(0, top) + 'px;');
                    }
                };

                var showModal = function(eventType) {
                    if (!isPageEnabled(storage.get(PAGES_LIST))) {
                        return;
                    }

                    if (window.roistat.leadHunter.onBeforeAppear) {
                        debug("LeadHunter: process user defined onBeforeAppear");
                        window.roistat.leadHunter.onBeforeAppear(eventType);
                        if (isIframedLeadHunter) {
                            sendEventMessage();
                        }
                    }

                    if (_isNodeElement(popupElement)) {
                        popupElement.setAttribute('style', 'left:20px;top:-20px;opacity:0');
                        popupElement.className = POPUP_CLASS;
                    }

                    if (_isNodeElement(wrapElement)) {
                        wrapElement.className = WRAP_CLASS;
                    }

                    if (_isNodeElement(formElement)) {
                        formElement.className = FORM_CLASS;
                    }

                    if (_isNodeElement(headElement)) {
                        headElement.className = HEAD_CLASS;
                    }

                    if (_isNodeElement(agreementElement)) {
                        agreementElement.className = AGREEMENT_CLASSES;
                    }

                    if (_isNodeElement(thankYouElement)) {
                        thankYouElement.setAttribute('style', '');
                        thankYouElement.className = HIDDEN_CLASS;
                    }

                    if (_isNodeElement(wrapElement)) {
                        wrapElement.setAttribute('style', 'opacity:0;');
                    }

                    isModalShown = true;
                    setTimeout(function(){
                        wrapElement.setAttribute('style', 'opacity:.5;');
                    }, 10);

                    var roistatId = roistatGetCookie(ROISTAT_VISIT_COOKIE),
                        url = leadHunterAppearanceUrl + "?visit_id=" + roistatId + "&page=" + getCurrentPage();

                    sendRequestByUrl(url);

                    if (window.roistat.leadHunter.onAfterAppear) {
                        debug("LeadHunter: process user defined onAfterAppear");
                        window.roistat.leadHunter.onAfterAppear(roistatId, wrapElement, popupElement, formElement);
                        if (isIframedLeadHunter) {
                            sendEventMessage();
                        }
                    }
                };

                var processPage = function leadHunterProcessPage() {
                    startTime = currentTime();
                    initForm();
                    debug('LeadHunter: form initialized');
                };

                var tuneAppearanceForPage = function leadHunterTuneAppearanceForPage() {
                    debug('LeadHunter: tuning appearance for page');

                    if (!isPageEnabled(storage.get(PAGES_LIST)) || (storage.get(LEAD_HUNTER_DEFAULT_SCRIPT_ID) && !storage.get(LEAD_HUNTER_CURRENT_SCRIPT_ID))) {
                        debug('LeadHunter: disabled on page');
                        localState.leave.isShowEnabled = false;
                        clearTimeout(localState.timeoutId);
                        if (isNeedRenderMultiwidget()) {
                            isLeadHunterPulsatorShownAtThisPage = false;
                            roistatHideMultiwidgetLeadHunterOption();
                        }

                        if (_isNodeElement(pulsatorElement)) {
                            pulsatorElement.className = HIDDEN_CLASS;
                        }
                    } else {
                        debug('LeadHunter: enabled on page');

                        if (!isLeadHunterShowsLimitFocusGroupEnabled && !isAlreadyCaught()) {
                            debug('ShowLimit: Beta Test off, bindShowOnTimeout usually');
                            localState.leave.isShowEnabled = true;
                            bindShowOnTimeout();
                        }

                        if (isLeadHunterShowsLimitFocusGroupEnabled) {
                            debug('ShowLimit: bindShowOnTimeout by caught or max show limit');
                            if (!isAlreadyCaught()) {
                                debug('ShowLimit: bindShowOnTimeout allowed');
                                localState.leave.isShowEnabled = true;
                                bindShowOnTimeout();
                            }
                        }

                        if (_isNodeElement(pulsatorElement)) {
                            pulsatorElement.className = localState.pulsator.previousClass;
                        }
                    }
                };

                var processSinglePageAppChange = function leadHunterSinglePageAppChanged() {
                    debug('LeadHunter: processing single page application state change');
                    startTime = currentTime();
                    tuneAppearanceForPage();
                };

                var bindGlobalEvents = function leadHunterBindGlobalEvents() {
                    addSPAPageChangedCallback(processSinglePageAppChange);

                    var updateSizeSettings = function () {
                        var HTML_DOCUMENT = document.querySelector("html"),
                            MOBILE_MARKUP_BREAKPOINT = 600,
                            MOBILE_MARKUP_BREAKPOINT_XS = 300,
                            WINDOW_WIDTH = window.innerWidth,
                            ZOOM_VALUE = getComputedStyle(HTML_DOCUMENT).zoom,
                            sizeSettings = {};

                        var getComputedZoomLevel = function () {
                            var zoom = HTML_DOCUMENT.style.cssText.split(';').find(function (cssProp) { return cssProp.includes('--zoomLevel') });

                            if (zoom !== undefined) {
                                zoom = zoom.split(':');
                                if (zoom.length > 1) {
                                    zoom = parseFloat(zoom[1]);
                                } else {
                                    return undefined;
                                }
                            }

                            return zoom;
                        }

                        var ZOOM_LEVEL = getComputedZoomLevel();

                        if (ZOOM_LEVEL !== undefined) {
                            ZOOM_VALUE = ZOOM_LEVEL;
                        }

                        if (WINDOW_WIDTH < MOBILE_MARKUP_BREAKPOINT && WINDOW_WIDTH >= MOBILE_MARKUP_BREAKPOINT_XS) {
                            sizeSettings = { isMobileMarkup: true, isMobileMarkupXs: false, zoomValue: ZOOM_VALUE};
                            lhIframe.contentWindow.postMessage({ sizeSettings: sizeSettings, message: IFRAME_SETTING_SIZE, windowWidth: window.innerWidth || 0  }, iframeTargetOrigin);
                            return;
                        }
                        if (WINDOW_WIDTH < MOBILE_MARKUP_BREAKPOINT_XS) {
                            sizeSettings = { isMobileMarkup: false, isMobileMarkupXs: true, zoomValue: ZOOM_VALUE};
                            lhIframe.contentWindow.postMessage({ sizeSettings: sizeSettings, message: IFRAME_SETTING_SIZE, windowWidth: window.innerWidth || 0  }, iframeTargetOrigin);
                            return;
                        }

                        sizeSettings = { isMobileMarkup: false, isMobileMarkupXs: false, zoomValue: ZOOM_VALUE };
                        lhIframe.contentWindow.postMessage({ sizeSettings: sizeSettings, message: IFRAME_SETTING_SIZE, windowWidth: window.innerWidth || 0  }, iframeTargetOrigin);
                    }

                    window.roistatLeadHunterUpdate = updateSizeSettings;

                    _addEventListener(window, 'load', function () {
                        updateSizeSettings();
                    });
                    _addEventListener(window, 'resize', function () {
                        updateSizeSettings();
                    });
                    _addEventListener(window, 'message', function handleIframePostMessages(e){
                        var message = typeof e.data === 'string' ? e.data : e.data.message;

                        if (message === SCRIPT_SETTINGS_MESSAGE) {
                            lhScriptId = e.data.leadHunterId;
                            lhScriptMaxShownCount = e.data.leadHunterMaxShownCount;

                            var hasLeadHunterTargetPagesMap = storage.getObject(LEAD_HUNTER_TARGET_PAGES_MAP) !== null;

                            if (hasLeadHunterTargetPagesMap) {
                                autoTime = e.data.leadHunterAutoShowTime;
                                minTime = e.data.leadHunterMinTime;
                                leadHunterPulsatorSettings = e.data.leadHunterPulsatorSettings;

                                storage.set(MINIMUM_TIME, minTime);
                                storage.set(AUTO_SHOW_TIME, autoTime);

                                if (leadHunterPulsatorSettings) {
                                    var isEnabled = Number(leadHunterPulsatorSettings.isEnabled);
                                    debug('Leadhunter: set pulsator setting ' + isEnabled);
                                    storage.set(PULSATOR_ENABLED, isEnabled);
                                    updatePulsatorStyles(leadHunterPulsatorSettings);
                                }
                            }

                            debug('ShowLimit: Get lhScriptId: ' + e.data.leadHunterId + ' and lhScriptMaxShownCount: ' + e.data.leadHunterMaxShownCount + ' from lh widget');
                            init();
                        }

                        if (message === CLOSE_MODAL_MESSAGE) {
                            hideModal();
                        }

                        if (message === IFRAME_SETTING_SIZE) {
                            var calibratingSize = typeof e.data === 'object' && e.data.calibratingSize !== undefined ? e.data.calibratingSize : true;
                            lhIframe.setAttribute('style', 'width: '+ e.data.width + 'px !important; height: ' + e.data.height + 'px !important;');
                            if (isIframeLeadHunterSuccessfullyLoaded && !calibratingSize) {
                                lhIframe.contentWindow.postMessage({ message: IFRAME_SETTING_SIZE, windowWidth: window.innerWidth || 0, calibratingSize: true }, iframeTargetOrigin);
                            }
                            arrange(e);
                        }

                        if (message === BEFORE_SUBMIT_MESSAGE) {
                            var caughtLead = e.data.caughtLeadData;

                            if (window.roistat.leadHunter.onBeforeSubmit) {
                                debug("LeadHunter: process user defined onBeforeSubmit");
                                var processedParams = window.roistat.leadHunter.onBeforeSubmit(caughtLead);

                                if (processedParams) {
                                    caughtLead = processedParams;
                                }
                            }

                            if (!isLeadHunterShowsLimitFocusGroupEnabled) {
                                debug('ShowLimit: Beta Test off, catch before submit message, setCookieLeadHunterCaught will run');
                                setCookieLeadHunterCaught();
                            } else {
                                debug('ShowLimit: catch before submit message, setLeadHunterScriptCaught will run');
                                setLeadHunterScriptCaught();
                            }

                            var callbackTimetableSettings = storage.getObject(LEAD_HUNTER_CALLBACK_SETTINGS);
                            var hasCallbackTimetableSettings = callbackTimetableSettings !== null;
                            var needDisableCallback = hasCallbackTimetableSettings
                                && caughtLead.isNeedCallback === null
                                && !isCurrentTimeFitTimeTable(callbackTimetableSettings);

                            if (needDisableCallback) {
                                caughtLead.isNeedCallback = 0;
                            }

                            lhIframe.contentWindow.postMessage({ caughtLead: caughtLead, message: BEFORE_SUBMIT_DONE_MESSAGE }, iframeTargetOrigin);
                        }

                        if (message === AFTER_SUBMIT_MESSAGE) {
                            if (window.roistat.leadHunter.onAfterSubmit) {
                                debug("LeadHunter: process user defined onAfterSubmit");
                                window.roistat.leadHunter.onAfterSubmit({name: e.data.name, phone: e.data.phone});
                            }
                        }
                    });
                };

                function sendEventMessage() {
                    var data = {
                        apiData: window.roistat.leadHunter.form,
                        message: EVENT_DATA_MESSAGE
                    };

                    lhIframe.contentWindow.postMessage(data, iframeTargetOrigin);
                }

                function init() {
                    if (!checkLeadHunterLaunch()) {
                        debug('checkLeadHunterLaunch false');
                        return;
                    }

                    var hasLeadHunterTargetPagesMap = storage.getObject(LEAD_HUNTER_TARGET_PAGES_MAP) !== null;

                    if (hasLeadHunterTargetPagesMap) {
                        setLeadHunterDataToStorage();
                    }

                    if (!initSettings()) {
                        debug('initSettings false');
                        return;
                    }

                    debug('LeadHunter: activated');
                    documentReadyCallback(function() {
                        processPage();
                        tuneAppearanceForPage();
                        bindGlobalEvents();

                        if (typeof window.onRoistatLeadHunterInited === 'function') {
                            window.onRoistatLeadHunterInited();
                        }
                    });
                }

                function getWindowHeight(){
                    return (window.innerHeight ? window.innerHeight : document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight);
                }
                function getWindowWidth(){
                    return (window.innerWidth ? window.innerWidth : document.documentElement.clientWidth == 0 ? document.body.clientWidth : document.documentElement.clientWidth);
                }
                function checkCursor(e, needUpdateShownCount) {
                    e = e || event;
                    lastY = e.clientY;
                    var currentTop = lastY / getWindowHeight(),
                        isMoveUp = previousTop > 0 &&  previousTop > currentTop,
                        isInModalZone = currentTop < modalZone,
                        isTime = (currentTime() - startTime) > minTime*1000;

                    if (isMoveUp && isInModalZone && !isModalShown && isTime && localState.leave.isShowEnabled && !isAlreadyCaught()) {
                        debug("LeadHunter: show modal with because move up (" + previousTop + " -> " + currentTop + ") and in modal zone and show on leave enabled");
                        showModal('exit');
                        triggerLoadDoneEvent(needUpdateShownCount);
                        moveModal(e);
                    }
                    if (currentTop < calculatingZone) {
                        previousTop = currentTop;
                    }
                }
                function arrange(e) {
                    if (isCentered) {
                        moveModalCenter();
                    } else {
                        e = e || event;
                        moveModal(e);
                    }
                }
                function moveModal(e) {
                    var modalWidth = e.type === 'message' ? e.data.width : popupElement.offsetWidth;
                    var windowWidth = getWindowWidth();

                    var x = e.clientX - Math.round(modalWidth / 2) || popupElement.offsetLeft;

                    x = Math.max(20, Math.min(x, windowWidth - modalWidth - 20));
                    var isPopupElementCrossViewPort = x + modalWidth > windowWidth - 40;

                    if (isPopupElementCrossViewPort) {
                        var widthBehindViewPort = (x + modalWidth - 20) - (windowWidth - 40);
                        x = x - widthBehindViewPort;
                    }

                    var popupWidth = windowWidth - 40 > modalWidth ? '' : 'width: ' + (modalWidth - 40) + 'px;';

                    if (_isNodeElement(popupElement)) {
                        popupElement.setAttribute('style', 'left: ' + x + 'px; top: 0px; ' + popupWidth);
                    }
                }

                function setCookieLeadHunterCaught() {
                    if (isLeadHunterShowsLimitFocusGroupEnabled) {
                        return;
                    }

                    window.roistatSetCookie(CAUGHT, 1, COOKIE_CONFIG);
                }

                function hideModal() {
                    if (!isLeadHunterShowsLimitFocusGroupEnabled) {
                        debug('ShowLimit: Beta Test off, setCookieLeadHunterCaught');
                        setCookieLeadHunterCaught();
                    }

                    if (_isNodeElement(wrapElement)) {
                        wrapElement.setAttribute('style', 'opacity:0');
                    }

                    if (_isNodeElement(popupElement)) {
                        popupElement.style.top = '-' + popupElement.offsetHeight * 2 + 'px';
                        setTimeout(function () {
                            popupElement.className = wrapElement.className = HIDDEN_CLASS;
                        }, 500);
                    }
                }
                function submit(){
                    var leadHunterPhone = document.getElementById('roistat-lh-phone-input'),
                        leadHunterName = document.getElementById('roistat-lh-name-input'),
                        leadPhone, leadName;

                    leadPhone = leadHunterPhone === null ? '' : leadHunterPhone.value;
                    leadName = leadHunterName === null ? '' : leadHunterName.value;

                    var caughtLead = {
                        name: leadName,
                        phone: leadPhone,
                        isNeedCallback: null,
                        callbackPhone: null,
                        fields: {}
                    };

                    if (window.roistat.leadHunter.onBeforeSubmit) {
                        debug("LeadHunter: process user defined onBeforeSubmit");
                        var processedParams = window.roistat.leadHunter.onBeforeSubmit(caughtLead);
                        if (processedParams) {
                            caughtLead = processedParams;
                        }
                    }

                    var isPhoneEmpty = caughtLead.phone.length < 1;
                    var isMaskFilled = caughtLead.phone.indexOf('_') === -1;
                    var isPhoneValid = !isPhoneEmpty && isMaskFilled;
                    var isNameEmpty = caughtLead.name.length < 1;
                    var isNameValid = !isNameEmpty || !window.roistat.leadHunter.form.isNameRequired;

                    if (!isPhoneValid && _isNodeElement(leadHunterPhone)) {
                        leadHunterPhone.setAttribute('style', 'border: 2px solid #E0571A;');
                        return;
                    }
                    if (!isNameValid && _isNodeElement(leadHunterName)) {
                        leadHunterName.setAttribute('style', 'border: 2px solid #E0571A;');
                        return;
                    }

                    var url = leadHunterUrl + '?v=' + SCRIPT_VERSION
                        + '&lead-hunt-input=' + encodeURIComponent(caughtLead.phone)
                        + '&lead-name=' + encodeURIComponent(caughtLead.name)
                        + '&visit=' + getVisitIdForLeadCreation();

                    if (caughtLead.isNeedCallback !== null && caughtLead.isNeedCallback !== undefined) {
                        url = url + "&is_need_callback=" + (caughtLead.isNeedCallback > 0 ? 1 : 0);
                    }
                    if (caughtLead.callbackPhone) {
                        url = url + "&callback_phone=" + caughtLead.callbackPhone;
                    }

                    if (window.roistat.leadHunter.additionalNotifyEmail !== null) {
                        url = url + "&additional_email=" + encodeURIComponent(window.roistat.leadHunter.additionalNotifyEmail);
                    }

                    var customFieldCount = 0;
                    if (caughtLead.fields && typeof caughtLead.fields === 'object') {
                        for (var k in caughtLead.fields) {
                            if (caughtLead.fields.hasOwnProperty(k)) {
                                ++customFieldCount;
                            }
                        }
                    }
                    if (customFieldCount > 0) {
                        url = url + "&fields=" + encodeForUrl(JSON.stringify(caughtLead.fields));
                    }

                    url = url + '&t=' + currentTime();

                    var img = document.createElement('img');
                    img.src = url;

                    if (_isNodeElement(leadHunterPhone)) {
                        leadHunterPhone.setAttribute('style', '');
                    }

                    if (!isLeadHunterShowsLimitFocusGroupEnabled) {
                        debug('ShowLimit: Beta Test off, caught LH usually');
                        setCookieLeadHunterCaught();
                    } else {
                        debug('ShowLimit: caught LH by set setLeadHunterScriptCaught');
                        setLeadHunterScriptCaught();
                    }

                    if (!_isNodeElement(thankYouElement)) {
                        hideModal();
                        removeHandlers();
                    } else {
                        showThankYou();
                    }
                    if (window.roistat.leadHunter.onAfterSubmit) {
                        debug("LeadHunter: process user defined onAfterSubmit");
                        window.roistat.leadHunter.onAfterSubmit({name: leadName, phone: leadPhone});
                    }
                }

                function showPolicy(event) {
                    if (event.preventDefault) {
                        event.preventDefault();
                    } else {
                        event.returnValue = false;
                    }

                    if (_isNodeElement(agreementDoc)) {
                        agreementDoc.style.display === 'block' ?
                            agreementDoc.style.display = 'none' :
                            agreementDoc.setAttribute('style', 'display: block; padding: 0 30px; width:' + popupElement.clientWidth + 'px;');
                    }

                    arrange();
                }

                function toggleAgreement() {
                    if (_isNodeElement(submitElement)) {
                        submitElement.disabled === true ?
                            submitElement.disabled = false :
                            submitElement.disabled = true;
                    }

                    if (_isNodeElement(agreementError)) {
                        agreementError.style.display === 'block' ?
                            agreementError.style.display = 'none' :
                            agreementError.style.display = 'block';
                    }
                }

                function removeHandlers() {
                    document.onmousemove = null;

                    if (_isNodeElement(wrapElement)) {
                        wrapElement.onresize = null;
                    }
                }

                /**
                 * @param {HTMLElement} input
                 * @param {String} mask
                 */
                var _roistatRenderPhoneMask = function(input, mask) {
                    if (!input || !mask) {
                        debug("LeadHunter: skip phone mask render due to empty input or mask");
                        return;
                    }
                    debug("LeadHunter: render phone mask " + mask + " for input: " + input.value);

                    if (window.roistatRenderPhoneMaskMutex) {
                        return;
                    }
                    window.roistatRenderPhoneMaskMutex = true;

                    var numberSymbolDisplay = "_",
                        numberSymbolSettings = "x",
                        numberSymbolSettingsRus = "х",
                        displayMask = mask.toLowerCase().split(numberSymbolSettings).join(numberSymbolDisplay).split(numberSymbolSettingsRus).join(numberSymbolDisplay);

                    /**
                     * @param {Number} position
                     */
                    var _setCursorPosition = function(position) {
                        if (input.setSelectionRange) {
                            input.setSelectionRange(position, position);
                        } else if (input.createTextRange) {
                            var range = input.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', position);
                            range.moveStart('character', position);
                            range.select();
                        }
                    };

                    /**
                     * @param {String} value
                     * @returns {Number}
                     */
                    var _calcNeededCursorPosition = function(value) {
                        if (!value) {
                            return 0;
                        }
                        var firstMaskChar = value.indexOf(numberSymbolDisplay);
                        if (firstMaskChar < 0) {
                            return value.length;
                        }
                        return firstMaskChar;
                    };

                    /**
                     * @param {String} value
                     */
                    var _refreshCursor = function(value) {
                        _setCursorPosition(_calcNeededCursorPosition(value));
                    };

                    /**
                     * @param {String} currentValue
                     * @returns {String}
                     */
                    var _calculateNewValue = function(currentValue) {
                        var displayMaskParts = displayMask.split("");
                        if (!currentValue) {
                            return displayMask;
                        }
                        var currentValueParts = currentValue.split("");

                        var result = [],
                            currentSymbol, maskSymbol, isCurrentSymbolNumber, isCurrentSymbolIsNumberOverMaskNumber,
                            nextMaskSymbol, nextCurrentSymbol, nextNextCurrentSymbol;
                        for (var i = 0; i < displayMaskParts.length; i++) {
                            maskSymbol = displayMaskParts[i];
                            if (i >= currentValueParts.length) {
                                result.push(maskSymbol);
                                continue;
                            }

                            nextMaskSymbol = ((i+1) < displayMaskParts.length) ? displayMaskParts[i+1] : null;
                            nextCurrentSymbol = ((i+1) < currentValueParts.length) ? currentValueParts[i+1] : null;
                            nextNextCurrentSymbol = ((i+2) < currentValueParts.length) ? currentValueParts[i+2] : null;
                            currentSymbol = currentValueParts[i];
                            isCurrentSymbolNumber = parseInt(currentSymbol) >= 0;
                            isCurrentSymbolIsNumberOverMaskNumber = (maskSymbol === numberSymbolDisplay) && isCurrentSymbolNumber;

                            if (!isCurrentSymbolIsNumberOverMaskNumber) {
                                result.push(maskSymbol);
                                continue;
                            }

                            if (nextCurrentSymbol === numberSymbolDisplay && nextMaskSymbol !== numberSymbolDisplay && nextNextCurrentSymbol !== nextMaskSymbol) {
                                result.push(maskSymbol);
                                continue;
                            }

                            result.push(currentSymbol);
                        }
                        return result.join("");
                    };

                    setTimeout(function() {
                        var newValue = _calculateNewValue(input.value);
                        if (input.value !== newValue) {
                            input.value = newValue;
                        }
                        _refreshCursor(newValue);
                        window.roistatRenderPhoneMaskMutex = false;
                    }, 1);
                };

                var saveLeadHunterTemplates = function(formTemplate, pulsatorTemplate, pulsatorSettings) {
                    storage.setLocal(LEAD_HUNTER_FORM_TEMPLATE, Base64.encode(formTemplate));
                    storage.setLocal(LEAD_HUNTER_PULSATOR_TEMPLATE, Base64.encode(pulsatorTemplate));
                    storage.setObject(LEAD_HUNTER_PULSATOR_SETTINGS, pulsatorSettings);
                };

                var translateLeadHunterFormToLanguage = function(lang) {
                    leadHunterLanguage = lang;

                    if (lhIframe === undefined) {
                        return;
                    }

                    sendIframeTranslateMessage();
                };

                var sendIframeTranslateMessage = function() {
                    var data = {
                        language: leadHunterLanguage,
                        message: TRANSLATE_FORM_MESSAGE
                    };

                    lhIframe.contentWindow.postMessage(data, iframeTargetOrigin);
                };

                var setLeadHunterScriptCaught = function() {
                    debug('ShowLimit: Start set roistat_leadHunterScriptsCaught');
                    var storedScriptsCaughtLeads = storage.getObject(LEAD_HUNTER_SCRIPTS_CAUGHT);

                    if (!storedScriptsCaughtLeads) {
                        storedScriptsCaughtLeads = {};
                    }

                    debug('ShowLimit: roistat_leadHunterScriptsCaught for lhScriptId set to 1');
                    storedScriptsCaughtLeads[lhScriptId] = 1;

                    storage.setObject(LEAD_HUNTER_SCRIPTS_CAUGHT, storedScriptsCaughtLeads);
                };

                var increaseLeadHunterScriptShownCount = function() {
                    debug('ShowLimit: Start set roistat_leadHunterScriptsShownCount');
                    var storedScriptsShownCount = storage.getObject(LEAD_HUNTER_SCRIPTS_SHOWN_COUNT);

                    if (!storedScriptsShownCount) {
                        storedScriptsShownCount = {};
                    }

                    var hasCurrentScriptIdInStoredScripts = storedScriptsShownCount.hasOwnProperty(lhScriptId);
                    var hasOldCookie = storage.get(CAUGHT) > 0;

                    if (!hasCurrentScriptIdInStoredScripts) {
                        debug('ShowLimit: roistat_leadHunterScriptsShownCount for lhScriptId initialized');
                        storedScriptsShownCount[lhScriptId] = hasOldCookie ? 1 : 0;
                    }

                    var isStoredCountMoreThenMaxShownCount = lhScriptMaxShownCount > 0 && storedScriptsShownCount[lhScriptId] + 1 > lhScriptMaxShownCount;
                    if (isStoredCountMoreThenMaxShownCount) {
                        debug('ShowLimit: Stored lhScriptId has reached lhScriptMaxShownCount, show counter in storage not rise up, return from function');
                        return;
                    }

                    debug('ShowLimit: exist lhScriptId show counter rise up');
                    storedScriptsShownCount[lhScriptId] += 1;

                    storage.setObject(LEAD_HUNTER_SCRIPTS_SHOWN_COUNT, storedScriptsShownCount);

                    if (hasOldCookie) {
                        storage.remove(CAUGHT);
                        roistatClearCookie(CAUGHT, { path: '/' });
                        debug('ShowLimit: cookie roistat_leadHunterCaught handled and deleted');
                    }
                };

                var isCurrentScriptMaxShownCountReached = function() {
                    if (lhScriptMaxShownCount === 0) {
                        debug('ShowLimit: show limit off and set to 0');
                        return false;
                    }

                    var leadHunterScriptsShownCount = storage.getObject(LEAD_HUNTER_SCRIPTS_SHOWN_COUNT),
                        oldScriptsShownCount = storage.get(CAUGHT) > 0 ? 1 : 0,
                        currentScriptShownCount = leadHunterScriptsShownCount ? leadHunterScriptsShownCount[lhScriptId] : oldScriptsShownCount,
                        isMaxShownCountSet = currentScriptShownCount + 1 > lhScriptMaxShownCount;

                    debug('ShowLimit: Check isCurrentScriptMaxShownCountReached, show limit on, check for exceeding the limit, is ' + isMaxShownCountSet);

                    return isMaxShownCountSet;
                };

                var isCurrentLeadHunterScriptSubmitted = function() {
                    var leadHunterScriptsCaught = storage.getObject(LEAD_HUNTER_SCRIPTS_CAUGHT),
                        currentScriptCaughtState = leadHunterScriptsCaught ? leadHunterScriptsCaught[lhScriptId] : null,
                        isSubmitted = currentScriptCaughtState === 1;

                    debug('ShowLimit: Check isCurrentLeadHunterScriptSubmitted, is ' + isSubmitted);

                    return isSubmitted;
                };

                var setLeadHunterDataToStorage = function() {
                    storage.set(LEAD_HUNTER_DEFAULT_SCRIPT_ID, getLeadHunterScriptId());
                    storage.setLocal(LEAD_HUNTER_FORM_TEMPLATE, Base64.encode(getLeadHunterTemplate()));
                    storage.set(PAGES_LIST, getLeadHunterTargetPages());
                    storage.set(PULSATOR_ENABLED, getLeadHunterActiveScriptPulsatorEnableSetting());
                };

                var getLeadHunterTemplate = function() {
                    var iframeUrl = appendMaParam(protocol() + "//"+ROISTAT_HOST+"/api/site/1.0/"+getProjectForUrl()+"/leadhunter/script/"+storage.get(LEAD_HUNTER_DEFAULT_SCRIPT_ID)+"/widget?visit_id=" + getRoistatVisitId());

                    return '<div class="roistat-lh-popup-wrapper" data-is-iframe="1"><iframe id="roistat-lh-popup-iframe" class="roistat-lh-popup-iframe" src="' + iframeUrl + '" frameborder="0"></iframe></div>';
                };

                var getLeadHunterScriptId = function() {
                    var leadHunterTargetPagesMap = storage.getObject(LEAD_HUNTER_TARGET_PAGES_MAP);

                    if (leadHunterTargetPagesMap === null) {
                        return;
                    }

                    storage.set(LEAD_HUNTER_CURRENT_SCRIPT_ID, '');

                    var isLeadHunterEnabled = Number(storage.get(LEAD_HUNTER_ENABLED));
                    var keys = Object.keys(leadHunterTargetPagesMap);
                    var leadHunterScriptId = keys.sort()[0];

                    if (!isLeadHunterEnabled) {
                        return leadHunterScriptId;
                    }

                    for (var i = 0; i < keys.length; i++) {
                        var currentFilterSettings = leadHunterTargetPagesMap[keys[i]];
                        var targetPages = currentFilterSettings.targetPageList;
                        var isCurrentPageEnabled = isPageEnabled(targetPages.join(','));
                        var isTargetPagesEmpty = targetPages.length === 0;
                        var isCurrentDeviceEnabled = Array.isArray(currentFilterSettings.devicesFilter) && currentFilterSettings.devicesFilter.length > 0
                            ? currentFilterSettings.devicesFilter.indexOf(getCurrentDeviceName()) !== -1
                            : true;
                        var hasLeadHunterCurrentScriptId = (isTargetPagesEmpty || isCurrentPageEnabled)
                            && isCurrentDeviceEnabled
                            && (!currentFilterSettings.timetable.isEnabled || isCurrentTimeFitTimeTable(currentFilterSettings.timetable));

                        if (hasLeadHunterCurrentScriptId) {
                            leadHunterScriptId = keys[i];
                            storage.set(LEAD_HUNTER_CURRENT_SCRIPT_ID, leadHunterScriptId);
                        }
                    }

                    return leadHunterScriptId;
                };

                var getLeadHunterTargetPages = function() {
                    var leadHunterActiveScriptDisplaySettings = getLeadHunterActiveScriptDisplaySettings();

                    return leadHunterActiveScriptDisplaySettings !== null
                        ? leadHunterActiveScriptDisplaySettings.targetPageList.join(',')
                        : '';
                };

                var getLeadHunterActiveScriptPulsatorEnableSetting = function() {
                    var leadHunterActiveScriptDisplaySettings = getLeadHunterActiveScriptDisplaySettings();
                    return leadHunterActiveScriptDisplaySettings !== null
                        ? Number(leadHunterActiveScriptDisplaySettings.isPulsatorEnabled)
                        : 0;
                };

                var getLeadHunterActiveScriptDisplaySettings = function() {
                    var activeScriptId = storage.get(LEAD_HUNTER_DEFAULT_SCRIPT_ID);
                    var leadHunterTargetPagesMap = storage.getObject(LEAD_HUNTER_TARGET_PAGES_MAP);

                    return leadHunterTargetPagesMap !== null && leadHunterTargetPagesMap[activeScriptId] !== null
                        ? leadHunterTargetPagesMap[activeScriptId]
                        : null;
                };


                window.roistatLeadHunterShow = leadHunterShowInCenter;
                window.roistatRenderPhoneMask = _roistatRenderPhoneMask;
                window.roistat.leadHunter.localization.translateToRussian = function() { translateLeadHunterFormToLanguage(RU_LANGUAGE_KEY) };
                window.roistat.leadHunter.localization.translateToEnglish = function() { translateLeadHunterFormToLanguage(EN_LANGUAGE_KEY) };

                addVisitProcessedCallback(init);
            },
            multiwidget: function() {
                var HIDDEN_CLASS                    = 'roistat-multiwidget-hidden',
                    TRIGGER_CLASS                   = 'roistat-multiwidget-pulsator-phone',
                    LEAD_HUNTER_ITEM_CLASS          = 'roistat-multiwidget-pulsator-popup-item-lead-hunter',
                    PULSATOR_FILL_CLASS             = 'roistat-multiwidget-pulsator-fill',
                    PULSATOR_FILL_SVG_CLASS         = 'roistat-multiwidget-pulsator-fill-svg',
                    PULSATOR_ICON_CLASS             = 'roistat-multiwidget-pulsator-img-icon',
                    ONLINE_CHAT_ITEM_CLASS          = 'roistat-multiwidget-pulsator-popup-item-chat',
                    FB_ITEM_CLASS                   = 'roistat-multiwidget-pulsator-popup-item-facebook',
                    VK_ITEM_CLASS                   = 'roistat-multiwidget-pulsator-popup-item-vk',
                    TELEGRAM_ITEM_CLASS             = 'roistat-multiwidget-pulsator-popup-item-telegram',
                    WHATS_APP_ITEM_CLASS            = 'roistat-multiwidget-pulsator-popup-item-whats-app',
                    VIBER_ITEM_CLASS                = 'roistat-multiwidget-pulsator-popup-item-viber',
                    POPUP_OVERLAY_CLASS             = 'roistat-multiwidget-pulsator-overlay',
                    POPUP_CLASS                     = 'roistat-multiwidget-pulsator-items-popup-holder',
                    POPUP_HEADER_CLASS              = 'roistat-multiwidget-pulsator-popup-header-wrapper',
                    IFRAME_CHAT_SUCCESSFULLY_LOADED = 'iframe_chat_successfully_loaded',
                    POPUP_TAIL_CLASS                = 'roistat-multiwidget-pulsator-popup-tail',
                    ONLINE_CHAT_CLASS               = 'roistat-online-chat-popup-wrapper',
                    IFRAME_HOLDER_HIDDEN_CLASS      = 'roistat-online-chat-popup-wrapper-hidden',
                    PULSATOR_HOLDER_HIDDEN_CLASS    = 'roistat-multiwidget-pulsator-holder-hidden';

                var pulsator, pulsatorTrigger, pulsatorPopup, pulsatorPopupOverlay, pulsatorPopupHeader, pulsatorPopupTail, pulsatorFill, pulsatorFillSvg, pulsatorIcon,
                    leadHunterItem, onlineChatItem, vkItem, fbItem, telegramItem, whatsAppItem, viberItem;

                var isIframeChatSuccessfullyLoaded = false;
                var isPulsatorPopupHeaderShown = true;

                var PULSATOR_POSITION_BY_LABEL = {
                    topLeft: {
                        bottom: 'unset',
                        right: 'unset',
                        top: isMobileWindowWidth() ? 0 : '20px',
                        left: isMobileWindowWidth() ? 0 : '35px',
                        transformOrigin: 'top left'
                    },
                    topRight: {
                        bottom: 'unset',
                        right: isMobileWindowWidth() ? 0 : '35px',
                        top: isMobileWindowWidth() ? 0 : '20px',
                        left: 'unset',
                        transformOrigin: 'top right'
                    },
                    bottomRight: {
                        bottom: isMobileOrTabletWindowWidth() ? 0 : '20px',
                        right: isMobileOrTabletWindowWidth() ? '6px' : '35px',
                        top: 'unset',
                        left: 'unset',
                        transformOrigin: 'bottom right'
                    },
                    bottomLeft: {
                        bottom: isMobileWindowWidth() ? 0 : '20px',
                        right: 'unset',
                        top: 'unset',
                        left: isMobileWindowWidth() ? 0 : '35px',
                        transformOrigin: 'bottom left'
                    }
                };

                var PULSATOR_POPUP_POSITION_BY_LABEL = {
                    topLeft: {
                        bottom: 'unset',
                        right: 'unset',
                        top: '110px',
                        left: '0'
                    },
                    topRight: {
                        bottom: 'unset',
                        right: '0',
                        top: '110px',
                        left: 'unset'
                    },
                    bottomRight: {
                        bottom: '110px',
                        right: '0',
                        top: 'unset',
                        left: 'unset'
                    },
                    bottomLeft: {
                        bottom: '110px',
                        right: 'unset',
                        top: 'unset',
                        left: '0'
                    }
                };

                var PULSATOR_POPUP_TAIL_POSITION_BY_LABEL = {
                    topLeft: {
                        'border-top-color': 'white',
                        'border-right-color': 'transparent',
                        'border-bottom-color': 'transparent',
                        'border-left-color': 'white',
                        bottom: 'unset',
                        right: 'unset',
                        top: '-14px',
                        left: '40px'
                    },
                    topRight: {
                        'border-top-color': 'white',
                        'border-right-color': 'transparent',
                        'border-bottom-color': 'transparent',
                        'border-left-color': 'white',
                        bottom: 'unset',
                        right: '34px',
                        top: '-14px',
                        left: 'unset'
                    },
                    bottomRight: {
                        'border-top-color': 'transparent',
                        'border-right-color': 'white',
                        'border-bottom-color': 'white',
                        'border-left-color': 'transparent',
                        bottom: '-14px',
                        right: '40px',
                        top: 'unset',
                        left: 'unset'
                    },
                    bottomLeft: {
                        'border-top-color': 'transparent',
                        'border-right-color': 'white',
                        'border-bottom-color': 'white',
                        'border-left-color': 'transparent',
                        bottom: '-14px',
                        right: 'unset',
                        top: 'unset',
                        left: '34px'
                    }
                };

                function debugMultiwidget(debugString) {
                    debug('Multiwidget: ' + debugString);
                }

                function saveNodeElements() {
                    pulsatorTrigger      = _getSafeFirstElementByClassName(pulsator, TRIGGER_CLASS);
                    pulsatorPopup        = _getSafeFirstElementByClassName(pulsator, POPUP_CLASS);
                    pulsatorPopupHeader  = _getSafeFirstElementByClassName(pulsator, POPUP_HEADER_CLASS);
                    pulsatorPopupOverlay = _getSafeFirstElementByClassName(pulsator, POPUP_OVERLAY_CLASS);
                    leadHunterItem       = _getSafeFirstElementByClassName(pulsatorPopup, LEAD_HUNTER_ITEM_CLASS);
                    pulsatorPopupTail    = _getSafeFirstElementByClassName(pulsator, POPUP_TAIL_CLASS);
                    onlineChatItem       = _getSafeFirstElementByClassName(pulsatorPopup, ONLINE_CHAT_ITEM_CLASS);
                    vkItem               = _getSafeFirstElementByClassName(pulsatorPopup, VK_ITEM_CLASS);
                    fbItem               = _getSafeFirstElementByClassName(pulsatorPopup, FB_ITEM_CLASS);
                    telegramItem         = _getSafeFirstElementByClassName(pulsatorPopup, TELEGRAM_ITEM_CLASS);
                    whatsAppItem         = _getSafeFirstElementByClassName(pulsatorPopup, WHATS_APP_ITEM_CLASS);
                    viberItem            = _getSafeFirstElementByClassName(pulsatorPopup, VIBER_ITEM_CLASS);
                    pulsatorFill         = _getSafeFirstElementByClassName(pulsatorTrigger, PULSATOR_FILL_CLASS);
                    pulsatorFillSvg      = pulsatorTrigger.getElementsByClassName(PULSATOR_FILL_SVG_CLASS);
                    pulsatorIcon         = _getSafeFirstElementByClassName(pulsatorTrigger, PULSATOR_ICON_CLASS);
                }

                function togglePopupOverlayVisibility() {
                    if (isMobileOrTabletWindowWidth() && _isNodeElement(pulsatorPopupOverlay) && _isNodeElement(pulsatorPopup)) {
                        if (pulsatorPopup.classList.contains(HIDDEN_CLASS)) {
                            hideElementOption(pulsatorPopupOverlay);
                        } else {
                            showElementOption(pulsatorPopupOverlay);
                        }
                    }
                }

                function togglePopupVisibility() {
                    if (_isNodeElement(pulsatorPopup)) {
                        pulsatorPopup.classList.toggle(HIDDEN_CLASS);
                    }

                    togglePopupOverlayVisibility();
                }

                function togglePulsatorState(pulsator) {
                    if (_isNodeElement(pulsator)) {
                        pulsator.classList.toggle('opened');
                    }
                }

                function addPulsatorEvents() {
                    debugMultiwidget('add pulsator events');

                    _addEvent(pulsatorTrigger, 'click', function() {
                        if (!isOnlineChatOpened()) {
                            togglePopupVisibility();
                        }

                        togglePulsatorState(pulsatorTrigger);
                    });

                    _addEvent(pulsatorPopupHeader, 'click', function() {
                        if (!isOnlineChatOpened()) {
                            togglePopupVisibility();
                        }

                        togglePulsatorState(pulsatorTrigger);
                        togglePopupOverlayVisibility();
                    })

                    _addEvent(pulsatorPopupOverlay, 'click', function() {
                        if (!isOnlineChatOpened()) {
                            togglePopupVisibility();
                        }

                        togglePulsatorState(pulsatorTrigger);
                        togglePopupOverlayVisibility();
                    })


                    _addEvent(leadHunterItem, 'click', function() {
                        debugMultiwidget('opening leadhunter via multiwidget');

                        window.roistatLeadHunterShow();
                        togglePopupVisibility();
                        toggleElementClass(pulsatorTrigger, 'opened', false);
                    });

                    _addEvent(onlineChatItem, 'click', function() {
                        debugMultiwidget('opening online chat via multiwidget');

                        window.roistatOnlineChatShow();
                        togglePopupVisibility();
                    });

                    _addEvent(vkItem, 'click', function() {
                        window.open(storage.get(MULTIWIDGET_VK_LINK), '_blank');
                    });

                    _addEvent(fbItem, 'click', function() {
                        window.open(storage.get(MULTIWIDGET_FB_LINK), '_blank');
                    });

                    _addEvent(telegramItem, 'click', function() {
                        window.open(storage.get(MULTIWIDGET_TELEGRAM_LINK), '_blank');
                    });

                    _addEvent(whatsAppItem, 'click', function() {
                        window.open(storage.get(MULTIWIDGET_WHATS_APP_LINK), '_blank');
                    });

                    _addEvent(viberItem, 'click', function() {
                        window.open(storage.get(MULTIWIDGET_VIBER_LINK), '_blank');
                    });
                }

                function isOnlineChatOpened() {
                    var onlineChatHolder = _getSafeFirstElementByClassName(document, ONLINE_CHAT_CLASS);

                    return _isNodeElement(onlineChatHolder) && !onlineChatHolder.classList.contains(IFRAME_HOLDER_HIDDEN_CLASS);
                }

                function isPopupOpened() {
                    return _isNodeElement(POPUP_CLASS) && !POPUP_CLASS.classList.contains(HIDDEN_CLASS);
                }

                function hideElementOption(element) {
                    if (_isNodeElement(element)) {
                        element.classList.add(HIDDEN_CLASS);
                    }
                }

                function showElementOption(element) {
                    if (_isNodeElement(element)) {
                        element.classList.remove(HIDDEN_CLASS);
                    }
                }

                function hideLeadHunterOption() {
                    hideElementOption(leadHunterItem);
                }

                function hideDisabledMultiwidgetOptions() {
                    debugMultiwidget('hiding disabled multiwidget options');
                    var isLeadHunterEnabled = Number(storage.get(LEAD_HUNTER_ENABLED)),
                        isVKEnabled         = Number(storage.get(MULTIWIDGET_VK_ENABLED)),
                        isFBEnabled         = Number(storage.get(MULTIWIDGET_FB_ENABLED)),
                        isTelegramEnabled   = Number(storage.get(MULTIWIDGET_TELEGRAM_ENABLED)),
                        isWhatsAppEnabled   = Number(storage.get(MULTIWIDGET_WHATS_APP_ENABLED)),
                        isViberEnabled      = Number(storage.get(MULTIWIDGET_VIBER_ENABLED));

                    var optionsAmount = 0;

                    if (!isLeadHunterEnabled || !isLeadHunterPulsatorEnabled || !isLeadHunterPulsatorShownAtThisPage) {
                        debugMultiwidget('hiding leadhunter option');
                        hideLeadHunterOption();
                    }

                    if (!isNeedToShowOnlineChat() || !isIframeChatSuccessfullyLoaded) {
                        debugMultiwidget('hiding online chat option');
                        hideElementOption(onlineChatItem);
                    }

                    if (isNeedToShowOnlineChat()) {
                        optionsAmount++;
                    }

                    if (!isVKEnabled) {
                        debugMultiwidget('hiding vk-messenger option');
                        hideElementOption(vkItem);
                    } else {
                        optionsAmount++;
                    }

                    if (!isFBEnabled) {
                        debugMultiwidget('hiding fb-messenger option');
                        hideElementOption(fbItem);
                    } else {
                        optionsAmount++;
                    }

                    if (!isTelegramEnabled) {
                        debugMultiwidget('hiding telegram-messenger option');
                        hideElementOption(telegramItem);
                    } else {
                        optionsAmount++;
                    }

                    if (!isWhatsAppEnabled) {
                        debugMultiwidget('hiding whatsApp-messenger option');
                        hideElementOption(whatsAppItem);
                    } else {
                        optionsAmount++;
                    }

                    if (!isViberEnabled) {
                        debugMultiwidget('hiding Viber-messenger option');
                        hideElementOption(viberItem);
                    } else {
                        optionsAmount++;
                    }

                    isPulsatorPopupHeaderShown = optionsAmount > 1;

                    if (isMobileOrTabletWindowWidth() && isPulsatorPopupHeaderShown) {
                        debugMultiwidget('hiding popup header');
                        showElementOption(pulsatorPopupHeader);
                    }
                }

                function fillPulsator() {
                    var pulsatorSettings = storage.getObject(MULTIWIDGET_PULSATOR_SETTINGS);
                    debugMultiwidget('start filling pulsator');

                    if (pulsatorSettings) {
                        if (_isNodeElement(pulsatorFill)) {
                            pulsatorFill.setAttribute('style', 'background: ' + pulsatorSettings.button_color + ';');
                        }

                        if (_isNodeElement(pulsatorIcon)) {
                            pulsatorIcon.setAttribute('style', 'fill: ' + pulsatorSettings.icon_color + ';');
                        }

                        if (HTMLCollection.prototype.isPrototypeOf(pulsatorFillSvg)) {
                            for (var i = 0; i < pulsatorFillSvg.length; i++) {
                                pulsatorFillSvg[i].setAttribute('style', 'fill: ' + pulsatorSettings.button_color + ';');
                            }
                        }
                    }
                }

                function getPulsatorPosition() {
                    var pulsatorSettings = storage.getObject(MULTIWIDGET_PULSATOR_SETTINGS);
                    return pulsatorSettings !== null && typeof pulsatorSettings.position === 'string' && pulsatorSettings.position !== ''
                        ? pulsatorSettings.position
                        : 'bottomRight';
                }

                function setPulsatorPosition() {
                    if (_isNodeElement(pulsator)) {
                        var pulsatorPosition = getPulsatorPosition();

                        pulsator.setAttribute('style',
                            'top: ' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].top + ';'
                            + 'right:' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].right + ';'
                            + 'bottom:' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].bottom + ';'
                            + 'left:' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].left + ';'
                        );

                        pulsator.style.transformOrigin = PULSATOR_POSITION_BY_LABEL[pulsatorPosition].transformOrigin;
                        pulsator.style.transform = getPulsatorScale();
                    }
                }

                function setPulsatorTriggerPosition() {
                    if (_isNodeElement(pulsatorTrigger)) {
                        var pulsatorPosition = getPulsatorPosition();
                        var pulsatorScale = 'transform: ' + getPulsatorTriggerScale() + ';';
                        var marginSide = pulsatorPosition === 'topLeft' || pulsatorPosition === 'bottomLeft'
                            ? 'margin-right' : 'margin-left';

                        pulsatorTrigger.setAttribute('style',
                            marginSide + ': auto'+ ';'
                            + pulsatorScale
                        );
                    }
                }

                function setPulsatorPopupPosition() {
                    if (_isNodeElement(pulsatorPopup)) {
                        var pulsatorPosition = getPulsatorPosition();
                        var pulsatorPopupBottom = isMobileOrTabletWindowWidth() ? '0' : PULSATOR_POPUP_POSITION_BY_LABEL[pulsatorPosition].bottom;
                        var pulsatorPopupTop = isMobileOrTabletWindowWidth() ? 'unset' : PULSATOR_POPUP_POSITION_BY_LABEL[pulsatorPosition].top;

                        pulsatorPopup.setAttribute('style',
                            'top: ' + pulsatorPopupTop + ';'
                            + 'right:' + PULSATOR_POPUP_POSITION_BY_LABEL[pulsatorPosition].right + ';'
                            + 'bottom:' + pulsatorPopupBottom + ';'
                            + 'left:' + PULSATOR_POPUP_POSITION_BY_LABEL[pulsatorPosition].left + ';'
                        );
                    }
                }

                function setPulsatorPopupTailPosition() {
                    if (_isNodeElement(pulsatorPopupTail)) {
                        var pulsatorPosition = getPulsatorPosition();

                        pulsatorPopupTail.setAttribute('style',
                            'top: ' + PULSATOR_POPUP_TAIL_POSITION_BY_LABEL[pulsatorPosition].top + ';'
                            + 'right:' + PULSATOR_POPUP_TAIL_POSITION_BY_LABEL[pulsatorPosition].right + ';'
                            + 'bottom:' + PULSATOR_POPUP_TAIL_POSITION_BY_LABEL[pulsatorPosition].bottom + ';'
                            + 'left:' + PULSATOR_POPUP_TAIL_POSITION_BY_LABEL[pulsatorPosition].left + ';'
                            + 'border-top-color:' + PULSATOR_POPUP_TAIL_POSITION_BY_LABEL[pulsatorPosition]['border-top-color'] + ';'
                            + 'border-right-color:' + PULSATOR_POPUP_TAIL_POSITION_BY_LABEL[pulsatorPosition]['border-right-color'] + ';'
                            + 'border-bottom-color:' + PULSATOR_POPUP_TAIL_POSITION_BY_LABEL[pulsatorPosition]['border-bottom-color'] + ';'
                            + 'border-left-color:' + PULSATOR_POPUP_TAIL_POSITION_BY_LABEL[pulsatorPosition]['border-left-color'] + ';'
                        );
                    }
                }

                function setPosition() {
                    setPulsatorPosition();
                    setPulsatorTriggerPosition();

                    if (!isMobileOrTabletWindowWidth()) {
                        setPulsatorPopupPosition();
                        setPulsatorPopupTailPosition();
                    }
                }

                function processMultiwidget() {
                    if (document.body === null) {
                        return;
                    }

                    var multiwidgetPulsatorTemplate = Base64.decode(storage.get(MULTIWIDGET_PULSATOR_TEMPLATE));

                    if (multiwidgetPulsatorTemplate) {
                        debugMultiwidget('appending multiwidget pulsator');

                        var tempPulsatorHolder = document.createElement('div');

                        tempPulsatorHolder.innerHTML = multiwidgetPulsatorTemplate;

                        pulsator = tempPulsatorHolder.childNodes.item(0);

                        if (!window.roistat.multiwidget.isVisible) {
                            debugMultiwidget('Hide widget');
                            pulsator.className = pulsator.className + ' ' + PULSATOR_HOLDER_HIDDEN_CLASS;
                        }

                        document.body.appendChild(pulsator);

                        saveNodeElements();
                        hideDisabledMultiwidgetOptions();
                        fillPulsator();
                        setPosition();
                        addPulsatorEvents();

                        if (!isMultiwidgetChangeButtonsTextFocusGroupEnabled) {
                            pulsator.classList.add('old');
                        }
                    }
                }

                function fillMultiwidgetSettings() {
                    var multiwidgetSettings = storage.getObject(MULTIWIDGET_SETTINGS);

                    if (!multiwidgetSettings) {
                        var isEnabled = parseInt(storage.get(MULTIWIDGETS_ENABLED));
                        isEnabled = !isNaN(isEnabled) ? Boolean(isEnabled) : roistat.multiwidget.isEnabled;

                        var vkIsEnabled = Boolean(parseInt(storage.get(MULTIWIDGET_VK_ENABLED))) || roistat.multiwidget.vk.isEnabled;
                        var vkLink = storage.get(MULTIWIDGET_VK_LINK);
                        vkLink = vkLink !== 'null' ? vkLink : roistat.multiwidget.vk.link;

                        var fbIsEnabled = Boolean(parseInt(storage.get(MULTIWIDGET_FB_ENABLED))) || roistat.multiwidget.fb.isEnabled;
                        var fbLink = storage.get(MULTIWIDGET_FB_LINK);
                        fbLink = fbLink !== 'null' ? fbLink : roistat.multiwidget.fb.link;

                        var telegramIsEnabled = Boolean(parseInt(storage.get(MULTIWIDGET_TELEGRAM_ENABLED))) || roistat.multiwidget.telegram.isEnabled;
                        var telegramLink = storage.get(MULTIWIDGET_TELEGRAM_LINK);
                        telegramLink = telegramLink !== 'null' ? telegramLink : roistat.multiwidget.telegram.link;

                        var whatsAppIsEnabled = Boolean(parseInt(storage.get(MULTIWIDGET_WHATS_APP_ENABLED))) || roistat.multiwidget.whatsApp.isEnabled;
                        var whatsAppLink = storage.get(MULTIWIDGET_WHATS_APP_LINK);
                        whatsAppLink = whatsAppLink !== 'null' ? whatsAppLink : roistat.multiwidget.whatsApp.link;

                        var viberIsEnabled = Boolean(parseInt(storage.get(MULTIWIDGET_VIBER_ENABLED))) || roistat.multiwidget.viber.isEnabled;
                        var viberLink = storage.get(MULTIWIDGET_VIBER_LINK);
                        viberLink = viberLink !== 'null' ? viberLink : roistat.multiwidget.viber.link;

                        multiwidgetSettings = {
                            is_enabled: isEnabled,
                            vk: {
                                is_enabled: vkIsEnabled,
                                link: vkLink
                            },
                            fb: {
                                is_enabled: fbIsEnabled,
                                link: fbLink
                            },
                            telegram: {
                                is_enabled: telegramIsEnabled,
                                link: telegramLink
                            },
                            whats_app: {
                                is_enabled: whatsAppIsEnabled,
                                link: whatsAppLink
                            },
                            viber: {
                                is_enabled: viberIsEnabled,
                                link: viberLink
                            }
                        };
                    }

                    saveMultiwidgetSettings(multiwidgetSettings);
                }

                function bindGlobalEvents() {
                    _addEventListener(window, 'message', function handleIframePostMessages(e) {
                        var message = typeof e.data === 'string' ? e.data : e.data.message;

                        if (message === IFRAME_CHAT_SUCCESSFULLY_LOADED) {
                            isIframeChatSuccessfullyLoaded = true;

                            showElementOption(onlineChatItem);
                        }
                    });

                    function handleResize() {
                        if (_isNodeElement(pulsator)) {
                            pulsator.style.transform = getPulsatorScale();

                            setPulsatorPopupPosition();
                            setPulsatorPopupTailPosition();

                            if (!isMobileOrTabletWindowWidth()) {
                                hideElementOption(pulsatorPopupOverlay);
                                hideElementOption(pulsatorPopupHeader);
                                showElementOption(pulsatorPopupTail);
                            } else {
                                togglePopupOverlayVisibility();
                                hideElementOption(pulsatorPopupTail);

                                if (isPulsatorPopupHeaderShown) {
                                    showElementOption(pulsatorPopupHeader);
                                }
                            }
                        }
                    }


                    _addEventListener(window, 'resize', handleResize);

                    if (isVisualViewportSupported) {
                        _addEventListener(visualViewport, 'resize', handleResize);
                    }

                    function togglePulsatorTriggerState() {
                        if (_isNodeElement(pulsatorTrigger)) {
                            pulsatorTrigger.classList.toggle('opened');
                        }
                    }

                    window.roistatToggleMultiwidgetState = togglePulsatorTriggerState;
                }

                function init() {
                    fillMultiwidgetSettings();
                    requireCss();
                    bindGlobalEvents();
                    debugMultiwidget('activated');

                    documentReadyCallback(function() {
                        processMultiwidget();

                        if (typeof window.onRoistatMultiwidgetInited === 'function') {
                            window.onRoistatMultiwidgetInited();
                        }
                    });
                }

                roistatHideMultiwidgetLeadHunterOption = hideLeadHunterOption;
                addVisitProcessedCallback(init);
            },
            onlineChat: function() {
                var IFRAME_MODULE_CREATED            = 'iframe-module-created',
                    IFRAME_CHAT_SUCCESSFULLY_LOADED  = 'iframe_chat_successfully_loaded',
                    IFRAME_RESIZE                    = 'iframe_resize',
                    IFRAME_OPENED                    = 'iframe-online-chat-opened',
                    IFRAME_INVITE_MESSAGE            = 'iframe-online-chat-invite-message',
                    IFRAME_DELIVERED_MESSAGES        = 'iframe-delivered-messages',
                    IFRAME_CHAT_INIT                 = 'roistat-online-chat-init',
                    IFRAME_CHAT_INIT_WITH_TEXT       = 'roistat-online-chat-init-with-text',
                    IFRAME_CHAT_OPEN                 = 'roistat-online-chat-open',
                    IFRAME_CHAT_CLOSE                = 'roistat-online-chat-close',
                    RELOAD_CHAT                      = 'roistat-online-chat-reload',
                    UPDATE_CUSTOM_PARAMS             = 'roistat-online-chat-update-custom-params',
                    LEAD_SUCCESSFULLY_SENT           = 'roistat-online-chat-lead_successfully_sent',
                    TRANSLATE_FORM_MESSAGE           = 'roistat-online-chat-translate-form',
                    IFRAME_SEND_LEAD_MESSAGE         = 'roistat-online-chat-send-lead',
                    ROISTAT_CHAT_COOKIE              = 'roistat_chat_id',
                    ROISTAT_CHAT_SESSION_KEY         = 'roistat_chat_session',
                    ROISTAT_CHAT_CUSTOM_POSITION     = 'roistat_chat_custom_position',
                    ROISTAT_CHAT_PAGE_RESIZED        = 'roistat-online-chat-page-resized',
                    ROISTAT_CHAT_COOKIES_EXPIRE_TIME = 10*365*24*60*60,
                    onlineChat, onlineChatMouseTrack, onlineChatIframeHolder, onlineChatIframeSpacer, onlineChatPulsatorPhone,
                    onlineChatIframe, onlineChatPulsatorFill, onlineChatPulsatorIcon, onlineChatPulsatorFillSvg;

                var IFRAME_ID                            = 'roistat-online-chat-popup-iframe',
                    HIDDEN_CLASS                         = 'roistat-online-chat-hidden',
                    IFRAME_HOLDER_CLASS                  = 'roistat-online-chat-holder',
                    IFRAME_HOLDER_WRAPPER_CLASS          = 'roistat-online-chat-popup-wrapper',
                    MLTIWIDGET_PULSATOR_TRIGGER_CLASS    = 'roistat-multiwidget-pulsator-phone',
                    MLTIWIDGET_PULSATOR_POPUP_CLASS      = 'roistat-multiwidget-pulsator-items-popup-holder',
                    MLTIWIDGET_PULSATOR_OVERLAY_CLASS    = 'roistat-multiwidget-pulsator-overlay',
                    MLTIWIDGET_PULSATOR_HIDDEN_CLASS     = 'roistat-multiwidget-hidden',
                    MLTIWIDGET_ONLINE_CHAT_ITEM_CLASS    = 'roistat-multiwidget-pulsator-popup-item-chat',
                    IFRAME_HOLDER_HIDDEN_CLASS           = 'roistat-online-chat-popup-wrapper-hidden',
                    ONLINE_CHAT_MOUSE_TRACK_CLASS        = 'roistat-online-chat-popup-mouse-track',
                    ONLINE_CHAT_MOUSE_TRACK_CLASS_ACTIVE = 'roistat-online-chat-popup-mouse-track-active',
                    PULSATOR_FILL_CLASSNAME              = 'roistat-online-chat-pulsator-fill',
                    PULSATOR_ICON_CLASSNAME              = 'roistat-online-chat-pulsator-img',
                    PULSATOR_PHONE_CLASSNAME             = 'roistat-online-chat-pulsator-phone',
                    PULSATOR_CIRCLE_CLASSNAME            = 'roistat-online-chat-pulsator-circle',
                    PULSATOR_CIRCLE_CLASSNAME_SELECTOR   = '.' + PULSATOR_CIRCLE_CLASSNAME,
                    PULSATOR_NOTIFICATION                = 'roistat-online-chat-pulsator-notification-circle',
                    PULSATOR_NOTIFICATION_SELECTOR       = '.' + PULSATOR_NOTIFICATION,
                    PULSATOR_ICON_FILL_CLASSNAME         = 'roistat-online-chat-pulsator-fill-svg',
                    ONLINE_CHAT_SPACER_CLASSNAME         = 'roistat-online-chat-popup-spacer',
                    MULTIWIDGET_ITEMS_SELECTOR           = '.roistat-multiwidget-pulsator-items-popup',
                    ONLINE_CHAT_PULSATOR_SELECTOR        = '.roistat-online-chat-pulsator-phone',
                    ONLINE_CHAT_SELECTOR                 = '.roistat-online-chat-popup-wrapper',
                    IFRAME_FULL_SCREEN_CLASS             = 'roistat-online-chat-full-screen';

                var MAX_NOTIFICATION_LIMIT        = 99;
                var NOTIFICATIONS_LIMIT_CLASSNAME = 'roistat-online-chat-pulsator-notification-limit';

                var isInited                       = false,
                    isIframeModuleCreated          = false,
                    isChatWaitingForOpen           = false,
                    isSettingPosition              = false,
                    isOnlineChatIframeOnFullScreen = false,
                    initingCursorXPosition         = 0,
                    initingCursorYPosition         = 0;

                var onlineChatIframeStyles         = {};

                var PULSATOR_HOLDER_SELECTOR     = '.roistat-online-chat-holder';
                var PULSATOR_HOLDER_HIDDEN_CLASS = 'roistat-online-chat-holder-hidden';
                if (isNeedRenderMultiwidget()) {
                    PULSATOR_HOLDER_SELECTOR           = '.roistat-multiwidget-pulsator-holder';
                    PULSATOR_HOLDER_HIDDEN_CLASS       = 'roistat-multiwidget-pulsator-holder-hidden';
                    PULSATOR_CIRCLE_CLASSNAME          = 'roistat-multiwidget-pulsator-circle';
                    PULSATOR_CIRCLE_CLASSNAME_SELECTOR = '.' + PULSATOR_CIRCLE_CLASSNAME;
                    PULSATOR_NOTIFICATION              = 'roistat-multiwidget-pulsator-notification-circle';
                    PULSATOR_NOTIFICATION_SELECTOR     = '.' + PULSATOR_NOTIFICATION;
                    NOTIFICATIONS_LIMIT_CLASSNAME      = 'roistat-multiwidget-pulsator-notification-limit';
                }

                var pulsator;

                var PULSATOR_POSITION_BY_LABEL = {
                    topLeft: {
                        bottom: 'unset',
                        right: 'unset',
                        top: isMobileOrTabletWindowWidth() ? '10px' : '20px',
                        left: isMobileOrTabletWindowWidth() ? '24px' : '35px'
                    },
                    topRight: {
                        bottom: 'unset',
                        right: isMobileOrTabletWindowWidth() ? '24px' : '35px',
                        top: isMobileOrTabletWindowWidth() ? '10px' : '20px',
                        left: 'unset'
                    },
                    bottomRight: {
                        bottom: isMobileOrTabletWindowWidth() ? '10px' : '20px',
                        right: isMobileOrTabletWindowWidth() ? '24px' : '35px',
                        top: 'unset',
                        left: 'unset'
                    },
                    bottomLeft: {
                        bottom: isMobileOrTabletWindowWidth() ? '10px' : '20px',
                        right: 'unset',
                        top: 'unset',
                        left: isMobileOrTabletWindowWidth() ? '24px' : '35px'
                    }
                };

                var getIframePositionByLabel = function() {
                    return {
                        topLeft: {
                            top: isMobileOrTabletWindowWidth() ? 'unset' : '130px',
                            right: 'unset',
                            bottom: isMobileOrTabletWindowWidth() ? '0px': 'unset',
                            left: isMobileOrTabletWindowWidth() ? 0 : '65px'
                        },
                        topRight: {
                            top: isMobileOrTabletWindowWidth() ? 'unset' : '130px',
                            right: isMobileOrTabletWindowWidth() ? 0 : '65px',
                            bottom: isMobileOrTabletWindowWidth() ? '0px': 'unset',
                            left: 'unset'
                        },
                        bottomRight: {
                            top: 'unset',
                            right: isMobileOrTabletWindowWidth() ? 0 : '65px',
                            bottom: isMobileOrTabletWindowWidth() ? 0 : '130px',
                            left: 'unset'
                        },
                        bottomLeft: {
                            top: 'unset',
                            right: 'unset',
                            bottom: isMobileOrTabletWindowWidth() ? 0 : '130px',
                            left: isMobileOrTabletWindowWidth() ? 0 : '65px'
                        }
                    }
                };

                var IFRAME_MOUSE_TRACK_POSITION_BY_LABEL = {
                    topLeft: {
                        top: 'unset',
                        bottom: '0',
                        height: '20px'
                    },
                    topRight: {
                        top: 'unset',
                        bottom: '0',
                        height: '20px'
                    },
                    bottomLeft: {
                        top: '0',
                        bottom: 'unset',
                        height: '50px'
                    },
                    bottomRight: {
                        top: '0',
                        bottom: 'unset',
                        height: '50px'
                    }
                };

                var debugOnlineChat = function(message) {
                    debug('onlineChat: ' + message);
                };

                var generateUniqueKey = function () {
                    function generateRandomString() {
                        return Math.random().toString(36).substr(2, 8);
                    }

                    return generateRandomString() + generateRandomString() + generateRandomString() + generateRandomString();
                }

                var getViewportMetaTag = function () {
                    var viewportMetaTag = document.querySelector('meta[name="viewport"]');

                    if (_isNodeElement(viewportMetaTag)) {
                        return viewportMetaTag.getAttribute('content');
                    }

                    return null;
                }

                var INITAL_VIEWPORT_META_TAG = getViewportMetaTag();
                var IFRAME_VIEWPORT_CONTENT = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no';

                var getUniqueKey = function () {
                    var key = roistatGetCookie(ROISTAT_CHAT_SESSION_KEY);

                    if (!key) {
                        key = storage.get(ROISTAT_CHAT_SESSION_KEY);
                    }

                    if (!key) {
                        key = generateUniqueKey();
                        var cookieConfigLong = { expires: ROISTAT_CHAT_COOKIES_EXPIRE_TIME, path: '/' };
                        if (COOKIE_CONFIG.domain) {
                            cookieConfigLong.domain = COOKIE_CONFIG.domain;
                        }
                        storage.save(ROISTAT_CHAT_SESSION_KEY, key, cookieConfigLong);
                    }

                    return key;
                }

                var sendInitDataToIframe = function () {
                    var data = {
                        message: IFRAME_MODULE_CREATED,
                        detail: {
                            version: SCRIPT_VERSION,
                            language: onlineChatLanguage,
                            projectKey: getProjectForUrl(),
                            visitId: getVisitIdForLeadCreation(),
                            firstVisit: getRoistatFirstVisitId(),
                            chatId: roistatGetCookie(ROISTAT_CHAT_COOKIE),
                            moduleTargetOrigin: window.location.origin,
                            referrer: window.location.href,
                            params: onlineChatParams,
                            sessionUniqueKey: getUniqueKey(),
                            isOpened: isOnlineChatOpened(),
                            isMobile: isMobileOrTabletWindowWidth(),
                        }
                    };

                    onlineChatIframe.contentWindow.postMessage(data, onlineChatIframe.src);
                };

                var sendOpenedDataToIframe = function () {
                    var data = {
                        message: IFRAME_OPENED,
                        detail: {
                            isOpened: isOnlineChatOpened(),
                            isMobile: isMobileOrTabletWindowWidth(),
                        }
                    };

                    onlineChatIframe.contentWindow.postMessage(data, onlineChatIframe.src);
                };

                var sendUpdateParamsMessage = function () {
                    var data = {
                        message: UPDATE_CUSTOM_PARAMS,
                        detail: {
                            params: onlineChatParams,
                            isMobile: isMobileOrTabletWindowWidth(),
                        }
                    };

                    onlineChatIframe.contentWindow.postMessage(data, onlineChatIframe.src);
                };

                var sendIframeTranslateMessage = function () {
                    var data = {
                        language: onlineChatLanguage,
                        message: TRANSLATE_FORM_MESSAGE
                    };

                    onlineChatIframe.contentWindow.postMessage(data, onlineChatIframe.src);
                };

                var sendIframeChatInitWithTextMessage = function (text) {
                    var data = {
                        message: IFRAME_CHAT_INIT_WITH_TEXT,
                        detail: {
                            message: text,
                            isMobile: isMobileOrTabletWindowWidth(),
                        }
                    };

                    onlineChatIframe.contentWindow.postMessage(data, onlineChatIframe.src);
                };

                var sendIframeChatOpensMessage = function (chatId) {
                    var data = {
                        message: IFRAME_CHAT_OPEN,
                        detail: {
                            chatId: chatId,
                            isMobile: isMobileOrTabletWindowWidth(),
                        }
                    };

                    onlineChatIframe.contentWindow.postMessage(data, onlineChatIframe.src);
                }

                var closeIframeChat = function () {
                    window.focus();
                    if (typeof window.roistatOnlineChatToggle === 'function') {
                        window.roistatOnlineChatToggle();
                    }

                    if (typeof window.roistatToggleMultiwidgetState === 'function') {
                        window.roistatToggleMultiwidgetState();
                    }

                    togglePulsatorState(pulsator);
                }

                var sendResizeDataToIframe = function () {
                    var data = {
                        message: ROISTAT_CHAT_PAGE_RESIZED,
                        detail: {
                            isMobile: isMobileOrTabletWindowWidth(),
                        }
                    };

                    onlineChatIframe.contentWindow.postMessage(data, onlineChatIframe.src);
                };

                var sendResizedFullScreenDataToIframe = function (onlineChatIframeStyles) {
                    var data = {
                        message: IFRAME_RESIZE,
                        isFullScreen: isOnlineChatIframeOnFullScreen,
                        iframeStyles: onlineChatIframeStyles,
                    };

                    onlineChatIframe.contentWindow.postMessage(data, onlineChatIframe.src);
                };

                var setRoistatChatCookie = function (chatId) {
                    var cookieConfig = { expires: ROISTAT_CHAT_COOKIES_EXPIRE_TIME, path: '/' };
                    if (COOKIE_CONFIG.domain) {
                        cookieConfig.domain = COOKIE_CONFIG.domain;
                    }
                    roistatClearCookie(ROISTAT_CHAT_COOKIE, { path: '/' });
                    roistatSetCookie(ROISTAT_CHAT_COOKIE, chatId, cookieConfig);
                };

                var bindGlobalEvents = function() {
                    _addEventListener(window, 'message', function handleIframePostMessages(e){
                        var message = typeof e.data === 'string' ? e.data : e.data.message;
                        var detail = typeof e.data !== 'string' ? e.data.detail : {};

                        switch (message) {
                            case IFRAME_CHAT_SUCCESSFULLY_LOADED:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                appendPulsator();
                                window.setRoistatOnlineChatCustomParams = setCustomParams;
                                setCustomParams(onlineChatParams);
                                if (typeof window.onRoistatOnlineChatInited === 'function') {
                                    window.onRoistatOnlineChatInited();
                                }
                                break;
                            case IFRAME_MODULE_CREATED:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                isIframeModuleCreated = true;
                                sendInitDataToIframe();

                                if (isChatWaitingForOpen) {
                                    isChatWaitingForOpen = false;
                                    if (_isNodeElement(onlineChatIframeHolder)) {
                                        onlineChatIframeHolder.classList.remove(IFRAME_HOLDER_HIDDEN_CLASS);
                                        sendOpenedDataToIframe();
                                    }
                                }
                                break;
                            case IFRAME_CHAT_INIT:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                debugOnlineChat('saving chat id = ' + detail.chatId);
                                setRoistatChatCookie(detail.chatId);
                                break;
                            case IFRAME_CHAT_INIT_WITH_TEXT:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                debugOnlineChat('saving chat with text id = ' + detail.chatId);
                                if (window.onRoistatChatInit !== undefined && typeof window.onRoistatChatInit === 'function') {
                                    window.onRoistatChatInit(detail.chatId);
                                }
                                setRoistatChatCookie(detail.chatId);
                                window.roistatOnlineChatShow();
                                break;
                            case IFRAME_CHAT_OPEN:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                debugOnlineChat('saving chat id by open chat = ' + detail.chatId);
                                setRoistatChatCookie(detail.chatId);
                                window.roistatOnlineChatShow();
                                break;
                            case IFRAME_CHAT_CLOSE:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                closeIframeChat();
                                break;
                            case IFRAME_INVITE_MESSAGE:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                debugOnlineChat('rendering invite message');
                                handleGetInviteMessage(detail.message);
                                break;
                            case IFRAME_DELIVERED_MESSAGES:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                debugOnlineChat('get delivered messages');
                                handleGetDeliveredMessages(detail.messages);
                                break;
                            case IFRAME_RESIZE:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                isOnlineChatIframeOnFullScreen = e.data.isFullScreen;
                                if (isMobileOrTabletWindowWidth()) {
                                    sendResizedFullScreenDataToIframe({});
                                    return;
                                }

                                Object.assign(onlineChatIframeStyles, {
                                    width: onlineChatIframe.getBoundingClientRect().width,
                                    height: onlineChatIframe.getBoundingClientRect().height,
                                    borderRadius: window.getComputedStyle(onlineChatIframe).borderRadius,
                                });

                                onlineChatIframe.classList.toggle(IFRAME_FULL_SCREEN_CLASS, isOnlineChatIframeOnFullScreen);
                                onlineChatIframe.style.transition = 'unset';

                                if (isOnlineChatIframeOnFullScreen) {
                                     Object.assign(onlineChatIframeStyles, {
                                         top: onlineChatIframeHolder.style.top,
                                         right: onlineChatIframeHolder.style.right,
                                         bottom: onlineChatIframeHolder.style.bottom,
                                         left: onlineChatIframeHolder.style.left,
                                    });

                                    onlineChatIframeHolder.style.top = 0;
                                    onlineChatIframeHolder.style.right = 0;
                                    onlineChatIframeHolder.style.bottom = 0;
                                    onlineChatIframeHolder.style.left = 0;
                                    onlineChatIframeHolder.style.transition = 'unset';
                                } else {
                                    onlineChatIframeHolder.style.top = onlineChatIframeStyles.top;
                                    onlineChatIframeHolder.style.right = onlineChatIframeStyles.right;
                                    onlineChatIframeHolder.style.bottom = onlineChatIframeStyles.bottom;
                                    onlineChatIframeHolder.style.left = onlineChatIframeStyles.left;
                                    onlineChatIframeStyles = {};
                                    setTimeout(function() {
                                        onlineChatIframe.style.transition = 'height 0.5s ease-in';
                                        onlineChatIframeHolder.style.transition = 'all 0.3s';
                                    }, 30);
                                }

                                sendResizedFullScreenDataToIframe(onlineChatIframeStyles);
                                break;
                            case IFRAME_SEND_LEAD_MESSAGE:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                debugOnlineChat('sending lead');
                                handleIframeSendLeadMessage(detail.leadData);
                        }
                    });
                };

                var getNotificationsHolder = function() {
                    var notificationsCustomHolderSelector = window.roistat.onlineChat.notificationsCustomHolderSelector;
                    var hasNotificationsCustomHolder = notificationsCustomHolderSelector !== null;

                    return document.querySelector(hasNotificationsCustomHolder ? notificationsCustomHolderSelector : PULSATOR_HOLDER_SELECTOR);
                };

                var handleIframeSendLeadMessage = function(leadData) {
                    window.roistatGoal.reach(leadData, function() {
                        onlineChatIframe.contentWindow.postMessage(LEAD_SUCCESSFULLY_SENT, onlineChatIframe.src);
                    });
                }

                var handleGetInviteMessage = function(message) {
                    if (isOnlineChatOpened()) {
                        return;
                    }

                    var html = "<div class='roistat-online-chat-message'>" +
                        "<img src='" + message.operator.avatar + "' class='roistat-online-chat-message-avatar'></img>" +
                        "<div class='roistat-online-chat-message-content'>" +
                        "<div class='roistat-online-chat-message-name'>" +
                        "<span class='roistat-online-chat-message-name-text'>" + message.operator.name + "</span>" +
                        "<div class='roistat-online-chat-message-name-online-status'></div>" +
                        "</div>" +
                        "<div class='roistat-online-chat-message-text'>" + message.text + "</div>" +
                        "</div>" +
                        "<div class='roistat-online-chat-message-close'>х</div>" +
                        "</div>";
                    var tempElm = document.createElement('div');
                    tempElm.innerHTML = html;

                    var pulsatorHolder = getNotificationsHolder();

                    if (_isNodeElement(pulsatorHolder)) {
                        var appendingPosition = isIframeFixedToTop() ? 'beforeend' : 'afterbegin';
                        pulsatorHolder.insertAdjacentHTML(appendingPosition, html);

                        var allCloseIcons = pulsatorHolder.getElementsByClassName('roistat-online-chat-message-close')
                        var allMessagesPopup = pulsatorHolder.getElementsByClassName('roistat-online-chat-message');
                        var lastCloseIcon = allCloseIcons[isIframeFixedToTop() ? allCloseIcons.length - 1 : 0];
                        var lastMessagePopup = allMessagesPopup[isIframeFixedToTop() ? allCloseIcons.length - 1 : 0];
                    }

                    setTimeout(function() {
                        lastMessagePopup.remove();
                    }, 15000);

                    _addEvent(lastMessagePopup, 'click', function(e) {
                        e.stopPropagation();

                        if (!isOnlineChatOpened()) {
                            toggleChatWindowVisibility();
                        }

                        removeAllNotifyPopups();
                    });

                    _addEvent(lastCloseIcon, 'click', function(e) {
                        e.stopPropagation();

                        lastMessagePopup.remove();
                    });
                };

                var handleGetDeliveredMessages = function (messages) {
                    var pulsatorHolder = getNotificationsHolder();
                    if (_isNodeElement(pulsatorHolder)) {
                        var onlineChatPulsatorCircle = pulsatorHolder.querySelector(PULSATOR_CIRCLE_CLASSNAME_SELECTOR);
                        var previousNotificationElement = pulsatorHolder.querySelector(PULSATOR_NOTIFICATION_SELECTOR);

                        var isNotificationsOverLimit = messages > MAX_NOTIFICATION_LIMIT;
                        var displayedMessages = isNotificationsOverLimit ? MAX_NOTIFICATION_LIMIT + '+' : messages;

                        if (previousNotificationElement && !messages) {
                            previousNotificationElement.remove();
                            return;
                        }

                        if (previousNotificationElement) {
                            previousNotificationElement.textContent = displayedMessages;
                            previousNotificationElement.classList.toggle(NOTIFICATIONS_LIMIT_CLASSNAME, isNotificationsOverLimit);
                            return;
                        }

                        if (messages) {
                            var notificationLimitClass = isNotificationsOverLimit ? NOTIFICATIONS_LIMIT_CLASSNAME : ''
                            var notificationHtml = '<div class="' + PULSATOR_NOTIFICATION + notificationLimitClass + '">' + displayedMessages + '</div>';

                            onlineChatPulsatorCircle.insertAdjacentHTML('beforebegin', notificationHtml);
                        }
                    }
                };

                var removeAllNotifyPopups = function () {
                    var pulsatorHolder = getNotificationsHolder();
                    if (_isNodeElement(pulsatorHolder)) {
                        var allMessagesPopup = pulsatorHolder.getElementsByClassName('roistat-online-chat-message');

                        while (allMessagesPopup.length > 0) {
                            allMessagesPopup[0].remove();
                        }
                    }
                };

                var bindIframeEvents = function() {
                    onlineChatIframe = document.getElementById(IFRAME_ID);

                    if (_isNodeElement(onlineChatIframe)) {
                        _addEvent(onlineChatIframe, 'load', function () {
                            initChatWindow();
                        });
                    }

                    _addEvent(document, 'click', function(e) {
                        var customTriggerSelector = window.roistat.onlineChat.customTriggerSelector;

                        if (isNeedRenderMultiwidget()) {
                            var multiwidgetPulsatorTrigger = _getSafeFirstElementByClassName(document, MLTIWIDGET_PULSATOR_TRIGGER_CLASS);
                            var multiwidgetOnlineChatItem = _getSafeFirstElementByClassName(document, MLTIWIDGET_ONLINE_CHAT_ITEM_CLASS);
                            var needChangeMultiwidgetPulsatorState = isOnlineChatOpened()
                                && e.target !== multiwidgetOnlineChatItem
                                && !multiwidgetOnlineChatItem.contains(e.target);

                            if (needChangeMultiwidgetPulsatorState) {
                                toggleElementClass(multiwidgetPulsatorTrigger, 'opened', false);
                            }
                        } else {
                            var onlineChatPulsatorTrigger = _getSafeFirstElementByClassName(document, IFRAME_HOLDER_CLASS);
                            var needChangeOnlineChatPulsatorState = isOnlineChatOpened()
                                && e.target !== onlineChatPulsatorTrigger
                                && !onlineChatPulsatorTrigger.contains(e.target);

                            if (needChangeOnlineChatPulsatorState) {
                                toggleElementClass(onlineChatPulsatorTrigger, 'opened', false);
                            }
                        }

                        if (isOnlineChatOpened() &&
                            (e.target.closest(MULTIWIDGET_ITEMS_SELECTOR) === null
                                && e.target.closest(ONLINE_CHAT_SELECTOR) === null
                                && e.target.closest(ONLINE_CHAT_PULSATOR_SELECTOR) === null
                                && (customTriggerSelector ? e.target.closest(customTriggerSelector) === null : true))) {
                            toggleChatWindowVisibility();
                        }
                    });
                };

                var handleStartSettingIframePosition = function(e) {
                    var currentIframeXPosition = onlineChatIframeHolder.getBoundingClientRect().x;
                    var currentIframeYPosition = onlineChatIframeHolder.getBoundingClientRect().y;

                    isSettingPosition = true;
                    setMouseTrackActive();

                    initingCursorXPosition = e.pageX - currentIframeXPosition;

                    if (isIframeFixedToTop()) {
                        initingCursorYPosition = e.pageY + currentIframeYPosition;
                    } else {
                        initingCursorYPosition = e.pageY - currentIframeYPosition;
                    }
                };

                var handleEndSettingIframePosition = function() {
                    isSettingPosition = false;

                    setMouseTrackDisabled();
                    saveCustomIframePosition();
                };

                var setMouseTrackActive = function() {
                    if (_isNodeElement(onlineChatMouseTrack)) {
                        onlineChatMouseTrack.classList.add(ONLINE_CHAT_MOUSE_TRACK_CLASS_ACTIVE);
                    }
                };

                var setMouseTrackDisabled = function() {
                    if (_isNodeElement(onlineChatMouseTrack)) {
                        onlineChatMouseTrack.classList.remove(ONLINE_CHAT_MOUSE_TRACK_CLASS_ACTIVE);
                    }
                };

                var handleSettingIframePosition = function(e) {
                    if (isSettingPosition && _isNodeElement(onlineChatIframeHolder)) {
                        var iframeRect = onlineChatIframeHolder.getBoundingClientRect();
                        var iframeWidth = iframeRect.width;
                        var IFRAME_MIN_HEIGHT = 400;
                        var HORIZONTAL_IFRAME_OFFSET = 50;

                        var newIframeVerticalTargetPosition = 0;
                        var yDownLimiter = window.innerHeight - IFRAME_MIN_HEIGHT;
                        var newIframeLeft = e.pageX - initingCursorXPosition;
                        var XLeftLimiter = HORIZONTAL_IFRAME_OFFSET;
                        var XRightLimiter = window.innerWidth - HORIZONTAL_IFRAME_OFFSET - iframeWidth;

                        if (isIframeFixedToTop()) {
                            newIframeVerticalTargetPosition = window.innerHeight - (e.pageY + iframeRect.y) - 20;
                        } else {
                            newIframeVerticalTargetPosition = e.pageY - initingCursorYPosition;
                        }

                        var pulsatorPosition = getMultiwidgetPulsatorPosition();
                        var yStyleTarget = pulsatorPosition === 'bottomLeft' || pulsatorPosition === 'bottomRight'
                            ? 'top' : 'bottom';

                        if (newIframeLeft >= XLeftLimiter && newIframeLeft <= XRightLimiter) {
                            onlineChatIframeHolder.style.left = newIframeLeft + 'px';

                            if (!ifIframeFixedToLeft()) {
                                onlineChatIframeHolder.style.right = 'unset';
                            }
                        }

                        if (newIframeVerticalTargetPosition >= 50 && newIframeVerticalTargetPosition <= yDownLimiter) {
                            onlineChatIframeHolder.style[yStyleTarget] = newIframeVerticalTargetPosition + 'px';
                        }
                    }
                };

                var saveCustomIframePosition = function() {
                    var args = {
                        position: getMultiwidgetPulsatorPosition(),
                        top: onlineChatIframeHolder.style.top,
                        left: onlineChatIframeHolder.style.left,
                        bottom: onlineChatIframeHolder.style.bottom,
                        right: onlineChatIframeHolder.style.right
                    };

                    storage.setObject(ROISTAT_CHAT_CUSTOM_POSITION, args);
                };

                var getMultiwidgetPulsatorPosition = function() {
                    var multiwidgetPulsatorSettings = storage.getObject(MULTIWIDGET_PULSATOR_SETTINGS);
                    var needUsePredefinedPosition = multiwidgetPulsatorSettings !== null
                        && typeof multiwidgetPulsatorSettings.position === 'string'
                        && multiwidgetPulsatorSettings.position !== '';

                    return needUsePredefinedPosition ? multiwidgetPulsatorSettings.position : 'bottomRight';
                };

                var isIframeFixedToTop = function() {
                    var pulsatorPosition = getMultiwidgetPulsatorPosition();

                    return pulsatorPosition === 'topLeft' || pulsatorPosition === 'topRight';
                };

                var ifIframeFixedToLeft = function() {
                    var pulsatorPosition = getMultiwidgetPulsatorPosition();

                    return pulsatorPosition === 'topLeft' || pulsatorPosition === 'bottomLeft';
                };

                var setSpacerSize = function(spacerInitialSize) {
                    var spacerSize = Math.max(spacerInitialSize * getPulsatorScaleValue(), spacerInitialSize) + 'px';
                    onlineChatIframeSpacer.style.height = spacerSize;
                    onlineChatIframeSpacer.style.marginBottom = '-' + spacerInitialSize + 'px';
                };

                var setIframePosition = function() {
                    var position = getMultiwidgetPulsatorPosition();
                    var predefinedCustomPosition = window.roistat.onlineChat.customPosition;
                    var iframePositionByLabel = getIframePositionByLabel();

                    var topPosition = predefinedCustomPosition && predefinedCustomPosition.top !== null ?
                        predefinedCustomPosition.top : iframePositionByLabel[position].top;
                    var rightPosition = predefinedCustomPosition && predefinedCustomPosition.right !== null ?
                        predefinedCustomPosition.right : iframePositionByLabel[position].right;
                    var bottomPosition = predefinedCustomPosition && predefinedCustomPosition.bottom !== null ?
                        predefinedCustomPosition.bottom : iframePositionByLabel[position].bottom;
                    var leftPosition = predefinedCustomPosition && predefinedCustomPosition.left !== null ?
                        predefinedCustomPosition.left : iframePositionByLabel[position].left;

                    onlineChatIframeHolder = _getSafeFirstElementByClassName(onlineChat, IFRAME_HOLDER_WRAPPER_CLASS);

                    if (_isNodeElement(onlineChatIframeHolder)) {
                        onlineChatIframeHolder.classList.add(IFRAME_HOLDER_HIDDEN_CLASS);
                        onlineChatIframeHolder.setAttribute('style',
                            'visibility: hidden;'
                            + 'top: ' + topPosition + ';'
                            + 'right:' + rightPosition + ';'
                            + 'bottom:' + bottomPosition + ';'
                            + 'left:' + leftPosition + ';'
                        );

                        onlineChatIframeSpacer = _getSafeFirstElementByClassName(onlineChat, ONLINE_CHAT_SPACER_CLASSNAME);
                        if (_isNodeElement(onlineChatIframeSpacer)) {
                            var spacerInitialSize = parseInt(topPosition === 'unset' ? bottomPosition : topPosition);
                            setSpacerSize(spacerInitialSize);

                            var setIframeHolderHeight = function() {
                                if (isMobileOrTabletWindowWidth()) {
                                    onlineChatIframeHolder.style.height = window.visualViewport.height + 'px';
                                } else {
                                    onlineChatIframeHolder.style.height = 'unset';
                                }
                            }

                            setIframeHolderHeight();

                            window.addEventListener('resize', function handleWindowResize() {
                                setSpacerSize(spacerInitialSize);
                                setIframeHolderHeight();
                                sendResizeDataToIframe();
                            });

                            if (isVisualViewportSupported) {
                                visualViewport.addEventListener('resize', function handleViewportResize() {
                                    setSpacerSize(spacerInitialSize);
                                    setIframeHolderHeight();
                                    sendResizeDataToIframe();
                                });
                            }
                        }
                    }
                }

                var bindResizeEvents = function() {
                    var position = getMultiwidgetPulsatorPosition();
                    var setIframePosition = function() {
                        if (_isNodeElement(onlineChatIframeHolder) && !isOnlineChatIframeOnFullScreen) {
                            var iframePositionByLabel = getIframePositionByLabel();

                            onlineChatIframeHolder.style.right = iframePositionByLabel[position].right;
                            onlineChatIframeHolder.style.left = iframePositionByLabel[position].left;
                            onlineChatIframeHolder.style.top = iframePositionByLabel[position].top;
                            onlineChatIframeHolder.style.bottom = iframePositionByLabel[position].bottom;
                        }
                    }

                    window.addEventListener('resize', function handleWindowResize() {
                        setIframePosition();
                    });

                    if (isVisualViewportSupported) {
                        visualViewport.addEventListener('resize', function handleViewportResize() {
                            setIframePosition();
                        });
                    }
                }

                var setMouseTrackStyles = function() {
                    if (_isNodeElement(onlineChatMouseTrack)) {
                        var position = getMultiwidgetPulsatorPosition();

                        onlineChatMouseTrack.setAttribute('style',
                            'top: ' + IFRAME_MOUSE_TRACK_POSITION_BY_LABEL[position].top + ';'
                            + 'bottom:' + IFRAME_MOUSE_TRACK_POSITION_BY_LABEL[position].bottom + ';'
                            + 'height:' + IFRAME_MOUSE_TRACK_POSITION_BY_LABEL[position].height + ';'
                        );
                    }
                };

                var setPulsatorPosition = function() {
                    if (_isNodeElement(pulsator)) {
                        var pulsatorPosition = getMultiwidgetPulsatorPosition();

                        pulsator.setAttribute('style',
                            'top: ' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].top + ';'
                            + 'right:' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].right + ';'
                            + 'bottom:' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].bottom + ';'
                            + 'left:' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].left + ';'
                        );
                    }
                }

                var appendChatWindow = function() {
                    if (document.body === null) {
                        return;
                    }

                    debugOnlineChat('iframe appending to page');

                    var onlineChatIframe = Base64.decode(storage.get(ONLINE_CHAT_IFRAME_TEMPLATE));

                    onlineChat = document.createElement('div');
                    onlineChat.innerHTML = onlineChatIframe;

                    document.body.appendChild(onlineChat);
                    onlineChatMouseTrack = _getSafeFirstElementByClassName(document, ONLINE_CHAT_MOUSE_TRACK_CLASS);

                    setIframePosition();
                    bindResizeEvents();
                    bindIframeEvents();
                };

                var fillPulsator = function() {
                    var pulsatorSettings = storage.getObject(MULTIWIDGET_PULSATOR_SETTINGS);
                    debugOnlineChat('start filling pulsator');

                    if (pulsatorSettings) {
                        if (_isNodeElement(onlineChatPulsatorFill)) {
                            onlineChatPulsatorFill.setAttribute('style', 'background: ' + pulsatorSettings.button_color + ';');
                        }

                        if (_isNodeElement(onlineChatPulsatorIcon)) {
                            onlineChatPulsatorIcon.setAttribute('style', 'fill: ' + pulsatorSettings.icon_color + ';');
                        }

                        if (HTMLCollection.prototype.isPrototypeOf(onlineChatPulsatorFillSvg)) {
                            for (var i = 0; i < onlineChatPulsatorFillSvg.length; i++) {
                                onlineChatPulsatorFillSvg[i].setAttribute('style', 'fill: ' + pulsatorSettings.button_color + ';');
                            }
                        }
                    }
                }

                var appendPulsator = function() {
                    if (document.body === null) {
                        return;
                    }

                    var onlineChatPulsatorTemplate     = Base64.decode(storage.get(ONLINE_CHAT_PULSATOR_TEMPLATE));
                    var isRoistatOnlineChatOnly        = !isTestRoistatMultiWidgetOnlyMode() && window.roistatOnlineChatOnly;
                    var isNeedRenderOnlineChatPulsator = (onlineChatPulsatorTemplate && !isNeedRenderMultiwidget() && isNeedToShowOnlineChat()) || isRoistatOnlineChatOnly;

                    if (isNeedRenderOnlineChatPulsator) {
                        debugOnlineChat('pulsator appending to page');

                        var tempPulsatorHolder = document.createElement('div');

                        tempPulsatorHolder.innerHTML = onlineChatPulsatorTemplate;
                        pulsator = tempPulsatorHolder.childNodes.item(0);

                        if (!window.roistat.multiwidget.isVisible) {
                            debugOnlineChat('Hide widget');
                            pulsator.className = pulsator.className + ' ' + PULSATOR_HOLDER_HIDDEN_CLASS;
                        }

                        onlineChatPulsatorFill = _getSafeFirstElementByClassName(pulsator, PULSATOR_FILL_CLASSNAME);
                        onlineChatPulsatorIcon = _getSafeFirstElementByClassName(pulsator, PULSATOR_ICON_CLASSNAME);
                        onlineChatPulsatorPhone = _getSafeFirstElementByClassName(pulsator, PULSATOR_PHONE_CLASSNAME);
                        onlineChatPulsatorFillSvg = document.getElementsByClassName(PULSATOR_ICON_FILL_CLASSNAME);

                        document.body.appendChild(pulsator);

                        setPulsatorPosition();
                        addPulsatorEvents();
                        fillPulsator();
                    }
                };

                var addPulsatorEvents = function() {
                    if (_isNodeElement(pulsator)) {
                        _addEvent(pulsator, 'click', function () {
                            toggleChatWindowVisibility();
                            togglePulsatorState(pulsator);
                        });
                    }
                };

                function togglePulsatorState(pulsator) {
                    if (_isNodeElement(pulsator)) {
                        pulsator.classList.toggle('opened');
                    }
                }

                var isOnlineChatOpened = function() {
                    return _isNodeElement(onlineChatIframeHolder) && !onlineChatIframeHolder.classList.contains(IFRAME_HOLDER_HIDDEN_CLASS);
                };

                function removeThemeColorMetaTag() {
                    var themeColorMetaTag = document.querySelector('#roistat-theme-color');

                    if (_isNodeElement(themeColorMetaTag)) {
                        themeColorMetaTag.remove();
                    }
                }

                function addThemeColorMetaTag() {
                    var themeColorMetaTag = document.createElement('meta');

                    if (_isNodeElement(themeColorMetaTag)) {
                        themeColorMetaTag.setAttribute('name', 'theme-color');
                        themeColorMetaTag.setAttribute('content', '#2589FF');
                        themeColorMetaTag.setAttribute('id', 'roistat-theme-color');
                        document.head.prepend(themeColorMetaTag);
                    }
                }

                var toggleMetaTags = function() {
                    if (!isOnlineChatOpened()) {
                        removeThemeColorMetaTag();
                        resetInitialViewportContent();
                        return;
                    }

                    var hasThemeMetaTag = Boolean(document.querySelector('#roistat-theme-color'));

                    if (isMobile.Android() || isMobile.iOS()) {
                        setIframeViewportContent();

                        if (!hasThemeMetaTag) {
                            addThemeColorMetaTag();
                        }
                    }
                }

                var setIframeViewportContent = function () {
                    var viewportMetaTag = document.querySelector('meta[name="viewport"]');

                    if (!_isNodeElement(viewportMetaTag)) {
                        viewportMetaTag = document.createElement('meta');
                        viewportMetaTag.setAttribute('name', 'viewport');
                        document.head.appendChild(viewportMetaTag);
                    }

                    viewportMetaTag.setAttribute('content', IFRAME_VIEWPORT_CONTENT);
                }

                function resetInitialViewportContent() {
                    var viewportMetaTag = document.querySelector('meta[name="viewport"]');

                    if (_isNodeElement(viewportMetaTag) && INITAL_VIEWPORT_META_TAG !== null) {
                        viewportMetaTag.setAttribute('content', INITAL_VIEWPORT_META_TAG);
                        return;
                    }

                    if (_isNodeElement(viewportMetaTag)) {
                        viewportMetaTag.remove();
                    }
                }

                var toggleChatWindowVisibility = function() {
                    setTimeout(function() {
                        isSettingPosition = false;
                    }, 3000);

                    if (_isNodeElement(onlineChatIframeHolder)) {
                        onlineChatIframeHolder.classList.toggle(IFRAME_HOLDER_HIDDEN_CLASS);

                        toggleMetaTags();
                    }

                    if (isOnlineChatOpened()) {
                        removeAllNotifyPopups();
                    }

                    sendOpenedDataToIframe();
                };

                var togglePulsatorVisibility = function() {
                    var pulsatorHolder = getNotificationsHolder();
                    if (_isNodeElement(pulsatorHolder)) {
                        pulsatorHolder.classList.toggle(PULSATOR_HOLDER_HIDDEN_CLASS);
                    }
                };

                var translateOnlineChatFormToLanguage = function(lang) {
                    onlineChatLanguage = lang;

                    if (!_isNodeElement(onlineChatIframe)) {
                        return;
                    }

                    sendIframeTranslateMessage();
                }

                var initChatWithMessage = function(text) {
                    if (!_isNodeElement(onlineChatIframe)) {
                        return;
                    }

                    sendIframeChatInitWithTextMessage(text);
                }

                var openChat = function(chatId) {
                    if (!_isNodeElement(onlineChatIframe)) {
                        return;
                    }

                    sendIframeChatOpensMessage(chatId);
                }

                function hideElementOption(element) {
                    if (_isNodeElement(element)) {
                        element.classList.add(MLTIWIDGET_PULSATOR_HIDDEN_CLASS);
                    }
                }

                var initChatWindow = function() {
                    isInited = true;
                    var onlineChatToggle = function() {
                        setTimeout(function() {
                            var pulsatorTrigger = null;
                            if (isNeedRenderMultiwidget()) {
                                pulsatorTrigger = _getSafeFirstElementByClassName(document, MLTIWIDGET_PULSATOR_TRIGGER_CLASS);
                            } else {
                                pulsatorTrigger = _getSafeFirstElementByClassName(document, IFRAME_HOLDER_CLASS);
                            }

                            if (isOnlineChatOpened()) {
                                toggleElementClass(pulsatorTrigger, 'opened', false);
                            } else {
                                toggleElementClass(pulsatorTrigger, 'opened', true);

                                var pulsatorPopup = _getSafeFirstElementByClassName(document, MLTIWIDGET_PULSATOR_POPUP_CLASS);
                                var isPopupShown = _isNodeElement(pulsatorPopup) && !pulsatorPopup.classList.contains(MLTIWIDGET_PULSATOR_HIDDEN_CLASS);
                                if (isPopupShown) {
                                    var pulsatorPopupOverlay = _getSafeFirstElementByClassName(document, MLTIWIDGET_PULSATOR_OVERLAY_CLASS);
                                    hideElementOption(pulsatorPopup);
                                    hideElementOption(pulsatorPopupOverlay);
                                }
                            }

                            toggleChatWindowVisibility();
                        }, 0);
                    };
                    window.roistatOnlineChatShow = onlineChatToggle;
                    window.roistatOnlineChatToggle = onlineChatToggle;
                    window.roistatMultiwidgetShow = togglePulsatorVisibility;
                    debugOnlineChat('chat window initialized');
                };

                function setCustomParams(params) {
                    setOnlineChatCustomParams(params);
                    sendUpdateParamsMessage();
                }

                function setAutoOpenChat() {
                    var onlineChatSettings = storage.getObject(ONLINE_CHAT_SETTINGS);

                    if (
                        typeof onlineChatSettings !== 'object'
                        || onlineChatSettings === null
                        || typeof onlineChatSettings.auto_open_chat !== 'object'
                        || !onlineChatSettings.auto_open_chat.is_enabled
                    ) {
                        return;
                    }

                    setTimeout(function() {
                        if (!isIframeModuleCreated) {
                            isChatWaitingForOpen = true;
                            return;
                        }

                        if (_isNodeElement(onlineChatIframeHolder)) {
                            onlineChatIframeHolder.classList.remove(IFRAME_HOLDER_HIDDEN_CLASS);
                            sendOpenedDataToIframe();
                        }
                    }, onlineChatSettings.auto_open_chat.delay_in_seconds * 1000);
                }

                function init() {
                    requireCss();
                    documentReadyCallback(function() {
                        appendChatWindow();
                        bindGlobalEvents();
                        setAutoOpenChat();
                    });
                }

                window.roistat.onlineChat.actions.initWithMessage = initChatWithMessage;
                window.roistat.onlineChat.actions.openChat        = openChat;

                window.roistat.onlineChat.localization.translateToRussian = function() { translateOnlineChatFormToLanguage(RU_LANGUAGE_KEY) };
                window.roistat.onlineChat.localization.translateToEnglish = function() { translateOnlineChatFormToLanguage(EN_LANGUAGE_KEY) };

                window.roistat.onlineChat.localization.translate = function(language) {
                    var isRuLang = DEFAULT_LANGUAGES_TITLE_VARIATIONS[RU_LANGUAGE_KEY].includes(language),
                        isEnLang = DEFAULT_LANGUAGES_TITLE_VARIATIONS[EN_LANGUAGE_KEY].includes(language),
                        languageForTranslation = language;

                    if (isRuLang) {
                        languageForTranslation = RU_LANGUAGE_KEY
                    }

                    if (isEnLang) {
                        languageForTranslation = EN_LANGUAGE_KEY
                    }

                    translateOnlineChatFormToLanguage(languageForTranslation)
                };

                addVisitProcessedCallback(init);
            }
        };

        function debugWidgets(debugString) {
            debug('Widgets: ' + debugString);
        }

        function isCorrectTemplate(template) {
            return template !== EMPTY_FLAG;
        }

        function setOnlineChatCustomParams(params) {
            var keys = Object.keys(params);

            for (var i = 0; i < keys.length; i++) {
                onlineChatParams[keys[i]] = params[keys[i]];
            }
        }

        function isNeedRenderMultiwidget() {
            var isLeadHunterEnabled          = Number(storage.get(LEAD_HUNTER_ENABLED)),
                isNeedToShowLeadHunterOption = isLeadHunterEnabled && isLeadHunterPulsatorEnabled && isLeadHunterPulsatorShownAtThisPage,
                isMultiwidgetEnabled         = Number(storage.get(MULTIWIDGETS_ENABLED)),
                isOnlineChatEnabled          = isNeedToShowOnlineChat(),
                isVKEnabled                  = Number(storage.get(MULTIWIDGET_VK_ENABLED)),
                isFBEnabled                  = Number(storage.get(MULTIWIDGET_FB_ENABLED)),
                isTelegramEnabled            = Number(storage.get(MULTIWIDGET_TELEGRAM_ENABLED)),
                isWhatsAppEnabled            = Number(storage.get(MULTIWIDGET_WHATS_APP_ENABLED)),
                isViberEnabled               = Number(storage.get(MULTIWIDGET_VIBER_ENABLED)),
                isAnyOptionEnabled           = isNeedToShowLeadHunterOption || isOnlineChatEnabled || isVKEnabled || isFBEnabled || isTelegramEnabled || isWhatsAppEnabled || isViberEnabled,
                isOnlyLeadHunterEnabled      = isNeedToShowLeadHunterOption && !isOnlineChatEnabled && !isVKEnabled && !isFBEnabled && !isTelegramEnabled && !isWhatsAppEnabled && !isViberEnabled,
                isOnlyOnlineChatEnabled      = isOnlineChatEnabled && !isNeedToShowLeadHunterOption && !isVKEnabled && !isFBEnabled && !isTelegramEnabled && !isWhatsAppEnabled && !isViberEnabled,
                isRoistatOnlineChatOnly      = !isTestRoistatMultiWidgetOnlyMode() && window.roistatOnlineChatOnly,
                isRoistatProject             = isTestRoistatMultiWidgetOnlyMode() && isCurrentProjectIsRoistat();

            debug('Is online chat only: ' + isRoistatOnlineChatOnly);
            debug('Is rp: ' + isRoistatOnlineChatOnly);

            return isMultiwidgetEnabled
                && isAnyOptionEnabled
                && !isOnlyOnlineChatEnabled
                && !isOnlyLeadHunterEnabled
                && !isRoistatOnlineChatOnly
                && !isRoistatProject;
        }

        function isNeedToShowOnlineChat() {
            var isOnlineChatEnabled = Number(storage.get(ONLINE_CHAT_ENABLED));

            if (!isOnlineChatEnabled) {
                debug('OnlineChat: Online chat is disabled');
                return false;
            }

            var onlineChatSettings = storage.getObject(ONLINE_CHAT_SETTINGS);

            if (onlineChatSettings === null) {
                return false;
            }

            if (!onlineChatSettings.is_available_for_current_user_agent) {
                debug('OnlineChat: Current device group is disabled');
                return false;
            }

            if (!onlineChatSettings.pages_filter.is_enabled) {
                debug('OnlineChat: Pages filter is disabled')
                return true;
            }

            return isPageEnabled(onlineChatSettings.pages_filter.pages.join(','));
        }

        function roistatHideMultiwidgetLeadHunterOption() {
            debugWidgets('Multiwidget disabled. Hide leadhunter pulsator from module');
        }

        function saveLeadHunterTemplates(formTemplate, pulsatorTemplate, pulsatorSettings) {
            storage.setLocal(LEAD_HUNTER_FORM_TEMPLATE, Base64.encode(formTemplate));
            storage.setLocal(LEAD_HUNTER_PULSATOR_TEMPLATE, Base64.encode(pulsatorTemplate));
            storage.setObject(LEAD_HUNTER_PULSATOR_SETTINGS, pulsatorSettings);
        }

        function saveMultiwidgetTemplates(pulsatorTemplate, pulsatorSettings) {
            storage.setLocal(MULTIWIDGET_PULSATOR_TEMPLATE, Base64.encode(pulsatorTemplate));
            storage.setObject(MULTIWIDGET_PULSATOR_SETTINGS, pulsatorSettings);
        }

        function saveOnlineChatTemplates(pulsatorTemplate, iframeTemplate, isOnlineChatEnabled) {
            storage.setLocal(ONLINE_CHAT_PULSATOR_TEMPLATE, Base64.encode(pulsatorTemplate));
            storage.setLocal(ONLINE_CHAT_IFRAME_TEMPLATE, Base64.encode(iframeTemplate));
            storage.set(ONLINE_CHAT_ENABLED, isOnlineChatEnabled);
        }

        function initLeadHunter(formTemplate, pulsatorTemplate, pulsatorSettings) {
            saveLeadHunterTemplates(formTemplate, pulsatorTemplate, pulsatorSettings);
            storage.setLocal(MULTIWIDGET_PULSATOR_TEMPLATE, Base64.encode(EMPTY_FLAG));
            storage.setLocal(ONLINE_CHAT_IFRAME_TEMPLATE, Base64.encode(EMPTY_FLAG));

            hasMultiwidgetFocusGroup = false;

            availableWidgets.leadHunter();
        }

        function initMultiWidgets(leadHunterSettings, multiwidgetSettings, onlineChatSettings) {
            var leadHunterFormTemplate      = leadHunterSettings.form_template,
                leadHunterPulsatorTemplate  = leadHunterSettings.pulsator_template,
                leadHunterPulsatorSettings  = leadHunterSettings.pulsator_settings;

            if (isCurrentProjectIsRoistat()) {
                initLeadHunter(leadHunterFormTemplate, leadHunterPulsatorTemplate, leadHunterPulsatorSettings);

                return;
            }

            debugWidgets('start initing widgets');
            var onlineChatPulsatorTemplate  = onlineChatSettings.pulsator_template,
                onlineChatIframeTemplate    = onlineChatSettings.iframe_template,
                multiwidgetPulsatorTemplate = multiwidgetSettings.pulsator_template,
                multiwidgetPulsatorSettings = multiwidgetSettings.pulsator_settings,
                isLeadHunterEnabled         = Number(storage.get(LEAD_HUNTER_ENABLED)),
                isOnlineChatEnabled         = Number(onlineChatSettings.settings.is_enabled),
                hasLeadHunterTargetPagesMap = storage.getObject(LEAD_HUNTER_TARGET_PAGES_MAP) !== null;

            saveLeadHunterTemplates(leadHunterFormTemplate, leadHunterPulsatorTemplate, leadHunterPulsatorSettings);
            saveMultiwidgetTemplates(multiwidgetPulsatorTemplate, multiwidgetPulsatorSettings);
            saveOnlineChatTemplates(onlineChatPulsatorTemplate, onlineChatIframeTemplate, isOnlineChatEnabled);

            if (hasLeadHunterTargetPagesMap) {
                storage.setLocal(LEAD_HUNTER_FORM_TEMPLATE, Base64.encode(getLeadHunterTemplate()));
            }

            hasMultiwidgetFocusGroup = true;

            if (isLeadHunterEnabled && !isRoistatMultiWidgetOnly()) {
                debugWidgets('leadhunter enabled. Start processing');
                availableWidgets.leadHunter();
            }

            if (isNeedToShowOnlineChat()) {
                debugWidgets('online chat enabled. Start processing');
                availableWidgets.onlineChat();
            }

            if (isNeedRenderMultiwidget()) {
                debugWidgets('multiwidget enabled. Start processing');
                availableWidgets.multiwidget();
            }
        }

        var getLeadHunterTemplate = function() {
            var iframeUrl = appendMaParam(protocol() + "//"+ROISTAT_HOST+"/api/site/1.0/"+getProjectForUrl()+"/leadhunter/script/"+storage.get(LEAD_HUNTER_DEFAULT_SCRIPT_ID)+"/widget");

            return '<div class="roistat-lh-popup-wrapper" data-is-iframe="1"><iframe id="roistat-lh-popup-iframe" class="roistat-lh-popup-iframe" src="' + iframeUrl + '" frameborder="0"></iframe></div>';
        };

        function initWidgets() {
            var leadHunterFormTemplate      = storage.get(LEAD_HUNTER_FORM_TEMPLATE),
                leadHunterPulsatorTemplate  = storage.get(LEAD_HUNTER_PULSATOR_TEMPLATE),
                leadHunterPulsatorSettings  = storage.getObject(LEAD_HUNTER_PULSATOR_SETTINGS),
                isLeadHunterEnabled         = Number(storage.get(LEAD_HUNTER_ENABLED)),
                onlineChatPulsatorTemplate  = storage.get(ONLINE_CHAT_PULSATOR_TEMPLATE),
                onlineChatIframeTemplate    = storage.get(ONLINE_CHAT_IFRAME_TEMPLATE),
                onlineChatIsEnabled         = storage.get(ONLINE_CHAT_ENABLED),
                multiwidgetPulsatorTemplate = storage.get(MULTIWIDGET_PULSATOR_TEMPLATE),
                multiwidgetPulsatorSettings = storage.getObject(MULTIWIDGET_PULSATOR_SETTINGS);

            window.roistatLeadhunterForm = initLeadHunter;
            window.roistatMultiwidget = initMultiWidgets;

            if (!leadHunterFormTemplate || !leadHunterPulsatorTemplate
                || !leadHunterPulsatorSettings || !multiwidgetPulsatorTemplate
                || !multiwidgetPulsatorSettings || !onlineChatPulsatorTemplate) {
                debugWidgets('requesting data from server');

                if (isNeedRenderMultiwidget() || isNeedToShowOnlineChat() || isLeadHunterEnabled) {
                    sendApiRequestJSONP(protocol() + '//'+ROISTAT_HOST+'/api/site/'+API_VERSION_NEW+'/'+getProjectForUrl()+'/multiwidget?domain='+encodeURIComponent(document.domain));
                }
            } else {
                var decodedMultiwidgetPulsatorTemplate = Base64.decode(multiwidgetPulsatorTemplate);
                var decodedOnlineChatIframeTemplate = Base64.decode(onlineChatIframeTemplate);

                if ((!isCorrectTemplate(decodedMultiwidgetPulsatorTemplate)
                    || !isCorrectTemplate(decodedOnlineChatIframeTemplate)
                    || isCurrentProjectIsRoistat()) && !isRoistatMultiWidgetOnly()) {
                    debugWidgets('initing LeadHunter form');

                    window.roistatLeadhunterForm(Base64.decode(leadHunterFormTemplate), Base64.decode(leadHunterPulsatorTemplate), leadHunterPulsatorSettings);
                } else {
                    debugWidgets('initing multiwidget form');

                    var multiwidgetArgs = {
                            pulsator_template: decodedMultiwidgetPulsatorTemplate,
                            pulsator_settings: multiwidgetPulsatorSettings
                        },
                        leadHunterArgs = {
                            form_template: Base64.decode(leadHunterFormTemplate),
                            pulsator_template: Base64.decode(leadHunterPulsatorTemplate),
                            pulsator_settings: leadHunterPulsatorSettings
                        },
                        onlineChatArgs = {
                            iframe_template: decodedOnlineChatIframeTemplate,
                            pulsator_template: Base64.decode(onlineChatPulsatorTemplate),
                            settings: {
                                is_enabled: Number(onlineChatIsEnabled),
                            },
                        };

                    window.roistatMultiwidget(leadHunterArgs, multiwidgetArgs, onlineChatArgs);
                }
            }
        }

        function processPage() {
            initWidgets();
            debugWidgets('form initialized');
        }

        function init() {
            debugWidgets('activated');

            processPage();
        }

        addVisitProcessedCallback(init);

        window.setRoistatOnlineChatCustomParams = setOnlineChatCustomParams;
        window.roistatSaveLeadHunterTemplates   = saveLeadHunterTemplates;
        window.roistatSaveMultiwidgetTemplate   = saveMultiwidgetTemplates;
        window.roistatSaveOnlineChatTemplate    = saveOnlineChatTemplates;
    })();

    (function callTracking() {
        /**
         * @returns {String|undefined}
         */
        var getPhone = function() {
            return roistatGetCookie(ROISTAT_PHONE_COOKIE);
        };
        /**
         * @returns {String|undefined}
         */
        var getRawPhone = function() {
            return roistatGetCookie(ROISTAT_RAW_PHONE_COOKIE);
        };
        /**
         * @returns {String|undefined}
         */
        var getPhoneScriptsData = function() {
            return storage.get(ROISTAT_PHONE_SCRIPT_DATA);
        };
        /**
         * @returns {String|undefined}
         */
        var getReplacement = function() {
            return storage.get(ROISTAT_PHONE_REPLACEMENT);
        };
        /**
         * @param {String} phone
         * @returns {Boolean}
         */
        var isValidPhone = function(phone) {
            return phone != null && phone !== undefined && phone !== "";
        };
        /**
         * @returns {Array}
         */
        var getCallTrackingElements = function() {
            var result = [];
            var elements = document.getElementsByClassName(CALL_TRACKING_CLASS);
            if (elements && elements.length) {
                result = elements;
            }
            return result;
        };
        /**
         * @returns {Array}
         */
        var getCallTrackingCountryElements = function() {
            var result = [];
            var elements = document.getElementsByClassName(CALL_TRACKING_COUNTRY_CLASS);
            if (elements && elements.length) {
                result = elements;
            }
            return result;
        };
        /**
         * @returns {Array}
         */
        var getCallTrackingRegionElements = function() {
            var result = [];
            var elements = document.getElementsByClassName(CALL_TRACKING_REGION_CLASS);
            if (elements && elements.length) {
                result = elements;
            }
            return result;
        };
        /**
         * @returns {Array}
         */
        var getCallTrackingNumberElements = function() {
            var result = [];
            var elements = document.getElementsByClassName(CALL_TRACKING_NUMBER_CLASS);
            if (elements && elements.length) {
                result = elements;
            }
            return result;
        };
        /**
         * @returns {Array}
         */
        var getCallTrackingTelElements = function() {
            var result = [];
            var elements = document.getElementsByClassName(CALL_TRACKING_TEL_CLASS);
            if (elements && elements.length) {
                result = elements;
            }
            return result;
        };
        /**
         * @param {String} phone
         * @param {String} rawPhone
         * @param {Array} phoneScripts
         */
        var renderPhone = function(phone, rawPhone, phoneScripts) {

            debug('CallTracking: RenderPhone phone = ' + phone);

            /**
             * @param {string} phone
             * @returns {string}
             */

            var _filterNumericPhone = function(phone) {
                return phone.split(/[^0-9]/).join("");
            };
            /**
             * @param {HTMLElement} element
             * @param {String} phone
             * @return {String}
             */
            var _getPhoneForElement = function(element, phone) {
                var result = null;
                if (!element) {
                    return result;
                }
                var phones = phone.split(",");
                if (phones.length < 2) {
                    result = phone;
                } else {
                    var prefixBind = element.getAttribute('data-prefix');
                    if (prefixBind) {
                        for (var i = 0; i < phones.length; i++) {
                            var currentPhone = phones[i];
                            var filteredPhone = _filterNumericPhone(currentPhone);
                            if (filteredPhone.indexOf("8") === 0) {
                                filteredPhone = "7" + filteredPhone.substring(1);
                            }
                            var isValidPrefix = filteredPhone.split(prefixBind)[0] === "";
                            if (isValidPrefix) {
                                result = currentPhone;
                                break;
                            }
                        }
                    }
                    if (result === null) {
                        result = phones[0];
                    }
                    debug('CallTracking._getPhoneForElement: Prepared phone = ' + result + ' for data-prefix = ' + prefixBind);
                }
                return result;
            };

            /**
             * @param {HTMLElement} element
             * @param {String} phone
             * @param {String} rawPhone
             */
            var _renderElementHref = function(element, phone, rawPhone) {
                var formattedPhone = _getPhoneForElement(element, phone);
                var phoneForElement = rawPhone || formattedPhone;
                if (!phoneForElement || !element) {
                    return;
                }
                if (element.tagName.toLowerCase() !== 'a') {
                    return;
                }

                var href = element.getAttribute('href');
                if (inString(href, "tel:")) {
                    var normalizedPhone = rawPhone;
                    if (!normalizedPhone) {
                        normalizedPhone = _filterNumericPhone(phoneForElement);
                        if (normalizedPhone.indexOf("8") === 0) {
                            normalizedPhone = "7" + normalizedPhone.substring(1);
                        }
                    }

                    element.setAttribute('href', "tel:+" + normalizedPhone);
                    _renderElementTitle(element, formattedPhone);
                }
            };

            /**
             * @param {HTMLElement} element
             * @param {String} phone
             */
            var _renderElementTitle = function(element, phone) {
                if (!element.hasAttribute('title')) {
                    return;
                }

                element.setAttribute('title', phone);
            };

            /**
             * @param {HTMLElement} element
             * @param {String} phone
             */
            var _renderElementContent = function(element, phone) {
                var phoneForElement = _getPhoneForElement(element, phone);
                if (!phoneForElement || !element) {
                    return;
                }
                element.innerHTML = phoneForElement;
            };

            var PHONE_NUMBER_COUNTRY_REGEXP = /^\D*(\d+)(?:[(|\s])/;
            var PHONE_NUMBER_REGION_REGEXP = /\((\d+)\)|\s(\d+)\s/;
            var PHONE_NUMBER_PART_REGEXP = /(\(\d+\)|\s\d+\s)(.+)/;
            var _getPhoneNumberParts = function(element, phone) {
                var phoneForElement = _getPhoneForElement(element, phone);

                var countryCodeMatch = phoneForElement.match(PHONE_NUMBER_COUNTRY_REGEXP);
                var countryCode = isArray(countryCodeMatch) ? countryCodeMatch[1] : '';

                var regionCodeMatch = phoneForElement.match(PHONE_NUMBER_REGION_REGEXP);
                var regionCode = (isArray(regionCodeMatch) ? (regionCodeMatch[1] || regionCodeMatch[2]) : '').trim();

                var numberCodeMatch = phoneForElement.match(PHONE_NUMBER_PART_REGEXP);
                var numberCode = (isArray(numberCodeMatch) ? numberCodeMatch[2] : '').trim();

                return {
                    country: countryCode,
                    region: regionCode,
                    number: numberCode
                };
            }

            /**
             * @param {String} phone
             * @param {String} rawPhone
             */
            var _renderDefaultClasses = function(phone, rawPhone) {
                var callTrackingElements = getCallTrackingElements();
                debug("CallTracking: render phone default classes for " + callTrackingElements.length + " elements");

                arrayIterate(callTrackingElements, function(element) {
                    _renderElementContent(element, phone);
                    _renderElementHref(element, phone, rawPhone);
                });

                arrayIterate(getCallTrackingCountryElements(), function(element) {
                    var countryCode = _getPhoneNumberParts(element, phone).country;
                    _renderElementContent(element, countryCode);
                });

                arrayIterate(getCallTrackingRegionElements(), function(element) {
                    var regionCode = _getPhoneNumberParts(element, phone).region;
                    _renderElementContent(element, regionCode);
                });

                arrayIterate(getCallTrackingNumberElements(), function(element) {
                    var numberCode = _getPhoneNumberParts(element, phone).number;
                    _renderElementContent(element, numberCode);
                });

                arrayIterate(getCallTrackingTelElements(), function(element) {
                    _renderElementHref(element, phone, rawPhone);
                });
            };

            /**
             * @param {String} phone
             * @param {String} rawPhone
             * @param {Array} replacements
             */
            var _renderUserReplacements = function(phone, rawPhone, replacements) {
                if (!replacements) {
                    return;
                }
                debug("CallTracking: render phone user replacement for " + replacements.length + " replacements");

                for (var i = 0; i < replacements.length; i++) {
                    var replaceSelector = replacements[i];
                    if (!replaceSelector) {
                        continue;
                    }
                    var selectorType = replaceSelector[0];
                    replaceSelector = replaceSelector.substr(1);
                    var elements = [];
                    if (selectorType === "#") {
                        var element = document.getElementById(replaceSelector);
                        if (element !== null) {
                            elements.push(element);
                        }
                    } else {
                        elements = document.getElementsByClassName(replaceSelector);
                        _renderUserPostPrefix(replaceSelector, phone, rawPhone);
                    }
                    if (!elements || elements.length < 1) {
                        continue;
                    }

                    debug("CallTracking: render phone for " + replaceSelector + ", " + elements.length + " elements");
                    for (var j = 0; j < elements.length; j++) {
                        _renderElementContent(elements[j], phone);
                        _renderElementHref(elements[j], phone, rawPhone);
                    }
                }
            };

            /**
             * @param {array} phoneScripts
             */
            var _renderScriptReplacements = function(phoneScripts) {
                for (var i = 0; i < phoneScripts.length; i++) {
                    _renderUserReplacements(phoneScripts[i].phone, phoneScripts[i].raw_phone, phoneScripts[i].css_selectors);
                    _replaceByNumbers(phoneScripts[i].phone, phoneScripts[i].raw_phone, phoneScripts[i].replaceable_numbers);
                }
            };

            /**
             * @param {String} phone
             * @param {String} rawPhone
             * @param {Array} numbers
             */
            var _replaceByNumbers = function(phone, rawPhone, numbers) {
                if (!numbers || numbers.length === 0) {
                    return;
                }

                var _processNodes = function() {
                    var patterns = _getNumbersPatterns();
                    var allNodes = document.getElementsByTagName('*');
                    var allNodeCount = allNodes.length;

                    for (var i = 0; i < allNodeCount; i++) {
                        var node = allNodes[i];
                        _processPhoneLink(node, patterns, _getPhoneForElement(node, phone));

                        var childNodesCount = node.childNodes.length;
                        for (var j = 0; j < childNodesCount; j++) {
                            var childNode = node.childNodes[j];
                            _processTextNode(childNode, patterns, _getPhoneForElement(childNode, phone));
                        }
                    }
                };

                /**
                 * @param {HTMLElement} node
                 * @param {Array} patterns
                 * @param {String} replacementPhone
                 */
                var _processPhoneLink = function(node, patterns, replacementPhone) {
                    if (!_isPhoneLink(node)) {
                        return;
                    }

                    var phoneFromLink = node.getAttribute('href').replace('tel:', '');
                    var patternsCount = patterns.length;
                    for (var patternIndex = 0; patternIndex < patternsCount; patternIndex++) {
                        if (patterns[patternIndex].test(phoneFromLink)) {
                            _renderElementHref(node, _getPhoneForElement(node, replacementPhone), rawPhone);
                        }
                    }
                };

                /**
                 * @param {HTMLElement} element
                 * @return {Boolean}
                 */
                var _isPhoneLink = function(element) {
                    if (element.tagName.toLowerCase() !== 'a') {
                        return false;
                    }

                    var href = element.getAttribute('href');
                    return isStringValue(href) && href.indexOf('tel:') === 0;
                };

                var _getNumbersPatterns = function() {
                    var numbersPatterns = [];
                    for (var i = 0; i < numbers.length; i++) {
                        var specialCharsPattern = '[\\s()[\\]{}\\-+.]*';
                        var numberRegexp = numbers[i].split('').join(specialCharsPattern);
                        numbersPatterns.push(new RegExp('[+(]?' + numberRegexp, 'g'));
                    }

                    return numbersPatterns;
                };

                /**
                 * @param {HTMLElement} node
                 * @param {RegExp} patterns
                 * @param {String} replacementPhone
                 */
                var _processTextNode = function(node, patterns, replacementPhone) {
                    if (node.nodeType !== Node.TEXT_NODE) {
                        return;
                    }

                    for (var i = 0; i < patterns.length; i++) {
                        if (node.textContent && patterns[i].test(node.textContent)) {
                            node.textContent = node.textContent.replace(patterns[i], replacementPhone);
                        } else if (node.innerText && patterns[i].test(node.innerText)) {
                            node.innerText = node.innerText.replace(patterns[i], replacementPhone);
                        }
                    }
                };

                _processNodes();
            };

            /**
             * @param {String} replaceSelector
             * @param {String} phone
             * @param {String} rawPhone
             */
            var _renderUserPostPrefix = function (replaceSelector, phone, rawPhone) {
                arrayIterate(_getUserPostPrefixElements(replaceSelector + '-' + CALL_TRACKING_POSTFIX_COUNTRY), function(element) {
                    var countryCode = _getPhoneNumberParts(element, phone).country;
                    _renderElementContent(element, countryCode);
                });

                arrayIterate(_getUserPostPrefixElements(replaceSelector + '-' + CALL_TRACKING_POSTFIX_REGION), function(element) {
                    var regionCode = _getPhoneNumberParts(element, phone).region;
                    _renderElementContent(element, regionCode);
                });

                arrayIterate(_getUserPostPrefixElements(replaceSelector + '-' + CALL_TRACKING_POSTFIX_NUMBER), function(element) {
                    var numberCode = _getPhoneNumberParts(element, phone).number;
                    _renderElementContent(element, numberCode);
                });

                arrayIterate(_getUserPostPrefixElements(replaceSelector + '-' + CALL_TRACKING_POSTFIX_TEL), function(element) {
                    _renderElementHref(element, phone, rawPhone);
                });
            };

            /**
             * @returns {Array}
             */
            var _getUserPostPrefixElements = function(replaceSelectorWithPostPrefix) {
                var result = [];
                var elements = document.getElementsByClassName(replaceSelectorWithPostPrefix);
                if (elements && elements.length) {
                    result = elements;
                }
                return result;
            };

            var _render = function _render() {
                var replacements = getReplacement();
                if (replacements) {
                    replacements = replacements.split("\n");
                    for (var i = 0; i < replacements.length; i++) {
                        replacements[i] = "." + replacements[i];
                    }
                }

                if (phoneScripts instanceof Array) {
                    _renderScriptReplacements(phoneScripts);
                } else {
                    _renderDefaultClasses(phone, rawPhone);
                    _renderUserReplacements(phone, rawPhone, replacements);
                }
            };

            (function _process() {
                _render();
                var timeouts = [300, 5000, 15000];
                timeouts.forEach(function (timeout) {
                    setTimeout(_render, timeout);
                });
            })();
        };
        /**
         * @param {Number} value
         */
        var saveEnableSetting = function(value) {
            storage.save(ROISTAT_CALL_TRACKING, value, COOKIE_CONFIG);
        };
        var saveSettings = function() {
            if (window.roistat.callTracking.phone) {
                var cookieConfigSession = { expires: parseInt(window.roistat.callTracking.sessionTime), path: '/' };
                if (COOKIE_CONFIG.domain) {
                    cookieConfigSession.domain = COOKIE_CONFIG.domain;
                }
                roistatSetCookie(ROISTAT_PHONE_COOKIE, window.roistat.callTracking.phone, cookieConfigSession);
                roistatSetCookie(ROISTAT_RAW_PHONE_COOKIE, window.roistat.callTracking.rawPhone, cookieConfigSession);
                saveEnableSetting(1);
                storage.save(ROISTAT_PHONE_REPLACEMENT, window.roistat.callTracking.replacementClasses, COOKIE_CONFIG);
                storage.save(ROISTAT_PHONE_SCRIPT_DATA, window.roistat.callTracking.phoneScriptsJson, COOKIE_CONFIG);
            }
        };
        /**
         * @param {String} phone
         * @param {Number} session
         * @param {String} replacement
         * @param {String} phoneScriptsJson
         * @param {String} rawPhone
         */
        var reusePhone = function(phone, session, replacement, phoneScriptsJson, rawPhone) {
            debug("CallTracking: reuse phone " + phone + " for time " + session + " and replacements " + replacement);

            var selector = 'script[data-roistat-script-id="'+ CALL_TRACKING_GET_PHONE_SCRIPT_ID +'"]';
            document.querySelectorAll(selector).forEach(function(element, index) {
                if (index === 0) {
                    return;
                }
                element.remove();
            });
            debug("CallTracking: all old scripts removed");

            if (!isValidPhone(phone)) {
                debug("CallTracking: new phone is invalid");
                roistat.callTracking.phone = null;
                callTrackingPhoneReceived();
                return;
            }

            roistat.callTracking.enabled = 1;
            roistat.callTracking.phone = phone;
            roistat.callTracking.sessionTime = session;
            roistat.callTracking.replacementClasses = replacement;
            roistat.callTracking.phoneScriptsJson = phoneScriptsJson;
            roistat.callTracking.rawPhone = rawPhone;
            callTrackingPhoneReceived();
            saveSettings();
            var cookieReuseConfig = { expires: parseInt(session), path: '/' };
            if (COOKIE_CONFIG.domain) {
                cookieReuseConfig.domain = COOKIE_CONFIG.domain;
            }
            roistatSetCookie(ROISTAT_PHONE_COOKIE, phone, cookieReuseConfig);
            roistatSetCookie(ROISTAT_RAW_PHONE_COOKIE, rawPhone, cookieReuseConfig);
            storage.save(ROISTAT_PHONE_SCRIPT_DATA, phoneScriptsJson, COOKIE_CONFIG);
            storage.save(ROISTAT_PHONE_REPLACEMENT, replacement, COOKIE_CONFIG);
            var phoneScriptsData = tryParseJson(phoneScriptsJson);
            renderPhone(phone, rawPhone, phoneScriptsData);
        };
        var requestNewPhone = function() {
            debug('CallTracking: request new phone');
            var visitId = roistatGetCookie(ROISTAT_VISIT_COOKIE);
            var savedMarker = getMarkerFromCookie();
            var realMarker = savedMarker ? savedMarker : marker;
            var escapedInitUrl = encodeURIComponent(initUrl);
            var url = getApiBaseUrl()+'/get-phone?visit=' + visitId + '&marker=' + (realMarker ? realMarker : '') + '&prefix='+roistatPhonePrefix+'&prefix_bind='+roistatPhonePrefixBind+'&phone_scripts_bind='+roistatCalltrackingScripts+'&page='+escapedInitUrl;
            sendApiRequestJSONP(url, CALL_TRACKING_GET_PHONE_SCRIPT_ID);
        };

        var refreshPhone = function() {
            roistatPhonePrefix = window.roistatPhonePrefix ? window.roistatPhonePrefix : "";
            roistatPhonePrefixBind = window.roistatPhonePrefixBind ? window.roistatPhonePrefixBind : "";
            roistatCalltrackingScripts = window.roistatCalltrackingScripts && window.roistatCalltrackingScripts.join ? window.roistatCalltrackingScripts.join(",") : "";
            debug("CallTracking: refresh phone with prefix: " + roistatPhonePrefix + ", binding: " + roistatPhonePrefixBind + ", scripts: " + roistatCalltrackingScripts);
            requestNewPhone();
        };
        /**
         * @returns {Boolean}
         */
        var isEnabled = function() {
            var globalEnabled = storage.get(ROISTAT_CALL_TRACKING) > 0;
            var localEnabled = settings.callTrackingEnabled;
            return globalEnabled && localEnabled;
        };
        /**
         * @param {Object} settings
         * @param {Number} [settings.is_enabled]
         */
        var updateSettings = function(settings) {
            saveEnableSetting(settings.is_enabled);
        };

        var processPhone = function processPhone() {
            var phone = getPhone();
            if (!isValidPhone(phone)) {
                debug("CallTracking: invalid phone " + phone + ", requesting a new one");
                requestNewPhone();
            } else {
                debug("CallTracking: render phone " + phone);
                var rawPhone = getRawPhone();
                var phoneScriptData = tryParseJson(getPhoneScriptsData());
                renderPhone(phone, rawPhone, phoneScriptData);
            }
        };

        var init = function() {
            debug("CallTracking: init");

            if (isRoistatMultiWidgetOnly()) {
                debug("CallTracking: Shut down because only online chat need to be inited");
                return;
            }

            saveSettings();
            if (!isEnabled()) {
                debug("CallTracking: disabled, skip");
                return;
            }

            if (settings.callTrackingManual) {
                debug("CallTracking: init finish because off manual");
                return;
            }

            processPhone();
            addSPAPageChangedCallback(processPhone);
        };
        window.roistatCallTrackingRefresh = refreshPhone;
        window.roistatRequestNewPhone = requestNewPhone;
        window.roistatReusePhone = reusePhone;
        window.roistatCalltrackingUpdateSettings = updateSettings;
        addVisitProcessedCallback(init);
    })();

    (function emailtracking() {
        /**
         * @param {String} message
         */
        var debugEmailtracking = function(message) {
            debug("Emailtracking: " + message);
        };

        /**
         * @param {String} email
         * @param {String} trackingEmail
         * @param {Object} emails
         */
        var saveEmail = function(email, trackingEmail, emails) {
            storage.save(ROISTAT_EMAILTRACKING_EMAIL, email, COOKIE_CONFIG);
            storage.save(ROISTAT_EMAILTRACKING_TRACKING_EMAIL, trackingEmail, COOKIE_CONFIG);
            storage.save(ROISTAT_EMAILTRACKING_EMAILS, JSON.stringify(emails), COOKIE_CONFIG);
        };

        var processSettings = function() {
            var settingsHaveEmails =
                (window.roistat.emailtracking.email && window.roistat.emailtracking.trackingEmail) ||
                isNonEmptyObject(window.roistat.emailtracking.emails);
            if (window.roistat.emailtracking.loaded && settingsHaveEmails) {
                debugEmailtracking("save loaded email: " + window.roistat.emailtracking.email);
                saveEmail(window.roistat.emailtracking.email, window.roistat.emailtracking.trackingEmail, window.roistat.emailtracking.emails);
            } else {
                debugEmailtracking("settings save skip, because not loaded");
                window.roistat.emailtracking.email = storage.get(ROISTAT_EMAILTRACKING_EMAIL);
                window.roistat.emailtracking.email = window.roistat.emailtracking.email ? window.roistat.emailtracking.email : null;
                window.roistat.emailtracking.email = window.roistat.emailtracking.email === "null" ? null : window.roistat.emailtracking.email;
                debugEmailtracking("email loaded from storage: " + window.roistat.emailtracking.email);

                window.roistat.emailtracking.trackingEmail = storage.get(ROISTAT_EMAILTRACKING_TRACKING_EMAIL);
                window.roistat.emailtracking.trackingEmail = window.roistat.emailtracking.trackingEmail ? window.roistat.emailtracking.trackingEmail : null;
                window.roistat.emailtracking.trackingEmail = window.roistat.emailtracking.trackingEmail === "null" ? null : window.roistat.emailtracking.trackingEmail;
                debugEmailtracking("tracking email loaded from storage: " + window.roistat.emailtracking.trackingEmail);

                window.roistat.emailtracking.emails = tryParseJson(storage.get(ROISTAT_EMAILTRACKING_EMAILS));
                window.roistat.emailtracking.emails = window.roistat.emailtracking.emails ? window.roistat.emailtracking.emails : null;
                debugEmailtracking("emails loaded from storage: " + JSON.stringify(window.roistat.emailtracking.emails));
            }
        };

        /**
         * @param {Object} settings
         * @param {String} [settings.email]
         * @param {String} [settings.trackingEmail]
         * @param {Object} [settings.emails]
         */
        var updateSettings = function(settings) {
            saveEmail(settings.email, settings.trackingEmail, settings.emails);
        };

        /**
         * @returns {Boolean}
         */
        var isEmailtrackingEnabled = function() {
            var settingsHaveEmails =
                (!!window.roistat.emailtracking.email && !!window.roistat.emailtracking.trackingEmail) ||
                isNonEmptyObject(window.roistat.emailtracking.emails);
            return window.roistat.emailtracking.enabled && settingsHaveEmails;
        };

        var processNodes = function() {
            if (!isEmailtrackingEnabled()) {
                debugEmailtracking('emailtracking disabled, skip swapping');
                return;
            }

            /**
             * @param {HTMLElement} node
             * @param {RegExp} pattern
             * @param {Function} replacementFunction
             */
            var replaceNodeText = function(node, pattern, replacementFunction) {
                if (node.href) {
                    var href = decodeURIComponentSafe(node.href);
                    if (pattern.test(href)) {
                        node.href = href.replace(pattern, replacementFunction);
                        return true;
                    }
                }
                if (node.nodeType !== 3) {
                    return false;
                }
                if (node.textContent && pattern.test(node.textContent)) {
                    node.textContent = node.textContent.replace(pattern, replacementFunction);
                    return true;
                } else if (node.innerText && pattern.test(node.innerText)) {
                    node.innerText = node.innerText.replace(pattern, replacementFunction);
                    return true;
                }
                return false;
            };

            /**
             * @param {String} str
             * @returns {String}
             */
            var escapeRegExp = function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            };

            var prepareTrackingEmail = function (trackingEmail, email) {
                var isUpperCaseEmail = !email.match(/[a-z]/);
                return isUpperCaseEmail ? trackingEmail.toUpperCase() : trackingEmail;
            };

            var replaceEmail = function(replacementEmail, trackingEmail) {
                var emailForRegexp = escapeRegExp(replacementEmail);
                var replacementRegExp = new RegExp('(^|\\s)(mailto:)?(' + emailForRegexp + ')($|\\s|\\?)', 'gi');
                var replacementFunction = function (str, before, mailto, email, after) {
                    mailto = mailto || '';
                    return before + mailto + prepareTrackingEmail(trackingEmail, email) + after;
                };
                debugEmailtracking('starting to replace email ' + replacementEmail + ' to ' + trackingEmail + ' with regexp ' + replacementRegExp);

                var allNodes = document.getElementsByTagName('*');
                var allNodeCount = allNodes.length;
                debugEmailtracking('found ' + allNodeCount + ' nodes on page');
                var successCount = 0;
                for (var i = 0; i < allNodeCount; i++) {
                    var node = allNodes[i];
                    var childNodeCount = node.childNodes.length;
                    if (childNodeCount > 0) {
                        for (var j = 0; j < childNodeCount; j++) {
                            var childNode = node.childNodes[j];
                            if (replaceNodeText(childNode, replacementRegExp, replacementFunction)) {
                                successCount++;
                            }
                        }
                    }
                    if (replaceNodeText(node, replacementRegExp, replacementFunction)) {
                        successCount++;
                    }
                }
                debugEmailtracking('successfully replaced ' + successCount + ' nodes');
            };

            if (window.roistat.emailtracking.emails) {
                objectIterate(window.roistat.emailtracking.emails, replaceEmail);
            } else {
                replaceEmail(window.roistat.emailtracking.email, window.roistat.emailtracking.trackingEmail);
            }
        };

        var processEmailSwap = function() {
            debugEmailtracking('process email swap');

            processNodes();
            setTimeout(function() {
                processNodes();
            }, 300);
            setTimeout(function() {
                processNodes();
            }, 5000);
            setTimeout(function() {
                processNodes();
            }, 15000);
        };

        var init = function() {
            debugEmailtracking('init');

            if (isRoistatMultiWidgetOnly()) {
                debugEmailtracking('Shut down because only online chat need to be inited');
                return;
            }

            addSPAPageChangedCallback(processEmailSwap);
            processSettings();
            processEmailSwap();
        };

        window.roistatEmailtrackingUpdateSettings = updateSettings;
        window.roistat.emailtracking.refresh = processNodes;

        addVisitProcessedCallback(init);
    })();

    (function multiDomain() {
        var _debug = function(message) {
            debug("MultiDomain: " + message);
        };

        var isMultiDomainEnabled = function() {
            return storage.get(ROISTAT_IS_MULTI_DOMAIN) > 0;
        };

        /**
         * @param {HTMLElement} node
         */
        var updateNodeHref = function(node) {
            var isValidUrl = function(url) {
                if (!url) {
                    return false;
                }
                if (inString(url, 'roistat_visit')) {
                    return false;
                }
                var domainFromUrl = getDomainFromUrl(url);
                var currentDomain = getDomainFromUrl(document.domain);
                var validRegExp   = new RegExp(/^((https?:)?\/\/)?([A-ZА-ЯЁ0-9\_\-\~]+\.)+[A-ZА-ЯЁ0-9\_\-\~]+/i);
                return domainFromUrl !== currentDomain && validRegExp.test(url);
            };
            var addRoistatVisitToUrl = function(url) {
                var hashParts = url.split("#");
                var uriParts = hashParts[0].split("?");
                var uriPart = "";
                var delimiter = "";
                if (uriParts.length === 2) {
                    uriPart = uriParts[1];
                }
                if (uriPart) {
                    delimiter = "&";
                }
                uriPart = uriPart + delimiter + "roistat_visit=" + roistat.getVisit();
                uriParts[1] = uriPart;
                hashParts[0] = uriParts.join("?");
                return hashParts.join("#");
            };
            if (node.tagName.toLowerCase() !== 'a') {
                return;
            }
            var href = node.getAttribute('href');
            var result = false;
            if (isValidUrl(href)) {
                var newHref = addRoistatVisitToUrl(href);
                _debug("update url " + href + " > " + newHref);
                node.setAttribute('href', newHref);
                result = true;
            }
            return result;
        };

        var processNodes = function() {
            if (!isMultiDomainEnabled()) {
                _debug('disabled, skip');
                return;
            }
            var aNodes = document.getElementsByTagName('a');
            var nodeCount = aNodes.length;
            _debug('found ' + nodeCount + ' <a> nodes on page');
            var successCount = 0;
            for (var i = 0; i < nodeCount; i++) {
                var node = aNodes[i];
                if (updateNodeHref(node)) {
                    successCount++;
                }
            }
            _debug('replaced ' + successCount + ' nodes');
        };

        var init = function () {
            _debug('init');

            if (isRoistatMultiWidgetOnly()) {
                _debug('Shut down because only online chat need to be inited');
                return;
            }

            processNodes();
            setTimeout(function() {
                processNodes();
            }, 300);
            setTimeout(function() {
                processNodes();
            }, 5000);
            setTimeout(function() {
                processNodes();
            }, 15000);
        };
        addVisitProcessedCallback(init);
        addSPAPageChangedCallback(init);
    })();

    (function settingsUpdater() {
        var SETTINGS_UPDATE_TRY_INTERVAL = 60*1000; // ms
        var SETTINGS_UPDATE_INTERVAL     = 2*60*1000; // ms

        /**
         * @param {string} message
         */
        var _debug = function(message) {
            debug("SettingsUpdater: " + message);
        };
        /**
         * @returns {Number}
         */
        var _saveLastUpdateTime = function() {
            storage.set(SETTINGS_UPDATE_TIME_KEY, currentTime());
        };
        /**
         * @returns {Boolean}
         */
        var _isFirstUpdate = function() {
            var _lastUpdateTime = getLastUpdateTime();
            var _result = !(_lastUpdateTime > 0);
            _debug("is first update check: lastUpdateTime=" + _lastUpdateTime + ", result=" + (_result ? 1 : 0));
            return _result;
        };
        /**
         * @returns {Boolean}
         */
        var _isUpdateExpired = function() {
            var _minTime = currentTime() - SETTINGS_UPDATE_INTERVAL;
            var _lastUpdateTime = getLastUpdateTime();
            var _result = _lastUpdateTime <= _minTime;
            _debug("expiration check: _minTime=" + _minTime + ", lastUpdateTime=" + _lastUpdateTime + ", result=" + (_result ? 1 : 0));
            return _result;
        };

        /**
         * @returns {Boolean}
         */

        var _requestNewSettings = function(isForceUpdate) {
            var visitId = roistatGetCookie(ROISTAT_VISIT_COOKIE);
            requestNewSettings(visitId, isForceUpdate);
        };
        /**
         * @param {Object} settings
         * @param {Object} [settings.calltracking]
         * @param {Object} [settings.emailtracking]
         * @param {Object} [settings.geo]
         * @param {Object} [settings.js_settings]
         * @param {Object} [settings.leadhunter_templates]
         * @param {Object} [settings.multiwidget]
         * @param {Object} [settings.multiwidget_templates]
         * @param {Object} [settings.online_chat]
         * @param {Object} [settings.online_chat_templates]
         * @param {Array} [settings.proxy_forms]
         * @param {Object} [settings.promo_code]
         * @param {Object} [settings.links_markup]
         */
        var _updateSettings = function(settings) {
            _debug("update settings and save last update time");
            var hasLeadHunterTargetPagesMap = storage.getObject(LEAD_HUNTER_TARGET_PAGES_MAP) !== null;

            if (hasLeadHunterTargetPagesMap) {
                var newLeadHunterTargetPagesMap = tryParseJson(settings.js_settings.leadHunterTargetPagesMap);
                if (newLeadHunterTargetPagesMap !== null) {
                    storage.setObject(LEAD_HUNTER_TARGET_PAGES_MAP, newLeadHunterTargetPagesMap);
                }
            }

            window.roistatCalltrackingUpdateSettings(settings.calltracking);
            window.roistatEmailtrackingUpdateSettings(settings.emailtracking);
            window.roistatSaveLeadHunterTemplates(settings.leadhunter_templates.form_template, settings.leadhunter_templates.pulsator_template, settings.leadhunter_templates.pulsator_settings);
            window.roistatSaveMultiwidgetTemplate(settings.multiwidget_templates.pulsator_template, settings.multiwidget.pulsator_settings);
            window.roistatSaveOnlineChatTemplate(settings.online_chat_templates.pulsator_template, settings.online_chat_templates.iframe_template);
            window.roistatSaveProxyFormSettings(settings.proxy_forms);
            saveJsSettings(settings.js_settings);
            saveMultiwidgetSettings(settings.multiwidget.multiwidget_settings);
            saveOnlineChatSettings(settings.online_chat);
            saveGeoSettings(settings.geo);
            savePromoCodeSettings(settings.promo_code);
            saveLinksMarkupSettings(settings.links_markup);

            state.isSettingsUpdating = false;
            _saveLastUpdateTime();
        };

        var _init = function() {
            _debug("init");
            if (_isFirstUpdate()) {
                _debug("in first update we just start first timer and skip");
                _saveLastUpdateTime();
                return;
            }

            if (!_isUpdateExpired()) {
                _debug("update is not not expired, skip");
                return;
            }

            _debug("start to update settings");
            _requestNewSettings();
        };

        addVisitProcessedCallback(function() {
            window.roistatUpdateSettings = _updateSettings;
            setTimeout(function() {
                _init();
            }, 3000);

            _debug("set interval to update settings");
            setInterval(function () {
                _init();
            }, SETTINGS_UPDATE_TRY_INTERVAL);
        });
    })();

    (function goals(window, document, undefined) {

        var callbacks = {};

        /**
         * @param {String|Number} value
         * @returns {string}
         */
        var encodeForUrl = function(value) {
            var tempEncodeURIComponent = encodeURIComponent ? encodeURIComponent : encodeURI;
            return tempEncodeURIComponent(value);
        };

        /**
         * @param {String} [params.name]
         * @param {String} [params.phone]
         * @param {String} [params.email]
         * @param {Number} [params.price]
         * @param {String} [params.text]
         * @param {Object} [params.fields]
         */
        var reachGoal = function(params, afterReachCallback) {
            debug("Reach goal start");
            if (!params) {
                params = {};
            }
            var request = {
                leadName: "",
                formTitle: "",
                name: "",
                phone: "",
                email: "",
                price: "",
                text: "",
                fields: "",
                client_fields: "",
                is_need_callback: "",
                callback_phone: "",
                visit: getVisitIdForLeadCreation(),
                is_skip_sending: 0,
                items: "",
                placeholders_data: '',
                engine_type: ''
            };
            for (var requestParam in request) {
                if (!Object.prototype.hasOwnProperty.call(request, requestParam)) {
                    continue;
                }
                if (!Object.prototype.hasOwnProperty.call(params, requestParam)) {
                    continue;
                }
                if (!params[requestParam]) {
                    continue;
                }
                if (requestParam === 'fields' || requestParam === 'client_fields' || requestParam === 'items' || requestParam === 'placeholders_data') {
                    params[requestParam] = JSON.stringify(params[requestParam]);
                }
                request[requestParam] = encodeForUrl(params[requestParam]);
            }

            var project = getProjectForUrl();
            var apiUrl = protocol() + "//"+ROISTAT_HOST+"/api/site/"+API_VERSION_NEW+"/"+project+"/reach-goal?v=2";
            for (var key in request) {
                if (!Object.prototype.hasOwnProperty.call(request, key)) {
                    continue;
                }
                apiUrl = apiUrl +  "&" + key + "=" + request[key];
            }
            if (afterReachCallback !== undefined) {
                var callbackKey = Math.random().toString();
                callbacks[callbackKey] = afterReachCallback;
                apiUrl += "&callback_key=" + callbackKey;
            }
            sendApiRequestJSONP(apiUrl, null, afterReachCallback);
            debug("Reach goal completed");
        };

        var roistatGoal = window.roistatGoal = {
            /**
             * @param {String} [params.name]
             * @param {String} [params.phone]
             * @param {String} [params.email]
             * @param {Number} [params.price]
             * @param {String} [params.text]
             */
            reach: function(params, afterReachCallback) {
                reachGoal(params, afterReachCallback);
            },
            callAfterReachCallback: function(key) {
                if (Object.prototype.hasOwnProperty.call(callbacks, key)) {
                    callbacks[key]();
                    delete callbacks[key];
                }
            }
        };
    })(window, document, undefined);

    (function events(window, document, undefined) {
        var serializeData = function(data) {
            if (data instanceof Array || data === null || typeof data !== 'object') {
                debug('Invalid event data');
                return '';
            }
            return serializeObjectRecursive(data);
        };

        var serializeObjectRecursive = function(data, recursionDepth, properties) {
            var currentRecursionDepth = recursionDepth || 0;
            var currentProperties = properties || [];
            if (currentRecursionDepth > 20) {
                debug('Recursion depth exceeded when processing additional event fields');
                return '';
            }
            currentRecursionDepth++;
            var result = [];
            for (var property in data) {
                if (Object.prototype.hasOwnProperty.call(data, property)) {
                    var value = data[property];
                    if (typeof value === 'string' || typeof value === 'number') {
                        var prefix = currentProperties.length > 0 ? '[' + currentProperties.join('][') + ']' : '';
                        result.push('&data' + prefix + '[' + encodeURIComponent(property) + ']=' + encodeURIComponent(value));
                    } else if (typeof value === 'object') {
                        currentProperties.push(encodeURIComponent(property));
                        result.push(serializeObjectRecursive(value, currentRecursionDepth, currentProperties));
                        currentProperties.pop();
                    } else {
                        debug('Event data property ignored: ' + property);
                    }
                }
            }
            return result.length > 0 ? result.join('') : '';
        }

        var sendEvent = function(name, data) {
            debug("Send event start");
            var visitId = getRoistatVisitId();
            var serializedData = serializeData(data);
            var url = getApiBaseUrl() + "/event/register?visit=" + visitId + "&event=" + name + serializedData;
            sendApiRequestJSONP(url);
            debug("Send event completed");
        };

        window.roistat.event = {
            /**
             * @param {String} name
             * @param {Object} [data]
             */
            send: function(name, data) {
                sendEvent(name, data);
            }
        };
    })(window, document, undefined);

    (function visitApprove(window, document, undefined) {
        if (isRoistatMultiWidgetOnly()) {
            debug('VisitApprove: Shut down because only online chat need to be inited')
            return;
        }

        var timeout = window.roistatIsInitVisit === true ? 20000 : 10000;
        var startTime = (new Date()).getTime();
        var _key = function(visitId) {
            return 'approve_visit_' + visitId;
        };
        var _saveApprove = function(visitId) {
            tempStorage.set(_key(visitId), 1);
        };
        var _isApproved = function(visitId) {
            return tempStorage.get(_key(visitId)) > 0;
        };

        var addListener, removeListener, movements = [];
        if (document.addEventListener) {
            addListener = function (el, evt, f) { return el.addEventListener(evt, f, false); };
            removeListener = function (el, evt, f) { return el.removeEventListener(evt, f, false); };
        } else {
            addListener = function (el, evt, f) { return el.attachEvent('on' + evt, f); };
            removeListener = function (el, evt, f) { return el.detachEvent('on' + evt, f); };
        }

        var mouseMoveListener = function (event) {
            if (movements.length > 30) {
                return;
            }
            event = event || window.event;
            if (!event || !event.screenX) {
                return;
            }
            var currentTime = (new Date()).getTime();
            var pause, prevMove = null;
            if (movements.length > 0) {
                prevMove = movements[movements.length-1];
            }
            if (prevMove) {
                pause = currentTime - prevMove.time;
            } else {
                pause = currentTime - startTime;
            }
            if (pause < 300) {
                return;
            }
            pause = pause - 300;

            var distance = 0;
            var x = event.screenX;
            var y = event.screenY;
            if (prevMove) {
                distance = parseInt(Math.sqrt(Math.pow(prevMove.y - y, 2) + Math.pow(prevMove.x - x, 2)));
            }

            var move = {
                time: currentTime,
                pauseBeforeMove: pause,
                x: x,
                y: y,
                distance: distance
            };
            movements.push(move);
        };

        var generateMoveData = function() {
            var result = [];
            arrayIterate(movements, function (move) {
                var moveData = [move.pauseBeforeMove, move.distance];
                result.push(moveData.join(':'));
            });
            if (result.length === 0) {
                result.push('0:0');
            }
            return result.join('|');
        };

        var isYandexMetrikaExists = function() {
            for (var key in window) {
                if (inString(key, 'yaCounter')) {
                    return true;
                }
            }
            return false;
        };

        var _approveVisit = function() {
            removeListener(document, 'mousemove', mouseMoveListener);
            var visitId = getRoistatVisitId();
            debug('VisitApprove: start for visit ' + visitId);
            if (_isApproved(visitId)) {
                debug('VisitApprove: visit already approved, skip');
                return;
            }
            _saveApprove(visitId);
            setCookieAdditionalParameters();
            var url = getApiBaseUrl() + '/approve?v=' + SCRIPT_VERSION + '&visit=' + visitId;
            if (isNeedSendCookiesWithApproveVisit()) {
                url += '&hash=' + getVisitHash()
            }
            if (isNeedSendPageParamsWithApproveVisit()) {
                url += '&page_params=' + encodeURIComponent(JSON.stringify(window.roistat.page.params));
                updatePageParamsInState();
            }
            url += '&mv=' + generateMoveData();
            url += '&pl=' + (window.navigator ? window.navigator.platform : '');
            url += '&ym=' + (isYandexMetrikaExists() ? '1' : '0');
            url += '&wd=' + (window.navigator ? (window.navigator.webdriver === true ? '1' : '0') : '0');
            sendApiRequestJSONP(url);
        };

        /**
         * @returns {Boolean}
         */
        var isNeedSendCookiesWithApproveVisit = function () {
            var oldCookies     = state.cookies,
                currentCookies = getParsedCookies();
            var additionalCookies = additionalCookieList();
            for (var i = 0; i < additionalCookies.length; i++) {
                var additionalCookieName         = additionalCookies[i];
                var oldAdditionalCookieValue     = Object.prototype.hasOwnProperty.call(oldCookies, additionalCookieName) ? oldCookies[additionalCookieName] : undefined;
                var currentAdditionalCookieValue = Object.prototype.hasOwnProperty.call(currentCookies, additionalCookieName) ? currentCookies[additionalCookieName] : undefined;

                var isCurrentAdditionalCookieValueNotEmpty = typeof currentAdditionalCookieValue === 'string' && currentAdditionalCookieValue.length > 0;
                if (isCurrentAdditionalCookieValueNotEmpty && oldAdditionalCookieValue !== currentAdditionalCookieValue) {
                    return true;
                }
            }
            return false;
        };

        /**
         * @returns {Boolean}
         */
        var isNeedSendPageParamsWithApproveVisit = function () {
            var oldPageParams     = state.pageParams,
                currentPageParams = window.roistat.page.params;

            for (var i = 0; i < ADDITIONAL_PAGE_PARAM_LIST.length; i++) {
                var additionalPageParamName     = ADDITIONAL_PAGE_PARAM_LIST[i];
                var oldAdditionalPageParamValue = Object.prototype.hasOwnProperty.call(oldPageParams, additionalPageParamName)
                    ? oldPageParams[additionalPageParamName]
                    : null;
                var currentAdditionalPageParamValue = Object.prototype.hasOwnProperty.call(currentPageParams, additionalPageParamName)
                    ? currentPageParams[additionalPageParamName]
                    : null;
                if (currentAdditionalPageParamValue !== oldAdditionalPageParamValue) {
                    return true;
                }
            }
            return false;
        };

        setTimeout(function() {
            _approveVisit();
        }, timeout);

        addListener(document, 'mousemove', mouseMoveListener);
    })(window, document, undefined);

    (function abTesting(window, document, undefined){
        /**
         * @return {boolean}
         */
        var isDemoTest = function(){
            return getUrlParamValue('roistat_ab_demo') === "1";
        };

        /**
         * @param {String} str
         * @return {RegExp}
         */
        var _prepareRegExp = function(str) {
            return new RegExp(str.split('.').join('\\.').split('*').join('.*').split('?').join('.'));
        };

        /**
         * @param {Object} test
         * @param {String} test.value
         * @param {String} test.type
         * @param {String} test.filter
         * @param {String} test.filterValue
         */
        var isTestAppliable = function(test) {
            var href = window.location.href,
                testFilterType = test.filter,
                pagesList = test.filterValue;
            var targetPages;

            switch (testFilterType) {
                case 'except':
                case 'pages':
                    var pageReg,
                        cleanHref,
                        isPageListed = false;
                    cleanHref = href ? extractHostAndPath(href) : '';
                    targetPages = pagesList ? pagesList.split("\n") : [];
                    if (cleanHref && targetPages.length !== 0) {
                        for (var i = 0; i < targetPages.length; i++) {
                            var page = targetPages[i].trim();
                            if (page.length === 0) {
                                continue;
                            }
                            pageReg = _prepareRegExp(page);
                            if (pageReg.test(cleanHref)) {
                                isPageListed = true;
                                break;
                            }
                        }
                    }
                    return (testFilterType === 'pages') ? isPageListed : !isPageListed;
                    break;
                case 'all':
                default:
                    return true;
            }
        };

        /**
         * @param {Object} test
         * @param {int}    test.id
         * @param {String} test.value
         * @param {String} test.type
         * @param {String} test.filter
         * @param {String} test.filterValue
         */
        var applyCssTest = function(test){
            var h = document.getElementsByTagName("head")[0],
                e;
            e = document.createElement("style");
            e.setAttribute("type", "text/css");
            if (e.styleSheet) {
                e.styleSheet.cssText = test.value;
            } else {
                e.innerText = test.value;
            }
            h.appendChild(e);

            debug('Applied css-test: ' + test.id);
        };

        /**
         * @param {object} test
         */
        var applyUniformTest = function (test) {
            if (Object.prototype.hasOwnProperty.call(callbacks.onAbTestsApplied, test.id)) {
                callbacks.onAbTestsApplied[test.id](test.value);
            }

            debug('Applied uniform-test: ' + test.id);
        }

        /**
         * @param {Object} test
         * @param {int}    test.id
         * @param {String} test.value
         * @param {String} test.type
         * @param {String} test.filter
         * @param {String} test.filterValue
         */
        var applyTest = function(test){
            if (isTestAppliable(test)) {
                switch (test.type) {
                    case 'css':
                        applyCssTest(test);
                        break;
                    case 'uniform':
                        applyUniformTest(test);
                        break;
                }
            }
        };

        window.applyTests = function(){
            debug('Start applying ab tests');
            var tests = storage.getObject('abTesting');
            var testKey, test;
            for (testKey in tests) {
                if (!Object.prototype.hasOwnProperty.call(tests, testKey)) {
                    continue;
                }
                test = tests[testKey];
                applyTest(test);
            }

            state.isAbTestsApplied = true;
            debug('End applying ab tests');

            if (window.onRoistatAbTestsApplied !== undefined && typeof window.onRoistatAbTestsApplied === 'function') {
                window.onRoistatAbTestsApplied();
            }
        };

        var applyDemoTest = function(){
            debug('Call: apply demo AB test');
            var abTestDemo = getUrlParamValue('roistat_ab_data');
            var testValue;

            if (abTestDemo === null) {
                return;
            } else {
                testValue = JSON.parse(Base64.decode(abTestDemo));
            }

            if (typeof testValue !== 'object') {
                debug('Error: testValue is not an object.');
                return;
            }
            applyTest(testValue);
        };

        function init(){
            if (isRoistatMultiWidgetOnly()) {
                debug('ABTest: Shut down because only online chat need to be inited');
                return;
            }

            var isDemoTestApplied = isDemoTest();
            if (!isNewVisit && !isDemoTestApplied) {
                applyTests();
            }
            if (isDemoTestApplied) {
                applyDemoTest();
            }
        }

        init();
    })(window, document, undefined);

    /*(function visitStreamOld(window, document, undefined) {
        var getTimeStamp = function() {
            return new Date().getTime();
        };
        var sendVisitStream = function(visitId) {
            if (window.roistatVisitStreamComplete) {
                return;
            }
            var referrer = encodeURIComponent(document.referrer);
            var currentPhone = roistatGetCookie(ROISTAT_PHONE_COOKIE);
            if (currentPhone) {
                currentPhone = encodeURIComponent(currentPhone);
            } else {
                currentPhone = "";
            }
            var url = getApiBaseUrl() + "/stream?t=" + getTimeStamp() + "&visit=" + visitId + "&referrer=" + referrer + "&phone=" + currentPhone + "&" + getVisitHashParamName() + "=" + getVisitHash();
            sendApiRequestJSONP(url);
            window.roistatVisitStreamComplete = true;
        };
        var visitId;
        if (window.roistatIsInitVisit) {
            visitId = window.roistatVisitId;
            sendVisitStream(visitId);
        } else {
            addVisitProcessedCallback(function() {
                visitId = getRoistatVisitId();
                sendVisitStream(visitId);
            });
            setTimeout(function() {
                visitId = getRoistatVisitId();
                sendVisitStream(visitId);
            }, 1000);
        }

    })(window, document, undefined);*/

    (function visitStream(window, document, undefined) {
        if (storage.get(ROISTAT_IS_NEED_DISABLE_COLLECTOR) > 0) {
            debug('visitStream: disabled by settings')
            return;
        }

        if (isRoistatMultiWidgetOnly()) {
            debug('visitStream: Shut down because only online chat need to be inited')
            return;
        }

        if (!COLLECTOR_HOST) {
            return;
        }
        setTimeout(function () {
            (function (w, d, s, u, n, id, h) {
                w[n] = {COUNTER_ID: id, HOST: h};
                var p = d.location.protocol == "https:" ? "https://" : "http://";
                var js = d.createElement(s);
                js.async = 1;
                js.src = p + h + u;
                var js2 = d.getElementsByTagName(s)[0];
                js2.parentNode.insertBefore(js, js2);
            })(window, document, "script", "/counter.js", "datamap", getProjectForUrl(), COLLECTOR_HOST);
        }, 1000);
    })(window, document, undefined);

    (function yandexMetrika(window, document, undefined) {
        var setCounterId = function() {
            var counterId = window.roistatMetrikaCounterId;
            if (counterId) {
                storage.set(METRIKA_COUNTER_ID_COOKIE, counterId);
            }
        };

        var sendVisitParam = function(counterId) {
            var counterName = 'yaCounter' + counterId;
            var timeout = 100,
                totalTimeout = 0,
                timeoutLimit = 60000;

            var initMetrikaParams = function() {
                totalTimeout += timeout;
                debug("YandexMetrika: trying to access counter " + counterId);
                if (window[counterName] === undefined) {
                    if (totalTimeout < timeoutLimit) {
                        setTimeout(initMetrikaParams, timeout);
                        timeout *= 2;
                    }
                    return;
                }

                var yp = {};
                yp[METRIKA_VISIT_ID_PARAM_NAME] = getRoistatVisitId();
                window[counterName].params(yp);
                debug("YandexMetrika: visit id " + yp[METRIKA_VISIT_ID_PARAM_NAME] + " sent to counter " + counterId);
            };

            setTimeout(initMetrikaParams, timeout);
        };

        addVisitProcessedCallback(function() {
            setCounterId();
            var counterIdData = storage.get(METRIKA_COUNTER_ID_COOKIE);
            if (!counterIdData) {
                debug("YandexMetrika: counter id not found");
                return;
            }
            var counterIds = String(counterIdData).split(',');
            debug("YandexMetrika: counters: " + counterIds);
            for (var i = 0; i < counterIds.length; i++) {
                if (counterIds[i].trim() === '') {
                    continue;
                }
                sendVisitParam(counterIds[i]);
            }
        });
    })(window, document, undefined);

    (function proxyForms(window, document) {
        /**
         * @param {String} message
         */
        var debugProxyForms = function(message) {
            debug("Proxy Forms: " + message);
        };

        var processSettings = function() {
            if (window.roistat.proxyForms.loaded && window.roistat.proxyForms.settings.length > 0) {
                debugProxyForms("save loaded settings");
                saveSettings(window.roistat.proxyForms.settings);
            } else {
                debugProxyForms("settings not loaded, getting from storage");
                window.roistat.proxyForms.settings = storage.getObject(ROISTAT_PROXY_FORMS) || [];
            }
        };

        var saveSettings = function(settings) {
            storage.setObject(ROISTAT_PROXY_FORMS, settings);
        };

        var initHandlers = function() {
            debugProxyForms('init form listener');
            addFormsListener(window.roistat.proxyForms.settings);
            addButtonsListener(window.roistat.proxyForms.settings);
        };

        var isProxyFormHostsSettingsValid = function(proxyFormSettings) {
            return proxyFormSettings.hasOwnProperty('hosts')
                && proxyFormSettings.hasOwnProperty('is_excluding_hosts')
                && isArray(proxyFormSettings.hosts)
                && proxyFormSettings.hosts.length > 0
        }

        var isProxyFormSettingsFitCurrentHost = function(proxyFormSettings) {
            if (!isProxyFormHostsSettingsValid(proxyFormSettings)) {
                return true;
            }

            var isCurrentHostSpecifiedInSettings = isValueInArray(proxyFormSettings.hosts, getDomainFromUrl(window.location.host));
            var isExcludingHosts = Boolean(proxyFormSettings.is_excluding_hosts);

            return isExcludingHosts ? !isCurrentHostSpecifiedInSettings : isCurrentHostSpecifiedInSettings;
        }

        var getProxyFormsSettingsForCurrentHost = function(proxyFormsSettings) {
            var proxyFormsSettingsForCurrentHost = [];
            arrayIterate(proxyFormsSettings, function (proxyFormSettings) {
                if (isProxyFormSettingsFitCurrentHost(proxyFormSettings)) {
                    proxyFormsSettingsForCurrentHost.push(proxyFormSettings);
                }
            });

            return proxyFormsSettingsForCurrentHost;
        }

        var addButtonsListener = function(settings) {
            var buttonSettings = [];
            arrayIterate(settings, function (setting) {
                if (setting.type === "js-button") {
                    buttonSettings.push(setting);
                }
            });

            if (buttonSettings.length < 1) {
                debugProxyForms('no button settings');
                return;
            }

            var listener;
            if (document.addEventListener) {
                listener = function(event) {
                    getListener(buttonSettings, event, event.target, sendButtonLead);
                };
                document.addEventListener('click', listener, true);
            } else if (document.attachEvent) {
                listener = function() {
                    var event = window.event;
                    getListener(buttonSettings, event, event.srcElement, sendButtonLead, true);
                };
                document.attachEvent('onclick', listener);
            } else {
                debugProxyForms("Listener could not be attached");
            }

        };

        var addFormsListener = function(settings) {
            var formSettings = [];
            arrayIterate(settings, function(setting) {
                if (setting.type === "form") {
                    formSettings.push(setting);
                }
            });

            if (formSettings.length < 1) {
                debugProxyForms('no form settings');
                return;
            }

            if (document.addEventListener) {
                var listener = function(event) {
                    getListener(formSettings, event, event.target, sendFormLead);
                };

                document.addEventListener('submit', listener, true);
            } else if (document.attachEvent) {
                setInterval(function() {
                    formSettings = getProxyFormsSettingsForCurrentHost(formSettings);

                    var forms = document.getElementsByTagName("form");
                    arrayIterate(forms, function(form) {
                        if (form.getAttribute('data-roistat-proxy-form-checked') === 'true') {
                            return;
                        }

                        form.setAttribute('data-roistat-proxy-form-checked', 'true');

                        arrayIterate(formSettings, function(setting) {
                            if (matchesSelector(form, setting.selector)) { // incompatible with CSS3 selectors
                                form.attachEvent('onsubmit', function() {
                                    window.event.returnValue = false;
                                    sendFormLead(setting, window.event.srcElement);
                                });
                            }
                        });
                    });
                }, 2000);
            } else {
                debugProxyForms("Listener could not be attached");
            }
        };

        var getListener = function(settings, event, target, sender, isIEPreventDefault) {
            var proxyFormsSettings = getProxyFormsSettingsForCurrentHost(settings);
            var matchingSetting = null;

            arrayIterate(proxyFormsSettings, function(setting) {
                if (matchesSelector(target, setting.selector)) {
                    matchingSetting = setting;
                }
            });

            if (matchingSetting === null) {
                debugProxyForms('No matched settings found for listener');
                return;
            }
            sender(event, matchingSetting, target, isIEPreventDefault);
        };

        var sendFormLead = function(event, matchingSetting, form, isIEPreventDefault) {
            var leadFields = getLeadFields(form, matchingSetting);
            if (!isValid(leadFields, matchingSetting)) {
                return;
            }

            isIEPreventDefault
                ? event.returnValue = false
                : event.preventDefault();
            sendLead(leadFields, matchingSetting, function() {
                // form.submit might be overridden or deleted, therefore using prototype method
                HTMLFormElement.prototype.submit.call(form);
            });
        };

        var sendButtonLead = function(event, matchingSetting) {
            var leadFields = getLeadFields(null, matchingSetting);
            if (!isValid(leadFields, matchingSetting)) {
                return;
            }
            sendLead(leadFields, matchingSetting);
        };

        var sendLead = function(leadFields, settings, callback) {
            var params = {};
            var hasCrmIsEnabledProperty = isFieldValueFilled(settings.crm) && settings.crm.hasOwnProperty('is_enabled');
            var isCrmEnabled = hasCrmIsEnabledProperty ? settings.crm.is_enabled : true;

            params.leadName          = settings.hasOwnProperty('lead_name') ? settings.lead_name : 'Новый лид с формы ' + settings.title;
            params.formTitle         = settings.title;
            params.name              = leadFields.name;
            params.phone             = leadFields.phone;
            params.email             = leadFields.email;
            params.text              = leadFields.comment;
            params.fields            = leadFields.fields;
            params.placeholders_data = leadFields.placeholdersData;
            params.is_need_callback  = settings.is_need_callback > 0 ? 1 : 0;
            params.is_skip_sending   = !isCrmEnabled;

            window.roistatGoal.reach(params, callback);
        };

        var isFieldValueFilled = function (value) {
            return (typeof value === 'number' && !isNaN(value)) ||
                (typeof value === 'string' && value !== '') ||
                (typeof value === 'object' && value !== null) ||
                (typeof value === 'boolean' && value) ||
                isArray(value);
        };

        var isValid = function (fields, settings) {
            var requiredFields = [], defaultFields = ['name', 'email', 'phone', 'comment'];
            arrayIterate(defaultFields, function(field) {
                if (settings.hasOwnProperty(field) && settings[field].required > 0) {
                    requiredFields.push(field);
                }
            });
            if (isArray(settings.fields)) {
                arrayIterate(settings.fields, function(field) {
                    if (field.required > 0) {
                        requiredFields.push(field);
                    }
                });
            }

            var isFieldsValid = true;
            arrayIterate(requiredFields, function(field) {
                if (!fields.hasOwnProperty(field) || !isFieldValueFilled(fields[field])) {
                    isFieldsValid = false;
                }
            });

            return isFieldsValid;
        };

        var getLeadFields = function(form, settings) {
            var result = {};

            result.name             = settings.name ? getFieldValue(form, settings.name.value, settings.name.type) : "";
            result.phone            = settings.phone ? getFieldValue(form, settings.phone.value, settings.phone.type) : "";
            result.email            = settings.email ? getFieldValue(form, settings.email.value, settings.email.type) : "";
            result.comment          = settings.comment ? getFieldValue(form, settings.comment.value, settings.comment.type) : "";
            result.fields           = {};
            result.placeholdersData = {
                orderPage: initUrl
            };

            if (isArray(settings.fields)) {
                arrayIterate(settings.fields, function(field) {
                    result.fields[field.name] = getFieldValue(form, field.value, field.type);
                });
            }

            return result;
        };

        var getFieldValue = function(form, settingValue, type) {
            switch (type) {
                case 'plain':
                    return settingValue || "";
                case 'input':
                    var inputElement = form.querySelector('input[name="' + settingValue + '"]');
                    return inputElement ? inputElement.value : "";
                case 'js':
                    try {
                        return (new Function(settingValue))();
                    } catch (e) {
                        return "";
                    }
            }
        };

        var init = function() {
            debugProxyForms("init");

            if (isRoistatMultiWidgetOnly()) {
                debugProxyForms("Shut down because only online chat need to be inited");
                return;
            }

            if (!window.roistat.proxyForms.enabled) {
                debugProxyForms("disabled");
                return;
            }
            processSettings();
            initHandlers();
        };

        var matchesSelector = function(element, selector) {
            if (typeof Element !== "undefined" && Element.prototype.matches) {
                var isMatches = element.matches(selector);

                if (!isMatches) {
                    return element.closest(selector) ? element.closest(selector).matches(selector) : false;
                }

                return isMatches;
            } else if (typeof Element !== "undefined" && Element.prototype.matchesSelector) {
                var isMatchesSelector = element.matchesSelector(selector);

                if (!isMatchesSelector) {
                    return element.closest(selector) ? element.closest(selector).matches(selector) : false;
                }

                return isMatchesSelector;
            } else if (document.querySelectorAll) {
                var matches = document.querySelectorAll(selector);
                for (var i = 0; i < matches.length; i++) {
                    if (matches[i] === element) {
                        return true;
                    }
                }

                return false;
            }

            return false;
        };

        addVisitProcessedCallback(init);
        window.roistatSaveProxyFormSettings = saveSettings;
    })(window, document);

    (function onRoistatAllModulesLoadingComplete(){
        if (window.onRoistatAllModulesLoaded !== undefined && typeof window.onRoistatAllModulesLoaded === 'function') {
            debug('onRoistatAllModulesLoaded: call');
            window.onRoistatAllModulesLoaded();
        }
    })();

    (function requestListen(window, document, undefined){
        var isListenerEnabled = function() {
            return storage.get(ROISTAT_LISTEN_REQUESTS_COOKIE) * 1 > 0;
        };

        var scopeDebug = function(message) {
            debug('Request listener: ' + message);
        };

        var PHONE_REGEXP = /^(8|7|380|45|370|375|1|48|357|44|373|371|49|971|996|995|972|420|33|90|34|55|61|52|60|374|43|41|351)?(\d){9,13}$/g;
        var EMAIL_REGEXP = /^[^\s]+[@][^\s]+$/g;
        var EXCLUDE_DOMAINS = [
            'mc.yandex.ru',
        ];

        var startListeningRequests = function startListeningRequests() {
            scopeDebug('listen');

            // XMLHttpRequest
            if (window.XMLHttpRequest) {
                // cache old XMLHttpRequest.send
                XMLHttpRequest.prototype.oldSend = XMLHttpRequest.prototype.send;

                function newSend(data) {
                    var self = this;
                    collectData(self.responseURL, data, function() {
                        self.oldSend(data);
                    });
                }

                // override XMLHttpRequest.send
                XMLHttpRequest.prototype.send = newSend;
            }

            // ActiveXObject
            if (window.ActiveXObject) {
                var ActualActiveXObject = ActiveXObject;

                // generate new ActiveXObject
                function ActiveXObject(progid) {
                    var oldActiveXObject = new ActualActiveXObject(progid);
                    var newActiveXObject = {};

                    if (progid.toLowerCase() === "msxml2.xmlhttp") {
                        newActiveXObject = {
                            _ax: oldActiveXObject,
                            _status: "fake",
                            responseText: "",
                            responseXml: null,
                            readyState: 0,
                            status: 0,
                            statusText: 0,
                            onReadyStateChange: null
                        };

                        var cachedUrl = '';

                        newActiveXObject._onReadyStateChange = function () {
                            var self = newActiveXObject;

                            return function () {
                                self.readyState = self._ax.readyState;
                                if (self.readyState === 4) {
                                    self.responseText = self._ax.responseText;
                                    self.responseXml = self._ax.responseXml;
                                    self.status = self._ax.status;
                                    self.statusText = self._ax.statusText;
                                }
                                if (self.onReadyStateChange) self.onReadyStateChange();
                            }
                        }();

                        newActiveXObject.open = function (method, url, varAsync, user, password) {
                            cachedUrl = url;
                            varAsync = (varAsync !== false);
                            this._ax.onReadyStateChange = this._onReadyStateChange;
                            return this._ax.open(method, url, varAsync, user, password);
                        };

                        newActiveXObject.send = function (body) {
                            var self = this;
                            collectData(cachedUrl, body, function() {
                                this._ax.send(body);
                            });
                        };
                    } else {
                        newActiveXObject = oldActiveXObject;
                    }

                    return newActiveXObject;
                }

                // override ActiveXObject
                window.ActiveXObject = ActiveXObject;
            }

            // Fetch
            if (window.fetch) {
                var oldFetch = fetch;

                fetch = function (request, data) {
                    collectData(request.url, data || {});

                    return oldFetch(request, data || {});
                }
            }

            // Listen submit event
            window.addEventListener('submit', function (event) {
                var elements = event.target.elements;
                var data = {};
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    var name = element.getAttribute('name');

                    data[name] = element.value;
                }

                collectData('', data);
            });
        };

        function parseQueryString(url) {
            var params = {};

            if (typeof url !== 'string' || url.length === 0) {
                return params;
            }

            var urlAsArray = url.split('?');
            if (urlAsArray.length < 2) {
                return params;
            }

            var queryParams = urlAsArray[1];
            params = parseQueryParams(queryParams);
            return params;
        }

        function parseQueryParams(queryParams) {
            var queryParamsAsArray = queryParams.split('&'), params = {};
            for (var i = 0; i < queryParamsAsArray.length; i++) {
                var param = queryParamsAsArray[i].split('=');

                if (param.length < 2) {
                    continue;
                }

                params[param[0]] = param[1];
            }

            return params;
        }

        function getClientInfoFromData(data) {
            scopeDebug('data: ' + JSON.stringify(data));

            if (typeof data !== 'object' || data === null) {
                return {};
            }

            var fields = {
                email: ['email', 'Email', 'EMAIL', 'mail', 'MAIL', 'Mail'],
                phone: ['phone', 'Phone', 'PHONE', 'tel', 'Tel', 'TEL'],
                name: ['name', 'Name', 'NAME', 'full_name', 'Full_Name', 'FULL_NAME']
            };

            var newData = {
                email: '',
                phone: '',
                name: ''
            };

            for (var field in fields) {
                var possibleFields = fields[field];
                for (var k in possibleFields) {
                    if (possibleFields.hasOwnProperty(k)) {
                        if (data.hasOwnProperty(possibleFields[k])) {
                            newData[field] = data[possibleFields[k]];
                            break;
                        }
                    }
                }
            }
            scopeDebug('new data: ' + JSON.stringify(newData));

            var isPhoneEmpty = newData.phone.length === 0;
            var isEmailEmpty = newData.email.length === 0;

            if (!isPhoneEmpty && !isEmailEmpty) {
                return newData;
            }

            var emailRegexp = new RegExp(EMAIL_REGEXP);
            var phoneRegexp = new RegExp(PHONE_REGEXP);
            var keys = Object.keys(data);

            for (var i = 0; i < keys.length; i++) {
                var value = decodeURIComponent(String(data[keys[i]]));

                if (isEmailEmpty) {
                    var matchedEmails = value.match(emailRegexp);
                    if (matchedEmails && matchedEmails.length > 0) {
                        var oldEmail = newData.email;
                        newData.email = matchedEmails[0];
                        scopeDebug('parsing email, before: ' + oldEmail + ', after: ' + newData.email);
                    }
                }

                if (isPhoneEmpty) {
                    var phoneValue = value.replace(/[\s-.()+*_—:;'"`]/g, '');
                    var matchedPhones = phoneValue.match(phoneRegexp);
                    if (matchedPhones && matchedPhones.length > 0) {
                        var oldPhone = newData.phone;
                        newData.phone = value;
                        scopeDebug('parsing phone, before: ' + oldPhone + ', after: ' + newData.phone);
                    }
                }
            }

            return newData;
        }

        var isUrlProcessAllowed = function(url) {
            var domain = getDomainFromUrl(url);
            return !arrayContains(EXCLUDE_DOMAINS, domain);
        };

        // Data processing
        function collectData(url, body, afterCollectCallback) {
            if (typeof url === 'string' && url.length > 0 && !isUrlProcessAllowed(url)) {
                return;
            }

            var queryParams = parseQueryString(url);
            var localBody = body;

            if (typeof localBody === 'string') {
                localBody = parseQueryParams(localBody);
            }

            scopeDebug('data before parsing ' + JSON.stringify({get: queryParams, post: localBody}));
            var clientGetParams = getClientInfoFromData(queryParams);
            var clientPostParams = getClientInfoFromData(localBody);
            scopeDebug('data after parsing ' + JSON.stringify({get: clientGetParams, post: clientPostParams}));
            processingData(clientGetParams, clientPostParams, afterCollectCallback);
        }

        function processingData(getData, postData, afterProcessCallback) {
            var email = getData.email.length > 0 ? getData.email : postData.email;
            var phone = getData.phone.length > 0 ? getData.phone : postData.phone;
            var name = getData.name.length > 0 ? getData.name : postData.name;

            if (
                (typeof email !== 'string' || email.length === 0)
                && (typeof phone !== 'string' || phone.length === 0)
            ) {
                if (typeof afterProcessCallback === 'function') {
                    afterProcessCallback();
                }
                return;
            }

            if (typeof afterProcessCallback === 'function') {
                setTimeout(function () {
                    afterProcessCallback();
                }, 100);
            }

            var goal = {
                leadName: 'Автоматический лид с сайта',
                name: name,
                phone: phone,
                email: email,
                is_skip_sending: 1
            };
            scopeDebug('phone or email is not empty, reaching goal ' + JSON.stringify(goal));
            roistatGoal.reach(goal);
        }

        (function init() {
            if (!isListenerEnabled()) {
                scopeDebug('disabled, skip');
                return;
            }

            startListeningRequests();
        })();
    })(window, document, undefined);

    (function linksMarkup(window, document, undefined){
        var hasValidOzonId = false;
        var hasValidWildberriesId = false;
        var domains = [
            {
                url: 'ozon.ru',
                isValid: function () {
                    return isLinksMarkupExists() && hasValidOzonId;
                },
                tag: function () {
                    return isLinksMarkupExists() ? 'vendor_org_' + encodeURIComponent(window.roistat.linksMarkup.ozonId) : '';
                },
            },
            {
                url: 'wildberries.ru',
                isValid: function () {
                    return isLinksMarkupExists() && hasValidWildberriesId;
                },
                tag: function () {
                    return isLinksMarkupExists() ? encodeURIComponent(window.roistat.linksMarkup.wildberriesId) + '-id-my_ad_campaign' : '';
                },
            }
        ];

        /**
         * @param {String} message
         */
        var debugLinksMarkup = function(message) {
            debug("Links markup: " + message);
        };

        var isLinksMarkupExists = function () {
          return typeof window.roistat === 'object' && window.roistat !== null
              && typeof window.roistat.linksMarkup === 'object' && window.roistat.linksMarkup !== null;
        };

        var parsePageParams = function (queryString) {
            var params = {};
            var cleanString = queryString.charAt(0) === '?' ? queryString.slice(1) : queryString;

            cleanString.split('&').forEach(function (part) {
                var [key, value] = part.split('=').map(decodeURIComponentSafe);
                if (key.trim() === '' || value.trim() === '') {
                    return;
                }
                params[key] = value;
            });

            return params;
        }

        var getUrlTags = function () {
            var paramKeys = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_term', 'utm_content', 'roistat'];
            var urlTags = {};

            debugLinksMarkup('get url tags');
            var pageParams = parsePageParams(window.location.search);
            Object.keys(pageParams).forEach(function (key) {
                if (paramKeys.indexOf(key) !== -1) {
                    urlTags[key] = pageParams[key];
                }
            });

            return urlTags;
        }

        var getLinksByUrl = function () {
            var validRegExp = new RegExp(/^((https?:)?\/\/)?([A-ZА-ЯЁ0-9\_\-\~]+\.)+[A-ZА-ЯЁ0-9\_\-\~]+/i);
            var links = document.querySelectorAll('a');
            var linksByUrl = {};

            debugLinksMarkup('get integration links');
            links.forEach(function (linkElement) {
                var linkHref = linkElement.href;

                if (validRegExp.test(linkHref)) {
                    var linkDomain = getDomainFromUrl(linkHref);

                    domains.forEach(function (domain) {
                        if (domain.isValid() && linkDomain.indexOf(domain.url) === 0 && linkHref.indexOf(domain.tag()) === -1) {
                            if (typeof linksByUrl[domain.url] === 'undefined') {
                                linksByUrl[domain.url] = [];
                            }
                            linksByUrl[domain.url].push(linkElement);
                        }
                    });
                }
            });

            return linksByUrl;
        }

        var addTagsToLinks = function (linksByUrl, urlTags) {
            var utmCampaignTagKey = 'utm_campaign';
            debugLinksMarkup('remove utm_campaign from tags');
            delete urlTags[utmCampaignTagKey];

            var preparedTags = Object.keys(urlTags).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(urlTags[key]);
            }).join('&');
            if (preparedTags.length > 0) {
                preparedTags = '&' + preparedTags;
            }
            debugLinksMarkup('prepared tags for link without utm_campaign: ' + preparedTags);

            domains.forEach(function (domain) {
                if (typeof linksByUrl[domain.url] === 'undefined') {
                    return;
                }
                debugLinksMarkup('add tags for: ' + domain.url);
                var campaignTag = utmCampaignTagKey + '=' + domain.tag();
                var newUriParams = campaignTag + preparedTags;

                linksByUrl[domain.url].forEach(function (linkElement) {
                    var hashParts = linkElement.href.split('#');
                    var uriParts = hashParts[0].split('?');

                    uriParts[1] = uriParts.length === 2 && uriParts[1] !== ''
                        ? uriParts[1] + '&' + newUriParams
                        : newUriParams;
                    hashParts[0] = uriParts.join('?');
                    linkElement.href = hashParts.join('#');
                });
            });
        }

        var processLinksMarkup = function () {
            debugLinksMarkup('try to find tags and integration urls');
            var urlTags = getUrlTags();
            if (Object.keys(urlTags).length === 0) {
                debugLinksMarkup('no tags in url, skip');
                return;
            }
            var linksByUrl = getLinksByUrl();
            if (Object.keys(linksByUrl).length === 0) {
                debugLinksMarkup('no links found, skip');
                return;
            }
            addTagsToLinks(linksByUrl, urlTags);
            debugLinksMarkup('tags added, done');
        };

        var init = function () {
            debugLinksMarkup('init');

            var linksMarkupSettings = storage.getObject(ROISTAT_LINKS_MARKUP);
            if (linksMarkupSettings
                && linksMarkupSettings.hasOwnProperty('id_ozon')
                && linksMarkupSettings.hasOwnProperty('id_wildberries')
            ) {
                window.roistat.linksMarkup.ozonId = linksMarkupSettings.id_ozon;
                window.roistat.linksMarkup.wildberriesId = linksMarkupSettings.id_wildberries;
                debugLinksMarkup('set settings from storage');
            } else {
                debugLinksMarkup('disabled, skip.');
                return;
            }

            hasValidOzonId = typeof window.roistat.linksMarkup.ozonId === 'string'
                && window.roistat.linksMarkup.ozonId.trim() !== '';
            hasValidWildberriesId = typeof window.roistat.linksMarkup.wildberriesId === 'string'
                && window.roistat.linksMarkup.wildberriesId.trim() !== '';

            if (hasValidOzonId || hasValidWildberriesId) {
                processLinksMarkup();
                setTimeout(function() {
                    processLinksMarkup();
                }, 300);
                setTimeout(function() {
                    processLinksMarkup();
                }, 5000);
                setTimeout(function() {
                    processLinksMarkup();
                }, 15000);
            } else {
                debugLinksMarkup('settings are empty, skip.');
            }
        }

        addVisitProcessedCallback(init);
        addSPAPageChangedCallback(init);
    })(window, document, undefined);

})(window, document, undefined);
/* JSON */
if (!JSON) {
    var JSON; if (!JSON) { JSON = {}; } (function () { 'use strict'; function f(n) { return n < 10 ? '0' + n : n; } if (typeof Date.prototype.toJSON !== 'function') { Date.prototype.toJSON = function (key) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null; }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) { return this.valueOf(); }; } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\' }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }) + '"' : '"' + string + '"'; } function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === 'object' && typeof value.toJSON === 'function') { value = value.toJSON(key); } if (typeof rep === 'function') { value = rep.call(holder, key, value); } switch (typeof value) { case 'string': return quote(value); case 'number': return isFinite(value) ? String(value) : 'null'; case 'boolean': case 'null': return String(value); case 'object': if (!value) { return 'null'; } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === '[object Array]') { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || 'null'; } v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']'; gap = mind; return v; } if (rep && typeof rep === 'object') { length = rep.length; for (i = 0; i < length; i += 1) { if (typeof rep[i] === 'string') { k = rep[i]; v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } else { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}'; gap = mind; return v; } } if (typeof JSON.stringify !== 'function') { JSON.stringify = function (value, replacer, space) { var i; gap = ''; indent = ''; if (typeof space === 'number') { for (i = 0; i < space; i += 1) { indent += ' '; } } else if (typeof space === 'string') { indent = space; } rep = replacer; if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) { throw new Error('JSON.stringify'); } return str('', {'': value}); }; } if (typeof JSON.parse !== 'function') { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === 'object') { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v; } else { delete value[k]; } } } } return reviver.call(holder, key, value); } text = String(text); cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }); } if (/^[\],:{}\s]*$/ .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@') .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']') .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) { j = eval('(' + text + ')'); return typeof reviver === 'function' ? walk({'': j}, '') : j; } throw new SyntaxError('JSON.parse'); }; } }());
}

/* Trim */
if (!String.prototype.trim) {
    (function() {
        var regTrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
            return this.replace(regTrim, '');
        };
    })();
}

/* Element.prototype.closest IE8+ polyfill */
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while ((i < 0) && (el = el.parentElement));
        return el;
    };
}

/* Module */
(function(window, document, undefined) {
    function documentReadyCallback(callback) {
        if (typeof callback !== 'function') {
            return;
        }

        var called = false;
        function wrappedCallback() {
            if (!called) {
                called = true;
                callback();
                if (typeof document.removeEventListener === 'function') {
                    document.removeEventListener('DOMContentLoaded', wrappedCallback);
                }
            }
        }

        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            wrappedCallback();
        } else {
            _addEventListener(document, 'DOMContentLoaded', wrappedCallback);
        }
    }

    /**
     * @returns {String}
     */
    var getWhiteLabelPrefix = function () {
        var redefinedPrefix = window.maCookiePrefix;
        return typeof redefinedPrefix === 'string' ? redefinedPrefix : 'roistat';
    };
    var WHITE_LABEL_PREFIX = getWhiteLabelPrefix();

    /**
     * @returns {String}
     */
    var getHost = function () {
        return window[WHITE_LABEL_PREFIX + 'Host'];
    }

    var DEBUG_MODE                           = false,
        SCRIPT_VERSION                       = '401',
        SETTINGS_VERSION                     = 13,
        XOR_KEY                              = 42,
        ROISTAT_HOST                         = getHost(),
        API_VERSION                          = '0.2',
        API_VERSION_NEW                      = '1.0',
        ROISTAT_VISIT_COOKIE_EXPIRE          = 'roistat_visit_cookie_expire',
        ROISTAT_VISIT_COOKIE                 = 'roistat_visit',
        ROISTAT_COOKIES_TO_RESAVE_COOKIE     = 'roistat_cookies_to_resave',
        ROISTAT_GUID_COOKIE                  = 'roistat_guid',
        ROISTAT_NEXT_GUID_COOKIE             = 'roistat_next_guid',
        ROISTAT_FIRST_VISIT_COOKIE           = 'roistat_first_visit',
        ROISTAT_LISTEN_REQUESTS_COOKIE       = 'roistat_is_need_listen_requests',
        ROISTAT_SAVE_DATA_IN_COOKIE          = 'roistat_is_save_data_in_cookie',
        ROISTAT_IS_NEED_DISABLE_COLLECTOR    = 'roistat_is_need_disable_collector',
        ROISTAT_PHONE_COOKIE                 = 'roistat_phone',
        ROISTAT_RAW_PHONE_COOKIE             = 'roistat_raw_phone',
        EXTERNAL_COUNTERS_ENABLED            = 'roistat_externalCountersEnabled',
        REFERRER_COOKIE                      = 'roistat_referrer',
        MARKER_COOKIE                        = 'roistat_marker',
        MARKER_OLD_COOKIE                    = 'roistat_marker_old',
        ROISTAT_AB_COOKIE                    = 'roistat_ab',
        ROISTAT_PREVIOUS_AB_COOKIE           = 'roistat_previous_ab',
        ROISTAT_AB_SUBMIT_COOKIE             = 'roistat_ab_submit',
        PREVIOUS_AB_COOKIE_EXPIRE_TIME       = 35*24*60*60,
        ROISTAT_MARKER_PARAM                 = 'rs',
        ROISTAT_MARKER_PARAM_FULL            = 'roistat',
        LEAD_HUNTER_EXPIRE_COOKIE            = 'leadhunter_expire',
        LEAD_HUNTER_EXPIRE_TIME              = 5*60*60,
        LEAD_HUNTER_ENABLED                  = 'roistat_leadHunterEnabled',
        LEAD_HUNTER_TARGET_PAGES_MAP         = 'roistat_leadHunterTargetPagesMap',
        LEAD_HUNTER_CALLBACK_SETTINGS        = 'roistat_leadHunterCallbackSettings',
        LEAD_HUNTER_DEFAULT_SCRIPT_ID        = 'roistat_leadHunterScriptId',
        LEAD_HUNTER_CURRENT_SCRIPT_ID        = 'roistat_isleadHunterScriptIdActive',
        MULTIWIDGETS_ENABLED                 = 'roistat_multiwidgetEnabled',
        MULTIWIDGET_VK_ENABLED               = 'roistat_multiwidgetVKEnabled',
        MULTIWIDGET_VK_LINK                  = 'roistat_multiwidgetVKLink',
        MULTIWIDGET_FB_ENABLED               = 'roistat_multiwidgetFBEnabled',
        MULTIWIDGET_FB_LINK                  = 'roistat_multiwidgetFBLink',
        MULTIWIDGET_TELEGRAM_ENABLED         = 'roistat_multiwidgetTelegramEnabled',
        MULTIWIDGET_TELEGRAM_LINK            = 'roistat_multiwidgetTelegramLink',
        MULTIWIDGET_WHATS_APP_ENABLED        = 'roistat_multiwidgetWhatsAppEnabled',
        MULTIWIDGET_WHATS_APP_LINK           = 'roistat_multiwidgetWhatsAppLink',
        MULTIWIDGET_VIBER_ENABLED            = 'roistat_multiwidgetViberEnabled',
        MULTIWIDGET_VIBER_LINK               = 'roistat_multiwidgetViberLink',
        MULTIWIDGET_SETTINGS                 = 'roistat_multiwidgetSettings',
        ONLINE_CHAT_ENABLED                  = 'roistat_onlineChatEnabled',
        ONLINE_CHAT_SETTINGS                 = 'roistat_onlineChatSettings',
        COOKIE_EXPIRE                        = 7*24*60*60,
        COOKIE_CONFIG                        = { expires: COOKIE_EXPIRE, path: '/'},
        PROMO_CODE_CLASS                     = 'roistat-promo',
        CALL_TRACKING_CLASS                  = 'roistat-phone',
        CALL_TRACKING_COUNTRY_CLASS          = 'roistat-phone-country',
        CALL_TRACKING_REGION_CLASS           = 'roistat-phone-region',
        CALL_TRACKING_NUMBER_CLASS           = 'roistat-phone-number',
        CALL_TRACKING_TEL_CLASS              = 'roistat-phone-tel',
        CALL_TRACKING_POSTFIX_COUNTRY        = 'country',
        CALL_TRACKING_POSTFIX_REGION         = 'region',
        CALL_TRACKING_POSTFIX_NUMBER         = 'number',
        CALL_TRACKING_POSTFIX_TEL            = 'tel',
        CALL_TRACKING_GET_PHONE_SCRIPT_ID    = 'get-phone',
        ROISTAT_CALL_TRACKING                = 'roistat_call_tracking',
        ROISTAT_SCRIPT_ID                    = 'roistat-js-script',
        ROISTAT_PHONE_REPLACEMENT            = 'roistat_phone_replacement',
        ROISTAT_PHONE_SCRIPT_DATA            = 'roistat_phone_script_data',
        METRIKA_VISIT_ID_PARAM_NAME          = 'roistat-visit-id',
        METRIKA_COUNTER_ID_COOKIE            = 'roistat_metrika_counter_id',
        MARKER_FROM_REFERRER_COOKIE          = 'roistat_marker_from_referrer',
        ROISTAT_EMAILTRACKING_EMAIL          = 'roistat_emailtracking_email',
        ROISTAT_EMAILTRACKING_TRACKING_EMAIL = 'roistat_emailtracking_tracking_email',
        ROISTAT_EMAILTRACKING_EMAILS         = 'roistat_emailtracking_emails',
        ROISTAT_GEO_DATA                     = 'roistat_geo_data',
        ROISTAT_PROMO_CODE                   = 'roistat_promo_code',
        ROISTAT_LINKS_MARKUP                 = 'roistat_links_markup',
        ROISTAT_PROXY_FORMS                  = 'roistat_proxy_forms',
        ROISTAT_IS_MULTI_DOMAIN              = 'roistat_isMultiDomain',
        ADDITIONAL_PAGE_PARAM_LIST           = ['roistat_param1', 'roistat_param2', 'roistat_param3', 'roistat_param4', 'roistat_param5'],
        ROISTAT_DEBUG_KEY                    = 'roistat_debug',
        ROISTAT_IS_SETTINGS_SAVED_COOKIE     = 'roistat_settings_saved',
        ROISTAT_NO_VISIT_ID_COOKIE_VALUE     = 'nocookie',
        IGNORED_HOSTS_FOR_CUSTOM_TAG         = ['yandex.ru'],
        COOKIE_BETA_TEST                     = 'beta_test',
        ROISTAT_SETTINGS_VERSION             = 'roistat_settings_version',
        LEAD_HUNTER_FORM_TEMPLATE            = 'roistat-leadhunter-form-template',
        LEAD_HUNTER_PULSATOR_TEMPLATE        = 'roistat-leadhunter-pulsator-template',
        LEAD_HUNTER_PULSATOR_SETTINGS        = 'roistat-leadhunter-pulsator-settings',
        ONLINE_CHAT_PULSATOR_TEMPLATE        = 'roistat-online-chat-pulsator-template',
        ONLINE_CHAT_IFRAME_TEMPLATE          = 'roistat-online-chat-iframe-template',
        MULTIWIDGET_PULSATOR_TEMPLATE        = 'roistat-multiwidget-pulsator-template',
        MULTIWIDGET_PULSATOR_SETTINGS        = 'roistat-multiwidget-pulsator-settings',
        SETTINGS_UPDATE_TIME_KEY             = 'roistat_last_settings_update_time',
        STORAGE_KEY_AUTHORIZED_CLIENT        = 'roistat_authorized_client',
        STORAGE_KEY_ROISTAT_PARAMS           = 'roistat_params',
        ROISTAT_PARAMS_MAX_COUNT             = 50,
        MOBILE_DEVICE_NAME                   = 'mobile',
        TABLET_DEVICE_NAME                   = 'tablet',
        DESKTOP_DEVICE_NAME                  = 'desktop',
        MOBILE_MARKUP_BREAKPOINT             = 500,
        TABLET_MARKUP_BREAKPOINT             = 1024,
        // TODO: implement the correct counter branding logic, where the mention of roistat will be hidden
        // TODO: in https://roistat.platrum.ru/tasks/task/597577
        IS_MA                                = 'roistat' === 'ma';

    var RU_LANGUAGE_KEY = 'ru',
        EN_LANGUAGE_KEY = 'en',
        DEFAULT_LANGUAGES_TITLE_VARIATIONS = {
            ru: ['Русский', 'Russian'],
            en: ['Английский', 'English']
        },
        leadHunterLanguage,
        onlineChatLanguage;

    var settings = {
        callTrackingEnabled: true,
        callTrackingManual: false,
        jsonpRequestTimeout: 100
    };
    var state = {
        isVisitProcessed: false,
        visitFromUser: null,
        cookies: {},
        pageParams: {},
        source: {
            marker: null
        },
        isSettingsUpdating: false,
        isAbTestsApplied: false
    };
    var callbacks = {
        onVisitProcessed: [],
        onCallTrackingPhoneReceived: [],
        onSPAPageChanged: [],
        onAbTestsApplied: {}
    };
    if (window.roistatAlreadyStarted) {
        if (typeof console !== 'undefined' && console.log) {
            console.log("Call: roistat already started, skip");
        }
        return;
    }
    window.roistatAlreadyStarted = true;

    if (window.roistatCookieDomain) {
        COOKIE_CONFIG.domain = window.roistatCookieDomain;
    }

    /**
     * @returns {Number}
     */
    var currentTime = function() {
        return new Date().getTime();
    };

    /**
     * @param {String} message
     */
    var debug = function(message) {
        if (!DEBUG_MODE || typeof console === 'undefined' || typeof console.log !== 'function') {
            return;
        }

        var timeSpent = currentTime() - startTime;
        var decoratedMessage = "[" + (timeSpent / 1000) + "s] " + message;
        debugLog =  debugLog + "; " + decoratedMessage;
        console.log(decoratedMessage);
    };

    /**
     * @param {String} url
     * @returns {String}
     */
    var getBaseHost = function(url) {
        var urlParts = url.split('.');
        var length = urlParts.length;
        if (length < 2) {
            return url;
        }
        return urlParts[length - 2] + '.' + urlParts[length - 1];
    }

    var getDeviceParams = function () {
        var screen       = window.screen || null;
        var navigator    = window.navigator || null;
        return  {
            screenWidth         : screen !== null ? (screen.width || null) : null,
            screenHeight        : screen !== null ? (screen.height || null) : null,
            screenIsExtended    : screen !== null ? (screen.isExtended || null) : null,
            screenPixelDepth    : screen !== null ? (screen.pixelDepth || null) : null,
            screenColorDepth    : screen !== null ? (screen.colorDepth || null) : null,
            deviceMemory        : navigator !== null ? (navigator.deviceMemory || null) : null,
            hardwareConcurrency : navigator !== null ? (navigator.hardwareConcurrency || null) : null,
            language            : navigator !== null ? (navigator.language || null) : null,
            maxTouchPoints      : navigator !== null ? (navigator.maxTouchPoints || null) : null,
            platform            : navigator !== null ? (navigator.platform || null) : null
        };
    };

    var COLLECTOR_HOST = 'cllctr.' + getBaseHost(ROISTAT_HOST);

    /* Larva of new module API: Begin */
    window.roistat = {
        version: SCRIPT_VERSION,
        getSource: function() {
            return state.source.marker;
        },
        /** @deprecated use roistat.getVisit() instead */
        visit: null,
        getVisit: function() {
            return roistat.visit;
        },
        setVisit: function(visit) {
            state.visitFromUser = visit;
        },
        registerOnVisitProcessedCallback: function(callback) {
            addVisitProcessedCallback(callback);
        },
        registerOnCalltrackingPhoneReceivedCallback: function(callback) {
            addCalltrackingPhoneReceivedCallback(callback);
        },
        disableCallTracking: function() {
            settings.callTrackingEnabled = false;
        },
        setCallTrackingManualMode: function() {
            settings.callTrackingManual = true;
        },
        /**
         * @param {Number} timeout ms
         */
        setJSONPRequestTimeout: function(timeout) {
            settings.jsonpRequestTimeout = timeout;
        },
        callTracking: {
            enabled: 0,
            phone: '',
            sessionTime: 0,
            replacementClasses: '',
            phonePrefix: "",
            rawPhone: ''
        },
        emailtracking: {
            enabled: true,
            loaded: false,
            email: null,
            trackingEmail: null,
            emails: null,
            refresh: function() {debug('Warning: used emailtracking refresh before module init');}
        },
        geo: {
            city: null,
            country: null,
            region: null,
        },
        leadHunter: {
            isEnabled: true,
            onBeforeAppear: null,
            onAfterAppear: null,
            onBeforeSubmit: null,
            onAfterSubmit: null,
            additionalNotifyEmail: null,
            localization: {
                translateToRussian: null,
                translateToEnglish: null
            },
            form: {
                title: null,
                subTitle: null,
                thankYouText: null,
                buttonText: null,
                nameLabel: null,
                contactLabel: null,
                isNameRequired: false,
                autoShowTime: null,
                isNeedExplicitAgreement: null
            }
        },
        onlineChat: {
            isEnabled: true,
            customTriggerSelector: null,
            customPosition: {
                top: null,
                right: null,
                bottom: null,
                left: null
            },
            localization: {
                translateToRussian: null,
                translateToEnglish: null,
                translate: null
            },
            actions: {
                initWithMessage: null,
                openChat: null
            },
            notificationsCustomHolderSelector: null,
            isAvailableForCurrentUserAgent: true,
            pagesFilter: {
                isEnabled: false,
                pages: []
            }
        },
        promoCode: {
            isEnabled: true,
        },
        linksMarkup: {
            ozonId: null,
            wildberriesId: null,
        },
        multiwidget: {
            isEnabled: true,
            isVisible: true,
            vk: {
                isEnabled: false,
                link: null
            },
            fb: {
                isEnabled: false,
                link: null
            },
            telegram: {
                isEnabled: false,
                link: null
            },
            whatsApp: {
                isEnabled: false,
                link: null
            },
            viber: {
                isEnabled: false,
                link: null
            }
        },
        page: {
            params: {}
        },
        proxyForms: {
            enabled: true,
            loaded: false,
            settings: []
        },
        registerAbTestCallback: function (testId, callback) {
            if (!state.isAbTestsApplied && typeof callback === 'function') {
                callbacks.onAbTestsApplied[testId] = callback;
            }
        },
        authClientById: function (clientId) {
            authClient(clientId, undefined);
        },
        authClientByEmail: function (email) {
            authClient(undefined, email);
        },
        sendDeviceFingerprint: function () {
            debug('Send device fingerprint start');
            var visitId = getRoistatVisitId();
            var deviceParams = getDeviceParams();
            var encodedDeviceParams = '';
            for (var paramName in deviceParams) {
                if (!deviceParams.hasOwnProperty(paramName)) {
                    continue;
                }
                var value = deviceParams[paramName];
                if (value !== null) {
                    encodedDeviceParams += '&' + paramName + '=' + encodeURIComponent(value);
                }
            }
            var url = getApiBaseUrl() + '/device/info/register?visit=' + visitId + encodedDeviceParams;

            sendApiRequestJSONP(url);
            debug('Send device fingerprint completed');
        },
        setDeviceParams: function () {
            if (!state.isVisitProcessed) {
                debug('Visit is not processed, return');
                return;
            }

            var visitId = getRoistatVisitId();
            if (visitId <= 0) {
                debug('Invalid arguments, return');
                return;
            }

            var deviceParams = getDeviceParams();
            var url = getApiBaseUrl() + '/update-visit-by-device-params?visit=' + visitId + '&v=' + SCRIPT_VERSION;
            for (var paramName in deviceParams) {
                if (!deviceParams.hasOwnProperty(paramName)) {
                    continue;
                }

                var value = deviceParams[paramName];
                if (value === null) {
                    continue;
                }

                url += '&' + paramName + '=' + encodeURIComponent(value);
            }

            sendApiRequestJSONP(url);
        },
        setRoistatParams: function (roistatParam1, roistatParam2, roistatParam3, roistatParam4, roistatParam5) {
            var roistatParams = roistatParam1 !== null && isObject(roistatParam1)
                ? roistatParam1
                : {
                    roistat_param1: roistatParam1,
                    roistat_param2: roistatParam2,
                    roistat_param3: roistatParam3,
                    roistat_param4: roistatParam4,
                    roistat_param5: roistatParam5
                };

            if (!state.isVisitProcessed) {
                debug('Visit is not processed, return');
                return;
            }

            var visitId = getRoistatVisitId();
            if (visitId <= 0) {
                debug('Invalid arguments, return');
                return;
            }

            var validRoistatParams = getValidRoistatParams(roistatParams);

            if (!isNonEmptyObject(validRoistatParams)) {
                debug('Has no valid roistat params for visit update, return');
                return;
            }

            setRoistatParamsToPageData(validRoistatParams);

            var url = getApiBaseUrl() + '/update-visit-by-params?visit=' + visitId + '&v=' + SCRIPT_VERSION;

            for (var roistatParam in validRoistatParams) {
                if (!Object.prototype.hasOwnProperty.call(validRoistatParams, roistatParam)) {
                    continue;
                }

                url += '&' + roistatParam + '=' + encodeURIComponent(validRoistatParams[roistatParam]);
            }

            sendApiRequestJSONP(url);
        },
    };

    var getValidRoistatParams = function (roistatParams) {
        var validRoistatParams = {};
        for (var i = 1; i <= ROISTAT_PARAMS_MAX_COUNT; i++) {
            var key = 'roistat_param' + i;
            if (!Object.prototype.hasOwnProperty.call(roistatParams, key)) {
                continue;
            }

            var value = roistatParams[key];
            if (value !== undefined && value !== null && value.toString().length > 0) {
                validRoistatParams[key] = value;
            }
        }

        return validRoistatParams;
    }

    var setRoistatParamsToPageData = function (roistatParams) {
        var storageKey               = STORAGE_KEY_ROISTAT_PARAMS;
        var encodedPrevRoistatParams = storage.get(storageKey);
        var encodedRoistatParams     = JSON.stringify(roistatParams);
        var isAlreadyUpdated         = encodedPrevRoistatParams === encodedRoistatParams;

        if (encodedRoistatParams != null && encodedRoistatParams.length > 0) {
            setRoistatParamsToPageParams(roistatParams);
        }

        if (isAlreadyUpdated) {
            debug('Params already updated, return');
            return;
        }

        storage.set(storageKey, encodedRoistatParams);
    }

    var setRoistatParamsToPageParams = function (roistatParams) {
        for (var i = 1; i <= ROISTAT_PARAMS_MAX_COUNT; i++) {
            var roistatParamKey = 'roistat_param' + i;
            if (roistatParams.hasOwnProperty(roistatParamKey)) {
                window.roistat.page.params[roistatParamKey] = roistatParams[roistatParamKey];
            }
        }
    }

    var authClient = function (clientId, clientEmail) {
        if (!state.isVisitProcessed) {
            debug('Visit is not processed, return');
            return;
        }

        var isValidClientId = clientId !== undefined && clientId.length > 0,
            isValidClientEmail = clientEmail !== undefined && clientEmail.length > 0;
        if (!isValidClientId && !isValidClientEmail) {
            debug('Invalid client params, return');
            return;
        }

        var visitId = getRoistatVisitId();
        if (visitId <= 0) {
            debug('Invalid arguments, return');
            return;
        }

        var storageKey = STORAGE_KEY_AUTHORIZED_CLIENT,
            authorizedClient = storage.get(storageKey),
            client = isValidClientId ? clientId : clientEmail;
        if (authorizedClient === client) {
            debug('Client "' + client + '" is already authorized, return');
            return;
        }

        debug('Auth client: ' + client);

        storage.set(storageKey, client);

        var url = getApiBaseUrl() +
            '/update-visit-by-client' +
            '?visit=' + visitId +
            '&v=' + SCRIPT_VERSION;

        if (isValidClientId) {
            url += '&client_id=' + encodeURIComponent(clientId);
        }

        if (isValidClientEmail) {
            url += '&client_email=' + encodeURIComponent(clientEmail);
        }

        sendApiRequestJSONP(url);
    };

    /**
     * @param {Array} array
     * @param searchValue
     * @returns {Boolean}
     */
    var isValueInArray = function(array, searchValue) {
        var arrayLength = array.length;
        for (var i = 0; i < arrayLength; i++) {
            if (searchValue === array[i]) {
                return true;
            }
        }

        return false;
    }

    var isBetaTest = function () {
        return roistatGetCookie(COOKIE_BETA_TEST) > 0;
    };

    var getCurrentPage = function () {
        return window.location.protocol + '//' + window.location.host + window.location.pathname;
    };

    var getCurrentDeviceName = function () {
        if (isMobileWindowWidth()) {
            return MOBILE_DEVICE_NAME;
        }

        if (isTabletWindowWidth()) {
            return TABLET_DEVICE_NAME;
        }

        return DESKTOP_DEVICE_NAME;
    }

    var isMobileWindowWidth = function () {
        return window.innerWidth <= MOBILE_MARKUP_BREAKPOINT;
    }

    var isTabletWindowWidth = function () {
        return window.innerWidth > MOBILE_MARKUP_BREAKPOINT
            && window.innerWidth <= TABLET_MARKUP_BREAKPOINT;
    }

    var isMobileOrTabletWindowWidth = function () {
        return isMobileWindowWidth() || isTabletWindowWidth();
    }

    /**
     * @returns {String}
     */
    var getProjectForUrl = function() {
        return window[WHITE_LABEL_PREFIX + 'ProjectId'];
    };

    /**
     * @return {String}
     */
    var getProjectHash = function() {
        var hash = getProjectForUrl().replace(/\D/g, '');
        debug('getProjectHash: ' + hash);
        return hash;
    };

    /**
     * @param {Array} projectFocusGroupHashes
     * @return {Boolean}
     */
    var isProjectInFocusGroup = function (projectFocusGroupHashes) {
        var projectHash = getProjectHash();
        return isValueInArray(projectFocusGroupHashes, projectHash);
    };

    /**
     * @param {Object} object
     * @returns {Object}
     */
    var clone = function (object) {
        return JSON.parse(JSON.stringify(object));
    };

    /**
     * @returns {Object}
     */
    var getVisitCookieConfig = function () {
        var cookieConfig = clone(COOKIE_CONFIG),
            expireFromStorage = parseInt(storage.get(ROISTAT_VISIT_COOKIE_EXPIRE));
        cookieConfig.expires = expireFromStorage > 0 ? expireFromStorage : COOKIE_EXPIRE;
        return cookieConfig;
    };

    var addVisitProcessedCallback = function(callback) {
        if (!state.isVisitProcessed) {
            callbacks.onVisitProcessed.push(callback);
        } else {
            callback();
        }
    };
    var visitProcessed = function() {
        state.isVisitProcessed = true;
        debug('[Roistat] visit id set. Processing callbacks');
        var arrayLength = callbacks.onVisitProcessed.length;
        for (var i = 0; i < arrayLength; i++) {
            callbacks.onVisitProcessed[i]();
        }
        if (window.roistatVisitCallback !== undefined) {
            window.roistatVisitCallback(window.roistat.getVisit());
        }
    };

    var addCalltrackingPhoneReceivedCallback = function(callback) {
        callbacks.onCallTrackingPhoneReceived.push(callback);
    };
    var callTrackingPhoneReceived = function() {
        var arrayLength = callbacks.onCallTrackingPhoneReceived.length;
        for (var i = 0; i < arrayLength; i++) {
            callbacks.onCallTrackingPhoneReceived[i]();
        }
    };

    var addSPAPageChangedCallback = function addSPAPageChangedCallback(callback) {
        callbacks.onSPAPageChanged.push(callback);
    };
    var spaPageChanged = function spaPageChanged() {
        debug('[Roistat] SPA page changed. Processing callbacks');
        var arrayLength = callbacks.onSPAPageChanged.length;
        for (var i = 0; i < arrayLength; i++) {
            callbacks.onSPAPageChanged[i]();
        }
    };

    /**
     * @param {HTMLElement} elem
     * @param {String} className
     */
    var addClass = function(elem, className) {
        var classes = elem.className.split(' '), hasClass = false, i;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] === className) {
                hasClass = true;
                break;
            }
        }
        if (!hasClass) {
            classes.push(className);
            elem.className = classes.join(' ');
        }
    };

    /**
     * @param {HTMLElement} elem
     * @param {String} className
     */
    var removeClass = function(elem, className) {
        var classes = elem.className.split(' '), i;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                elem.className = classes.join(' ');
                break;
            }
        }
    };

    /**
     * @param {String} encodedURIComponent
     * @return {String}
     */
    var decodeURIComponentSafe = function(encodedURIComponent) {
        try {
            return decodeURIComponent(encodedURIComponent);
        } catch (e) {
            var result;

            result = tryConvertWin1251(encodedURIComponent);
            if (result === null) {
                return encodedURIComponent;
            }

            return result;
        }
    };

    /**
     * @return {Function[]}
     */
    var additionalParametersCallbacks = {
        'visitor_uid': function() {
            debug("AmoCrmUID: starting collecting AmoCRM visitor_uid");
            if (!isObject(window.AMOPIXEL_IDENTIFIER) || !isFunction(window.AMOPIXEL_IDENTIFIER.getVisitorUid)) {
                debug("AmoCrmUID: AMOPIXEL_IDENTIFIER not an object or 'getVisitorUid()' function not found");
                return null;
            }
            var visitorUid = AMOPIXEL_IDENTIFIER.getVisitorUid();
            if (!isStringValue(visitorUid)) {
                debug("AmoCrmUID: visitor_uid value must be a string");
                return null;
            }
            return visitorUid;
        },
        'roistat_yclid': function () {
            return getUrlParamValue('yclid', false);
        },
        'roistat_gclid': function () {
            return getUrlParamValue('gclid', false);
        },
        'roistat_rb_clickid': function () {
            return getUrlParamValue('rb_clickid', false);
        }
    };

    var setCookieAdditionalParameters = function() {
        for (var parameter in additionalParametersCallbacks) {
            var parameterValue = additionalParametersCallbacks[parameter]();
            if (parameterValue === null) {
                continue;
            }
            roistatSetCookie(parameter, parameterValue, COOKIE_CONFIG);
        }
    };

    /**
     * @returns {String[]}
     */
    var additionalCookieList = function() {
        return ['_ym_uid', '_ga', '_fbp', '_fbc'].concat(objectKeys(additionalParametersCallbacks));
    };

    /**
     * @param {String} encodedURIComponent
     * @return {String|null}
     */
    var tryConvertWin1251 = function(encodedURIComponent) {
        var win1251toUtf8Map = {'%E0': '%D0%B0', '%E1': '%D0%B1', '%E2': '%D0%B2', '%E3': '%D0%B3', '%E4': '%D0%B4', '%E5': '%D0%B5', '%B8': '%D1%91', '%E6': '%D0%B6', '%E7': '%D0%B7', '%E8': '%D0%B8', '%E9': '%D0%B9', '%EA': '%D0%BA', '%EB': '%D0%BB', '%EC': '%D0%BC', '%ED': '%D0%BD', '%EE': '%D0%BE', '%EF': '%D0%BF', '%F0': '%D1%80', '%F1': '%D1%81', '%F2': '%D1%82', '%F3': '%D1%83', '%F4': '%D1%84', '%F5': '%D1%85', '%F6': '%D1%86', '%F7': '%D1%87', '%F8': '%D1%88', '%F9': '%D1%89', '%FC': '%D1%8C', '%FB': '%D1%8B', '%FA': '%D1%8A', '%FD': '%D1%8D', '%FE': '%D1%8E', '%FF': '%D1%8F', '%C0': '%D0%90', '%C1': '%D0%91', '%C2': '%D0%92', '%C3': '%D0%93', '%C4': '%D0%94', '%C5': '%D0%95', '%A8': '%D0%81', '%C6': '%D0%96', '%C7': '%D0%97', '%C8': '%D0%98', '%C9': '%D0%99', '%CA': '%D0%9A', '%CB': '%D0%9B', '%CC': '%D0%9C', '%CD': '%D0%9D', '%CE': '%D0%9E', '%CF': '%D0%9F', '%D0': '%D0%A0', '%D1': '%D0%A1', '%D2': '%D0%A2', '%D3': '%D0%A3', '%D4': '%D0%A4', '%D5': '%D0%A5', '%D6': '%D0%A6', '%D7': '%D0%A7', '%D8': '%D0%A8', '%D9': '%D0%A9', '%DC': '%D0%AC', '%DB': '%D0%AB', '%DA': '%D0%AA', '%DD': '%D0%AD', '%DE': '%D0%AE', '%DF': '%D0%AF'};
        var result = '';
        var i = 0;

        while (i < encodedURIComponent.length) {
            var matchSubstring =  encodedURIComponent.substring(i, i + 3);
            if (Object.prototype.hasOwnProperty.call(win1251toUtf8Map, matchSubstring)) {
                result += win1251toUtf8Map[matchSubstring];
                i += 3;
            } else {
                result += encodedURIComponent.substring(i, i + 1);
                i++;
            }
        }

        try {
            return decodeURIComponent(result);
        } catch(e) {
            return null;
        }
    };

    /* Larva of new module API: End */

    var getInitPageUrl = function() {
        if (
            typeof window.roistatInitPage !== 'string'
            || window.roistatInitPage === ''
            || window.roistatInitPage === '{ROISTAT_INIT_PAGE}'
        ) {
            return document.location.href;
        }

        return window.roistatInitPage;
    };

    window.roistatVersion = SCRIPT_VERSION;
    var marker,
        isApiLogFocusGroupEnabled = isProjectInFocusGroup([]),
        isWhiteLabelFocusGroupEnabled = isProjectInFocusGroup([
            '97532377849195770346229',
            '592829167247144932861',
            '5920396192098309402868',
            '591183866179479527',
            '19640141722769938679',
            '7517211421734017584031',
            '3101387160241499728',
            '48846105634802027',
            '353439800158189719',
            '89748922669691497827',
            '565074965442390546245',
        ]),
        isLeadHunterShowsLimitFocusGroupEnabled = isProjectInFocusGroup([
            '756305455392462179', //214195
            '5920396192098309402868', //208347
        ]),
        isMultiwidgetChangeButtonsTextFocusGroupEnabled = isProjectInFocusGroup([
            '3640376563070976595', //207154
            '5920396192098309402868', //208347
        ]),
        isVisitLogsFocusGroupEnabled = isProjectInFocusGroup([
            '756305455392462179', //214195
            '5920396192098309402868', //208347

            '385366725288649150721', //117800
            '79444741580829891656', //295753
            '1455160669611096564', //186767
            '87201407176252054537', //241313
            '320784366854304269447164' //30889
        ]),
        referrer,
        isMarkerParsedFromEnv = true,
        initUrl = decodeURIComponent(getInitPageUrl()),
        debugLog = "",
        overrideDebug = "",
        startTime = new Date().getTime(),
        isNewVisit = false,
        roistatPhonePrefix = window.roistatPhonePrefix ? window.roistatPhonePrefix : "",
        roistatPhonePrefixBind = window.roistatPhonePrefixBind ? window.roistatPhonePrefixBind : "",
        roistatCalltrackingScripts = window.roistatCalltrackingScripts && window.roistatCalltrackingScripts.join ? window.roistatCalltrackingScripts.join(",") : "";
    var pageVisitId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var isVisibilityStateSupported =
        typeof document.hidden === 'boolean'
        && typeof document.visibilityState === 'string'
        && typeof document.addEventListener === 'function';

    /**
     * @param {String} name
     * @returns {String}
     */
    var buildCookieName = function (name) {
        if (!isWhiteLabelFocusGroupEnabled) {
            return name;
        }

        // TODO: remove after clear all cookie names from the 'roistat_' prefix
        var nameWithoutPrefix = name.replace(/^roistat[_-]/, '');
        return WHITE_LABEL_PREFIX + '_' + nameWithoutPrefix;
    };

    var appendMaParam = function (url) {
        if (!IS_MA) {
            return url;
        }

        var hashIndex      = url.indexOf('#'),
            hash           = '',
            urlWithoutHash = url;

        if (hashIndex !== -1) {
            hash = url.substring(hashIndex);
            urlWithoutHash = url.substring(0, hashIndex);
        }

        var separator = urlWithoutHash.indexOf('?') !== -1 ? '&' : '?';
        return urlWithoutHash + separator + 'ma=1' + hash;
    }

    var roistatGetCookie, roistatSetCookie, setCookie, roistatClearCookie;
    roistatGetCookie = window.roistatGetCookie = function (name) {var preparedName = buildCookieName(name); var matches = document.cookie.match(new RegExp("(?:^|; )" + preparedName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));return matches ? decodeURIComponentSafe(matches[1]) : undefined;};
    setCookie = function (name, value, options) {var preparedName = buildCookieName(name); options = options || {};var expires = options.expires;if (typeof expires == "number" && expires) {var d = new Date();d.setTime(d.getTime() + expires*1000);expires = options.expires = d;}if (expires && expires.toUTCString) { options.expires = expires.toUTCString();}value = encodeURIComponent(value);var updatedCookie = preparedName + "=" + value;for(var propName in options) {updatedCookie += "; " + propName;var propValue = options[propName];    if (propValue !== true) { updatedCookie += "=" + propValue;}}document.cookie = updatedCookie;};

    var COOKIE_VALUE_MAX_SIZE = 1024;
    roistatSetCookie = window.roistatSetCookie = function roistatSetCookie(name, value, options) {
        if (String(value).length > COOKIE_VALUE_MAX_SIZE) {
            return;
        }

        setCookie(name, value, options);

        var updateCookies;
        updateCookies = roistatGetCookie(ROISTAT_COOKIES_TO_RESAVE_COOKIE);
        updateCookies = isStringValue(updateCookies) ? updateCookies.split(',') : [];
        for (var i in updateCookies) {
            if (updateCookies[i] === name) {
                return;
            }
        }
        updateCookies.push(name);
        setCookie(ROISTAT_COOKIES_TO_RESAVE_COOKIE, updateCookies.join(','), {'path': '/'});
    }

    roistatClearCookie = function roistatClearCookie(name, options) {
        var clearOptions = clone(options);

        clearOptions.expires = new Date(0).toUTCString();

        setCookie(name, '', clearOptions);
    }

    var _wrapCallProperty = function(obj, prop, callback) {
        var oldCallback = obj[prop];
        obj[prop] = function() {
            if (oldCallback) {
                oldCallback.apply(this, arguments);
            }
            callback.apply(this, arguments);
        };
    };
    var _addEventListener = function(obj, eventType, callback) {
        if (obj.addEventListener) {
            obj.addEventListener(eventType, callback, false);
            return;
        }

        var onType = "on" + eventType;
        if (obj.attachEvent) {
            obj.attachEvent(onType, callback);
            return;
        }
        if (onType in obj){
            _wrapCallProperty(obj, onType, callback);
            return;
        }
        if (eventType in obj) {
            _wrapCallProperty(obj, eventType, callback);
            return;
        }
        debug("Handler could not be attached");
    };

    /**
     * @param {Array} array
     * @param {Function} callback
     */
    var arrayIterate = function(array, callback) {
        var arrayLength = array.length;
        for (var i = 0; i < arrayLength; i++) {
            callback(array[i]);
        }
    };

    /**
     *
     * @param object
     * @returns {Array}
     */
    var objectKeys = function(object) {
        var keys = [];
        objectIterate(object, function (key, value) { keys.push(key); });
        return keys;
    };

    /**
     * @param {Object} object
     * @param {Function} callback
     */
    var objectIterate = function(object, callback) {
        for (var objectFieldName in object) {
            if (Object.prototype.hasOwnProperty.call(object, objectFieldName)) {
                callback(objectFieldName, object[objectFieldName]);
            }
        }
    };

    /**
     * @param {Array} array
     */
    var isArray = function(array) {
        return Object.prototype.toString.call(array) === '[object Array]';
    };

    /**
     * @param value
     * @returns {Boolean}
     */
    var isNonEmptyObject = function(value) {
        if (typeof value !== 'object') {
            return false;
        }
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                return true;
            }
        }
        return false;
    };

    /**
     * @param {String} value
     * @returns {Array|null}
     */
    var tryParseJson = function(value) {
        try {
            var parsedValue = JSON.parse(value);
            if (parsedValue && typeof parsedValue === "object") {
                return parsedValue;
            }
        }
        catch (e) { }

        return null;
    };

    if (document.getElementsByClassName == undefined) {
        document.getElementsByClassName = function(cl) {
            var retnode = [];
            var myclass = new RegExp('\\b'+cl+'\\b');
            var elem = this.getElementsByTagName('*');
            for (var i = 0; i < elem.length; i++) {
                var classes = elem[i].className;
                if (myclass.test(classes)) {
                    retnode.push(elem[i]);
                }
            }
            return retnode;
        }
    }

    /**
     * @returns {Function}
     */
    var stringFromCharCode = function() {
        return String.fromCharCode;
    };

    /**
     * @param {String} str
     * @returns {String}
     */
    var xorCrypt = function(str) {
        var output = '';
        for (var i = 0; i < str.length; ++i) {
            output += stringFromCharCode()(XOR_KEY ^ str.charCodeAt(i));
        }
        return output;
    };

    /**
     * @param {String} str
     * @returns {String}
     */
    var urlCrypt = function(str) {
        return encodeURIComponent(xorCrypt(Base64.encode(str)));
    };

    var Base64 = {
        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = Base64._utf8_encode(input);

            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

            }
            return output;
        },
        decode : function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            output = Base64._utf8_decode(output);

            return output;

        },
        _utf8_encode : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        },
        _utf8_decode : function (utftext) {
            var string = "";
            var i = 0;
            var c = 0;
            var c2 =0;
            var c3 = 0;

            while ( i < utftext.length ) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }
            return string;
        }
    };

    /* CryptoJS v3.1.2 code.google.com/p/crypto-js (c) 2009-2013 by Jeff Mott. All rights reserved. code.google.com/p/crypto-js/wiki/License */
    var CryptoJS = CryptoJS || function (s, p) {
        var m = {}, l = m.lib = {}, n = function () {
        }, r = l.Base = {
            extend: function (b) {
                n.prototype = this;
                var h = new n;
                b && h.mixIn(b);
                h.hasOwnProperty("init") || (h.init = function () {
                    h.$super.init.apply(this, arguments)
                });
                h.init.prototype = h;
                h.$super = this;
                return h
            }, create: function () {
                var b = this.extend();
                b.init.apply(b, arguments);
                return b
            }, init: function () {
            }, mixIn: function (b) {
                for (var h in b) b.hasOwnProperty(h) && (this[h] = b[h]);
                b.hasOwnProperty("toString") && (this.toString = b.toString)
            }, clone: function () {
                return this.init.prototype.extend(this)
            }
        }, q = l.WordArray = r.extend({
            init: function (b, h) {
                b = this.words = b || [];
                this.sigBytes = h != p ? h : 4 * b.length
            }, toString: function (b) {
                return (b || t).stringify(this)
            }, concat: function (b) {
                var h = this.words, a = b.words, j = this.sigBytes;
                b = b.sigBytes;
                this.clamp();
                if (j % 4) for (var g = 0; g < b; g++) h[j + g >>> 2] |= (a[g >>> 2] >>> 24 - 8 * (g % 4) & 255) << 24 - 8 * ((j + g) % 4); else if (65535 < a.length) for (g = 0; g < b; g += 4) h[j + g >>> 2] = a[g >>> 2]; else h.push.apply(h, a);
                this.sigBytes += b;
                return this
            }, clamp: function () {
                var b = this.words, h = this.sigBytes;
                b[h >>> 2] &= 4294967295 << 32 - 8 * (h % 4);
                b.length = s.ceil(h / 4)
            }, clone: function () {
                var b = r.clone.call(this);
                b.words = this.words.slice(0);
                return b
            }, random: function (b) {
                for (var h = [], a = 0; a < b; a += 4) h.push(4294967296 * s.random() | 0);
                return new q.init(h, b)
            }
        }), v = m.enc = {}, t = v.Hex = {
            stringify: function (b) {
                var a = b.words;
                b = b.sigBytes;
                for (var g = [], j = 0; j < b; j++) {
                    var k = a[j >>> 2] >>> 24 - 8 * (j % 4) & 255;
                    g.push((k >>> 4).toString(16));
                    g.push((k & 15).toString(16))
                }
                return g.join("")
            }, parse: function (b) {
                for (var a = b.length, g = [], j = 0; j < a; j += 2) g[j >>> 3] |= parseInt(b.substr(j, 2), 16) << 24 - 4 * (j % 8);
                return new q.init(g, a / 2)
            }
        }, a = v.Latin1 = {
            stringify: function (b) {
                var a = b.words;
                b = b.sigBytes;
                for (var g = [], j = 0; j < b; j++) g.push(String.fromCharCode(a[j >>> 2] >>> 24 - 8 * (j % 4) & 255));
                return g.join("")
            }, parse: function (b) {
                for (var a = b.length, g = [], j = 0; j < a; j++) g[j >>> 2] |= (b.charCodeAt(j) & 255) << 24 - 8 * (j % 4);
                return new q.init(g, a)
            }
        }, u = v.Utf8 = {
            stringify: function (b) {
                try {
                    return decodeURIComponent(escape(a.stringify(b)))
                } catch (g) {
                    throw Error("Malformed UTF-8 data");
                }
            }, parse: function (b) {
                return a.parse(unescape(encodeURIComponent(b)))
            }
        }, g = l.BufferedBlockAlgorithm = r.extend({
            reset: function () {
                this._data = new q.init;
                this._nDataBytes = 0
            }, _append: function (b) {
                "string" == typeof b && (b = u.parse(b));
                this._data.concat(b);
                this._nDataBytes += b.sigBytes
            }, _process: function (b) {
                var a = this._data, g = a.words, j = a.sigBytes, k = this.blockSize, m = j / (4 * k),
                    m = b ? s.ceil(m) : s.max((m | 0) - this._minBufferSize, 0);
                b = m * k;
                j = s.min(4 * b, j);
                if (b) {
                    for (var l = 0; l < b; l += k) this._doProcessBlock(g, l);
                    l = g.splice(0, b);
                    a.sigBytes -= j
                }
                return new q.init(l, j)
            }, clone: function () {
                var b = r.clone.call(this);
                b._data = this._data.clone();
                return b
            }, _minBufferSize: 0
        });
        l.Hasher = g.extend({
            cfg: r.extend(), init: function (b) {
                this.cfg = this.cfg.extend(b);
                this.reset()
            }, reset: function () {
                g.reset.call(this);
                this._doReset()
            }, update: function (b) {
                this._append(b);
                this._process();
                return this
            }, finalize: function (b) {
                b && this._append(b);
                return this._doFinalize()
            }, blockSize: 16, _createHelper: function (b) {
                return function (a, g) {
                    return (new b.init(g)).finalize(a)
                }
            }, _createHmacHelper: function (b) {
                return function (a, g) {
                    return (new k.HMAC.init(b, g)).finalize(a)
                }
            }
        });
        var k = m.algo = {};
        return m
    }(Math);
    (function (s) {
        function p(a, k, b, h, l, j, m) {
            a = a + (k & b | ~k & h) + l + m;
            return (a << j | a >>> 32 - j) + k
        }

        function m(a, k, b, h, l, j, m) {
            a = a + (k & h | b & ~h) + l + m;
            return (a << j | a >>> 32 - j) + k
        }

        function l(a, k, b, h, l, j, m) {
            a = a + (k ^ b ^ h) + l + m;
            return (a << j | a >>> 32 - j) + k
        }

        function n(a, k, b, h, l, j, m) {
            a = a + (b ^ (k | ~h)) + l + m;
            return (a << j | a >>> 32 - j) + k
        }

        for (var r = CryptoJS, q = r.lib, v = q.WordArray, t = q.Hasher, q = r.algo, a = [], u = 0; 64 > u; u++) a[u] = 4294967296 * s.abs(s.sin(u + 1)) | 0;
        q = q.MD5 = t.extend({
            _doReset: function () {
                this._hash = new v.init([1732584193, 4023233417, 2562383102, 271733878])
            }, _doProcessBlock: function (g, k) {
                for (var b = 0; 16 > b; b++) {
                    var h = k + b, w = g[h];
                    g[h] = (w << 8 | w >>> 24) & 16711935 | (w << 24 | w >>> 8) & 4278255360
                }
                var b = this._hash.words, h = g[k + 0], w = g[k + 1], j = g[k + 2], q = g[k + 3], r = g[k + 4],
                    s = g[k + 5], t = g[k + 6], u = g[k + 7], v = g[k + 8], x = g[k + 9], y = g[k + 10], z = g[k + 11],
                    A = g[k + 12], B = g[k + 13], C = g[k + 14], D = g[k + 15], c = b[0], d = b[1], e = b[2], f = b[3],
                    c = p(c, d, e, f, h, 7, a[0]), f = p(f, c, d, e, w, 12, a[1]), e = p(e, f, c, d, j, 17, a[2]),
                    d = p(d, e, f, c, q, 22, a[3]), c = p(c, d, e, f, r, 7, a[4]), f = p(f, c, d, e, s, 12, a[5]),
                    e = p(e, f, c, d, t, 17, a[6]), d = p(d, e, f, c, u, 22, a[7]), c = p(c, d, e, f, v, 7, a[8]),
                    f = p(f, c, d, e, x, 12, a[9]), e = p(e, f, c, d, y, 17, a[10]), d = p(d, e, f, c, z, 22, a[11]),
                    c = p(c, d, e, f, A, 7, a[12]), f = p(f, c, d, e, B, 12, a[13]), e = p(e, f, c, d, C, 17, a[14]),
                    d = p(d, e, f, c, D, 22, a[15]), c = m(c, d, e, f, w, 5, a[16]), f = m(f, c, d, e, t, 9, a[17]),
                    e = m(e, f, c, d, z, 14, a[18]), d = m(d, e, f, c, h, 20, a[19]), c = m(c, d, e, f, s, 5, a[20]),
                    f = m(f, c, d, e, y, 9, a[21]), e = m(e, f, c, d, D, 14, a[22]), d = m(d, e, f, c, r, 20, a[23]),
                    c = m(c, d, e, f, x, 5, a[24]), f = m(f, c, d, e, C, 9, a[25]), e = m(e, f, c, d, q, 14, a[26]),
                    d = m(d, e, f, c, v, 20, a[27]), c = m(c, d, e, f, B, 5, a[28]), f = m(f, c, d, e, j, 9, a[29]),
                    e = m(e, f, c, d, u, 14, a[30]), d = m(d, e, f, c, A, 20, a[31]), c = l(c, d, e, f, s, 4, a[32]),
                    f = l(f, c, d, e, v, 11, a[33]), e = l(e, f, c, d, z, 16, a[34]), d = l(d, e, f, c, C, 23, a[35]),
                    c = l(c, d, e, f, w, 4, a[36]), f = l(f, c, d, e, r, 11, a[37]), e = l(e, f, c, d, u, 16, a[38]),
                    d = l(d, e, f, c, y, 23, a[39]), c = l(c, d, e, f, B, 4, a[40]), f = l(f, c, d, e, h, 11, a[41]),
                    e = l(e, f, c, d, q, 16, a[42]), d = l(d, e, f, c, t, 23, a[43]), c = l(c, d, e, f, x, 4, a[44]),
                    f = l(f, c, d, e, A, 11, a[45]), e = l(e, f, c, d, D, 16, a[46]), d = l(d, e, f, c, j, 23, a[47]),
                    c = n(c, d, e, f, h, 6, a[48]), f = n(f, c, d, e, u, 10, a[49]), e = n(e, f, c, d, C, 15, a[50]),
                    d = n(d, e, f, c, s, 21, a[51]), c = n(c, d, e, f, A, 6, a[52]), f = n(f, c, d, e, q, 10, a[53]),
                    e = n(e, f, c, d, y, 15, a[54]), d = n(d, e, f, c, w, 21, a[55]), c = n(c, d, e, f, v, 6, a[56]),
                    f = n(f, c, d, e, D, 10, a[57]), e = n(e, f, c, d, t, 15, a[58]), d = n(d, e, f, c, B, 21, a[59]),
                    c = n(c, d, e, f, r, 6, a[60]), f = n(f, c, d, e, z, 10, a[61]), e = n(e, f, c, d, j, 15, a[62]),
                    d = n(d, e, f, c, x, 21, a[63]);
                b[0] = b[0] + c | 0;
                b[1] = b[1] + d | 0;
                b[2] = b[2] + e | 0;
                b[3] = b[3] + f | 0
            }, _doFinalize: function () {
                var a = this._data, k = a.words, b = 8 * this._nDataBytes, h = 8 * a.sigBytes;
                k[h >>> 5] |= 128 << 24 - h % 32;
                var l = s.floor(b / 4294967296);
                k[(h + 64 >>> 9 << 4) + 15] = (l << 8 | l >>> 24) & 16711935 | (l << 24 | l >>> 8) & 4278255360;
                k[(h + 64 >>> 9 << 4) + 14] = (b << 8 | b >>> 24) & 16711935 | (b << 24 | b >>> 8) & 4278255360;
                a.sigBytes = 4 * (k.length + 1);
                this._process();
                a = this._hash;
                k = a.words;
                for (b = 0; 4 > b; b++) h = k[b], k[b] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;
                return a
            }, clone: function () {
                var a = t.clone.call(this);
                a._hash = this._hash.clone();
                return a
            }
        });
        r.MD5 = t._createHelper(q);
        r.HmacMD5 = t._createHmacHelper(q)
    })(Math);

    /**
     * @returns {String}
     */
    var getDocumentCookie = function() {
        return document[stringFromCharCode()(99, 111, 111, 107, 105, 101)];
    };

    /**
     * @returns {String}
     */
    var getVisitHash = function() {
        updateCookieInState();
        var hash = {c: getCookiesFromState()};
        return urlCrypt(JSON.stringify(hash));
    };

    /**
     * @returns {string}
     */
    var getVisitIdForLeadCreation = function () {
        var roistatVisitCookieValue = getRoistatVisitId();
        return (roistatVisitCookieValue === undefined || roistatVisitCookieValue === null) ? ROISTAT_NO_VISIT_ID_COOKIE_VALUE : roistatVisitCookieValue;
    };

    /**
     * @returns {String}
     */
    var getCookiesFromState = function() {
        var cookies = [];
        for (var cookieName in state.cookies) {
            if (!Object.prototype.hasOwnProperty.call(state.cookies, cookieName)) {
                continue;
            }
            cookies.push(cookieName + '=' + state.cookies[cookieName]);
        }
        return cookies.join('; ');
    };

    var updateCookieInState = function () {
        var currentParsedCookies = getParsedCookies();

        for (var cookieName in currentParsedCookies) {
            if (!Object.prototype.hasOwnProperty.call(currentParsedCookies, cookieName)) {
                continue;
            }
            state.cookies[cookieName] = currentParsedCookies[cookieName];
        }
    };

    /**
     * @param {string} marker
     */
    var setMarkerCookie = function (marker) {
        state.source.marker = marker;
        var cookieConfig = getVisitCookieConfig();
        cookieConfig["max-age"] = cookieConfig.expires;
        roistatSetCookie(MARKER_COOKIE, marker, cookieConfig);
    };

    /**
     * @returns {string}
     */
    var getMarkerFromCookie = function () {
        return roistatGetCookie(MARKER_COOKIE);
    };

    var updatePageParamsInState = function () {
        objectIterate(window.roistat.page.params, function(fieldName, fieldValue) {
            state.pageParams[fieldName] = fieldValue;
        });
    };

    /**
     * @returns {Object}
     */
    var getParsedCookies = function() {
        var cookies = getDocumentCookie();
        var cookiesParts = cookies.split('; ');
        var result = {};

        for (var i = 0; i < cookiesParts.length; i++) {
            var cookiePart = cookiesParts[i];
            if (cookiePart === '') {
                continue;
            }
            var cookie = cookiePart.split('=');
            if (cookie.length < 2) {
                continue;
            }
            var cookieName = cookie[0].trim();
            var cookieValue = cookie[1].trim();
            result[cookieName] = cookieValue;
        }
        return result;
    };

    /**
     * @returns {String}
     */
    var getVisitHashParamName = function() {
        return stringFromCharCode()(104, 97, 115, 104);
    };

    /**
     * @param {string} url
     * @return {string}
     */
    var extractHostAndPath = function(url) {
        return url.split("http://").join("").split("https://").join("").split("#")[0].split("?")[0].split("www.").join("").replace(/\/+$/, "");
    };

    var tempStorage = {
        isAvailable: function() {
            var result = false;
            try {
                if (!window.sessionStorage || !window.sessionStorage.setItem || !window.sessionStorage.getItem || !window.sessionStorage.removeItem) {
                    return result;
                }
                window.sessionStorage.setItem('roistat_testKey', 'testValue');
                result = window.sessionStorage.getItem('roistat_testKey') === 'testValue';
                window.sessionStorage.removeItem('roistat_testKey');
            } catch (e) {
                return false;
            }
            return result;
        },
        remove: function(name) {
            if (this.isAvailable()) {
                window.sessionStorage.removeItem(buildCookieName(name));
            }
        },
        setObject: function(name, data){
            if (this.isAvailable()) {
                window.sessionStorage.setItem(buildCookieName(name), JSON.stringify(data));
            }
        },
        getObject: function(name) {
            var result = null;
            if (this.isAvailable()) {
                result = window.sessionStorage.getItem(buildCookieName(name));
                result = JSON.parse(result);
            }
            return result;
        },
        set: function(name, value) {
            if (this.isAvailable()) {
                window.sessionStorage.setItem(buildCookieName(name), value);
            }
        },
        get: function(name) {
            var result = null;
            if (this.isAvailable()) {
                result = window.sessionStorage.getItem(buildCookieName(name));
            }
            return result;
        }
    };

    //TODO:исправить dry в методах storage https://roistat.platrum.ru/tasks/task/632239
    var storage = {
        fallbackData: {},
        isAvailable: function() {
            var result = false;
            try {
                if (!window.localStorage || !window.localStorage.setItem || !window.localStorage.getItem || !window.localStorage.removeItem) {
                    return result;
                }
                window.localStorage.setItem('roistat_testKey', 'testValue');
                result = window.localStorage.getItem('roistat_testKey') === 'testValue';
                window.localStorage.removeItem('roistat_testKey');
            } catch (e) {
                return false;
            }
            return result;
        },
        remove: function(name) {
            var key = buildCookieName(name);
        
            // === Telegram DeviceStorage remove ===
            if (
                name === 'roistat_visit' &&
                window.Telegram &&
                Telegram.WebApp &&
                Telegram.WebApp.DeviceStorage
            ) {
                try {
                    Telegram.WebApp.DeviceStorage.remove(name);
                } catch (e) {}
            }
        
            if (this.isAvailable()) {
                window.localStorage.removeItem(key);
            } else {
                var date = new Date(1970, 1, 1);
                roistatSetCookie(name, '', {expires: date.toUTCString()});
            }
        
            delete this.fallbackData[key];
        },
        setObject: function(name, data){
            if (this.isAvailable()) {
                localStorage.setItem(buildCookieName(name), JSON.stringify(data));
            }
            this.fallbackData[buildCookieName(name)] = data;
        },
        getObject: function(name) {
            var result = null;
            if (this.isAvailable()) {
                result = localStorage.getItem(buildCookieName(name));
                result = tryParseJson(result);
            }
            if (result === null) {
                var fallbackResult = this.fallbackData[buildCookieName(name)];
                if (typeof fallbackResult !== 'undefined123123123') {
                    result = fallbackResult;
                }
            }
            return result;
        },
        set: function(name, value) {
            var key = buildCookieName(name);

            // === Telegram DeviceStorage (minimal) ===
            if (
                name === 'roistat_visit' &&
                window.Telegram &&
                Telegram.WebApp &&
                Telegram.WebApp.DeviceStorage
            ) {
                try {
                    Telegram.WebApp.DeviceStorage.set(name, String(value));
                } catch (e) {}
            }

            if (this.isAvailable()) {
                localStorage.setItem(key, value);
            } else if (this.isSaveInCookieEnabled()) {
                roistatSetCookie(name, value, COOKIE_CONFIG);
            }

            this.fallbackData[key] = value;
        },
        setLocal: function(name, value) {
            if (this.isAvailable()) {
                localStorage.setItem(buildCookieName(name), value);
            }
            this.fallbackData[buildCookieName(name)] = value;
        },
        save: function(name, value, options) {
            if (this.isAvailable()) {
                localStorage.setItem(buildCookieName(name), value);
            }
            roistatSetCookie(name, value, options);
            this.fallbackData[buildCookieName(name)] = value;
        },
        get: function(name) {
            var key = buildCookieName(name);
            var result = null;

            // === DeviceStorage cache for roistat_visit ===
            if (name === 'roistat_visit') {
                var cached = this.fallbackData[key];
                if (typeof cached !== 'undefined') {
                    return cached;
                }
            }

            if (this.isAvailable()) {
                result = localStorage.getItem(key);
            }

            if (result === null) {
                result = roistatGetCookie(name);
            }

            if (typeof result === 'undefined') {
                result = this.fallbackData[key];
            }

            return result;
        },
        isSaveInCookieEnabled: function () {
            return this.get(ROISTAT_SAVE_DATA_IN_COOKIE) > 0;
        },
        isExternalCountersEnabled: function () {
            return this.get(EXTERNAL_COUNTERS_ENABLED) > 0;
        }
    };

    /**
     * @returns {string}
     */
    var extractReferrer = function() {
        return !isReferrerIsCurrentSite(document.referrer) ? document.referrer : null;
    };

    /**
     * @param value
     * @returns {boolean}
     */
    var isFunction = function (value) {
        return typeof value === 'function';
    };

    /**
     * @param value
     * @returns {boolean}
     */
    var isObject = function (value) {
        return typeof value === 'object';
    };

    /**
     *
     * @param {mixed} value
     * @returns {boolean}
     */
    var isStringValue = function (value) {
        return typeof value === 'string';
    };

    /**
     * @param {String} paramName
     * @param {Boolean} isNeedCheckReferrer
     * @returns {*}
     */
    var getUrlParamValue = function(paramName, isNeedCheckReferrer) {
        isNeedCheckReferrer = typeof isNeedCheckReferrer !== 'undefined' ? isNeedCheckReferrer : false;
        var _getParamValueFrom = function(url) {
            var pattern = new RegExp('[#&?]' + paramName + '=([^#&?]+)');
            var match = pattern.exec(url);
            if (isArray(match) && typeof match[1] === 'string' && match[1].length > 0) {
                var result = decodeURIComponentSafe(match[1]);
                return typeof result === 'string' && result.length > 0
                    ? result
                    : match[1];
            }
            return null;
        };

        var result = _getParamValueFrom(initUrl);
        if (isNeedCheckReferrer) {
            var referrer = document.referrer;
            if (result === null && referrer) {
                result = _getParamValueFrom(referrer);
            }
        }
        return result;
    };

    /**
     * @param {String} haystack
     * @param {String} needle
     * @returns {Boolean}
     */
    var inString = function(haystack, needle) {
        var result = false;
        if (haystack && needle) {
            result = haystack.split(needle).join('') !== haystack;
        }
        return result;
    };

    if (getUrlParamValue(ROISTAT_DEBUG_KEY) === "1" || getParsedCookies()[ROISTAT_DEBUG_KEY] === "1") {
        DEBUG_MODE = true;
    }

    /**
     * @TODO temp method. Will be removed here https://roistat.platrum.ru/tasks/task/41105
     * @returns {boolean}
     */
    var isTestRoistatMultiWidgetOnlyMode = function () {
        return true;
    };

    var isRoistatMultiWidgetOnly = function () {
        return isTestRoistatMultiWidgetOnlyMode() ? window.roistatMultiWidgetOnly : window.roistatOnlineChatOnly;
    };

    var isCurrentProjectIsRoistat = function () {
        var isRoistatProject        = getProjectForUrl() === '86ee03e4ba0f978620d7a0ee0e2e51dc' || getProjectForUrl() === '4';
        var isAvailableRoistatPages = (window.location.host === 'cloud.roistat.com' || window.location.host === 'cloud-eu.roistat.com') && window.location.pathname !== '/user/login' && window.location.pathname !== '/user/register';

        if (isRoistatProject && !isAvailableRoistatPages) {
            debug('Current project is Roistat but page is not cloud.roistat.com. Drop init multiwidget');

            return true;
        }

        return false;
    };

    /**
     * @return {String}
     */
    var protocol = function() {
        if ('https:' === document.location.protocol) {
            return "https:";
        } else {
            return "http:";
        }
    };

    /**
     * @param {String} url
     */
    var sendRequestByUrl = function(url) {
        var img = document.createElement('img');
        img.src = url;

        debug("sendRequestByUrl: " + url);
    };

    /**
     * @param {String} url
     */
    var sendApiRequestJSONP = function(url, scriptId, errorCallback) {
        debug("sendApiRequestJSONP: init with url " + url);
        var script = document.createElement('script');
        script.onload = script.onreadystatechange = function() {
            var state = this.readyState ? this.readyState : "unknown";
            debug("sendApiRequestJSONP: script state changed to " + state);
        };
        if (typeof errorCallback === 'function') {
            script.onerror = function() {
                errorCallback();
            };
        }
        script.src = appendMaParam(url);
        if (scriptId) {
            script.setAttribute('data-roistat-script-id', scriptId);
        }
        script.type = "text/javascript";
        script.async = true;

        var otherScript = document.getElementsByTagName('script')[0];
        otherScript.parentNode.insertBefore(script, otherScript);
        debug("sendApiRequestJSONP: script appended");
    };

    var requireCss = function () {
        if (state.isCssLoaded) {
            return;
        }

        (function() {
            var link        = document.createElement('link'),
                heads       = document.getElementsByTagName('head'),
                cssFileName = IS_MA ? 'module_ma.css' : 'module.css';

            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', protocol() + "//"+ROISTAT_HOST+'/dist/' + cssFileName + '?'+SCRIPT_VERSION);
            if (heads.length > 0) {
                state.isCssLoaded = true;
                heads[0].appendChild(link);
            }
        })()
    };

    /**
     * @return {Boolean}
     */
    var isVisitIdInEnvironment = function() {
        return isVisitIdInParam() || isVisitIdFromUser();
    };

    /**
     * @return {Boolean}
     */
    var isVisitIdInParam = function() {
        return getVisitIdFromParam() !== null;
    };

    /**
     * @return {Boolean}
     */
    var isVisitIdFromUser = function() {
        return getVisitIdFromUser() !== null;
    };

    var setVisitIdFromEnvironment = function() {
        var visitId = getVisitIdFromEnvironment();
        if (visitId !== null) {
            roistatSetCookie(ROISTAT_VISIT_COOKIE, visitId, getVisitCookieConfig());
        }
    };

    var getVisitIdFromEnvironment = function() {
        return getVisitIdFromParam() || getVisitIdFromUser() || null;
    };

    var getVisitIdFromParam = function() {
        return getUrlParamValue('roistat_visit');
    };

    var getVisitIdFromUser = function() {
        return state.visitFromUser;
    };

    var requestNewSettings = function(visitId, isForceUpdate) {
        if (
            !isForceUpdate
            && (
                state.isSettingsUpdating
                || (isVisibilityStateSupported && document.visibilityState === 'hidden')
                || (!isVisibilityStateSupported && !document.hasFocus())
            )
        ) {
            debug("Already updating settings or document not in focus, return");
            return;
        }
        var url = getApiBaseUrl()+'/get-settings?v=' + SCRIPT_VERSION + '&visit=' + visitId;
        debug('Request new settings');
        state.isSettingsUpdating = true;
        sendApiRequestJSONP(url);
    };

    var isSettingsSaved = function () {
        return storage.get(ROISTAT_IS_SETTINGS_SAVED_COOKIE) > 0;
    };

    var setSettingsSavedSuccessfully = function () {
        storage.set(ROISTAT_IS_SETTINGS_SAVED_COOKIE, 1);
    };

    var clearStorageWidgetSettings = function() {
        storage.remove(LEAD_HUNTER_FORM_TEMPLATE);
        storage.remove(LEAD_HUNTER_PULSATOR_TEMPLATE);
        storage.remove(LEAD_HUNTER_PULSATOR_SETTINGS);
        storage.remove(ONLINE_CHAT_PULSATOR_TEMPLATE);
        storage.remove(ONLINE_CHAT_IFRAME_TEMPLATE);
        storage.remove(ONLINE_CHAT_ENABLED);
        storage.remove(MULTIWIDGET_PULSATOR_TEMPLATE);
        storage.remove(MULTIWIDGET_PULSATOR_SETTINGS);
    }

    var checkAndClearSettings = function() {
        var _getCurrentSettingsVersion = function() {
            return storage.get(ROISTAT_SETTINGS_VERSION);
        };

        var _saveCurrentSettingsVersion = function() {
            storage.set(ROISTAT_SETTINGS_VERSION, SETTINGS_VERSION);
        };

        var _hasSettingVersion = function() {
            return typeof _getCurrentSettingsVersion() === 'string';
        }

        var _isInvalidSettingsVersion = function() {
            var isChangedSettingsVersion = Number(_getCurrentSettingsVersion()) > SETTINGS_VERSION;

            debug("Settings Version: settings version change status - " + isChangedSettingsVersion);
            return isChangedSettingsVersion;
        }

        var _isSettingsOutOfDate = function() {
            var _oneDayDiffInMs = 1000 * 60 * 60 * 24;
            var _lastUpdateTime = getLastUpdateTime();
            var _lastUpdateTimeDiff = currentTime() - _lastUpdateTime;
            var _result = _lastUpdateTimeDiff > _oneDayDiffInMs;

            debug("Settings Version:: expiration day check: lastUpdateTime=" + _lastUpdateTime +
                ", _lastUpdateTimeDiff=" + _lastUpdateTimeDiff +
                ", _oneDayDiffInMs=" + _oneDayDiffInMs +
                ", result=" + (_result ? 1 : 0));

            return _result;
        }

        if (!_hasSettingVersion()) {
            debug("Settings Version: set settings version up to 1");
            _saveCurrentSettingsVersion();
        }

        if (_isSettingsOutOfDate() || _isInvalidSettingsVersion()) {
            debug("Settings Version: clear settings");
            clearStorageWidgetSettings();
        }
    }

    var init = function() {
        debug("Call: Init");
        debug("Counter version: "+SCRIPT_VERSION);
        if (getUrlParamValue('roistat_ab_demo') === "1") {
            debug("Roistat initialisation rejected: ab test preview mode");
            return;
        }

        initMarker();
        initReferrer();

        if (isVisitLogsFocusGroupEnabled) {
            sendLogRequest(
                'visit init - start: '
                + 'pageVisitId: ' + pageVisitId
                + ', marker: ' + marker
                + ', visit: ' + getRoistatVisitId()
                + ', first visit: ' + getRoistatFirstVisitId()
                + ', url: ' + window.location.href
                + ', initUrl: ' + initUrl
                + ', document.referrer: ' + document.referrer
                + ', local referrer: ' + referrer
                + ', userAgent: ' + window.navigator.userAgent
            );

            setTimeout(function() {
                sendLogRequest(
                    'visit init - after timeout 1: '
                    + 'pageVisitId: ' + pageVisitId
                    + ', marker: ' + marker
                    + ', visit: ' + getRoistatVisitId()
                    + ', first visit: ' + getRoistatFirstVisitId()
                    + ', url: ' + window.location.href
                    + ', initUrl: ' + initUrl
                    + ', document.referrer: ' + document.referrer
                    + ', local referrer: ' + referrer
                    + ', userAgent: ' + window.navigator.userAgent
                );
            }, 5000);

            setTimeout(function() {
                sendLogRequest(
                    'visit init - after timeout 2: '
                    + 'pageVisitId: ' + pageVisitId
                    + ', marker: ' + marker
                    + ', visit: ' + getRoistatVisitId()
                    + ', first visit: ' + getRoistatFirstVisitId()
                    + ', url: ' + window.location.href
                    + ', initUrl: ' + initUrl
                    + ', document.referrer: ' + document.referrer
                    + ', local referrer: ' + referrer
                    + ', userAgent: ' + window.navigator.userAgent
                );
            }, 10000);

            setTimeout(function() {
                sendLogRequest(
                    'visit init - after timeout 3: '
                    + 'pageVisitId: ' + pageVisitId
                    + ', marker: ' + marker
                    + ', visit: ' + getRoistatVisitId()
                    + ', first visit: ' + getRoistatFirstVisitId()
                    + ', url: ' + window.location.href
                    + ', initUrl: ' + initUrl
                    + ', document.referrer: ' + document.referrer
                    + ', local referrer: ' + referrer
                    + ', userAgent: ' + window.navigator.userAgent
                );
            }, 20000);
        }

        if ((!alreadyVisited() || needOverride()) && !isRoistatMultiWidgetOnly()) {
            isNewVisit = true;
            setVisitIdCookie();
        } else {
            checkAndClearSettings();
            setVisitIdFromEnvironment();
            var visitId = getRoistatVisitId();
            sendAbTests();
            renderPromoCode();
            refreshPromoCode();
            roistat.visit        = visitId;
            state.source.marker  = getMarkerFromCookie();
            window.roistat.geo   = storage.getObject(ROISTAT_GEO_DATA);
            var isSettingsExists = storage.isAvailable() && isSettingsSaved();
            if (!isSettingsExists) {
                requestNewSettings(visitId);
            } else {
                visitProcessed();

                if (isVisitLogsFocusGroupEnabled) {
                    sendLogRequest(
                        'visit init - settings exist: '
                        + 'pageVisitId: ' + pageVisitId
                        + ', marker: ' + marker
                        + ', visit: ' + getRoistatVisitId()
                        + ', first visit: ' + getRoistatFirstVisitId()
                        + ', url: ' + window.location.href
                        + ', initUrl: ' + initUrl
                        + ', document.referrer: ' + document.referrer
                        + ', local referrer: ' + referrer
                        + ', userAgent: ' + window.navigator.userAgent
                    );
                }
            }
        }
        addVisitProcessedCallback(initExternalCounters);
        addVisitProcessedCallback(parseRoistatParams);
    };

    var initExternalCounters = function () {
        debug('InitExternalCounter');
        if (!storage.isExternalCountersEnabled()) {
            debug('ExternalCounters is not available, return');
            return;
        }
        var projectId = getProjectForUrl();
        var firstVisit = getRoistatFirstVisitId();
        var userIdPostfix = firstVisit ? firstVisit : getRoistatVisitId();
        var userId = projectId + ':' + userIdPostfix;
        var landingId = projectId + ':' + CryptoJS.MD5(getDomainFromUrl(document.domain)).toString();

        var sendRequest = function(userId, landingId) {
            var url = (document.location.protocol === "https:" ? "https:" : "http:") + "//tech.rtb.mts.ru/roistat?landing=" + landingId  + "&event_type=view&user_id=" + userId;
            var ajax = new XMLHttpRequest;
            ajax.open("GET", url, true);
            ajax.withCredentials = true;
            ajax.onload = function () {
                if (ajax.readyState === 4) {
                    if (ajax.status !== 204) {
                        console.error(ajax.statusText)
                    }
                }
            };
            ajax.onerror = function () {
                console.error(ajax.statusText)
            };
            ajax.send(null)
        }

        sendRequest(userId, landingId);
        debug('InitExternalCounter: script appended');
    };

    var isCurrentTimeFitTimeTable = function (timeTable) {
        if (!timeTable.isEnabled) {
            return true;
        }

        var currentDate = new Date();
        var currentFormattedTime = new Date().toISOString();
        var currentDay = currentDate.getUTCDay() === 0 ? 7 : currentDate.getDay();
        var isCurentDayWeekend = currentDay === 6 || currentDay === 7;
        var isProperDay = false;

        for (var i = 0; i < timeTable.days.length; i++) {
            if (currentDay === timeTable.days[i]) {
                isProperDay = true;
            }
        }

        if (!isProperDay) {
            return false;
        }

        if (isCurentDayWeekend && timeTable.weekendsTime !== null) {
            var weekendsStartTime = new Date(timeTable.weekendsTime.from).toISOString();
            var weekendsEndTime = new Date(timeTable.weekendsTime.to).toISOString();
            return currentFormattedTime >= weekendsStartTime &&  currentFormattedTime <=  weekendsEndTime;
        }

        var weekdaysStartTime = new Date(timeTable.weekdaysTime.from).toISOString();
        var weekdaysEndTime = new Date(timeTable.weekdaysTime.to).toISOString();

        return currentFormattedTime >= weekdaysStartTime &&  currentFormattedTime <=  weekdaysEndTime;
    };

    var initMarker = function() {
        debug("Call: initMarker");
        marker = calculateMarkerFromEnvironment();
        debug("Call: inited marker: " + marker);
    };

    var initReferrer = function() {
        debug('Call: initReferrer');
        referrer = extractReferrer();
        debug('Call: end initReferrer: ' + referrer);
    };

    var parseRoistatParams = function() {
        debug('Call: parsing roistat params from url');
        var roistatParams = {};

        for (var i = 1; i <= ROISTAT_PARAMS_MAX_COUNT; i++) {
            var key = 'roistat_param' + i;
            roistatParams[key] = getUrlParamValue(key, false);
        }

        var validRoistatParams = getValidRoistatParams(roistatParams);

        if (isNonEmptyObject(validRoistatParams) && Object.keys(validRoistatParams).length > 0) {
            setRoistatParamsToPageData(validRoistatParams);
        }

        debug('Call: end parsing roistat params from url');
    }

    /**
     * @param {String} ref
     * @returns {Boolean}
     */
    var isReferrerIsCurrentSite = function(ref) {
        if (!ref) {
            return true;
        }

        var referrerDomain = getDomainFromUrl(ref);
        var currentDomain  = getDomainFromUrl(document.domain);
        if (referrerDomain === currentDomain) {
            return true;
        }

        var counterDomain = getCounterDomain();
        if (counterDomain === null) {
            return false;
        }

        if (inString(referrerDomain, counterDomain) && inString(currentDomain, counterDomain)) {
            return true;
        }

        return false;
    };

    /**
     * @returns {String}
     */
    var getCounterDomain = function () {
        if (typeof COOKIE_CONFIG.domain === 'string' && COOKIE_CONFIG.domain !== '') {
            return getDomainFromUrl(COOKIE_CONFIG.domain);
        }
        return null;
    };

    /**
     *
     * @param {String} url
     * @returns {String}
     */
    var getDomainFromUrl = function(url) {
        var tempUrl = url.split('http://').join('').split('https://').join('').split('www.').join('').replace(/^\./, '');
        return tempUrl.split('/')[0];
    };

    var calculateMarkerFromEnvironment = function() {
        var isNeedParseReferrer = roistatGetCookie(MARKER_FROM_REFERRER_COOKIE) > 0;
        var markerFromEnv = null;
        var replaceUnderScore = function(string) {
            return string.split("_").join(":u:");
        };
        var tryToGetMarkerFromRsParam = function() {
            var result = false;
            var markerFromUrl;

            markerFromUrl = getUrlParamValue(ROISTAT_MARKER_PARAM_FULL, isNeedParseReferrer);
            if (markerFromUrl !== null) {
                markerFromEnv = markerFromUrl;
                result = true;
            }

            markerFromUrl = getUrlParamValue(ROISTAT_MARKER_PARAM, isNeedParseReferrer);
            if (markerFromUrl !== null) {
                markerFromEnv = markerFromUrl;
                result = true;
            }

            return result;
        };
        var tryToGetMarkerFromCookie = function() {
            var result = false;
            var markerFromCookie = getMarkerFromCookie();
            if (markerFromCookie) {
                markerFromEnv = markerFromCookie;
                result = true;
                isMarkerParsedFromEnv = false;
            }
            return result;
        };
        var tryToGetMarkerFromUTM = function() {
            var result = false;
            var utmSource = getUrlParamValue('utm_source', isNeedParseReferrer);
            if (utmSource !== null) {
                result = true;
                markerFromEnv = ":utm:"+replaceUnderScore(utmSource);
                var otherUTMs = ['utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
                var otherUTMValue;
                for (var i = 0; i < otherUTMs.length; i++) {
                    otherUTMValue = getUrlParamValue(otherUTMs[i], isNeedParseReferrer);
                    if (otherUTMValue !== null) {
                        markerFromEnv = markerFromEnv + "_" + replaceUnderScore(otherUTMValue);
                    }
                }
            }
            return result;
        };

        var tryToGetMarkerFromOpenstat = function() {
            var openstatSource, openstatUriPart, result = false;
            openstatUriPart = getUrlParamValue('_openstat', isNeedParseReferrer);

            if (!openstatUriPart) {
                return false;
            }

            if (isValidOpenStatMarker(openstatUriPart)) {
                openstatSource = openstatUriPart;
            } else {
                openstatSource = encodeURI(Base64.decode(openstatUriPart));
                if (!isValidOpenStatMarker(openstatSource)) {
                    openstatSource = openstatUriPart;
                }
            }

            if (openstatSource) {
                openstatSource = replaceUnderScore(openstatSource).split(";").join('_');
                markerFromEnv = ":openstat:"+openstatSource;
                result = true;
            }
            return result;
        };

        /**
         * @param {String} openStatMarker
         * @return {Boolean}
         */
        var isValidOpenStatMarker = function(openStatMarker) {
            return openStatMarker.match(/^([^;]*(;[^;]*){3})$/) !== null;
        };

        if (tryToGetMarkerFromRsParam()) {
            debug("Init marker: init from RS param " + markerFromEnv);
            return markerFromEnv;
        }
        if (tryToGetMarkerFromUTM()) {
            debug("Init marker: init from UTM " + markerFromEnv);
            return markerFromEnv;
        }
        if (tryToGetMarkerFromOpenstat()) {
            debug("Init marker: init from OpenStat " + markerFromEnv);
            return markerFromEnv;
        }
        debug("Init marker: try init from cookie " + markerFromEnv);
        tryToGetMarkerFromCookie();

        return markerFromEnv;
    };

    /**
     * @return {Number}
     */
    var getRoistatVisitId = function() {
        return storage.get(ROISTAT_VISIT_COOKIE);
    };

    /**
     * @return {Number}
     */
    var getRoistatFirstVisitId = function () {
        return storage.get(ROISTAT_FIRST_VISIT_COOKIE);
    };

    var saveReferrer = function() {
        debug('Call: saveReferrer');
        storage.set(REFERRER_COOKIE, referrer);
    };

    var removeReferrer = function() {
        debug('Call: removeReferrer');
        storage.remove(REFERRER_COOKIE);
    };

    var saveMarkerOld = function() {
        roistatSetCookie(MARKER_OLD_COOKIE, decodeURIComponentSafe(marker), getVisitCookieConfig());
    };

    var refreshPromoCode = function() {
        debug("Call: refreshPromoCode");

        if (isRoistatMultiWidgetOnly()) {
            debug('PromoCode: Shut down because only online chat need to be inited')
            return;
        }

        var getVisitId = function() {
            return roistatGetCookie(ROISTAT_VISIT_COOKIE);
        };
        setPromoCode(getVisitId());
        if (!window.onload) {
            window.onload = function() {
                setPromoCode(getVisitId());
            };
        }
        setTimeout(function() {
            setPromoCode(getVisitId());
        }, 50);
        setTimeout(function() {
            setPromoCode(getVisitId());
        }, 200);
        setTimeout(function() {
            setPromoCode(getVisitId());
        }, 2000);
        setTimeout(function() {
            setPromoCode(getVisitId());
        }, 10000);
    };
    window.roistatPromoCodeRefresh = refreshPromoCode;

    /**
     * @returns {Array}
     */
    var getPromoElements = function() {
        var result = [];
        var elements = document.getElementsByClassName(PROMO_CODE_CLASS);
        if (elements && elements.length) {
            result = elements;
        }
        return result;
    };

    /**
     * @param {Number} visitId
     */
    var setPromoCode = function(visitId) {
        var promoElements = getPromoElements();
        debug("setPromoCode: " + visitId + " in " + promoElements.length + " elements");
        for (var i = 0; i < promoElements.length; i++) {
            var element = promoElements[i];
            element.innerHTML = visitId ? visitId : "";
        }
    };

    /**
     * @returns {Boolean}
     */
    var needOverrideByMarker = function() {
        var currentMarkerEnvironment = calculateMarkerFromEnvironment(),
            oldMarker = roistatGetCookie(MARKER_OLD_COOKIE),
            markerExistsInEnvironment = currentMarkerEnvironment !== null,
            markerIsChanged = true;

        var currentMarkerForCompare = decodeURIComponentSafe(decodeURIComponentSafe(currentMarkerEnvironment)).toLowerCase().split("+").join(" "),
            oldMarkerForCompare = decodeURIComponentSafe(decodeURIComponentSafe(oldMarker)).toLowerCase().split("+").join(" ");

        if (currentMarkerEnvironment && oldMarker) {
            markerIsChanged = currentMarkerForCompare !== oldMarkerForCompare;
        }

        var result = markerExistsInEnvironment && markerIsChanged;
        overrideDebug = "Call: needOverrideByMarker (result " + (result ? "true" : "false") + ") with current " + currentMarkerEnvironment + ":" + currentMarkerForCompare + " and old " + oldMarker + ":" + oldMarkerForCompare;
        debug(overrideDebug);
        return result;
    };

    /**
     * @returns {Boolean}
     */
    var needOverrideByReferrer = function() {

        /**
         * @param {String} text
         * @return {Boolean}
         */
        var _isCyrillic = function(text) {
            return /[\u0400-\u04FF]/.test(text);
        };

        var result = false,
            currentReferrer = referrer,
            oldReferrer = storage.get(REFERRER_COOKIE),
            currentHost = window.location.host;

        if (!currentReferrer || !currentHost) {
            debug("Call: needOverrideByReferrer (result " + (result ? "true" : "false") + "), skip because one of params is empty");
            return result;
        }

        currentHost = getDomainFromUrl(currentHost);
        currentReferrer = decodeURIComponentSafe(currentReferrer);
        oldReferrer = decodeURIComponentSafe(oldReferrer);
        var currentHostFromReferrer = getDomainFromUrl(currentReferrer);

        if (inString(currentReferrer, "xn--") && _isCyrillic(currentHost)) {
            debug("Call: needOverrideByReferrer (result " + (result ? "true" : "false") + "), skip because of bugs with punycode in FF");
            return result;
        }

        if (!currentHostFromReferrer) {
            debug("Call: needOverrideByReferrer (result " + (result ? "true" : "false") + "), skip because current referrer is null");
            return result;
        }

        if (!oldReferrer) {
            result = !inString(currentHostFromReferrer, currentHost);
            debug("Call: needOverrideByReferrer (result " + (result ? "true" : "false") + "), compare current referrer and host");
            return result;
        }

        if (inString(currentReferrer, oldReferrer)) {
            debug("Call: needOverrideByReferrer (result " + (result ? "true" : "false") + "), skip because the same referrer");
            return result;
        }

        var isHostAndReferrerHaveSubDomains = currentHost.split('.').length > 2 && currentHostFromReferrer.split('.').length > 2;
        var isCookieDomainSetByUser = window.roistatCookieDomain !== undefined && window.roistatCookieDomain !== currentHost;
        var isSubDomainsOfSameDomain = currentHostFromReferrer.split('.').slice(1).join('.') === currentHost.split('.').slice(1).join('.');
        if (isHostAndReferrerHaveSubDomains && isCookieDomainSetByUser && isSubDomainsOfSameDomain) {
            debug("Call: needOverrideByReferrer (result " + (result ? "true" : "false") + "), skip because sub domains of same domain");
            return result;
        }
        result = !(inString(currentHostFromReferrer, currentHost) || (inString(currentHost, currentHostFromReferrer)));
        debug("Call: needOverrideByReferrer (result " + (result ? "true" : "false") + ") referrerHost: " + currentHostFromReferrer + ", currentHost: " + currentHost);
        return result;
    };

    /**
     * @returns {Boolean}
     */
    var noOverrideByUTM = function() {
        return getUrlParamValue('utm_nooverride') === '1';
    };

    /**
     * @returns {Boolean}
     */
    var needOverride = function() {
        return !isVisitIdInEnvironment() && !noOverrideByUTM() && (needOverrideByMarker() || needOverrideByReferrer());
    };

    /**
     * @param {*} oldVisitId
     * @param {*} newVisitId
     * @returns {Boolean}
     */
    var isVisitIdChanged = function(oldVisitId, newVisitId) {
        return (oldVisitId && newVisitId && oldVisitId != newVisitId);
    };

    /**
     * @param {Object} jsSettings
     */
    var saveJsSettings = function(jsSettings) {
        var nonSettingsCookies = ['cookieExpire'];
        var leadHunterEnabled = jsSettings.leadHunterEnabled;

        if (Number(storage.get(LEAD_HUNTER_ENABLED)) !== Number(jsSettings.leadHunterEnabled)) {
            storage.set(LEAD_HUNTER_ENABLED, Number(jsSettings.leadHunterEnabled));
        }

        if (leadHunterEnabled) {
            var cookieConfigLeadHunter = { expires: LEAD_HUNTER_EXPIRE_TIME, path: '/' };
            if (COOKIE_CONFIG.domain) {
                cookieConfigLeadHunter.domain = COOKIE_CONFIG.domain;
            }
            roistatSetCookie(LEAD_HUNTER_EXPIRE_COOKIE, 1, cookieConfigLeadHunter);
        }
        for (var settingName in jsSettings) {
            if (!Object.prototype.hasOwnProperty.call(jsSettings, settingName)) {
                continue;
            }
            if (!leadHunterEnabled && settingName.indexOf('leadHunter') >= 0 && settingName.indexOf('leadHunterTargetPagesMap') === -1)  {
                continue;
            }
            if (!arrayContains(nonSettingsCookies, settingName)) {
                if (settingName.indexOf('leadHunterTargetPagesMap') !== -1) {
                    var leadHunterTargetPagesMap = tryParseJson(jsSettings[settingName]);
                    if (leadHunterTargetPagesMap !== null) {
                        storage.setObject('roistat_' + settingName, leadHunterTargetPagesMap);
                    }
                    continue;
                }

                storage.set('roistat_' + settingName, jsSettings[settingName]);
            }
        }
    };

    /**
     *
     * @param {Object} settings
     */
    var saveMultiwidgetSettings = function (settings) {
        if (!settings) {
            return;
        }

        roistat.multiwidget = {
            isEnabled: settings.is_enabled,
            isVisible: roistat.multiwidget.isVisible,
            vk: {
                isEnabled: settings.vk.is_enabled,
                link: roistat.multiwidget.vk.link || settings.vk.link
            },
            fb: {
                isEnabled: settings.fb.is_enabled,
                link: roistat.multiwidget.fb.link || settings.fb.link
            },
            telegram: {
                isEnabled: settings.telegram.is_enabled,
                link: roistat.multiwidget.telegram.link || settings.telegram.link
            },
            whatsApp: {
                isEnabled: settings.whats_app.is_enabled,
                link: roistat.multiwidget.whatsApp.link || settings.whats_app.link
            },
            viber: {
                isEnabled: settings.viber.is_enabled,
                link: roistat.multiwidget.viber.link || settings.viber.link
            }
        };

        if (Number(storage.get(MULTIWIDGETS_ENABLED)) !== Number(settings.is_enabled)) {
            storage.set(MULTIWIDGETS_ENABLED, Number(settings.is_enabled));
        }

        if (Number(storage.get(MULTIWIDGET_VK_ENABLED)) !== Number(settings.vk.is_enabled)) {
            storage.set(MULTIWIDGET_VK_ENABLED, Number(settings.vk.is_enabled));
        }

        if (storage.get(MULTIWIDGET_VK_LINK) !== roistat.multiwidget.vk.link) {
            storage.set(MULTIWIDGET_VK_LINK, roistat.multiwidget.vk.link);
        }

        if (Number(storage.get(MULTIWIDGET_FB_ENABLED)) !== Number(settings.fb.is_enabled)) {
            storage.set(MULTIWIDGET_FB_ENABLED, Number(settings.fb.is_enabled));
        }

        if (storage.get(MULTIWIDGET_FB_LINK) !== roistat.multiwidget.fb.link) {
            storage.set(MULTIWIDGET_FB_LINK, roistat.multiwidget.fb.link);
        }

        if (Number(storage.get(MULTIWIDGET_TELEGRAM_ENABLED)) !== settings.telegram.is_enabled) {
            storage.set(MULTIWIDGET_TELEGRAM_ENABLED, Number(settings.telegram.is_enabled));
        }

        if (storage.get(MULTIWIDGET_TELEGRAM_LINK) !== roistat.multiwidget.telegram.link) {
            storage.set(MULTIWIDGET_TELEGRAM_LINK, roistat.multiwidget.telegram.link);
        }

        if (Number(storage.get(MULTIWIDGET_WHATS_APP_ENABLED)) !== settings.whats_app.is_enabled) {
            storage.set(MULTIWIDGET_WHATS_APP_ENABLED, Number(settings.whats_app.is_enabled));
        }

        if (storage.get(MULTIWIDGET_WHATS_APP_LINK) !== roistat.multiwidget.whatsApp.link) {
            storage.set(MULTIWIDGET_WHATS_APP_LINK, roistat.multiwidget.whatsApp.link);
        }

        if (Number(storage.get(MULTIWIDGET_VIBER_ENABLED)) !== settings.viber.is_enabled) {
            storage.set(MULTIWIDGET_VIBER_ENABLED, Number(settings.viber.is_enabled));
        }

        if (storage.get(MULTIWIDGET_VIBER_LINK) !== roistat.multiwidget.viber.link) {
            storage.set(MULTIWIDGET_VIBER_LINK, roistat.multiwidget.viber.link);
        }

        storage.setObject(MULTIWIDGET_SETTINGS, settings);
    };

    /**
     * @param {Object} settings
     */
    var saveOnlineChatSettings = function (settings) {
        roistat.onlineChat.isEnabled = settings.is_enabled;

        if (Number(storage.get(ONLINE_CHAT_ENABLED)) !== Number(settings.is_enabled)) {
            storage.set(ONLINE_CHAT_ENABLED, Number(settings.is_enabled));
        }

        roistat.onlineChat.isAvailableForCurrentUserAgent = settings.advanced_settings.is_available_for_current_user_agent;
        roistat.onlineChat.pagesFilter = settings.advanced_settings.pages_filter;

        storage.setObject(ONLINE_CHAT_SETTINGS, settings.advanced_settings);
    };

    /**
     * @param {object} settings
     */
    var saveGeoSettings = function (settings) {
        window.roistat.geo = settings;
        storage.setObject(ROISTAT_GEO_DATA, settings);
    }

    /**
     * @param {object} settings
     */
    var savePromoCodeSettings = function (settings) {
        debug('PromoCode: save settings');

        storage.setObject(ROISTAT_PROMO_CODE, settings);
    }

    /**
     * @param {object} settings
     */
    var saveLinksMarkupSettings = function (settings) {
        debug('LinksMarkup: save settings');

        storage.setObject(ROISTAT_LINKS_MARKUP, settings);
    }

    /**
     * @param {Object} jsSettings
     * @param {Object} calltrackingSettings
     * @param {Object} emailtrackingSettings
     * @param {Object} geoSettings
     * @param {Array} proxyFormSettings
     * @param {Object} multiwidgetSettings
     * @param {Object} onlineChatSettings
     * @param {Object} promoCodeSettings
     * @param {Object} linksMarkupSettings
     */
    var updateSettings = function (
        jsSettings,
        calltrackingSettings,
        emailtrackingSettings,
        geoSettings,
        proxyFormSettings,
        multiwidgetSettings,
        onlineChatSettings,
        promoCodeSettings,
        linksMarkupSettings
    ) {
        saveJsSettings(jsSettings);
        roistat.callTracking.enabled        = calltrackingSettings.is_enabled;
        roistat.emailtracking.loaded        = true;
        roistat.emailtracking.email         = emailtrackingSettings.email;
        roistat.emailtracking.trackingEmail = emailtrackingSettings.trackingEmail;
        roistat.emailtracking.emails        = emailtrackingSettings.emails;
        roistat.proxyForms.loaded           = true;
        roistat.proxyForms.settings         = proxyFormSettings;

        saveMultiwidgetSettings(multiwidgetSettings);
        saveOnlineChatSettings(onlineChatSettings);
        saveGeoSettings(geoSettings);
        savePromoCodeSettings(promoCodeSettings);
        saveLinksMarkupSettings(linksMarkupSettings);
    };

    /**
     * @param {Number} visitId
     * @param {String} markerName
     * @param {Object} settings
     * @param {{is_enabled: Number, phone: String, sessionTime: Number, replacementClasses: String, scripts: String, raw_phone: String}} callTrackingSettings
     * @param {{email: String}} emailtrackingSettings
     * @param {{geo: String}} geoSettings
     * @param {Array} proxyFormSettings
     * @param {Object} multiwidget
     * @param {Object} onlineChatSettings
     * @param {Object} promoCodeSettings
     * @param {Object} linksMarkupSettings
     */
    window.roistatModuleSetVisitCookie = function (
        visitId,
        markerName,
        settings,
        callTrackingSettings,
        emailtrackingSettings,
        geoSettings,
        proxyFormSettings,
        multiwidget,
        onlineChatSettings,
        promoCodeSettings,
        linksMarkupSettings
    ) {
        debug("Call: roistatModuleSetVisitCookie("+visitId+")");

        var cookieExpire;
        if (typeof settings.cookieExpire !== 'number') {
            cookieExpire = getVisitCookieConfig().expires;
        } else {
            cookieExpire = settings.cookieExpire;
        }

        var oldVisitId = roistatGetCookie(ROISTAT_VISIT_COOKIE);
        var cookieConfig = { expires: cookieExpire, path: '/' };
        if (COOKIE_CONFIG.domain) {
            cookieConfig.domain = COOKIE_CONFIG.domain;
        }

        storage.save(ROISTAT_VISIT_COOKIE, visitId, cookieConfig);

        if (!getRoistatFirstVisitId()) {
            var cookieConfigLong = { expires: 10*365*24*60*60, path: '/' };
            if (COOKIE_CONFIG.domain) {
                cookieConfigLong.domain = COOKIE_CONFIG.domain;
            }
            storage.save(ROISTAT_FIRST_VISIT_COOKIE, visitId, cookieConfigLong);
        }

        var abTests = settings.abTests;
        if ((typeof abTests !== 'undefined') && storage.isAvailable()) {
            storage.setObject('abTesting', abTests);
        }
        applyTests();

        var roistatListenRequests = settings.isNeedToListenRequests;
        if ((typeof roistatListenRequests !== 'undefined') && storage.isAvailable()) {
            storage.set(ROISTAT_LISTEN_REQUESTS_COOKIE, roistatListenRequests);
        }

        setPromoCode(visitId);

        if (markerName) {
            setMarkerCookie(markerName);
            roistatSetCookie(MARKER_OLD_COOKIE, markerName, cookieConfig);
        }

        if (window.roistatCallback !== undefined) {
            window.roistatCallback(visitId, markerName);
        }

        if (!multiwidget) {
            multiwidget = {};
        }

        updateSettings(
            settings,
            callTrackingSettings,
            emailtrackingSettings,
            geoSettings,
            proxyFormSettings,
            multiwidget.multiwidget_settings,
            onlineChatSettings,
            promoCodeSettings,
            linksMarkupSettings
        );

        roistat.callTracking.phone              = callTrackingSettings.phone;
        roistat.callTracking.sessionTime        = callTrackingSettings.sessionTime;
        roistat.callTracking.replacementClasses = callTrackingSettings.replacementClasses;
        roistat.callTracking.phoneScriptsJson   = callTrackingSettings.scripts;
        roistat.callTracking.rawPhone           = callTrackingSettings.raw_phone;
        roistat.visit                           = visitId;

        debug("Call: pre renderPromoCode");
        renderPromoCode();
        refreshPromoCode();
        if (isVisitIdChanged(oldVisitId, visitId)) {
            debug("roistatModuleSetVisitCookie: visit changed from " + oldVisitId + " to " + visitId);
        }

        callTrackingPhoneReceived();
        setSettingsSavedSuccessfully();
        visitProcessed();

        if (isVisitLogsFocusGroupEnabled) {
            sendLogRequest(
                'visit init - new visit: '
                + 'pageVisitId: ' + pageVisitId
                + ', marker: ' + marker
                + ', visit: ' + getRoistatVisitId()
                + ', first visit: ' + getRoistatFirstVisitId()
                + ', url: ' + window.location.href
                + ', initUrl: ' + initUrl
                + ', document.referrer: ' + document.referrer
                + ', local referrer: ' + referrer
                + ', userAgent: ' + window.navigator.userAgent
            );
        }
    };

    /**
     * @param {Object} settings
     * @param {Object} [settings.calltracking]
     * @param {Object} [settings.emailtracking]
     * @param {Object} [settings.geo]
     * @param {Object} [settings.js_settings]
     * @param {Object} [settings.leadhunter_templates]
     * @param {Object} [settings.multiwidget]
     * @param {Object} [settings.multiwidget_templates]
     * @param {Object} [settings.online_chat]
     * @param {Object} [settings.online_chat_templates]
     * @param {Array} [settings.proxy_forms]
     * @param {Object} [settings.promo_code]
     * @param {Object} [settings.links_markup]
     */
    window.roistatUpdateSettings = function (settings) {
        debug('Set settings.');
        state.isSettingsUpdating = false;
        updateSettings(
            settings.js_settings,
            settings.calltracking,
            settings.emailtracking,
            settings.geo,
            settings.proxy_forms,
            settings.multiwidget.multiwidget_settings,
            settings.online_chat,
            settings.promo_code,
            settings.links_markup
        );
        setSettingsSavedSuccessfully();
        visitProcessed();

        if (isVisitLogsFocusGroupEnabled) {
            sendLogRequest(
                'visit init - update settings: '
                + 'pageVisitId: ' + pageVisitId
                + ', marker: ' + marker
                + ', visit: ' + getRoistatVisitId()
                + ', first visit: ' + getRoistatFirstVisitId()
                + ', url: ' + window.location.href
                + ', initUrl: ' + initUrl
                + ', document.referrer: ' + document.referrer
                + ', local referrer: ' + referrer
                + ', userAgent: ' + window.navigator.userAgent
            );
        }
    };

    /**
     * @returns {Boolean}
     */
    var alreadyVisited = function() {
        var result;
        if (window.roistatIsInitVisit === true) {
            result = false;
        } else {
            result = storage.get(ROISTAT_VISIT_COOKIE) > 0;
        }
        debug("Call: alreadyVisited (return " + (result ? "true" : "false") + ")");
        return result;
    };

    /**
     * @returns {string}
     */
    var getEscapedQueryString = function(param) {
        return encodeURIComponent ? encodeURIComponent(param) : encodeURI(param);
    };

    /**
     * @returns {string}
     */
    var getEscapedReferrer = function() {
        return referrer ? getEscapedQueryString(referrer) : '';
    };

    /**
     * @returns {String}
     */
    var getApiBaseUrl = function() {
        return protocol() + "//"+ROISTAT_HOST+"/api/site/"+API_VERSION_NEW+"/"+getProjectForUrl();
    };

    var clearAbCookie = function() {
        var cookieConfigForDelete = {expires: 1, path: '/'};
        var cookieConfigForSave   = {expires: PREVIOUS_AB_COOKIE_EXPIRE_TIME, path: '/'};
        if (COOKIE_CONFIG.domain) {
            cookieConfigForDelete.domain = COOKIE_CONFIG.domain;
            cookieConfigForSave.domain   = COOKIE_CONFIG.domain;
        }

        var abCookie = roistatGetCookie(ROISTAT_AB_COOKIE);
        if (abCookie) {
            roistatSetCookie(ROISTAT_PREVIOUS_AB_COOKIE, abCookie, cookieConfigForSave);
        }

        roistatSetCookie(ROISTAT_AB_COOKIE, '', cookieConfigForDelete);
        roistatSetCookie(ROISTAT_AB_SUBMIT_COOKIE, '', cookieConfigForDelete);
    };

    var getAbVariants = function () {
        var tests = storage.getObject('abTesting');
        if (!isObject(tests)) {
            return '';
        }

        var testKey, test, variants = [];
        for (testKey in tests) {
            if (!Object.prototype.hasOwnProperty.call(tests, testKey)) {
                continue;
            }
            test = tests[testKey];
            variants.push(test.id + ':' + test.variantId);
        }

        return variants.join(',');
    }

    var setVisitIdCookie = function() {
        debug('Call: setVisitIdCookie');
        var calculateApiUrl = function() {
            var referrer = getEscapedReferrer(),
                visitId = window.roistatIsInitVisit === true ? getRoistatVisitId() : 0,
                ab = roistatGetCookie(ROISTAT_AB_COOKIE),
                guid = roistatGetCookie(ROISTAT_GUID_COOKIE),
                firstVisit = getRoistatFirstVisitId();
            ab = ab ? ab : '';
            firstVisit = firstVisit ? firstVisit : '';

            marker = marker && (!needOverrideByReferrer() || isMarkerParsedFromEnv) ? decodeURIComponentSafe(decodeURIComponentSafe(marker)) : '';
            var escapedInitUrl = encodeURIComponent(initUrl);
            debug('Calltracking: enabled=' + settings.callTrackingEnabled + ', manual=' + settings.callTrackingManual);
            var pageParams = JSON.stringify(window.roistat.page.params);
            var deviceParams = getDeviceParams();
            var encodedDeviceParams = '';
            for (var paramName in deviceParams) {
                if (!deviceParams.hasOwnProperty(paramName)) {
                    continue;
                }
                var value = deviceParams[paramName];
                if (value !== null) {
                    encodedDeviceParams += '&' + paramName + '=' + encodeURIComponent(value);
                }
            }
            var calculatedApiUrl = getApiBaseUrl()
                + '/addVisit?v=' + SCRIPT_VERSION
                + '&marker=' + encodeURIComponent(marker)
                + '&visit=' + visitId
                + '&first_visit=' + firstVisit
                + '&guid=' + guid
                + '&phone_prefix=' + roistatPhonePrefix
                + '&phone_prefix_bind=' + roistatPhonePrefixBind
                + '&phone_scripts_bind=' + roistatCalltrackingScripts
                + '&referrer=' + referrer
                + '&page=' + escapedInitUrl
                + '&ab=' + getEscapedQueryString(ab)
                + '&ab_variants=' + getEscapedQueryString(getAbVariants())
                + '&' + getVisitHashParamName() + '=' + getVisitHash()
                + (pageParams === '{}' ? '' : '&page_params=' + encodeURIComponent(pageParams))
                + ((!settings.callTrackingEnabled || settings.callTrackingManual) ? '&call_tracking_disabled=1' : '') + encodedDeviceParams;

            if (isVisitLogsFocusGroupEnabled) {
                sendLogRequest(
                    'visit init - calculateApiUrl: '
                    + 'pageVisitId: ' + pageVisitId
                    + ', marker: ' + marker
                    + ', visit: ' + getRoistatVisitId()
                    + ', first visit: ' + getRoistatFirstVisitId()
                    + ', url: ' + window.location.href
                    + ', initUrl: ' + initUrl
                    + ', document.referrer: ' + document.referrer
                    + ', local referrer: ' + referrer
                    + ', userAgent: ' + window.navigator.userAgent
                );
            }

            return calculatedApiUrl;
        };

        var sendJSONPRequest = function(apiUrl) {
            setTimeout(function() {
                debug('Call: setVisitIdCookie script creation after timeout');
                var script = document.createElement('script');
                script.onload = function() {
                    debug('Call: setVisitIdCookie script loaded');

                    if (isVisitLogsFocusGroupEnabled) {
                        sendLogRequest(
                            'visit init - setVisitIdCookie loaded: '
                            + 'pageVisitId: ' + pageVisitId
                            + ', marker: ' + marker
                            + ', visit: ' + getRoistatVisitId()
                            + ', first visit: ' + getRoistatFirstVisitId()
                            + ', url: ' + window.location.href
                            + ', initUrl: ' + initUrl
                            + ', document.referrer: ' + document.referrer
                            + ', local referrer: ' + referrer
                            + ', userAgent: ' + window.navigator.userAgent
                        );
                    }
                };
                script.src = appendMaParam(apiUrl);
                script.type = 'text/javascript';
                script.async = true;
                script.id = ROISTAT_SCRIPT_ID;
                var otherScript = document.getElementsByTagName('script')[0];
                otherScript.parentNode.insertBefore(script, otherScript);
                debug('Call: setVisitIdCookie appended ' + ((document.getElementById(ROISTAT_SCRIPT_ID)) ? 'true' : 'false'));
                debug('Call: sendJSONPRequest to URL ' + apiUrl);
                clearAbCookie();
            }, settings.jsonpRequestTimeout);
        };

        if (marker) {
            setMarkerCookie(marker);
            saveMarkerOld();
        }

        var nextGuid = roistatGetCookie(ROISTAT_NEXT_GUID_COOKIE);
        if (nextGuid) {
            roistatSetCookie(ROISTAT_GUID_COOKIE, nextGuid, COOKIE_CONFIG);
        }

        setCookieAdditionalParameters();
        var apiUrl = calculateApiUrl();
        sendJSONPRequest(apiUrl);
        referrer ? saveReferrer() : removeReferrer();
    };

    var sendAbTests = function() {
        debug("Call: sendAbTests");
        var calculateApiUrl = function() {
            var project = getProjectForUrl(),
                visitId = roistatGetCookie(ROISTAT_VISIT_COOKIE);
            return appendMaParam(protocol() + "//"+ROISTAT_HOST+"/site-api/"+API_VERSION+"/"+project+"/visit/"+visitId+"/addAbVariant");
        };

        var ab = roistatGetCookie(ROISTAT_AB_COOKIE);
        var previousAb = roistatGetCookie(ROISTAT_PREVIOUS_AB_COOKIE);

        if (ab === previousAb || !ab) {
            clearAbCookie();
            return;
        }

        var apiUrl = calculateApiUrl();
        apiUrl = apiUrl + "?ab=" + getEscapedQueryString(ab);

        var img = document.createElement('img');
        img.src = apiUrl;
        clearAbCookie();
    };

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var Browser = {
        isIE: function (version, comparison) {
            var cc      = 'IE',
                b       = document.createElement('B'),
                docElem = document.documentElement,
                isIE;

            if(version){
                cc += ' ' + version;
                if(comparison){ cc = comparison + ' ' + cc; }
            }

            b.innerHTML = '<!--[if '+ cc +']><b id="iecctest"></b><![endif]-->';
            docElem.appendChild(b);
            isIE = !!document.getElementById('iecctest');
            docElem.removeChild(b);
            return isIE;
        },
        isSafari: function() {
            var userAgent = window.navigator.userAgent.toLowerCase();
            return userAgent.includes('safari') && !userAgent.includes('chrome');
        }
    };

    var getLastUpdateTime = function() {
        return storage.get(SETTINGS_UPDATE_TIME_KEY);
    };

    var sendDebug = function() {
        var jsError = "";
        window.onerror = function(msg, url, line, col, error) {
            var extra = !col ? '' : ', column: ' + col;
            extra += !error ? '' : ', error: ' + error;
            jsError = jsError + ", " + "Error: " + msg + ", url: " + url + ", line: " + line + extra;
        };
        setTimeout(function() {
            var isError = false,
                message = "";
            var promoElements = getPromoElements();
            for (var i = 0; i < promoElements.length; i++) {
                var promoElement = promoElements[i];

                if (promoElement !== null && !promoElement.innerHTML) {
                    isError = true;
                    message = "Promo HTML: " + promoElement.innerHTML;
                }
            }
            if (!(roistatGetCookie(ROISTAT_VISIT_COOKIE) > 0)) {
                isError = true;
                message = message + "; roistat_visit = " + roistatGetCookie(ROISTAT_VISIT_COOKIE);
            }
            if (isError) {
                var responseScriptElement = document.getElementById(ROISTAT_SCRIPT_ID);
                var scriptExists = responseScriptElement ? 1 : 0;
                var agent = window.navigator.userAgent;
                message = encodeURIComponent(message);
                var img = document.createElement('img');
                img.src = appendMaParam(protocol() + "//"+ROISTAT_HOST+"/site-api/"+API_VERSION+"/"+getProjectForUrl()+"/debug?message="+message+"&agent="+agent+"&"+getVisitHashParamName()+"="+getVisitHash()+"&jserror="+jsError+"&scriptResponse="+scriptExists+"&version="+SCRIPT_VERSION+"&debug="+debugLog);
            }
        }, 20000);
    };

    /**
     * @returns {{width: (Number), height: (Number)}}
     */
    var getWindowSize = function() {
        var bodyTag = document.getElementsByTagName('body');
        var documentElement = document.documentElement;
        var x = 0,
            y = 0;
        if (bodyTag.length) {
            var body = bodyTag[0];
            x = window.innerWidth || documentElement.clientWidth || body.clientWidth;
            y = window.innerHeight|| documentElement.clientHeight|| body.clientHeight;
        } else {
            x = window.innerWidth || documentElement.clientWidth;
            y = window.innerHeight|| documentElement.clientHeight;
        }
        return { width: x, height: y };
    };

    var renderPromoCode = function() {
        var oldPromoCode = document.getElementsByClassName('roistat-promo-wrap');
        if (oldPromoCode.length) {
            debug('PromoCode: old promo code length - exit');
            return;
        }

        if (isRoistatMultiWidgetOnly()) {
            debug('PromoCode: Shut down because only online chat need to be inited');
            return;
        }

        var promoCodeSettings = storage.getObject(ROISTAT_PROMO_CODE);
        if (promoCodeSettings && promoCodeSettings.hasOwnProperty('is_enabled')) {
            window.roistat.promoCode.isEnabled = promoCodeSettings.is_enabled;
            debug('PromoCode: set is_enabled from storage');
        }

        var _renderPromoCode = function() {
            var div = document.createElement('div');
            div.innerHTML = roistatPromoCode;
            var bodyTag = document.getElementsByTagName('body');
            if (bodyTag.length) {
                bodyTag[0].appendChild(div);
            }
            debug('PromoCode: appended to body ' + roistatPromoCode.length);

            var promoCodeDiv = document.getElementsByClassName('roistat-promo-wrap')[0];
            if (!promoCodeDiv) {
                debug('PromoCode: roistat-promo-wrap not found, skip');
                return;
            }
            var promoCodeStyle = promoCodeDiv.style;

            var windowSize, promoCodeWidth, promoCodeHeight;

            setInterval(function() {
                windowSize = getWindowSize();
                promoCodeWidth = promoCodeDiv.offsetWidth;
                promoCodeHeight = promoCodeDiv.offsetHeight * 2;


                /*var fontSize = 1;
                 if (isMobile.any()) {
                 fontSize = fontSize * 2;
                 }
                 promoCodeStyle.fontSize = fontSize + 'em';*/

                switch(roistatPosition) {
                    case 'top_left': promoCodeStyle.left = 0; promoCodeStyle.top = 0; break;
                    case 'top': promoCodeStyle.left = ((windowSize.width - promoCodeWidth) / 2)+'px'; promoCodeStyle.top = 0; break;
                    case 'top_right': promoCodeStyle.right = 0; promoCodeStyle.top = 0; break;
                    case 'left': promoCodeStyle.left = 0; promoCodeStyle.top = ((windowSize.height - promoCodeHeight) / 2)+'px'; break;
                    case 'right': promoCodeStyle.right = 0; promoCodeStyle.top = ((windowSize.height - promoCodeHeight) / 2)+'px'; break;
                    case 'bottom_left': promoCodeStyle.left = 0; promoCodeStyle.bottom = 0; break;
                    case 'bottom': promoCodeStyle.left = ((windowSize.width - promoCodeWidth) / 2)+'px'; promoCodeStyle.bottom = 0; break;
                    case 'bottom_right': promoCodeStyle.right = 0; promoCodeStyle.bottom = 0; break;
                    default: promoCodeStyle.left = 0; promoCodeStyle.top = 0;
                }
            }, 500);
        };

        var promoCodeOptions = storage.getObject('promo_code_options');
        if (promoCodeOptions) {
            debug('PromoCode: options already set');
            window.roistatPromoCode = promoCodeOptions.template;
            window.roistatPosition = promoCodeOptions.position;
            _renderPromoCode();
        } else {
            if (!window.roistat.promoCode.isEnabled) {
                debug('PromoCode: is not available, skip');
                return;
            }

            var head = document.getElementsByTagName("head")[0] || document.documentElement;
            var script = document.createElement('script');
            script.src = appendMaParam(protocol() + "//"+ROISTAT_HOST+"/site-api/"+API_VERSION+"/"+getProjectForUrl()+"/getPromoCode");
            head.insertBefore( script, head.firstChild );
            debug('PromoCode: loading started');
            var done = false;
            script.onload = script.onreadystatechange = function() {
                if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
                    done = true;

                    // Handle memory leak in IE
                    script.onload = script.onreadystatechange = null;
                    if ( head && script.parentNode ) {
                        head.removeChild( script );
                    }
                }
                if (!done) {
                    return;
                }
                debug('PromoCode: loaded');
                if (typeof roistatPromoCode === 'undefined' || roistatPromoCode.length < 1) {
                    debug('PromoCode: is disabled');
                    return;
                }
                promoCodeOptions = {
                    template: roistatPromoCode,
                    position: roistatPosition
                };
                storage.setObject('promo_code_options', promoCodeOptions);
                _renderPromoCode();
            };
        }
    };

    /**
     * @param {Array} haystack
     * @param {*} needle
     * @returns {boolean} whether needle found in haystack
     */
    var arrayContains = function (haystack, needle) {
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle) {
                return true;
            }
        }
        return false;
    };

    var sendLogMessage = function(message) {
        if (!isApiLogFocusGroupEnabled || message === "") {
            return;
        }

        var visitId = getRoistatVisitId();
        sendLogRequest("visit: " + visitId + " " + message);
    };

    var sendLogRequest = function(message) {
        var url = getApiBaseUrl() + '/log?log=' + encodeURIComponent(message);
        sendApiRequestJSONP(url);
    };

    var bindSPAEvents = function bindSPAEvents() {
        var userSideClientPopStateListener = window.onpopstate;
        var userSideClientPushStateListener = window.history.pushState;
        var userSideClientReplaceStateListener = window.history.replaceState;

        _addEventListener(window, 'popstate', function spaOnPopState(event){
            debug('[Roistat]: popstate event catch');
            spaPageChanged();

            if (isBetaTest() && typeof userSideClientPopStateListener === 'function') {
                userSideClientPopStateListener(event);
            }
        });
        _addEventListener(window.history, 'pushState', function spaOnPushState(state, title, url){
            debug('[Roistat]: pushState event catch');
            spaPageChanged();

            if (isBetaTest() && typeof userSideClientPushStateListener === 'function') {
                userSideClientPushStateListener.apply(this, [state, title, url]);
            }
        });
        _addEventListener(window.history, 'replaceState', function spaOnReplaceState(stateObject, title, url){
            debug('[Roistat]: replaceState event catch');
            spaPageChanged();

            if (isBetaTest() && typeof userSideClientReplaceStateListener === 'function') {
                userSideClientReplaceStateListener.apply(this, [stateObject, title, url]);
            }
        });
    };

    (function onRoistatModuleLoadingComplete(){
        bindSPAEvents();
        if (window.onRoistatModuleLoaded !== undefined && typeof window.onRoistatModuleLoaded === 'function') {
            window.onRoistatModuleLoaded();
        }
    })();

    (function crossdevice(){
        var ROISTAT_CROSSDEVICE_HOST = 'fngr.' + getBaseHost(ROISTAT_HOST);

        var IS_ENABLED = false;

        if (!IS_ENABLED) {
            debug('Fingerprint: disabled');
            return;
        }

        window.roistat.crossdevice = {
            registerFingerprint: function crossdeviceRegisterFingerprint(fingerprintData) {
                debug('Fingerprint: collected data ' + JSON.stringify(fingerprintData));
                roistat.registerOnVisitProcessedCallback(function () {
                    debug('Fingerprint: sending to service');
                    var values = Object.keys(fingerprintData)
                        .map(function(key){
                            return fingerprintData[key].key+"="+encodeURIComponent(fingerprintData[key].data)
                        })
                        .join('&');

                    values = values + '&visit='+getProjectForUrl()+'|'+getRoistatFirstVisitId()+'|'+roistat.getVisit();
                    values += '&host=' + encodeURIComponent(window.location.host);

                    var apiUrl = protocol() + '//'+ROISTAT_CROSSDEVICE_HOST+'/register?'+values;
                    sendApiRequestJSONP(apiUrl);
                });
            },
            markVisit: function crossdeviceMarkVisit(value) {
                debug('Fingerprint: marking visit ' + value);
                // todo set visit crossdevice param called by jsonp request by crossdevice service on /register
            },
        };

        debug("Fingerprint: initialising library");
        var apiUrl = protocol() + "//"+ROISTAT_CROSSDEVICE_HOST+"/static/fingerprint.js";
        sendApiRequestJSONP(apiUrl);
    })();

    var isPageEnabled = function(targetPagesList) {
        /**
         * @param {String} currentUrl
         * @param {String} settingUrl
         * @returns {Boolean}
         */
        var _checkHref = function(currentUrl, settingUrl) {
            var result;
            if (inString(settingUrl, '*')) {
                var pattern = new RegExp(settingUrl.split("*").join(".*"));
                result =  pattern.test(currentUrl);
            } else {
                result = currentUrl === settingUrl;
            }
            debug('LeadHunter: compare current: ' + currentUrl + ', setting: ' + settingUrl + ' with result = ' + (result ? 1 : 0));
            return result;
        };

        var href = window.location.href,
            isCurrentPageEnabled = false,
            isCurrentPageDisabled = false,
            cleanHref = '',
            whiteListCount = 0,
            targetPages;

        targetPages = targetPagesList ? targetPagesList.split(",") : [];

        if (!href || targetPages.length === 0) {
            isCurrentPageEnabled = true;
        } else {
            cleanHref = extractHostAndPath(href);
            var targetPage;
            for (var i = 0; i < targetPages.length; i++) {
                targetPage = targetPages[i].split("www.").join("").split("http://").join("").split("https://").join("").replace(/\/+$/, "");
                if (/^!/.test(targetPage)) {
                    if (_checkHref(cleanHref, targetPage.split(/^!/).join(""))) {
                        isCurrentPageDisabled = true;
                        break;
                    }
                } else {
                    whiteListCount++;
                    if (_checkHref(cleanHref, targetPage)) {
                        isCurrentPageEnabled = true;
                        break;
                    }
                }
            }
        }

        if (isCurrentPageDisabled) {
            debug('LeadHunter: current page "' + cleanHref + '" is disabled by list');
            return false;
        }
        if (!isCurrentPageEnabled && whiteListCount > 0) {
            debug('LeadHunter: current page "' + cleanHref + '" is not listed');
            return false;
        }
        debug('LeadHunter: current page "' + href + '", cleaned: "' + cleanHref + '" is not disabled in ' + targetPages.length + ' list of pages');
        return true;
    };

    // @todo move module init to bottom, because submodules are to register their global functions before onRoistatModuleLoadedEvent
    try {
        init();
    } catch(e) {
        sendLogMessage(e);
    }

    (function widgets() {
        var EMPTY_FLAG                          = 'empty',
            isLeadHunterPulsatorEnabled         = false,
            isLeadHunterPulsatorShownAtThisPage = true,
            hasMultiwidgetFocusGroup            = false;

        var onlineChatParams = {
            roistat_visit: roistatGetCookie(ROISTAT_VISIT_COOKIE),
            marker: marker,
            user_agent: window.navigator.userAgent,
            current_page: {
                title: document.title,
                href: window.location.protocol + '//' + window.location.host + window.location.pathname,
            },
        };
        /**
         * @param {HTMLElement} obj
         * @param {String} evType
         * @param {Function} fn
         */
        var _addEvent = function(obj, evType, fn) {
            if (obj.addEventListener) {
                obj.addEventListener(evType, fn, false);
            } else if (obj.attachEvent) {
                obj.attachEvent("on" + evType, fn);
            } else {
                debug("Handler could not be attached");
            }
        };

        /**
         *
         * @param {HTMLElement} obj
         * @param {String} className
         * @private
         */
        var _getSafeFirstElementByClassName = function (obj, className) {
            if (obj === undefined || typeof className !== 'string' || className.length === 0) {
                return;
            }

            var elements = obj.getElementsByClassName(className);

            if (elements === undefined || elements.length === 0) {
                return;
            }

            return elements[0];
        }

        /**
         *
         * @param {HTMLElement} node
         * @private
         */
        var _isNodeElement = function (node) {
            return typeof node === 'object' && node !== null;
        }

        var toggleElementClass = function(element, elementClass, needAddClass) {
            if (_isNodeElement(element)) {

                if (needAddClass) {
                    element.classList.add(elementClass);

                    return;
                }

                element.classList.remove(elementClass);
            }
        };

        var visualViewport = window.visualViewport;
        var isVisualViewportSupported = 'visualViewport' in window;

        var getSafeDivisor = function(value) {
            return (value === 0) ? 1 : value;
        };

        var getPulsatorScaleValue = function() {
            var scaleValue;
            if (isVisualViewportSupported) {
                scaleValue = 1 / getSafeDivisor(visualViewport.scale);
            } else {
                scaleValue = window.innerWidth / getSafeDivisor(window.outerWidth);
            }
            return scaleValue;
        };

        var getPulsatorScale = function() {
            if (isMobileOrTabletWindowWidth()) {
                return 'none';
            }

            return 'scale(' + getPulsatorScaleValue() + ')';
        };

        var getPulsatorTriggerScale = function() {
            if (!isMobileOrTabletWindowWidth()) {
                return 'none';
            }

            return 'scale(' + getPulsatorScaleValue() + ')';
        }

        var availableWidgets = {
            leadHunter: function() {
                var FORM_CLASS           = 'roistat-lh-form',
                    FORM_ID                = 'roistat-lh-form',
                    HEAD_CLASS             = 'roistat-lh-head-text',
                    HEAD_ID                = 'roistat-lh-head',
                    THANK_YOU_CLASS        = 'roistat-lh-thank-you',
                    THANK_YOU_ID           = 'roistat-lh-thank-you',
                    CLOSE_ID               = 'roistat-lh-close',
                    SUBMIT_ID              = 'roistat-lh-submit',
                    HIDDEN_CLASS           = 'roistat-lh-hidden',
                    WRAP_CLASS             = 'roistat-lh-wrap',
                    POPUP_ROOT_CLASS       = 'roistat-lh-popup-wrapper',
                    POPUP_CLASS            = 'roistat-lh-popup',
                    AGREEMENT_ID           = 'roistat-lh-agreement',
                    AGREEMENT_CLASSES      = 'roistat-lh-agreement roistat-lh-mobile',
                    AGREEMENT_INPUT_ID     = 'roistat-lh-agreement-input',
                    AGREEMENT_LINK_ID      = 'roistat-lh-agreement-link',
                    AGREEMENT_DOC_ID       = 'roistat-lh-agreement-doc',
                    AGREEMENT_ERROR_ID     = 'roistat-lh-alert-row',
                    AGREEMENT_CONTAINER_ID = 'roistat-lh-agreement',
                    IFRAME_ID              = 'roistat-lh-popup-iframe',

                    // Cookie settings
                    URL                             = "roistat_leadHunterUrl",
                    APPEARANCE_URL                  = "roistat_leadHunterAppearanceUrl",
                    PAGES_LIST                      = "roistat_leadHunterTargetPagesList",
                    CAUGHT                          = 'roistat_leadHunterCaught',
                    MINIMUM_TIME                    = 'roistat_leadHunterMinTime',
                    AUTO_SHOW_TIME                  = 'roistat_leadHunterAutoShowTime',
                    PULSATOR_ENABLED                = 'roistat_leadHunterPulsatorEnabled',
                    LEAD_HUNTER_SCRIPTS_CAUGHT      = 'roistat_leadHunterScriptsCaught',
                    LEAD_HUNTER_SCRIPTS_SHOWN_COUNT = 'roistat_leadHunterScriptsShownCount',

                    // Messages types
                    LOAD_DONE_MESSAGE          = 'roistat-lh-load-done',
                    CLOSE_MODAL_MESSAGE        = 'roistat-lh-close-modal',
                    SCRIPT_SETTINGS_MESSAGE    = 'roistat-lh-script-settings',
                    IFRAME_SETTING_SIZE        = 'roistat-lh-setting-size',
                    BEFORE_SUBMIT_MESSAGE      = 'roistat-lh-before-submit',
                    BEFORE_SUBMIT_DONE_MESSAGE = 'roistat-lh-before-submit-done',
                    AFTER_SUBMIT_MESSAGE       = 'roistat-lh-after-submit',
                    EVENT_DATA_MESSAGE         = 'roistat-lh-event-data',
                    TRANSLATE_FORM_MESSAGE     = 'roistat-lh-translate-form',

                    PULSATOR_POSITION_BY_LABEL = {
                        topLeft: {
                            bottom: '80%',
                            right: 'auto',
                            transformOrigin: 'top left'
                        },
                        topRight: {
                            bottom: '80%',
                            right: '3%',
                            transformOrigin: 'top right'
                        },
                        bottomRight: {
                            bottom: '10%',
                            right: '3%',
                            transformOrigin: 'bottom right'
                        },
                        bottomLeft: {
                            bottom: '10%',
                            right: 'auto',
                            transformOrigin: 'bottom left'
                        }
                    };

                var calculatingZone    = .3,
                    modalZone            = .001,
                    isModalShown         = false,
                    startTime            = 0,
                    previousTop          = 0,
                    lastY                = 0,
                    minTime              = 0,
                    autoTime             = 0,
                    isExpired            = false,
                    isCentered           = false,
                    isIframeLeadHunterSuccessfullyLoaded = false,

                    pulsatorElement, pulsatorFill, pulsatorIcon, popupElement, wrapElement, headElement, formElement, thankYouElement, closeElement, submitElement,
                    agreementElement, agreementLink, agreementInput, agreementDoc, agreementError, agreementContainer, leadHunterUrl, leadHunterAppearanceUrl, isIframedLeadHunter,
                    iframeTargetOrigin, lhIframe, lhScriptId, lhScriptMaxShownCount, leadHunterPulsatorSettings;

                var localState = {
                    pulsator: {
                        previousClass: ''
                    },
                    leave: {
                        isShowEnabled: false
                    },
                    timeoutId: 0
                };

                /**
                 * @param {String|Number} value
                 * @returns {string}
                 */
                var encodeForUrl = function(value) {
                    var tempEncodeURIComponent = encodeURIComponent ? encodeURIComponent : encodeURI;
                    return tempEncodeURIComponent(value);
                };

                /**
                 * @return {Boolean} true if continue
                 */
                var checkLeadHunterLaunch = function() {
                    if (!window.roistat.leadHunter.isEnabled) {
                        return false;
                    }
                    if (window.roistatLeadHunterInited) {
                        return false;
                    }
                    window.roistatLeadHunterInited = true;
                    if (storage.get(LEAD_HUNTER_ENABLED) < 1) {
                        debug('LeadHunter: disabled');
                        return false;
                    }
                    return true;
                };

                /**
                 * @return {Boolean} True if all necessary settings setupped
                 */
                var initSettings = function() {
                    leadHunterUrl = storage.get(URL);
                    if (!leadHunterUrl) {
                        debug("LeadHunter: not active cause of empty url");
                        return false;
                    }

                    requireCss();
                    leadHunterAppearanceUrl = storage.get(APPEARANCE_URL);
                    minTime = storage.get(MINIMUM_TIME);
                    autoTime = window.roistat.leadHunter.form.autoShowTime === null ? storage.get(AUTO_SHOW_TIME) : window.roistat.leadHunter.form.autoShowTime;
                    isLeadHunterPulsatorEnabled = storage.get(PULSATOR_ENABLED) == 1;
                    checkExpired();
                    debug('LeadHunter: initSettings end, isLeadHunterPulsatorEnabled: ' + (isLeadHunterPulsatorEnabled ? 1 : 0));
                    return true;
                };

                var isAlreadyCaught = function() {
                    if (isLeadHunterShowsLimitFocusGroupEnabled) {
                        return isCurrentLeadHunterScriptSubmitted() || isCurrentScriptMaxShownCountReached();
                    }

                    return storage.get(CAUGHT) > 0;
                };

                var checkExpired = function() {
                    if (!(roistatGetCookie(LEAD_HUNTER_EXPIRE_COOKIE) > 0)) {
                        debug('LeadHunter: not active, expired for this visit');
                        isExpired = true;
                    }
                };

                var triggerLoadDoneEvent = function(needUpdateShownCount) {
                    isIframeLeadHunterSuccessfullyLoaded = true;
                    iframeTargetOrigin = lhIframe.src;

                    var data = {
                        version: SCRIPT_VERSION,
                        additionalNotifyEmail: window.roistat.leadHunter.additionalNotifyEmail,
                        projectKey: getProjectForUrl(),
                        language: leadHunterLanguage,
                        visitId: getVisitIdForLeadCreation(),
                        moduleTargetOrigin: window.location.origin,
                        referrer: window.location.href,
                        windowWidth: window.innerWidth || 0,
                        iframeWrapperWidth: popupElement.offsetWidth || 0,
                        sendRequestUrl: storage.get(URL),
                        message: LOAD_DONE_MESSAGE
                    };

                    lhIframe.contentWindow.postMessage(data, iframeTargetOrigin);
                    sendEventMessage();

                    if (needUpdateShownCount && isPageEnabled(storage.get(PAGES_LIST))) {
                        debug('iframe fired, rise up iframe show count state');
                        increaseLeadHunterScriptShownCount();
                    }
                };

                var leadHunterShowInCenter = function() {
                    isCentered = true;
                    showModal('click');
                    triggerLoadDoneEvent();
                    moveModalCenter();
                };

                var checkHashForShow = function() {
                    var hash = window.location.hash;
                    if (!hash) {
                        return;
                    }
                    if (inString(hash, 'roistat-lead-hunter')) {
                        leadHunterShowInCenter();
                    }
                };

                var bindShowOnTimeout = function leadHunterBindShowOnTimeOut() {
                    debug('LeadHunter: binding timeout');

                    if (isExpired) {
                        debug('LeadHunter: leadhunter is expired, no timeout show allowed');
                        return;
                    }
                    if (isModalShown) {
                        debug('LeadHunter: leadhunter was shown, no timeout show allowed');
                        return;
                    }

                    if (autoTime > 0) {
                        var delay = (startTime - currentTime()) + autoTime*1000;
                        debug('LeadHunter: binding timeout with delay '+delay+' ms');
                        clearTimeout(localState.timeoutId);
                        localState.timeoutId = setTimeout(function() {
                            debug('LeadHunter: form auto activate with autoTime = ' + autoTime);

                            if (isLeadHunterShowsLimitFocusGroupEnabled && isAlreadyCaught()) {
                                return;
                            }

                            // This is timeout function call, it is possible, that form was shown after timeout was set
                            if (!isModalShown) {
                                debug('LeadHunter: show by timeout');
                                isCentered = true;
                                showModal('auto');
                                triggerLoadDoneEvent(true);
                                moveModalCenter();
                            }
                        }, delay);
                    } else {
                        clearTimeout(localState.timeoutId);
                        debug('LeadHunter: auto show time is not positive, feature disabled');
                    }
                };

                var bindEvents = function() {
                    closeElement.onclick = wrapElement.onclick = hideModal;
                    submitElement.onclick = submit;

                    if (_isNodeElement(agreementLink)) {
                        _addEvent(agreementLink, 'click', showPolicy);
                    }

                    if (_isNodeElement(agreementInput)) {
                        _addEvent(agreementInput, 'change', toggleAgreement);
                    }

                    var inputs = document.getElementsByClassName('roistat-lh-input');
                    if (Array.isArray(inputs)) {
                        for (var i = 0; i < inputs.length; i++) {
                            _addEvent(inputs[i], 'keyup', function (e) {
                                e = e || event;
                                var code = (e.keyCode ? e.keyCode : e.which);
                                if (code == 13) {
                                    submit();
                                }
                            });
                        }
                    }

                    var currentOnResize = window.onresize;
                    window.onresize = function (e) {
                        if (currentOnResize) {
                            currentOnResize(e);
                        }
                        arrange(e);
                    };

                    if (!isExpired) {
                        var currentOnMouseOut = document.onmouseout;
                        document.onmouseout = function (e) {
                            if (currentOnMouseOut) {
                                currentOnMouseOut(e);
                            }
                            checkCursor(e);
                        };
                    }

                    if (isLeadHunterPulsatorEnabled && !isNeedRenderMultiwidget() && _isNodeElement(pulsatorElement)) {
                        pulsatorElement.onmouseover = function(){
                            addClass(pulsatorElement, 'roistat-lh-pulsator-hover');
                        };
                        pulsatorElement.onmouseout = function(){
                            removeClass(pulsatorElement, 'roistat-lh-pulsator-hover');
                        };

                        pulsatorElement.onclick = function() {
                            leadHunterShowInCenter();
                        }

                        window.addEventListener('resize', function handleWindowResize() {
                            if (_isNodeElement(pulsatorElement)) {
                                pulsatorElement.style.transform = getPulsatorScale();
                            }
                        });

                        if (isVisualViewportSupported) {
                            visualViewport.addEventListener('resize', function handleViewportResize() {
                                if (_isNodeElement(pulsatorElement)) {
                                    pulsatorElement.style.transform = getPulsatorScale();
                                }
                            });
                        }
                    }

                    var oldHashChange = window.onhashchange;
                    window.onhashchange = function () {
                        if (oldHashChange) {
                            oldHashChange.apply(this, arguments);
                        }
                        checkHashForShow();
                    };
                };

                var bindIframeEvents = function() {
                    if (isLeadHunterPulsatorEnabled && !isNeedRenderMultiwidget() && _isNodeElement(pulsatorElement)) {
                        pulsatorElement.onmouseover = function(){
                            addClass(pulsatorElement, 'roistat-lh-pulsator-hover');
                        };
                        pulsatorElement.onmouseout = function(){
                            removeClass(pulsatorElement, 'roistat-lh-pulsator-hover');
                        };

                        pulsatorElement.onclick = function() {
                            leadHunterShowInCenter();
                        }

                        window.addEventListener('resize', function handleWindowResize() {
                            pulsatorElement.style.transform = getPulsatorScale();
                        });

                        if (isVisualViewportSupported) {
                            visualViewport.addEventListener('resize', function handleViewportResize() {
                                if (_isNodeElement(pulsatorElement)) {
                                    pulsatorElement.style.transform = getPulsatorScale();
                                }
                            });
                        }
                    }

                    wrapElement.onclick = hideModal;
                    lhIframe = document.getElementById(IFRAME_ID);

                    if (_isNodeElement(lhIframe)) {
                        _addEvent(lhIframe, 'load', function () {
                            triggerLoadDoneEvent();
                            tuneAppearanceForPage();
                        });
                    }

                    var currentOnResize = window.onresize;
                    window.onresize = function (e) {
                        if (currentOnResize) {
                            currentOnResize(e);
                        }
                        arrange(e);
                    };

                    if (!isExpired) {
                        var currentOnMouseOut = document.onmouseout;
                        document.onmouseout = function (e) {
                            if (currentOnMouseOut) {
                                currentOnMouseOut(e);
                            }

                            if (!isLeadHunterShowsLimitFocusGroupEnabled) {
                                debug('ShowLimit: Beta Test off, check cursor usually');
                                checkCursor(e);
                            } else {
                                debug('ShowLimit: check cursor by caught or max show limit');

                                if (!isAlreadyCaught()) {
                                    debug('ShowLimit: Check cursor allowed');
                                    checkCursor(e, true);
                                }
                            }
                        };
                    }

                    var oldHashChange = window.onhashchange;
                    window.onhashchange = function () {
                        if (oldHashChange) {
                            oldHashChange.apply(this, arguments);
                        }
                        checkHashForShow();
                    };
                };

                /**
                 * @param {String} className
                 * @returns {HTMLElement}
                 */
                var _getElementByClass = function(className) {
                    var element = document.getElementsByClassName(className);
                    if (element.length > 0) {
                        return element[0];
                    } else {
                        return null;
                    }
                };

                var processJsFormSettings = function() {
                    var titleElement = _getElementByClass('roistat-lh-title');
                    if (_isNodeElement(titleElement) && roistat.leadHunter.form.title) {
                        titleElement.innerHTML = roistat.leadHunter.form.title;
                    }
                    var subTitleElement = _getElementByClass('roistat-lh-sub-title');
                    if (_isNodeElement(subTitleElement) && roistat.leadHunter.form.subTitle) {
                        subTitleElement.innerHTML = roistat.leadHunter.form.subTitle;
                    }
                    var thankYouElement = _getElementByClass('roistat-lh-thank-you');
                    if (_isNodeElement(thankYouElement) && roistat.leadHunter.form.thankYouText) {
                        thankYouElement.innerHTML = roistat.leadHunter.form.thankYouText;
                    }
                    var buttonElement = _getElementByClass('roistat-lh-submit');
                    if (_isNodeElement(buttonElement) && roistat.leadHunter.form.buttonText) {
                        buttonElement.value = roistat.leadHunter.form.buttonText;
                    }
                    var nameLabelElement = _getElementByClass('roistat-lh-text-label-name');
                    if (_isNodeElement(nameLabelElement) && roistat.leadHunter.form.nameLabel) {
                        nameLabelElement.innerHTML = roistat.leadHunter.form.nameLabel;
                    }
                    var contactLabelElement = _getElementByClass('roistat-lh-text-label-contact');
                    if (_isNodeElement(contactLabelElement) && roistat.leadHunter.form.contactLabel) {
                        contactLabelElement.innerHTML = roistat.leadHunter.form.contactLabel;
                    }
                };

                /**
                 * @param {String} formTemplate
                 * @param {String} pulsatorTemplate
                 * @param {Object} pulsatorSettings
                 */
                var processForm = function(formTemplate, pulsatorTemplate, pulsatorSettings) {
                    if (document.body === null) {
                        return;
                    }

                    var tempElement;
                    if (!formTemplate) {
                        debug('LeadHunter: deactivating, empty form');
                    } else {
                        debug('LeadHunter: rendering hidden form');
                    }

                    wrapElement     = document.createElement('div');
                    popupElement    = document.createElement('div');
                    popupElement.innerHTML = formTemplate;
                    wrapElement.className  = HIDDEN_CLASS;
                    popupElement.className = HIDDEN_CLASS;
                    debug('LeadHunter: processForm, isLeadHunterPulsatorEnabled: ' + (isLeadHunterPulsatorEnabled ? 1 : 0));

                    if (pulsatorTemplate && isLeadHunterPulsatorEnabled && pulsatorSettings && !isNeedRenderMultiwidget()) {
                        var pulsatorPosition = typeof pulsatorSettings.position === 'string' && pulsatorSettings.position !== ''
                            ? pulsatorSettings.position
                            : 'bottomRight';

                        tempElement = document.createElement('div');
                        tempElement.innerHTML = pulsatorTemplate;
                        pulsatorElement = tempElement.childNodes.item(0);
                        pulsatorFill = pulsatorElement.childNodes.item(1);
                        pulsatorIcon = pulsatorElement.childNodes.item(2).childNodes.item(0);

                        pulsatorFill.setAttribute('style', 'background: ' + pulsatorSettings.button.background + ';');
                        pulsatorIcon.setAttribute('style', 'fill: ' + pulsatorSettings.button.color + ';');
                        pulsatorElement.setAttribute('style',
                            'bottom: ' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].bottom + ';'
                            + 'right:' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].right + ';'
                        );

                        pulsatorElement.style.transformOrigin = PULSATOR_POSITION_BY_LABEL[pulsatorPosition].transformOrigin;
                        pulsatorElement.style.transform = getPulsatorScale();

                        localState.pulsator.previousClass = pulsatorElement.className;
                        pulsatorElement.className = HIDDEN_CLASS;
                        document.body.appendChild(pulsatorElement);
                    }

                    document.body.appendChild(wrapElement);
                    document.body.appendChild(popupElement);

                    headElement        = document.getElementById(HEAD_ID);
                    formElement        = document.getElementById(FORM_ID);
                    thankYouElement    = document.getElementById(THANK_YOU_ID);
                    closeElement       = document.getElementById(CLOSE_ID);
                    submitElement      = document.getElementById(SUBMIT_ID);
                    agreementElement   = document.getElementById(AGREEMENT_ID);
                    agreementInput     = document.getElementById(AGREEMENT_INPUT_ID);
                    agreementLink      = document.getElementById(AGREEMENT_LINK_ID);
                    agreementDoc       = document.getElementById(AGREEMENT_DOC_ID);
                    agreementError     = document.getElementById(AGREEMENT_ERROR_ID);
                    agreementContainer = document.getElementById(AGREEMENT_CONTAINER_ID);

                    var popupRoot = _getElementByClass(POPUP_ROOT_CLASS);
                    isIframedLeadHunter = _isNodeElement(popupRoot) && popupRoot.getAttribute('data-is-iframe');

                    if (isIframedLeadHunter) {
                        bindIframeEvents();
                    } else {
                        processJsFormSettings();
                        bindEvents();
                        checkHashForShow();
                        tuneAppearanceForPage();
                    }
                };

                var updatePulsatorStyles = function (pulsatorSettings) {
                    var hasPulsatorStyles = pulsatorSettings.button
                        && pulsatorSettings.button.background
                        && pulsatorSettings.button.color;

                    if (!hasPulsatorStyles) {
                        return;
                    }

                    storage.setObject(LEAD_HUNTER_PULSATOR_SETTINGS, leadHunterPulsatorSettings);

                    var pulsatorPosition = typeof pulsatorSettings.position === 'string' && pulsatorSettings.position !== ''
                        ? pulsatorSettings.position
                        : 'bottomRight';

                    if (_isNodeElement(pulsatorFill)) {
                        pulsatorFill.setAttribute('style', 'background: ' + pulsatorSettings.button.background + ';');
                    }

                    if (_isNodeElement(pulsatorIcon)) {
                        pulsatorIcon.setAttribute('style', 'fill: ' + pulsatorSettings.button.color + ';');
                    }

                    if (_isNodeElement(pulsatorElement)) {
                        pulsatorElement.setAttribute('style',
                            'bottom: ' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].bottom + ';'
                            + 'right:' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].right + ';'
                        );

                        pulsatorElement.style.transformOrigin = PULSATOR_POSITION_BY_LABEL[pulsatorPosition].transformOrigin;
                        pulsatorElement.style.transform = getPulsatorScale();
                    }
                };

                var initForm = function() {
                    var formTemplate = storage.get(LEAD_HUNTER_FORM_TEMPLATE),
                        pulsatorTemplate = storage.get(LEAD_HUNTER_PULSATOR_TEMPLATE),
                        pulsatorSettings = storage.getObject(LEAD_HUNTER_PULSATOR_SETTINGS);

                    if (pulsatorSettings !== null) {
                        processForm(Base64.decode(formTemplate), Base64.decode(pulsatorTemplate), pulsatorSettings);
                    }
                };

                var showThankYou = function() {
                    var width = popupElement.clientWidth,
                        height = popupElement.clientHeight;

                    if (_isNodeElement(popupElement)) {
                        popupElement.setAttribute('style', popupElement.getAttribute('style') + ' width: ' + width + 'px; height: ' + height + 'px;');
                    }

                    if (_isNodeElement(formElement)) {
                        formElement.className = HIDDEN_CLASS;
                    }

                    if (_isNodeElement(headElement)) {
                        headElement.className = HIDDEN_CLASS;
                    }

                    if (_isNodeElement(agreementElement)) {
                        agreementElement.className = HIDDEN_CLASS;
                    }

                    if (_isNodeElement(thankYouElement)) {
                        thankYouElement.setAttribute('style', 'width: '+width+'px; height: '+height+'px; display: table-cell;');
                        thankYouElement.className = THANK_YOU_CLASS;
                    }
                    setTimeout(function() {
                        debug('LeadHunter: close form after timeout');
                        hideModal();
                    }, 7000);
                };

                var moveModalCenter = function(){
                    var top = Math.round((getWindowHeight() - popupElement.clientHeight) / 2);
                    var left = Math.round((getWindowWidth() - popupElement.clientWidth) / 2);

                    if (_isNodeElement(popupElement)) {
                        popupElement.setAttribute('style', 'left: ' + left + 'px; top: ' + Math.max(0, top) + 'px;');
                    }
                };

                var showModal = function(eventType) {
                    if (!isPageEnabled(storage.get(PAGES_LIST))) {
                        return;
                    }

                    if (window.roistat.leadHunter.onBeforeAppear) {
                        debug("LeadHunter: process user defined onBeforeAppear");
                        window.roistat.leadHunter.onBeforeAppear(eventType);
                        if (isIframedLeadHunter) {
                            sendEventMessage();
                        }
                    }

                    if (_isNodeElement(popupElement)) {
                        popupElement.setAttribute('style', 'left:20px;top:-20px;opacity:0');
                        popupElement.className = POPUP_CLASS;
                    }

                    if (_isNodeElement(wrapElement)) {
                        wrapElement.className = WRAP_CLASS;
                    }

                    if (_isNodeElement(formElement)) {
                        formElement.className = FORM_CLASS;
                    }

                    if (_isNodeElement(headElement)) {
                        headElement.className = HEAD_CLASS;
                    }

                    if (_isNodeElement(agreementElement)) {
                        agreementElement.className = AGREEMENT_CLASSES;
                    }

                    if (_isNodeElement(thankYouElement)) {
                        thankYouElement.setAttribute('style', '');
                        thankYouElement.className = HIDDEN_CLASS;
                    }

                    if (_isNodeElement(wrapElement)) {
                        wrapElement.setAttribute('style', 'opacity:0;');
                    }

                    isModalShown = true;
                    setTimeout(function(){
                        wrapElement.setAttribute('style', 'opacity:.5;');
                    }, 10);

                    var roistatId = roistatGetCookie(ROISTAT_VISIT_COOKIE),
                        url = leadHunterAppearanceUrl + "?visit_id=" + roistatId + "&page=" + getCurrentPage();

                    sendRequestByUrl(url);

                    if (window.roistat.leadHunter.onAfterAppear) {
                        debug("LeadHunter: process user defined onAfterAppear");
                        window.roistat.leadHunter.onAfterAppear(roistatId, wrapElement, popupElement, formElement);
                        if (isIframedLeadHunter) {
                            sendEventMessage();
                        }
                    }
                };

                var processPage = function leadHunterProcessPage() {
                    startTime = currentTime();
                    initForm();
                    debug('LeadHunter: form initialized');
                };

                var tuneAppearanceForPage = function leadHunterTuneAppearanceForPage() {
                    debug('LeadHunter: tuning appearance for page');

                    if (!isPageEnabled(storage.get(PAGES_LIST)) || (storage.get(LEAD_HUNTER_DEFAULT_SCRIPT_ID) && !storage.get(LEAD_HUNTER_CURRENT_SCRIPT_ID))) {
                        debug('LeadHunter: disabled on page');
                        localState.leave.isShowEnabled = false;
                        clearTimeout(localState.timeoutId);
                        if (isNeedRenderMultiwidget()) {
                            isLeadHunterPulsatorShownAtThisPage = false;
                            roistatHideMultiwidgetLeadHunterOption();
                        }

                        if (_isNodeElement(pulsatorElement)) {
                            pulsatorElement.className = HIDDEN_CLASS;
                        }
                    } else {
                        debug('LeadHunter: enabled on page');

                        if (!isLeadHunterShowsLimitFocusGroupEnabled && !isAlreadyCaught()) {
                            debug('ShowLimit: Beta Test off, bindShowOnTimeout usually');
                            localState.leave.isShowEnabled = true;
                            bindShowOnTimeout();
                        }

                        if (isLeadHunterShowsLimitFocusGroupEnabled) {
                            debug('ShowLimit: bindShowOnTimeout by caught or max show limit');
                            if (!isAlreadyCaught()) {
                                debug('ShowLimit: bindShowOnTimeout allowed');
                                localState.leave.isShowEnabled = true;
                                bindShowOnTimeout();
                            }
                        }

                        if (_isNodeElement(pulsatorElement)) {
                            pulsatorElement.className = localState.pulsator.previousClass;
                        }
                    }
                };

                var processSinglePageAppChange = function leadHunterSinglePageAppChanged() {
                    debug('LeadHunter: processing single page application state change');
                    startTime = currentTime();
                    tuneAppearanceForPage();
                };

                var bindGlobalEvents = function leadHunterBindGlobalEvents() {
                    addSPAPageChangedCallback(processSinglePageAppChange);

                    var updateSizeSettings = function () {
                        var HTML_DOCUMENT = document.querySelector("html"),
                            MOBILE_MARKUP_BREAKPOINT = 600,
                            MOBILE_MARKUP_BREAKPOINT_XS = 300,
                            WINDOW_WIDTH = window.innerWidth,
                            ZOOM_VALUE = getComputedStyle(HTML_DOCUMENT).zoom,
                            sizeSettings = {};

                        var getComputedZoomLevel = function () {
                            var zoom = HTML_DOCUMENT.style.cssText.split(';').find(function (cssProp) { return cssProp.includes('--zoomLevel') });

                            if (zoom !== undefined) {
                                zoom = zoom.split(':');
                                if (zoom.length > 1) {
                                    zoom = parseFloat(zoom[1]);
                                } else {
                                    return undefined;
                                }
                            }

                            return zoom;
                        }

                        var ZOOM_LEVEL = getComputedZoomLevel();

                        if (ZOOM_LEVEL !== undefined) {
                            ZOOM_VALUE = ZOOM_LEVEL;
                        }

                        if (WINDOW_WIDTH < MOBILE_MARKUP_BREAKPOINT && WINDOW_WIDTH >= MOBILE_MARKUP_BREAKPOINT_XS) {
                            sizeSettings = { isMobileMarkup: true, isMobileMarkupXs: false, zoomValue: ZOOM_VALUE};
                            lhIframe.contentWindow.postMessage({ sizeSettings: sizeSettings, message: IFRAME_SETTING_SIZE, windowWidth: window.innerWidth || 0  }, iframeTargetOrigin);
                            return;
                        }
                        if (WINDOW_WIDTH < MOBILE_MARKUP_BREAKPOINT_XS) {
                            sizeSettings = { isMobileMarkup: false, isMobileMarkupXs: true, zoomValue: ZOOM_VALUE};
                            lhIframe.contentWindow.postMessage({ sizeSettings: sizeSettings, message: IFRAME_SETTING_SIZE, windowWidth: window.innerWidth || 0  }, iframeTargetOrigin);
                            return;
                        }

                        sizeSettings = { isMobileMarkup: false, isMobileMarkupXs: false, zoomValue: ZOOM_VALUE };
                        lhIframe.contentWindow.postMessage({ sizeSettings: sizeSettings, message: IFRAME_SETTING_SIZE, windowWidth: window.innerWidth || 0  }, iframeTargetOrigin);
                    }

                    window.roistatLeadHunterUpdate = updateSizeSettings;

                    _addEventListener(window, 'load', function () {
                        updateSizeSettings();
                    });
                    _addEventListener(window, 'resize', function () {
                        updateSizeSettings();
                    });
                    _addEventListener(window, 'message', function handleIframePostMessages(e){
                        var message = typeof e.data === 'string' ? e.data : e.data.message;

                        if (message === SCRIPT_SETTINGS_MESSAGE) {
                            lhScriptId = e.data.leadHunterId;
                            lhScriptMaxShownCount = e.data.leadHunterMaxShownCount;

                            var hasLeadHunterTargetPagesMap = storage.getObject(LEAD_HUNTER_TARGET_PAGES_MAP) !== null;

                            if (hasLeadHunterTargetPagesMap) {
                                autoTime = e.data.leadHunterAutoShowTime;
                                minTime = e.data.leadHunterMinTime;
                                leadHunterPulsatorSettings = e.data.leadHunterPulsatorSettings;

                                storage.set(MINIMUM_TIME, minTime);
                                storage.set(AUTO_SHOW_TIME, autoTime);

                                if (leadHunterPulsatorSettings) {
                                    var isEnabled = Number(leadHunterPulsatorSettings.isEnabled);
                                    debug('Leadhunter: set pulsator setting ' + isEnabled);
                                    storage.set(PULSATOR_ENABLED, isEnabled);
                                    updatePulsatorStyles(leadHunterPulsatorSettings);
                                }
                            }

                            debug('ShowLimit: Get lhScriptId: ' + e.data.leadHunterId + ' and lhScriptMaxShownCount: ' + e.data.leadHunterMaxShownCount + ' from lh widget');
                            init();
                        }

                        if (message === CLOSE_MODAL_MESSAGE) {
                            hideModal();
                        }

                        if (message === IFRAME_SETTING_SIZE) {
                            var calibratingSize = typeof e.data === 'object' && e.data.calibratingSize !== undefined ? e.data.calibratingSize : true;
                            lhIframe.setAttribute('style', 'width: '+ e.data.width + 'px !important; height: ' + e.data.height + 'px !important;');
                            if (isIframeLeadHunterSuccessfullyLoaded && !calibratingSize) {
                                lhIframe.contentWindow.postMessage({ message: IFRAME_SETTING_SIZE, windowWidth: window.innerWidth || 0, calibratingSize: true }, iframeTargetOrigin);
                            }
                            arrange(e);
                        }

                        if (message === BEFORE_SUBMIT_MESSAGE) {
                            var caughtLead = e.data.caughtLeadData;

                            if (window.roistat.leadHunter.onBeforeSubmit) {
                                debug("LeadHunter: process user defined onBeforeSubmit");
                                var processedParams = window.roistat.leadHunter.onBeforeSubmit(caughtLead);

                                if (processedParams) {
                                    caughtLead = processedParams;
                                }
                            }

                            if (!isLeadHunterShowsLimitFocusGroupEnabled) {
                                debug('ShowLimit: Beta Test off, catch before submit message, setCookieLeadHunterCaught will run');
                                setCookieLeadHunterCaught();
                            } else {
                                debug('ShowLimit: catch before submit message, setLeadHunterScriptCaught will run');
                                setLeadHunterScriptCaught();
                            }

                            var callbackTimetableSettings = storage.getObject(LEAD_HUNTER_CALLBACK_SETTINGS);
                            var hasCallbackTimetableSettings = callbackTimetableSettings !== null;
                            var needDisableCallback = hasCallbackTimetableSettings
                                && caughtLead.isNeedCallback === null
                                && !isCurrentTimeFitTimeTable(callbackTimetableSettings);

                            if (needDisableCallback) {
                                caughtLead.isNeedCallback = 0;
                            }

                            lhIframe.contentWindow.postMessage({ caughtLead: caughtLead, message: BEFORE_SUBMIT_DONE_MESSAGE }, iframeTargetOrigin);
                        }

                        if (message === AFTER_SUBMIT_MESSAGE) {
                            if (window.roistat.leadHunter.onAfterSubmit) {
                                debug("LeadHunter: process user defined onAfterSubmit");
                                window.roistat.leadHunter.onAfterSubmit({name: e.data.name, phone: e.data.phone});
                            }
                        }
                    });
                };

                function sendEventMessage() {
                    var data = {
                        apiData: window.roistat.leadHunter.form,
                        message: EVENT_DATA_MESSAGE
                    };

                    lhIframe.contentWindow.postMessage(data, iframeTargetOrigin);
                }

                function init() {
                    if (!checkLeadHunterLaunch()) {
                        debug('checkLeadHunterLaunch false');
                        return;
                    }

                    var hasLeadHunterTargetPagesMap = storage.getObject(LEAD_HUNTER_TARGET_PAGES_MAP) !== null;

                    if (hasLeadHunterTargetPagesMap) {
                        setLeadHunterDataToStorage();
                    }

                    if (!initSettings()) {
                        debug('initSettings false');
                        return;
                    }

                    debug('LeadHunter: activated');
                    documentReadyCallback(function() {
                        processPage();
                        tuneAppearanceForPage();
                        bindGlobalEvents();

                        if (typeof window.onRoistatLeadHunterInited === 'function') {
                            window.onRoistatLeadHunterInited();
                        }
                    });
                }

                function getWindowHeight(){
                    return (window.innerHeight ? window.innerHeight : document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight);
                }
                function getWindowWidth(){
                    return (window.innerWidth ? window.innerWidth : document.documentElement.clientWidth == 0 ? document.body.clientWidth : document.documentElement.clientWidth);
                }
                function checkCursor(e, needUpdateShownCount) {
                    e = e || event;
                    lastY = e.clientY;
                    var currentTop = lastY / getWindowHeight(),
                        isMoveUp = previousTop > 0 &&  previousTop > currentTop,
                        isInModalZone = currentTop < modalZone,
                        isTime = (currentTime() - startTime) > minTime*1000;

                    if (isMoveUp && isInModalZone && !isModalShown && isTime && localState.leave.isShowEnabled && !isAlreadyCaught()) {
                        debug("LeadHunter: show modal with because move up (" + previousTop + " -> " + currentTop + ") and in modal zone and show on leave enabled");
                        showModal('exit');
                        triggerLoadDoneEvent(needUpdateShownCount);
                        moveModal(e);
                    }
                    if (currentTop < calculatingZone) {
                        previousTop = currentTop;
                    }
                }
                function arrange(e) {
                    if (isCentered) {
                        moveModalCenter();
                    } else {
                        e = e || event;
                        moveModal(e);
                    }
                }
                function moveModal(e) {
                    var modalWidth = e.type === 'message' ? e.data.width : popupElement.offsetWidth;
                    var windowWidth = getWindowWidth();

                    var x = e.clientX - Math.round(modalWidth / 2) || popupElement.offsetLeft;

                    x = Math.max(20, Math.min(x, windowWidth - modalWidth - 20));
                    var isPopupElementCrossViewPort = x + modalWidth > windowWidth - 40;

                    if (isPopupElementCrossViewPort) {
                        var widthBehindViewPort = (x + modalWidth - 20) - (windowWidth - 40);
                        x = x - widthBehindViewPort;
                    }

                    var popupWidth = windowWidth - 40 > modalWidth ? '' : 'width: ' + (modalWidth - 40) + 'px;';

                    if (_isNodeElement(popupElement)) {
                        popupElement.setAttribute('style', 'left: ' + x + 'px; top: 0px; ' + popupWidth);
                    }
                }

                function setCookieLeadHunterCaught() {
                    if (isLeadHunterShowsLimitFocusGroupEnabled) {
                        return;
                    }

                    window.roistatSetCookie(CAUGHT, 1, COOKIE_CONFIG);
                }

                function hideModal() {
                    if (!isLeadHunterShowsLimitFocusGroupEnabled) {
                        debug('ShowLimit: Beta Test off, setCookieLeadHunterCaught');
                        setCookieLeadHunterCaught();
                    }

                    if (_isNodeElement(wrapElement)) {
                        wrapElement.setAttribute('style', 'opacity:0');
                    }

                    if (_isNodeElement(popupElement)) {
                        popupElement.style.top = '-' + popupElement.offsetHeight * 2 + 'px';
                        setTimeout(function () {
                            popupElement.className = wrapElement.className = HIDDEN_CLASS;
                        }, 500);
                    }
                }
                function submit(){
                    var leadHunterPhone = document.getElementById('roistat-lh-phone-input'),
                        leadHunterName = document.getElementById('roistat-lh-name-input'),
                        leadPhone, leadName;

                    leadPhone = leadHunterPhone === null ? '' : leadHunterPhone.value;
                    leadName = leadHunterName === null ? '' : leadHunterName.value;

                    var caughtLead = {
                        name: leadName,
                        phone: leadPhone,
                        isNeedCallback: null,
                        callbackPhone: null,
                        fields: {}
                    };

                    if (window.roistat.leadHunter.onBeforeSubmit) {
                        debug("LeadHunter: process user defined onBeforeSubmit");
                        var processedParams = window.roistat.leadHunter.onBeforeSubmit(caughtLead);
                        if (processedParams) {
                            caughtLead = processedParams;
                        }
                    }

                    var isPhoneEmpty = caughtLead.phone.length < 1;
                    var isMaskFilled = caughtLead.phone.indexOf('_') === -1;
                    var isPhoneValid = !isPhoneEmpty && isMaskFilled;
                    var isNameEmpty = caughtLead.name.length < 1;
                    var isNameValid = !isNameEmpty || !window.roistat.leadHunter.form.isNameRequired;

                    if (!isPhoneValid && _isNodeElement(leadHunterPhone)) {
                        leadHunterPhone.setAttribute('style', 'border: 2px solid #E0571A;');
                        return;
                    }
                    if (!isNameValid && _isNodeElement(leadHunterName)) {
                        leadHunterName.setAttribute('style', 'border: 2px solid #E0571A;');
                        return;
                    }

                    var url = leadHunterUrl + '?v=' + SCRIPT_VERSION
                        + '&lead-hunt-input=' + encodeURIComponent(caughtLead.phone)
                        + '&lead-name=' + encodeURIComponent(caughtLead.name)
                        + '&visit=' + getVisitIdForLeadCreation();

                    if (caughtLead.isNeedCallback !== null && caughtLead.isNeedCallback !== undefined) {
                        url = url + "&is_need_callback=" + (caughtLead.isNeedCallback > 0 ? 1 : 0);
                    }
                    if (caughtLead.callbackPhone) {
                        url = url + "&callback_phone=" + caughtLead.callbackPhone;
                    }

                    if (window.roistat.leadHunter.additionalNotifyEmail !== null) {
                        url = url + "&additional_email=" + encodeURIComponent(window.roistat.leadHunter.additionalNotifyEmail);
                    }

                    var customFieldCount = 0;
                    if (caughtLead.fields && typeof caughtLead.fields === 'object') {
                        for (var k in caughtLead.fields) {
                            if (caughtLead.fields.hasOwnProperty(k)) {
                                ++customFieldCount;
                            }
                        }
                    }
                    if (customFieldCount > 0) {
                        url = url + "&fields=" + encodeForUrl(JSON.stringify(caughtLead.fields));
                    }

                    url = url + '&t=' + currentTime();

                    var img = document.createElement('img');
                    img.src = url;

                    if (_isNodeElement(leadHunterPhone)) {
                        leadHunterPhone.setAttribute('style', '');
                    }

                    if (!isLeadHunterShowsLimitFocusGroupEnabled) {
                        debug('ShowLimit: Beta Test off, caught LH usually');
                        setCookieLeadHunterCaught();
                    } else {
                        debug('ShowLimit: caught LH by set setLeadHunterScriptCaught');
                        setLeadHunterScriptCaught();
                    }

                    if (!_isNodeElement(thankYouElement)) {
                        hideModal();
                        removeHandlers();
                    } else {
                        showThankYou();
                    }
                    if (window.roistat.leadHunter.onAfterSubmit) {
                        debug("LeadHunter: process user defined onAfterSubmit");
                        window.roistat.leadHunter.onAfterSubmit({name: leadName, phone: leadPhone});
                    }
                }

                function showPolicy(event) {
                    if (event.preventDefault) {
                        event.preventDefault();
                    } else {
                        event.returnValue = false;
                    }

                    if (_isNodeElement(agreementDoc)) {
                        agreementDoc.style.display === 'block' ?
                            agreementDoc.style.display = 'none' :
                            agreementDoc.setAttribute('style', 'display: block; padding: 0 30px; width:' + popupElement.clientWidth + 'px;');
                    }

                    arrange();
                }

                function toggleAgreement() {
                    if (_isNodeElement(submitElement)) {
                        submitElement.disabled === true ?
                            submitElement.disabled = false :
                            submitElement.disabled = true;
                    }

                    if (_isNodeElement(agreementError)) {
                        agreementError.style.display === 'block' ?
                            agreementError.style.display = 'none' :
                            agreementError.style.display = 'block';
                    }
                }

                function removeHandlers() {
                    document.onmousemove = null;

                    if (_isNodeElement(wrapElement)) {
                        wrapElement.onresize = null;
                    }
                }

                /**
                 * @param {HTMLElement} input
                 * @param {String} mask
                 */
                var _roistatRenderPhoneMask = function(input, mask) {
                    if (!input || !mask) {
                        debug("LeadHunter: skip phone mask render due to empty input or mask");
                        return;
                    }
                    debug("LeadHunter: render phone mask " + mask + " for input: " + input.value);

                    if (window.roistatRenderPhoneMaskMutex) {
                        return;
                    }
                    window.roistatRenderPhoneMaskMutex = true;

                    var numberSymbolDisplay = "_",
                        numberSymbolSettings = "x",
                        numberSymbolSettingsRus = "х",
                        displayMask = mask.toLowerCase().split(numberSymbolSettings).join(numberSymbolDisplay).split(numberSymbolSettingsRus).join(numberSymbolDisplay);

                    /**
                     * @param {Number} position
                     */
                    var _setCursorPosition = function(position) {
                        if (input.setSelectionRange) {
                            input.setSelectionRange(position, position);
                        } else if (input.createTextRange) {
                            var range = input.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', position);
                            range.moveStart('character', position);
                            range.select();
                        }
                    };

                    /**
                     * @param {String} value
                     * @returns {Number}
                     */
                    var _calcNeededCursorPosition = function(value) {
                        if (!value) {
                            return 0;
                        }
                        var firstMaskChar = value.indexOf(numberSymbolDisplay);
                        if (firstMaskChar < 0) {
                            return value.length;
                        }
                        return firstMaskChar;
                    };

                    /**
                     * @param {String} value
                     */
                    var _refreshCursor = function(value) {
                        _setCursorPosition(_calcNeededCursorPosition(value));
                    };

                    /**
                     * @param {String} currentValue
                     * @returns {String}
                     */
                    var _calculateNewValue = function(currentValue) {
                        var displayMaskParts = displayMask.split("");
                        if (!currentValue) {
                            return displayMask;
                        }
                        var currentValueParts = currentValue.split("");

                        var result = [],
                            currentSymbol, maskSymbol, isCurrentSymbolNumber, isCurrentSymbolIsNumberOverMaskNumber,
                            nextMaskSymbol, nextCurrentSymbol, nextNextCurrentSymbol;
                        for (var i = 0; i < displayMaskParts.length; i++) {
                            maskSymbol = displayMaskParts[i];
                            if (i >= currentValueParts.length) {
                                result.push(maskSymbol);
                                continue;
                            }

                            nextMaskSymbol = ((i+1) < displayMaskParts.length) ? displayMaskParts[i+1] : null;
                            nextCurrentSymbol = ((i+1) < currentValueParts.length) ? currentValueParts[i+1] : null;
                            nextNextCurrentSymbol = ((i+2) < currentValueParts.length) ? currentValueParts[i+2] : null;
                            currentSymbol = currentValueParts[i];
                            isCurrentSymbolNumber = parseInt(currentSymbol) >= 0;
                            isCurrentSymbolIsNumberOverMaskNumber = (maskSymbol === numberSymbolDisplay) && isCurrentSymbolNumber;

                            if (!isCurrentSymbolIsNumberOverMaskNumber) {
                                result.push(maskSymbol);
                                continue;
                            }

                            if (nextCurrentSymbol === numberSymbolDisplay && nextMaskSymbol !== numberSymbolDisplay && nextNextCurrentSymbol !== nextMaskSymbol) {
                                result.push(maskSymbol);
                                continue;
                            }

                            result.push(currentSymbol);
                        }
                        return result.join("");
                    };

                    setTimeout(function() {
                        var newValue = _calculateNewValue(input.value);
                        if (input.value !== newValue) {
                            input.value = newValue;
                        }
                        _refreshCursor(newValue);
                        window.roistatRenderPhoneMaskMutex = false;
                    }, 1);
                };

                var saveLeadHunterTemplates = function(formTemplate, pulsatorTemplate, pulsatorSettings) {
                    storage.setLocal(LEAD_HUNTER_FORM_TEMPLATE, Base64.encode(formTemplate));
                    storage.setLocal(LEAD_HUNTER_PULSATOR_TEMPLATE, Base64.encode(pulsatorTemplate));
                    storage.setObject(LEAD_HUNTER_PULSATOR_SETTINGS, pulsatorSettings);
                };

                var translateLeadHunterFormToLanguage = function(lang) {
                    leadHunterLanguage = lang;

                    if (lhIframe === undefined) {
                        return;
                    }

                    sendIframeTranslateMessage();
                };

                var sendIframeTranslateMessage = function() {
                    var data = {
                        language: leadHunterLanguage,
                        message: TRANSLATE_FORM_MESSAGE
                    };

                    lhIframe.contentWindow.postMessage(data, iframeTargetOrigin);
                };

                var setLeadHunterScriptCaught = function() {
                    debug('ShowLimit: Start set roistat_leadHunterScriptsCaught');
                    var storedScriptsCaughtLeads = storage.getObject(LEAD_HUNTER_SCRIPTS_CAUGHT);

                    if (!storedScriptsCaughtLeads) {
                        storedScriptsCaughtLeads = {};
                    }

                    debug('ShowLimit: roistat_leadHunterScriptsCaught for lhScriptId set to 1');
                    storedScriptsCaughtLeads[lhScriptId] = 1;

                    storage.setObject(LEAD_HUNTER_SCRIPTS_CAUGHT, storedScriptsCaughtLeads);
                };

                var increaseLeadHunterScriptShownCount = function() {
                    debug('ShowLimit: Start set roistat_leadHunterScriptsShownCount');
                    var storedScriptsShownCount = storage.getObject(LEAD_HUNTER_SCRIPTS_SHOWN_COUNT);

                    if (!storedScriptsShownCount) {
                        storedScriptsShownCount = {};
                    }

                    var hasCurrentScriptIdInStoredScripts = storedScriptsShownCount.hasOwnProperty(lhScriptId);
                    var hasOldCookie = storage.get(CAUGHT) > 0;

                    if (!hasCurrentScriptIdInStoredScripts) {
                        debug('ShowLimit: roistat_leadHunterScriptsShownCount for lhScriptId initialized');
                        storedScriptsShownCount[lhScriptId] = hasOldCookie ? 1 : 0;
                    }

                    var isStoredCountMoreThenMaxShownCount = lhScriptMaxShownCount > 0 && storedScriptsShownCount[lhScriptId] + 1 > lhScriptMaxShownCount;
                    if (isStoredCountMoreThenMaxShownCount) {
                        debug('ShowLimit: Stored lhScriptId has reached lhScriptMaxShownCount, show counter in storage not rise up, return from function');
                        return;
                    }

                    debug('ShowLimit: exist lhScriptId show counter rise up');
                    storedScriptsShownCount[lhScriptId] += 1;

                    storage.setObject(LEAD_HUNTER_SCRIPTS_SHOWN_COUNT, storedScriptsShownCount);

                    if (hasOldCookie) {
                        storage.remove(CAUGHT);
                        roistatClearCookie(CAUGHT, { path: '/' });
                        debug('ShowLimit: cookie roistat_leadHunterCaught handled and deleted');
                    }
                };

                var isCurrentScriptMaxShownCountReached = function() {
                    if (lhScriptMaxShownCount === 0) {
                        debug('ShowLimit: show limit off and set to 0');
                        return false;
                    }

                    var leadHunterScriptsShownCount = storage.getObject(LEAD_HUNTER_SCRIPTS_SHOWN_COUNT),
                        oldScriptsShownCount = storage.get(CAUGHT) > 0 ? 1 : 0,
                        currentScriptShownCount = leadHunterScriptsShownCount ? leadHunterScriptsShownCount[lhScriptId] : oldScriptsShownCount,
                        isMaxShownCountSet = currentScriptShownCount + 1 > lhScriptMaxShownCount;

                    debug('ShowLimit: Check isCurrentScriptMaxShownCountReached, show limit on, check for exceeding the limit, is ' + isMaxShownCountSet);

                    return isMaxShownCountSet;
                };

                var isCurrentLeadHunterScriptSubmitted = function() {
                    var leadHunterScriptsCaught = storage.getObject(LEAD_HUNTER_SCRIPTS_CAUGHT),
                        currentScriptCaughtState = leadHunterScriptsCaught ? leadHunterScriptsCaught[lhScriptId] : null,
                        isSubmitted = currentScriptCaughtState === 1;

                    debug('ShowLimit: Check isCurrentLeadHunterScriptSubmitted, is ' + isSubmitted);

                    return isSubmitted;
                };

                var setLeadHunterDataToStorage = function() {
                    storage.set(LEAD_HUNTER_DEFAULT_SCRIPT_ID, getLeadHunterScriptId());
                    storage.setLocal(LEAD_HUNTER_FORM_TEMPLATE, Base64.encode(getLeadHunterTemplate()));
                    storage.set(PAGES_LIST, getLeadHunterTargetPages());
                    storage.set(PULSATOR_ENABLED, getLeadHunterActiveScriptPulsatorEnableSetting());
                };

                var getLeadHunterTemplate = function() {
                    var iframeUrl = appendMaParam(protocol() + "//"+ROISTAT_HOST+"/api/site/1.0/"+getProjectForUrl()+"/leadhunter/script/"+storage.get(LEAD_HUNTER_DEFAULT_SCRIPT_ID)+"/widget?visit_id=" + getRoistatVisitId());

                    return '<div class="roistat-lh-popup-wrapper" data-is-iframe="1"><iframe id="roistat-lh-popup-iframe" class="roistat-lh-popup-iframe" src="' + iframeUrl + '" frameborder="0"></iframe></div>';
                };

                var getLeadHunterScriptId = function() {
                    var leadHunterTargetPagesMap = storage.getObject(LEAD_HUNTER_TARGET_PAGES_MAP);

                    if (leadHunterTargetPagesMap === null) {
                        return;
                    }

                    storage.set(LEAD_HUNTER_CURRENT_SCRIPT_ID, '');

                    var isLeadHunterEnabled = Number(storage.get(LEAD_HUNTER_ENABLED));
                    var keys = Object.keys(leadHunterTargetPagesMap);
                    var leadHunterScriptId = keys.sort()[0];

                    if (!isLeadHunterEnabled) {
                        return leadHunterScriptId;
                    }

                    for (var i = 0; i < keys.length; i++) {
                        var currentFilterSettings = leadHunterTargetPagesMap[keys[i]];
                        var targetPages = currentFilterSettings.targetPageList;
                        var isCurrentPageEnabled = isPageEnabled(targetPages.join(','));
                        var isTargetPagesEmpty = targetPages.length === 0;
                        var isCurrentDeviceEnabled = Array.isArray(currentFilterSettings.devicesFilter) && currentFilterSettings.devicesFilter.length > 0
                            ? currentFilterSettings.devicesFilter.indexOf(getCurrentDeviceName()) !== -1
                            : true;
                        var hasLeadHunterCurrentScriptId = (isTargetPagesEmpty || isCurrentPageEnabled)
                            && isCurrentDeviceEnabled
                            && (!currentFilterSettings.timetable.isEnabled || isCurrentTimeFitTimeTable(currentFilterSettings.timetable));

                        if (hasLeadHunterCurrentScriptId) {
                            leadHunterScriptId = keys[i];
                            storage.set(LEAD_HUNTER_CURRENT_SCRIPT_ID, leadHunterScriptId);
                        }
                    }

                    return leadHunterScriptId;
                };

                var getLeadHunterTargetPages = function() {
                    var leadHunterActiveScriptDisplaySettings = getLeadHunterActiveScriptDisplaySettings();

                    return leadHunterActiveScriptDisplaySettings !== null
                        ? leadHunterActiveScriptDisplaySettings.targetPageList.join(',')
                        : '';
                };

                var getLeadHunterActiveScriptPulsatorEnableSetting = function() {
                    var leadHunterActiveScriptDisplaySettings = getLeadHunterActiveScriptDisplaySettings();
                    return leadHunterActiveScriptDisplaySettings !== null
                        ? Number(leadHunterActiveScriptDisplaySettings.isPulsatorEnabled)
                        : 0;
                };

                var getLeadHunterActiveScriptDisplaySettings = function() {
                    var activeScriptId = storage.get(LEAD_HUNTER_DEFAULT_SCRIPT_ID);
                    var leadHunterTargetPagesMap = storage.getObject(LEAD_HUNTER_TARGET_PAGES_MAP);

                    return leadHunterTargetPagesMap !== null && leadHunterTargetPagesMap[activeScriptId] !== null
                        ? leadHunterTargetPagesMap[activeScriptId]
                        : null;
                };


                window.roistatLeadHunterShow = leadHunterShowInCenter;
                window.roistatRenderPhoneMask = _roistatRenderPhoneMask;
                window.roistat.leadHunter.localization.translateToRussian = function() { translateLeadHunterFormToLanguage(RU_LANGUAGE_KEY) };
                window.roistat.leadHunter.localization.translateToEnglish = function() { translateLeadHunterFormToLanguage(EN_LANGUAGE_KEY) };

                addVisitProcessedCallback(init);
            },
            multiwidget: function() {
                var HIDDEN_CLASS                    = 'roistat-multiwidget-hidden',
                    TRIGGER_CLASS                   = 'roistat-multiwidget-pulsator-phone',
                    LEAD_HUNTER_ITEM_CLASS          = 'roistat-multiwidget-pulsator-popup-item-lead-hunter',
                    PULSATOR_FILL_CLASS             = 'roistat-multiwidget-pulsator-fill',
                    PULSATOR_FILL_SVG_CLASS         = 'roistat-multiwidget-pulsator-fill-svg',
                    PULSATOR_ICON_CLASS             = 'roistat-multiwidget-pulsator-img-icon',
                    ONLINE_CHAT_ITEM_CLASS          = 'roistat-multiwidget-pulsator-popup-item-chat',
                    FB_ITEM_CLASS                   = 'roistat-multiwidget-pulsator-popup-item-facebook',
                    VK_ITEM_CLASS                   = 'roistat-multiwidget-pulsator-popup-item-vk',
                    TELEGRAM_ITEM_CLASS             = 'roistat-multiwidget-pulsator-popup-item-telegram',
                    WHATS_APP_ITEM_CLASS            = 'roistat-multiwidget-pulsator-popup-item-whats-app',
                    VIBER_ITEM_CLASS                = 'roistat-multiwidget-pulsator-popup-item-viber',
                    POPUP_OVERLAY_CLASS             = 'roistat-multiwidget-pulsator-overlay',
                    POPUP_CLASS                     = 'roistat-multiwidget-pulsator-items-popup-holder',
                    POPUP_HEADER_CLASS              = 'roistat-multiwidget-pulsator-popup-header-wrapper',
                    IFRAME_CHAT_SUCCESSFULLY_LOADED = 'iframe_chat_successfully_loaded',
                    POPUP_TAIL_CLASS                = 'roistat-multiwidget-pulsator-popup-tail',
                    ONLINE_CHAT_CLASS               = 'roistat-online-chat-popup-wrapper',
                    IFRAME_HOLDER_HIDDEN_CLASS      = 'roistat-online-chat-popup-wrapper-hidden',
                    PULSATOR_HOLDER_HIDDEN_CLASS    = 'roistat-multiwidget-pulsator-holder-hidden';

                var pulsator, pulsatorTrigger, pulsatorPopup, pulsatorPopupOverlay, pulsatorPopupHeader, pulsatorPopupTail, pulsatorFill, pulsatorFillSvg, pulsatorIcon,
                    leadHunterItem, onlineChatItem, vkItem, fbItem, telegramItem, whatsAppItem, viberItem;

                var isIframeChatSuccessfullyLoaded = false;
                var isPulsatorPopupHeaderShown = true;

                var PULSATOR_POSITION_BY_LABEL = {
                    topLeft: {
                        bottom: 'unset',
                        right: 'unset',
                        top: isMobileWindowWidth() ? 0 : '20px',
                        left: isMobileWindowWidth() ? 0 : '35px',
                        transformOrigin: 'top left'
                    },
                    topRight: {
                        bottom: 'unset',
                        right: isMobileWindowWidth() ? 0 : '35px',
                        top: isMobileWindowWidth() ? 0 : '20px',
                        left: 'unset',
                        transformOrigin: 'top right'
                    },
                    bottomRight: {
                        bottom: isMobileOrTabletWindowWidth() ? 0 : '20px',
                        right: isMobileOrTabletWindowWidth() ? '6px' : '35px',
                        top: 'unset',
                        left: 'unset',
                        transformOrigin: 'bottom right'
                    },
                    bottomLeft: {
                        bottom: isMobileWindowWidth() ? 0 : '20px',
                        right: 'unset',
                        top: 'unset',
                        left: isMobileWindowWidth() ? 0 : '35px',
                        transformOrigin: 'bottom left'
                    }
                };

                var PULSATOR_POPUP_POSITION_BY_LABEL = {
                    topLeft: {
                        bottom: 'unset',
                        right: 'unset',
                        top: '110px',
                        left: '0'
                    },
                    topRight: {
                        bottom: 'unset',
                        right: '0',
                        top: '110px',
                        left: 'unset'
                    },
                    bottomRight: {
                        bottom: '110px',
                        right: '0',
                        top: 'unset',
                        left: 'unset'
                    },
                    bottomLeft: {
                        bottom: '110px',
                        right: 'unset',
                        top: 'unset',
                        left: '0'
                    }
                };

                var PULSATOR_POPUP_TAIL_POSITION_BY_LABEL = {
                    topLeft: {
                        'border-top-color': 'white',
                        'border-right-color': 'transparent',
                        'border-bottom-color': 'transparent',
                        'border-left-color': 'white',
                        bottom: 'unset',
                        right: 'unset',
                        top: '-14px',
                        left: '40px'
                    },
                    topRight: {
                        'border-top-color': 'white',
                        'border-right-color': 'transparent',
                        'border-bottom-color': 'transparent',
                        'border-left-color': 'white',
                        bottom: 'unset',
                        right: '34px',
                        top: '-14px',
                        left: 'unset'
                    },
                    bottomRight: {
                        'border-top-color': 'transparent',
                        'border-right-color': 'white',
                        'border-bottom-color': 'white',
                        'border-left-color': 'transparent',
                        bottom: '-14px',
                        right: '40px',
                        top: 'unset',
                        left: 'unset'
                    },
                    bottomLeft: {
                        'border-top-color': 'transparent',
                        'border-right-color': 'white',
                        'border-bottom-color': 'white',
                        'border-left-color': 'transparent',
                        bottom: '-14px',
                        right: 'unset',
                        top: 'unset',
                        left: '34px'
                    }
                };

                function debugMultiwidget(debugString) {
                    debug('Multiwidget: ' + debugString);
                }

                function saveNodeElements() {
                    pulsatorTrigger      = _getSafeFirstElementByClassName(pulsator, TRIGGER_CLASS);
                    pulsatorPopup        = _getSafeFirstElementByClassName(pulsator, POPUP_CLASS);
                    pulsatorPopupHeader  = _getSafeFirstElementByClassName(pulsator, POPUP_HEADER_CLASS);
                    pulsatorPopupOverlay = _getSafeFirstElementByClassName(pulsator, POPUP_OVERLAY_CLASS);
                    leadHunterItem       = _getSafeFirstElementByClassName(pulsatorPopup, LEAD_HUNTER_ITEM_CLASS);
                    pulsatorPopupTail    = _getSafeFirstElementByClassName(pulsator, POPUP_TAIL_CLASS);
                    onlineChatItem       = _getSafeFirstElementByClassName(pulsatorPopup, ONLINE_CHAT_ITEM_CLASS);
                    vkItem               = _getSafeFirstElementByClassName(pulsatorPopup, VK_ITEM_CLASS);
                    fbItem               = _getSafeFirstElementByClassName(pulsatorPopup, FB_ITEM_CLASS);
                    telegramItem         = _getSafeFirstElementByClassName(pulsatorPopup, TELEGRAM_ITEM_CLASS);
                    whatsAppItem         = _getSafeFirstElementByClassName(pulsatorPopup, WHATS_APP_ITEM_CLASS);
                    viberItem            = _getSafeFirstElementByClassName(pulsatorPopup, VIBER_ITEM_CLASS);
                    pulsatorFill         = _getSafeFirstElementByClassName(pulsatorTrigger, PULSATOR_FILL_CLASS);
                    pulsatorFillSvg      = pulsatorTrigger.getElementsByClassName(PULSATOR_FILL_SVG_CLASS);
                    pulsatorIcon         = _getSafeFirstElementByClassName(pulsatorTrigger, PULSATOR_ICON_CLASS);
                }

                function togglePopupOverlayVisibility() {
                    if (isMobileOrTabletWindowWidth() && _isNodeElement(pulsatorPopupOverlay) && _isNodeElement(pulsatorPopup)) {
                        if (pulsatorPopup.classList.contains(HIDDEN_CLASS)) {
                            hideElementOption(pulsatorPopupOverlay);
                        } else {
                            showElementOption(pulsatorPopupOverlay);
                        }
                    }
                }

                function togglePopupVisibility() {
                    if (_isNodeElement(pulsatorPopup)) {
                        pulsatorPopup.classList.toggle(HIDDEN_CLASS);
                    }

                    togglePopupOverlayVisibility();
                }

                function togglePulsatorState(pulsator) {
                    if (_isNodeElement(pulsator)) {
                        pulsator.classList.toggle('opened');
                    }
                }

                function addPulsatorEvents() {
                    debugMultiwidget('add pulsator events');

                    _addEvent(pulsatorTrigger, 'click', function() {
                        if (!isOnlineChatOpened()) {
                            togglePopupVisibility();
                        }

                        togglePulsatorState(pulsatorTrigger);
                    });

                    _addEvent(pulsatorPopupHeader, 'click', function() {
                        if (!isOnlineChatOpened()) {
                            togglePopupVisibility();
                        }

                        togglePulsatorState(pulsatorTrigger);
                        togglePopupOverlayVisibility();
                    })

                    _addEvent(pulsatorPopupOverlay, 'click', function() {
                        if (!isOnlineChatOpened()) {
                            togglePopupVisibility();
                        }

                        togglePulsatorState(pulsatorTrigger);
                        togglePopupOverlayVisibility();
                    })


                    _addEvent(leadHunterItem, 'click', function() {
                        debugMultiwidget('opening leadhunter via multiwidget');

                        window.roistatLeadHunterShow();
                        togglePopupVisibility();
                        toggleElementClass(pulsatorTrigger, 'opened', false);
                    });

                    _addEvent(onlineChatItem, 'click', function() {
                        debugMultiwidget('opening online chat via multiwidget');

                        window.roistatOnlineChatShow();
                        togglePopupVisibility();
                    });

                    _addEvent(vkItem, 'click', function() {
                        window.open(storage.get(MULTIWIDGET_VK_LINK), '_blank');
                    });

                    _addEvent(fbItem, 'click', function() {
                        window.open(storage.get(MULTIWIDGET_FB_LINK), '_blank');
                    });

                    _addEvent(telegramItem, 'click', function() {
                        window.open(storage.get(MULTIWIDGET_TELEGRAM_LINK), '_blank');
                    });

                    _addEvent(whatsAppItem, 'click', function() {
                        window.open(storage.get(MULTIWIDGET_WHATS_APP_LINK), '_blank');
                    });

                    _addEvent(viberItem, 'click', function() {
                        window.open(storage.get(MULTIWIDGET_VIBER_LINK), '_blank');
                    });
                }

                function isOnlineChatOpened() {
                    var onlineChatHolder = _getSafeFirstElementByClassName(document, ONLINE_CHAT_CLASS);

                    return _isNodeElement(onlineChatHolder) && !onlineChatHolder.classList.contains(IFRAME_HOLDER_HIDDEN_CLASS);
                }

                function isPopupOpened() {
                    return _isNodeElement(POPUP_CLASS) && !POPUP_CLASS.classList.contains(HIDDEN_CLASS);
                }

                function hideElementOption(element) {
                    if (_isNodeElement(element)) {
                        element.classList.add(HIDDEN_CLASS);
                    }
                }

                function showElementOption(element) {
                    if (_isNodeElement(element)) {
                        element.classList.remove(HIDDEN_CLASS);
                    }
                }

                function hideLeadHunterOption() {
                    hideElementOption(leadHunterItem);
                }

                function hideDisabledMultiwidgetOptions() {
                    debugMultiwidget('hiding disabled multiwidget options');
                    var isLeadHunterEnabled = Number(storage.get(LEAD_HUNTER_ENABLED)),
                        isVKEnabled         = Number(storage.get(MULTIWIDGET_VK_ENABLED)),
                        isFBEnabled         = Number(storage.get(MULTIWIDGET_FB_ENABLED)),
                        isTelegramEnabled   = Number(storage.get(MULTIWIDGET_TELEGRAM_ENABLED)),
                        isWhatsAppEnabled   = Number(storage.get(MULTIWIDGET_WHATS_APP_ENABLED)),
                        isViberEnabled      = Number(storage.get(MULTIWIDGET_VIBER_ENABLED));

                    var optionsAmount = 0;

                    if (!isLeadHunterEnabled || !isLeadHunterPulsatorEnabled || !isLeadHunterPulsatorShownAtThisPage) {
                        debugMultiwidget('hiding leadhunter option');
                        hideLeadHunterOption();
                    }

                    if (!isNeedToShowOnlineChat() || !isIframeChatSuccessfullyLoaded) {
                        debugMultiwidget('hiding online chat option');
                        hideElementOption(onlineChatItem);
                    }

                    if (isNeedToShowOnlineChat()) {
                        optionsAmount++;
                    }

                    if (!isVKEnabled) {
                        debugMultiwidget('hiding vk-messenger option');
                        hideElementOption(vkItem);
                    } else {
                        optionsAmount++;
                    }

                    if (!isFBEnabled) {
                        debugMultiwidget('hiding fb-messenger option');
                        hideElementOption(fbItem);
                    } else {
                        optionsAmount++;
                    }

                    if (!isTelegramEnabled) {
                        debugMultiwidget('hiding telegram-messenger option');
                        hideElementOption(telegramItem);
                    } else {
                        optionsAmount++;
                    }

                    if (!isWhatsAppEnabled) {
                        debugMultiwidget('hiding whatsApp-messenger option');
                        hideElementOption(whatsAppItem);
                    } else {
                        optionsAmount++;
                    }

                    if (!isViberEnabled) {
                        debugMultiwidget('hiding Viber-messenger option');
                        hideElementOption(viberItem);
                    } else {
                        optionsAmount++;
                    }

                    isPulsatorPopupHeaderShown = optionsAmount > 1;

                    if (isMobileOrTabletWindowWidth() && isPulsatorPopupHeaderShown) {
                        debugMultiwidget('hiding popup header');
                        showElementOption(pulsatorPopupHeader);
                    }
                }

                function fillPulsator() {
                    var pulsatorSettings = storage.getObject(MULTIWIDGET_PULSATOR_SETTINGS);
                    debugMultiwidget('start filling pulsator');

                    if (pulsatorSettings) {
                        if (_isNodeElement(pulsatorFill)) {
                            pulsatorFill.setAttribute('style', 'background: ' + pulsatorSettings.button_color + ';');
                        }

                        if (_isNodeElement(pulsatorIcon)) {
                            pulsatorIcon.setAttribute('style', 'fill: ' + pulsatorSettings.icon_color + ';');
                        }

                        if (HTMLCollection.prototype.isPrototypeOf(pulsatorFillSvg)) {
                            for (var i = 0; i < pulsatorFillSvg.length; i++) {
                                pulsatorFillSvg[i].setAttribute('style', 'fill: ' + pulsatorSettings.button_color + ';');
                            }
                        }
                    }
                }

                function getPulsatorPosition() {
                    var pulsatorSettings = storage.getObject(MULTIWIDGET_PULSATOR_SETTINGS);
                    return pulsatorSettings !== null && typeof pulsatorSettings.position === 'string' && pulsatorSettings.position !== ''
                        ? pulsatorSettings.position
                        : 'bottomRight';
                }

                function setPulsatorPosition() {
                    if (_isNodeElement(pulsator)) {
                        var pulsatorPosition = getPulsatorPosition();

                        pulsator.setAttribute('style',
                            'top: ' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].top + ';'
                            + 'right:' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].right + ';'
                            + 'bottom:' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].bottom + ';'
                            + 'left:' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].left + ';'
                        );

                        pulsator.style.transformOrigin = PULSATOR_POSITION_BY_LABEL[pulsatorPosition].transformOrigin;
                        pulsator.style.transform = getPulsatorScale();
                    }
                }

                function setPulsatorTriggerPosition() {
                    if (_isNodeElement(pulsatorTrigger)) {
                        var pulsatorPosition = getPulsatorPosition();
                        var pulsatorScale = 'transform: ' + getPulsatorTriggerScale() + ';';
                        var marginSide = pulsatorPosition === 'topLeft' || pulsatorPosition === 'bottomLeft'
                            ? 'margin-right' : 'margin-left';

                        pulsatorTrigger.setAttribute('style',
                            marginSide + ': auto'+ ';'
                            + pulsatorScale
                        );
                    }
                }

                function setPulsatorPopupPosition() {
                    if (_isNodeElement(pulsatorPopup)) {
                        var pulsatorPosition = getPulsatorPosition();
                        var pulsatorPopupBottom = isMobileOrTabletWindowWidth() ? '0' : PULSATOR_POPUP_POSITION_BY_LABEL[pulsatorPosition].bottom;
                        var pulsatorPopupTop = isMobileOrTabletWindowWidth() ? 'unset' : PULSATOR_POPUP_POSITION_BY_LABEL[pulsatorPosition].top;

                        pulsatorPopup.setAttribute('style',
                            'top: ' + pulsatorPopupTop + ';'
                            + 'right:' + PULSATOR_POPUP_POSITION_BY_LABEL[pulsatorPosition].right + ';'
                            + 'bottom:' + pulsatorPopupBottom + ';'
                            + 'left:' + PULSATOR_POPUP_POSITION_BY_LABEL[pulsatorPosition].left + ';'
                        );
                    }
                }

                function setPulsatorPopupTailPosition() {
                    if (_isNodeElement(pulsatorPopupTail)) {
                        var pulsatorPosition = getPulsatorPosition();

                        pulsatorPopupTail.setAttribute('style',
                            'top: ' + PULSATOR_POPUP_TAIL_POSITION_BY_LABEL[pulsatorPosition].top + ';'
                            + 'right:' + PULSATOR_POPUP_TAIL_POSITION_BY_LABEL[pulsatorPosition].right + ';'
                            + 'bottom:' + PULSATOR_POPUP_TAIL_POSITION_BY_LABEL[pulsatorPosition].bottom + ';'
                            + 'left:' + PULSATOR_POPUP_TAIL_POSITION_BY_LABEL[pulsatorPosition].left + ';'
                            + 'border-top-color:' + PULSATOR_POPUP_TAIL_POSITION_BY_LABEL[pulsatorPosition]['border-top-color'] + ';'
                            + 'border-right-color:' + PULSATOR_POPUP_TAIL_POSITION_BY_LABEL[pulsatorPosition]['border-right-color'] + ';'
                            + 'border-bottom-color:' + PULSATOR_POPUP_TAIL_POSITION_BY_LABEL[pulsatorPosition]['border-bottom-color'] + ';'
                            + 'border-left-color:' + PULSATOR_POPUP_TAIL_POSITION_BY_LABEL[pulsatorPosition]['border-left-color'] + ';'
                        );
                    }
                }

                function setPosition() {
                    setPulsatorPosition();
                    setPulsatorTriggerPosition();

                    if (!isMobileOrTabletWindowWidth()) {
                        setPulsatorPopupPosition();
                        setPulsatorPopupTailPosition();
                    }
                }

                function processMultiwidget() {
                    if (document.body === null) {
                        return;
                    }

                    var multiwidgetPulsatorTemplate = Base64.decode(storage.get(MULTIWIDGET_PULSATOR_TEMPLATE));

                    if (multiwidgetPulsatorTemplate) {
                        debugMultiwidget('appending multiwidget pulsator');

                        var tempPulsatorHolder = document.createElement('div');

                        tempPulsatorHolder.innerHTML = multiwidgetPulsatorTemplate;

                        pulsator = tempPulsatorHolder.childNodes.item(0);

                        if (!window.roistat.multiwidget.isVisible) {
                            debugMultiwidget('Hide widget');
                            pulsator.className = pulsator.className + ' ' + PULSATOR_HOLDER_HIDDEN_CLASS;
                        }

                        document.body.appendChild(pulsator);

                        saveNodeElements();
                        hideDisabledMultiwidgetOptions();
                        fillPulsator();
                        setPosition();
                        addPulsatorEvents();

                        if (!isMultiwidgetChangeButtonsTextFocusGroupEnabled) {
                            pulsator.classList.add('old');
                        }
                    }
                }

                function fillMultiwidgetSettings() {
                    var multiwidgetSettings = storage.getObject(MULTIWIDGET_SETTINGS);

                    if (!multiwidgetSettings) {
                        var isEnabled = parseInt(storage.get(MULTIWIDGETS_ENABLED));
                        isEnabled = !isNaN(isEnabled) ? Boolean(isEnabled) : roistat.multiwidget.isEnabled;

                        var vkIsEnabled = Boolean(parseInt(storage.get(MULTIWIDGET_VK_ENABLED))) || roistat.multiwidget.vk.isEnabled;
                        var vkLink = storage.get(MULTIWIDGET_VK_LINK);
                        vkLink = vkLink !== 'null' ? vkLink : roistat.multiwidget.vk.link;

                        var fbIsEnabled = Boolean(parseInt(storage.get(MULTIWIDGET_FB_ENABLED))) || roistat.multiwidget.fb.isEnabled;
                        var fbLink = storage.get(MULTIWIDGET_FB_LINK);
                        fbLink = fbLink !== 'null' ? fbLink : roistat.multiwidget.fb.link;

                        var telegramIsEnabled = Boolean(parseInt(storage.get(MULTIWIDGET_TELEGRAM_ENABLED))) || roistat.multiwidget.telegram.isEnabled;
                        var telegramLink = storage.get(MULTIWIDGET_TELEGRAM_LINK);
                        telegramLink = telegramLink !== 'null' ? telegramLink : roistat.multiwidget.telegram.link;

                        var whatsAppIsEnabled = Boolean(parseInt(storage.get(MULTIWIDGET_WHATS_APP_ENABLED))) || roistat.multiwidget.whatsApp.isEnabled;
                        var whatsAppLink = storage.get(MULTIWIDGET_WHATS_APP_LINK);
                        whatsAppLink = whatsAppLink !== 'null' ? whatsAppLink : roistat.multiwidget.whatsApp.link;

                        var viberIsEnabled = Boolean(parseInt(storage.get(MULTIWIDGET_VIBER_ENABLED))) || roistat.multiwidget.viber.isEnabled;
                        var viberLink = storage.get(MULTIWIDGET_VIBER_LINK);
                        viberLink = viberLink !== 'null' ? viberLink : roistat.multiwidget.viber.link;

                        multiwidgetSettings = {
                            is_enabled: isEnabled,
                            vk: {
                                is_enabled: vkIsEnabled,
                                link: vkLink
                            },
                            fb: {
                                is_enabled: fbIsEnabled,
                                link: fbLink
                            },
                            telegram: {
                                is_enabled: telegramIsEnabled,
                                link: telegramLink
                            },
                            whats_app: {
                                is_enabled: whatsAppIsEnabled,
                                link: whatsAppLink
                            },
                            viber: {
                                is_enabled: viberIsEnabled,
                                link: viberLink
                            }
                        };
                    }

                    saveMultiwidgetSettings(multiwidgetSettings);
                }

                function bindGlobalEvents() {
                    _addEventListener(window, 'message', function handleIframePostMessages(e) {
                        var message = typeof e.data === 'string' ? e.data : e.data.message;

                        if (message === IFRAME_CHAT_SUCCESSFULLY_LOADED) {
                            isIframeChatSuccessfullyLoaded = true;

                            showElementOption(onlineChatItem);
                        }
                    });

                    function handleResize() {
                        if (_isNodeElement(pulsator)) {
                            pulsator.style.transform = getPulsatorScale();

                            setPulsatorPopupPosition();
                            setPulsatorPopupTailPosition();

                            if (!isMobileOrTabletWindowWidth()) {
                                hideElementOption(pulsatorPopupOverlay);
                                hideElementOption(pulsatorPopupHeader);
                                showElementOption(pulsatorPopupTail);
                            } else {
                                togglePopupOverlayVisibility();
                                hideElementOption(pulsatorPopupTail);

                                if (isPulsatorPopupHeaderShown) {
                                    showElementOption(pulsatorPopupHeader);
                                }
                            }
                        }
                    }


                    _addEventListener(window, 'resize', handleResize);

                    if (isVisualViewportSupported) {
                        _addEventListener(visualViewport, 'resize', handleResize);
                    }

                    function togglePulsatorTriggerState() {
                        if (_isNodeElement(pulsatorTrigger)) {
                            pulsatorTrigger.classList.toggle('opened');
                        }
                    }

                    window.roistatToggleMultiwidgetState = togglePulsatorTriggerState;
                }

                function init() {
                    fillMultiwidgetSettings();
                    requireCss();
                    bindGlobalEvents();
                    debugMultiwidget('activated');

                    documentReadyCallback(function() {
                        processMultiwidget();

                        if (typeof window.onRoistatMultiwidgetInited === 'function') {
                            window.onRoistatMultiwidgetInited();
                        }
                    });
                }

                roistatHideMultiwidgetLeadHunterOption = hideLeadHunterOption;
                addVisitProcessedCallback(init);
            },
            onlineChat: function() {
                var IFRAME_MODULE_CREATED            = 'iframe-module-created',
                    IFRAME_CHAT_SUCCESSFULLY_LOADED  = 'iframe_chat_successfully_loaded',
                    IFRAME_RESIZE                    = 'iframe_resize',
                    IFRAME_OPENED                    = 'iframe-online-chat-opened',
                    IFRAME_INVITE_MESSAGE            = 'iframe-online-chat-invite-message',
                    IFRAME_DELIVERED_MESSAGES        = 'iframe-delivered-messages',
                    IFRAME_CHAT_INIT                 = 'roistat-online-chat-init',
                    IFRAME_CHAT_INIT_WITH_TEXT       = 'roistat-online-chat-init-with-text',
                    IFRAME_CHAT_OPEN                 = 'roistat-online-chat-open',
                    IFRAME_CHAT_CLOSE                = 'roistat-online-chat-close',
                    RELOAD_CHAT                      = 'roistat-online-chat-reload',
                    UPDATE_CUSTOM_PARAMS             = 'roistat-online-chat-update-custom-params',
                    LEAD_SUCCESSFULLY_SENT           = 'roistat-online-chat-lead_successfully_sent',
                    TRANSLATE_FORM_MESSAGE           = 'roistat-online-chat-translate-form',
                    IFRAME_SEND_LEAD_MESSAGE         = 'roistat-online-chat-send-lead',
                    ROISTAT_CHAT_COOKIE              = 'roistat_chat_id',
                    ROISTAT_CHAT_SESSION_KEY         = 'roistat_chat_session',
                    ROISTAT_CHAT_CUSTOM_POSITION     = 'roistat_chat_custom_position',
                    ROISTAT_CHAT_PAGE_RESIZED        = 'roistat-online-chat-page-resized',
                    ROISTAT_CHAT_COOKIES_EXPIRE_TIME = 10*365*24*60*60,
                    onlineChat, onlineChatMouseTrack, onlineChatIframeHolder, onlineChatIframeSpacer, onlineChatPulsatorPhone,
                    onlineChatIframe, onlineChatPulsatorFill, onlineChatPulsatorIcon, onlineChatPulsatorFillSvg;

                var IFRAME_ID                            = 'roistat-online-chat-popup-iframe',
                    HIDDEN_CLASS                         = 'roistat-online-chat-hidden',
                    IFRAME_HOLDER_CLASS                  = 'roistat-online-chat-holder',
                    IFRAME_HOLDER_WRAPPER_CLASS          = 'roistat-online-chat-popup-wrapper',
                    MLTIWIDGET_PULSATOR_TRIGGER_CLASS    = 'roistat-multiwidget-pulsator-phone',
                    MLTIWIDGET_PULSATOR_POPUP_CLASS      = 'roistat-multiwidget-pulsator-items-popup-holder',
                    MLTIWIDGET_PULSATOR_OVERLAY_CLASS    = 'roistat-multiwidget-pulsator-overlay',
                    MLTIWIDGET_PULSATOR_HIDDEN_CLASS     = 'roistat-multiwidget-hidden',
                    MLTIWIDGET_ONLINE_CHAT_ITEM_CLASS    = 'roistat-multiwidget-pulsator-popup-item-chat',
                    IFRAME_HOLDER_HIDDEN_CLASS           = 'roistat-online-chat-popup-wrapper-hidden',
                    ONLINE_CHAT_MOUSE_TRACK_CLASS        = 'roistat-online-chat-popup-mouse-track',
                    ONLINE_CHAT_MOUSE_TRACK_CLASS_ACTIVE = 'roistat-online-chat-popup-mouse-track-active',
                    PULSATOR_FILL_CLASSNAME              = 'roistat-online-chat-pulsator-fill',
                    PULSATOR_ICON_CLASSNAME              = 'roistat-online-chat-pulsator-img',
                    PULSATOR_PHONE_CLASSNAME             = 'roistat-online-chat-pulsator-phone',
                    PULSATOR_CIRCLE_CLASSNAME            = 'roistat-online-chat-pulsator-circle',
                    PULSATOR_CIRCLE_CLASSNAME_SELECTOR   = '.' + PULSATOR_CIRCLE_CLASSNAME,
                    PULSATOR_NOTIFICATION                = 'roistat-online-chat-pulsator-notification-circle',
                    PULSATOR_NOTIFICATION_SELECTOR       = '.' + PULSATOR_NOTIFICATION,
                    PULSATOR_ICON_FILL_CLASSNAME         = 'roistat-online-chat-pulsator-fill-svg',
                    ONLINE_CHAT_SPACER_CLASSNAME         = 'roistat-online-chat-popup-spacer',
                    MULTIWIDGET_ITEMS_SELECTOR           = '.roistat-multiwidget-pulsator-items-popup',
                    ONLINE_CHAT_PULSATOR_SELECTOR        = '.roistat-online-chat-pulsator-phone',
                    ONLINE_CHAT_SELECTOR                 = '.roistat-online-chat-popup-wrapper',
                    IFRAME_FULL_SCREEN_CLASS             = 'roistat-online-chat-full-screen';

                var MAX_NOTIFICATION_LIMIT        = 99;
                var NOTIFICATIONS_LIMIT_CLASSNAME = 'roistat-online-chat-pulsator-notification-limit';

                var isInited                       = false,
                    isIframeModuleCreated          = false,
                    isChatWaitingForOpen           = false,
                    isSettingPosition              = false,
                    isOnlineChatIframeOnFullScreen = false,
                    initingCursorXPosition         = 0,
                    initingCursorYPosition         = 0;

                var onlineChatIframeStyles         = {};

                var PULSATOR_HOLDER_SELECTOR     = '.roistat-online-chat-holder';
                var PULSATOR_HOLDER_HIDDEN_CLASS = 'roistat-online-chat-holder-hidden';
                if (isNeedRenderMultiwidget()) {
                    PULSATOR_HOLDER_SELECTOR           = '.roistat-multiwidget-pulsator-holder';
                    PULSATOR_HOLDER_HIDDEN_CLASS       = 'roistat-multiwidget-pulsator-holder-hidden';
                    PULSATOR_CIRCLE_CLASSNAME          = 'roistat-multiwidget-pulsator-circle';
                    PULSATOR_CIRCLE_CLASSNAME_SELECTOR = '.' + PULSATOR_CIRCLE_CLASSNAME;
                    PULSATOR_NOTIFICATION              = 'roistat-multiwidget-pulsator-notification-circle';
                    PULSATOR_NOTIFICATION_SELECTOR     = '.' + PULSATOR_NOTIFICATION;
                    NOTIFICATIONS_LIMIT_CLASSNAME      = 'roistat-multiwidget-pulsator-notification-limit';
                }

                var pulsator;

                var PULSATOR_POSITION_BY_LABEL = {
                    topLeft: {
                        bottom: 'unset',
                        right: 'unset',
                        top: isMobileOrTabletWindowWidth() ? '10px' : '20px',
                        left: isMobileOrTabletWindowWidth() ? '24px' : '35px'
                    },
                    topRight: {
                        bottom: 'unset',
                        right: isMobileOrTabletWindowWidth() ? '24px' : '35px',
                        top: isMobileOrTabletWindowWidth() ? '10px' : '20px',
                        left: 'unset'
                    },
                    bottomRight: {
                        bottom: isMobileOrTabletWindowWidth() ? '10px' : '20px',
                        right: isMobileOrTabletWindowWidth() ? '24px' : '35px',
                        top: 'unset',
                        left: 'unset'
                    },
                    bottomLeft: {
                        bottom: isMobileOrTabletWindowWidth() ? '10px' : '20px',
                        right: 'unset',
                        top: 'unset',
                        left: isMobileOrTabletWindowWidth() ? '24px' : '35px'
                    }
                };

                var getIframePositionByLabel = function() {
                    return {
                        topLeft: {
                            top: isMobileOrTabletWindowWidth() ? 'unset' : '130px',
                            right: 'unset',
                            bottom: isMobileOrTabletWindowWidth() ? '0px': 'unset',
                            left: isMobileOrTabletWindowWidth() ? 0 : '65px'
                        },
                        topRight: {
                            top: isMobileOrTabletWindowWidth() ? 'unset' : '130px',
                            right: isMobileOrTabletWindowWidth() ? 0 : '65px',
                            bottom: isMobileOrTabletWindowWidth() ? '0px': 'unset',
                            left: 'unset'
                        },
                        bottomRight: {
                            top: 'unset',
                            right: isMobileOrTabletWindowWidth() ? 0 : '65px',
                            bottom: isMobileOrTabletWindowWidth() ? 0 : '130px',
                            left: 'unset'
                        },
                        bottomLeft: {
                            top: 'unset',
                            right: 'unset',
                            bottom: isMobileOrTabletWindowWidth() ? 0 : '130px',
                            left: isMobileOrTabletWindowWidth() ? 0 : '65px'
                        }
                    }
                };

                var IFRAME_MOUSE_TRACK_POSITION_BY_LABEL = {
                    topLeft: {
                        top: 'unset',
                        bottom: '0',
                        height: '20px'
                    },
                    topRight: {
                        top: 'unset',
                        bottom: '0',
                        height: '20px'
                    },
                    bottomLeft: {
                        top: '0',
                        bottom: 'unset',
                        height: '50px'
                    },
                    bottomRight: {
                        top: '0',
                        bottom: 'unset',
                        height: '50px'
                    }
                };

                var debugOnlineChat = function(message) {
                    debug('onlineChat: ' + message);
                };

                var generateUniqueKey = function () {
                    function generateRandomString() {
                        return Math.random().toString(36).substr(2, 8);
                    }

                    return generateRandomString() + generateRandomString() + generateRandomString() + generateRandomString();
                }

                var getViewportMetaTag = function () {
                    var viewportMetaTag = document.querySelector('meta[name="viewport"]');

                    if (_isNodeElement(viewportMetaTag)) {
                        return viewportMetaTag.getAttribute('content');
                    }

                    return null;
                }

                var INITAL_VIEWPORT_META_TAG = getViewportMetaTag();
                var IFRAME_VIEWPORT_CONTENT = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no';

                var getUniqueKey = function () {
                    var key = roistatGetCookie(ROISTAT_CHAT_SESSION_KEY);

                    if (!key) {
                        key = storage.get(ROISTAT_CHAT_SESSION_KEY);
                    }

                    if (!key) {
                        key = generateUniqueKey();
                        var cookieConfigLong = { expires: ROISTAT_CHAT_COOKIES_EXPIRE_TIME, path: '/' };
                        if (COOKIE_CONFIG.domain) {
                            cookieConfigLong.domain = COOKIE_CONFIG.domain;
                        }
                        storage.save(ROISTAT_CHAT_SESSION_KEY, key, cookieConfigLong);
                    }

                    return key;
                }

                var sendInitDataToIframe = function () {
                    var data = {
                        message: IFRAME_MODULE_CREATED,
                        detail: {
                            version: SCRIPT_VERSION,
                            language: onlineChatLanguage,
                            projectKey: getProjectForUrl(),
                            visitId: getVisitIdForLeadCreation(),
                            firstVisit: getRoistatFirstVisitId(),
                            chatId: roistatGetCookie(ROISTAT_CHAT_COOKIE),
                            moduleTargetOrigin: window.location.origin,
                            referrer: window.location.href,
                            params: onlineChatParams,
                            sessionUniqueKey: getUniqueKey(),
                            isOpened: isOnlineChatOpened(),
                            isMobile: isMobileOrTabletWindowWidth(),
                        }
                    };

                    onlineChatIframe.contentWindow.postMessage(data, onlineChatIframe.src);
                };

                var sendOpenedDataToIframe = function () {
                    var data = {
                        message: IFRAME_OPENED,
                        detail: {
                            isOpened: isOnlineChatOpened(),
                            isMobile: isMobileOrTabletWindowWidth(),
                        }
                    };

                    onlineChatIframe.contentWindow.postMessage(data, onlineChatIframe.src);
                };

                var sendUpdateParamsMessage = function () {
                    var data = {
                        message: UPDATE_CUSTOM_PARAMS,
                        detail: {
                            params: onlineChatParams,
                            isMobile: isMobileOrTabletWindowWidth(),
                        }
                    };

                    onlineChatIframe.contentWindow.postMessage(data, onlineChatIframe.src);
                };

                var sendIframeTranslateMessage = function () {
                    var data = {
                        language: onlineChatLanguage,
                        message: TRANSLATE_FORM_MESSAGE
                    };

                    onlineChatIframe.contentWindow.postMessage(data, onlineChatIframe.src);
                };

                var sendIframeChatInitWithTextMessage = function (text) {
                    var data = {
                        message: IFRAME_CHAT_INIT_WITH_TEXT,
                        detail: {
                            message: text,
                            isMobile: isMobileOrTabletWindowWidth(),
                        }
                    };

                    onlineChatIframe.contentWindow.postMessage(data, onlineChatIframe.src);
                };

                var sendIframeChatOpensMessage = function (chatId) {
                    var data = {
                        message: IFRAME_CHAT_OPEN,
                        detail: {
                            chatId: chatId,
                            isMobile: isMobileOrTabletWindowWidth(),
                        }
                    };

                    onlineChatIframe.contentWindow.postMessage(data, onlineChatIframe.src);
                }

                var closeIframeChat = function () {
                    window.focus();
                    if (typeof window.roistatOnlineChatToggle === 'function') {
                        window.roistatOnlineChatToggle();
                    }

                    if (typeof window.roistatToggleMultiwidgetState === 'function') {
                        window.roistatToggleMultiwidgetState();
                    }

                    togglePulsatorState(pulsator);
                }

                var sendResizeDataToIframe = function () {
                    var data = {
                        message: ROISTAT_CHAT_PAGE_RESIZED,
                        detail: {
                            isMobile: isMobileOrTabletWindowWidth(),
                        }
                    };

                    onlineChatIframe.contentWindow.postMessage(data, onlineChatIframe.src);
                };

                var sendResizedFullScreenDataToIframe = function (onlineChatIframeStyles) {
                    var data = {
                        message: IFRAME_RESIZE,
                        isFullScreen: isOnlineChatIframeOnFullScreen,
                        iframeStyles: onlineChatIframeStyles,
                    };

                    onlineChatIframe.contentWindow.postMessage(data, onlineChatIframe.src);
                };

                var setRoistatChatCookie = function (chatId) {
                    var cookieConfig = { expires: ROISTAT_CHAT_COOKIES_EXPIRE_TIME, path: '/' };
                    if (COOKIE_CONFIG.domain) {
                        cookieConfig.domain = COOKIE_CONFIG.domain;
                    }
                    roistatClearCookie(ROISTAT_CHAT_COOKIE, { path: '/' });
                    roistatSetCookie(ROISTAT_CHAT_COOKIE, chatId, cookieConfig);
                };

                var bindGlobalEvents = function() {
                    _addEventListener(window, 'message', function handleIframePostMessages(e){
                        var message = typeof e.data === 'string' ? e.data : e.data.message;
                        var detail = typeof e.data !== 'string' ? e.data.detail : {};

                        switch (message) {
                            case IFRAME_CHAT_SUCCESSFULLY_LOADED:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                appendPulsator();
                                window.setRoistatOnlineChatCustomParams = setCustomParams;
                                setCustomParams(onlineChatParams);
                                if (typeof window.onRoistatOnlineChatInited === 'function') {
                                    window.onRoistatOnlineChatInited();
                                }
                                break;
                            case IFRAME_MODULE_CREATED:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                isIframeModuleCreated = true;
                                sendInitDataToIframe();

                                if (isChatWaitingForOpen) {
                                    isChatWaitingForOpen = false;
                                    if (_isNodeElement(onlineChatIframeHolder)) {
                                        onlineChatIframeHolder.classList.remove(IFRAME_HOLDER_HIDDEN_CLASS);
                                        sendOpenedDataToIframe();
                                    }
                                }
                                break;
                            case IFRAME_CHAT_INIT:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                debugOnlineChat('saving chat id = ' + detail.chatId);
                                setRoistatChatCookie(detail.chatId);
                                break;
                            case IFRAME_CHAT_INIT_WITH_TEXT:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                debugOnlineChat('saving chat with text id = ' + detail.chatId);
                                if (window.onRoistatChatInit !== undefined && typeof window.onRoistatChatInit === 'function') {
                                    window.onRoistatChatInit(detail.chatId);
                                }
                                setRoistatChatCookie(detail.chatId);
                                window.roistatOnlineChatShow();
                                break;
                            case IFRAME_CHAT_OPEN:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                debugOnlineChat('saving chat id by open chat = ' + detail.chatId);
                                setRoistatChatCookie(detail.chatId);
                                window.roistatOnlineChatShow();
                                break;
                            case IFRAME_CHAT_CLOSE:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                closeIframeChat();
                                break;
                            case IFRAME_INVITE_MESSAGE:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                debugOnlineChat('rendering invite message');
                                handleGetInviteMessage(detail.message);
                                break;
                            case IFRAME_DELIVERED_MESSAGES:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                debugOnlineChat('get delivered messages');
                                handleGetDeliveredMessages(detail.messages);
                                break;
                            case IFRAME_RESIZE:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                isOnlineChatIframeOnFullScreen = e.data.isFullScreen;
                                if (isMobileOrTabletWindowWidth()) {
                                    sendResizedFullScreenDataToIframe({});
                                    return;
                                }

                                Object.assign(onlineChatIframeStyles, {
                                    width: onlineChatIframe.getBoundingClientRect().width,
                                    height: onlineChatIframe.getBoundingClientRect().height,
                                    borderRadius: window.getComputedStyle(onlineChatIframe).borderRadius,
                                });

                                onlineChatIframe.classList.toggle(IFRAME_FULL_SCREEN_CLASS, isOnlineChatIframeOnFullScreen);
                                onlineChatIframe.style.transition = 'unset';

                                if (isOnlineChatIframeOnFullScreen) {
                                     Object.assign(onlineChatIframeStyles, {
                                         top: onlineChatIframeHolder.style.top,
                                         right: onlineChatIframeHolder.style.right,
                                         bottom: onlineChatIframeHolder.style.bottom,
                                         left: onlineChatIframeHolder.style.left,
                                    });

                                    onlineChatIframeHolder.style.top = 0;
                                    onlineChatIframeHolder.style.right = 0;
                                    onlineChatIframeHolder.style.bottom = 0;
                                    onlineChatIframeHolder.style.left = 0;
                                    onlineChatIframeHolder.style.transition = 'unset';
                                } else {
                                    onlineChatIframeHolder.style.top = onlineChatIframeStyles.top;
                                    onlineChatIframeHolder.style.right = onlineChatIframeStyles.right;
                                    onlineChatIframeHolder.style.bottom = onlineChatIframeStyles.bottom;
                                    onlineChatIframeHolder.style.left = onlineChatIframeStyles.left;
                                    onlineChatIframeStyles = {};
                                    setTimeout(function() {
                                        onlineChatIframe.style.transition = 'height 0.5s ease-in';
                                        onlineChatIframeHolder.style.transition = 'all 0.3s';
                                    }, 30);
                                }

                                sendResizedFullScreenDataToIframe(onlineChatIframeStyles);
                                break;
                            case IFRAME_SEND_LEAD_MESSAGE:
                                debugOnlineChat('event: ' + message + ' ' + JSON.stringify(detail));
                                debugOnlineChat('sending lead');
                                handleIframeSendLeadMessage(detail.leadData);
                        }
                    });
                };

                var getNotificationsHolder = function() {
                    var notificationsCustomHolderSelector = window.roistat.onlineChat.notificationsCustomHolderSelector;
                    var hasNotificationsCustomHolder = notificationsCustomHolderSelector !== null;

                    return document.querySelector(hasNotificationsCustomHolder ? notificationsCustomHolderSelector : PULSATOR_HOLDER_SELECTOR);
                };

                var handleIframeSendLeadMessage = function(leadData) {
                    window.roistatGoal.reach(leadData, function() {
                        onlineChatIframe.contentWindow.postMessage(LEAD_SUCCESSFULLY_SENT, onlineChatIframe.src);
                    });
                }

                var handleGetInviteMessage = function(message) {
                    if (isOnlineChatOpened()) {
                        return;
                    }

                    var html = "<div class='roistat-online-chat-message'>" +
                        "<img src='" + message.operator.avatar + "' class='roistat-online-chat-message-avatar'></img>" +
                        "<div class='roistat-online-chat-message-content'>" +
                        "<div class='roistat-online-chat-message-name'>" +
                        "<span class='roistat-online-chat-message-name-text'>" + message.operator.name + "</span>" +
                        "<div class='roistat-online-chat-message-name-online-status'></div>" +
                        "</div>" +
                        "<div class='roistat-online-chat-message-text'>" + message.text + "</div>" +
                        "</div>" +
                        "<div class='roistat-online-chat-message-close'>х</div>" +
                        "</div>";
                    var tempElm = document.createElement('div');
                    tempElm.innerHTML = html;

                    var pulsatorHolder = getNotificationsHolder();

                    if (_isNodeElement(pulsatorHolder)) {
                        var appendingPosition = isIframeFixedToTop() ? 'beforeend' : 'afterbegin';
                        pulsatorHolder.insertAdjacentHTML(appendingPosition, html);

                        var allCloseIcons = pulsatorHolder.getElementsByClassName('roistat-online-chat-message-close')
                        var allMessagesPopup = pulsatorHolder.getElementsByClassName('roistat-online-chat-message');
                        var lastCloseIcon = allCloseIcons[isIframeFixedToTop() ? allCloseIcons.length - 1 : 0];
                        var lastMessagePopup = allMessagesPopup[isIframeFixedToTop() ? allCloseIcons.length - 1 : 0];
                    }

                    setTimeout(function() {
                        lastMessagePopup.remove();
                    }, 15000);

                    _addEvent(lastMessagePopup, 'click', function(e) {
                        e.stopPropagation();

                        if (!isOnlineChatOpened()) {
                            toggleChatWindowVisibility();
                        }

                        removeAllNotifyPopups();
                    });

                    _addEvent(lastCloseIcon, 'click', function(e) {
                        e.stopPropagation();

                        lastMessagePopup.remove();
                    });
                };

                var handleGetDeliveredMessages = function (messages) {
                    var pulsatorHolder = getNotificationsHolder();
                    if (_isNodeElement(pulsatorHolder)) {
                        var onlineChatPulsatorCircle = pulsatorHolder.querySelector(PULSATOR_CIRCLE_CLASSNAME_SELECTOR);
                        var previousNotificationElement = pulsatorHolder.querySelector(PULSATOR_NOTIFICATION_SELECTOR);

                        var isNotificationsOverLimit = messages > MAX_NOTIFICATION_LIMIT;
                        var displayedMessages = isNotificationsOverLimit ? MAX_NOTIFICATION_LIMIT + '+' : messages;

                        if (previousNotificationElement && !messages) {
                            previousNotificationElement.remove();
                            return;
                        }

                        if (previousNotificationElement) {
                            previousNotificationElement.textContent = displayedMessages;
                            previousNotificationElement.classList.toggle(NOTIFICATIONS_LIMIT_CLASSNAME, isNotificationsOverLimit);
                            return;
                        }

                        if (messages) {
                            var notificationLimitClass = isNotificationsOverLimit ? NOTIFICATIONS_LIMIT_CLASSNAME : ''
                            var notificationHtml = '<div class="' + PULSATOR_NOTIFICATION + notificationLimitClass + '">' + displayedMessages + '</div>';

                            onlineChatPulsatorCircle.insertAdjacentHTML('beforebegin', notificationHtml);
                        }
                    }
                };

                var removeAllNotifyPopups = function () {
                    var pulsatorHolder = getNotificationsHolder();
                    if (_isNodeElement(pulsatorHolder)) {
                        var allMessagesPopup = pulsatorHolder.getElementsByClassName('roistat-online-chat-message');

                        while (allMessagesPopup.length > 0) {
                            allMessagesPopup[0].remove();
                        }
                    }
                };

                var bindIframeEvents = function() {
                    onlineChatIframe = document.getElementById(IFRAME_ID);

                    if (_isNodeElement(onlineChatIframe)) {
                        _addEvent(onlineChatIframe, 'load', function () {
                            initChatWindow();
                        });
                    }

                    _addEvent(document, 'click', function(e) {
                        var customTriggerSelector = window.roistat.onlineChat.customTriggerSelector;

                        if (isNeedRenderMultiwidget()) {
                            var multiwidgetPulsatorTrigger = _getSafeFirstElementByClassName(document, MLTIWIDGET_PULSATOR_TRIGGER_CLASS);
                            var multiwidgetOnlineChatItem = _getSafeFirstElementByClassName(document, MLTIWIDGET_ONLINE_CHAT_ITEM_CLASS);
                            var needChangeMultiwidgetPulsatorState = isOnlineChatOpened()
                                && e.target !== multiwidgetOnlineChatItem
                                && !multiwidgetOnlineChatItem.contains(e.target);

                            if (needChangeMultiwidgetPulsatorState) {
                                toggleElementClass(multiwidgetPulsatorTrigger, 'opened', false);
                            }
                        } else {
                            var onlineChatPulsatorTrigger = _getSafeFirstElementByClassName(document, IFRAME_HOLDER_CLASS);
                            var needChangeOnlineChatPulsatorState = isOnlineChatOpened()
                                && e.target !== onlineChatPulsatorTrigger
                                && !onlineChatPulsatorTrigger.contains(e.target);

                            if (needChangeOnlineChatPulsatorState) {
                                toggleElementClass(onlineChatPulsatorTrigger, 'opened', false);
                            }
                        }

                        if (isOnlineChatOpened() &&
                            (e.target.closest(MULTIWIDGET_ITEMS_SELECTOR) === null
                                && e.target.closest(ONLINE_CHAT_SELECTOR) === null
                                && e.target.closest(ONLINE_CHAT_PULSATOR_SELECTOR) === null
                                && (customTriggerSelector ? e.target.closest(customTriggerSelector) === null : true))) {
                            toggleChatWindowVisibility();
                        }
                    });
                };

                var handleStartSettingIframePosition = function(e) {
                    var currentIframeXPosition = onlineChatIframeHolder.getBoundingClientRect().x;
                    var currentIframeYPosition = onlineChatIframeHolder.getBoundingClientRect().y;

                    isSettingPosition = true;
                    setMouseTrackActive();

                    initingCursorXPosition = e.pageX - currentIframeXPosition;

                    if (isIframeFixedToTop()) {
                        initingCursorYPosition = e.pageY + currentIframeYPosition;
                    } else {
                        initingCursorYPosition = e.pageY - currentIframeYPosition;
                    }
                };

                var handleEndSettingIframePosition = function() {
                    isSettingPosition = false;

                    setMouseTrackDisabled();
                    saveCustomIframePosition();
                };

                var setMouseTrackActive = function() {
                    if (_isNodeElement(onlineChatMouseTrack)) {
                        onlineChatMouseTrack.classList.add(ONLINE_CHAT_MOUSE_TRACK_CLASS_ACTIVE);
                    }
                };

                var setMouseTrackDisabled = function() {
                    if (_isNodeElement(onlineChatMouseTrack)) {
                        onlineChatMouseTrack.classList.remove(ONLINE_CHAT_MOUSE_TRACK_CLASS_ACTIVE);
                    }
                };

                var handleSettingIframePosition = function(e) {
                    if (isSettingPosition && _isNodeElement(onlineChatIframeHolder)) {
                        var iframeRect = onlineChatIframeHolder.getBoundingClientRect();
                        var iframeWidth = iframeRect.width;
                        var IFRAME_MIN_HEIGHT = 400;
                        var HORIZONTAL_IFRAME_OFFSET = 50;

                        var newIframeVerticalTargetPosition = 0;
                        var yDownLimiter = window.innerHeight - IFRAME_MIN_HEIGHT;
                        var newIframeLeft = e.pageX - initingCursorXPosition;
                        var XLeftLimiter = HORIZONTAL_IFRAME_OFFSET;
                        var XRightLimiter = window.innerWidth - HORIZONTAL_IFRAME_OFFSET - iframeWidth;

                        if (isIframeFixedToTop()) {
                            newIframeVerticalTargetPosition = window.innerHeight - (e.pageY + iframeRect.y) - 20;
                        } else {
                            newIframeVerticalTargetPosition = e.pageY - initingCursorYPosition;
                        }

                        var pulsatorPosition = getMultiwidgetPulsatorPosition();
                        var yStyleTarget = pulsatorPosition === 'bottomLeft' || pulsatorPosition === 'bottomRight'
                            ? 'top' : 'bottom';

                        if (newIframeLeft >= XLeftLimiter && newIframeLeft <= XRightLimiter) {
                            onlineChatIframeHolder.style.left = newIframeLeft + 'px';

                            if (!ifIframeFixedToLeft()) {
                                onlineChatIframeHolder.style.right = 'unset';
                            }
                        }

                        if (newIframeVerticalTargetPosition >= 50 && newIframeVerticalTargetPosition <= yDownLimiter) {
                            onlineChatIframeHolder.style[yStyleTarget] = newIframeVerticalTargetPosition + 'px';
                        }
                    }
                };

                var saveCustomIframePosition = function() {
                    var args = {
                        position: getMultiwidgetPulsatorPosition(),
                        top: onlineChatIframeHolder.style.top,
                        left: onlineChatIframeHolder.style.left,
                        bottom: onlineChatIframeHolder.style.bottom,
                        right: onlineChatIframeHolder.style.right
                    };

                    storage.setObject(ROISTAT_CHAT_CUSTOM_POSITION, args);
                };

                var getMultiwidgetPulsatorPosition = function() {
                    var multiwidgetPulsatorSettings = storage.getObject(MULTIWIDGET_PULSATOR_SETTINGS);
                    var needUsePredefinedPosition = multiwidgetPulsatorSettings !== null
                        && typeof multiwidgetPulsatorSettings.position === 'string'
                        && multiwidgetPulsatorSettings.position !== '';

                    return needUsePredefinedPosition ? multiwidgetPulsatorSettings.position : 'bottomRight';
                };

                var isIframeFixedToTop = function() {
                    var pulsatorPosition = getMultiwidgetPulsatorPosition();

                    return pulsatorPosition === 'topLeft' || pulsatorPosition === 'topRight';
                };

                var ifIframeFixedToLeft = function() {
                    var pulsatorPosition = getMultiwidgetPulsatorPosition();

                    return pulsatorPosition === 'topLeft' || pulsatorPosition === 'bottomLeft';
                };

                var setSpacerSize = function(spacerInitialSize) {
                    var spacerSize = Math.max(spacerInitialSize * getPulsatorScaleValue(), spacerInitialSize) + 'px';
                    onlineChatIframeSpacer.style.height = spacerSize;
                    onlineChatIframeSpacer.style.marginBottom = '-' + spacerInitialSize + 'px';
                };

                var setIframePosition = function() {
                    var position = getMultiwidgetPulsatorPosition();
                    var predefinedCustomPosition = window.roistat.onlineChat.customPosition;
                    var iframePositionByLabel = getIframePositionByLabel();

                    var topPosition = predefinedCustomPosition && predefinedCustomPosition.top !== null ?
                        predefinedCustomPosition.top : iframePositionByLabel[position].top;
                    var rightPosition = predefinedCustomPosition && predefinedCustomPosition.right !== null ?
                        predefinedCustomPosition.right : iframePositionByLabel[position].right;
                    var bottomPosition = predefinedCustomPosition && predefinedCustomPosition.bottom !== null ?
                        predefinedCustomPosition.bottom : iframePositionByLabel[position].bottom;
                    var leftPosition = predefinedCustomPosition && predefinedCustomPosition.left !== null ?
                        predefinedCustomPosition.left : iframePositionByLabel[position].left;

                    onlineChatIframeHolder = _getSafeFirstElementByClassName(onlineChat, IFRAME_HOLDER_WRAPPER_CLASS);

                    if (_isNodeElement(onlineChatIframeHolder)) {
                        onlineChatIframeHolder.classList.add(IFRAME_HOLDER_HIDDEN_CLASS);
                        onlineChatIframeHolder.setAttribute('style',
                            'visibility: hidden;'
                            + 'top: ' + topPosition + ';'
                            + 'right:' + rightPosition + ';'
                            + 'bottom:' + bottomPosition + ';'
                            + 'left:' + leftPosition + ';'
                        );

                        onlineChatIframeSpacer = _getSafeFirstElementByClassName(onlineChat, ONLINE_CHAT_SPACER_CLASSNAME);
                        if (_isNodeElement(onlineChatIframeSpacer)) {
                            var spacerInitialSize = parseInt(topPosition === 'unset' ? bottomPosition : topPosition);
                            setSpacerSize(spacerInitialSize);

                            var setIframeHolderHeight = function() {
                                if (isMobileOrTabletWindowWidth()) {
                                    onlineChatIframeHolder.style.height = window.visualViewport.height + 'px';
                                } else {
                                    onlineChatIframeHolder.style.height = 'unset';
                                }
                            }

                            setIframeHolderHeight();

                            window.addEventListener('resize', function handleWindowResize() {
                                setSpacerSize(spacerInitialSize);
                                setIframeHolderHeight();
                                sendResizeDataToIframe();
                            });

                            if (isVisualViewportSupported) {
                                visualViewport.addEventListener('resize', function handleViewportResize() {
                                    setSpacerSize(spacerInitialSize);
                                    setIframeHolderHeight();
                                    sendResizeDataToIframe();
                                });
                            }
                        }
                    }
                }

                var bindResizeEvents = function() {
                    var position = getMultiwidgetPulsatorPosition();
                    var setIframePosition = function() {
                        if (_isNodeElement(onlineChatIframeHolder) && !isOnlineChatIframeOnFullScreen) {
                            var iframePositionByLabel = getIframePositionByLabel();

                            onlineChatIframeHolder.style.right = iframePositionByLabel[position].right;
                            onlineChatIframeHolder.style.left = iframePositionByLabel[position].left;
                            onlineChatIframeHolder.style.top = iframePositionByLabel[position].top;
                            onlineChatIframeHolder.style.bottom = iframePositionByLabel[position].bottom;
                        }
                    }

                    window.addEventListener('resize', function handleWindowResize() {
                        setIframePosition();
                    });

                    if (isVisualViewportSupported) {
                        visualViewport.addEventListener('resize', function handleViewportResize() {
                            setIframePosition();
                        });
                    }
                }

                var setMouseTrackStyles = function() {
                    if (_isNodeElement(onlineChatMouseTrack)) {
                        var position = getMultiwidgetPulsatorPosition();

                        onlineChatMouseTrack.setAttribute('style',
                            'top: ' + IFRAME_MOUSE_TRACK_POSITION_BY_LABEL[position].top + ';'
                            + 'bottom:' + IFRAME_MOUSE_TRACK_POSITION_BY_LABEL[position].bottom + ';'
                            + 'height:' + IFRAME_MOUSE_TRACK_POSITION_BY_LABEL[position].height + ';'
                        );
                    }
                };

                var setPulsatorPosition = function() {
                    if (_isNodeElement(pulsator)) {
                        var pulsatorPosition = getMultiwidgetPulsatorPosition();

                        pulsator.setAttribute('style',
                            'top: ' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].top + ';'
                            + 'right:' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].right + ';'
                            + 'bottom:' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].bottom + ';'
                            + 'left:' + PULSATOR_POSITION_BY_LABEL[pulsatorPosition].left + ';'
                        );
                    }
                }

                var appendChatWindow = function() {
                    if (document.body === null) {
                        return;
                    }

                    debugOnlineChat('iframe appending to page');

                    var onlineChatIframe = Base64.decode(storage.get(ONLINE_CHAT_IFRAME_TEMPLATE));

                    onlineChat = document.createElement('div');
                    onlineChat.innerHTML = onlineChatIframe;

                    document.body.appendChild(onlineChat);
                    onlineChatMouseTrack = _getSafeFirstElementByClassName(document, ONLINE_CHAT_MOUSE_TRACK_CLASS);

                    setIframePosition();
                    bindResizeEvents();
                    bindIframeEvents();
                };

                var fillPulsator = function() {
                    var pulsatorSettings = storage.getObject(MULTIWIDGET_PULSATOR_SETTINGS);
                    debugOnlineChat('start filling pulsator');

                    if (pulsatorSettings) {
                        if (_isNodeElement(onlineChatPulsatorFill)) {
                            onlineChatPulsatorFill.setAttribute('style', 'background: ' + pulsatorSettings.button_color + ';');
                        }

                        if (_isNodeElement(onlineChatPulsatorIcon)) {
                            onlineChatPulsatorIcon.setAttribute('style', 'fill: ' + pulsatorSettings.icon_color + ';');
                        }

                        if (HTMLCollection.prototype.isPrototypeOf(onlineChatPulsatorFillSvg)) {
                            for (var i = 0; i < onlineChatPulsatorFillSvg.length; i++) {
                                onlineChatPulsatorFillSvg[i].setAttribute('style', 'fill: ' + pulsatorSettings.button_color + ';');
                            }
                        }
                    }
                }

                var appendPulsator = function() {
                    if (document.body === null) {
                        return;
                    }

                    var onlineChatPulsatorTemplate     = Base64.decode(storage.get(ONLINE_CHAT_PULSATOR_TEMPLATE));
                    var isRoistatOnlineChatOnly        = !isTestRoistatMultiWidgetOnlyMode() && window.roistatOnlineChatOnly;
                    var isNeedRenderOnlineChatPulsator = (onlineChatPulsatorTemplate && !isNeedRenderMultiwidget() && isNeedToShowOnlineChat()) || isRoistatOnlineChatOnly;

                    if (isNeedRenderOnlineChatPulsator) {
                        debugOnlineChat('pulsator appending to page');

                        var tempPulsatorHolder = document.createElement('div');

                        tempPulsatorHolder.innerHTML = onlineChatPulsatorTemplate;
                        pulsator = tempPulsatorHolder.childNodes.item(0);

                        if (!window.roistat.multiwidget.isVisible) {
                            debugOnlineChat('Hide widget');
                            pulsator.className = pulsator.className + ' ' + PULSATOR_HOLDER_HIDDEN_CLASS;
                        }

                        onlineChatPulsatorFill = _getSafeFirstElementByClassName(pulsator, PULSATOR_FILL_CLASSNAME);
                        onlineChatPulsatorIcon = _getSafeFirstElementByClassName(pulsator, PULSATOR_ICON_CLASSNAME);
                        onlineChatPulsatorPhone = _getSafeFirstElementByClassName(pulsator, PULSATOR_PHONE_CLASSNAME);
                        onlineChatPulsatorFillSvg = document.getElementsByClassName(PULSATOR_ICON_FILL_CLASSNAME);

                        document.body.appendChild(pulsator);

                        setPulsatorPosition();
                        addPulsatorEvents();
                        fillPulsator();
                    }
                };

                var addPulsatorEvents = function() {
                    if (_isNodeElement(pulsator)) {
                        _addEvent(pulsator, 'click', function () {
                            toggleChatWindowVisibility();
                            togglePulsatorState(pulsator);
                        });
                    }
                };

                function togglePulsatorState(pulsator) {
                    if (_isNodeElement(pulsator)) {
                        pulsator.classList.toggle('opened');
                    }
                }

                var isOnlineChatOpened = function() {
                    return _isNodeElement(onlineChatIframeHolder) && !onlineChatIframeHolder.classList.contains(IFRAME_HOLDER_HIDDEN_CLASS);
                };

                function removeThemeColorMetaTag() {
                    var themeColorMetaTag = document.querySelector('#roistat-theme-color');

                    if (_isNodeElement(themeColorMetaTag)) {
                        themeColorMetaTag.remove();
                    }
                }

                function addThemeColorMetaTag() {
                    var themeColorMetaTag = document.createElement('meta');

                    if (_isNodeElement(themeColorMetaTag)) {
                        themeColorMetaTag.setAttribute('name', 'theme-color');
                        themeColorMetaTag.setAttribute('content', '#2589FF');
                        themeColorMetaTag.setAttribute('id', 'roistat-theme-color');
                        document.head.prepend(themeColorMetaTag);
                    }
                }

                var toggleMetaTags = function() {
                    if (!isOnlineChatOpened()) {
                        removeThemeColorMetaTag();
                        resetInitialViewportContent();
                        return;
                    }

                    var hasThemeMetaTag = Boolean(document.querySelector('#roistat-theme-color'));

                    if (isMobile.Android() || isMobile.iOS()) {
                        setIframeViewportContent();

                        if (!hasThemeMetaTag) {
                            addThemeColorMetaTag();
                        }
                    }
                }

                var setIframeViewportContent = function () {
                    var viewportMetaTag = document.querySelector('meta[name="viewport"]');

                    if (!_isNodeElement(viewportMetaTag)) {
                        viewportMetaTag = document.createElement('meta');
                        viewportMetaTag.setAttribute('name', 'viewport');
                        document.head.appendChild(viewportMetaTag);
                    }

                    viewportMetaTag.setAttribute('content', IFRAME_VIEWPORT_CONTENT);
                }

                function resetInitialViewportContent() {
                    var viewportMetaTag = document.querySelector('meta[name="viewport"]');

                    if (_isNodeElement(viewportMetaTag) && INITAL_VIEWPORT_META_TAG !== null) {
                        viewportMetaTag.setAttribute('content', INITAL_VIEWPORT_META_TAG);
                        return;
                    }

                    if (_isNodeElement(viewportMetaTag)) {
                        viewportMetaTag.remove();
                    }
                }

                var toggleChatWindowVisibility = function() {
                    setTimeout(function() {
                        isSettingPosition = false;
                    }, 3000);

                    if (_isNodeElement(onlineChatIframeHolder)) {
                        onlineChatIframeHolder.classList.toggle(IFRAME_HOLDER_HIDDEN_CLASS);

                        toggleMetaTags();
                    }

                    if (isOnlineChatOpened()) {
                        removeAllNotifyPopups();
                    }

                    sendOpenedDataToIframe();
                };

                var togglePulsatorVisibility = function() {
                    var pulsatorHolder = getNotificationsHolder();
                    if (_isNodeElement(pulsatorHolder)) {
                        pulsatorHolder.classList.toggle(PULSATOR_HOLDER_HIDDEN_CLASS);
                    }
                };

                var translateOnlineChatFormToLanguage = function(lang) {
                    onlineChatLanguage = lang;

                    if (!_isNodeElement(onlineChatIframe)) {
                        return;
                    }

                    sendIframeTranslateMessage();
                }

                var initChatWithMessage = function(text) {
                    if (!_isNodeElement(onlineChatIframe)) {
                        return;
                    }

                    sendIframeChatInitWithTextMessage(text);
                }

                var openChat = function(chatId) {
                    if (!_isNodeElement(onlineChatIframe)) {
                        return;
                    }

                    sendIframeChatOpensMessage(chatId);
                }

                function hideElementOption(element) {
                    if (_isNodeElement(element)) {
                        element.classList.add(MLTIWIDGET_PULSATOR_HIDDEN_CLASS);
                    }
                }

                var initChatWindow = function() {
                    isInited = true;
                    var onlineChatToggle = function() {
                        setTimeout(function() {
                            var pulsatorTrigger = null;
                            if (isNeedRenderMultiwidget()) {
                                pulsatorTrigger = _getSafeFirstElementByClassName(document, MLTIWIDGET_PULSATOR_TRIGGER_CLASS);
                            } else {
                                pulsatorTrigger = _getSafeFirstElementByClassName(document, IFRAME_HOLDER_CLASS);
                            }

                            if (isOnlineChatOpened()) {
                                toggleElementClass(pulsatorTrigger, 'opened', false);
                            } else {
                                toggleElementClass(pulsatorTrigger, 'opened', true);

                                var pulsatorPopup = _getSafeFirstElementByClassName(document, MLTIWIDGET_PULSATOR_POPUP_CLASS);
                                var isPopupShown = _isNodeElement(pulsatorPopup) && !pulsatorPopup.classList.contains(MLTIWIDGET_PULSATOR_HIDDEN_CLASS);
                                if (isPopupShown) {
                                    var pulsatorPopupOverlay = _getSafeFirstElementByClassName(document, MLTIWIDGET_PULSATOR_OVERLAY_CLASS);
                                    hideElementOption(pulsatorPopup);
                                    hideElementOption(pulsatorPopupOverlay);
                                }
                            }

                            toggleChatWindowVisibility();
                        }, 0);
                    };
                    window.roistatOnlineChatShow = onlineChatToggle;
                    window.roistatOnlineChatToggle = onlineChatToggle;
                    window.roistatMultiwidgetShow = togglePulsatorVisibility;
                    debugOnlineChat('chat window initialized');
                };

                function setCustomParams(params) {
                    setOnlineChatCustomParams(params);
                    sendUpdateParamsMessage();
                }

                function setAutoOpenChat() {
                    var onlineChatSettings = storage.getObject(ONLINE_CHAT_SETTINGS);

                    if (
                        typeof onlineChatSettings !== 'object'
                        || onlineChatSettings === null
                        || typeof onlineChatSettings.auto_open_chat !== 'object'
                        || !onlineChatSettings.auto_open_chat.is_enabled
                    ) {
                        return;
                    }

                    setTimeout(function() {
                        if (!isIframeModuleCreated) {
                            isChatWaitingForOpen = true;
                            return;
                        }

                        if (_isNodeElement(onlineChatIframeHolder)) {
                            onlineChatIframeHolder.classList.remove(IFRAME_HOLDER_HIDDEN_CLASS);
                            sendOpenedDataToIframe();
                        }
                    }, onlineChatSettings.auto_open_chat.delay_in_seconds * 1000);
                }

                function init() {
                    requireCss();
                    documentReadyCallback(function() {
                        appendChatWindow();
                        bindGlobalEvents();
                        setAutoOpenChat();
                    });
                }

                window.roistat.onlineChat.actions.initWithMessage = initChatWithMessage;
                window.roistat.onlineChat.actions.openChat        = openChat;

                window.roistat.onlineChat.localization.translateToRussian = function() { translateOnlineChatFormToLanguage(RU_LANGUAGE_KEY) };
                window.roistat.onlineChat.localization.translateToEnglish = function() { translateOnlineChatFormToLanguage(EN_LANGUAGE_KEY) };

                window.roistat.onlineChat.localization.translate = function(language) {
                    var isRuLang = DEFAULT_LANGUAGES_TITLE_VARIATIONS[RU_LANGUAGE_KEY].includes(language),
                        isEnLang = DEFAULT_LANGUAGES_TITLE_VARIATIONS[EN_LANGUAGE_KEY].includes(language),
                        languageForTranslation = language;

                    if (isRuLang) {
                        languageForTranslation = RU_LANGUAGE_KEY
                    }

                    if (isEnLang) {
                        languageForTranslation = EN_LANGUAGE_KEY
                    }

                    translateOnlineChatFormToLanguage(languageForTranslation)
                };

                addVisitProcessedCallback(init);
            }
        };

        function debugWidgets(debugString) {
            debug('Widgets: ' + debugString);
        }

        function isCorrectTemplate(template) {
            return template !== EMPTY_FLAG;
        }

        function setOnlineChatCustomParams(params) {
            var keys = Object.keys(params);

            for (var i = 0; i < keys.length; i++) {
                onlineChatParams[keys[i]] = params[keys[i]];
            }
        }

        function isNeedRenderMultiwidget() {
            var isLeadHunterEnabled          = Number(storage.get(LEAD_HUNTER_ENABLED)),
                isNeedToShowLeadHunterOption = isLeadHunterEnabled && isLeadHunterPulsatorEnabled && isLeadHunterPulsatorShownAtThisPage,
                isMultiwidgetEnabled         = Number(storage.get(MULTIWIDGETS_ENABLED)),
                isOnlineChatEnabled          = isNeedToShowOnlineChat(),
                isVKEnabled                  = Number(storage.get(MULTIWIDGET_VK_ENABLED)),
                isFBEnabled                  = Number(storage.get(MULTIWIDGET_FB_ENABLED)),
                isTelegramEnabled            = Number(storage.get(MULTIWIDGET_TELEGRAM_ENABLED)),
                isWhatsAppEnabled            = Number(storage.get(MULTIWIDGET_WHATS_APP_ENABLED)),
                isViberEnabled               = Number(storage.get(MULTIWIDGET_VIBER_ENABLED)),
                isAnyOptionEnabled           = isNeedToShowLeadHunterOption || isOnlineChatEnabled || isVKEnabled || isFBEnabled || isTelegramEnabled || isWhatsAppEnabled || isViberEnabled,
                isOnlyLeadHunterEnabled      = isNeedToShowLeadHunterOption && !isOnlineChatEnabled && !isVKEnabled && !isFBEnabled && !isTelegramEnabled && !isWhatsAppEnabled && !isViberEnabled,
                isOnlyOnlineChatEnabled      = isOnlineChatEnabled && !isNeedToShowLeadHunterOption && !isVKEnabled && !isFBEnabled && !isTelegramEnabled && !isWhatsAppEnabled && !isViberEnabled,
                isRoistatOnlineChatOnly      = !isTestRoistatMultiWidgetOnlyMode() && window.roistatOnlineChatOnly,
                isRoistatProject             = isTestRoistatMultiWidgetOnlyMode() && isCurrentProjectIsRoistat();

            debug('Is online chat only: ' + isRoistatOnlineChatOnly);
            debug('Is rp: ' + isRoistatOnlineChatOnly);

            return isMultiwidgetEnabled
                && isAnyOptionEnabled
                && !isOnlyOnlineChatEnabled
                && !isOnlyLeadHunterEnabled
                && !isRoistatOnlineChatOnly
                && !isRoistatProject;
        }

        function isNeedToShowOnlineChat() {
            var isOnlineChatEnabled = Number(storage.get(ONLINE_CHAT_ENABLED));

            if (!isOnlineChatEnabled) {
                debug('OnlineChat: Online chat is disabled');
                return false;
            }

            var onlineChatSettings = storage.getObject(ONLINE_CHAT_SETTINGS);

            if (onlineChatSettings === null) {
                return false;
            }

            if (!onlineChatSettings.is_available_for_current_user_agent) {
                debug('OnlineChat: Current device group is disabled');
                return false;
            }

            if (!onlineChatSettings.pages_filter.is_enabled) {
                debug('OnlineChat: Pages filter is disabled')
                return true;
            }

            return isPageEnabled(onlineChatSettings.pages_filter.pages.join(','));
        }

        function roistatHideMultiwidgetLeadHunterOption() {
            debugWidgets('Multiwidget disabled. Hide leadhunter pulsator from module');
        }

        function saveLeadHunterTemplates(formTemplate, pulsatorTemplate, pulsatorSettings) {
            storage.setLocal(LEAD_HUNTER_FORM_TEMPLATE, Base64.encode(formTemplate));
            storage.setLocal(LEAD_HUNTER_PULSATOR_TEMPLATE, Base64.encode(pulsatorTemplate));
            storage.setObject(LEAD_HUNTER_PULSATOR_SETTINGS, pulsatorSettings);
        }

        function saveMultiwidgetTemplates(pulsatorTemplate, pulsatorSettings) {
            storage.setLocal(MULTIWIDGET_PULSATOR_TEMPLATE, Base64.encode(pulsatorTemplate));
            storage.setObject(MULTIWIDGET_PULSATOR_SETTINGS, pulsatorSettings);
        }

        function saveOnlineChatTemplates(pulsatorTemplate, iframeTemplate, isOnlineChatEnabled) {
            storage.setLocal(ONLINE_CHAT_PULSATOR_TEMPLATE, Base64.encode(pulsatorTemplate));
            storage.setLocal(ONLINE_CHAT_IFRAME_TEMPLATE, Base64.encode(iframeTemplate));
            storage.set(ONLINE_CHAT_ENABLED, isOnlineChatEnabled);
        }

        function initLeadHunter(formTemplate, pulsatorTemplate, pulsatorSettings) {
            saveLeadHunterTemplates(formTemplate, pulsatorTemplate, pulsatorSettings);
            storage.setLocal(MULTIWIDGET_PULSATOR_TEMPLATE, Base64.encode(EMPTY_FLAG));
            storage.setLocal(ONLINE_CHAT_IFRAME_TEMPLATE, Base64.encode(EMPTY_FLAG));

            hasMultiwidgetFocusGroup = false;

            availableWidgets.leadHunter();
        }

        function initMultiWidgets(leadHunterSettings, multiwidgetSettings, onlineChatSettings) {
            var leadHunterFormTemplate      = leadHunterSettings.form_template,
                leadHunterPulsatorTemplate  = leadHunterSettings.pulsator_template,
                leadHunterPulsatorSettings  = leadHunterSettings.pulsator_settings;

            if (isCurrentProjectIsRoistat()) {
                initLeadHunter(leadHunterFormTemplate, leadHunterPulsatorTemplate, leadHunterPulsatorSettings);

                return;
            }

            debugWidgets('start initing widgets');
            var onlineChatPulsatorTemplate  = onlineChatSettings.pulsator_template,
                onlineChatIframeTemplate    = onlineChatSettings.iframe_template,
                multiwidgetPulsatorTemplate = multiwidgetSettings.pulsator_template,
                multiwidgetPulsatorSettings = multiwidgetSettings.pulsator_settings,
                isLeadHunterEnabled         = Number(storage.get(LEAD_HUNTER_ENABLED)),
                isOnlineChatEnabled         = Number(onlineChatSettings.settings.is_enabled),
                hasLeadHunterTargetPagesMap = storage.getObject(LEAD_HUNTER_TARGET_PAGES_MAP) !== null;

            saveLeadHunterTemplates(leadHunterFormTemplate, leadHunterPulsatorTemplate, leadHunterPulsatorSettings);
            saveMultiwidgetTemplates(multiwidgetPulsatorTemplate, multiwidgetPulsatorSettings);
            saveOnlineChatTemplates(onlineChatPulsatorTemplate, onlineChatIframeTemplate, isOnlineChatEnabled);

            if (hasLeadHunterTargetPagesMap) {
                storage.setLocal(LEAD_HUNTER_FORM_TEMPLATE, Base64.encode(getLeadHunterTemplate()));
            }

            hasMultiwidgetFocusGroup = true;

            if (isLeadHunterEnabled && !isRoistatMultiWidgetOnly()) {
                debugWidgets('leadhunter enabled. Start processing');
                availableWidgets.leadHunter();
            }

            if (isNeedToShowOnlineChat()) {
                debugWidgets('online chat enabled. Start processing');
                availableWidgets.onlineChat();
            }

            if (isNeedRenderMultiwidget()) {
                debugWidgets('multiwidget enabled. Start processing');
                availableWidgets.multiwidget();
            }
        }

        var getLeadHunterTemplate = function() {
            var iframeUrl = appendMaParam(protocol() + "//"+ROISTAT_HOST+"/api/site/1.0/"+getProjectForUrl()+"/leadhunter/script/"+storage.get(LEAD_HUNTER_DEFAULT_SCRIPT_ID)+"/widget");

            return '<div class="roistat-lh-popup-wrapper" data-is-iframe="1"><iframe id="roistat-lh-popup-iframe" class="roistat-lh-popup-iframe" src="' + iframeUrl + '" frameborder="0"></iframe></div>';
        };

        function initWidgets() {
            var leadHunterFormTemplate      = storage.get(LEAD_HUNTER_FORM_TEMPLATE),
                leadHunterPulsatorTemplate  = storage.get(LEAD_HUNTER_PULSATOR_TEMPLATE),
                leadHunterPulsatorSettings  = storage.getObject(LEAD_HUNTER_PULSATOR_SETTINGS),
                isLeadHunterEnabled         = Number(storage.get(LEAD_HUNTER_ENABLED)),
                onlineChatPulsatorTemplate  = storage.get(ONLINE_CHAT_PULSATOR_TEMPLATE),
                onlineChatIframeTemplate    = storage.get(ONLINE_CHAT_IFRAME_TEMPLATE),
                onlineChatIsEnabled         = storage.get(ONLINE_CHAT_ENABLED),
                multiwidgetPulsatorTemplate = storage.get(MULTIWIDGET_PULSATOR_TEMPLATE),
                multiwidgetPulsatorSettings = storage.getObject(MULTIWIDGET_PULSATOR_SETTINGS);

            window.roistatLeadhunterForm = initLeadHunter;
            window.roistatMultiwidget = initMultiWidgets;

            if (!leadHunterFormTemplate || !leadHunterPulsatorTemplate
                || !leadHunterPulsatorSettings || !multiwidgetPulsatorTemplate
                || !multiwidgetPulsatorSettings || !onlineChatPulsatorTemplate) {
                debugWidgets('requesting data from server');

                if (isNeedRenderMultiwidget() || isNeedToShowOnlineChat() || isLeadHunterEnabled) {
                    sendApiRequestJSONP(protocol() + '//'+ROISTAT_HOST+'/api/site/'+API_VERSION_NEW+'/'+getProjectForUrl()+'/multiwidget?domain='+encodeURIComponent(document.domain));
                }
            } else {
                var decodedMultiwidgetPulsatorTemplate = Base64.decode(multiwidgetPulsatorTemplate);
                var decodedOnlineChatIframeTemplate = Base64.decode(onlineChatIframeTemplate);

                if ((!isCorrectTemplate(decodedMultiwidgetPulsatorTemplate)
                    || !isCorrectTemplate(decodedOnlineChatIframeTemplate)
                    || isCurrentProjectIsRoistat()) && !isRoistatMultiWidgetOnly()) {
                    debugWidgets('initing LeadHunter form');

                    window.roistatLeadhunterForm(Base64.decode(leadHunterFormTemplate), Base64.decode(leadHunterPulsatorTemplate), leadHunterPulsatorSettings);
                } else {
                    debugWidgets('initing multiwidget form');

                    var multiwidgetArgs = {
                            pulsator_template: decodedMultiwidgetPulsatorTemplate,
                            pulsator_settings: multiwidgetPulsatorSettings
                        },
                        leadHunterArgs = {
                            form_template: Base64.decode(leadHunterFormTemplate),
                            pulsator_template: Base64.decode(leadHunterPulsatorTemplate),
                            pulsator_settings: leadHunterPulsatorSettings
                        },
                        onlineChatArgs = {
                            iframe_template: decodedOnlineChatIframeTemplate,
                            pulsator_template: Base64.decode(onlineChatPulsatorTemplate),
                            settings: {
                                is_enabled: Number(onlineChatIsEnabled),
                            },
                        };

                    window.roistatMultiwidget(leadHunterArgs, multiwidgetArgs, onlineChatArgs);
                }
            }
        }

        function processPage() {
            initWidgets();
            debugWidgets('form initialized');
        }

        function init() {
            debugWidgets('activated');

            processPage();
        }

        addVisitProcessedCallback(init);

        window.setRoistatOnlineChatCustomParams = setOnlineChatCustomParams;
        window.roistatSaveLeadHunterTemplates   = saveLeadHunterTemplates;
        window.roistatSaveMultiwidgetTemplate   = saveMultiwidgetTemplates;
        window.roistatSaveOnlineChatTemplate    = saveOnlineChatTemplates;
    })();

    (function callTracking() {
        /**
         * @returns {String|undefined}
         */
        var getPhone = function() {
            return roistatGetCookie(ROISTAT_PHONE_COOKIE);
        };
        /**
         * @returns {String|undefined}
         */
        var getRawPhone = function() {
            return roistatGetCookie(ROISTAT_RAW_PHONE_COOKIE);
        };
        /**
         * @returns {String|undefined}
         */
        var getPhoneScriptsData = function() {
            return storage.get(ROISTAT_PHONE_SCRIPT_DATA);
        };
        /**
         * @returns {String|undefined}
         */
        var getReplacement = function() {
            return storage.get(ROISTAT_PHONE_REPLACEMENT);
        };
        /**
         * @param {String} phone
         * @returns {Boolean}
         */
        var isValidPhone = function(phone) {
            return phone != null && phone !== undefined && phone !== "";
        };
        /**
         * @returns {Array}
         */
        var getCallTrackingElements = function() {
            var result = [];
            var elements = document.getElementsByClassName(CALL_TRACKING_CLASS);
            if (elements && elements.length) {
                result = elements;
            }
            return result;
        };
        /**
         * @returns {Array}
         */
        var getCallTrackingCountryElements = function() {
            var result = [];
            var elements = document.getElementsByClassName(CALL_TRACKING_COUNTRY_CLASS);
            if (elements && elements.length) {
                result = elements;
            }
            return result;
        };
        /**
         * @returns {Array}
         */
        var getCallTrackingRegionElements = function() {
            var result = [];
            var elements = document.getElementsByClassName(CALL_TRACKING_REGION_CLASS);
            if (elements && elements.length) {
                result = elements;
            }
            return result;
        };
        /**
         * @returns {Array}
         */
        var getCallTrackingNumberElements = function() {
            var result = [];
            var elements = document.getElementsByClassName(CALL_TRACKING_NUMBER_CLASS);
            if (elements && elements.length) {
                result = elements;
            }
            return result;
        };
        /**
         * @returns {Array}
         */
        var getCallTrackingTelElements = function() {
            var result = [];
            var elements = document.getElementsByClassName(CALL_TRACKING_TEL_CLASS);
            if (elements && elements.length) {
                result = elements;
            }
            return result;
        };
        /**
         * @param {String} phone
         * @param {String} rawPhone
         * @param {Array} phoneScripts
         */
        var renderPhone = function(phone, rawPhone, phoneScripts) {

            debug('CallTracking: RenderPhone phone = ' + phone);

            /**
             * @param {string} phone
             * @returns {string}
             */

            var _filterNumericPhone = function(phone) {
                return phone.split(/[^0-9]/).join("");
            };
            /**
             * @param {HTMLElement} element
             * @param {String} phone
             * @return {String}
             */
            var _getPhoneForElement = function(element, phone) {
                var result = null;
                if (!element) {
                    return result;
                }
                var phones = phone.split(",");
                if (phones.length < 2) {
                    result = phone;
                } else {
                    var prefixBind = element.getAttribute('data-prefix');
                    if (prefixBind) {
                        for (var i = 0; i < phones.length; i++) {
                            var currentPhone = phones[i];
                            var filteredPhone = _filterNumericPhone(currentPhone);
                            if (filteredPhone.indexOf("8") === 0) {
                                filteredPhone = "7" + filteredPhone.substring(1);
                            }
                            var isValidPrefix = filteredPhone.split(prefixBind)[0] === "";
                            if (isValidPrefix) {
                                result = currentPhone;
                                break;
                            }
                        }
                    }
                    if (result === null) {
                        result = phones[0];
                    }
                    debug('CallTracking._getPhoneForElement: Prepared phone = ' + result + ' for data-prefix = ' + prefixBind);
                }
                return result;
            };

            /**
             * @param {HTMLElement} element
             * @param {String} phone
             * @param {String} rawPhone
             */
            var _renderElementHref = function(element, phone, rawPhone) {
                var formattedPhone = _getPhoneForElement(element, phone);
                var phoneForElement = rawPhone || formattedPhone;
                if (!phoneForElement || !element) {
                    return;
                }
                if (element.tagName.toLowerCase() !== 'a') {
                    return;
                }

                var href = element.getAttribute('href');
                if (inString(href, "tel:")) {
                    var normalizedPhone = rawPhone;
                    if (!normalizedPhone) {
                        normalizedPhone = _filterNumericPhone(phoneForElement);
                        if (normalizedPhone.indexOf("8") === 0) {
                            normalizedPhone = "7" + normalizedPhone.substring(1);
                        }
                    }

                    element.setAttribute('href', "tel:+" + normalizedPhone);
                    _renderElementTitle(element, formattedPhone);
                }
            };

            /**
             * @param {HTMLElement} element
             * @param {String} phone
             */
            var _renderElementTitle = function(element, phone) {
                if (!element.hasAttribute('title')) {
                    return;
                }

                element.setAttribute('title', phone);
            };

            /**
             * @param {HTMLElement} element
             * @param {String} phone
             */
            var _renderElementContent = function(element, phone) {
                var phoneForElement = _getPhoneForElement(element, phone);
                if (!phoneForElement || !element) {
                    return;
                }
                element.innerHTML = phoneForElement;
            };

            var PHONE_NUMBER_COUNTRY_REGEXP = /^\D*(\d+)(?:[(|\s])/;
            var PHONE_NUMBER_REGION_REGEXP = /\((\d+)\)|\s(\d+)\s/;
            var PHONE_NUMBER_PART_REGEXP = /(\(\d+\)|\s\d+\s)(.+)/;
            var _getPhoneNumberParts = function(element, phone) {
                var phoneForElement = _getPhoneForElement(element, phone);

                var countryCodeMatch = phoneForElement.match(PHONE_NUMBER_COUNTRY_REGEXP);
                var countryCode = isArray(countryCodeMatch) ? countryCodeMatch[1] : '';

                var regionCodeMatch = phoneForElement.match(PHONE_NUMBER_REGION_REGEXP);
                var regionCode = (isArray(regionCodeMatch) ? (regionCodeMatch[1] || regionCodeMatch[2]) : '').trim();

                var numberCodeMatch = phoneForElement.match(PHONE_NUMBER_PART_REGEXP);
                var numberCode = (isArray(numberCodeMatch) ? numberCodeMatch[2] : '').trim();

                return {
                    country: countryCode,
                    region: regionCode,
                    number: numberCode
                };
            }

            /**
             * @param {String} phone
             * @param {String} rawPhone
             */
            var _renderDefaultClasses = function(phone, rawPhone) {
                var callTrackingElements = getCallTrackingElements();
                debug("CallTracking: render phone default classes for " + callTrackingElements.length + " elements");

                arrayIterate(callTrackingElements, function(element) {
                    _renderElementContent(element, phone);
                    _renderElementHref(element, phone, rawPhone);
                });

                arrayIterate(getCallTrackingCountryElements(), function(element) {
                    var countryCode = _getPhoneNumberParts(element, phone).country;
                    _renderElementContent(element, countryCode);
                });

                arrayIterate(getCallTrackingRegionElements(), function(element) {
                    var regionCode = _getPhoneNumberParts(element, phone).region;
                    _renderElementContent(element, regionCode);
                });

                arrayIterate(getCallTrackingNumberElements(), function(element) {
                    var numberCode = _getPhoneNumberParts(element, phone).number;
                    _renderElementContent(element, numberCode);
                });

                arrayIterate(getCallTrackingTelElements(), function(element) {
                    _renderElementHref(element, phone, rawPhone);
                });
            };

            /**
             * @param {String} phone
             * @param {String} rawPhone
             * @param {Array} replacements
             */
            var _renderUserReplacements = function(phone, rawPhone, replacements) {
                if (!replacements) {
                    return;
                }
                debug("CallTracking: render phone user replacement for " + replacements.length + " replacements");

                for (var i = 0; i < replacements.length; i++) {
                    var replaceSelector = replacements[i];
                    if (!replaceSelector) {
                        continue;
                    }
                    var selectorType = replaceSelector[0];
                    replaceSelector = replaceSelector.substr(1);
                    var elements = [];
                    if (selectorType === "#") {
                        var element = document.getElementById(replaceSelector);
                        if (element !== null) {
                            elements.push(element);
                        }
                    } else {
                        elements = document.getElementsByClassName(replaceSelector);
                        _renderUserPostPrefix(replaceSelector, phone, rawPhone);
                    }
                    if (!elements || elements.length < 1) {
                        continue;
                    }

                    debug("CallTracking: render phone for " + replaceSelector + ", " + elements.length + " elements");
                    for (var j = 0; j < elements.length; j++) {
                        _renderElementContent(elements[j], phone);
                        _renderElementHref(elements[j], phone, rawPhone);
                    }
                }
            };

            /**
             * @param {array} phoneScripts
             */
            var _renderScriptReplacements = function(phoneScripts) {
                for (var i = 0; i < phoneScripts.length; i++) {
                    _renderUserReplacements(phoneScripts[i].phone, phoneScripts[i].raw_phone, phoneScripts[i].css_selectors);
                    _replaceByNumbers(phoneScripts[i].phone, phoneScripts[i].raw_phone, phoneScripts[i].replaceable_numbers);
                }
            };

            /**
             * @param {String} phone
             * @param {String} rawPhone
             * @param {Array} numbers
             */
            var _replaceByNumbers = function(phone, rawPhone, numbers) {
                if (!numbers || numbers.length === 0) {
                    return;
                }

                var _processNodes = function() {
                    var patterns = _getNumbersPatterns();
                    var allNodes = document.getElementsByTagName('*');
                    var allNodeCount = allNodes.length;

                    for (var i = 0; i < allNodeCount; i++) {
                        var node = allNodes[i];
                        _processPhoneLink(node, patterns, _getPhoneForElement(node, phone));

                        var childNodesCount = node.childNodes.length;
                        for (var j = 0; j < childNodesCount; j++) {
                            var childNode = node.childNodes[j];
                            _processTextNode(childNode, patterns, _getPhoneForElement(childNode, phone));
                        }
                    }
                };

                /**
                 * @param {HTMLElement} node
                 * @param {Array} patterns
                 * @param {String} replacementPhone
                 */
                var _processPhoneLink = function(node, patterns, replacementPhone) {
                    if (!_isPhoneLink(node)) {
                        return;
                    }

                    var phoneFromLink = node.getAttribute('href').replace('tel:', '');
                    var patternsCount = patterns.length;
                    for (var patternIndex = 0; patternIndex < patternsCount; patternIndex++) {
                        if (patterns[patternIndex].test(phoneFromLink)) {
                            _renderElementHref(node, _getPhoneForElement(node, replacementPhone), rawPhone);
                        }
                    }
                };

                /**
                 * @param {HTMLElement} element
                 * @return {Boolean}
                 */
                var _isPhoneLink = function(element) {
                    if (element.tagName.toLowerCase() !== 'a') {
                        return false;
                    }

                    var href = element.getAttribute('href');
                    return isStringValue(href) && href.indexOf('tel:') === 0;
                };

                var _getNumbersPatterns = function() {
                    var numbersPatterns = [];
                    for (var i = 0; i < numbers.length; i++) {
                        var specialCharsPattern = '[\\s()[\\]{}\\-+.]*';
                        var numberRegexp = numbers[i].split('').join(specialCharsPattern);
                        numbersPatterns.push(new RegExp('[+(]?' + numberRegexp, 'g'));
                    }

                    return numbersPatterns;
                };

                /**
                 * @param {HTMLElement} node
                 * @param {RegExp} patterns
                 * @param {String} replacementPhone
                 */
                var _processTextNode = function(node, patterns, replacementPhone) {
                    if (node.nodeType !== Node.TEXT_NODE) {
                        return;
                    }

                    for (var i = 0; i < patterns.length; i++) {
                        if (node.textContent && patterns[i].test(node.textContent)) {
                            node.textContent = node.textContent.replace(patterns[i], replacementPhone);
                        } else if (node.innerText && patterns[i].test(node.innerText)) {
                            node.innerText = node.innerText.replace(patterns[i], replacementPhone);
                        }
                    }
                };

                _processNodes();
            };

            /**
             * @param {String} replaceSelector
             * @param {String} phone
             * @param {String} rawPhone
             */
            var _renderUserPostPrefix = function (replaceSelector, phone, rawPhone) {
                arrayIterate(_getUserPostPrefixElements(replaceSelector + '-' + CALL_TRACKING_POSTFIX_COUNTRY), function(element) {
                    var countryCode = _getPhoneNumberParts(element, phone).country;
                    _renderElementContent(element, countryCode);
                });

                arrayIterate(_getUserPostPrefixElements(replaceSelector + '-' + CALL_TRACKING_POSTFIX_REGION), function(element) {
                    var regionCode = _getPhoneNumberParts(element, phone).region;
                    _renderElementContent(element, regionCode);
                });

                arrayIterate(_getUserPostPrefixElements(replaceSelector + '-' + CALL_TRACKING_POSTFIX_NUMBER), function(element) {
                    var numberCode = _getPhoneNumberParts(element, phone).number;
                    _renderElementContent(element, numberCode);
                });

                arrayIterate(_getUserPostPrefixElements(replaceSelector + '-' + CALL_TRACKING_POSTFIX_TEL), function(element) {
                    _renderElementHref(element, phone, rawPhone);
                });
            };

            /**
             * @returns {Array}
             */
            var _getUserPostPrefixElements = function(replaceSelectorWithPostPrefix) {
                var result = [];
                var elements = document.getElementsByClassName(replaceSelectorWithPostPrefix);
                if (elements && elements.length) {
                    result = elements;
                }
                return result;
            };

            var _render = function _render() {
                var replacements = getReplacement();
                if (replacements) {
                    replacements = replacements.split("\n");
                    for (var i = 0; i < replacements.length; i++) {
                        replacements[i] = "." + replacements[i];
                    }
                }

                if (phoneScripts instanceof Array) {
                    _renderScriptReplacements(phoneScripts);
                } else {
                    _renderDefaultClasses(phone, rawPhone);
                    _renderUserReplacements(phone, rawPhone, replacements);
                }
            };

            (function _process() {
                _render();
                var timeouts = [300, 5000, 15000];
                timeouts.forEach(function (timeout) {
                    setTimeout(_render, timeout);
                });
            })();
        };
        /**
         * @param {Number} value
         */
        var saveEnableSetting = function(value) {
            storage.save(ROISTAT_CALL_TRACKING, value, COOKIE_CONFIG);
        };
        var saveSettings = function() {
            if (window.roistat.callTracking.phone) {
                var cookieConfigSession = { expires: parseInt(window.roistat.callTracking.sessionTime), path: '/' };
                if (COOKIE_CONFIG.domain) {
                    cookieConfigSession.domain = COOKIE_CONFIG.domain;
                }
                roistatSetCookie(ROISTAT_PHONE_COOKIE, window.roistat.callTracking.phone, cookieConfigSession);
                roistatSetCookie(ROISTAT_RAW_PHONE_COOKIE, window.roistat.callTracking.rawPhone, cookieConfigSession);
                saveEnableSetting(1);
                storage.save(ROISTAT_PHONE_REPLACEMENT, window.roistat.callTracking.replacementClasses, COOKIE_CONFIG);
                storage.save(ROISTAT_PHONE_SCRIPT_DATA, window.roistat.callTracking.phoneScriptsJson, COOKIE_CONFIG);
            }
        };
        /**
         * @param {String} phone
         * @param {Number} session
         * @param {String} replacement
         * @param {String} phoneScriptsJson
         * @param {String} rawPhone
         */
        var reusePhone = function(phone, session, replacement, phoneScriptsJson, rawPhone) {
            debug("CallTracking: reuse phone " + phone + " for time " + session + " and replacements " + replacement);

            var selector = 'script[data-roistat-script-id="'+ CALL_TRACKING_GET_PHONE_SCRIPT_ID +'"]';
            document.querySelectorAll(selector).forEach(function(element, index) {
                if (index === 0) {
                    return;
                }
                element.remove();
            });
            debug("CallTracking: all old scripts removed");

            if (!isValidPhone(phone)) {
                debug("CallTracking: new phone is invalid");
                roistat.callTracking.phone = null;
                callTrackingPhoneReceived();
                return;
            }

            roistat.callTracking.enabled = 1;
            roistat.callTracking.phone = phone;
            roistat.callTracking.sessionTime = session;
            roistat.callTracking.replacementClasses = replacement;
            roistat.callTracking.phoneScriptsJson = phoneScriptsJson;
            roistat.callTracking.rawPhone = rawPhone;
            callTrackingPhoneReceived();
            saveSettings();
            var cookieReuseConfig = { expires: parseInt(session), path: '/' };
            if (COOKIE_CONFIG.domain) {
                cookieReuseConfig.domain = COOKIE_CONFIG.domain;
            }
            roistatSetCookie(ROISTAT_PHONE_COOKIE, phone, cookieReuseConfig);
            roistatSetCookie(ROISTAT_RAW_PHONE_COOKIE, rawPhone, cookieReuseConfig);
            storage.save(ROISTAT_PHONE_SCRIPT_DATA, phoneScriptsJson, COOKIE_CONFIG);
            storage.save(ROISTAT_PHONE_REPLACEMENT, replacement, COOKIE_CONFIG);
            var phoneScriptsData = tryParseJson(phoneScriptsJson);
            renderPhone(phone, rawPhone, phoneScriptsData);
        };
        var requestNewPhone = function() {
            debug('CallTracking: request new phone');
            var visitId = roistatGetCookie(ROISTAT_VISIT_COOKIE);
            var savedMarker = getMarkerFromCookie();
            var realMarker = savedMarker ? savedMarker : marker;
            var escapedInitUrl = encodeURIComponent(initUrl);
            var url = getApiBaseUrl()+'/get-phone?visit=' + visitId + '&marker=' + (realMarker ? realMarker : '') + '&prefix='+roistatPhonePrefix+'&prefix_bind='+roistatPhonePrefixBind+'&phone_scripts_bind='+roistatCalltrackingScripts+'&page='+escapedInitUrl;
            sendApiRequestJSONP(url, CALL_TRACKING_GET_PHONE_SCRIPT_ID);
        };

        var refreshPhone = function() {
            roistatPhonePrefix = window.roistatPhonePrefix ? window.roistatPhonePrefix : "";
            roistatPhonePrefixBind = window.roistatPhonePrefixBind ? window.roistatPhonePrefixBind : "";
            roistatCalltrackingScripts = window.roistatCalltrackingScripts && window.roistatCalltrackingScripts.join ? window.roistatCalltrackingScripts.join(",") : "";
            debug("CallTracking: refresh phone with prefix: " + roistatPhonePrefix + ", binding: " + roistatPhonePrefixBind + ", scripts: " + roistatCalltrackingScripts);
            requestNewPhone();
        };
        /**
         * @returns {Boolean}
         */
        var isEnabled = function() {
            var globalEnabled = storage.get(ROISTAT_CALL_TRACKING) > 0;
            var localEnabled = settings.callTrackingEnabled;
            return globalEnabled && localEnabled;
        };
        /**
         * @param {Object} settings
         * @param {Number} [settings.is_enabled]
         */
        var updateSettings = function(settings) {
            saveEnableSetting(settings.is_enabled);
        };

        var processPhone = function processPhone() {
            var phone = getPhone();
            if (!isValidPhone(phone)) {
                debug("CallTracking: invalid phone " + phone + ", requesting a new one");
                requestNewPhone();
            } else {
                debug("CallTracking: render phone " + phone);
                var rawPhone = getRawPhone();
                var phoneScriptData = tryParseJson(getPhoneScriptsData());
                renderPhone(phone, rawPhone, phoneScriptData);
            }
        };

        var init = function() {
            debug("CallTracking: init");

            if (isRoistatMultiWidgetOnly()) {
                debug("CallTracking: Shut down because only online chat need to be inited");
                return;
            }

            saveSettings();
            if (!isEnabled()) {
                debug("CallTracking: disabled, skip");
                return;
            }

            if (settings.callTrackingManual) {
                debug("CallTracking: init finish because off manual");
                return;
            }

            processPhone();
            addSPAPageChangedCallback(processPhone);
        };
        window.roistatCallTrackingRefresh = refreshPhone;
        window.roistatRequestNewPhone = requestNewPhone;
        window.roistatReusePhone = reusePhone;
        window.roistatCalltrackingUpdateSettings = updateSettings;
        addVisitProcessedCallback(init);
    })();

    (function emailtracking() {
        /**
         * @param {String} message
         */
        var debugEmailtracking = function(message) {
            debug("Emailtracking: " + message);
        };

        /**
         * @param {String} email
         * @param {String} trackingEmail
         * @param {Object} emails
         */
        var saveEmail = function(email, trackingEmail, emails) {
            storage.save(ROISTAT_EMAILTRACKING_EMAIL, email, COOKIE_CONFIG);
            storage.save(ROISTAT_EMAILTRACKING_TRACKING_EMAIL, trackingEmail, COOKIE_CONFIG);
            storage.save(ROISTAT_EMAILTRACKING_EMAILS, JSON.stringify(emails), COOKIE_CONFIG);
        };

        var processSettings = function() {
            var settingsHaveEmails =
                (window.roistat.emailtracking.email && window.roistat.emailtracking.trackingEmail) ||
                isNonEmptyObject(window.roistat.emailtracking.emails);
            if (window.roistat.emailtracking.loaded && settingsHaveEmails) {
                debugEmailtracking("save loaded email: " + window.roistat.emailtracking.email);
                saveEmail(window.roistat.emailtracking.email, window.roistat.emailtracking.trackingEmail, window.roistat.emailtracking.emails);
            } else {
                debugEmailtracking("settings save skip, because not loaded");
                window.roistat.emailtracking.email = storage.get(ROISTAT_EMAILTRACKING_EMAIL);
                window.roistat.emailtracking.email = window.roistat.emailtracking.email ? window.roistat.emailtracking.email : null;
                window.roistat.emailtracking.email = window.roistat.emailtracking.email === "null" ? null : window.roistat.emailtracking.email;
                debugEmailtracking("email loaded from storage: " + window.roistat.emailtracking.email);

                window.roistat.emailtracking.trackingEmail = storage.get(ROISTAT_EMAILTRACKING_TRACKING_EMAIL);
                window.roistat.emailtracking.trackingEmail = window.roistat.emailtracking.trackingEmail ? window.roistat.emailtracking.trackingEmail : null;
                window.roistat.emailtracking.trackingEmail = window.roistat.emailtracking.trackingEmail === "null" ? null : window.roistat.emailtracking.trackingEmail;
                debugEmailtracking("tracking email loaded from storage: " + window.roistat.emailtracking.trackingEmail);

                window.roistat.emailtracking.emails = tryParseJson(storage.get(ROISTAT_EMAILTRACKING_EMAILS));
                window.roistat.emailtracking.emails = window.roistat.emailtracking.emails ? window.roistat.emailtracking.emails : null;
                debugEmailtracking("emails loaded from storage: " + JSON.stringify(window.roistat.emailtracking.emails));
            }
        };

        /**
         * @param {Object} settings
         * @param {String} [settings.email]
         * @param {String} [settings.trackingEmail]
         * @param {Object} [settings.emails]
         */
        var updateSettings = function(settings) {
            saveEmail(settings.email, settings.trackingEmail, settings.emails);
        };

        /**
         * @returns {Boolean}
         */
        var isEmailtrackingEnabled = function() {
            var settingsHaveEmails =
                (!!window.roistat.emailtracking.email && !!window.roistat.emailtracking.trackingEmail) ||
                isNonEmptyObject(window.roistat.emailtracking.emails);
            return window.roistat.emailtracking.enabled && settingsHaveEmails;
        };

        var processNodes = function() {
            if (!isEmailtrackingEnabled()) {
                debugEmailtracking('emailtracking disabled, skip swapping');
                return;
            }

            /**
             * @param {HTMLElement} node
             * @param {RegExp} pattern
             * @param {Function} replacementFunction
             */
            var replaceNodeText = function(node, pattern, replacementFunction) {
                if (node.href) {
                    var href = decodeURIComponentSafe(node.href);
                    if (pattern.test(href)) {
                        node.href = href.replace(pattern, replacementFunction);
                        return true;
                    }
                }
                if (node.nodeType !== 3) {
                    return false;
                }
                if (node.textContent && pattern.test(node.textContent)) {
                    node.textContent = node.textContent.replace(pattern, replacementFunction);
                    return true;
                } else if (node.innerText && pattern.test(node.innerText)) {
                    node.innerText = node.innerText.replace(pattern, replacementFunction);
                    return true;
                }
                return false;
            };

            /**
             * @param {String} str
             * @returns {String}
             */
            var escapeRegExp = function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            };

            var prepareTrackingEmail = function (trackingEmail, email) {
                var isUpperCaseEmail = !email.match(/[a-z]/);
                return isUpperCaseEmail ? trackingEmail.toUpperCase() : trackingEmail;
            };

            var replaceEmail = function(replacementEmail, trackingEmail) {
                var emailForRegexp = escapeRegExp(replacementEmail);
                var replacementRegExp = new RegExp('(^|\\s)(mailto:)?(' + emailForRegexp + ')($|\\s|\\?)', 'gi');
                var replacementFunction = function (str, before, mailto, email, after) {
                    mailto = mailto || '';
                    return before + mailto + prepareTrackingEmail(trackingEmail, email) + after;
                };
                debugEmailtracking('starting to replace email ' + replacementEmail + ' to ' + trackingEmail + ' with regexp ' + replacementRegExp);

                var allNodes = document.getElementsByTagName('*');
                var allNodeCount = allNodes.length;
                debugEmailtracking('found ' + allNodeCount + ' nodes on page');
                var successCount = 0;
                for (var i = 0; i < allNodeCount; i++) {
                    var node = allNodes[i];
                    var childNodeCount = node.childNodes.length;
                    if (childNodeCount > 0) {
                        for (var j = 0; j < childNodeCount; j++) {
                            var childNode = node.childNodes[j];
                            if (replaceNodeText(childNode, replacementRegExp, replacementFunction)) {
                                successCount++;
                            }
                        }
                    }
                    if (replaceNodeText(node, replacementRegExp, replacementFunction)) {
                        successCount++;
                    }
                }
                debugEmailtracking('successfully replaced ' + successCount + ' nodes');
            };

            if (window.roistat.emailtracking.emails) {
                objectIterate(window.roistat.emailtracking.emails, replaceEmail);
            } else {
                replaceEmail(window.roistat.emailtracking.email, window.roistat.emailtracking.trackingEmail);
            }
        };

        var processEmailSwap = function() {
            debugEmailtracking('process email swap');

            processNodes();
            setTimeout(function() {
                processNodes();
            }, 300);
            setTimeout(function() {
                processNodes();
            }, 5000);
            setTimeout(function() {
                processNodes();
            }, 15000);
        };

        var init = function() {
            debugEmailtracking('init');

            if (isRoistatMultiWidgetOnly()) {
                debugEmailtracking('Shut down because only online chat need to be inited');
                return;
            }

            addSPAPageChangedCallback(processEmailSwap);
            processSettings();
            processEmailSwap();
        };

        window.roistatEmailtrackingUpdateSettings = updateSettings;
        window.roistat.emailtracking.refresh = processNodes;

        addVisitProcessedCallback(init);
    })();

    (function multiDomain() {
        var _debug = function(message) {
            debug("MultiDomain: " + message);
        };

        var isMultiDomainEnabled = function() {
            return storage.get(ROISTAT_IS_MULTI_DOMAIN) > 0;
        };

        /**
         * @param {HTMLElement} node
         */
        var updateNodeHref = function(node) {
            var isValidUrl = function(url) {
                if (!url) {
                    return false;
                }
                if (inString(url, 'roistat_visit')) {
                    return false;
                }
                var domainFromUrl = getDomainFromUrl(url);
                var currentDomain = getDomainFromUrl(document.domain);
                var validRegExp   = new RegExp(/^((https?:)?\/\/)?([A-ZА-ЯЁ0-9\_\-\~]+\.)+[A-ZА-ЯЁ0-9\_\-\~]+/i);
                return domainFromUrl !== currentDomain && validRegExp.test(url);
            };
            var addRoistatVisitToUrl = function(url) {
                var hashParts = url.split("#");
                var uriParts = hashParts[0].split("?");
                var uriPart = "";
                var delimiter = "";
                if (uriParts.length === 2) {
                    uriPart = uriParts[1];
                }
                if (uriPart) {
                    delimiter = "&";
                }
                uriPart = uriPart + delimiter + "roistat_visit=" + roistat.getVisit();
                uriParts[1] = uriPart;
                hashParts[0] = uriParts.join("?");
                return hashParts.join("#");
            };
            if (node.tagName.toLowerCase() !== 'a') {
                return;
            }
            var href = node.getAttribute('href');
            var result = false;
            if (isValidUrl(href)) {
                var newHref = addRoistatVisitToUrl(href);
                _debug("update url " + href + " > " + newHref);
                node.setAttribute('href', newHref);
                result = true;
            }
            return result;
        };

        var processNodes = function() {
            if (!isMultiDomainEnabled()) {
                _debug('disabled, skip');
                return;
            }
            var aNodes = document.getElementsByTagName('a');
            var nodeCount = aNodes.length;
            _debug('found ' + nodeCount + ' <a> nodes on page');
            var successCount = 0;
            for (var i = 0; i < nodeCount; i++) {
                var node = aNodes[i];
                if (updateNodeHref(node)) {
                    successCount++;
                }
            }
            _debug('replaced ' + successCount + ' nodes');
        };

        var init = function () {
            _debug('init');

            if (isRoistatMultiWidgetOnly()) {
                _debug('Shut down because only online chat need to be inited');
                return;
            }

            processNodes();
            setTimeout(function() {
                processNodes();
            }, 300);
            setTimeout(function() {
                processNodes();
            }, 5000);
            setTimeout(function() {
                processNodes();
            }, 15000);
        };
        addVisitProcessedCallback(init);
        addSPAPageChangedCallback(init);
    })();

    (function settingsUpdater() {
        var SETTINGS_UPDATE_TRY_INTERVAL = 60*1000; // ms
        var SETTINGS_UPDATE_INTERVAL     = 2*60*1000; // ms

        /**
         * @param {string} message
         */
        var _debug = function(message) {
            debug("SettingsUpdater: " + message);
        };
        /**
         * @returns {Number}
         */
        var _saveLastUpdateTime = function() {
            storage.set(SETTINGS_UPDATE_TIME_KEY, currentTime());
        };
        /**
         * @returns {Boolean}
         */
        var _isFirstUpdate = function() {
            var _lastUpdateTime = getLastUpdateTime();
            var _result = !(_lastUpdateTime > 0);
            _debug("is first update check: lastUpdateTime=" + _lastUpdateTime + ", result=" + (_result ? 1 : 0));
            return _result;
        };
        /**
         * @returns {Boolean}
         */
        var _isUpdateExpired = function() {
            var _minTime = currentTime() - SETTINGS_UPDATE_INTERVAL;
            var _lastUpdateTime = getLastUpdateTime();
            var _result = _lastUpdateTime <= _minTime;
            _debug("expiration check: _minTime=" + _minTime + ", lastUpdateTime=" + _lastUpdateTime + ", result=" + (_result ? 1 : 0));
            return _result;
        };

        /**
         * @returns {Boolean}
         */

        var _requestNewSettings = function(isForceUpdate) {
            var visitId = roistatGetCookie(ROISTAT_VISIT_COOKIE);
            requestNewSettings(visitId, isForceUpdate);
        };
        /**
         * @param {Object} settings
         * @param {Object} [settings.calltracking]
         * @param {Object} [settings.emailtracking]
         * @param {Object} [settings.geo]
         * @param {Object} [settings.js_settings]
         * @param {Object} [settings.leadhunter_templates]
         * @param {Object} [settings.multiwidget]
         * @param {Object} [settings.multiwidget_templates]
         * @param {Object} [settings.online_chat]
         * @param {Object} [settings.online_chat_templates]
         * @param {Array} [settings.proxy_forms]
         * @param {Object} [settings.promo_code]
         * @param {Object} [settings.links_markup]
         */
        var _updateSettings = function(settings) {
            _debug("update settings and save last update time");
            var hasLeadHunterTargetPagesMap = storage.getObject(LEAD_HUNTER_TARGET_PAGES_MAP) !== null;

            if (hasLeadHunterTargetPagesMap) {
                var newLeadHunterTargetPagesMap = tryParseJson(settings.js_settings.leadHunterTargetPagesMap);
                if (newLeadHunterTargetPagesMap !== null) {
                    storage.setObject(LEAD_HUNTER_TARGET_PAGES_MAP, newLeadHunterTargetPagesMap);
                }
            }

            window.roistatCalltrackingUpdateSettings(settings.calltracking);
            window.roistatEmailtrackingUpdateSettings(settings.emailtracking);
            window.roistatSaveLeadHunterTemplates(settings.leadhunter_templates.form_template, settings.leadhunter_templates.pulsator_template, settings.leadhunter_templates.pulsator_settings);
            window.roistatSaveMultiwidgetTemplate(settings.multiwidget_templates.pulsator_template, settings.multiwidget.pulsator_settings);
            window.roistatSaveOnlineChatTemplate(settings.online_chat_templates.pulsator_template, settings.online_chat_templates.iframe_template);
            window.roistatSaveProxyFormSettings(settings.proxy_forms);
            saveJsSettings(settings.js_settings);
            saveMultiwidgetSettings(settings.multiwidget.multiwidget_settings);
            saveOnlineChatSettings(settings.online_chat);
            saveGeoSettings(settings.geo);
            savePromoCodeSettings(settings.promo_code);
            saveLinksMarkupSettings(settings.links_markup);

            state.isSettingsUpdating = false;
            _saveLastUpdateTime();
        };

        var _init = function() {
            _debug("init");
            if (_isFirstUpdate()) {
                _debug("in first update we just start first timer and skip");
                _saveLastUpdateTime();
                return;
            }

            if (!_isUpdateExpired()) {
                _debug("update is not not expired, skip");
                return;
            }

            _debug("start to update settings");
            _requestNewSettings();
        };

        addVisitProcessedCallback(function() {
            window.roistatUpdateSettings = _updateSettings;
            setTimeout(function() {
                _init();
            }, 3000);

            _debug("set interval to update settings");
            setInterval(function () {
                _init();
            }, SETTINGS_UPDATE_TRY_INTERVAL);
        });
    })();

    (function goals(window, document, undefined) {

        var callbacks = {};

        /**
         * @param {String|Number} value
         * @returns {string}
         */
        var encodeForUrl = function(value) {
            var tempEncodeURIComponent = encodeURIComponent ? encodeURIComponent : encodeURI;
            return tempEncodeURIComponent(value);
        };

        /**
         * @param {String} [params.name]
         * @param {String} [params.phone]
         * @param {String} [params.email]
         * @param {Number} [params.price]
         * @param {String} [params.text]
         * @param {Object} [params.fields]
         */
        var reachGoal = function(params, afterReachCallback) {
            debug("Reach goal start");
            if (!params) {
                params = {};
            }
            var request = {
                leadName: "",
                formTitle: "",
                name: "",
                phone: "",
                email: "",
                price: "",
                text: "",
                fields: "",
                client_fields: "",
                is_need_callback: "",
                callback_phone: "",
                visit: getVisitIdForLeadCreation(),
                is_skip_sending: 0,
                items: "",
                placeholders_data: '',
                engine_type: ''
            };
            for (var requestParam in request) {
                if (!Object.prototype.hasOwnProperty.call(request, requestParam)) {
                    continue;
                }
                if (!Object.prototype.hasOwnProperty.call(params, requestParam)) {
                    continue;
                }
                if (!params[requestParam]) {
                    continue;
                }
                if (requestParam === 'fields' || requestParam === 'client_fields' || requestParam === 'items' || requestParam === 'placeholders_data') {
                    params[requestParam] = JSON.stringify(params[requestParam]);
                }
                request[requestParam] = encodeForUrl(params[requestParam]);
            }

            var project = getProjectForUrl();
            var apiUrl = protocol() + "//"+ROISTAT_HOST+"/api/site/"+API_VERSION_NEW+"/"+project+"/reach-goal?v=2";
            for (var key in request) {
                if (!Object.prototype.hasOwnProperty.call(request, key)) {
                    continue;
                }
                apiUrl = apiUrl +  "&" + key + "=" + request[key];
            }
            if (afterReachCallback !== undefined) {
                var callbackKey = Math.random().toString();
                callbacks[callbackKey] = afterReachCallback;
                apiUrl += "&callback_key=" + callbackKey;
            }
            sendApiRequestJSONP(apiUrl, null, afterReachCallback);
            debug("Reach goal completed");
        };

        var roistatGoal = window.roistatGoal = {
            /**
             * @param {String} [params.name]
             * @param {String} [params.phone]
             * @param {String} [params.email]
             * @param {Number} [params.price]
             * @param {String} [params.text]
             */
            reach: function(params, afterReachCallback) {
                reachGoal(params, afterReachCallback);
            },
            callAfterReachCallback: function(key) {
                if (Object.prototype.hasOwnProperty.call(callbacks, key)) {
                    callbacks[key]();
                    delete callbacks[key];
                }
            }
        };
    })(window, document, undefined);

    (function events(window, document, undefined) {
        var serializeData = function(data) {
            if (data instanceof Array || data === null || typeof data !== 'object') {
                debug('Invalid event data');
                return '';
            }
            return serializeObjectRecursive(data);
        };

        var serializeObjectRecursive = function(data, recursionDepth, properties) {
            var currentRecursionDepth = recursionDepth || 0;
            var currentProperties = properties || [];
            if (currentRecursionDepth > 20) {
                debug('Recursion depth exceeded when processing additional event fields');
                return '';
            }
            currentRecursionDepth++;
            var result = [];
            for (var property in data) {
                if (Object.prototype.hasOwnProperty.call(data, property)) {
                    var value = data[property];
                    if (typeof value === 'string' || typeof value === 'number') {
                        var prefix = currentProperties.length > 0 ? '[' + currentProperties.join('][') + ']' : '';
                        result.push('&data' + prefix + '[' + encodeURIComponent(property) + ']=' + encodeURIComponent(value));
                    } else if (typeof value === 'object') {
                        currentProperties.push(encodeURIComponent(property));
                        result.push(serializeObjectRecursive(value, currentRecursionDepth, currentProperties));
                        currentProperties.pop();
                    } else {
                        debug('Event data property ignored: ' + property);
                    }
                }
            }
            return result.length > 0 ? result.join('') : '';
        }

        var sendEvent = function(name, data) {
            debug("Send event start");
            var visitId = getRoistatVisitId();
            var serializedData = serializeData(data);
            var url = getApiBaseUrl() + "/event/register?visit=" + visitId + "&event=" + name + serializedData;
            sendApiRequestJSONP(url);
            debug("Send event completed");
        };

        window.roistat.event = {
            /**
             * @param {String} name
             * @param {Object} [data]
             */
            send: function(name, data) {
                sendEvent(name, data);
            }
        };
    })(window, document, undefined);

    (function visitApprove(window, document, undefined) {
        if (isRoistatMultiWidgetOnly()) {
            debug('VisitApprove: Shut down because only online chat need to be inited')
            return;
        }

        var timeout = window.roistatIsInitVisit === true ? 20000 : 10000;
        var startTime = (new Date()).getTime();
        var _key = function(visitId) {
            return 'approve_visit_' + visitId;
        };
        var _saveApprove = function(visitId) {
            tempStorage.set(_key(visitId), 1);
        };
        var _isApproved = function(visitId) {
            return tempStorage.get(_key(visitId)) > 0;
        };

        var addListener, removeListener, movements = [];
        if (document.addEventListener) {
            addListener = function (el, evt, f) { return el.addEventListener(evt, f, false); };
            removeListener = function (el, evt, f) { return el.removeEventListener(evt, f, false); };
        } else {
            addListener = function (el, evt, f) { return el.attachEvent('on' + evt, f); };
            removeListener = function (el, evt, f) { return el.detachEvent('on' + evt, f); };
        }

        var mouseMoveListener = function (event) {
            if (movements.length > 30) {
                return;
            }
            event = event || window.event;
            if (!event || !event.screenX) {
                return;
            }
            var currentTime = (new Date()).getTime();
            var pause, prevMove = null;
            if (movements.length > 0) {
                prevMove = movements[movements.length-1];
            }
            if (prevMove) {
                pause = currentTime - prevMove.time;
            } else {
                pause = currentTime - startTime;
            }
            if (pause < 300) {
                return;
            }
            pause = pause - 300;

            var distance = 0;
            var x = event.screenX;
            var y = event.screenY;
            if (prevMove) {
                distance = parseInt(Math.sqrt(Math.pow(prevMove.y - y, 2) + Math.pow(prevMove.x - x, 2)));
            }

            var move = {
                time: currentTime,
                pauseBeforeMove: pause,
                x: x,
                y: y,
                distance: distance
            };
            movements.push(move);
        };

        var generateMoveData = function() {
            var result = [];
            arrayIterate(movements, function (move) {
                var moveData = [move.pauseBeforeMove, move.distance];
                result.push(moveData.join(':'));
            });
            if (result.length === 0) {
                result.push('0:0');
            }
            return result.join('|');
        };

        var isYandexMetrikaExists = function() {
            for (var key in window) {
                if (inString(key, 'yaCounter')) {
                    return true;
                }
            }
            return false;
        };

        var _approveVisit = function() {
            removeListener(document, 'mousemove', mouseMoveListener);
            var visitId = getRoistatVisitId();
            debug('VisitApprove: start for visit ' + visitId);
            if (_isApproved(visitId)) {
                debug('VisitApprove: visit already approved, skip');
                return;
            }
            _saveApprove(visitId);
            setCookieAdditionalParameters();
            var url = getApiBaseUrl() + '/approve?v=' + SCRIPT_VERSION + '&visit=' + visitId;
            if (isNeedSendCookiesWithApproveVisit()) {
                url += '&hash=' + getVisitHash()
            }
            if (isNeedSendPageParamsWithApproveVisit()) {
                url += '&page_params=' + encodeURIComponent(JSON.stringify(window.roistat.page.params));
                updatePageParamsInState();
            }
            url += '&mv=' + generateMoveData();
            url += '&pl=' + (window.navigator ? window.navigator.platform : '');
            url += '&ym=' + (isYandexMetrikaExists() ? '1' : '0');
            url += '&wd=' + (window.navigator ? (window.navigator.webdriver === true ? '1' : '0') : '0');
            sendApiRequestJSONP(url);
        };

        /**
         * @returns {Boolean}
         */
        var isNeedSendCookiesWithApproveVisit = function () {
            var oldCookies     = state.cookies,
                currentCookies = getParsedCookies();
            var additionalCookies = additionalCookieList();
            for (var i = 0; i < additionalCookies.length; i++) {
                var additionalCookieName         = additionalCookies[i];
                var oldAdditionalCookieValue     = Object.prototype.hasOwnProperty.call(oldCookies, additionalCookieName) ? oldCookies[additionalCookieName] : undefined;
                var currentAdditionalCookieValue = Object.prototype.hasOwnProperty.call(currentCookies, additionalCookieName) ? currentCookies[additionalCookieName] : undefined;

                var isCurrentAdditionalCookieValueNotEmpty = typeof currentAdditionalCookieValue === 'string' && currentAdditionalCookieValue.length > 0;
                if (isCurrentAdditionalCookieValueNotEmpty && oldAdditionalCookieValue !== currentAdditionalCookieValue) {
                    return true;
                }
            }
            return false;
        };

        /**
         * @returns {Boolean}
         */
        var isNeedSendPageParamsWithApproveVisit = function () {
            var oldPageParams     = state.pageParams,
                currentPageParams = window.roistat.page.params;

            for (var i = 0; i < ADDITIONAL_PAGE_PARAM_LIST.length; i++) {
                var additionalPageParamName     = ADDITIONAL_PAGE_PARAM_LIST[i];
                var oldAdditionalPageParamValue = Object.prototype.hasOwnProperty.call(oldPageParams, additionalPageParamName)
                    ? oldPageParams[additionalPageParamName]
                    : null;
                var currentAdditionalPageParamValue = Object.prototype.hasOwnProperty.call(currentPageParams, additionalPageParamName)
                    ? currentPageParams[additionalPageParamName]
                    : null;
                if (currentAdditionalPageParamValue !== oldAdditionalPageParamValue) {
                    return true;
                }
            }
            return false;
        };

        setTimeout(function() {
            _approveVisit();
        }, timeout);

        addListener(document, 'mousemove', mouseMoveListener);
    })(window, document, undefined);

    (function abTesting(window, document, undefined){
        /**
         * @return {boolean}
         */
        var isDemoTest = function(){
            return getUrlParamValue('roistat_ab_demo') === "1";
        };

        /**
         * @param {String} str
         * @return {RegExp}
         */
        var _prepareRegExp = function(str) {
            return new RegExp(str.split('.').join('\\.').split('*').join('.*').split('?').join('.'));
        };

        /**
         * @param {Object} test
         * @param {String} test.value
         * @param {String} test.type
         * @param {String} test.filter
         * @param {String} test.filterValue
         */
        var isTestAppliable = function(test) {
            var href = window.location.href,
                testFilterType = test.filter,
                pagesList = test.filterValue;
            var targetPages;

            switch (testFilterType) {
                case 'except':
                case 'pages':
                    var pageReg,
                        cleanHref,
                        isPageListed = false;
                    cleanHref = href ? extractHostAndPath(href) : '';
                    targetPages = pagesList ? pagesList.split("\n") : [];
                    if (cleanHref && targetPages.length !== 0) {
                        for (var i = 0; i < targetPages.length; i++) {
                            var page = targetPages[i].trim();
                            if (page.length === 0) {
                                continue;
                            }
                            pageReg = _prepareRegExp(page);
                            if (pageReg.test(cleanHref)) {
                                isPageListed = true;
                                break;
                            }
                        }
                    }
                    return (testFilterType === 'pages') ? isPageListed : !isPageListed;
                    break;
                case 'all':
                default:
                    return true;
            }
        };

        /**
         * @param {Object} test
         * @param {int}    test.id
         * @param {String} test.value
         * @param {String} test.type
         * @param {String} test.filter
         * @param {String} test.filterValue
         */
        var applyCssTest = function(test){
            var h = document.getElementsByTagName("head")[0],
                e;
            e = document.createElement("style");
            e.setAttribute("type", "text/css");
            if (e.styleSheet) {
                e.styleSheet.cssText = test.value;
            } else {
                e.innerText = test.value;
            }
            h.appendChild(e);

            debug('Applied css-test: ' + test.id);
        };

        /**
         * @param {object} test
         */
        var applyUniformTest = function (test) {
            if (Object.prototype.hasOwnProperty.call(callbacks.onAbTestsApplied, test.id)) {
                callbacks.onAbTestsApplied[test.id](test.value);
            }

            debug('Applied uniform-test: ' + test.id);
        }

        /**
         * @param {Object} test
         * @param {int}    test.id
         * @param {String} test.value
         * @param {String} test.type
         * @param {String} test.filter
         * @param {String} test.filterValue
         */
        var applyTest = function(test){
            if (isTestAppliable(test)) {
                switch (test.type) {
                    case 'css':
                        applyCssTest(test);
                        break;
                    case 'uniform':
                        applyUniformTest(test);
                        break;
                }
            }
        };

        window.applyTests = function(){
            debug('Start applying ab tests');
            var tests = storage.getObject('abTesting');
            var testKey, test;
            for (testKey in tests) {
                if (!Object.prototype.hasOwnProperty.call(tests, testKey)) {
                    continue;
                }
                test = tests[testKey];
                applyTest(test);
            }

            state.isAbTestsApplied = true;
            debug('End applying ab tests');

            if (window.onRoistatAbTestsApplied !== undefined && typeof window.onRoistatAbTestsApplied === 'function') {
                window.onRoistatAbTestsApplied();
            }
        };

        var applyDemoTest = function(){
            debug('Call: apply demo AB test');
            var abTestDemo = getUrlParamValue('roistat_ab_data');
            var testValue;

            if (abTestDemo === null) {
                return;
            } else {
                testValue = JSON.parse(Base64.decode(abTestDemo));
            }

            if (typeof testValue !== 'object') {
                debug('Error: testValue is not an object.');
                return;
            }
            applyTest(testValue);
        };

        function init(){
            if (isRoistatMultiWidgetOnly()) {
                debug('ABTest: Shut down because only online chat need to be inited');
                return;
            }

            var isDemoTestApplied = isDemoTest();
            if (!isNewVisit && !isDemoTestApplied) {
                applyTests();
            }
            if (isDemoTestApplied) {
                applyDemoTest();
            }
        }

        init();
    })(window, document, undefined);

    /*(function visitStreamOld(window, document, undefined) {
        var getTimeStamp = function() {
            return new Date().getTime();
        };
        var sendVisitStream = function(visitId) {
            if (window.roistatVisitStreamComplete) {
                return;
            }
            var referrer = encodeURIComponent(document.referrer);
            var currentPhone = roistatGetCookie(ROISTAT_PHONE_COOKIE);
            if (currentPhone) {
                currentPhone = encodeURIComponent(currentPhone);
            } else {
                currentPhone = "";
            }
            var url = getApiBaseUrl() + "/stream?t=" + getTimeStamp() + "&visit=" + visitId + "&referrer=" + referrer + "&phone=" + currentPhone + "&" + getVisitHashParamName() + "=" + getVisitHash();
            sendApiRequestJSONP(url);
            window.roistatVisitStreamComplete = true;
        };
        var visitId;
        if (window.roistatIsInitVisit) {
            visitId = window.roistatVisitId;
            sendVisitStream(visitId);
        } else {
            addVisitProcessedCallback(function() {
                visitId = getRoistatVisitId();
                sendVisitStream(visitId);
            });
            setTimeout(function() {
                visitId = getRoistatVisitId();
                sendVisitStream(visitId);
            }, 1000);
        }

    })(window, document, undefined);*/

    (function visitStream(window, document, undefined) {
        if (storage.get(ROISTAT_IS_NEED_DISABLE_COLLECTOR) > 0) {
            debug('visitStream: disabled by settings')
            return;
        }

        if (isRoistatMultiWidgetOnly()) {
            debug('visitStream: Shut down because only online chat need to be inited')
            return;
        }

        if (!COLLECTOR_HOST) {
            return;
        }
        setTimeout(function () {
            (function (w, d, s, u, n, id, h) {
                w[n] = {COUNTER_ID: id, HOST: h};
                var p = d.location.protocol == "https:" ? "https://" : "http://";
                var js = d.createElement(s);
                js.async = 1;
                js.src = p + h + u;
                var js2 = d.getElementsByTagName(s)[0];
                js2.parentNode.insertBefore(js, js2);
            })(window, document, "script", "/counter.js", "datamap", getProjectForUrl(), COLLECTOR_HOST);
        }, 1000);
    })(window, document, undefined);

    (function yandexMetrika(window, document, undefined) {
        var setCounterId = function() {
            var counterId = window.roistatMetrikaCounterId;
            if (counterId) {
                storage.set(METRIKA_COUNTER_ID_COOKIE, counterId);
            }
        };

        var sendVisitParam = function(counterId) {
            var counterName = 'yaCounter' + counterId;
            var timeout = 100,
                totalTimeout = 0,
                timeoutLimit = 60000;

            var initMetrikaParams = function() {
                totalTimeout += timeout;
                debug("YandexMetrika: trying to access counter " + counterId);
                if (window[counterName] === undefined) {
                    if (totalTimeout < timeoutLimit) {
                        setTimeout(initMetrikaParams, timeout);
                        timeout *= 2;
                    }
                    return;
                }

                var yp = {};
                yp[METRIKA_VISIT_ID_PARAM_NAME] = getRoistatVisitId();
                window[counterName].params(yp);
                debug("YandexMetrika: visit id " + yp[METRIKA_VISIT_ID_PARAM_NAME] + " sent to counter " + counterId);
            };

            setTimeout(initMetrikaParams, timeout);
        };

        addVisitProcessedCallback(function() {
            setCounterId();
            var counterIdData = storage.get(METRIKA_COUNTER_ID_COOKIE);
            if (!counterIdData) {
                debug("YandexMetrika: counter id not found");
                return;
            }
            var counterIds = String(counterIdData).split(',');
            debug("YandexMetrika: counters: " + counterIds);
            for (var i = 0; i < counterIds.length; i++) {
                if (counterIds[i].trim() === '') {
                    continue;
                }
                sendVisitParam(counterIds[i]);
            }
        });
    })(window, document, undefined);

    (function proxyForms(window, document) {
        /**
         * @param {String} message
         */
        var debugProxyForms = function(message) {
            debug("Proxy Forms: " + message);
        };

        var processSettings = function() {
            if (window.roistat.proxyForms.loaded && window.roistat.proxyForms.settings.length > 0) {
                debugProxyForms("save loaded settings");
                saveSettings(window.roistat.proxyForms.settings);
            } else {
                debugProxyForms("settings not loaded, getting from storage");
                window.roistat.proxyForms.settings = storage.getObject(ROISTAT_PROXY_FORMS) || [];
            }
        };

        var saveSettings = function(settings) {
            storage.setObject(ROISTAT_PROXY_FORMS, settings);
        };

        var initHandlers = function() {
            debugProxyForms('init form listener');
            addFormsListener(window.roistat.proxyForms.settings);
            addButtonsListener(window.roistat.proxyForms.settings);
        };

        var isProxyFormHostsSettingsValid = function(proxyFormSettings) {
            return proxyFormSettings.hasOwnProperty('hosts')
                && proxyFormSettings.hasOwnProperty('is_excluding_hosts')
                && isArray(proxyFormSettings.hosts)
                && proxyFormSettings.hosts.length > 0
        }

        var isProxyFormSettingsFitCurrentHost = function(proxyFormSettings) {
            if (!isProxyFormHostsSettingsValid(proxyFormSettings)) {
                return true;
            }

            var isCurrentHostSpecifiedInSettings = isValueInArray(proxyFormSettings.hosts, getDomainFromUrl(window.location.host));
            var isExcludingHosts = Boolean(proxyFormSettings.is_excluding_hosts);

            return isExcludingHosts ? !isCurrentHostSpecifiedInSettings : isCurrentHostSpecifiedInSettings;
        }

        var getProxyFormsSettingsForCurrentHost = function(proxyFormsSettings) {
            var proxyFormsSettingsForCurrentHost = [];
            arrayIterate(proxyFormsSettings, function (proxyFormSettings) {
                if (isProxyFormSettingsFitCurrentHost(proxyFormSettings)) {
                    proxyFormsSettingsForCurrentHost.push(proxyFormSettings);
                }
            });

            return proxyFormsSettingsForCurrentHost;
        }

        var addButtonsListener = function(settings) {
            var buttonSettings = [];
            arrayIterate(settings, function (setting) {
                if (setting.type === "js-button") {
                    buttonSettings.push(setting);
                }
            });

            if (buttonSettings.length < 1) {
                debugProxyForms('no button settings');
                return;
            }

            var listener;
            if (document.addEventListener) {
                listener = function(event) {
                    getListener(buttonSettings, event, event.target, sendButtonLead);
                };
                document.addEventListener('click', listener, true);
            } else if (document.attachEvent) {
                listener = function() {
                    var event = window.event;
                    getListener(buttonSettings, event, event.srcElement, sendButtonLead, true);
                };
                document.attachEvent('onclick', listener);
            } else {
                debugProxyForms("Listener could not be attached");
            }

        };

        var addFormsListener = function(settings) {
            var formSettings = [];
            arrayIterate(settings, function(setting) {
                if (setting.type === "form") {
                    formSettings.push(setting);
                }
            });

            if (formSettings.length < 1) {
                debugProxyForms('no form settings');
                return;
            }

            if (document.addEventListener) {
                var listener = function(event) {
                    getListener(formSettings, event, event.target, sendFormLead);
                };

                document.addEventListener('submit', listener, true);
            } else if (document.attachEvent) {
                setInterval(function() {
                    formSettings = getProxyFormsSettingsForCurrentHost(formSettings);

                    var forms = document.getElementsByTagName("form");
                    arrayIterate(forms, function(form) {
                        if (form.getAttribute('data-roistat-proxy-form-checked') === 'true') {
                            return;
                        }

                        form.setAttribute('data-roistat-proxy-form-checked', 'true');

                        arrayIterate(formSettings, function(setting) {
                            if (matchesSelector(form, setting.selector)) { // incompatible with CSS3 selectors
                                form.attachEvent('onsubmit', function() {
                                    window.event.returnValue = false;
                                    sendFormLead(setting, window.event.srcElement);
                                });
                            }
                        });
                    });
                }, 2000);
            } else {
                debugProxyForms("Listener could not be attached");
            }
        };

        var getListener = function(settings, event, target, sender, isIEPreventDefault) {
            var proxyFormsSettings = getProxyFormsSettingsForCurrentHost(settings);
            var matchingSetting = null;

            arrayIterate(proxyFormsSettings, function(setting) {
                if (matchesSelector(target, setting.selector)) {
                    matchingSetting = setting;
                }
            });

            if (matchingSetting === null) {
                debugProxyForms('No matched settings found for listener');
                return;
            }
            sender(event, matchingSetting, target, isIEPreventDefault);
        };

        var sendFormLead = function(event, matchingSetting, form, isIEPreventDefault) {
            var leadFields = getLeadFields(form, matchingSetting);
            if (!isValid(leadFields, matchingSetting)) {
                return;
            }

            isIEPreventDefault
                ? event.returnValue = false
                : event.preventDefault();
            sendLead(leadFields, matchingSetting, function() {
                // form.submit might be overridden or deleted, therefore using prototype method
                HTMLFormElement.prototype.submit.call(form);
            });
        };

        var sendButtonLead = function(event, matchingSetting) {
            var leadFields = getLeadFields(null, matchingSetting);
            if (!isValid(leadFields, matchingSetting)) {
                return;
            }
            sendLead(leadFields, matchingSetting);
        };

        var sendLead = function(leadFields, settings, callback) {
            var params = {};
            var hasCrmIsEnabledProperty = isFieldValueFilled(settings.crm) && settings.crm.hasOwnProperty('is_enabled');
            var isCrmEnabled = hasCrmIsEnabledProperty ? settings.crm.is_enabled : true;

            params.leadName          = settings.hasOwnProperty('lead_name') ? settings.lead_name : 'Новый лид с формы ' + settings.title;
            params.formTitle         = settings.title;
            params.name              = leadFields.name;
            params.phone             = leadFields.phone;
            params.email             = leadFields.email;
            params.text              = leadFields.comment;
            params.fields            = leadFields.fields;
            params.placeholders_data = leadFields.placeholdersData;
            params.is_need_callback  = settings.is_need_callback > 0 ? 1 : 0;
            params.is_skip_sending   = !isCrmEnabled;

            window.roistatGoal.reach(params, callback);
        };

        var isFieldValueFilled = function (value) {
            return (typeof value === 'number' && !isNaN(value)) ||
                (typeof value === 'string' && value !== '') ||
                (typeof value === 'object' && value !== null) ||
                (typeof value === 'boolean' && value) ||
                isArray(value);
        };

        var isValid = function (fields, settings) {
            var requiredFields = [], defaultFields = ['name', 'email', 'phone', 'comment'];
            arrayIterate(defaultFields, function(field) {
                if (settings.hasOwnProperty(field) && settings[field].required > 0) {
                    requiredFields.push(field);
                }
            });
            if (isArray(settings.fields)) {
                arrayIterate(settings.fields, function(field) {
                    if (field.required > 0) {
                        requiredFields.push(field);
                    }
                });
            }

            var isFieldsValid = true;
            arrayIterate(requiredFields, function(field) {
                if (!fields.hasOwnProperty(field) || !isFieldValueFilled(fields[field])) {
                    isFieldsValid = false;
                }
            });

            return isFieldsValid;
        };

        var getLeadFields = function(form, settings) {
            var result = {};

            result.name             = settings.name ? getFieldValue(form, settings.name.value, settings.name.type) : "";
            result.phone            = settings.phone ? getFieldValue(form, settings.phone.value, settings.phone.type) : "";
            result.email            = settings.email ? getFieldValue(form, settings.email.value, settings.email.type) : "";
            result.comment          = settings.comment ? getFieldValue(form, settings.comment.value, settings.comment.type) : "";
            result.fields           = {};
            result.placeholdersData = {
                orderPage: initUrl
            };

            if (isArray(settings.fields)) {
                arrayIterate(settings.fields, function(field) {
                    result.fields[field.name] = getFieldValue(form, field.value, field.type);
                });
            }

            return result;
        };

        var getFieldValue = function(form, settingValue, type) {
            switch (type) {
                case 'plain':
                    return settingValue || "";
                case 'input':
                    var inputElement = form.querySelector('input[name="' + settingValue + '"]');
                    return inputElement ? inputElement.value : "";
                case 'js':
                    try {
                        return (new Function(settingValue))();
                    } catch (e) {
                        return "";
                    }
            }
        };

        var init = function() {
            debugProxyForms("init");

            if (isRoistatMultiWidgetOnly()) {
                debugProxyForms("Shut down because only online chat need to be inited");
                return;
            }

            if (!window.roistat.proxyForms.enabled) {
                debugProxyForms("disabled");
                return;
            }
            processSettings();
            initHandlers();
        };

        var matchesSelector = function(element, selector) {
            if (typeof Element !== "undefined" && Element.prototype.matches) {
                var isMatches = element.matches(selector);

                if (!isMatches) {
                    return element.closest(selector) ? element.closest(selector).matches(selector) : false;
                }

                return isMatches;
            } else if (typeof Element !== "undefined" && Element.prototype.matchesSelector) {
                var isMatchesSelector = element.matchesSelector(selector);

                if (!isMatchesSelector) {
                    return element.closest(selector) ? element.closest(selector).matches(selector) : false;
                }

                return isMatchesSelector;
            } else if (document.querySelectorAll) {
                var matches = document.querySelectorAll(selector);
                for (var i = 0; i < matches.length; i++) {
                    if (matches[i] === element) {
                        return true;
                    }
                }

                return false;
            }

            return false;
        };

        addVisitProcessedCallback(init);
        window.roistatSaveProxyFormSettings = saveSettings;
    })(window, document);

    (function onRoistatAllModulesLoadingComplete(){
        if (window.onRoistatAllModulesLoaded !== undefined && typeof window.onRoistatAllModulesLoaded === 'function') {
            debug('onRoistatAllModulesLoaded: call');
            window.onRoistatAllModulesLoaded();
        }
    })();

    (function requestListen(window, document, undefined){
        var isListenerEnabled = function() {
            return storage.get(ROISTAT_LISTEN_REQUESTS_COOKIE) * 1 > 0;
        };

        var scopeDebug = function(message) {
            debug('Request listener: ' + message);
        };

        var PHONE_REGEXP = /^(8|7|380|45|370|375|1|48|357|44|373|371|49|971|996|995|972|420|33|90|34|55|61|52|60|374|43|41|351)?(\d){9,13}$/g;
        var EMAIL_REGEXP = /^[^\s]+[@][^\s]+$/g;
        var EXCLUDE_DOMAINS = [
            'mc.yandex.ru',
        ];

        var startListeningRequests = function startListeningRequests() {
            scopeDebug('listen');

            // XMLHttpRequest
            if (window.XMLHttpRequest) {
                // cache old XMLHttpRequest.send
                XMLHttpRequest.prototype.oldSend = XMLHttpRequest.prototype.send;

                function newSend(data) {
                    var self = this;
                    collectData(self.responseURL, data, function() {
                        self.oldSend(data);
                    });
                }

                // override XMLHttpRequest.send
                XMLHttpRequest.prototype.send = newSend;
            }

            // ActiveXObject
            if (window.ActiveXObject) {
                var ActualActiveXObject = ActiveXObject;

                // generate new ActiveXObject
                function ActiveXObject(progid) {
                    var oldActiveXObject = new ActualActiveXObject(progid);
                    var newActiveXObject = {};

                    if (progid.toLowerCase() === "msxml2.xmlhttp") {
                        newActiveXObject = {
                            _ax: oldActiveXObject,
                            _status: "fake",
                            responseText: "",
                            responseXml: null,
                            readyState: 0,
                            status: 0,
                            statusText: 0,
                            onReadyStateChange: null
                        };

                        var cachedUrl = '';

                        newActiveXObject._onReadyStateChange = function () {
                            var self = newActiveXObject;

                            return function () {
                                self.readyState = self._ax.readyState;
                                if (self.readyState === 4) {
                                    self.responseText = self._ax.responseText;
                                    self.responseXml = self._ax.responseXml;
                                    self.status = self._ax.status;
                                    self.statusText = self._ax.statusText;
                                }
                                if (self.onReadyStateChange) self.onReadyStateChange();
                            }
                        }();

                        newActiveXObject.open = function (method, url, varAsync, user, password) {
                            cachedUrl = url;
                            varAsync = (varAsync !== false);
                            this._ax.onReadyStateChange = this._onReadyStateChange;
                            return this._ax.open(method, url, varAsync, user, password);
                        };

                        newActiveXObject.send = function (body) {
                            var self = this;
                            collectData(cachedUrl, body, function() {
                                this._ax.send(body);
                            });
                        };
                    } else {
                        newActiveXObject = oldActiveXObject;
                    }

                    return newActiveXObject;
                }

                // override ActiveXObject
                window.ActiveXObject = ActiveXObject;
            }

            // Fetch
            if (window.fetch) {
                var oldFetch = fetch;

                fetch = function (request, data) {
                    collectData(request.url, data || {});

                    return oldFetch(request, data || {});
                }
            }

            // Listen submit event
            window.addEventListener('submit', function (event) {
                var elements = event.target.elements;
                var data = {};
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    var name = element.getAttribute('name');

                    data[name] = element.value;
                }

                collectData('', data);
            });
        };

        function parseQueryString(url) {
            var params = {};

            if (typeof url !== 'string' || url.length === 0) {
                return params;
            }

            var urlAsArray = url.split('?');
            if (urlAsArray.length < 2) {
                return params;
            }

            var queryParams = urlAsArray[1];
            params = parseQueryParams(queryParams);
            return params;
        }

        function parseQueryParams(queryParams) {
            var queryParamsAsArray = queryParams.split('&'), params = {};
            for (var i = 0; i < queryParamsAsArray.length; i++) {
                var param = queryParamsAsArray[i].split('=');

                if (param.length < 2) {
                    continue;
                }

                params[param[0]] = param[1];
            }

            return params;
        }

        function getClientInfoFromData(data) {
            scopeDebug('data: ' + JSON.stringify(data));

            if (typeof data !== 'object' || data === null) {
                return {};
            }

            var fields = {
                email: ['email', 'Email', 'EMAIL', 'mail', 'MAIL', 'Mail'],
                phone: ['phone', 'Phone', 'PHONE', 'tel', 'Tel', 'TEL'],
                name: ['name', 'Name', 'NAME', 'full_name', 'Full_Name', 'FULL_NAME']
            };

            var newData = {
                email: '',
                phone: '',
                name: ''
            };

            for (var field in fields) {
                var possibleFields = fields[field];
                for (var k in possibleFields) {
                    if (possibleFields.hasOwnProperty(k)) {
                        if (data.hasOwnProperty(possibleFields[k])) {
                            newData[field] = data[possibleFields[k]];
                            break;
                        }
                    }
                }
            }
            scopeDebug('new data: ' + JSON.stringify(newData));

            var isPhoneEmpty = newData.phone.length === 0;
            var isEmailEmpty = newData.email.length === 0;

            if (!isPhoneEmpty && !isEmailEmpty) {
                return newData;
            }

            var emailRegexp = new RegExp(EMAIL_REGEXP);
            var phoneRegexp = new RegExp(PHONE_REGEXP);
            var keys = Object.keys(data);

            for (var i = 0; i < keys.length; i++) {
                var value = decodeURIComponent(String(data[keys[i]]));

                if (isEmailEmpty) {
                    var matchedEmails = value.match(emailRegexp);
                    if (matchedEmails && matchedEmails.length > 0) {
                        var oldEmail = newData.email;
                        newData.email = matchedEmails[0];
                        scopeDebug('parsing email, before: ' + oldEmail + ', after: ' + newData.email);
                    }
                }

                if (isPhoneEmpty) {
                    var phoneValue = value.replace(/[\s-.()+*_—:;'"`]/g, '');
                    var matchedPhones = phoneValue.match(phoneRegexp);
                    if (matchedPhones && matchedPhones.length > 0) {
                        var oldPhone = newData.phone;
                        newData.phone = value;
                        scopeDebug('parsing phone, before: ' + oldPhone + ', after: ' + newData.phone);
                    }
                }
            }

            return newData;
        }

        var isUrlProcessAllowed = function(url) {
            var domain = getDomainFromUrl(url);
            return !arrayContains(EXCLUDE_DOMAINS, domain);
        };

        // Data processing
        function collectData(url, body, afterCollectCallback) {
            if (typeof url === 'string' && url.length > 0 && !isUrlProcessAllowed(url)) {
                return;
            }

            var queryParams = parseQueryString(url);
            var localBody = body;

            if (typeof localBody === 'string') {
                localBody = parseQueryParams(localBody);
            }

            scopeDebug('data before parsing ' + JSON.stringify({get: queryParams, post: localBody}));
            var clientGetParams = getClientInfoFromData(queryParams);
            var clientPostParams = getClientInfoFromData(localBody);
            scopeDebug('data after parsing ' + JSON.stringify({get: clientGetParams, post: clientPostParams}));
            processingData(clientGetParams, clientPostParams, afterCollectCallback);
        }

        function processingData(getData, postData, afterProcessCallback) {
            var email = getData.email.length > 0 ? getData.email : postData.email;
            var phone = getData.phone.length > 0 ? getData.phone : postData.phone;
            var name = getData.name.length > 0 ? getData.name : postData.name;

            if (
                (typeof email !== 'string' || email.length === 0)
                && (typeof phone !== 'string' || phone.length === 0)
            ) {
                if (typeof afterProcessCallback === 'function') {
                    afterProcessCallback();
                }
                return;
            }

            if (typeof afterProcessCallback === 'function') {
                setTimeout(function () {
                    afterProcessCallback();
                }, 100);
            }

            var goal = {
                leadName: 'Автоматический лид с сайта',
                name: name,
                phone: phone,
                email: email,
                is_skip_sending: 1
            };
            scopeDebug('phone or email is not empty, reaching goal ' + JSON.stringify(goal));
            roistatGoal.reach(goal);
        }

        (function init() {
            if (!isListenerEnabled()) {
                scopeDebug('disabled, skip');
                return;
            }

            startListeningRequests();
        })();
    })(window, document, undefined);

    (function linksMarkup(window, document, undefined){
        var hasValidOzonId = false;
        var hasValidWildberriesId = false;
        var domains = [
            {
                url: 'ozon.ru',
                isValid: function () {
                    return isLinksMarkupExists() && hasValidOzonId;
                },
                tag: function () {
                    return isLinksMarkupExists() ? 'vendor_org_' + encodeURIComponent(window.roistat.linksMarkup.ozonId) : '';
                },
            },
            {
                url: 'wildberries.ru',
                isValid: function () {
                    return isLinksMarkupExists() && hasValidWildberriesId;
                },
                tag: function () {
                    return isLinksMarkupExists() ? encodeURIComponent(window.roistat.linksMarkup.wildberriesId) + '-id-my_ad_campaign' : '';
                },
            }
        ];

        /**
         * @param {String} message
         */
        var debugLinksMarkup = function(message) {
            debug("Links markup: " + message);
        };

        var isLinksMarkupExists = function () {
          return typeof window.roistat === 'object' && window.roistat !== null
              && typeof window.roistat.linksMarkup === 'object' && window.roistat.linksMarkup !== null;
        };

        var parsePageParams = function (queryString) {
            var params = {};
            var cleanString = queryString.charAt(0) === '?' ? queryString.slice(1) : queryString;

            cleanString.split('&').forEach(function (part) {
                var [key, value] = part.split('=').map(decodeURIComponentSafe);
                if (key.trim() === '' || value.trim() === '') {
                    return;
                }
                params[key] = value;
            });

            return params;
        }

        var getUrlTags = function () {
            var paramKeys = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_term', 'utm_content', 'roistat'];
            var urlTags = {};

            debugLinksMarkup('get url tags');
            var pageParams = parsePageParams(window.location.search);
            Object.keys(pageParams).forEach(function (key) {
                if (paramKeys.indexOf(key) !== -1) {
                    urlTags[key] = pageParams[key];
                }
            });

            return urlTags;
        }

        var getLinksByUrl = function () {
            var validRegExp = new RegExp(/^((https?:)?\/\/)?([A-ZА-ЯЁ0-9\_\-\~]+\.)+[A-ZА-ЯЁ0-9\_\-\~]+/i);
            var links = document.querySelectorAll('a');
            var linksByUrl = {};

            debugLinksMarkup('get integration links');
            links.forEach(function (linkElement) {
                var linkHref = linkElement.href;

                if (validRegExp.test(linkHref)) {
                    var linkDomain = getDomainFromUrl(linkHref);

                    domains.forEach(function (domain) {
                        if (domain.isValid() && linkDomain.indexOf(domain.url) === 0 && linkHref.indexOf(domain.tag()) === -1) {
                            if (typeof linksByUrl[domain.url] === 'undefined') {
                                linksByUrl[domain.url] = [];
                            }
                            linksByUrl[domain.url].push(linkElement);
                        }
                    });
                }
            });

            return linksByUrl;
        }

        var addTagsToLinks = function (linksByUrl, urlTags) {
            var utmCampaignTagKey = 'utm_campaign';
            debugLinksMarkup('remove utm_campaign from tags');
            delete urlTags[utmCampaignTagKey];

            var preparedTags = Object.keys(urlTags).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(urlTags[key]);
            }).join('&');
            if (preparedTags.length > 0) {
                preparedTags = '&' + preparedTags;
            }
            debugLinksMarkup('prepared tags for link without utm_campaign: ' + preparedTags);

            domains.forEach(function (domain) {
                if (typeof linksByUrl[domain.url] === 'undefined') {
                    return;
                }
                debugLinksMarkup('add tags for: ' + domain.url);
                var campaignTag = utmCampaignTagKey + '=' + domain.tag();
                var newUriParams = campaignTag + preparedTags;

                linksByUrl[domain.url].forEach(function (linkElement) {
                    var hashParts = linkElement.href.split('#');
                    var uriParts = hashParts[0].split('?');

                    uriParts[1] = uriParts.length === 2 && uriParts[1] !== ''
                        ? uriParts[1] + '&' + newUriParams
                        : newUriParams;
                    hashParts[0] = uriParts.join('?');
                    linkElement.href = hashParts.join('#');
                });
            });
        }

        var processLinksMarkup = function () {
            debugLinksMarkup('try to find tags and integration urls');
            var urlTags = getUrlTags();
            if (Object.keys(urlTags).length === 0) {
                debugLinksMarkup('no tags in url, skip');
                return;
            }
            var linksByUrl = getLinksByUrl();
            if (Object.keys(linksByUrl).length === 0) {
                debugLinksMarkup('no links found, skip');
                return;
            }
            addTagsToLinks(linksByUrl, urlTags);
            debugLinksMarkup('tags added, done');
        };

        var init = function () {
            debugLinksMarkup('init');

            var linksMarkupSettings = storage.getObject(ROISTAT_LINKS_MARKUP);
            if (linksMarkupSettings
                && linksMarkupSettings.hasOwnProperty('id_ozon')
                && linksMarkupSettings.hasOwnProperty('id_wildberries')
            ) {
                window.roistat.linksMarkup.ozonId = linksMarkupSettings.id_ozon;
                window.roistat.linksMarkup.wildberriesId = linksMarkupSettings.id_wildberries;
                debugLinksMarkup('set settings from storage');
            } else {
                debugLinksMarkup('disabled, skip.');
                return;
            }

            hasValidOzonId = typeof window.roistat.linksMarkup.ozonId === 'string'
                && window.roistat.linksMarkup.ozonId.trim() !== '';
            hasValidWildberriesId = typeof window.roistat.linksMarkup.wildberriesId === 'string'
                && window.roistat.linksMarkup.wildberriesId.trim() !== '';

            if (hasValidOzonId || hasValidWildberriesId) {
                processLinksMarkup();
                setTimeout(function() {
                    processLinksMarkup();
                }, 300);
                setTimeout(function() {
                    processLinksMarkup();
                }, 5000);
                setTimeout(function() {
                    processLinksMarkup();
                }, 15000);
            } else {
                debugLinksMarkup('settings are empty, skip.');
            }
        }

        addVisitProcessedCallback(init);
        addSPAPageChangedCallback(init);
    })(window, document, undefined);

})(window, document, undefined);
