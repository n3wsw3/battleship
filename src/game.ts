import {v4} from "uuid";

// const createTile = () => {
// 	return {};
// }

// const createBoard = (size_x: number, size_y: number) => {
// 	return Array(size_x).map(() => Array(size_y).map(() => createTile()))
// }

export const createGame = (gameId: string, creator_id: string) => {

  return {
    gameId,
    players: [creator_id],

  }
}