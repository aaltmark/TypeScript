// QUIZ 3 

    // Will this code compile?
        function sendRequest(data:string, cb: (response: any) => void) {
            return cb({data: 'Hi there!'}); 
        }

        sendRequest('Send this!', (response) => {
            console.log(response); 
            return true; 
        })
            //YES - cb functions can return something 
            //even if the argument on which theyre passed does not expect a returned value 
    
    //What's the idea behind a 'function type'?
        //Function types define the parameters and return type of a function
    
    //Which code snippet is better? 
        //1 -- better cause it doesn't force you to return anything 
            function sayHi(): void {

            }
        
        //2 
            function sayHi(): undefined {

            }