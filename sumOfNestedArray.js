const array = [1, 1, 1, [3, 4, [8]], 5];

function sumOfNestedArray(array, sum) {
    for (const ele of array) {
        if (Array.isArray(ele)) {
            sum = sumOfNestedArray(ele, sum);
        } else {
            sum += ele;
        }
        sum
    }
    return sum;
}

console.log(sumOfNestedArray(array, 0));