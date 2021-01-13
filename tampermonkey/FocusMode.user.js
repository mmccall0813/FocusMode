// ==UserScript==
// @name         FocusMode
// @version      1.0.0
// @description  FocusMode is a web filter userscript designed to help you focus on what you need to get done (school, work, etc.) by blocking any websites that may be a distraction.
// @author       https://github.com/mmccall0813
// @include      *://*/*
// @exclude      *://localhost*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const enabled = false;
    // You need to set the blockedpage and serverLocation variables to the correct places before enabling the script
    const blockedpage = "http://localhost:3000/";
    const serverLocation = "localhost:8080"
    
    if(enabled){
    const socket = new WebSocket('ws://' + serverLocation);
    socket.addEventListener('open', function (event) {
    socket.send('{"type":"ask","website":"' + window.location.hostname + '"}');
});
    socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
    const dataJSON = JSON.parse(event.data);
    if(dataJSON.type == "filter"){
     if(dataJSON.response == "allow"){
      console.log("Website allowed by focusmode.")
      socket.close()
     }
     if(dataJSON.response == "disallow"){
     window.location.replace(blockedpage + "?disallowed-webpage=" + window.location.hostname + "&origin=" + window.location.href)
     }
    }
});
}})();