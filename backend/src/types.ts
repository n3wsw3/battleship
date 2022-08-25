type E = [
  "No Such Game",
  "Player Not Found",
  "Game Already Exists",
  "Not Your Turn",
  "Cannot Get Next Player",
  "All Players Are Not Ready",
  "Game ID is Required"
];

type S = [
  "Game Created Successfully",
  "Game Joined Successfully",
  "Added Ships and Readied Up!"
];

export type ErrorsStrings = E[number];
export type SuccessStrings = S[number];
