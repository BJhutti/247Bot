function getLeaderboard() {
    const nameCounts = [
        ['Alice', 42],
        ['Zob', 76],
        ['Charlie', 19],
        ['David', 53],
        ['Eve', 88]
    ];
    nameCounts.sort();
    combinedString = "";
    for(item of nameCounts) {
        addString = `${item[0]} : ${item[1]}`
        combinedString += addString + "\n"
    }
    return combinedString.slice(0, -1);
}

module.exports = getLeaderboard