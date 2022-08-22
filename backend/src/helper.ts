import { Coord, Game, Games, Player, Ship } from "../types";

export const coordEquals = (coord1: Coord, coord2: Coord) => {
  return coord1.x === coord2.x && coord1.y === coord2.y;
}

export const isShotAHit = (shot: Coord, ships: Ship[]) => {
  for (let ship of ships) {
    for (let shipCoord of ship.coords) {
      if (coordEquals(shipCoord, shot)) return true;
    }
  }
  return false;
}

export const isShipNewlyDead = (shots: Coord[], ship: Ship) => {
  return ship.coords.every(coord => shots.filter(shot => coordEquals(coord, shot)));
}

export const getGameFromPlayerId = (games: Games, playerId: string): Game|undefined => {
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

export const getNextPlayerInGame = (game: Game, playerId: string): Player|undefined => {
  let currentPlayerIndex = game.players.findIndex(player => player.socket_id === playerId);
  return game.players[(++currentPlayerIndex) % game.players.length];
}

export const checkMove = (player: Player, coord: Coord): boolean => {
  // Check move is inside board
  // Check move to be a unique location
  return false;
}