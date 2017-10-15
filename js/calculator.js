var equationArray = Object.values(document.getElementsByClassName('equation'));
var outputBox = document.getElementById('output-box');


// Displaying equation button values to output
var displayOutput = e => {
  // remove initial 0, unless starting with a decimal point
  if(outputBox.childNodes[0].wholeText === '0' && e.target.innerText !== '.') outputBox.removeChild(outputBox.firstChild);

  // Don't allow 2 decimal points next to each other
  // if(e.target.innerText === '.' && outputBox.childNodes.length > 0) {
  //   if(/\.\./.test(outputBox.childNodes[0].wholeText)) {
  //     console.log('Only one decimal allowed!')
  //     return false;
  //   }
  // }

  // display button value in output
  outputBox.appendChild(document.createTextNode(e.target.innerText));
};

equationArray.forEach(value => {
  value.addEventListener('click', displayOutput, false);
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
