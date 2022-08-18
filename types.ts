export interface Coord {
  x: number;
  y: number;
}

export interface Ship {
  coords: Coord[];
}

export interface Player {
  socket_id: string; // Socket Id
  ship: Ship[];
  shots_fired: Coord[];
}

export interface Game {
  players: Player[];
  is_finished: boolean;
  turn: string;
}