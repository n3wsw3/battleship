import { Game, Player } from "../types";

export const createPlayer = (socket_id: string): Player => ({socket_id, ship: [], shots_fired: [], is_ready: false});

export const createGame = (gameId: string, creator_id: string): Game => {
  return {
    players: [createPlayer(creator_id)],
		is_finished: false,
		turn: creator_id,
    game_id: gameId,
  }
}