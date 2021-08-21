function printX_var() {
    try {
        console.log('printX_var OUTPUT:', x); // << undefined
        var x=5; // function-scoped and supports hoisting
        console.log('printX_var OUTPUT:', x); // << 5
    }
    catch(err) {
        console.error('printX_var ERROR: ', err.message)
    }
}

printX_var()

function printX_let() {
    try {
        console.log('printX_let OUTPUT:', x);
        let x=5; // block-scoped and not affected by hoisting
        console.log('printX_let OUTPUT:', x);
    }
    catch(err) {
        console.error('printX_let ERROR: ', err.message)
        // << ReferenceError: Cannot access 'x' before initialization
    }
}

printX_let()

function printX_const() {
    try{
        console.log('printX_const OUTPUT:', x);
        const x=5; // block-scoped and not affected by hoisting
        console.log('printX_const OUTPUT:', x);
    }
    catch(err) {
        console.error('printX_const ERROR: ', err.message)
        // << ReferenceError: Cannot access 'x' before initialization
    }
}

printX_const()