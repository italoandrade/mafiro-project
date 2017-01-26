const express = require('express');
const cluster = require('cluster');
const fs = require('fs');
const debug = typeof v8debug === 'object';
const compression = require('compression');

if (cluster.isMaster && !debug) {
    let cpuCount = require("os").cpus().length;
    cpuCount = cpuCount > 1 ? cpuCount : 2;

    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    cluster.on('exit', function (worker) {
        console.log('Worker %d died :(', worker.id);
        cluster.fork();
    });
} else {
    const app = express();
    let filesPath = require('path').join(__dirname, '/src');

    app.use(compression());
    app.use(express.static(filesPath));

    filesPath = require('path').join(__dirname, '../mafiro-project');

    app.use(express.static(filesPath));
    app.set('views', filesPath);

    app.get('/*', function (req, res) {
        fs.readFile(filesPath + '/index.html', 'utf8', function (err, text) {
            res.send(text);
        });
    });

    app.listen(80, function () {
        console.log('Express server listening on port 80');
    });
}
