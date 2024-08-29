const jsonfile = require("jsonfile");
const file = './data/buffer.json';
const boardFile = './data/leaderboard.json';
const { highest } = require('./config.json')
const config = './config.json'
 
async function scores() {
    try {
        const bufferData = await jsonfile.readFile(file);
        const data = new Set(bufferData);
        const board = await jsonfile.readFile(boardFile);
        const users = board["users"];

        // Update streaks and counts
        for (const user of users) {
            if (!data.has(user["name"])) {
                user["streak"] = 0;
            } else {
                user["streak"] += 1;
                const high = await jsonfile.readFile(config);
                if (user["streak"] > high["highestCount"]) {
                    high["highestCount"] = user["streak"];
                    high["highestName"] = user["name"];
                    await jsonfile.writeFile(config, high, {spaces : 2});
                }

                user["count"] += 1;
            }
        }

        // Add new users
        for (const username of data) {
            let user = users.find(u => u.name === username);
            if (!user) {
                users.push({ name: username, count: 1, streak: 1 });
            }
        }

        // Write updates to boardFile and clear buffer file
        await jsonfile.writeFile(boardFile, board, { spaces: 2 });
        await jsonfile.writeFile(file, []);

        return data.size;
    } catch (err) {
        console.error('Error in scores function:', err);
    }
}

module.exports = scores;
