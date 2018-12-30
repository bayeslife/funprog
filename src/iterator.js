
async function * makeAsyncRangeIterator (start = 0, end = Infinity, step = 1) {
    let iterationCount = 0
    for (let i = start; i < end; i += step) {
        iterationCount++
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(i)
            }, 10)
        })
    }
    return iterationCount
  }

function makeAsyncHasNextRangeIterator (start = 0, end = Infinity, step = 1) {
    let iterationCount = start
    return {
        hasNext: function () {
            return iterationCount < end
        },
        next: function () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(iterationCount++)
                }, 10)
            })
        }
    }
}

function makeArrayIterator (dataArray) {
    let iterationCount = 0
    return {
        hasNext: function () {
            return iterationCount < dataArray.length
        },
        next: function () {
            return dataArray[iterationCount++]
            }
        }
    }

export {
  makeArrayIterator,
  makeAsyncRangeIterator,
  makeAsyncHasNextRangeIterator
}
