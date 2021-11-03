const array = [1,2,34,5454,324];

const doubleArray = array.map(ele => ele * 2);

doubleArray


function mapFromArray(array, func){
    const mappedArray = [];
    for(const ele of array){
        const mappedEle = func(ele);
        mappedArray.push(mappedEle);
    }
    return mappedArray;
}
function filterFromArray(array, func){
    const filteredArray = [];
    for(const ele of array){
        if(func(ele)){
            filteredArray.push(ele);
        } 
    }
    return filteredArray;
}
console.log(mapFromArray(array, (ele) => ele ** 2))
console.log(filterFromArray(array, (ele) => ele > 2))

