var CharacterMap = null;
var C64Style = C64Style || null;

if (C64Style) CharacterMap = C64Style;
else {
  var execfile = require('./node_modules/slcommon/execfile.js');
  CharacterMap = execfile(require.resolve('C64Style/lib/CharacterMap.js')).C64Style.CharacterMap;
  SL = execfile(require.resolve('slcommon/Utils.js')).SL;
}

function C64GiantTextProducer(symbol, filler, input) {
  var pixArraySet = [];
  for (var i = 0; i < input.length; i++) {
    if (input[i] === ' ' || SL.isNullOrUndefined(CharacterMap[input[i]])) {
      pixArraySet.push([]);
      continue;
    }
    pixArraySet.push(CharacterMap[input[i]]);
  }

  var out = [];

  var symbolLength = 8 * input.length;
  for (var y = 0; y < 8; y++) {
    out.push([]);
    for (var x = 0; x < symbolLength; x++) {
      out[y].push(filler);
    }
  }

  var idx = -1;
  pixArraySet.forEach(function(pixArray) {
    idx++;
    pixArray.forEach(function(pix) {
      out[pix.y][pix.x + 8 * idx] = symbol;
    });
  });

  var str = '';
  for (var y = 0; y < 8; y++) {
    for (var x = 0; x < symbolLength; x++) {
      str += out[y][x];
    }
    str += '\n';
  }
  return str;
};

module.exports = C64GiantTextProducer;
