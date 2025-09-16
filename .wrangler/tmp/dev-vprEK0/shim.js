var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-y4SMGy/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// worker/build/worker/shim.mjs
import nt from "./5a3f97dea4683220dab8d939d140db24a1b55b6e-index.wasm";
import { WorkerEntrypoint as rt } from "cloudflare:workers";
var U = Object.defineProperty;
var $ = /* @__PURE__ */ __name((e, t) => {
  for (var n in t)
    U(e, n, { get: t[n], enumerable: true });
}, "$");
var a = {};
$(a, { IntoUnderlyingByteSource: () => S, IntoUnderlyingSink: () => T, IntoUnderlyingSource: () => j, MinifyConfig: () => M, PolishConfig: () => J, R2Range: () => O, RequestRedirect: () => Y, RoomDurableObject: () => I, __wbg_buffer_0e2c274546535a84: () => ee, __wbg_buffer_6a981f417caee238: () => te, __wbg_byobRequest_951b4f732c83105d: () => ne, __wbg_byteLength_ad95ac85da395bc1: () => re, __wbg_byteOffset_836c90446a7a1612: () => _e, __wbg_call_3a8ceff4c9f12325: () => oe, __wbg_call_5c72926da3334dbb: () => ie, __wbg_cause_db22964a5183e7a2: () => se, __wbg_cf_b9474a77a96d0e7f: () => ce, __wbg_close_5d3e8020a927cfe2: () => ue, __wbg_close_d30bfee041e892ae: () => fe, __wbg_enqueue_0800f2f0de6f8e83: () => ge, __wbg_error_7534b8e9a36f1ab4: () => ae, __wbg_globalThis_d0fa1c7e1465604c: () => be, __wbg_global_23a7926f0ad701bc: () => de, __wbg_headers_09ab2f063addc18b: () => le, __wbg_instanceof_Error_403a62e1daddc667: () => we, __wbg_length_ee1bca74ed444cce: () => pe, __wbg_log_91785a95194156ea: () => ye, __wbg_method_255fc452bcb010d8: () => he, __wbg_new_3c1d3c7a793c6c45: () => xe, __wbg_new_64baf86f106005bd: () => me, __wbg_new_895d7127a3e31225: () => Re, __wbg_new_8a6f238a6ece86ea: () => Fe, __wbg_new_c151c7225ce81bda: () => ze, __wbg_newnoargs_1143e0b74be16ea9: () => Ee, __wbg_newwithbyteoffsetandlength_3326f0403bffc512: () => Se, __wbg_newwithlength_be5f146e24c4bfa9: () => Te, __wbg_newwithoptbuffersourceandinit_98d0b8f1f32dfd11: () => je, __wbg_newwithoptreadablestreamandinit_67b939d98097c831: () => Me, __wbg_newwithoptstrandinit_db5bd0d3ef5d1f8d: () => Oe, __wbg_queueMicrotask_e410e98db024cc81: () => Ie, __wbg_queueMicrotask_ec2456c3cd3e6990: () => ke, __wbg_resolve_976a3a602ae7ab90: () => qe, __wbg_respond_1af6d0d583d680d7: () => Ae, __wbg_self_3a2c444cba620c12: () => De, __wbg_set_24337d82e48ac575: () => Ce, __wbg_set_2611eb16b9ac5ca9: () => Le, __wbg_set_549434703c44f395: () => Ue, __wbg_set_wasm: () => k, __wbg_stack_0ed75d68575b0f3c: () => $e, __wbg_then_c11d04ed76c80ff7: () => We, __wbg_toString_3112acb210c6f97f: () => Be, __wbg_url_e7b359f5ebf60fbe: () => Pe, __wbg_view_c94a900971ad2fcb: () => Ne, __wbg_window_a27f90073150a6bf: () => Ve, __wbindgen_cb_drop: () => Xe, __wbindgen_closure_wrapper813: () => He, __wbindgen_debug_string: () => Je, __wbindgen_init_externref_table: () => Ye, __wbindgen_is_function: () => Ge, __wbindgen_is_undefined: () => Ke, __wbindgen_memory: () => Qe, __wbindgen_number_new: () => Ze, __wbindgen_string_get: () => ve, __wbindgen_string_new: () => et, __wbindgen_throw: () => tt, fetch: () => q });
var r;
function k(e) {
  r = e;
}
__name(k, "k");
function b(e) {
  return e == null;
}
__name(b, "b");
function R(e) {
  let t = r.__externref_table_alloc();
  return r.__wbindgen_export_1.set(t, e), t;
}
__name(R, "R");
function c(e, t) {
  try {
    return e.apply(this, t);
  } catch (n) {
    let _ = R(n);
    r.__wbindgen_exn_store(_);
  }
}
__name(c, "c");
var y = null;
function h() {
  return (y === null || y.byteLength === 0) && (y = new Uint8Array(r.memory.buffer)), y;
}
__name(h, "h");
var C = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
var x = new C("utf-8", { ignoreBOM: true, fatal: true });
x.decode();
var W = 2146435072;
var z = 0;
function B(e, t) {
  return z += t, z >= W && (x = new C("utf-8", { ignoreBOM: true, fatal: true }), x.decode(), z = t), x.decode(h().subarray(e, e + t));
}
__name(B, "B");
function g(e, t) {
  return e = e >>> 0, B(e, t);
}
__name(g, "g");
var d = 0;
var P = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
var m = new P("utf-8");
var N = typeof m.encodeInto == "function" ? function(e, t) {
  return m.encodeInto(e, t);
} : function(e, t) {
  let n = m.encode(e);
  return t.set(n), { read: e.length, written: n.length };
};
function w(e, t, n) {
  if (n === void 0) {
    let s = m.encode(e), p = t(s.length, 1) >>> 0;
    return h().subarray(p, p + s.length).set(s), d = s.length, p;
  }
  let _ = e.length, o = t(_, 1) >>> 0, u = h(), i = 0;
  for (; i < _; i++) {
    let s = e.charCodeAt(i);
    if (s > 127)
      break;
    u[o + i] = s;
  }
  if (i !== _) {
    i !== 0 && (e = e.slice(i)), o = n(o, _, _ = i + e.length * 3, 1) >>> 0;
    let s = h().subarray(o + i, o + _);
    i += N(e, s).written, o = n(o, _, i, 1) >>> 0;
  }
  return d = i, o;
}
__name(w, "w");
var l = null;
function f() {
  return (l === null || l.buffer.detached === true || l.buffer.detached === void 0 && l.buffer !== r.memory.buffer) && (l = new DataView(r.memory.buffer)), l;
}
__name(f, "f");
var A = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => {
  r.__wbindgen_export_6.get(e.dtor)(e.a, e.b);
});
function V(e, t, n, _) {
  let o = { a: e, b: t, cnt: 1, dtor: n }, u = /* @__PURE__ */ __name((...i) => {
    o.cnt++;
    let s = o.a;
    o.a = 0;
    try {
      return _(s, o.b, ...i);
    } finally {
      --o.cnt === 0 ? (r.__wbindgen_export_6.get(o.dtor)(s, o.b), A.unregister(o)) : o.a = s;
    }
  }, "u");
  return u.original = o, A.register(u, o, o), u;
}
__name(V, "V");
function E(e) {
  let t = typeof e;
  if (t == "number" || t == "boolean" || e == null)
    return `${e}`;
  if (t == "string")
    return `"${e}"`;
  if (t == "symbol") {
    let o = e.description;
    return o == null ? "Symbol" : `Symbol(${o})`;
  }
  if (t == "function") {
    let o = e.name;
    return typeof o == "string" && o.length > 0 ? `Function(${o})` : "Function";
  }
  if (Array.isArray(e)) {
    let o = e.length, u = "[";
    o > 0 && (u += E(e[0]));
    for (let i = 1; i < o; i++)
      u += ", " + E(e[i]);
    return u += "]", u;
  }
  let n = /\[object ([^\]]+)\]/.exec(toString.call(e)), _;
  if (n && n.length > 1)
    _ = n[1];
  else
    return toString.call(e);
  if (_ == "Object")
    try {
      return "Object(" + JSON.stringify(e) + ")";
    } catch {
      return "Object";
    }
  return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : _;
}
__name(E, "E");
function q(e, t, n) {
  return r.fetch(e, t, n);
}
__name(q, "q");
function X(e, t, n) {
  r.closure51_externref_shim(e, t, n);
}
__name(X, "X");
function H(e, t, n, _) {
  r.closure34_externref_shim(e, t, n, _);
}
__name(H, "H");
var J = Object.freeze({ Off: 0, 0: "Off", Lossy: 1, 1: "Lossy", Lossless: 2, 2: "Lossless" });
var Y = Object.freeze({ Error: 0, 0: "Error", Follow: 1, 1: "Follow", Manual: 2, 2: "Manual" });
var G = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => r.__wbg_intounderlyingbytesource_free(e >>> 0, 1));
var S = /* @__PURE__ */ __name(class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, G.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    r.__wbg_intounderlyingbytesource_free(t, 0);
  }
  get type() {
    let t, n;
    try {
      let _ = r.intounderlyingbytesource_type(this.__wbg_ptr);
      return t = _[0], n = _[1], g(_[0], _[1]);
    } finally {
      r.__wbindgen_free(t, n, 1);
    }
  }
  get autoAllocateChunkSize() {
    return r.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr) >>> 0;
  }
  start(t) {
    r.intounderlyingbytesource_start(this.__wbg_ptr, t);
  }
  pull(t) {
    return r.intounderlyingbytesource_pull(this.__wbg_ptr, t);
  }
  cancel() {
    let t = this.__destroy_into_raw();
    r.intounderlyingbytesource_cancel(t);
  }
}, "S");
var K = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => r.__wbg_intounderlyingsink_free(e >>> 0, 1));
var T = /* @__PURE__ */ __name(class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, K.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    r.__wbg_intounderlyingsink_free(t, 0);
  }
  write(t) {
    return r.intounderlyingsink_write(this.__wbg_ptr, t);
  }
  close() {
    let t = this.__destroy_into_raw();
    return r.intounderlyingsink_close(t);
  }
  abort(t) {
    let n = this.__destroy_into_raw();
    return r.intounderlyingsink_abort(n, t);
  }
}, "T");
var Q = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => r.__wbg_intounderlyingsource_free(e >>> 0, 1));
var j = /* @__PURE__ */ __name(class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Q.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    r.__wbg_intounderlyingsource_free(t, 0);
  }
  pull(t) {
    return r.intounderlyingsource_pull(this.__wbg_ptr, t);
  }
  cancel() {
    let t = this.__destroy_into_raw();
    r.intounderlyingsource_cancel(t);
  }
}, "j");
var Z = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => r.__wbg_minifyconfig_free(e >>> 0, 1));
var M = /* @__PURE__ */ __name(class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Z.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    r.__wbg_minifyconfig_free(t, 0);
  }
  get js() {
    return r.__wbg_get_minifyconfig_js(this.__wbg_ptr) !== 0;
  }
  set js(t) {
    r.__wbg_set_minifyconfig_js(this.__wbg_ptr, t);
  }
  get html() {
    return r.__wbg_get_minifyconfig_html(this.__wbg_ptr) !== 0;
  }
  set html(t) {
    r.__wbg_set_minifyconfig_html(this.__wbg_ptr, t);
  }
  get css() {
    return r.__wbg_get_minifyconfig_css(this.__wbg_ptr) !== 0;
  }
  set css(t) {
    r.__wbg_set_minifyconfig_css(this.__wbg_ptr, t);
  }
}, "M");
var v = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => r.__wbg_r2range_free(e >>> 0, 1));
var O = /* @__PURE__ */ __name(class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, v.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    r.__wbg_r2range_free(t, 0);
  }
  get offset() {
    let t = r.__wbg_get_r2range_offset(this.__wbg_ptr);
    return t === 4294967297 ? void 0 : t;
  }
  set offset(t) {
    r.__wbg_set_r2range_offset(this.__wbg_ptr, b(t) ? 4294967297 : t >>> 0);
  }
  get length() {
    let t = r.__wbg_get_r2range_length(this.__wbg_ptr);
    return t === 4294967297 ? void 0 : t;
  }
  set length(t) {
    r.__wbg_set_r2range_length(this.__wbg_ptr, b(t) ? 4294967297 : t >>> 0);
  }
  get suffix() {
    let t = r.__wbg_get_r2range_suffix(this.__wbg_ptr);
    return t === 4294967297 ? void 0 : t;
  }
  set suffix(t) {
    r.__wbg_set_r2range_suffix(this.__wbg_ptr, b(t) ? 4294967297 : t >>> 0);
  }
}, "O");
var D = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => r.__wbg_roomdurableobject_free(e >>> 0, 1));
var I = /* @__PURE__ */ __name(class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, D.unregister(this), t;
  }
  free() {
    let t = this.__destroy_into_raw();
    r.__wbg_roomdurableobject_free(t, 0);
  }
  constructor(t, n) {
    let _ = r.roomdurableobject__new(t, n);
    return this.__wbg_ptr = _ >>> 0, D.register(this, this.__wbg_ptr, this), this;
  }
  fetch(t) {
    return r.roomdurableobject_fetch(this.__wbg_ptr, t);
  }
}, "I");
function ee(e) {
  return e.buffer;
}
__name(ee, "ee");
function te(e) {
  return e.buffer;
}
__name(te, "te");
function ne(e) {
  let t = e.byobRequest;
  return b(t) ? 0 : R(t);
}
__name(ne, "ne");
function re(e) {
  return e.byteLength;
}
__name(re, "re");
function _e(e) {
  return e.byteOffset;
}
__name(_e, "_e");
function oe() {
  return c(function(e, t) {
    return e.call(t);
  }, arguments);
}
__name(oe, "oe");
function ie() {
  return c(function(e, t, n) {
    return e.call(t, n);
  }, arguments);
}
__name(ie, "ie");
function se(e) {
  return e.cause;
}
__name(se, "se");
function ce(e) {
  let t = e.cf;
  return b(t) ? 0 : R(t);
}
__name(ce, "ce");
function ue() {
  return c(function(e) {
    e.close();
  }, arguments);
}
__name(ue, "ue");
function fe() {
  return c(function(e) {
    e.close();
  }, arguments);
}
__name(fe, "fe");
function ge() {
  return c(function(e, t) {
    e.enqueue(t);
  }, arguments);
}
__name(ge, "ge");
function ae(e, t) {
  let n, _;
  try {
    n = e, _ = t, console.error(g(e, t));
  } finally {
    r.__wbindgen_free(n, _, 1);
  }
}
__name(ae, "ae");
function be() {
  return c(function() {
    return globalThis.globalThis;
  }, arguments);
}
__name(be, "be");
function de() {
  return c(function() {
    return global.global;
  }, arguments);
}
__name(de, "de");
function le(e) {
  return e.headers;
}
__name(le, "le");
function we(e) {
  let t;
  try {
    t = e instanceof Error;
  } catch {
    t = false;
  }
  return t;
}
__name(we, "we");
function pe(e) {
  return e.length;
}
__name(pe, "pe");
function ye(e) {
  console.log(e);
}
__name(ye, "ye");
function he(e, t) {
  let n = t.method, _ = w(n, r.__wbindgen_malloc, r.__wbindgen_realloc), o = d;
  f().setInt32(e + 4 * 1, o, true), f().setInt32(e + 4 * 0, _, true);
}
__name(he, "he");
function xe(e, t) {
  try {
    var n = { a: e, b: t }, _ = /* @__PURE__ */ __name((u, i) => {
      let s = n.a;
      n.a = 0;
      try {
        return H(s, n.b, u, i);
      } finally {
        n.a = s;
      }
    }, "_");
    return new Promise(_);
  } finally {
    n.a = n.b = 0;
  }
}
__name(xe, "xe");
function me(e, t) {
  return new Error(g(e, t));
}
__name(me, "me");
function Re() {
  return new Object();
}
__name(Re, "Re");
function Fe() {
  return new Error();
}
__name(Fe, "Fe");
function ze() {
  return c(function() {
    return new Headers();
  }, arguments);
}
__name(ze, "ze");
function Ee(e, t) {
  return new Function(g(e, t));
}
__name(Ee, "Ee");
function Se(e, t, n) {
  return new Uint8Array(e, t >>> 0, n >>> 0);
}
__name(Se, "Se");
function Te(e) {
  return new Uint8Array(e >>> 0);
}
__name(Te, "Te");
function je() {
  return c(function(e, t) {
    return new Response(e, t);
  }, arguments);
}
__name(je, "je");
function Me() {
  return c(function(e, t) {
    return new Response(e, t);
  }, arguments);
}
__name(Me, "Me");
function Oe() {
  return c(function(e, t, n) {
    return new Response(e === 0 ? void 0 : g(e, t), n);
  }, arguments);
}
__name(Oe, "Oe");
function Ie(e) {
  return e.queueMicrotask;
}
__name(Ie, "Ie");
function ke(e) {
  queueMicrotask(e);
}
__name(ke, "ke");
function qe(e) {
  return Promise.resolve(e);
}
__name(qe, "qe");
function Ae() {
  return c(function(e, t) {
    e.respond(t >>> 0);
  }, arguments);
}
__name(Ae, "Ae");
function De() {
  return c(function() {
    return self.self;
  }, arguments);
}
__name(De, "De");
function Ce() {
  return c(function(e, t, n) {
    return Reflect.set(e, t, n);
  }, arguments);
}
__name(Ce, "Ce");
function Le(e, t, n) {
  e.set(t, n >>> 0);
}
__name(Le, "Le");
function Ue() {
  return c(function(e, t, n, _, o) {
    e.set(g(t, n), g(_, o));
  }, arguments);
}
__name(Ue, "Ue");
function $e(e, t) {
  let n = t.stack, _ = w(n, r.__wbindgen_malloc, r.__wbindgen_realloc), o = d;
  f().setInt32(e + 4 * 1, o, true), f().setInt32(e + 4 * 0, _, true);
}
__name($e, "$e");
function We(e, t) {
  return e.then(t);
}
__name(We, "We");
function Be(e) {
  return e.toString();
}
__name(Be, "Be");
function Pe(e, t) {
  let n = t.url, _ = w(n, r.__wbindgen_malloc, r.__wbindgen_realloc), o = d;
  f().setInt32(e + 4 * 1, o, true), f().setInt32(e + 4 * 0, _, true);
}
__name(Pe, "Pe");
function Ne(e) {
  let t = e.view;
  return b(t) ? 0 : R(t);
}
__name(Ne, "Ne");
function Ve() {
  return c(function() {
    return window.window;
  }, arguments);
}
__name(Ve, "Ve");
function Xe(e) {
  let t = e.original;
  return t.cnt-- == 1 ? (t.a = 0, true) : false;
}
__name(Xe, "Xe");
function He(e, t, n) {
  return V(e, t, 50, X);
}
__name(He, "He");
function Je(e, t) {
  let n = E(t), _ = w(n, r.__wbindgen_malloc, r.__wbindgen_realloc), o = d;
  f().setInt32(e + 4 * 1, o, true), f().setInt32(e + 4 * 0, _, true);
}
__name(Je, "Je");
function Ye() {
  let e = r.__wbindgen_export_1, t = e.grow(4);
  e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, true), e.set(t + 3, false);
}
__name(Ye, "Ye");
function Ge(e) {
  return typeof e == "function";
}
__name(Ge, "Ge");
function Ke(e) {
  return e === void 0;
}
__name(Ke, "Ke");
function Qe() {
  return r.memory;
}
__name(Qe, "Qe");
function Ze(e) {
  return e;
}
__name(Ze, "Ze");
function ve(e, t) {
  let n = t, _ = typeof n == "string" ? n : void 0;
  var o = b(_) ? 0 : w(_, r.__wbindgen_malloc, r.__wbindgen_realloc), u = d;
  f().setInt32(e + 4 * 1, u, true), f().setInt32(e + 4 * 0, o, true);
}
__name(ve, "ve");
function et(e, t) {
  return g(e, t);
}
__name(et, "et");
function tt(e, t) {
  throw new Error(g(e, t));
}
__name(tt, "tt");
var L = new WebAssembly.Instance(nt, { "./index_bg.js": a });
k(L.exports);
L.exports.__wbindgen_start?.();
var F = /* @__PURE__ */ __name(class extends rt {
  async fetch(t) {
    return await q(t, this.env, this.ctx);
  }
  async queue(t) {
    return await (void 0)(t, this.env, this.ctx);
  }
  async scheduled(t) {
    return await (void 0)(t, this.env, this.ctx);
  }
}, "F");
var _t = ["IntoUnderlyingByteSource", "IntoUnderlyingSink", "IntoUnderlyingSource", "MinifyConfig", "PolishConfig", "R2Range", "RequestRedirect", "fetch", "queue", "scheduled", "getMemory"];
Object.keys(a).map((e) => {
  _t.includes(e) | e.startsWith("__") || (F.prototype[e] = a[e]);
});
var ct = F;

