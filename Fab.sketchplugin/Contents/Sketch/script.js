const fab = require("../Resources/Fab.framework/Resources/fab-script.js")

var handleStartup = function(context) {
  
  try {
    
      // Register buttons on startup.
      // Pass in the settings for the button and the context
      // Only *required* parameter is `identifier`, which you will use later to retrieve this button
    
    
    fab.registerButton({
      identifier : "sayHelloButton",
      action : "sayHello",
      title : "👋",
      backgroundColor : "rgba(255,45,45,0.6)",
      borderColor: NSColor.systemRedColor(),
      borderWidth: 1,
      titleColor : NSColor.whiteColor(),
      cornerRadius : 6, // or "round"
      horizontalPadding : 6,
      verticalPadding : 8
    }, context);
    
      // You can add multiple buttons:
    fab.registerButton({
      identifier : "countUpButton",
      action : "countUp",
      title: "👍🏽",
      backgroundColor : "#FFCC00",
      titleColor : NSColor.blackColor(),
      cornerRadius : "round",
      horizontalPadding : 8,
      verticalPadding : 8
    }, context);
    
    // Another example button with an image and shadow
    fab.registerButton({
      identifier : "toggleDarkModeButton",
      action : "toggleDarkMode",
      image : "images/moon.circle@2x.png",
      imageIsTemplate : true, // template images adjust light or dark fill based on appearance
      title : "Toggle Appearance",
      cornerRadius : 6,
      horizontalPadding : 6,
      verticalPadding : 8,
      buttonShadow : {
        color : "rgba(0,0,0,0.3)",
        offsetX : 0,
        offsetY : 1,
        blur : 2
      }
    }, context);
    
  } catch (e) {
    NSLog("[Fab] Error regsitering buttons: %@", e);
  }
}

var prepareFabForDisplay = function(context) {
  
  // You can setup a command to be called before a button is displayed in a newly opened document
  // Use this method to update the state of the button if required
  const button = context.fab;
  if(button && button.buttonID() == "toggleDarkModeButton") {
    const isDarkMode = NSApp.effectiveAppearance().name() == "NSAppearanceNameDarkAqua"
    button.image = isDarkMode ? "images/sun.max@2x.png" : "images/moon.circle@2x.png"
    button.imageIsTemplate = true;
    button.title = isDarkMode ? "Go Light" : "Go Dark"
  }
  
}

var handleToggleDarkMode = function(context) {
  
  // Toggle dark theme
  const theme = MSTheme.sharedTheme()
  const darkModeScheme = theme.darkModeScheme() == 0 ? 1 : 0;
  
  MSTheme.setupAppearance()
  theme.setDarkModeScheme(darkModeScheme)
  theme.updateIsDark()
  AppController.sharedInstance().refreshDocumentColors()
  
  const isDarkMode = darkModeScheme == 1;
  
  // update the fab
  const button = context.fab || fab.buttonWithID("toggleDarkModeButton", context);
  if(button) { // triggered via Fab
    button.image = isDarkMode ? "images/sun.max@2x.png" : "images/moon.circle@2x.png"
    button.title = isDarkMode ? "Go Light" : "Go Dark"
  }
}

var handleSayHello = function(context) {
  
    // An example function called when the button is clicked.
    // You can configure the button to call a different function
    // by defining a different command in the manifest
  
    // the context object contains a reference to the button that triggered this action
  const button = context.fab;
  
  if(button) { // triggered via Fab
    
    context.document.showMessage(button.title() + " from FAB!")
    
    const salutations = ["Hey", "Hola", "Salut", "Olá", "你好"]
    button.title = "👋 " + salutations[Math.floor(Math.random() * salutations.length)];
  }
  else {
    context.document.showMessage("Hello from FAB!")
  }
  
}

var handleCountUp = function(context) {
  
    // This is an example of triggering a command which is not
    // included in the plugins menu
  
    // You can store arbitrary data associated with a Fab
    // The data is persisted until the document or Application is closed
  const button = context.fab;
  if(button) { // triggered via Fab
    
    let count = button.userInfo().clickCount || 1;
    context.document.showMessage("Liked " + count + " times")
    
    button.title = count + " 👍🏽"
    button.userInfo().setObject_forKey(++count, "clickCount")
    
  }
}

var handleUpdateHelloButton = function(context) {
  
    // this example shows how to independently retrieve and update a Fab
  
  const button = fab.buttonWithID("sayHelloButton", context)
    // optionally you can also use the fab.buttonWithID_inDocument function
    // to retrieve a button from a specific document
  
    // Modify the button's properties as required
  button.backgroundColor = "#114B8F"
  button.borderColor = NSColor.systemBlueColor()
  
  // To hide a button in a specific document, call the show/hide function on the button itself
//  button.isHidden() ? button.show() : button.hide();
  
}

var handleHideHelloButton = function(context) {
  fab.hideAllButtonsWithButtonID("sayHelloButton", context)
}

var handleShowHelloButton = function(context) {
  fab.showAllButtonsWithButtonID("sayHelloButton", context)
}

var handleHideAllButtons = function(context) {
  fab.hideAllButtons()
}

var handleShowAllButtons = function(context) {
  fab.showAllButtons()
}
