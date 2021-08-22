/*
    Description: A simple Javascript program to learn basic Javascript Promise
*/

function test_basicPromiseFunction(testError = false) {
    return new Promise((resolve, reject) => {
        try {
            console.log(`Resolving in 2 seconds ...`)
            setTimeout(function () {
                if (testError) {
                    reject('Dummy Error')
                }
                resolve('Resolved')
            }, 2000)
        } catch (err) {
            reject('Error: ', err)
        }
    })
}

test_basicPromiseFunction(testError = true).then(
    (response) => console.log('Response: ', response)
).catch(
    (error) => console.log('Error: ', error)
)