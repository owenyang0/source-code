/*jslint indent: 2, onevar: false, plusplus: false, browser: true*/
/*globals console*/
function bench(func) {
  var start = new Date().getTime();

  for (var i = 0; i < 10000; i++) { 
    func();
  }

  console.log(func, new Date().getTime() - start);
}

var benchmarks = [
  function forLoop() { /* ... */ },
  function forLoopCachedLength() { /* ... */ }
  /* ... */
];

setTimeout(benchmarks.forEach.bind(benchmarks, bench), 500);
