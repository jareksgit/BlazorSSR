class MudWindow {
copyToClipboard (text) {
navigator.clipboard.writeText(text);
}
changeCssById (id, css) {
var element = document.getElementById(id);
if (element) {
element.className = css;
}
}
changeGlobalCssVariable (name, newValue) {
document.documentElement.style.setProperty(name, newValue);
}
// Needed as per https://stackoverflow.com/questions/62769031/how-can-i-open-a-new-window-without-using-js
open (args) {
window.open(args);
}
//scrolls to an Id. Useful for navigation to fragments
scrollToFragment (elementId, behavior) {
let element = document.getElementById(elementId);
if (element) {
element.scrollIntoView({ behavior, block: 'center', inline: 'start' });
}
}
//scrolls to year in MudDatePicker
scrollToYear (elementId, offset) {
let element = document.getElementById(elementId);
if (element) {
element.parentNode.scrollTop = element.offsetTop - element.parentNode.offsetTop - element.scrollHeight * 3;
}
}
// scrolls down or up in a select input
//increment is 1 if moving dow and -1 if moving up
//onEdges is a boolean. If true, it waits to reach the bottom or the top
//of the container to scroll.
scrollToListItem (elementId, increment, onEdges) {
let element = document.getElementById(elementId);
if (element) {
//this is the scroll container
let parent = element.parentElement;
//reset the scroll position when close the menu
if (increment == 0) {
parent.scrollTop = 0;
return;
}
//position of the elements relative to the screen, so we can compare
//one with the other
//e:element; p:parent of the element; For example:eBottom is the element bottom
let { bottom: eBottom, height: eHeight, top: eTop } = element.getBoundingClientRect();
let { bottom: pBottom, top: pTop } = parent.getBoundingClientRect();
if (
//if element reached bottom and direction is down
((pBottom - eBottom <= 0) && increment > 0)
//or element reached top and direction is up
|| ((eTop - pTop <= 0) && increment < 0)
// or scroll is not constrained to the Edges
|| !onEdges
) {
parent.scrollTop += eHeight * increment;
}
}
}
//scrolls to the selected element. Default is documentElement (i.e., html element)
scrollTo (selector, left, top, behavior) {
let element = document.querySelector(selector) || document.documentElement;
element.scrollTo({ left, top, behavior });
}
//locks the scroll of the selected element. Default is body
lockScroll (selector, lockclass) {
let element = document.querySelector(selector) || document.body;
element.classList.add(lockclass);
}
//unlocks the scroll. Default is body
unlockScroll (selector, lockclass) {
let element = document.querySelector(selector) || document.body;
element.classList.remove(lockclass);
}
};
window.mudWindow = new MudWindow();
class MudScrollManager {
//scrolls to an Id. Useful for navigation to fragments
scrollToFragment (elementId, behavior) {
let element = document.getElementById(elementId);
if (element) {
element.scrollIntoView({ behavior, block: 'center', inline: 'start' });
}
}
//scrolls to year in MudDatePicker
scrollToYear (elementId, offset) {
let element = document.getElementById(elementId);
if (element) {
element.parentNode.scrollTop = element.offsetTop - element.parentNode.offsetTop - element.scrollHeight * 3;
}
}
// scrolls down or up in a select input
//increment is 1 if moving dow and -1 if moving up
//onEdges is a boolean. If true, it waits to reach the bottom or the top
//of the container to scroll.
scrollToListItem (elementId, increment, onEdges) {
let element = document.getElementById(elementId);
if (element) {
//this is the scroll container
let parent = element.parentElement;
//reset the scroll position when close the menu
if (increment == 0) {
parent.scrollTop = 0;
return;
}
//position of the elements relative to the screen, so we can compare
//one with the other
//e:element; p:parent of the element; For example:eBottom is the element bottom
let { bottom: eBottom, height: eHeight, top: eTop } = element.getBoundingClientRect();
let { bottom: pBottom, top: pTop } = parent.getBoundingClientRect();
if (
//if element reached bottom and direction is down
((pBottom - eBottom <= 0) && increment > 0)
//or element reached top and direction is up
|| ((eTop - pTop <= 0) && increment < 0)
// or scroll is not constrained to the Edges
|| !onEdges
) {
parent.scrollTop += eHeight * increment;
}
}
}
//scrolls to the selected element. Default is documentElement (i.e., html element)
scrollTo (selector, left, top, behavior) {
let element = document.querySelector(selector) || document.documentElement;
element.scrollTo({ left, top, behavior });
}
//locks the scroll of the selected element. Default is body
lockScroll (selector, lockclass) {
let element = document.querySelector(selector) || document.body;
element.classList.add(lockclass);
}
//unlocks the scroll. Default is body
unlockScroll (selector, lockclass) {
let element = document.querySelector(selector) || document.body;
element.classList.remove(lockclass);
}
};
window.mudScrollManager = new MudScrollManager();
class MudElementReference {
constructor() {
this.listenerId = 0;
this.eventListeners = {};
}
focus (element) {
if (element)
{
element.focus();
}
}
focusFirst (element, skip = 0, min = 0) {
if (element)
{
let tabbables = getTabbableElements(element);
if (tabbables.length <= min)
element.focus();
else
tabbables[skip].focus();
}
}
focusLast (element, skip = 0, min = 0) {
if (element)
{
let tabbables = getTabbableElements(element);
if (tabbables.length <= min)
element.focus();
else
tabbables[tabbables.length - skip - 1].focus();
}
}
saveFocus (element) {
if (element)
{
element['mudblazor_savedFocus'] = document.activeElement;
}
}
restoreFocus (element) {
if (element)
{
let previous = element['mudblazor_savedFocus'];
delete element['mudblazor_savedFocus']
if (previous)
previous.focus();
}
}
selectRange(element, pos1, pos2) {
if (element)
{
if (element.createTextRange) {
let selRange = element.createTextRange();
selRange.collapse(true);
selRange.moveStart('character', pos1);
selRange.moveEnd('character', pos2);
selRange.select();
} else if (element.setSelectionRange) {
element.setSelectionRange(pos1, pos2);
} else if (element.selectionStart) {
element.selectionStart = pos1;
element.selectionEnd = pos2;
}
element.focus();
}
}
select(element) {
if (element)
{
element.select();
}
}
getBoundingClientRect (element) {
if (element)
{
return element.getBoundingClientRect();
}
else
{
return null;
}
}
changeCss (element, css) {
if (element)
{
element.className = css;
}
}
changeCssVariable (element, name, newValue) {
if (element)
{
element.style.setProperty(name, newValue);
}
}
addEventListener (element, dotnet, event, callback, spec, stopPropagation) {
let listener = function (e) {
const args = Array.from(spec, x => serializeParameter(e, x));
dotnet.invokeMethodAsync(callback, ...args);
if (stopPropagation) {
e.stopPropagation();
}
};
element.addEventListener(event, listener);
this.eventListeners[++this.listenerId] = listener;
return this.listenerId;
}
removeEventListener (element, event, eventId) {
element.removeEventListener(event, this.eventListeners[eventId]);
delete this.eventListeners[eventId];
}
};
window.mudElementRef = new MudElementReference();
window.getTabbableElements = (element) => {
return element.querySelectorAll(
"a[href]:not([tabindex='-1'])," +
"area[href]:not([tabindex='-1'])," +
"button:not([disabled]):not([tabindex='-1'])," +
"input:not([disabled]):not([tabindex='-1']):not([type='hidden'])," +
"select:not([disabled]):not([tabindex='-1'])," +
"textarea:not([disabled]):not([tabindex='-1'])," +
"iframe:not([tabindex='-1'])," +
"details:not([tabindex='-1'])," +
"[tabindex]:not([tabindex='-1'])," +
"[contentEditable=true]:not([tabindex='-1']"
);
};
//from: https://github.com/RemiBou/BrowserInterop
window.serializeParameter = (data, spec) => {
if (typeof data == "undefined" ||
data === null) {
return null;
}
if (typeof data === "number" ||
typeof data === "string" ||
typeof data == "boolean") {
return data;
}
let res = (Array.isArray(data)) ? [] : {};
if (!spec) {
spec = "*";
}
for (let i in data) {
let currentMember = data[i];
if (typeof currentMember === 'function' || currentMember === null) {
continue;
}
let currentMemberSpec;
if (spec != "*") {
currentMemberSpec = Array.isArray(data) ? spec : spec[i];
if (!currentMemberSpec) {
continue;
}
} else {
currentMemberSpec = "*"
}
if (typeof currentMember === 'object') {
if (Array.isArray(currentMember) || currentMember.length) {
res[i] = [];
for (let j = 0; j < currentMember.length; j++) {
const arrayItem = currentMember[j];
if (typeof arrayItem === 'object') {
res[i].push(this.serializeParameter(arrayItem, currentMemberSpec));
} else {
res[i].push(arrayItem);
}
}
} else {
//the browser provides some member (like plugins) as hash with index as key, if length == 0 we shall not convert it
if (currentMember.length === 0) {
res[i] = [];
} else {
res[i] = this.serializeParameter(currentMember, currentMemberSpec);
}
}
} else {
// string, number or boolean
if (currentMember === Infinity) { //inifity is not serialized by JSON.stringify
currentMember = "Infinity";
}
if (currentMember !== null) { //needed because the default json serializer in jsinterop serialize null values
res[i] = currentMember;
}
}
}
return res;
};
//Functions related to scroll events
class MudScrollListener {
constructor() {
this.throttleScrollHandlerId = -1;
}
// subscribe to throttled scroll event
listenForScroll(dotnetReference, selector) {
//if selector is null, attach to document
let element = selector
? document.querySelector(selector)
: document;
// add the event listener
element.addEventListener(
'scroll',
this.throttleScrollHandler.bind(this, dotnetReference),
false
);
}
// fire the event just once each 100 ms, **it's hardcoded**
throttleScrollHandler(dotnetReference, event) {
clearTimeout(this.throttleScrollHandlerId);
this.throttleScrollHandlerId = window.setTimeout(
this.scrollHandler.bind(this, dotnetReference, event),
100
);
}
// when scroll event is fired, pass this information to
// the RaiseOnScroll C# method of the ScrollListener
// We pass the scroll coordinates of the element and
// the boundingClientRect of the first child, because
// scrollTop of body is always 0. With this information,
// we can trigger C# events on different scroll situations
scrollHandler(dotnetReference, event) {
try {
let element = event.target;
//data to pass
let scrollTop = element.scrollTop;
let scrollHeight = element.scrollHeight;
let scrollWidth = element.scrollWidth;
let scrollLeft = element.scrollLeft;
let nodeName = element.nodeName;
//data to pass
let firstChild = element.firstElementChild;
let firstChildBoundingClientRect = firstChild.getBoundingClientRect();
//invoke C# method
dotnetReference.invokeMethodAsync('RaiseOnScroll', {
firstChildBoundingClientRect,
scrollLeft,
scrollTop,
scrollHeight,
scrollWidth,
nodeName,
});
} catch (error) {
console.log('[MudBlazor] Error in scrollHandler:', { error });
}
}
//remove event listener
cancelListener(selector) {
let element = selector
? document.querySelector(selector)
: document.documentElement;
element.removeEventListener('scroll', this.throttleScrollHandler);
}
};
window.mudScrollListener = new MudScrollListener();
class MudResizeListener {
constructor() {
this.logger = function (message) { };
this.options = {};
this.throttleResizeHandlerId = -1;
this.dotnet = undefined;
this.breakpoint = -1;
}
listenForResize (dotnetRef, options) {
if (this.dotnet) {
this.options = options;
return;
}
//this.logger("[MudBlazor] listenForResize:", { options, dotnetRef });
this.options = options;
this.dotnet = dotnetRef;
this.logger = options.enableLogging ? console.log : (message) => { };
this.logger(`[MudBlazor] Reporting resize events at rate of: ${(this.options || {}).reportRate || 100}ms`);
window.addEventListener("resize", this.throttleResizeHandler.bind(this), false);
if (!this.options.suppressInitEvent) {
this.resizeHandler();
}
this.breakpoint = this.getBreakpoint(window.innerWidth);
}
throttleResizeHandler () {
if (!this.options.notifyOnBreakpointOnly) {
clearTimeout(this.throttleResizeHandlerId);
//console.log("[MudBlazor] throttleResizeHandler ", {options:this.options});
this.throttleResizeHandlerId = window.setTimeout(this.resizeHandler.bind(this), ((this.options || {}).reportRate || 100));
} else {
let bp = this.getBreakpoint(window.innerWidth);
if (bp != this.breakpoint) {
this.resizeHandler();
this.breakpoint = bp;
}
}
}
resizeHandler () {
try {
//console.log("[MudBlazor] RaiseOnResized invoked");
this.dotnet.invokeMethodAsync('RaiseOnResized',
{
height: window.innerHeight,
width: window.innerWidth
}, this.getBreakpoint(window.innerWidth));
//this.logger("[MudBlazor] RaiseOnResized invoked");
} catch (error) {
this.logger("[MudBlazor] Error in resizeHandler:", { error });
}
}
cancelListener () {
this.dotnet = undefined;
//console.log("[MudBlazor] cancelListener");
window.removeEventListener("resize", this.throttleResizeHandler);
}
matchMedia (query) {
let m = window.matchMedia(query).matches;
//this.logger(`[MudBlazor] matchMedia "${query}": ${m}`);
return m;
}
getBrowserWindowSize () {
//this.logger("[MudBlazor] getBrowserWindowSize");
return {
height: window.innerHeight,
width: window.innerWidth
};
}
getBreakpoint (width) {
if (width >= this.options.breakpointDefinitions["Xl"])
return 4;
else if (width >= this.options.breakpointDefinitions["Lg"])
return 3;
else if (width >= this.options.breakpointDefinitions["Md"])
return 2;
else if (width >= this.options.breakpointDefinitions["Sm"])
return 1;
else //Xs
return 0;
}
};
window.mudResizeListener = new MudResizeListener();
