// Assignment 2 Part 2 - Using a form
// Kendra Brauer
// Web Scripting with JavaScript ICT-4570-1
// assignment2_part2.js


function getarea() {
  var width = document.getElementById('width').value;
  var height = document.getElementById('height').value;
  var area = width * height;
  var perimeter = 2 * width + 2 * height;
  document.getElementById('area').innerHTML = "" + area;
  document.getElementById('perimeter').innerHTML = "" + perimeter;
}
