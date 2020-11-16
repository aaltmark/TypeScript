//  QUIZ 8 

    // When can 'Generics' come in very handy?
        // In cases where you have a type that actually works together with multiple other possible types 
        // ex: an object which emits data of different types 
    
    // Would the following usage of a generic type make sense? 
        const data = extractData<string>(user, 'userId')
            // yes - extractData() probably returns different data based on the arguments you provide 
            // may have a utility method that doesn't care much about the data it operates on 
    
    // What's the idea behind constraints (consider generics)?
        // Constraints allow you to narrow down the concrete types that may be used in a general function 