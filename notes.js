// What is TypeScript?
    // A JavaScript Superset - builds on JS 
    // Can't be executed on browsers on node 
    // Compiler that runs over code to convert to JavaScript 
        // creates JS workarounds 

// Why use TypeScript 
    //simple js function adding 2 # together 
        function add(num1, num2) {
            return num1 + num2; 
        }
    // if you call it with two strings 
        console.log(add('2', '3')); //you'd get unwanted behavior (JS would concat)
            //could set if statement to validate input as numbers 
    // TypeScript 
        // tool that helps with better code
        functiion add(num1: number, num2: number) {
            return num1 + num2; 
        }

// Terminal 
        tsc file-name.ts //to run file -- creates js file  

// TypeScript Adds 
    // Types 
    // Next-gen JavaScript Features 
    // Non-JavaScript Features - Interfaces and Generics 
    // Meta-Programming Features - Decorators 
    // Rich Configuration Options 
    // Modern Tooling that helps even in non-TypeScript Projects 
