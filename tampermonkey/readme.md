# Tampermonkey Script

## About

To use FocusMode you need to first install the Tampermonkey script.

## Installation

Installing the FocusMode userscript is simple! If your TamperMonkey settings are right, clicking [this link](https://raw.githubusercontent.com/mmccall0813/FocusMode/master/tampermonkey/FocusMode.user.js) should bring up an installation prompt. Once you've installed the script go to the *Tampermonkey dashboard* and edit the FocusMode script. Once in the script editor, set the `blockedpage` and `serverLocation` variables to correspond with your server's information. When you have set the `blockedpage` and `serverLocation` variables you can then set the `enabled` variable to `true`. Now all you need to do is save (File > Save or Ctrl + S) and then start the nodeJS server!


## FAQ

### **Why is FocusMode only working on some websites?**
This is becuase of CSP (Content Security Policy) headers blocking the websocket connection to the server. To fix this, you need to change your TamperMonkey settings as follows:

1. Change config mode under *General* to **Advanced**
2. Scroll down until you find the *Security* section.
3. Change *Modify existing content security policy (CSP) headers* to **Remove entirely (possibly unsecure)**