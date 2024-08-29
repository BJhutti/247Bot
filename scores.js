const jsonfile = require("jsonfile");
const addUser = require("./addUser");
const file = './data/buffer.json'
const boardFile = './data/leaderboard.json'


async function scores() {
    try {
        data = await jsonfile.readFile(file);
        board = await jsonfile.readFile(boardFile);
        data = new Set(data) //unnesecary now

        //streak:
        users = board["users"];
        for(i = 0; i < users.length; i++) {
            if (!data.has(users[i]["name"])) {
                users[i]["streak"] = 0
                await jsonfile.writeFile(boardFile, board, {spaces : 2})

            }
            else {
                users[i]["streak"] += 1
            }
        }


        for (username of data) {
            user = board.users.find(u => u.name == username);

            if (user) {
                user["count"] += 1;
                await jsonfile.writeFile(boardFile, board, {spaces : 2})
            }
            else {
                addUser(username)
            }
        }
        await jsonfile.writeFile(file, []);
        return data.size
    }
    catch (err) {
        console.error(err);
    }

}
scores()
module.exports = scores