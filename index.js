const fr = require("fs");

const drawEmails = (list, num) => {
  const result = [];

  const clone = [...list];

  const drawRaffle = (emails) => {
    const index = Math.floor(Math.random() * emails.length);
    return {
      email: emails[index],
      index,
    };
  };

  while (num > 0) {
    const { email: winner, index } = drawRaffle(clone);
    result.push(winner);
    num--;
    clone.splice(index, 1);
  }

  return result;
};

const readFile = (file, callback) => {
  return fr.readFile(file, "utf8", (err, data) => {
    callback(err, data);
  });
};

const parseCSVContent = (prizes, data, separator) => {
  // Refer to testfiles/test-entries.csv for the format

  // loop through content and get all the data
  var columns = [];
  const splitData = data.split("\n");
  for (var i = 0; i < splitData.length - 1; i++) {
    columns.push(splitData[i]);
  }

  var prizeEntries = [];

  // loop through the entries and extract the entry for each prize
  var prizeIndex = 0;
  prizes.forEach(() => {
    const entries = [];

    columns.forEach((choice) => {
      var entryIndex = 0;
      var entryChoice = choice.split(separator); // Coffee, 1-year JetBrains License, etc.

      // If the entry choice is the same as the prize-name
      if (
        entryChoice[entryIndex]
          .toString()
          .toLowerCase()
          .includes(prizes[prizeIndex][0].toLowerCase())
      ) {
        entries.push(entryChoice[1]);
      }

      entryIndex++;
    });

    prizeEntries.push(entries);
    prizeIndex++;
  });

  return prizeEntries;
};

const raffle = (prizeCategories, entriesFilePath) => {
  readFile(entriesFilePath, (error, data) => {
    if (error) {
      console.log(error);
    }

    const separatedEntries = parseCSVContent(prizeCategories, data, ";");

    var categoryIndex = 0;
    prizeCategories.forEach((prize) => {
      const categoryWinners = drawEmails(
        separatedEntries[categoryIndex],
        prize[1]
      );

      console.log(
        `============ ${prize[0].toUpperCase()} WINNERS =================`
      );

      // Print out the winners
      categoryWinners.forEach((winner) => {
        if (winner) {
          console.log(winner.toUpperCase());
        }
      });
      console.log("\n");

      categoryIndex++;
    });
  });
};

module.exports = { drawEmails, parseCSVContent, readFile, raffle };

// Example Call
// raffle(
//   [
//     ["Coffee Voucher", 1],
//     ["1-year JetBrains License", 1],
//     ["Nigiro Tea", 1],
//   ],
//   "testfiles/testentries.csv"
// );
