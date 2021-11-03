function isPrime(n){
    let numberToCheckRemainder = Math.ceil(Math.sqrt(n));
    while(numberToCheckRemainder >= 2){
        if(n % numberToCheckRemainder === 0) return false;
        numberToCheckRemainder--;
    }
    return true;
}


console.log(isPrime(12));