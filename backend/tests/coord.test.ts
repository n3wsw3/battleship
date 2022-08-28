import { Coord } from "../src/game/store";

describe("Coord class", () => {
  test("x and y coords are correct", () => {
    const coord = new Coord({ x: 1, y: 2 });
    expect(coord.x).toBe(1);
    expect(coord.y).toBe(2);
  });

  test("equals method works", () => {
    const c1 = new Coord({ x: 1, y: 2 });
    const c2 = new Coord({ x: 1, y: 1 });
    const c3 = new Coord({ x: 2, y: 2 });
    const c4 = new Coord({ x: 1, y: 2 });

    expect(c1.equals(c2)).toBe(false);
    expect(c1.equals(c3)).toBe(false);
    expect(c2.equals(c3)).toBe(false);
    expect(c1.equals(c4)).toBe(true);
  });
});
