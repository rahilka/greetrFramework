(function(global, $) {

  var Greetr = function(firstname, lastname, language) {
    return new Greetr.init(firstname, lastname, language);

    //in this way I don't have to always set up the object with the new keyword
  }


  //here we will put all the methods
  //this will be the prototype of all objects created form my function constructor
  Greetr.prototype = {};

  //create the function constructor
  Greetr.init = function(firstname, lastname, language) {

    var self = this;

    self.firstname = firstname || '';
    self.lastname = lastname || '';
    self.language = language || 'en';

  }

  //any object creted from Greetr.init function will point to Greetr.prototype
  Greetr.init.prototype = Greetr.prototype;

  //on the global object these two names, Greetr and G$, will point to Greetr function
  global.Greetr = global.G$ = Greetr;

}(window, jQuery));
