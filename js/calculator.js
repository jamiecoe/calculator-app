var operatorArray = Object.values(document.getElementsByClassName('operator'));
var numeratorArray = Object.values(document.getElementsByClassName('numerator'));
var outputBox = document.getElementById('output-box');


// Displaying Numerator button values to output
var numeratorOutput = e => {
  // remove initial 0, unless starting with a decimal point
  if(outputBox.childNodes[0].wholeText === '0' && e.target.innerText !== '.') outputBox.removeChild(outputBox.firstChild);
  // Stop two decimals in one numerator
  // Only check if user clicks '.' button
  if(outputBox.childNodes && e.target.innerText === '.') {
    var lastNumerator = outputBox.childNodes[0].wholeText.split(/[\*\-\/\+]/g).pop();
    if(lastNumerator.includes('.')) return false;
  }
  // display button value in output
  outputBox.appendChild(document.createTextNode(e.target.innerText));
};

numeratorArray.forEach(value => {
  value.addEventListener('click', numeratorOutput, false);
});


// Displaying Operator button values to output
var operatorOutput = e => {
  // display button value in output
  outputBox.appendChild(document.createTextNode(e.target.innerText));
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


// '=' button
var calculateOutput = () => {
  // Get ouptutbox value
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
