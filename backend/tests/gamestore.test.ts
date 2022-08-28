import { GameStore } from "../src/game/store";

describe("GameStore class", () => {
  test("GameStore is creating games correctly", () => {
    const gameStore = new GameStore();

    gameStore.create("game_id", "creator_id");

    expect(gameStore.findById("game_id")).toBeDefined();
    expect(gameStore.findById("a")).toBeUndefined();

    expect(gameStore.getGameFromPlayerId("creator_id")).toBeDefined();
    expect(gameStore.getGameFromPlayerId("a")).toBeUndefined();

    expect(gameStore.getGameIdFromPlayerId("creator_id")).toBe("game_id");
    expect(gameStore.getGameIdFromPlayerId("a")).toBeUndefined();
  });
});
