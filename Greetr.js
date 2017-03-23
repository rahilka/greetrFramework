;(function(global, $) {

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
  //hidden within the scope of the IIFE and never directly accessible

  //this are not exposed to the outside world until we decide the opposide
  //hidden from being accidentaly changed
  //informal greetings
  var greetings = {
    en: 'Hello',
    es: 'Hola'
  };

  //formal greetings
  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

  //logger messages
  var logMessages = {
    en: 'Logged in',
    es: 'Inicio session'
  };

  //here we will put all the methods
  //this will be the prototype of all objects created form my function constructor
  //the methods here will be available and exposed to the outside world

  //prototype holds methods (to save memory space)
  Greetr.prototype = {

    //'this' refers to the calling object at execution time
    fullname: function() {
      return this.firstname + ' ' + this.lastname;
    },

    validate: function() {
      //check that is a valid language
      //references the externally inaccessible 'supportedLangs' within the closure
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      }

    },

    //retrieve messages from object by reffering to properties using [] syntax
    greeting: function() {
      return greetings[this.language]  + ' ' + this.firstname + '!';
    },

    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullname();
    },

    //each of the following methods are chainable
    //they return 'this' variable

    //chainable methods return their own containing object!!!
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
      //make chainable
      return this;
    },

    setLang: function(lang) {

      //set the language
      this.language = lang;

      //validate
      this.validate();

      //make chainable
      return this;
    },

    HTMLGreeting: function(selector, formal) {
      if(!$) {
        throw 'jQuery not loaded';
      }

      if(!selector) {
        throw 'Missing jQuery selector';
      }

      //determine the message
      var msg;
      if(formal) {
        msg = this.formalGreeting();
      }
      else {
        msg = this.greeting();
      }

      //inject the message in the chosen place in the dom
      $(selector).html(msg);

      //making it chainable:
      return this;
    }

  };

  //create the function constructor

  //the actual object is created here,
  //allowing us to 'new' an object without calling 'new'
  Greetr.init = function(firstname, lastname, language) {

    var self = this;
    self.firstname = firstname || '';
    self.lastname = lastname || '';
    self.language = language || 'en';

    self.validate();

  }

  //any object creted from Greetr.init function will point to Greetr.prototype

  //trick borrowed from jQuery so we don't have to use the 'new' keyword
  Greetr.init.prototype = Greetr.prototype;

  //on the global object these two names, Greetr and G$, will point to Greetr function

  //attach out Greetr to our global object
  //and provide a shorthand '$G'
  //for ease our poor fingers
  global.Greetr = global.G$ = Greetr;

}(window, jQuery));
