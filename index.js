
if (process.argv.length < 4) {
  console.log("Usage:");
  console.log("node index <fgCharacter> <bgCharacter> <Your text here.>");
  console.log("e.g.:");
  console.log("node index '#' ' ' Some text.");
  process.exit();
}

var symbol = process.argv[2];
var filler = process.argv[3];
var input = process.argv.slice(4).join(' ');

var C64GiantTextProducer = require('./C64GiantTextProducer');

var str = C64GiantTextProducer(symbol, filler, input);
console.log(str);
