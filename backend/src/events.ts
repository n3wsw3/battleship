import { ErrorsStrings, SuccessStrings } from './types';

interface ShootType {
  x: number;
  y: number;
  is_hit: boolean;
  killed_ship: boolean;
}

interface Error<T = ErrorsStrings> {
  error: T;
}

type Success<T> = {
  [K in keyof T]: T[K];
}

export type ResponseT<T> = Error | Success<T>

export type Response<T = {msg: SuccessStrings}> = (value: ResponseT<T>) => void;

export interface ServerEvents {
  "shoot": (shot: ResponseT<ShootType>) => void;
  "player_joined": (playerId: string) => void;
  "start_game": () => void;
  "game_finished": () => void;
}

export interface ClientEvents {
  "create": (game_id: string, onCallback: Response) => void;
  "join": (game_id: string, onCallback: Response) => void;
  "ready_up": (ships: Array<Array<{x: number, y: number}>>, onCallback: Response) => void;
  "shoot": (shot: {x: number, y: number}, onCallback: Response<ShootType>) => void;
}
