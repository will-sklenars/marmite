var TOOLS = {}
module.exports = TOOLS

TOOLS.getRandomNumber = function(min, max) {
 return Math.random() * (max - min) + min;
}
