import { Game } from "../types";

export const createGame = (gameId: string, creator_id: string): Game => {
  return {
    players: [{socket_id: creator_id, ship: [], shots_fired: []}],
		is_finished: false,
		turn: creator_id,
  }
}