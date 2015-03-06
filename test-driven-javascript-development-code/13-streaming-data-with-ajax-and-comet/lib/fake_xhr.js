/*jslint indent: 2*/
/*globals stubFn*/
var fakeXMLHttpRequest = {
  open: stubFn(),
  send: stubFn(),

  setRequestHeader: function (header, value) {
    if (!this.headers) {
      this.headers = {};
    }

    this.headers[header] = value;
  },

  readyStateChange: function (readyState) {
    this.readyState = readyState;
    this.onreadystatechange();
  },

  complete: function (status, responseText) {
    this.status = status || 200;
    this.responseText = responseText;
    this.readyStateChange(4);
  }
};
