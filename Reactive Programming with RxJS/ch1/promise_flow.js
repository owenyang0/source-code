/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
var loading = false;
button.addEventListener('click', function(e) {
  if (!loading) {
    loading = true;
    setTimeout(2000, function() { loading = false; });

    var pContent1 = getRemote('/url1');//(1)

    var pContent2 = getRemote('/url2');
    var contents = Promise.all(pContent1, pContent2);//(2)

    contents
      .then(function(content1, content2) {//(3)
        var finalResult = computeFinalResult(content1, content2);
        return postResults(finalResult);//(4)
      })
      .then(function() {
        console.log('Results computed and stored successfully!');
      })
      .catch(function(err) {//(5)
        console.error(err);
      });
  }
});

