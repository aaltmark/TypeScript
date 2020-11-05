var button = document.querySelector("button");
var input1 = document.getElementById("num1"); //! indicates that we are sure we will find the element -- will never be null 
var input2 = document.getElementById("num2"); //indicates what kind of element we're finding
function add(num1, num2) {
    return num1 + num2;
}
button.addEventListener("click", function () {
    console.log(add(+input1.value, +input2.value)); //+ converts to num 
});
