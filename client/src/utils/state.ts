export enum GameStatus {
  START,
  PLAY,
  GAMEOVER,
}
export interface Position {
  x: number
  y: number
}

export interface PlayerState extends Position {
  width: number
  height: number
  score: number
}

export interface BallState extends Position {
  radius: number
}

export interface GameState {
  player1: PlayerState
  player2: PlayerState
  ball: BallState
  status: GameStatus
}

export const defaultGameState = {
  status: GameStatus.START,
  player1: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    score: 0,
  },
  player2: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    score: 0,
  },
  ball: {
    x: 0,
    y: 0,
    radius: 0,
  },
}
