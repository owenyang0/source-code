/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
function getFileContents(path) {
  if (!fs.existsSync(path)) {
    return '';
  }
  return fs.readFileSync(file);
}

console.log(getFileContents('/etc/passwd'));


function getFileContents(path, callback) {
  fs.exists(path, function(err, exists) {
    if (err || !exists) {
      return callback(new Error('There was a problem retrieving the file'));
    }

    fs.readFile(function(err, contents) {
      if (err) {
        return callback(new Error('There was a problem reading the file'));
      }

      callback(null, contents);
    });
  });
}

getFileContents('/etc/passwd', function(err, contents) {
  console.log(contents);
});

// Don't use try/catch with asynchronous code!
try {
  getFileContents('/etc/passwd', function(err, contents) {
    console.log(contents);
  });
} catch (e) {
  console.error('There was an error retrieving the contents!');
}
getFileContents('/etc/passwd', function(err, contents) {
  if (err) {
    return console.error('There was an error retrieving the file contents!');
  }
  console.log(contents);
});
getFileContents('/etc/passwd', function(err, contents) {
  if (err) {
    console.error('There was an error retrieving the contents!');
  }
  doSomethingWithFile(null, contents);
});

function getFileContents(url) {
  return asyncGetFile(url).then(asyncReadFile);
}

var contentPromise = getFileContents('http://example.com/big_file.txt');

contentPromise.then(
  function success(content) {
    console.log(content);
  }, function error(e) {
    console.error('There was an error retrieving the file', e);
  }
);
