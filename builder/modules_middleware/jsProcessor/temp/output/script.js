window.require = (function () { var e = /^(\w+):\/\//, t = (function (e) { return (e.pop(), e.join("/")); })((function (e) { return e[e.length - 3] + "://" + e[e.length - 2]; })(new Error("").stack.split(/(\w+):\/\/(\S+):\d+:\d+/)).split("/")), r = (function () { var _a = (function () { var e = { names: [], states: {}, values: {}, callbackStacks: {}, errorCallbackStack: {} }; return { setState: function (t, r) { return (e.states[t.__RegisteredPromiseIndex] = r, r); }, getState: function (t) { return e.states[t.__RegisteredPromiseIndex] || 0; }, registerPromise: function (t) { t.__RegisteredPromiseIndex = e.names.push(t) - 1, e.callbackStacks[t.__RegisteredPromiseIndex] = [], e.errorCallbackStack[t.__RegisteredPromiseIndex] = []; }, setVal: function (t, r) { return (e.values[t.__RegisteredPromiseIndex] = r, r); }, getVal: function (t) { return e.values[t.__RegisteredPromiseIndex]; }, getCallbackStack: function (t) { return e.callbackStacks[t.__RegisteredPromiseIndex]; }, getErrorCallbackStack: function (t) { return e.errorCallbackStack[t.__RegisteredPromiseIndex]; } }; })(), e = _a.setState, t = _a.getState, r = _a.registerPromise, n = _a.setVal, a = _a.getVal, s = _a.getCallbackStack, i = _a.getErrorCallbackStack;
    var o = (function () {
        function o(e, t) {
            t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
            var r = document.createEvent("CustomEvent");
            return r.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), r;
        }
        return o;
    }());  function c(e, t, r, n) { for (var a = 0; a < e.length; a++) {
    var s = new o("@PromiseReactionJob", { detail: { getState: t, setState: r, callback: e[a], val: n } });
    document.dispatchEvent(s);
} } document.addEventListener("@PromiseReactionJob", function (e) { 0 == e.detail.getState() && e.detail.setState(), e.detail.callback(e.detail.val); });
    var l = (function () {
        function l(a) {
            var _this = this;
            r(this);
            var o = function () { return t(_this); }, l = function (t) { n(_this, t), c(i(_this), o, function () { return e(_this, 2); }, t); };
            try {
                a(function (t) { n(_this, t), c(s(_this), o, function () { return e(_this, 1); }, t); }, l);
            }
            catch (e) {
                l(e);
            }
        }
        l.prototype.then = function (e, r) { var n = t(this), o = a(this); return "function" == typeof e && (0 == n ? s(this).push(e) : 1 == n && e(o)), "function" == typeof r && (0 == n ? i(this).push(r) : 2 == n && e(o)), this; };
        l.prototype["catch"] = function (e) { if ("function" == typeof e) {
            var r = t(this);
            0 == r ? i(this).push(e) : 2 == r && e(a(this));
        } return this; };
        l.all = function (e) { return new l(function (t, r) { for (var n = 0, a = [], s = 0; s < e.length; s++)
            e[s].then(function (r) { a[s] = r, ++n == e.length && t(a); })["catch"](r); }); };
        l.race = function (e) { return new l(function (t, r) { for (var n = 0; n < e.length; n++)
            e[n].then(t)["catch"](r); }); };
        l.reject = function (e) { return new l(function (t, r) { return r(e); }); };
        l.resolve = function (e) { return new l(function (t, r) { !function e(t, r, n) { if ("object" != typeof t || "function" != typeof t || "function" != typeof t.then)
            r(t);
        else {
            t.then(function (t) { e(t, r, n); });
            try {
                t["catch"](n);
            }
            catch (e) { }
        } }(e, t, r); }); };
        return l;
    }());  return l; })(); function n(n) {
    var _this = this;
    return new r(function (a, s) { var i = n.split("/"), o = (_this || {}).constructor === String ? "" + _this : t; i.pop(), function (e) { var t = new XMLHttpRequest; return new r(function (r, n) { t.open("GET", e, !0), t.onreadystatechange = (function () { 4 == t.readyState && (200 != t.status ? n(new Error("Cannot get requested module from " + e + ". Error " + t.status + ": " + t.statusText)) : r(t.responseText)); }), t.send(); }); }(e.test(n) ? n : o + "/" + n).then(function (e) { new Function("return new window.require.internalPromiseLike(function(__filename, __dirname){" + ("\n                    var exports = {},\n                        module = {};\n                    function require(url){\n                        return window.require.call(__dirname, url)\n                    }\n                    module.exports = exports;\n                    (function(require, __filename, __dirname){\n" + e + "\n})(require, " + JSON.stringify(n) + ", " + JSON.stringify(i.join("/")) + ").then(__filename).catch(function(e){\n                        console.warn('Eval error [[Need to handle next error]]:');\n                        __dirname(e)\n                    })\n                });"))().then(a)["catch"](s); })["catch"](function (e) { console.warn("Download error [[Need to handle next error]]:"), s(e); }); });
} return n.internalPromiseLike = r, n; })();
