const jsonfile = require("jsonfile");
const addUser = require("./addUser");
const file = './leaderboard.json'

async function addOne(name) {
    try {
        data = await jsonfile.readFile(file);

        user = data.users.find(u => u.name == name);
        if (user) {
            user["count"] += 1;
            await jsonfile.writeFile(file, data, {spaces : 2})
        }
        else {
            addUser(name)
        }

        
    }
    catch (err) {
        console.error(err);
    }

}
module.exports = addOne