//QUIZ 2 ----- 
    //Which of the following snippets could be simplified by using an enum type?
        const ROLE_ADMIN = 0; 
        const ROLE_AUTHOR = 1;  
    
    //Will the following code throw a compilation error 
        type User = {name: string; age: number} 
        const u1 = User = ['Max', 29] //YES - wants an obj not an arr 
    
   //Will this code make it through compilation?
        type Product = {title: string; price: number;}
        const p1: Product = { title: 'A Book', price: 12.99, isListed: true } 
            //no - isListed is not a part of the 'Product' type 
    
    //Will this code make it through compilation?
        type User2 = { name: string } | string; 
        let u2: User2 = {name: 'Max'}
        u2 = 'Michael'; 
            //YES - can be a name or string 
