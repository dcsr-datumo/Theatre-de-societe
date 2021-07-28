# keep only the bindings
.results.bindings | 
# build an array
[ 
    # iterate over the elements of the bindings array
    .[] | 
    # build dictionnary elements 
    { 
        # map `id`, `familyName`, `givenName` and `pseudonym` from their `value` property 
        id: .id.value, 
        familyName: .familyName.value, 
        givenName: .givenName.value, 
        pseudonym: .pseudonym.value 
    } 
]