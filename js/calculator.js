var operatorArray = Object.values(document.getElementsByClassName('operator'));
var numeratorArray = Object.values(document.getElementsByClassName('numerator'));
var outputBox = document.getElementById('output-box-hidden');
var outputBoxDisplay = document.getElementById('output-box-display');


// Displaying Numerator button values to output
var numeratorOutput = e => {
  // remove initial 0, unless starting with a decimal point
  if(outputBox.childNodes[0].wholeText === '0' && e.target.value !== '.') {
    outputBox.removeChild(outputBox.firstChild);
    outputBoxDisplay.removeChild(outputBoxDisplay.firstChild);
  }
  // Stop two decimals in one numerator
  // Only check if user clicks '.' button
  if(outputBox.childNodes && e.target.value === '.') {
    var lastNumerator = outputBox.childNodes[0].wholeText.split(/[\*\-\/\+]/g).pop();
    if(lastNumerator.includes('.')) return false;
  }
  // Add value to output calculation
  outputBox.appendChild(document.createTextNode(e.target.value));
  // Display value in output box, with a space at the end ' '
  outputBoxDisplay.appendChild(document.createTextNode(e.target.value));


};

numeratorArray.forEach(value => {
  value.addEventListener('click', numeratorOutput, false);
});


// Displaying Operator button values to output
var operatorOutput = e => {

  // Algorithm for avoiding invalid double oporators
  // If last output value was an operator
  if(/^\D$/.test(outputBox.lastChild.nodeValue)) {
    // Avoid anything other than '*-'
    if(outputBox.lastChild.nodeValue !== '*' && e.target.value !== '-') return false;
    // Avoid anything other than '/-'
    if(outputBox.lastChild.nodeValue !== '/' && e.target.value !== '-') return false;
    // Avoid '--'
    if(outputBox.lastChild.nodeValue === '-' && e.target.value === '-') return false;
    // For '+-', remove the '+' sign as it is unnecessary
    if(outputBox.lastChild.nodeValue === '+' && e.target.value === '-') outputBox.removeChild(outputBox.lastChild);
  }

  // remove initial 0 if starting with a minus
  if(outputBox.childNodes[0].wholeText === '0' && e.target.value === '-') outputBox.removeChild(outputBox.firstChild);


  // display button value in output
  outputBox.appendChild(document.createTextNode(e.target.value));
};

operatorArray.forEach(value => {
  value.addEventListener('click', operatorOutput, false);
});



// 'AC' button
var clearOutput = () => {
  while (outputBox.firstChild) {
    outputBox.removeChild(outputBox.firstChild);
  }
  outputBox.appendChild(document.createTextNode(0));
};

document.getElementById('clear').addEventListener('click', clearOutput, false);


// 'CE' button
var backSpace = () => {
  // If there's only 1 value and it's a '0', do nothing. Otherwise remove the last value
  if(outputBox.childNodes.length === 1 && outputBox.firstChild.nodeValue === '0') return false;
  else outputBox.removeChild(outputBox.lastChild);
  // If you've deleted the last value, display a '0'
  if(outputBox.childNodes.length < 1) outputBox.appendChild(document.createTextNode(0));

}

document.getElementById('back-space').addEventListener('click', backSpace, false);



// '=' button
var calculateOutput = () => {

  // Don't calculate if last value is an operator, or there are no operators at all
  if(/[\*\-\/\+]/.test(outputBox.lastChild.nodeValue) || !/[\*\-\/\+]/.test(outputBox.childNodes[0].wholeText)) return false;
  // Get outputbox value
  var statement = outputBox.childNodes[0].wholeText;
  // clean statement
  statement = statement.replace(/[^-()\d/*+.]/g, '');
  // clear output
  while (outputBox.firstChild) {
    outputBox.removeChild(outputBox.firstChild);
  };
  // display calculated statement
  outputBox.appendChild(document.createTextNode(eval(statement)));
};

document.getElementById('equals').addEventListener('click', calculateOutput, false);
