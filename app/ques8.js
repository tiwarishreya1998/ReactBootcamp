class Calculation{
    static addition(a,b){
        return a+b;
    }
    static subtraction(a,b){
        return a-b;
    }
    static multiply(a,b){
        return a*b;
    }
    static divide(a,b){
        return a/b;
    }
    
}
let sum=Calculation.addition(7,5);
let sub=Calculation.subtraction(7,5);
let mul=Calculation.multiply(7,5);
let div=Calculation.divide(7,5);
    
export{
    sum,sub,mul,div
};
    