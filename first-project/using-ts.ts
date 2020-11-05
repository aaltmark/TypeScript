const button = document.querySelector("button");
const input1 = document.getElementById("num1")!; //! indicates that we are sure we will find the element -- will never be null 
const input2 = document.getElementById("num2")! as HTMLInputElement; //indicates what kind of element we're finding

function add(num1: number, num2: number) { //says both args will be numbers
  return num1 + num2; 
}

button.addEventListener("click", function() {
  console.log(add(+input1.value, +input2.value)); //+ converts to num 
});