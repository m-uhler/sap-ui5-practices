/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/base/util/LoaderExtensions'],function(L){"use strict";var P=function(){this.mProperties={};this.aKeys=null;};P.prototype.getProperty=function(k,d){var v=this.mProperties[k];if(typeof(v)=="string"){return v;}else if(d){return d;}return null;};P.prototype.getKeys=function(){return this.aKeys||(this.aKeys=Object.keys(this.mProperties));};P.prototype.setProperty=function(k,v){if(typeof(v)!="string"){return;}if(typeof(this.mProperties[k])!="string"&&this.aKeys){this.aKeys.push(String(k));}this.mProperties[k]=v;};P.prototype.clone=function(){var c=new P();c.mProperties=Object.assign({},this.mProperties);return c;};var f=(typeof chrome==="object"||typeof v8==="object")?function(s,c){if(c>2&&40*c>s.length){Number(s);}return s;}:function(s){return s;};var r=/(?:\r\n|\r|\n|^)[ \t\f]*/;var a=/(\\u[0-9a-fA-F]{0,4})|(\\.)|(\\$)|([ \t\f]*[ \t\f:=][ \t\f]*)/g;var b=/(\\u[0-9a-fA-F]{0,4})|(\\.)|(\\$)/g;var e={'\\f':'\f','\\n':'\n','\\r':'\r','\\t':'\t'};function p(t,o){var l=t.split(r),c,d,k,v,i,m,g,C;function h(s){if(v){v=v+s;C++;}else{v=s;C=0;}}o.mProperties={};for(i=0;i<l.length;i++){c=l[i];if(c===""||c.charAt(0)==="#"||c.charAt(0)==="!"){continue;}d=a;d.lastIndex=g=0;k=null;v="";while((m=d.exec(c))!==null){if(g<m.index){h(c.slice(g,m.index));}g=d.lastIndex;if(m[1]){if(m[1].length!==6){throw new Error("Incomplete Unicode Escape '"+m[1]+"'");}h(String.fromCharCode(parseInt(m[1].slice(2),16)));}else if(m[2]){h(e[m[2]]||m[2].slice(1));}else if(m[3]){c=l[++i];d.lastIndex=g=0;}else if(m[4]){k=v;v="";d=b;d.lastIndex=g;}}if(g<c.length){h(c.slice(g));}if(k==null){k=v;v="";}o.mProperties[k]=f(v,v?C:0);}}P.create=function(m){m=Object.assign({url:undefined,headers:{}},m);var A=!!m.async,o=new P(),R;function _(t){if(typeof t==="string"){p(t,o);return o;}return m.returnNullIfMissing?null:o;}if(typeof m.url==="string"){R=L.loadResource({url:m.url,dataType:'text',headers:m.headers,failOnError:false,async:A});}if(A){if(!R){return Promise.resolve(_(null));}return R.then(function(v){return _(v);},function(v){throw(v instanceof Error?v:new Error("Problem during loading of property file '"+m.url+"': "+v));});}return _(R);};return P;});
