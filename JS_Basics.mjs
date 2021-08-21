/* 
    Description: This is a basic Javascript to learn Javascript fundamentals.
    Reference: 
        - https://ponyfoo.com/articles/where-does-this-keyword-come-from
*/

import { forEach } from "lodash-es"; // lodash-es is exported as ES module, so we need to use ES module as well

/*
    The .call, .apply, and .bind methods are used to manipulate function invocation, 
    helping us to define both the value for this, and the arguments provided to the function.
*/
class Robot {
    listOfNumbers = [1,2,3,5,7,9]
    friendList = [
        {
            name: 'Andrew',
            age: 24
        },
        {
            name: 'Lee',
            age: 23
        }
    ]
    actionRecord = {
        'sing': function() {
            console.log('twinkle twinkle little star')
        }
    }


    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    checkThis() {
        console.log(this) // this is point to Robot class
    }

    selfIntroduction() {
        console.log(`Hi! My name is ${this.name}, I am ${this.age} years old.`)
    }

    loopIntroduction() {
        this.listOfNumbers.forEach((value, index) => {
            console.log(`Hi! My name is ${this.name}, I am ${value} years old.`)
        })
    }

    introduceFriends() {
        forEach(this.friendList, function(value, key) {
            console.log(`My name is ${this.name}, I have a friend called ${value.name}, he is ${value.age} years old.`)
        }.bind(this)) // we need bind(this) here, so that the nested function has reference to the robot class
    }

    runAction(action) {
        if (Object.prototype.hasOwnProperty.call(this.actionRecord, action)) {
            this.actionRecord[action]()
        }
    }

    // Function.prototype.call takes any number of arguments, the first one is assigned to this, 
    // and the rest are passed as arguments to the function that’s being invoked.
    addFriend(friendObject) {
        Array.prototype.push.call(this.friendList, friendObject)
    }

    // Function.prototype.apply behaves very similarly to .call, 
    // but it takes the arguments as a single array with every value, instead of any number of parameter values.
    addFriendList(friendObjectList) {
        Array.prototype.push.apply(this.friendList, friendObjectList)
    }

}

  
const friday = new Robot('Friday', 5);
friday.checkThis()
friday.selfIntroduction()
friday.loopIntroduction()
friday.introduceFriends()
friday.runAction('sing')
const newFriend = {name:'Andy', age:20};
const newFriendList = [{name:'Jack', age:16}, {name:'Jay', age:35}]
friday.addFriend(newFriendList)
console.log('After adding friend')
friday.introduceFriends()
friday.addFriendList(newFriendList)
console.log('After adding friendlist')
friday.introduceFriends()