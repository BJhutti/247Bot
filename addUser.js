const file = './data/leaderboard.json';
const jsonfile = require('jsonfile');
const person  = {"Name": "Opsine", "count" : 1};
name = "Opsine"

async function addUser(name) {
    try {
        const data = await jsonfile.readFile(file);

        // Step 4: Modify the Data
        const newUser = { "name": name, "count" : 1};
        data.users.push(newUser);

        // Step 5: Write the Updated Data Back to the JSON File Asynchronously
        await jsonfile.writeFile(file, data, { spaces: 2 });

        console.log('Successfully added new user');
    } catch (err) {
        console.error('Error:', err);
        return []
    }
}

module.exports = addUser