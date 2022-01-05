/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/library","./TimePickerInternals","./Input","./SegmentedButton","./SegmentedButtonItem","sap/ui/core/InvisibleText","sap/ui/events/KeyCodes","./TimePickerInputsRenderer","sap/ui/thirdparty/jquery"],function(l,c,T,I,S,a,b,K,d,q){"use strict";var e=l.InputType,f=c.TextAlign,g=1000;var h=T.extend("sap.m.TimePickerInputs",{metadata:{aggregations:{_inputs:{type:"sap.m.Input",multiple:true,visibility:"hidden"},_texts:{type:"sap.ui.core.InvisibleText",multiple:true,visibility:"hidden"}}}});h.prototype.onAfterRendering=function(){if(!this._clickAttached){this._attachClickEvent();}};h.prototype._attachClickEvent=function(){var E=this.getDomRef();E.addEventListener("click",q.proxy(this._clickHandler,this),false);this._clickAttached=true;};h.prototype._clickHandler=function(E){var i=this.getAggregation("_inputs"),A=this._getActiveInput();if(A===-1){A=this._lastActiveInput;}!document.activeElement.classList.contains("sapMSegBBtn")&&i&&i[A]&&i[A].focus();};h.prototype.onkeydown=function(E){var k=E.which||E.keyCode,C=E.key,p,i=this.getAggregation("_inputs"),A=this._getActiveInput(),s=A>-1&&i[A]?i[A].getId().slice(-1):"",n=["0","1","2","3","4","5","6","7","8","9"],v,B="",j,m=false,o,r;if(C===":"){E.preventDefault();this._kbdBuffer="";this._resetCooldown(true);this._switchNextInput(true);}else if(k===K.ENTER){p=this.getParent().getParent();p&&p._handleNumericOkPress();}else if(k===K.P||k===K.A){E.preventDefault();r=this._getFormatButton();r&&r.setSelectedKey(k===K.P?"pm":"am");}else if((k===K.ARROW_UP||k===K.ARROW_DOWN)&&!E.altKey&&!E.metaKey){E.preventDefault();o=this._getActiveInputObject();o&&o.getEnabled()&&this._keyboardUpdateInput(o,k===K.ARROW_UP?1:-1);if(s==="H"){this._handleHoursChange(o.getValue());}}else if(s!==""&&n.indexOf(C)!==-1){E.preventDefault();B=this._kbdBuffer+C;j=parseInt(B);this._resetCooldown(true);if(j>this._inputsProperties[s].max){v=this._formatNumberToString(parseInt(this._kbdBuffer),this._inputsProperties[s].prependZero,this._inputsProperties[s].max,"");i[A].setValue(v);this._handleHoursChange(v);this._inputsProperties[s].value=v;setTimeout(function(){this._switchNextInput();this._kbdBuffer=C;A=this._getActiveInput();s=i[A].getId().slice(-1);v=this._formatNumberToString(parseInt(C),this._inputsProperties[s].prependZero,this._inputsProperties[s].max,"");i[A].setValue(v);this._inputsProperties[s].value=v;this._resetCooldown(true);}.bind(this),0);}else{this._kbdBuffer=B;v=this._formatNumberToString(parseInt(this._kbdBuffer),this._inputsProperties[s].prependZero,this._inputsProperties[s].max,"");i[A].setValue(v);this._inputsProperties[s].value=v;if(this._kbdBuffer.length===2||parseInt(this._kbdBuffer+"0")>this._inputsProperties[s].max){this._resetCooldown(this._kbdBuffer.length===2?false:true);if(s==="H"){m=this._handleHoursChange(this._kbdBuffer);}this._kbdBuffer="";if(!m||s!=="H"){setTimeout(function(){this._switchNextInput();}.bind(this),0);}}}}else if(k!==K.ARROW_LEFT&&k!==K.ARROW_RIGHT&&k!==K.BACKSPACE&&k!==K.DELETE&&k!==K.TAB){E.preventDefault();}};h.prototype._keyboardUpdateInput=function(i,D){var s=parseInt(i.getValue()),A=i.getId().slice(-1),m=this._inputsProperties[A].min,M=this._inputsProperties[A].max,j=this._inputsProperties[A].step;s+=D*j;if(s>M){s=M;}else if(s<m){s=m;}i.setValue(this._formatNumberToString(s,this._inputsProperties[A].prependZero,this._inputsProperties[A].max,""));};h.prototype._resetCooldown=function(s){if(this._typeCooldownId){clearTimeout(this._typeCooldownId);}if(s){this._startCooldown();}};h.prototype._startCooldown=function(){this._typeCooldownId=setTimeout(function(){var i=this.getAggregation("_inputs");this._kbdBuffer="";this._typeCooldownId=null;i&&i[this._activeInput]&&document.getElementById(i[this._activeInput].getId()+"-inner").select();}.bind(this),g);};h.prototype.setValue=function(v){var H=this._getHoursInput(),F=this._getValueFormatPattern(),i=F.indexOf("HH"),j=F.indexOf("H"),k=H&&H.getValue()==="24",m=T._isHoursValue24(v,i,j),D;if(k&&this._isFormatSupport24()&&!m){v=T._replaceZeroHoursWith24(v,i,j);}v=this.validateProperty("value",v);this.setProperty("value",v,true);if(v){D=this._parseValue(m?T._replace24HoursWithZero(v,i,j):v);}if(D){this._setTimeValues(D,m);}return this;};h.prototype._switchNextInput=function(w){var A=this._getActiveInput(),i=this.getAggregation("_inputs"),j=i.length,s=A;if(!i){return;}do{A++;if(A>=i.length){A=w?0:j-1;}}while(!i[A].getEnabled()&&A!==s&&(w||A<j-1));if(A!==s&&i[A].getEnabled()){this._switchInput(A);}};h.prototype.getTimeValues=function(){var H=this._getHoursInput(),m=this._getMinutesInput(),s=this._getSecondsInput(),F=this._getFormatButton(),i=null,A=null,D=new Date();if(H){i=parseInt(H.getValue());}if(F){A=F.getSelectedKey();}if(A==="am"&&i===12){i=0;}else if(A==="pm"&&i!==12){i+=12;}if(i!==null){D.setHours(i.toString());}if(m){D.setMinutes(m.getValue());}if(s){D.setSeconds(s.getValue());}return D;};h.prototype._getActiveInput=function(){return this._activeInput;};h.prototype._getActiveInputObject=function(){var A=this._getActiveInput(),i=this.getAggregation("_inputs");return i&&i[A]?i[A]:null;};h.prototype._setTimeValues=function(D,H){var o=this._getHoursInput(),m=this._getMinutesInput(),s=this._getSecondsInput(),F=this._getFormatButton(),v=this.getValueFormat(),i,A=null;D=D||new Date();if(Object.prototype.toString.call(D)!=="[object Date]"||isNaN(D)){throw new Error("Date must be a JavaScript date object; "+this);}if(!H){var V=this._formatValue(D,true);this.setProperty("value",V,true);i=D.getHours();}else{i=24;}if((v.indexOf("a")!==-1||v==="")&&F){A=i>=12?"pm":"am";i=(i>12)?i-12:i;i=(i===0?12:i);}o&&o.setValue(this._formatNumberToString(i,this._inputsProperties.H.prependZero,this._inputsProperties.H.max,""));m&&m.setValue(this._formatNumberToString(D.getMinutes(),this._inputsProperties.M.prependZero,this._inputsProperties.M.max,""));s&&s.setValue(this._formatNumberToString(D.getSeconds(),this._inputsProperties.S.prependZero,this._inputsProperties.S.max,""));F&&F.setSelectedKey(A);if(H){m&&m.setValue("00").setEnabled(false);s&&s.setValue("00").setEnabled(false);}else{m&&m.setEnabled(true);s&&s.setEnabled(true);}if(o){this._inputsProperties.H.value=i;}if(m){this._inputsProperties.M.value=m.getValue();}if(s){this._inputsProperties.S.value=s.getValue();}};h.prototype._getHoursInput=function(){var i=this.getAggregation("_inputs");return i&&this._inputIndexes&&i[this._inputIndexes.H]?i[this._inputIndexes.H]:null;};h.prototype._getMinutesInput=function(){var i=this.getAggregation("_inputs");return i&&this._inputIndexes&&i[this._inputIndexes.M]?i[this._inputIndexes.M]:null;};h.prototype._getSecondsInput=function(){var i=this.getAggregation("_inputs");return i&&this._inputIndexes&&i[this._inputIndexes.S]?i[this._inputIndexes.S]:null;};h.prototype._destroyControls=function(){this.destroyAggregation("_inputs");this.destroyAggregation("_buttonAmPm");};h.prototype._createControls=function(){var F=this._getDisplayFormatPattern(),i=this.getId(),j=this._isFormatSupport24(),s=this.getSupport2400(),k=0,m=0,n=0,o="",t=this.getAggregation("_texts"),M=0,p,r,u=0,H,P=false,v,w,x,V,D;this._inputIndexes={};this._inputsProperties={};if(F===undefined){return;}v=F.indexOf("HH");w=F.indexOf("H");if(!t){this.addAggregation("_texts",new b(i+"-textH",{text:this._oResourceBundle.getText("TIMEPICKER_INPUTS_ENTER_HOURS")}).toStatic());this.addAggregation("_texts",new b(i+"-textM",{text:this._oResourceBundle.getText("TIMEPICKER_INPUTS_ENTER_MINUTES")}).toStatic());this.addAggregation("_texts",new b(i+"-textS",{text:this._oResourceBundle.getText("TIMEPICKER_INPUTS_ENTER_SECONDS")}).toStatic());}if(v!==-1){H=true;P=true;p=(s)?24:23;}else if(w!==-1){H=true;p=(s)?24:23;}else if(F.indexOf("hh")!==-1){H=true;P=true;M=1;p=12;}else if(F.indexOf("h")!==-1){H=true;M=1;p=12;}if(H){this.addAggregation("_inputs",new I(i+"-inputH",{type:e.Number,tooltip:this._oResourceBundle.getText("TIMEPICKER_INPUTS_ENTER_HOURS"),textAlign:f.Center,width:"2.875rem",value:k,ariaLabelledBy:i+"-textH"}));this._inputsProperties.H={min:M,max:p,prependZero:P,step:1,value:k,format24:j};this._inputIndexes.H=u++;}if(F.indexOf("m")!==-1){P=F.indexOf("mm")!==-1;p=59;this.addAggregation("_inputs",new I(i+"-inputM",{type:e.Number,tooltip:this._oResourceBundle.getText("TIMEPICKER_INPUTS_ENTER_MINUTES"),textAlign:f.Center,width:"2.875rem",value:m,ariaLabelledBy:i+"-textM"}));this._inputsProperties.M={min:0,max:p,prependZero:P,step:this.getMinutesStep(),value:m};this._inputIndexes.M=u++;}if(F.indexOf("s")!==-1){P=F.indexOf("ss")!==-1;p=59;this.addAggregation("_inputs",new I(i+"-inputS",{type:e.Number,tooltip:this._oResourceBundle.getText("TIMEPICKER_INPUTS_ENTER_SECONDS"),textAlign:f.Center,width:"2.875rem",value:n,ariaLabelledBy:i+"-textS"}));this._inputsProperties.S={min:0,max:p,prependZero:P,step:this.getSecondsStep(),value:n};this._inputIndexes.S=u++;}if(F.indexOf("a")!==-1){this.setAggregation("_buttonAmPm",new S(i+"-format",{items:[new a({text:this._sAM,key:"am"}),new a({text:this._sPM,key:"pm"})],selectedKey:o,tooltip:this._oResourceBundle.getText("TIMEPICKER_AMPM_BUTTON_TOOLTIP")}));}r=this.getAggregation("_inputs");this._inputCount=r.length;this._switchInput(0);for(u=0;u<this._inputCount;u++){this._attachEvents(r[u]);}V=this.getValue();if(V){x=T._isHoursValue24(V,v,w);D=this._parseValue(x?T._replace24HoursWithZero(V,v,w):V);if(D){this._setTimeValues(D,x);}}};h.prototype._attachEvents=function(i){i.onfocusin=function(E){var s=E.currentTarget.id.slice(-1),j=this.getAggregation("_inputs");this._activeInput=this._inputIndexes[s];j[this._activeInput].addStyleClass("sapMFocus");document.getElementById(j[this._activeInput].getId()+"-inner").select();}.bind(this);i.onfocusout=function(E){var s=E.currentTarget.id.slice(-1),j=this.getAggregation("_inputs");if(this._inputsProperties[s].value===""){this._inputsProperties[s].value="00";j[this._activeInput].setValue("00");}else if(s!=="H"){j[this._activeInput].setValue(j[this._activeInput].getValue());}if(s==="H"&&!this._inputsProperties[s].format24&&parseInt(this._inputsProperties[s].value)===0){this._inputsProperties[s].value="12";j[this._activeInput].setValue("12");}j[this._activeInput].removeStyleClass("sapMFocus");this._lastActiveInput=this._activeInput;this._activeInput=-1;}.bind(this);i.attachLiveChange(function(E){var A=E.getParameter("id").slice(-1),v=E.getParameter("value");if(v!==this._inputsProperties[A].value.toString()){this._inputsProperties[A].value=v;this._kbdBuffer=v;}}.bind(this));};h.prototype._switchInput=function(i){var j=this.getAggregation("_inputs");if(i>=this._inputCount){i=0;}j[i].focus();this._activeInput=i;};h.prototype._handleHoursChange=function(v){var m=this._getMinutesInput(),s=this._getSecondsInput();if(!this.getSupport2400()){return;}if(v==="24"){if(m&&m.getEnabled()){this._sMinutes=m.getValue();m.setEnabled(false).setValue("00");}if(s&&s.getEnabled()){this._sSeconds=s.getValue();s.setEnabled(false).setValue("00");}this._getHoursInput().focus();return true;}else{if(m&&!m.getEnabled()){m.setEnabled(true).setValue(this._sMinutes);}if(s&&!s.getEnabled()){s.setEnabled(true).setValue(this._sSeconds);}this._getHoursInput().focus();return false;}};return h;});
