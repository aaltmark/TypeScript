// QUIZ 7 

    // What's a 'Type Guard'?
        // A code pattern where you check for a certain type before you try to do something with it at runtime 
    
    // Which of the following type guars would ensure that you get NO runtime error? 
        function size(input: string | number){
            if (typeof input === 'string') {
                return input.length
            }
            return input
        }
    
    // In which cases is type casting helpful?
        // You want to inform TS that a certain value is of a specific type 