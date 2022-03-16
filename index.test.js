const { drawEmails, parseCSVContent, readFile } = require("./index");

describe("raffle function", () => {
  const list = [
    "email1",
    "email2",
    "email3",
    "email4",
    "email5",
    "email6",
    "email7",
    "email8",
    "email9",
    "email10",
  ];

  const csvEntries =
    '"Coffee Voucher";"fake.user@email.com"\n"Coffee Voucher";"personm@email.com"\n"1-year JetBrains License";"someone@email.com"\n"Coffee Voucher";"janedoe@email.com"\n';

  test("drawEmails produces correct number of results", () => {
    expect(drawEmails(list, 1).length).toBe(1);
    expect(drawEmails(list, 5).length).toBe(5);
    expect(drawEmails(list, 10).length).toBe(10);
  });

  test("drawEmails returns no duplicates", () => {
    const result = drawEmails(list, 5);
    const setOfUniques = new Set(result);
    expect(result.length).toBe(setOfUniques.size);
  });

  test("parseCSVContent returns grouped results", () => {
    const prizes = [
      ["Coffee Voucher", 1],
      ["1-year JetBrains License", 1],
    ];
    const separator = ";";

    const result = parseCSVContent(prizes, csvEntries, separator);

    expect(result.length).toBe(prizes.length);
    expect(result[0].length).toBe(3);
    expect(result[1].length).toBe(1);
  });

  test("readFile returns file content", (done) => {
    function callback(_error, data) {
      try {
        expect(data).not.toBe(null);
        done();
      } catch (error) {
        done(error);
      }
    }

    readFile("testfiles/testentries.csv", callback);
  });
});
