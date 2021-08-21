// .cjs code is not strict-mode by default, hence the undeclared variables are assigned the global scope by Javascript

try {
  x = 5;
  var x;
  console.log(x) // 5 // no error due to hoisting
  y = 10;
} catch (err) {
  console.error(`${err.name}: ${err.message}`)
}

function hoistTest() {
  a = 15;
  let b = 50; // let is block-scoped, hence it is not accessible outside
}
try {
  hoistTest();
} catch (err) {
  console.error(`${err.name}: ${err.message}`)
}

try {
  console.log(a); // 15
} catch (err) {
  console.error(`${err.name}: ${err.message}`)
}

try {
  console.log(b);
} catch (err) {
  console.error(`${err.name}: ${err.message}`) // ReferenceError: b is not defined
}

function isLessThan10_var(number) {
  if (number < 10) {
    var lessThan10 = true
  }
  return lessThan10
}

try {
  console.log(isLessThan10_var(2)) // true
  console.log(isLessThan10_var(12)) // undefined
} catch (err) {
  console.error(`${err.name}: ${err.message}`)
}

function isLessThan10_let(number) {
  if (number < 10) {
    let lessThan10 = false // let is block-scoped, hence it is not accessible outside
  }
  return lessThan10
}
try {
  console.log(isLessThan10_let(2))
} catch (err) {
  console.error(`${err.name}: ${err.message}`) // ReferenceError: lessThan10 is not defined
}
