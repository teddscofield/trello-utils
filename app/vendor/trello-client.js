(function () {
    var opts = {
        "version": 1,
        "apiEndpoint": "https://api.trello.com",
        "authEndpoint": "https://trello.com",
        "key": "4704d4eac5a5ad6208682bf53c48d4bf"
    };
    (function () {
        var f, y, z, l, A, B = [].slice;
        f = {};
        l = {};
        A = function (c, h) {
            return null != l[c] ? h(l[c]) : (null != f[c] ? f[c] : f[c] = []).push(h)
        };
        z = function (c, h) {
            var b, g, d, C;
            l[c] = h;
            if (f[c]) {
                g = f[c];
                delete f[c];
                d = 0;
                for (C = g.length; d < C; d++) b = g[d], b(h)
            }
        };
        y = function (c) {
            return "function" === typeof c
        };
        (function (c, h, b) {
            var g, d, f, l, D, n, s, p, E, x, e, t, u, v, m, w, q;
            n = b.key;
            e = b.token;
            d = b.apiEndpoint;
            f = b.authEndpoint;
            t = b.version;
            D = "" + d + "/" + t + "/";
            p = c.location;
            g = {
                version: function () {
                    return t
                },
                key: function () {
                    return n
                },
                setKey: function (a) {
                    n = a
                },
                token: function () {
                    return e
                },
                setToken: function (a) {
                    e = a
                },
                rest: function () {
                    var a, c, d, k;
                    c = arguments[0];
                    a = 2 <= arguments.length ? B.call(arguments, 1) : [];
                    k = E(a);
                    d = k[0];
                    a = k[1];
                    b = {
                        url: "" + D + d,
                        type: c,
                        data: {},
                        dataType: "json",
                        success: k[2],
                        error: k[3]
                    };
                    h.support.cors || (b.dataType = "jsonp", "GET" !== c && (b.type = "GET", h.extend(b.data, {
                        _method: c
                    })));
                    n && (b.data.key = n);
                    e && (b.data.token = e);
                    null != a && h.extend(b.data, a);
                    return h.ajax(b)
                },
                authorized: function () {
                    return null != e
                },
                deauthorize: function () {
                    e = null;
                    u("token", e)
                },
                authorize: function (a) {
                    var r, d, k, g, f;
                    b =
                        h.extend(!0, {
                            type: "redirect",
                            persist: !0,
                            interactive: !0,
                            scope: {
                                read: !0,
                                write: !1,
                                account: !1
                            },
                            expiration: "30days"
                        }, a);
                    a = /[&#]?token=([0-9a-f]{64})/;
                    d = function () {
                        if (b.persist && null != e) return u("token", e)
                    };
                    b.persist && null == e && (e = x("token"));
                    null == e && (e = null != (f = a.exec(p.hash)) ? f[1] : void 0);
                    if (this.authorized()) return d(), p.hash = p.hash.replace(a, ""), "function" === typeof b.success ? b.success() : void 0;
                    if (!b.interactive) return "function" === typeof b.error ? b.error() : void 0;
                    k = function () {
                        var a, c;
                        a = b.scope;
                        c = [];
                        for (r in a)(g =
                            a[r]) && c.push(r);
                        return c
                    }().join(",");
                    switch (b.type) {
                    case "popup":
                        (function () {
                            var a, r, e, f;
                            A("authorized", function (a) {
                                return a ? (d(), "function" === typeof b.success ? b.success() : void 0) : "function" === typeof b.error ? b.error() : void 0
                            });
                            a = c.screenX + (c.innerWidth - 420) / 2;
                            e = c.screenY + (c.innerHeight - 470) / 2;
                            r = null != (f = /^[a-z]+:\/\/[^\/]*/.exec(p)) ? f[0] : void 0;
                            return c.open(l({
                                    return_url: r,
                                    callback_method: "postMessage",
                                    scope: k,
                                    expiration: b.expiration,
                                    name: b.name
                                }), "trello", "width=420,height=470,left=" + a + ",top=" +
                                e)
                        })();
                        break;
                    default:
                        c.location = l({
                            redirect_uri: p.href,
                            callback_method: "fragment",
                            scope: k,
                            expiration: b.expiration,
                            name: b.name
                        })
                    }
                }
            };
            q = ["GET", "PUT", "POST", "DELETE"];
            v = function (a) {
                return g[a.toLowerCase()] = function () {
                    return this.rest.apply(this, [a].concat(B.call(arguments)))
                }
            };
            m = 0;
            for (w = q.length; m < w; m++) d = q[m], v(d);
            g.del = g["delete"];
            q = "actions cards checklists boards lists members organizations lists".split(" ");
            v = function (a) {
                return g[a] = {
                    get: function (b, c, d, e) {
                        return g.get("" + a + "/" + b, c, d, e)
                    }
                }
            };
            m = 0;
            for (w =
                q.length; m < w; m++) d = q[m], v(d);
            c.Trello = g;
            l = function (a) {
                return f + "/" + t + "/authorize?" + h.param(h.extend({
                    response_type: "token",
                    key: n
                }, a))
            };
            E = function (a) {
                var b, c, d;
                c = a[0];
                b = a[1];
                d = a[2];
                a = a[3];
                y(b) && (a = d, d = b, b = {});
                c = c.replace(/^\/*/, "");
                return [c, b, d, a]
            };
            d = function (a) {
                var b;
                a.origin === f && (null != (b = a.source) && b.close(), e = null != a.data && 4 < a.data.length ? a.data : null, z("authorized", g.authorized()))
            };
            s = c.localStorage;
            null != s ? (x = function (a) {
                return s["trello_" + a]
            }, u = function (a, b) {
                return null === b ? delete s["trello_" +
                    a] : s["trello_" + a] = b
            }) : x = u = function () {};
            "function" === typeof c.addEventListener && c.addEventListener("message", d, !1)
        })(window, jQuery, opts)
    }).call(this);
})()