import { Coord, ICoord, Player } from "../../backend/src/game/store";

describe("Player class", () => {
  test("Player is created correctly", () => {
    const player = new Player("socket_id");

    expect(player.socket_id).toBe("socket_id");
    expect(player.ships.length).toBe(0);
    expect(player.is_ready).toBe(false);
    expect(player.shots_fired.length).toBe(0);
  });

  test("Player ready up", () => {
    const player = new Player("socket_id");
    const shipCoords: ICoord[][] = [
      [
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ],
      [
        { x: 2, y: 3 },
        { x: 2, y: 4 },
        { x: 2, y: 5 },
      ],
    ];
    player.readyUp(shipCoords);

    expect(player.ships.length).toBe(2);
    expect(player.ships[0].coords.length).toBe(2);
    expect(player.ships[1].coords.length).toBe(3);
  });

  test("Player isHit", () => {
    const player = new Player("socket_id");
    const shipCoords: ICoord[][] = [
      [
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ],
      [
        { x: 2, y: 3 },
        { x: 2, y: 4 },
        { x: 2, y: 5 },
      ],
    ];
    player.readyUp(shipCoords);

    expect(player.isHit(new Coord({ x: 1, y: 2 }))).toBe(true);
    expect(player.isHit(new Coord({ x: 2, y: 4 }))).toBe(true);

    expect(player.isHit(new Coord({ x: 10, y: 10 }))).toBe(false);
  });
});
