const LineByLineReader = require('line-by-line');
const sessionFiles = new LineByLineReader('./files/session.txt');
module.exports = async function () {
 await sessionFiles.on('error',async function (err) {
	// 'err' contains error object
  await console.log(1111)
  return 1111
  
});

await sessionFiles.on('line', function (line) {
  console.log(1111)
	// 'line' contains the current line without the trailing newline character.
});

await sessionFiles.on('end', function () {
	// All lines are read, file is closed now.
  console.log(1111)  
});
}