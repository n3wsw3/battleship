export interface Coord {
  x: number;
  y: number;
}

export interface Ship {
  coords: Coord[];
  is_dead: boolean; // Is true if the ship has been sent to clients as dead
}

export interface Player {
  socket_id: string; // Socket Id
  ship: Ship[];
  shots_fired: Coord[];
  is_ready: boolean;
}

export interface Game {
  game_id: string;
  players: Player[];
  is_finished: boolean;
  turn: string;
}

export type Games = Record<string, Game>;