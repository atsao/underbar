(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
    /*
    // Expanded if-statement
    if (n === undefined) {
      return array[0];
    } else {
      return array.slice(0, n);
    }
    */
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    // n is number of elements
    if (n === undefined) {
      return array[array.length - 1];
    } else if (n === 0) {
      return [];
    } else if (n > array.length) {
      return array;
    } else {
      return array.slice(Math.abs(array.length - n)); // end omitted returns through end of array
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i <= collection.length - 1; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var k in collection) {
        // k = key
        // collection[k] = value
        iterator(collection[k], k, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1; // Sets default result

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        // Checking the item against the target and result as -1
        // means the target has not been found until now
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    /*
    var result = [];

    // Assuming collection is an array
    for (var i = 0; i <= collection.length - 1; i++) {
      if (test(collection[i])) {
        result.push(collection[i]);
      }
    }

    return result;
    */
    var result = [];

    _.each(collection, function(val) {
      if (test(val)) {
        result.push(val);
      }
    });

    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var result = [];

    for (var k = 0; k <= collection.length - 1; k++) {
      if (!test(collection[k])) {
        result.push(collection[k]);
      }
    }

    return result;
    /*
    // Using _.filter()

    return _.filter(collection, function (x) { return !test(x); });
    */
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result = [], i;
    
    for (i = 0; i <= array.length - 1; i ++) {
      if (!result.includes(array[i])) {
        result.push(array[i]);
      }
    }

    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result, i;

    if (Array.isArray(collection)) {
      result = [];
      for (i = 0; i <= collection.length - 1; i++) {
        result.push(iterator(collection[i]));
      }
    }

    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var start, i, k;

    if (Array.isArray(collection)) {
      if (accumulator != undefined) {
        start = 0;
      } else {
        start = 1;
        accumulator = collection[0];
      };
      for (i = start; i <= collection.length - 1; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
    } else {
      // Collection is an object, reduce values
      for (k in collection) {
        accumulator = iterator(accumulator, collection[k]);
      }
    }

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.

    return _.reduce(collection, function(wasTrue, item) {
      if (iterator) {
        return !!iterator(item) && wasTrue;
        // iterator(item) can return a truthy or falsy value (not always literal true or false)
        // !iterator(item) returns a true or false
        // If iterator(item) is falsy, !iterator(item) is true, but it's actually false
        // !! returns value I want
        // Example:  iterator(null) returns null, which is falsy but not 'false'
      } else {
        return item === true;
      }
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

    return _.reduce(collection, function(initialValue, item){
      if (!iterator) {
        iterator = function(x) {
          return x !== false;
        }
      }
      return !!iterator(item) || initialValue;
    }, false)
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var result = {}, a, k;

    if (arguments.length > 1) {
      result = obj;
      for (a = 1; a <= arguments.length - 1; a++) {
        for (k in arguments[a]) {
          result[k] = arguments[a][k];
        }
      }
    } else {
      return obj;
    }

    return result;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var result = {}, a, k, exists, r;

    if (arguments.length > 1) {
      result = obj;
      for (a = 1; a <= arguments.length - 1; a++) {
        for (k in arguments[a]) {
          if (!result.hasOwnProperty(k)) {
            result[k] = arguments[a][k];
          }
        }
      }
    } else {
      return obj;
    }

    return result;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var previousArguments = {};

    return function() {
      var key = Array.prototype.slice.call(arguments).join(',');
      if (previousArguments[key]) {
        return previousArguments[key];
      } else {
        previousArguments[key] = func.apply(this, arguments);
        return previousArguments[key];
      }
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = [], i;

    if (arguments.length > 2) {
      for (i = 2; i <= arguments.length - 1; i++) {
        args.push(arguments[i]);
      }
    }

    setTimeout(function() {
      func.apply(null, args)
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var result = array.slice(0);
    var currentIndex;
    var randIndex;
    var temp;

    // Fisher-Yates randomization method
    currentIndex = result.length;
    while (0 !== currentIndex) {
      randIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temp = result[currentIndex];
      result[currentIndex] = result[randIndex];
      result[randIndex] = temp;
    }

  /* How this works (using test case):
  result is a copy of array: [4, 5, 6]

  On first run:
  1. currentIndex = 3
  2. randIndex can either 0, 1, or 2
  3. currentIndex is decremented by 1, to 2 - last element in result array
  4. temp stores result[2], which is 6
  5. result[2] is replaced with result[randIndex]
  6. result[randIndex] is replaced with 6

  If randIndex = 2, result array is [4, 5, 6]
  If randIndex = 1, result array is [4, 6, 5]
  If randIndex = 0, result array is [6, 5, 4]

  On subsequent runs, the last position touched (result[2] in this case) is never touched again. The swapping happens for the remaining two positions.
  */

    return result;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    // use _.each to apply the function to each item in the collection
    return _.map(collection, function(element){
        var func;
      
        if (typeof functionOrKey === "string") {
          // Assume method/key
          func = element[functionOrKey];//function
        } else {
          // assume already declared function
          func = functionOrKey;//function being called
        }
      
      return func.apply(element, args);
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    return collection.sort(function(a, b) {
      if (typeof iterator === "string") {
        // Iterator is referencing a method by a string value
        // Compare the value of each object at key/iterator

        // If a > b, sort b at a lower index
        if (a[iterator] > b[iterator]) {
          return 1;
        }

        // If a < b, sort a at a lower index
        if (a[iterator] < b[iterator]) {
          return -1;
        }

        // Both a and b are equal
        return 0;
      } else {
        // Iterator is a function
        // Compare the return value of calling iterator on a and b
        
        if (iterator(a) > iterator(b)) {
          return 1;
        }

        if (iterator(a) < iterator(b)) {
          return -1;
        }

        return 0;
      }      
    });
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var zipElement = [];
    var zipArray = [];

    // Loop through the first argument array
    for (var i = 0; i < arguments[0].length; i++) {
      // For each zipped array element, initialize empty array
      zipElement = [];

      // Push the first argument array's element at position i to the zipped array element (subarray)
      zipElement.push(arguments[0][i]);

      // Loop through the remaining arguments
      for (var j = 1; j < arguments.length; j++) {
        // For each remaining argument j, push the element at position i (same as the first argument subarray)
        zipElement.push(arguments[j][i]);
      }

      // Push each zipped array element (subarray) to the final result array
      zipArray.push(zipElement);
    }

    return zipArray;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
     var results = [];
     var flattenArray = function(input) {
       if (Array.isArray(input)){
          for (var i = 0; i < input.length; i++) {
              flattenArray(input[i]); 
          }
       } else {
         results.push(input);
       }
     }
     flattenArray(nestedArray);
     return results;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var common = [];

    for (var i = 0; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        if (arguments[i + 1]) {
          for (var k = 0; k < arguments[i + 1].length; k++) {
            if (arguments[i][j] === arguments[i + 1][k]) {
              common.push(arguments[i][j]);
            }
          }
        }
      }
    }

    return common;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {

  };
}());
