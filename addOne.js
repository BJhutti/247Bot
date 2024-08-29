const jsonfile = require("jsonfile");
const addUser = require("./addUser");
const file = './data/buffer.json'

async function addOne(name) {
    try {
        data = await jsonfile.readFile(file);
        if (data.includes(name)) {
            return false
        }
        data.push(name)
 

        await jsonfile.writeFile(file, data, {spaces : 2})
        return true;
        
    }
    catch (err) {
        console.error(err);
    }

}
module.exports = addOne