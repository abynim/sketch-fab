const fab = require("../Resources/Fab.framework/Resources/fab-script.js")

var handleStartup = function(context) {
  
  try {
    
      // Register buttons on startup.
      // Pass in the settings for the button and the context
      // Only *required* parameter is `identifier`, which you will use later to retrieve this button
    
    fab.registerButton({
      identifier : "sayHelloButton",
      action : "sayHello",
      title: "👋",
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
    
  } catch (e) {
    NSLog("[Fab] Error regsitering buttons: %@", e);
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
  
  
}
