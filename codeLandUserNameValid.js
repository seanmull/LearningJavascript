function CodeLandUserNameValidation(str){
    const regex  = /[A-Za-z][\w]{2,23}[^_\W]{1}$/gim;
    return regex.test(str); 

}

const str = "aads____ssdasdfdsfssdfdsfsffsfsfdsfsfsfsfasadadsasasdas";
console.log(CodeLandUserNameValidation(str));