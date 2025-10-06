let keyList = [];

const keyDisplay = document.getElementById("keyDisplay");
document.addEventListener("keydown", (event) => {
    const keyName = event.key;
  
    if (keyName === "Control" || keyName === "Shift" || keyName ==="Meta") {
      // Prevents alert when only the Control key is pressed.
      return;
    }
    
    /*if (event.metaKey && event.ctrlKey && event.shiftKey) {
        keyList.push(` Command + Ctrl + Shift + ${keyName}`);
    } 
    else if (event.metaKey && event.ctrlKey) {
        keyList.push(` Command + Ctrl + ${keyName}`);
    } 
    else if (event.metaKey && event.shiftKey) {
        keyList.push(` Command + Shift + ${keyName}`);
    } 
    else if (event.ctrlKey && event.shiftKey) {
        keyList.push(` Ctrl + Shift + ${keyName}`);
    } 
    else if (event.shiftKey) {
        keyList.push(` Shift + ${keyName}`);
    } 
    else if (event.ctrlKey) {
        keyList.push(` Ctrl + ${keyName}`);
    } 
    else if (event.metaKey) {
        keyList.push(` Command + ${keyName}`);
    } else {*/
        keyList.push(keyName);
    //}
    
    keyDisplay.value = keyList.join("");
    
  });
  
  document.addEventListener("keyup", (event) => {
    const keyName = event.key;
  
    if (keyName === "Control") {
      //alert("Control key was released");
    }
  });

  
