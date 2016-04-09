/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
function printPos(pos) {
  console.log('Latitude: ' + pos.coords.latitude);
  console.log('Longitude: ' + pos.coords.longitude);
}

navigator.geolocation.getCurrentPosition(printPos);

function printPos(pos) {
  console.log('Latitude: ' + pos.coords.latitude);
  console.log('Longitude: ' + pos.coords.longitude);
}

navigator.geolocation.getCurrentPosition(printPos, function(err) {
  console.warn('Error ' + err.code + ': ' + err.message);
});
var signinEvent = new CustomEvent('customerSignin', {
  'detail': {
    id: document.body.dataset.customerID,
  }
});

document.body.addEventListener('customerSignin', function eventHandler(e) {
  console.log('Customer ' + e.detail.id + ' signin time is: ' + e.timeStamp);
});

document.body.dispatchEvent(signinEvent);

var clicks = 0;
document.addEventListener('click', function register(e) {
  if (clicks < 10) {
    if (e.clientX > window.innerWidth / 2) {
      console.log(e.clientX, e.clientY);
      clicks += 1;
    }
  } else {
    document.removeEventListener('click', register);
  }
});

