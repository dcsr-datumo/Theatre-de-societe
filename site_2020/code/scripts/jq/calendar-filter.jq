# keep only the bindings
.results.bindings | 
# build an array
[ 
    # iterate over the elements of the bindings array
    .[] | 
    # build dictionnary elements 
    { 
        # map `year` and `representations` property 
        year: .year.value, 
        representations: .representations.value
    } 
]