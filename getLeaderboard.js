const jsonfile = require("jsonfile");
const file = './leaderboard.json'



async function getLeaderboard() {
    try {
        const data = await jsonfile.readFile(file);
        nameCounts = data["users"];
        nameCounts = nameCounts.sort((a, b) => b["count"] - a["count"]);
       
        combinedString = "";
        for(item of nameCounts) {
            
            addString = `${item["name"]} : ${item["count"]}`
            combinedString += addString + "\n"
        }
        return combinedString.slice(0, -1);

    }
    catch (error){
        console.error("oh")
        return []
    }
}

module.exports = getLeaderboard