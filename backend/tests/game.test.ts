import { Coord, Game, Player } from "../src/game/store";

describe("Game class", () => {
  test("Game is created correctly", () => {
    const game = new Game("game_id", "creator_id");

    expect(game.players.length).toBe(1);
    expect(game.turn).toBe("creator_id");
  });

  test("Add player", () => {
    const game = new Game("game_id", "creator_id");
    game.addPlayer(new Player("other_player"));

    expect(game.players.length).toBe(2);
  });
  test("Get next and previous player", () => {
    const game = new Game("game_id", "creator_id");

    expect(game.getNextPlayer("creator_id").socket_id).toBe("creator_id");
    expect(game.getPrevPlayer("creator_id").socket_id).toBe("creator_id");

    game.addPlayer(new Player("other_player"));

    expect(game.getNextPlayer("creator_id").socket_id).toBe("other_player");
    expect(game.getPrevPlayer("creator_id").socket_id).toBe("other_player");
  });
  test("Get player from id", () => {
    const game = new Game("game_id", "creator_id");
    game.addPlayer(new Player("other_player"));

    expect(game.getPlayerFromId("other_player")).toBeDefined();
    expect(game.getPlayerFromId("creator_id")).toBeDefined();
    expect(game.getPlayerFromId("other_players")).toBeUndefined();
  });
  test("Shoot", () => {
    const game = new Game("game_id", "creator_id");
    const creator = game.getPlayerFromId("creator_id");

    creator.readyUp([
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ],
      [
        { x: 5, y: 0 },
        { x: 5, y: 1 },
      ],
    ]);

    const otherPlayer = new Player("other_player");

    otherPlayer.readyUp([
      [
        { x: 5, y: 0 },
        { x: 6, y: 0 },
      ],
      [{ x: 2, y: 0 }],
    ]);

    game.addPlayer(otherPlayer);

    const shot = game.shoot(5, 0);
    expect(shot.is_hit).toBe(true);
    expect(shot.killed_ship).toBe(false);

    expect(game.turn).toBe("other_player");
    expect(
      !!game
        .getPrevPlayer(game.turn)
        .shots_fired.find(shot => shot.equals(new Coord({ x: 5, y: 0 })))
    ).toBe(true);

    expect(game.playerWon()).toBe("");

    const shot2 = game.shoot(0, 1);
    expect(shot2.is_hit).toBe(false);
    expect(shot2.killed_ship).toBe(false);

    expect(game.turn).toBe("creator_id");
    expect(
      !!game
        .getPrevPlayer(game.turn)
        .shots_fired.find(shot => shot.equals(new Coord({ x: 0, y: 1 })))
    ).toBe(true);

    expect(game.playerWon()).toBe("");

    const shot3 = game.shoot(6, 0);
    expect(shot3.is_hit).toBe(true);
    expect(shot3.killed_ship).toBe(true);

    expect(game.turn).toBe("other_player");
    expect(
      !!game
        .getPrevPlayer(game.turn)
        .shots_fired.find(shot => shot.equals(new Coord({ x: 6, y: 0 })))
    ).toBe(true);

    expect(game.getPlayerFromId(game.turn).ships[0].is_dead).toBe(true);
    expect(game.getPlayerFromId(game.turn).ships[1].is_dead).toBe(false);

    expect(game.playerWon()).toBe("");

    game.shoot(10, 10);
    game.shoot(2, 0);

    expect(game.playerWon()).toBe("creator_id");
  });
});
