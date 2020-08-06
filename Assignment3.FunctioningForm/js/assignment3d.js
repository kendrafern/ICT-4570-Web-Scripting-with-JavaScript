//////////////////////
// Kendra Brauer
// assignment3d.js
// Week 3: Assignment 3D - Functioning Form
//////////////////////

"use strict";
// Function to look up an HTML element by id and return the element
function getId(id) {
  return document.getElementById(id);
}
// Function which takes an array of numbers as a parameter
// and returns the sum
function sum(nums) {
  var sum = 0;
  nums.forEach(num => {
    sum += num;
  });
  return sum;
}
// Function to update item totals for each row
function updateRowTotals() {
  var rows, index, qty, price, total;
  rows = document.getElementsByClassName('item');
  for (index = 0; index < rows.length; index += 1) {
    qty = rows[index].getElementsByTagName('input')[0];
    price = rows[index].getElementsByTagName('output')[0];
    total = rows [index].getElementsByClassName('itemtotal')[0];
    if (total && qty && price) {
      total.value = (qty.value * price.value).toFixed(2);
    } else {
      console.log("Cannot find expected elements in row", qty, price, total);
    }
  }
}
// Function to update entire order total
// and place it in the order total output element
function updateOrderTotal () {
  updateBreadTotal();
  updatePastryTotal();
  updateGrandTotal();
}
function updateTotalByClassName (outputID, className) {
  var items = document.getElementsByClassName(className);
  var values = [];
  var ind;
  for (ind = 0; ind < items.length; ind += 1) {
    values[ind] = Number(items[ind].value);
  }
  getId(outputID).value = Number(sum(values)).toFixed(2);
  return sum(values);
}
function updateBreadTotal() {
  return updateTotalByClassName("breadTotal", "itemtotal bread");
}
function updatePastryTotal() {
  return updateTotalByClassName("pastryTotal", "itemtotal pastry");
}
function updateGrandTotal() {
  return updateTotalByClassName("grandTotal", "itemtotal");
}
// Function to compute percentage of the spree budget
// accounted for
// (100 * order_total / budget)
function computePercentage (orderTotal, budget) {
  return 100 * orderTotal / budget;
}
// Function(s) to check for error conditions and post messages
// message area id: messages
//   Check for error: blank name in order data
//   Check for order total greater than spree budget
//   Check for error: baked good cost less than pastry cost
function checkErrors(areaId) {
  // Add the three checks. Post errors via postMessage(msg,areaId)
  if (!getId('name').value.trim()) {
    postMessage("Name must not be blank", areaId);
  }
  if (Number(getId('grandTotal').value) > spreeTotal) {
    postMessage("Spree amount exceeded", areaId);
  }
  if (Number(getId('breadTotal').value) < Number(getId('pastryTotal').value)) {
    postMessage("Bread total must exceed pastry total", areaId);
  }
}
function postMessage(message, areaId) {
  getId(areaId).innerHTML = message;
}
function clearMessages(areaId) {
  getId(areaId).innerHTML = "";
}
function updateSpreePercentage() {
  // Update the spree percentage (id for output "percent").
  // Note: Use computePercentage on the values in grandTotal and spreeTotal
  getId('percent').value = (100 - computePercentage(getId('grandTotal').value, spreeTotal)).toFixed(2) + "%";
}
function updateSpreeBudget() {
  // Compute and update the remaining dollar budget (id for output "dollars")
  // Subtract the spreeTotal from the value in grandTotal
  getId('dollars').value = "$" + (spreeTotal - getId('grandTotal').value).toFixed(2);
}
// Function to react to button click by calling the functions that:
//   Clear error message area
//   Total each row of the order
//   Total the bakery and pastry subtotals
//   Total the order
//   Check for errors (and post their messages if any)
//   Update percentage of spree budget accounted for
//   Update amount remaining of spree budget (might be negative)
function handleButtonClick() {
  clearMessages("message");
  updateRowTotals();
  updateOrderTotal();
  checkErrors("message");
  updateSpreePercentage();
  updateSpreeBudget();
}
// Statement to attach button click function to button
// after the page is loaded
function init() {
  var date = new Date();
  getId('spree').value = spreeTotal.toFixed(2);
  getId('calculate').onclick = handleButtonClick;
  getId('date').value = toISODate(date);
}
var spreeTotal = 20;
window.onload = init;
// Function to convert a date object to a local ISO8610 date string
function toISODate(date) { // yyyy-mm-dd
  "use strict";
  var yyyy, mm, dd;
  // JavaScript provides no simple way to format a date-only
  yyyy = "" + date.getFullYear();
  mm = date.getMonth() + 1; // Months go from 0 .. 11
  dd = date.getDate();
  // Need leading zeroes to form the yyyy-mm-dd pattern.
  if (mm < 10) {
    mm = "0" + mm; // This converts it to a string
  }
  if (dd < 10) {
    dd = "0" + dd; // This converts it to a string
  }
  return "" + yyyy + "-" + mm + "-" + dd;
}
