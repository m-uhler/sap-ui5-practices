/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var c=function b(E,d){if(E.type!="mouseover"&&E.type!="mouseout"){return false;}var i=false;var a=d;var p=E.relatedTarget;try{while(p&&p!==a){p=p.parentNode;}if(p!==a){i=true;}}catch(e){}return i;};return c;});
