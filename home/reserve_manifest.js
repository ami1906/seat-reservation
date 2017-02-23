require("./../stylesheets/reserve.css");
var seatReserve = require('./../home/reserve.js');
window.m = require('mithril');
// DOM Complete code
if(document.addEventListener)
    document.addEventListener('readystatechange',executeOnDOMComplete);
else
    document.attachEvent("onreadystatechange",executeOnDOMComplete);

function executeOnDOMComplete(){
	if(document.readyState === "complete"){
        console.log('Document content loaded');
        m.mount(document.getElementById('seatsContainer'),seatReserve);
    }
	
}