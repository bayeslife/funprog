# Functional Programming Library  - Explanations

## Transforms
### Neighbors

Stream processing may not be an intuitive programming paradigm.  Most problems which are addressed only need to work with small data sets where it is possible to iterate over the set to compute an appropriate transformation.  With a large data set this is not possible.

The neighbors transform is created to produce a traditional bounded context from an (potentially) infinite stream.

The transform keeps track of a limited array of data from the stream and presents this along with a specific stream event back into the stream.  This makes it simply to use aggregate functions which expect a bounded set of data...such as average or standard deviation.

Imagine a stream
```
1 
2 
3 
4
5
...```

The neighbors(3) transform produces
```
data: 1 neighbors:[1,2,3]
data: 2 neighbors:[2,3,4]
data: 3 neighbors:[3,4,5]
```

You can then use the neighbors array to compare the nth value to its n to n+m neighbors.



