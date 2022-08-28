import { createGameId } from "../../backend/src/helper";

describe("Helper methods", () => {
  test("Create game id", () => {
    // Create array with 50 game id's
    let gameIds = Array(50)
      .fill(0)
      .map(() => createGameId());
    gameIds.forEach(id => {
      expect(id).toMatch(/^[a-zA-Z0-9]{5}$/);
    });
  });
});
