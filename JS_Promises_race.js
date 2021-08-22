/*
    Description: A simple Javascript program to learn basic Javascript Promise.race
*/

function dataQueryB() {
    return new Promise((resolve, reject) => {
        try {
            console.log(`Getting data from Database B ...`)
            setTimeout(function () {
                console.log('dataQuery B Done')
                resolve([4, 5, 6, 7])
            }, 2000)
        } catch (err) {
            reject('dataQuery B Error: ', err)
        }
    })
}

function queryWithTimeout(queryPromise, timeoutMs, errorMessage = 'Query Timeout!') {
    let timeoutHandle
    timeoutPromise = new Promise((resolve, reject) => {
        timeoutHandle = setTimeout(() => reject(errorMessage), timeoutMs);
    })
    return Promise.race([queryPromise, timeoutPromise]).finally(
        () => clearTimeout(timeoutHandle) // remember to clear timeout
    )
}

// Using Promise.race to do a query timeout handling
queryWithTimeout(dataQueryB(), 8000).then(
    (res) => {
        console.log('Final Result: ', res)
    }
).catch(
    (err) => {
        console.log('Final Error: ', err)
    }
)