const Watch = require("./watch");

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
