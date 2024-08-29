const boardFile = './data/leaderboard.json';
const { highest } = require('./config.json')
const config = './config.json'
const jsonfile = require('jsonfile');


async function test() {
    yee = 2;
    const high = await jsonfile.readFile(config);
    if (yee > high["highestCount"]) {
        high["highestCount"] = yee;
        high["highestName"] = "woo1";
        await jsonfile.writeFile(config, high, {spaces : 2});
    }
}
test()