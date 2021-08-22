/* 
    Description: A Javascript template to demonstrate how to handle Asynchronous programming with Javascript.
    In fact, the things that make Javascript non-blocking are not part of Javascript engine, 
    they are part of the browser's or node.js's runtime envinronment.
    Reference: https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff
*/

class DatabaseClient {
    constructor(dataConnectionInfo) {
        this.dataConnectionInfo = dataConnectionInfo
    }

    connect() {
        return new Promise((resolve, reject) => {
            try {
                console.log(`connecting ...`)
                console.log(`>> host: ${this.dataConnectionInfo.host}`)
                console.log(`>> database: ${this.dataConnectionInfo.database}`)
                console.log(`>> user: ${this.dataConnectionInfo.user}`)
                console.log(`>> password: ${this.dataConnectionInfo.password}`)
                setTimeout(function () {
                    resolve()
                }, 2000)
            } catch (err) {
                reject(err)
            }
        })
    }

    query(queryString, callback) {
        return new Promise((resolve, reject) => {
            try {
                console.log('querying data ...')
                setTimeout(function () {
                    const dummyResult = [{
                        name: 'Jack',
                        age: '81',
                        subscription_fee: 100
                    }, {
                        name: 'John',
                        age: '87',
                        subscription_fee: 200
                    }]
                    resolve(callback(null, dummyResult))
                }, 1500)
            } catch {
                const dummyError = new Error('Failed to query data.')
                reject(callback(dummyError))
            }
        })
    }

    disconnect() {
        return new Promise((resolve, reject) => {
            try {
                console.log(`disconnecting ...`)
                setTimeout(function () {
                    resolve()
                }, 1000)
            } catch (err) {
                reject(err)
            }
        })
    }
}

class DataQueryRunner {
    constructor(dataConnectionInfo, queryString, action) {
        this.client = new DatabaseClient(dataConnectionInfo)
        this.queryString = queryString
        this.action = action
    }

    run_unhandledAsynchronouseBehaviour() {
        this.connectClient()
        const dataCollection = this.queryData_promise()
        this.disconnectClient()
        return this.processData(dataCollection)
    }

    // for code tidiness purpose
    throwError(err) {
        throw err
    }

    run_usingPromise() {
        return new Promise((resolve, reject) => {
            this.connectClient_promise().then(
                () => {
                    this.queryData_promise().then(
                        (dataCollection) => {
                            this.disconnectClient()
                            resolve(this.processData(dataCollection))
                        }
                    ).catch(err =>
                        reject(err)
                    )
                }
            ).catch(err =>
                reject(err)
            )
        })
    }

    async run_usingAwait() {
        // doesnt need to catch error if the outside function does catch it
        await this.connectClient_async()
        // promise is used because catching exceptions in Javascript callbacks is difficult
        const dataCollection = await this.queryData_promise()
        this.disconnectClient() //optional await here
        return this.processData(dataCollection)
    }

    connectClient() {
        this.client.connect().then(
            () => console.log('CONNECTED')
        )
    }

    connectClient_promise() {
        return new Promise((resolve, reject) => {
            this.client.connect().then(
                () => {
                    console.log('CONNECTED')
                    resolve()
                })
        })
    }

    async connectClient_async() {
        await this.client.connect().then(
            () => console.log('CONNECTED')
        )
    }

    queryData_promise() {
        return new Promise((resolve, reject) => {
            this.client.query(this.queryString, function (err, res) {
                if (err) {
                    reject(err)
                }
                if (res) {
                    console.log('dataCollection: ', res)
                    resolve(res)
                }
            })
        })
    }

    processData(dataCollection) {
        try {
            console.log('processing data ...')
            const processedData = []
            dataCollection.forEach(dataObject => {
                if (this.action === 'add50') {
                    dataObject.subscription_fee += 50
                } else if (this.action === 'minus100') {
                    dataObject.subscription_fee -= 100
                }
                processedData.push(dataObject)
            })
            return processedData
        } catch (err) {
            throw err
        }

    }

    disconnectClient() {
        this.client.disconnect().then(
            () =>  console.log('DISCONNECTED')
        )
    }
}

const dataConnectionInfo = {
    host: 'localhost',
    database: 'project123',
    user: 'admin',
    password: '123',
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
}

const runner = new DataQueryRunner(dataConnectionInfo, 'select * from userinfo where age > 80', 'minus100')
// RUN ONE TEST AT A TIME TO AVOID CONFUSION
// TEST 1 - observe how Javascript behaviour asynchronously when dealing with promises, async functions or timeout
try {
    runner.run_unhandledAsynchronouseBehaviour()
} catch (err) {
    console.error(`run_unhandledAsynchronouseBehaviour ERROR: ${err.message}`)
}

// TEST 2 - observe how promises can be handled so that the asynchronous behaviour is under control
runner.run_usingPromise().then(
    (finalResult) => {
        console.log('finalResult run_usingPromise: ', finalResult)
    }
).catch(err => {
    console.error(`run_usingPromise ERROR: ${err.message}`)
})

// TEST 3 - observe how async/await can be handled so that the asynchronous behaviour is under control
async function run_usingAwait() {
    try {
        await runner.run_usingAwait().then(
            (finalResult) => {
                console.log('finalResult run_usingAwait: ', finalResult)
            }
        )
    } catch (err) {
        console.error(`run_usingAwait ERROR: ${err.message}`)
    }
}

run_usingAwait()