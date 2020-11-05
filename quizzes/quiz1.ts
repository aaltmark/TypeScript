//QUIZ 1
    //Why are "Types" useful and offer an advantage compare to vanilla JS?
        //Types allow you to detec errors early and avoid some runtime errors 
    
    //Will the following code throw a compilation error?
    let userName: string; 
    userName = 'Maximilian';
    userName = false; //YES - can't assign boolean 

//Does thiis code rely on type inference 
    const age: number = 29; //NO - a type is assigned explicitly 

//What's the difference between JS types (typeof 'Max' => 'string') and TS types (const name: string = '...')
    //TS types are checked during compilation, JS types during runtime 