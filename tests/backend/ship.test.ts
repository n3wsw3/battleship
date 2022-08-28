import { Coord, Ship } from "../../backend/src/game/store";

describe("Ship class", () => {
  test("ship is created correctly", () => {
    const ship = new Ship([
      new Coord({ x: 1, y: 2 }),
      new Coord({ x: 2, y: 2 }),
    ]);
    expect(ship.coords.length).toBe(2);

    expect(ship.coords[0].equals(new Coord({ x: 1, y: 2 }))).toBe(true);
    expect(ship.coords[1].equals(new Coord({ x: 2, y: 2 }))).toBe(true);

    expect(ship.is_dead).toBe(false);

    ship.is_dead = true;
    expect(ship.is_dead).toBe(true);
  });

  test("Ship isHit", () => {
    const ship = new Ship([
      new Coord({ x: 1, y: 2 }),
      new Coord({ x: 2, y: 2 }),
    ]);

    expect(ship.isHit(new Coord({ x: 1, y: 2 }))).toBe(true);
    expect(ship.isHit(new Coord({ x: 2, y: 2 }))).toBe(true);
    expect(ship.isHit(new Coord({ x: 3, y: 2 }))).toBe(false);

    ship.is_dead = true;

    expect(ship.isHit(new Coord({ x: 1, y: 2 }))).toBe(true);
    expect(ship.isHit(new Coord({ x: 2, y: 2 }))).toBe(true);
    expect(ship.isHit(new Coord({ x: 3, y: 2 }))).toBe(false);
  });

  test("Ship isNewlyDead", () => {
    const ship = new Ship([
      new Coord({ x: 1, y: 2 }),
      new Coord({ x: 2, y: 2 }),
    ]);

    expect(ship.isNewlyDead([new Coord({ x: 1, y: 2 })])).toBe(false);
    expect(ship.isNewlyDead([new Coord({ x: 1, y: 1 })])).toBe(false);
    expect(
      ship.isNewlyDead([new Coord({ x: 1, y: 2 }), new Coord({ x: 2, y: 2 })])
    ).toBe(true);

    ship.is_dead = true;

    expect(ship.isNewlyDead([new Coord({ x: 1, y: 2 })])).toBe(false);
    expect(ship.isNewlyDead([new Coord({ x: 1, y: 1 })])).toBe(false);
    expect(
      ship.isNewlyDead([new Coord({ x: 1, y: 2 }), new Coord({ x: 2, y: 2 })])
    ).toBe(false);
  });
});
