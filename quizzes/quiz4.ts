//QUIZ 4 

//What's the core idea behind classes? 
    //They are blueprints for JS objects 

//What's a class property? 
    //Basically a variable in a class 

//What's the idea of the private and public modifiers?
    //Private marks properties as 'not accessible from outside the class' 

//How can you shorten the following code in the best possible way?
    class Product {
        title: string; 
        price: number; 
        private isListed: boolean; 

        constructor(name: string, pr: number) {
            this.title = name; 
            this.price = pr; 
            this.isListed = true 
        }
    }

    //shorthand
        class Product2 {
            private isListed: boolean; 

            constructor(public title:string, public price: number) {
                this.isListed = true
            }
        }