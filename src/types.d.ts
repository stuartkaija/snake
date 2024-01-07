// export type Character = "SNAKE" | "WORM"
// export type Difficulty = "NORMAL" | "HARD" | "EASY"
export type Cell = "EMPTY" | "SNAKE" | "FOOD";
export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type MapCoordinates = [number, number];
export type SnakeCoordinates = Array<[number, number]>;