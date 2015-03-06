/*jslint indent: 2, onevar: false, browser: true, eqeqeq: false, plusplus: false, forin: true*/
var benchmark = (function () {
  var times;

  function init(name) {
    var heading = document.createElement("h2");
    heading.innerHTML = name;
    document.body.appendChild(heading);

    var ol = document.createElement("ol");
    document.body.appendChild(ol);

    return ol;
  }

  function runTests(tests, view, iterations) {
    for (var label in tests) {
      if (!tests.hasOwnProperty(label) ||
          typeof tests[label] != "function") {
        continue;
      }

      (function (name, test) {
        setTimeout(function () {
          var start = new Date().getTime();
          var l = iterations;

          if (!test.length) {
            while (l--) {
              test();
            }
          } else {
            test(l);
          }

          var total = new Date().getTime() - start;
          times[name] = total;

          var li = document.createElement("li");
          li.innerHTML = name + ": " + total +
            "ms (total), " + (total / iterations) +
            "ms (avg)";
          view.appendChild(li);
        }, 15);
      }(label, tests[label]));
    }
  }

  function highlightExtremes(view) {
    // The timeout is queued after all other timers, ensuring
    // that all tests are finished running and the times
    // object is populated
    setTimeout(function () {
      var min = new Date().getTime();
      var max = 0;
      var fastest, slowest;

      for (var label in times) {
        if (!times.hasOwnProperty(label)) {
          continue;
        }

        if (times[label] < min) {
          min = times[label];
          fastest = label;
        }

        if (times[label] > max) {
          max = times[label];
          slowest = label;
        }
      }

      var lis = view.getElementsByTagName("li");
      var fastRegexp = new RegExp("^" + fastest + ":");
      var slowRegexp = new RegExp("^" + slowest + ":");

      for (var i = 0, l = lis.length; i < l; i++) {
        if (slowRegexp.test(lis[i].innerHTML)) {
          lis[i].style.color = "#c00";
        }

        if (fastRegexp.test(lis[i].innerHTML)) {
          lis[i].style.color = "#0c0";
        }
      }
    }, 15);
  }

  function benchmark(name, tests, iterations) {
    iterations = iterations || 1000;
    times = {};
    var view = init(name);
    runTests(tests, view, iterations);
    highlightExtremes(view);
  }

  return benchmark;
}());
