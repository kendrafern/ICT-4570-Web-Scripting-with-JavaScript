// Kendra Brauer
// ICT-4570-1 Webscripting with JavaScript
// Week 4 Assignment: Drawing Rectangles in Top Form
// js/drawingRectangles.js

function getArea() {
  "use strict";
  var wid = window.document.getElementById('width').value;
  var hgt = window.document.getElementById('height').value;

  var area = wid * hgt;
  var perimeter = 2 * wid + 2 * hgt;
  window.document.getElementById('area').innerHTML = String(area);
  window.document.getElementById('perimeter').innerHTML = String(perimeter);
  return { wid: wid, hgt: hgt };
}

function drawArea(wid, hgt) {
  "use strict";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#0D0D0D';
  context.fillRect(0, 0, wid, hgt);
}

function getDrawArea(event) {
  var rdim;
  rdim=getArea();
  drawArea(rdim.wid,rdim.hgt);
}

var drag = false;
var rect = {};
var canvas;
var context;

function mouseup(e) {
  "use strict";
  drag = false;
  updateForm(rect.w, rect.h);
}

function mousedown(e) {
  "use strict";
  var offsets = getOffsetsB(e);
  rect.startX = offsets.offsetX;
  rect.startY = offsets.offsetY;
  drag = true;
}

function touchstart(e) {
  "use strict";
  e.preventDefault(); 
  mousedown(e);
}

function mousemove(e) {
  "use strict";
  var offsets;
  if (drag) {
    offsets = getOffsetsB(e);
    rect.w = offsets.offsetX - rect.startX;
    rect.h = offsets.offsetY - rect.startY;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#0D0D0D';
    context.fillRect(rect.startX, rect.startY, rect.w, rect.h);
    updateForm(rect.w, rect.h);
  }
}

function getOffsetsB(e) {
  var target, rect, style, bl,bt, result = { offsetX: 0, offsetY: 0};
  target = e.target || e.srcElement;
  style = target.currentStyle || window.getComputedStyle(target,null);
  bl = parseInt(style['borderLeftWidth'],10);
  bt = parseInt(style['borderTopWidth'],10);
  rect = target.getBoundingClientRect();
  if (e.clientX ) {
    result.offsetX = e.clientX - bl - rect.left;
    result.offsetY = e.clientY - bt - rect.top;
  } else if (e.touches) {
    result.offsetX = e.touches[0].clientX - bl - rect.left;
    result.offsetY = e.touches[0].clientY - bt - rect.top;
  } else if (e.touchlist ) {
    result.offsetX = e.touchlist[0].clientX - bl - rect.left;
    result.offsetY = e.touchlist[0].clientY - bt - rect.top;

  }
  return result;
}


function touchmove(e) {
  "use strict";
  e.preventDefault();
  if (! e.clientX) {
    if (e.touchlist) {
      e.clientX = e.touchlist[0].clientX;
      e.clientY = e.touchlist[0].clientY;
    } else if (e.touches) {
      e.clientX = e.touches[0].clientX;
      e.clientY = e.touches[0].clientY;
    }
  }
  mousemove(e);
}

function init() {
  "use strict";
  canvas = window.document.getElementById('drawing');
  context = canvas.getContext('2d');

  canvas.addEventListener('mousedown', mousedown);
  canvas.addEventListener('mouseup', mouseup);
  canvas.addEventListener('mousemove', mousemove);
  canvas.addEventListener('mouseout',mouseup);
  canvas.addEventListener('touchstart', touchstart);
  canvas.addEventListener('touchend', mouseup);
  canvas.addEventListener('touchmove', touchmove);
}
function updateForm(w, h) {
  "use strict";
  if (w < 0)
    w = -w;
  if (h < 0)
    h = -h;
  window.document.getElementById('width').value = w;
  window.document.getElementById('height').value = h;
  getArea();
}
window.document.body.onload = init;
window.document.getElementById('calculate').onclick = getDrawArea;
