(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.importHtml = {}));
}(this, (function (exports) { 'use strict';

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  var arrayWithHoles = _arrayWithHoles;

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  var iterableToArrayLimit = _iterableToArrayLimit;

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  var arrayLikeToArray = _arrayLikeToArray;

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }

  var unsupportedIterableToArray = _unsupportedIterableToArray;

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var nonIterableRest = _nonIterableRest;

  function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
  }

  var slicedToArray = _slicedToArray;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  /**
   * @author Kuitos
   * @homepage https://github.com/kuitos/
   * @since 2019-02-25
   * fork from https://github.com/systemjs/systemjs/blob/master/src/extras/global.js
   */

  var isIE11 = typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Trident') !== -1;
  function getInlineCode(match) {
    var start = match.indexOf('>') + 1;
    var end = match.lastIndexOf('<');
    return match.substring(start, end);
  }

  function isModuleScriptSupported() {
    var s = document.createElement('script');
    return 'noModule' in s;
  } // RIC and shim for browsers setTimeout() without it

  /**
  * @file some code  cp https://github.com/kuitos/
  * @author bigcui
  * 2020-10-12
  */
  var ALL_SCRIPT_REGEX = /(<script[\s\S]*?>)[\s\S]*?<\/script>/gi;
  var SCRIPT_TAG_REGEX = /<(script)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+((?!type=('|')text\/ng\x2Dtemplate\3)[\s\S])*?>[\s\S]*?<\/\1>/i;
  var SCRIPT_SRC_REGEX = /.*\ssrc=('|")?([^>'"\s]+)/;
  var SCRIPT_TYPE_REGEX = /.*\stype=('|")?([^>'"\s]+)/;
  var SCRIPT_ENTRY_REGEX = /.*\sentry\s*.*/;
  var SCRIPT_ASYNC_REGEX = /.*\sasync\s*.*/;
  var SCRIPT_NO_MODULE_REGEX = /.*\snomodule\s*.*/;
  var SCRIPT_MODULE_REGEX = /.*\stype=('|")?module('|")?\s*.*/;
  var LINK_TAG_REGEX = /<(link)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[\s\S]*?>/ig;
  var LINK_PRELOAD_OR_PREFETCH_REGEX = /\srel=('|")?(preload|prefetch)\1/;
  var LINK_HREF_REGEX = /.*\shref=('|")?([^>'"\s]+)/;
  var LINK_AS_FONT = /.*\sas=('|")?font\1.*/;
  var STYLE_TAG_REGEX = /<style[^>]*>[\s\S]*?<\/style>/gi;
  var STYLE_TYPE_REGEX = /\s+rel=('|")?stylesheet\1.*/;
  var STYLE_HREF_REGEX = /.*\shref=('|")?([^>'"\s]+)/;
  var HTML_COMMENT_REGEX = /<!--([\s\S]*?)-->/g;
  var LINK_IGNORE_REGEX = /<link([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[\s\S]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+)ignore([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[\s\S]*|=[\s\S]*)>/i;
  var STYLE_IGNORE_REGEX = /<style([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[\s\S]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+)ignore([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[\s\S]*|=[\s\S]*)>/i;
  var SCRIPT_IGNORE_REGEX = /<script([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[\s\S]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+)ignore([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[\s\S]*|=[\s\S]*)>/i;

  function hasProtocol(url) {
    return url.startsWith('//') || url.startsWith('http://') || url.startsWith('https://');
  }

  function getEntirePath(path, baseURI) {
    if (location.href.startsWith('file')) {
      return path;
    }

    return new URL(path, baseURI).toString();
  }

  function isValidJavaScriptType(type) {
    var handleTypes = ['text/javascript', 'module', 'application/javascript', 'text/ecmascript', 'application/ecmascript'];
    return !type || handleTypes.indexOf(type) !== -1;
  }

  var genLinkReplaceSymbol = function genLinkReplaceSymbol(linkHref) {
    var preloadOrPrefetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return '<!-- '.concat(preloadOrPrefetch ? 'prefetch/preload' : '', ' link ').concat(linkHref, ' replaced by import-html-entry -->');
  };
  var genIgnoreAssetReplaceSymbol = function genIgnoreAssetReplaceSymbol(url) {
    return '<!-- ignore asset '.concat(url || 'file', ' replaced by import-html-entry -->');
  };
  var genModuleScriptReplaceSymbol = function genModuleScriptReplaceSymbol(scriptSrc, moduleSupport) {
    return '<!-- '.concat(moduleSupport ? 'nomodule' : 'module', ' script ').concat(scriptSrc, ' ignored by import-html-entry -->');
  };
  function requestHtml(url) {
    var useragent = navigator.userAgent.includes('Android');

    if (useragent || !navigator.userAgent.includes('iPhone')) {
      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        var method = 'GET';
        request.open(method, url);
        request.send(null);

        request.onreadystatechange = function () {
          if (request.readyState == 4) {
            resolve(request.responseText);
          } else {
            reject('ajax error' + request.readyState + '-' + request.status);
          }
        };
      });
    } else {
      return new Promise(function (resolve, reject) {
        fetch(url).then(function (response) {
          return response.text();
        }).then(function (data) {
          resolve(data);
        })["catch"](function (e) {
          console.error('fetch', e);
        });
      });
    }
  }
  /**
   * parse the script link from the template
   * 1. collect stylesheets
   * 2. use global eval to evaluate the inline scripts
   *    see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function#Difference_between_Function_constructor_and_function_declaration
   *    see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Do_not_ever_use_eval!
   * @param tpl
   * @param baseURI
   * @stripStyles whether to strip the css links
   * @returns {{template: void | string | *, scripts: *[], entry: *}}
   */

  function processTpl(tpl, baseURI) {
    var scripts = [];
    var styles = [];
    var entry = null;
    var moduleSupport = isModuleScriptSupported();
    var template = tpl
    /*
    remove html comment first
    */
    .replace(HTML_COMMENT_REGEX, '').replace(LINK_TAG_REGEX, function (match) {
      /*
      change the css link
      */
      var styleType = !!match.match(STYLE_TYPE_REGEX);

      if (styleType) {
        var styleHref = match.match(STYLE_HREF_REGEX);
        var styleIgnore = match.match(LINK_IGNORE_REGEX);

        if (styleHref) {
          var href = styleHref && styleHref[2];
          var newHref = href;

          if (href && !hasProtocol(href)) {
            newHref = getEntirePath(href, baseURI);
          }

          if (styleIgnore) {
            return genIgnoreAssetReplaceSymbol(newHref);
          }

          styles.push(newHref);
          return genLinkReplaceSymbol(newHref);
        }
      }

      var preloadOrPrefetchType = match.match(LINK_PRELOAD_OR_PREFETCH_REGEX) && match.match(LINK_HREF_REGEX) && !match.match(LINK_AS_FONT);

      if (preloadOrPrefetchType) {
        var _match$match = match.match(LINK_HREF_REGEX),
            _match$match2 = slicedToArray(_match$match, 3),
            linkHref = _match$match2[2];

        styles.push(linkHref);
        return genLinkReplaceSymbol(linkHref, true);
      }

      return match;
    }).replace(STYLE_TAG_REGEX, function (match) {
      if (STYLE_IGNORE_REGEX.test(match)) {
        return genIgnoreAssetReplaceSymbol('style file');
      }

      if (!!match.match(STYLE_TAG_REGEX)) {
        styles.push(match);
      }

      return match;
    }).replace(ALL_SCRIPT_REGEX, function (match, scriptTag) {
      var scriptIgnore = scriptTag.match(SCRIPT_IGNORE_REGEX);
      var moduleScriptIgnore = moduleSupport && !!scriptTag.match(SCRIPT_NO_MODULE_REGEX) || !moduleSupport && !!scriptTag.match(SCRIPT_MODULE_REGEX); // in order to keep the exec order of all javascripts

      var matchedScriptTypeMatch = scriptTag.match(SCRIPT_TYPE_REGEX);
      var matchedScriptType = matchedScriptTypeMatch && matchedScriptTypeMatch[2];

      if (!isValidJavaScriptType(matchedScriptType)) {
        return match;
      } // if it is a external script


      if (SCRIPT_TAG_REGEX.test(match) && scriptTag.match(SCRIPT_SRC_REGEX)) {
        /*
        collect scripts and replace the ref
        */
        var matchedScriptEntry = scriptTag.match(SCRIPT_ENTRY_REGEX);
        var matchedScriptSrcMatch = scriptTag.match(SCRIPT_SRC_REGEX);
        var matchedScriptSrc = matchedScriptSrcMatch && matchedScriptSrcMatch[2];

        if (entry && matchedScriptEntry) {
          throw new SyntaxError('You should not set multiply entry script!');
        } else {
          // append the domain while the script not have an protocol prefix
          if (matchedScriptSrc && !hasProtocol(matchedScriptSrc)) {
            matchedScriptSrc = getEntirePath(matchedScriptSrc, baseURI);
          }

          entry = entry || matchedScriptEntry && matchedScriptSrc;
        }

        if (scriptIgnore) {
          return genIgnoreAssetReplaceSymbol(matchedScriptSrc || 'js file');
        }

        if (moduleScriptIgnore) {
          return genModuleScriptReplaceSymbol(matchedScriptSrc || 'js file', moduleSupport);
        }

        if (matchedScriptSrc) {
          var asyncScript = !!scriptTag.match(SCRIPT_ASYNC_REGEX);
          scripts.push(asyncScript ? {
            async: true,
            src: matchedScriptSrc
          } : matchedScriptSrc);
        }

        return match;
      } else {
        if (scriptIgnore) {
          return genIgnoreAssetReplaceSymbol('js file');
        }

        if (moduleScriptIgnore) {
          return genModuleScriptReplaceSymbol('js file', moduleSupport);
        } // if it is an inline script


        var code = getInlineCode(match); // remove script blocks when all of these lines are comments.

        var isPureCommentBlock = code.split(/[\r\n]+/).every(function (line) {
          return !line.trim() || line.trim().startsWith('//');
        });

        if (!isPureCommentBlock) {
          scripts.push(match);
        }
      }
    });
    scripts = scripts.filter(function (script) {
      // filter empty script
      return !!script;
    });
    return {
      template: template,
      scripts: scripts,
      styles: styles,
      // set the last script as entry if have not set
      entry: entry || scripts[scripts.length - 1]
    };
  }

  exports.default = processTpl;
  exports.genIgnoreAssetReplaceSymbol = genIgnoreAssetReplaceSymbol;
  exports.genLinkReplaceSymbol = genLinkReplaceSymbol;
  exports.genModuleScriptReplaceSymbol = genModuleScriptReplaceSymbol;
  exports.requestHtml = requestHtml;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
