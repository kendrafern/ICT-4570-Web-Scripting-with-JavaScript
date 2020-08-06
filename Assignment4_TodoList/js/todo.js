// Kendra Brauer
// ICT-4570-1 Webscripting with JavaScript
// Week 4 Assignment: 4D todo list
// js/todo.js

function createTodo() {
  var input = document.querySelector("#inputTodo").value;
  if (input === "") {
    document.querySelector("#message").innerHTML="<h4>Error: The message is blank!</h4>";
    setTimeout(function(){document.querySelector("#message").innerHTML=" "; }, 4000);
  } else {
    var listitem = document.createElement("li");
    document.querySelector("#todo-list").appendChild(listitem);
    var text = document.createTextNode(input);
    listitem.appendChild(text);
    document.querySelector("#todo-count").innerHTML = "Todo Count: " + document.querySelectorAll("#todo-list li").length;
  }
  clearForm();
}
function clearForm() {
  document.getElementById("myForm").reset();
}
