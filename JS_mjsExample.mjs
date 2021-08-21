/* 
    Description: This should be used to compare with JS_cjsExample.cjs to observe the difference between CJS and MJS
*/

// const { forEach } = require('lodash') // lodash is exported as CJS module, so we can't do Named Import it in mjs file
import _ from 'lodash'; // However, we can do Default Import from CJS module
import { forEach } from 'lodash-es' // With Named Import, we can import the specific module from the package

// test example1
let friendList = [
    {
        name: 'Andrew',
        age: 24
    },
    {
        name: 'Andy',
        age: 22
    }
] // ES6 is automatically strict-mode, hence, there will be ReferenceError if without the "let"
_.forEach(friendList, function(value, key) {
    console.log(value.name)
})

// test example2
let friendList2 = [
    {
        name: 'Jack',
        age: 24
    },
    {
        name: 'Jay',
        age: 22
    }
]
forEach(friendList2, function(value, key) {
    console.log(value.name)
})