/**
 * @author Heather Kusmierz
 */

var ops = ["X", "÷", "-", "+"];
var decimalAdded = false;


$(function() {
  $("#allKeys span").each(function() {
    $(this).on("click", function() {
      var displayVal = $(".display").html();
      var button = $(this).html();
      
      // All Clear is pressed
      if (button == 'AC') {
        $(".display").html('');
        decimalAdded = false;
      }
      
      // Clear Entry is pressed
      else if (button == 'CE') {
        if (displayVal[displayVal.length - 1] == '.') {
          decimalAdded = false;
        }
        displayVal = displayVal.slice(0, displayVal.length - 1);
        $(".display").html(displayVal);
      }
      
      // Equal sign is pressed
      else if (button == '=') {
        var calcMe = displayVal;
        var lastChar = displayVal[displayVal.length - 1];
        
        // Clean up decimal/operators at end
        while (lastChar == '.' || ops.indexOf(lastChar) > -1) {
          calcMe = calcMe.replace(/.$/, "");
          lastChar = calcMe[calcMe.length - 1];
        }
        
        calcMe = calcMe.replace(/X/g, "*").replace(/÷/g, "/");
        
        if(calcMe) {
          displayVal = eval(calcMe);
          $(".display").html(displayVal);
        }
        
        decimalAdded = false;
      }
      
      // Operator is pressed
      else if (ops.indexOf(button) > -1) {
        var lastChar = displayVal[displayVal.length - 1];
        
        // First entry can't be operator, unless it's the minus
        if (displayVal == '') {
          if (button == '-') {
            displayVal += button;
            $(".display").html(displayVal);
          }
        }
        
        // Replace last entry if it's another (non -) operator
        else if (ops.indexOf(lastChar) > -1 && button != '-') {
          displayVal = displayVal.replace(/.$/, button);
          $(".display").html(displayVal);
        }
        
        // Otherwise, allow the operator
        else {
          displayVal += button;
          $(".display").html(displayVal);
        }
        
        // Clear decimal added flag
        decimalAdded = false;
      }
      
      // Decimal is pressed
      else if (button == '.') {
        // Check display for operators, none indicates last press
        // was eval, but total may have decimal in it
        if (displayVal != "" && displayVal.indexOf(ops[0]) == -1 && displayVal.indexOf(ops[1]) == -1 && displayVal.indexOf(ops[2]) == -1 && displayVal.indexOf(ops[3]) == -1 && displayVal.indexOf(".") > -1) {
          decimalAdded = true;
        }
        
        if (!decimalAdded) {
          displayVal += button;
          $(".display").html(displayVal);
          decimalAdded = true;
        }
      }
      
      // Number key is pressed
      else {
        displayVal += button;
        $(".display").html(displayVal);
      }
      
    }); // End on click function
  }); // End each function
}); // End jQuery setup function
