const startup = function(context) {
  // only proceed if we haven't already started
  if(NSClassFromString("Fab")) return;
  
  try {
    if(Mocha.sharedRuntime().loadFrameworkWithName_inDirectory('Fab', NSBundle.bundleWithURL(context.plugin.url()).resourceURL().path())) {
      Fab.startup(context);
    }
  } catch(e) {
    NSLog("[Fab] Could not load the Fab framework. Error: %@", e);
  }
}

const registerButton = function(buttonConfiguration, context) {
  startup(context);
  try { Fab.manager().registerButton_withContext(buttonConfiguration, context); }
  catch(e) {
    NSLog("[Fab] Could not register button. Error: %@", e);
  }
}

const buttonWithID_inDocument = function(identifier, doc, context) {
  startup(context);
  try {
    const document = doc || context.document;
    return Fab.manager().buttonWithIdentifier_inDocument_withContext(identifier, document, context);
  }
  catch(e) {
    NSLog("[Fab] Could not find button. Error: %@", e);
  }
  return nil
}

const buttonWithID = function(identifier, context) {
  return buttonWithID_inDocument(identifier, nil, context)
}

const setButtonsHidden = function(buttonID, hidden, context) {
  try {
    return Fab.manager().setButtonsHidden_withIdentifier_context(hidden, buttonID, context);
  }
  catch(e) {
    NSLog("[Fab] Could not toggle buttons with ID %@. Error: %@", buttonID, e);
  }
}

const showAllButtonsWithButtonID = function(identifier, context) {
  setButtonsHidden(identifier, false, context);
}
const hideAllButtonsWithButtonID = function(identifier, context) {
  setButtonsHidden(identifier, true, context);
  NSLog("Hide button with ID: %@", identifier)
}

const setAllButtonsHidden = function(hidden) {
  try {
    return Fab.manager().setAllButtonsHidden(hidden);
  }
  catch(e) {
    NSLog("[Fab] Could not toggle buttons. Error: %@", e);
  }
}

const showAllButtons = function() {
  setAllButtonsHidden(false);
}
const hideAllButtons = function() {
  setAllButtonsHidden(true);
}

exports.registerButton = registerButton;
exports.buttonWithID = buttonWithID;
exports.buttonWithID_inDocument = buttonWithID_inDocument;
exports.showAllButtonsWithButtonID = showAllButtonsWithButtonID;
exports.hideAllButtonsWithButtonID = hideAllButtonsWithButtonID;
exports.showAllButtons = showAllButtons;
exports.hideAllButtons = hideAllButtons;
