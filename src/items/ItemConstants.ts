import FruitMazeItem from "./definitions/FruitMazeItem";

export enum MazeItemKey {
  FRUIT = 0,
  BRAIN = 1
}


export const FRUIT_SPAWN_BASE_PROBABILITY = 0.005;
export const FRUIT_PICKUP_POINTS_BASE_AMOUNT = 10;
export const FRUIT_PICKUP_POINTS_BASE_AMOUNT_MULTIPLIER = 1.2;

export const BRAIN_SPAWN_BASE_PROBABILITY = 0.005;
export const BRAIN_STARTING_TILE_DISTANCE = 20;
