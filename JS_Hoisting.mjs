// .mjs code is automatically strict-mode, hence it will restrict unreferenced variables

try {
    x = 5;
    var x;
    console.log(x) // 5 // no error due to hoisting
    y = 10;
} catch (err) {
    console.error(`${err.name}: ${err.message}`) // ReferenceError: y is not defined
}

function hoistTest() {
    a = 15;
    let b = 50;
}
try {
    hoistTest();
} catch (err) {
    console.error(`${err.name}: ${err.message}`) // ReferenceError: a is not defined
}

try {
    console.log(b)
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
        let lessThan10 = false
    }
    return lessThan10
}
try {
    console.log(isLessThan10_let(2))
} catch (err) {
    console.error(`${err.name}: ${err.message}`) // ReferenceError: lessThan10 is not defined
}