var sum_to_n_a = function(n) {
    var sum = 0;
    for (let counter = 1; counter <= n; counter++) {
        sum += counter;
    }
    return sum;
};

var sum_to_n_b = function(n) {
    var sum = 0;
    var counter = 1;
    while (counter <= n) {
        sum += counter;
        counter ++;
    }
    return sum;
};

var sum_to_n_c = function(n) {
    if (n <= 1){
        return n
    }
   return n + sum_to_n_c(n-1);
};


//Test Cases
console.log(sum_to_n_a(5));
console.log(sum_to_n_a(8));
console.log(sum_to_n_b(5));
console.log(sum_to_n_b(8));
console.log(sum_to_n_c(5));
console.log(sum_to_n_c(8));