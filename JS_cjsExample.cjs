/* 
    Description: This should be used to compare with JS_mjsExample.mjs to observe the difference between CJS and MJS
*/

// import { forEach } from "lodash-es"; // lodash-es is exported as ES module, so we can't import it in cjs file
const { forEach } = require('lodash')


// test example
friendList = [
    {
        name: 'Andrew',
        age: 24
    },
    {
        name: 'Andy',
        age: 22
    }
] // CommonJS is not in strict mode by default, hence, there will be no ReferenceError without declaration
forEach(friendList, function(value, key) {
    console.log(value.name)
})