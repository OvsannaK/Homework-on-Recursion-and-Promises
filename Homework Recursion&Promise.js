//PROMISES

// 1
// Create a function named myInterval, which takes two parameters, a callback function and an interval
// duration(milliseconds). After calling the myInterval function, the callback function must be executed
// every given interval duration.
// Note:
// Don’t use the setInterval method

function myInterval(callback, intervalDuration) {
  let id;

  function executeCb() {
    callback(), (id = setTimeout(executeCb, intervalDuration));
  }

  executeCb();

  function stopCb() {
    clearTimeout(id);
  }
  return stopCb;
}

const myCallback = function () {
  console.log("executed!");
};

const stopCallback = myInterval(myCallback, 1000);

setTimeout(() => {
  stopCallback();
}, 5000);

//2

// Create a function that takes in a single parameter and returns a new promise. Using setTimeout,
// after 500 milliseconds, the promise will either resolve or reject some value. If the parameter of the
// function is a string, the promise resolves with that same string uppercased. If the parameter of the
// function is anything but a string, it rejects with that same value.

function filter(param) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (typeof param === "string") {
        resolve(param.toUpperCase());
      } else {
        reject();
      }
    }, 500);
  });
}

filter("hello")
  .then((result) => {
    console.log("Resolved:", result);
  })
  .catch((error) => {
    console.error("Rejected:", error);
  });

filter(42)
  .then((result) => {
    console.log("Resolved:", result);
  })
  .catch((error) => {
    console.error("Rejected:", error);
  });

//3 Chi stacvum

//RECURSION

//1. Write a recursive function to determine whether all digits of the number are odd or not.

function areAllDigitsOdd(n) {
  if (n < 10) {
    return n % 2 !== 0;
  } else {
    if (n % 2 === 0) {
      return false;
    } else {
      // Recursively check the rest of the digits
      return areAllDigitsOdd(Math.floor(n / 10));
    }
  }
}

console.log(areAllDigitsOdd(4211133));
console.log(areAllDigitsOdd(7791));
console.log(areAllDigitsOdd(5));

//2. Given an array of numbers. Write a recursive function to find its minimal positive element

function findMinimalPositive(arr) {
  if (arr.length === 0) {
    return -1;
  }
  const positiveArr = arr.filter((num) => num >= 0);

  if (positiveArr.length === 0) {
    return -1;
  }

  if (positiveArr.length === 1) {
    return positiveArr[0];
  }

  const minimalPositive = findMinimalPositive(positiveArr.slice(1));
  return Math.min(positiveArr[0], minimalPositive);
}

console.log(findMinimalPositive([56, -9, 87, -23, 0, -105, 55, 1]));
console.log(findMinimalPositive([45, -9, 15, 5, -78]));
console.log(findMinimalPositive([-5, -9, -111, -1000, -7]));

// 3. Given an array of numbers which is almost sorted in ascending order. Find the index where sorting order is violate

function findSortingViolationIndex(arr, left = 0, right = arr.length - 1) {
  if (left >= right) {
    return -1;
  }

  // Calculate the middle index
  const mid = Math.floor((left + right) / 2);

  if (arr[mid] > arr[mid + 1]) {
    return mid;
  }

  if (arr[mid] < arr[mid - 1]) {
    return mid;
  }

  if (arr[mid] > arr[left] && arr[mid] < arr[right]) {
    return findSortingViolationIndex(arr, mid + 1, right);
  }

  if (arr[mid] < arr[left] && arr[mid] > arr[right]) {
    return findSortingViolationIndex(arr, left, mid - 1);
  }

  return -1;
}

console.log(findSortingViolationIndex([2, 12, 15, 48, 64]));
console.log(findSortingViolationIndex([-9, -4, -4, 3, 12, 4, 5]));

// 4. Given an array. Write a recursive function that removes the first element and returns the given array.

function removeFirstElement(arr) {
  let newArr = [];

  if (arr.length <= 1) {
    return [];
  }

  newArr = arr.splice(1);

  removeFirstElement(arr);
  return newArr;
}

console.log(removeFirstElement([6, 78, "n", 0, 1]));
console.log(removeFirstElement([5]));
console.log(removeFirstElement([]));

//5. Given an array of nested arrays. Write a recursive function that flattens it. (Hint create function that concats
// arrays).

function flatten(arr) {
  let result = [];

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(item);
    }
  });

  return result;
}

console.log(flatten([1, [3, 4, [1, 2]], 10]));
console.log(flatten([14, [1, [[[3, []]], 1], 0]]));

// 6. Given an array and a number N. ​ ​Write a recursive function that rotates an array N places to the left.
//  (​Hint:​ to add element to the beginning use ​arr.unshift()​)

function getSingleDigitSum(num) {
  if (num < 10) {
    return num;
  }

  const numStr = num.toString();

  let sum = 0;
  for (let i = 0; i < numStr.length; i++) {
    sum += parseInt(numStr[i]);
  }

  return getSingleDigitSum(sum);
}
console.log(getSingleDigitSum(14));
console.log(getSingleDigitSum(29));
console.log(getSingleDigitSum(999999999999));
