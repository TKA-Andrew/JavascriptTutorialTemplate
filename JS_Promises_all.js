/*
    Description: A simple Javascript program to learn basic Javascript Promise.all
*/

function dataQueryA() {
    return new Promise((resolve, reject) => {
        try {
            console.log(`Getting data from Database A ...`)
            setTimeout(function () {
                console.log('dataQuery A Done')
                resolve([1, 2, 3, 4])
            }, 1000)
        } catch (err) {
            reject('dataQuery A Error: ', err)
        }
    })
}

function dataQueryB() {
    return new Promise((resolve, reject) => {
        try {
            console.log(`Getting data from Database B ...`)
            setTimeout(function () {
                console.log('dataQuery B Done')
                resolve([4, 5, 6, 7])
            }, 4000)
        } catch (err) {
            reject('dataQuery B Error: ', err)
        }
    })
}

// Promise.all will wait for all promises to resolve
const processA = dataQueryA()
const processB = dataQueryB()
Promise.all([processA, processB]).then(
    ([res1, res2]) => {
        console.log('processA result: ', res1)
        console.log('processB result: ', res2)
    }
).catch(err=> console.error(err))