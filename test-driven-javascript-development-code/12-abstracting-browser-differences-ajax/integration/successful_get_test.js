/*jslint indent: 2, onevar: false, browser: true, eqeqeq: false, evil: true*/
/*globals tddjs*/
function startSuccessfulGetTest() {
  var output = document.getElementById("output");

  if (!output) {
    return;
  }

  function log(text) {
    if (output && typeof output.innerHTML != "undefined") {
      output.innerHTML += text;
    } else {
      document.write(text);
    }
  }

  try {
    if (tddjs.ajax && tddjs.ajax.get) {
      var id = new Date().getTime();

      tddjs.ajax.get("fragment.html?id=" + id, {
        success: function (xhr) {
          log(xhr.responseText);
        }
      });
    } else {
      log("Browser does not support tddjs.ajax.get");
    }
  } catch (e) {
    log("An exception occured: " + e.message);
  }
}
