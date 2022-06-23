var fs = require('fs')
const someFile = "./testfiles/file1.txt"

fs.readFile(someFile, 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
      }
    var result = data.replace(/<pascalcasename>/g, 'replacement');
    fs.writeFile(someFile, result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
});
