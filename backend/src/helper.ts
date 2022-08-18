import { Coord, Game, Games, Player } from "../types";

export const getGameFromPlayerId = (games: Games, playerId: string): Game => {
  return games[getGameIdFromPlayerId(games, playerId)];
}

export const getGameIdFromPlayerId = (games: Games, playerId: string): string => {
  let playerGame = Object.keys(games).find((value) =>
    games[value].players.find((value) => value.socket_id === playerId)
  );
  return playerGame || "";
};

export const getPlayerInGame = (game: Game, playerId: string): Player|undefined => {
  return game.players.find(player => player.socket_id === playerId);
}

export const checkMove = (player: Player, coord: Coord): boolean => {
  // Check move is inside board
  // Check move to be a unique location
  return false;
}