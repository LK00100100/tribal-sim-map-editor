
const pixelToTerrainMap = {
    181: 0, //grass
    63: 1,  //ocean
    200: 2, //hill
    239: 3, //DESERT
    34: 4,  //FOREST
}

/**
 * convert pixel number to terrain number
 * @param {Number} pixel rgb val from 0 - 255
 */
function pixelToTerrain(pixel) {
    return pixelToTerrainMap[pixel];
}

module.exports.pixelToTerrain = pixelToTerrain;
