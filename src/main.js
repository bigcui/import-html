/**
* @file some code  cp https://github.com/kuitos/
* @author bigcui
* 2020-10-12
*/

/* eslint-enable */

import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import {getInlineCode, isModuleScriptSupported} from './util';
const ALL_SCRIPT_REGEX = /(<script[\s\S]*?>)[\s\S]*?<\/script>/gi;
const SCRIPT_TAG_REGEX = /<(script)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+((?!type=('|')text\/ng\x2Dtemplate\3)[\s\S])*?>[\s\S]*?<\/\1>/i;
const SCRIPT_SRC_REGEX = /.*\ssrc=('|")?([^>'"\s]+)/;
const SCRIPT_TYPE_REGEX = /.*\stype=('|")?([^>'"\s]+)/;
const SCRIPT_ENTRY_REGEX = /.*\sentry\s*.*/;
const SCRIPT_ASYNC_REGEX = /.*\sasync\s*.*/;
const SCRIPT_NO_MODULE_REGEX = /.*\snomodule\s*.*/;
const SCRIPT_MODULE_REGEX = /.*\stype=('|")?module('|")?\s*.*/;
const LINK_TAG_REGEX = /<(link)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[\s\S]*?>/ig;
const LINK_PRELOAD_OR_PREFETCH_REGEX = /\srel=('|")?(preload|prefetch)\1/;
const LINK_HREF_REGEX = /.*\shref=('|")?([^>'"\s]+)/;
const LINK_AS_FONT = /.*\sas=('|")?font\1.*/;
const STYLE_TAG_REGEX = /<style[^>]*>[\s\S]*?<\/style>/gi;
const STYLE_TYPE_REGEX = /\s+rel=('|")?stylesheet\1.*/;
const STYLE_HREF_REGEX = /.*\shref=('|")?([^>'"\s]+)/;
const HTML_COMMENT_REGEX = /<!--([\s\S]*?)-->/g;
const LINK_IGNORE_REGEX = /<link([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[\s\S]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+)ignore([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[\s\S]*|=[\s\S]*)>/i;
const STYLE_IGNORE_REGEX = /<style([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[\s\S]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+)ignore([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[\s\S]*|=[\s\S]*)>/i;
const SCRIPT_IGNORE_REGEX = /<script([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[\s\S]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+)ignore([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*|[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[\s\S]*|=[\s\S]*)>/i;

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

export var genLinkReplaceSymbol = function genLinkReplaceSymbol(linkHref) {
    var preloadOrPrefetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return '<!-- '.concat(preloadOrPrefetch ? 'prefetch/preload' : '', ' link ').concat(linkHref, ' replaced by import-html-entry -->');
};
export var genIgnoreAssetReplaceSymbol = function genIgnoreAssetReplaceSymbol(url) {
    return '<!-- ignore asset '.concat(url || 'file', ' replaced by import-html-entry -->');
};
export var genModuleScriptReplaceSymbol = function genModuleScriptReplaceSymbol(scriptSrc, moduleSupport) {
    return '<!-- '.concat(moduleSupport ? 'nomodule' : 'module', ' script ').concat(scriptSrc, ' ignored by import-html-entry -->');
};
export function requestHtml(url) {

    let useragent = navigator.userAgent.includes('Android');
    if (useragent || !navigator.userAgent.includes('iPhone')) {
        return new Promise((resolve, reject) => {

            var request = new XMLHttpRequest();
            var method = 'GET';

            request.open(method, url);
            request.send(null);
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    resolve(request.responseText);
                }
                else {
                    reject('ajax error'+ request.readyState +'-'+ request.status);
                }

            };
        });
    }
    else {
        return new Promise((resolve, reject) => {
            fetch(url).then(function (response) {
                return response.text();
            }).then(data => {
                resolve(data);
            }).catch(e => {
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

export default function processTpl(tpl, baseURI) {
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
                _match$match2 = _slicedToArray(_match$match, 3),
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
            }
            else {
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
        }
        else {
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
