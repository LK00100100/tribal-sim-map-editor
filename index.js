
let fs = require("fs");
let PNG = require("pngjs").PNG;
let pixelToTerrain = require("./Terrain.js").pixelToTerrain;

let mapName = "sample-world-partial";
let targetFileInput = `img/${mapName}.png`;
let targetFileOutput = `output/${mapName}.json`;

// let targetFileInput = "img/sample.png";
// let targetFileOutput = "output/sample.json";

//TODO: electron app
//TODO: convert pixel to terrain
//TODO: option for human readability. zpadding.

fs.createReadStream(targetFileInput)
    .pipe(
        new PNG({
            filterType: 4,
        })
    )
    .on("parsed", processImage);

/**
 * turn one tribal-simulator map png file into a json
 */
function processImage() {

    let listRows = [];
    let rowContent = [];

    //convert pixels into 2d number (terrain) grid
    for (let y = 0; y < this.height; y++) {

        rowContent = [];

        for (let x = 0; x < this.width; x++) {
            let idx = (this.width * y + x) << 2;

            let pixelVal = this.data[idx];
            let terrainVal = pixelToTerrain(pixelVal);

            rowContent.push(terrainVal);
        }
        listRows.push("\n[" + rowContent.join(",") + "]");
    }
    jsonStr = "[" + listRows.join(",") + "]";

    fs.writeFile(targetFileOutput, jsonStr, function (err, result) {
        if (err)
            console.log('error', err);
        else
            console.log("file written");
    });

};