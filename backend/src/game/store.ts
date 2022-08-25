import { createGameId } from "../helper";

export interface ICoord {
  x: number;
  y: number;
}

export class Coord implements ICoord {
  x: number;
  y: number;

  constructor({ x, y }: { x: number; y: number }) {
    this.x = x;
    this.y = y;
  }

  /**
   *
   * @param other the other coordinate that should be compared against
   * @returns true if the x and y coords match
   */
  equals(other: Coord): boolean {
    return this.x == other.x && this.y == other.y;
  }
}

export interface IShip {
  coords: ICoord[];
}

export class Ship implements IShip {
  /**
   * Position of all of the ship's pieces
   */
  coords: Coord[] = [];
  /**
   * Is true if the ship has been sent to clients as dead.
   *
   * The ship can be dead and this variable will still be false
   * if you've not sent the deadness to the players.
   */
  is_dead: boolean = false;

  constructor(coords: Coord[]) {
    this.coords = coords;
  }

  /**
   *
   * @param shot position of a new shot
   * @returns true if the shot will hit a ship placed by this player
   */
  isHit(shot: Coord): boolean {
    return !!this.coords.find(pos => pos.equals(shot));
  }

  /**
   *
   * @param totalShots the total amount of shots a player has taken
   * @returns true if the shots the player has taken completely overlaps with the ships coords
   */
  isNewlyDead(totalShots: Coord[]): boolean {
    return this.coords.every(
      coord => !!totalShots.find(shot => shot.equals(coord))
    );
  }
}

export interface IPlayer {
  socket_id: string; // Socket Id
  ships: IShip[];
  shots_fired: ICoord[];
  is_ready: boolean;
}

export class Player implements IPlayer {
  socket_id: string; // Socket Id
  ships: Ship[] = [];
  shots_fired: Coord[] = [];
  is_ready: boolean = false;

  constructor(socketId: string) {
    this.socket_id = socketId;
  }

  /**
   *
   * @param shot position of a new shot
   * @returns true if the shot will hit any ships belonging to this player
   */
  isHit(shot: Coord): boolean {
    return !!this.ships.find(boat => boat.isHit(shot));
  }
}

export interface IGame {
  game_id: string;
  players: IPlayer[];
  turn: string;
}

export class Game implements IGame {
  readonly game_id: string;
  readonly players: Player[] = [];
  /**
   * ID of the player whose turn it is
   */
  private _turn: string;

  constructor(gameId: string = createGameId(), creatorId: string) {
    this.game_id = gameId;
    this.players.push(new Player(creatorId));
    this._turn = creatorId;
  }

  /**
   *
   * @param playerId the current player
   * @returns the player with playerId
   */
  getPlayerFromId(playerId: string): Player | undefined {
    return this.players.find(player => player.socket_id === playerId);
  }

  getPrevPlayer(currentPlayerId: string): Player | undefined {
    let currentPlayerIndex = this.players.findIndex(
      player => player.socket_id === currentPlayerId
    );
    return this.players[--currentPlayerIndex % this.players.length];
  }

  /**
   *
   * @param currentPlayerId the current player
   * @returns return the next player in the game
   */
  getNextPlayer(currentPlayerId: string): Player | undefined {
    let currentPlayerIndex = this.players.findIndex(
      player => player.socket_id === currentPlayerId
    );
    return this.players[++currentPlayerIndex % this.players.length];
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }

  shoot(x: number, y: number): { is_hit: boolean; killed_ship: boolean } {
    const nextPlayer = this.getNextPlayer(this.turn);
    if (!nextPlayer) return { is_hit: false, killed_ship: false };

    const coord = new Coord({ x, y });

    nextPlayer.shots_fired.push(coord);

    const is_hit = nextPlayer.isHit(coord);
    const ship_killed = nextPlayer.ships.find(ship =>
      ship.isNewlyDead(nextPlayer.shots_fired)
    );
    if (ship_killed) ship_killed.is_dead = true;

    const killed_ship = !!ship_killed;

    this._turn = nextPlayer.socket_id;

    return { is_hit, killed_ship };
  }

  get turn(): string {
    return this._turn;
  }

  playerWon(): string {
    const player = this.players.find(player =>
      player.ships.every(ship => ship.is_dead)
    );
    if (!player) return "";

    const prevPlayer = this.getPrevPlayer(player.socket_id);
    if (!prevPlayer) return "";

    return prevPlayer.socket_id;
  }
}

export class GameStore {
  private readonly games: Record<string, Game> = {};

  create(gameId: string, creatorId: string): Game {
    const newGame = new Game(gameId, creatorId);
    this.games[newGame.game_id] = newGame;
    return newGame;
  }

  findById(id: string): Game | undefined {
    return this.games[id];
  }

  /**
   *
   * @param playerId the current player
   * @returns the game id the current player belongs to.
   *
   * If the player belongs to multiple games, then the id of the first game will be returned.
   * If the player belongs to no games, then undefined will be returned.
   */
  getGameIdFromPlayerId(playerId: string): string | undefined {
    let playerGame = Object.keys(this.games).find(value =>
      this.games[value].players.find(value => value.socket_id === playerId)
    );
    if (!playerGame) return undefined;
    return playerGame;
  }
  /**
   *
   * @param playerId the current player
   * @returns the game the current player belongs to.
   *
   * If the player belongs to multiple games, then the first game will be returned.
   * If the player belongs to no games, then undefined will be returned.
   */
  getGameFromPlayerId(playerId: string): Game | undefined {
    const gameId = this.getGameIdFromPlayerId(playerId);
    if (!gameId) return undefined;
    return this.findById(gameId);
  }
}
