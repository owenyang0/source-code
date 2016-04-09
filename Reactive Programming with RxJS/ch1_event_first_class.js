/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
button.addEventListener('click', function clickCallback(event) {
  console('Hello world');
}, false);

var retries = 0;
retrieveRemoteFile('/path/to/file', function _retrieveFile(err, contents) {
  if (err) {
    if (retries < 5) {
      retries += 1;
      retrieveRemoteFile('/path/to/file', _retrieveFile);
    } else {
      console.error('Could not retrieve the fileafter 5 attempts');
    }
  } else {
    retries = 0;
    console.log(contents);
  }
});
