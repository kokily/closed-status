(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[13],{"89Zu":function(e,r,n){e.exports=n("ShjV")},ShjV:function(e,r,n){"use strict";n.r(r),n.d(r,"getMarkupFromTree",(function(){return c})),n.d(r,"getDataFromTree",(function(){return a})),n.d(r,"renderToStringWithData",(function(){return f})),n.d(r,"RenderPromises",(function(){return s}));var t=n("mrSG"),o=n("q1tI"),i=n.n(o),u=n("6CgR");var s=function(){function e(){this.queryPromises=new Map,this.queryInfoTrie=new Map}return e.prototype.registerSSRObservable=function(e,r){this.lookupQueryInfo(r).observable=e},e.prototype.getSSRObservable=function(e){return this.lookupQueryInfo(e).observable},e.prototype.addQueryPromise=function(e,r){return this.lookupQueryInfo(e.getOptions()).seen?r():(this.queryPromises.set(e.getOptions(),new Promise((function(r){r(e.fetchData())}))),null)},e.prototype.hasPromises=function(){return this.queryPromises.size>0},e.prototype.consumeAndAwaitPromises=function(){var e=this,r=[];return this.queryPromises.forEach((function(n,t){e.lookupQueryInfo(t).seen=!0,r.push(n)})),this.queryPromises.clear(),Promise.all(r)},e.prototype.lookupQueryInfo=function(e){var r=this.queryInfoTrie,n=e.query,t=e.variables,o=r.get(n)||new Map;r.has(n)||r.set(n,o);var i=JSON.stringify(t),u=o.get(i)||{seen:!1,observable:null};return o.has(i)||o.set(i,u),u},e}();function a(e,r){return void 0===r&&(r={}),c({tree:e,context:r,renderFunction:n("KAy6").renderToStaticMarkup})}function c(e){var r=e.tree,o=e.context,a=void 0===o?{}:o,c=e.renderFunction,f=void 0===c?n("KAy6").renderToStaticMarkup:c,p=new s;return Promise.resolve().then((function e(){var n=Object(u.b)();return new Promise((function(e){var o=i.a.createElement(n.Provider,{value:Object(t.a)(Object(t.a)({},a),{renderPromises:p})},r);e(f(o))})).then((function(r){return p.hasPromises()?p.consumeAndAwaitPromises().then(e):r}))}))}function f(e){return c({tree:e,renderFunction:n("KAy6").renderToString})}}}]);