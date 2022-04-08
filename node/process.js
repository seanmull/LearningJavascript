const os = require("os");
process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`);
});

console.log(os.platform());
