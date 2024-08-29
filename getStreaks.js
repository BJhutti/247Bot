const jsonfile = require("jsonfile");
const file = './data/leaderboard.json'



async function getStreaks() {
    try {
        const data = await jsonfile.readFile(file);
        nameCounts = data["users"];
        nameCounts = nameCounts.sort((a, b) => b["streak"] - a["streak"]);
       
        combinedString = "CURRENT STREAKS \n\n";
        for(item of nameCounts) {
            
            addString = `${item["name"]} : ${item["streak"]}`
            combinedString += addString + "\n"
        }
        return combinedString.slice(0, -1);

    }
    catch (error){
        console.error("oh")
        return []
    }
}
module.exports = getStreaks