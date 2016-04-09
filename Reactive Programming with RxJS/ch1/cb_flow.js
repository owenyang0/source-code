/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var disabled = false;
button.addEventListener('click', function(e) {
  if (!disabled) {
    disabled = true;//(1)
    setTimeout(2000, function() { disabled = false; });

    getRemote('/url1', function(err, content1) { //(2)
      if (err) { //(3)
        console.error(err);
        return;
      }
      getRemote('/url2', function(err, content2) {//(4)
        if (err) {
          console.error(err);
          return;
        }

        var finalResult = computeFinalResult(content1, content2);//(5)
        postResults('/storeResult', finalResult, function(err) {//(6)
          if (err) {
            console.error(err);
            return;
          }

          console.log('Results computed and stored successfully!');
        });
      });
    });
  }
});
