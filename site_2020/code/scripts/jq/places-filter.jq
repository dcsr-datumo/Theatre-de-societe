
# keep only the bindings
.results.bindings | 
# build an array
[ 
    # iterate over the elements of the bindings array
    .[] | 
    # build dictionnary elements 
    { 
        # map `id`, `title` and `name` from their `value` property 
        id: .id.value, 
        name: .name.value, 
        coord: .coord.value, 
        notice: .notice.value 
    } 
]