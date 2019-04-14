import { not, identity, isEven, isGreaterThan, digitize, modulus, select } from './src/operators.js'

import { compose, asyncCompose, apply } from './src/functionalprogramming.js'

import { concat, latest } from './src/reducer.js'

import { transduceAsyncIterator, transduceAsyncHasNextIterator, transduceArray, transduceGenerator } from './src/transducer.js'

import { mapping, filtering, take, skip, eventing, sampling, passthrough, split, randomFilter, neighbors } from './src/transformer.js'

import { makeArrayIterator, makeAsyncRangeIterator, makeAsyncHasNextRangeIterator } from './src/iterator.js'

export default {

    not,
    identity,
    isEven,
    isGreaterThan,
    digitize,
    modulus,
    select,

    compose,
    asyncCompose,
    apply,

    concat,
    latest,

    transduceAsyncIterator,
    transduceAsyncHasNextIterator,
    transduceArray,
    transduceGenerator,

    mapping,
    filtering,
    take,
    skip,
    eventing,
    sampling,
    passthrough,
    split,
    randomFilter,
    neighbors,

    makeArrayIterator,
    makeAsyncRangeIterator,
    makeAsyncHasNextRangeIterator
}
