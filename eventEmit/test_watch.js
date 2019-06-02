const Watch = require("./watch");
let watchDir = "./watch";
let processedDir = "./done";

const watcher = new Watch(watchDir, processedDir);

watcher.on("process", file => {
  const watchFile = `${watchDir}/${file}`;
  const processedFile = `${processedDir}/${file.tolowerCase()}`;

  fs.rename(watchFile, processedFile, err => {
    if (err) {
      throw err;
    }
  });
});

watcher.start();
