(function(global, $) {

  var Greetr = function(firstname, lastname, language) {
    return new Greetr.init(firstname, lastname, language);

    //in this way I don't have to always set up the object with the new keyword
  }

  //any object created from Greetr.init
  //will have access to this vairable
  //because of creating closure
  //but this variable is hidden from other developers to change it
  //unless comes to the code and change it
  //cos it's not bind to any method/object
  //it just sits here in the iife
  var supportedLangs = ['en', 'es'];

  //this are not exposed to the outside world until we decide the opposide
  //hidden from being accidentaly changed
  var greetings = {
    en: 'Hello',
    es: 'Hola'
  };

  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

  var logMessages = {
    en: 'Logged in',
    es: 'Inicio session'
  };

  //here we will put all the methods
  //this will be the prototype of all objects created form my function constructor
  //the methods here will be available and exposed to the outside world
  Greetr.prototype = {

    fullname: function() {
      return this.firstname + ' ' + this.lastname;
    },

    validate: function() {

      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      }

    },

    greeting: function() {
      return greetings[this.language]  + ' ' + this.firstname + '!';
    },

    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullname();
    },

    //each of the following methods are chainable
    //they return 'this' variable
    greet: function(formal) {
      var msg;

      //if undefined or null it will be coerced to false

      if(formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if(console) {
        console.log(msg);
      }

      //'this' refers to the calling object at execution time
      //makes the method chainable

      return this;

    },

    log: function() {
      if(console) {
        console.log(logMessages[this.language] + ':' + this.fullname());
      }
      return this;
    },

    setLang: function(lang) {
      this.language = lang;
      this.validate();

      return this;
    }

  };

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