// ../usr/local/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../usr/local/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-y4SMGy/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = ct;

// ../usr/local/lib/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-y4SMGy/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  S as IntoUnderlyingByteSource,
  T as IntoUnderlyingSink,
  j as IntoUnderlyingSource,
  M as MinifyConfig,
  J as PolishConfig,
  O as R2Range,
  Y as RequestRedirect,
  I as RoomDurableObject,
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  ee as __wbg_buffer_0e2c274546535a84,
  te as __wbg_buffer_6a981f417caee238,
  ne as __wbg_byobRequest_951b4f732c83105d,
  re as __wbg_byteLength_ad95ac85da395bc1,
  _e as __wbg_byteOffset_836c90446a7a1612,
  oe as __wbg_call_3a8ceff4c9f12325,
  ie as __wbg_call_5c72926da3334dbb,
  se as __wbg_cause_db22964a5183e7a2,
  ce as __wbg_cf_b9474a77a96d0e7f,
  ue as __wbg_close_5d3e8020a927cfe2,
  fe as __wbg_close_d30bfee041e892ae,
  ge as __wbg_enqueue_0800f2f0de6f8e83,
  ae as __wbg_error_7534b8e9a36f1ab4,
  be as __wbg_globalThis_d0fa1c7e1465604c,
  de as __wbg_global_23a7926f0ad701bc,
  le as __wbg_headers_09ab2f063addc18b,
  we as __wbg_instanceof_Error_403a62e1daddc667,
  pe as __wbg_length_ee1bca74ed444cce,
  ye as __wbg_log_91785a95194156ea,
  he as __wbg_method_255fc452bcb010d8,
  xe as __wbg_new_3c1d3c7a793c6c45,
  me as __wbg_new_64baf86f106005bd,
  Re as __wbg_new_895d7127a3e31225,
  Fe as __wbg_new_8a6f238a6ece86ea,
  ze as __wbg_new_c151c7225ce81bda,
  Ee as __wbg_newnoargs_1143e0b74be16ea9,
  Se as __wbg_newwithbyteoffsetandlength_3326f0403bffc512,
  Te as __wbg_newwithlength_be5f146e24c4bfa9,
  je as __wbg_newwithoptbuffersourceandinit_98d0b8f1f32dfd11,
  Me as __wbg_newwithoptreadablestreamandinit_67b939d98097c831,
  Oe as __wbg_newwithoptstrandinit_db5bd0d3ef5d1f8d,
  Ie as __wbg_queueMicrotask_e410e98db024cc81,
  ke as __wbg_queueMicrotask_ec2456c3cd3e6990,
  qe as __wbg_resolve_976a3a602ae7ab90,
  Ae as __wbg_respond_1af6d0d583d680d7,
  De as __wbg_self_3a2c444cba620c12,
  Ce as __wbg_set_24337d82e48ac575,
  Le as __wbg_set_2611eb16b9ac5ca9,
  Ue as __wbg_set_549434703c44f395,
  k as __wbg_set_wasm,
  $e as __wbg_stack_0ed75d68575b0f3c,
  We as __wbg_then_c11d04ed76c80ff7,
  Be as __wbg_toString_3112acb210c6f97f,
  Pe as __wbg_url_e7b359f5ebf60fbe,
  Ne as __wbg_view_c94a900971ad2fcb,
  Ve as __wbg_window_a27f90073150a6bf,
  Xe as __wbindgen_cb_drop,
  He as __wbindgen_closure_wrapper813,
  Je as __wbindgen_debug_string,
  Ye as __wbindgen_init_externref_table,
  Ge as __wbindgen_is_function,
  Ke as __wbindgen_is_undefined,
  Qe as __wbindgen_memory,
  Ze as __wbindgen_number_new,
  ve as __wbindgen_string_get,
  et as __wbindgen_string_new,
  tt as __wbindgen_throw,
  middleware_loader_entry_default as default,
  q as fetch,
  nt as wasmModule
};
//# sourceMappingURL=shim.js.map
