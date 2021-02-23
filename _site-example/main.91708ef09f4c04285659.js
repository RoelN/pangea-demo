!(function(e) {
	var t = {};
	function n(r) {
		if (t[r]) return t[r].exports;
		var o = (t[r] = { i: r, l: !1, exports: {} });
		return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
	}
	(n.m = e),
		(n.c = t),
		(n.d = function(e, t, r) {
			n.o(e, t) ||
				Object.defineProperty(e, t, { enumerable: !0, get: r });
		}),
		(n.r = function(e) {
			"undefined" != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(e, Symbol.toStringTag, {
					value: "Module"
				}),
				Object.defineProperty(e, "__esModule", { value: !0 });
		}),
		(n.t = function(e, t) {
			if ((1 & t && (e = n(e)), 8 & t)) return e;
			if (4 & t && "object" == typeof e && e && e.__esModule) return e;
			var r = Object.create(null);
			if (
				(n.r(r),
				Object.defineProperty(r, "default", {
					enumerable: !0,
					value: e
				}),
				2 & t && "string" != typeof e)
			)
				for (var o in e)
					n.d(
						r,
						o,
						function(t) {
							return e[t];
						}.bind(null, o)
					);
			return r;
		}),
		(n.n = function(e) {
			var t =
				e && e.__esModule
					? function() {
							return e.default;
					  }
					: function() {
							return e;
					  };
			return n.d(t, "a", t), t;
		}),
		(n.o = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}),
		(n.p = "./"),
		n((n.s = 1));
})([
	function(e) {
		e.exports = JSON.parse(
			'[{"name":"PangeaVAR2.000","selector":"pangeavar2000","style":"unknown"}]'
		);
	},
	function(e, t, n) {
		n(2), (e.exports = n(5));
	},
	function(e, t, n) {
		"use strict";
		n.r(t);
		n(3);
		var r = n(0);
		const o = r.map(e => e.selector),
			c = document.querySelectorAll(".interactive-controls");
		for (const e of c) {
			const t = e.querySelector(".interactive-controls-text"),
				n = e.querySelector(".interactive-controls-styles"),
				r = e.querySelectorAll(".interactive-controls-slider"),
				c = e.querySelectorAll(".interactive-controls-checkbox"),
				a = e.querySelector(".interactive-controls-instances"),
				l = (e, n) => {
					t.style.setProperty("--".concat(e), n);
				};
			for (const e of r)
				l(e.name, e.value),
					(e.oninput = e => {
						l(e.target.name, e.target.value),
							a && (a.selectedIndex = -1);
					});
			for (const e of c)
				l(e.name, e.value),
					(e.oninput = e => {
						(e.target.value = 1 - e.target.value),
							l(e.target.name, e.target.value),
							a && (a.selectedIndex = -1);
					});
			a &&
				(a.onchange = t => {
					const n = JSON.parse(
						t.target.options[t.target.selectedIndex].value
					);
					for (const t in n)
						(e.querySelector("[name=".concat(t, "]")).value = n[t]),
							l(t, n[t]);
				}),
				n &&
					(n.onchange = e => {
						t.classList.remove(...o),
							t.classList.add(e.target.value);
					});
		}
	},
	function(e, t, n) {
		var r;
		(r = n(4)).keys().forEach(r);
	},
	function(e, t) {
		function n(e) {
			var t = new Error("Cannot find module '" + e + "'");
			throw ((t.code = "MODULE_NOT_FOUND"), t);
		}
		(n.keys = function() {
			return [];
		}),
			(n.resolve = n),
			(e.exports = n),
			(n.id = 4);
	},
	function(e, t, n) {}
]);
