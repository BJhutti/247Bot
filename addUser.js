const file = './data/leaderboard.json';
const jsonfile = require('jsonfile');

async function addUser(name) {
    try {
        const data = await jsonfile.readFile(file);


        // Add new user
        const newUser = { "name": name, "count": 1, "streak": 1 };
        data.users.push(newUser);

        // Write to file
        await jsonfile.writeFile(file, data, { spaces: 2 });

        console.log(`Successfully added new user: ${name}`);
    } catch (err) {
        console.error('Error:', err);
    }
}
module.exports = addUser;
