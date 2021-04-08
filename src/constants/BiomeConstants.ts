import BiomeColorPalette from "models/BiomeColorPalette";
import { BIOME_0_COLOR_PALETTE } from "constants/ColorConstants";
import { MazeItemKey } from "constants/ItemConstants";
import {
  UpgradeKey,
  BIOME_UPGRADE_BASE_MULTPLIER,
  BIOME_UPGRADE_COST_ARR
} from "constants/UpgradeConstants";
import { 
  Fruit, 
  FRUIT_TIER_1, 
  FRUIT_TIER_2, 
  FRUIT_TIER_3, 
  FRUIT_TIER_4, 
  FRUIT_TIER_5 
} from "constants/FruitConstants";
import { MazeAlgorithmType, MazeGridType } from "managers/MazeUtils";
import { PowerUpKey } from "./PowerUpConstants";

export type BiomeKey = number;


export const getFruitItemByBiomeKey = (biomeKey: BiomeKey): Fruit => {
  if (biomeKey >= 0 && biomeKey < 5) {
    return FRUIT_TIER_1;
  } else if (biomeKey >= 5 && biomeKey < 10) {
    return FRUIT_TIER_2;
  } else if (biomeKey >= 10 && biomeKey < 15) {
    return FRUIT_TIER_3;
  } else if (biomeKey >= 15 && biomeKey < 20) {
    return FRUIT_TIER_4;
  } else if (biomeKey >= 20) {
    return FRUIT_TIER_5;
  }
  console.error(`Invalid fruit item for biome tier: ${biomeKey}`);
}

export const getPointsPerVisitBaseAmount = (biomeKey: BiomeKey): number => {
  return 1 + (.25 * biomeKey);
};

export const getBiomeUpgradeCost = (biomeKey: BiomeKey): number => {
  if (biomeKey < BIOME_UPGRADE_COST_ARR.length) {
    return BIOME_UPGRADE_COST_ARR[biomeKey];
  }
  const lastBiomeUpgradeCost = BIOME_UPGRADE_COST_ARR[BIOME_UPGRADE_COST_ARR.length - 1];
  return lastBiomeUpgradeCost * Math.pow(BIOME_UPGRADE_BASE_MULTPLIER, (biomeKey + 1 - BIOME_UPGRADE_COST_ARR.length));
};

export const getBiomeColorPalette = (biomeKey: BiomeKey): BiomeColorPalette => {
  if (biomeKey >= 0) {
    return BIOME_0_COLOR_PALETTE;
  }
  return BIOME_0_COLOR_PALETTE;
};

export const POWER_UP_UNLOCKS: Map<PowerUpKey, BiomeKey> = new Map([
  [PowerUpKey.SPEED_UP, 7],
  [PowerUpKey.POINTS_MULTIPLIER, 10],
]);

export const BIOME_ITEM_UNLOCKS: Map<MazeItemKey, BiomeKey> = new Map([
  [MazeItemKey.FRUIT, 1],
  [MazeItemKey.MULTIPLIER, 2],
  [MazeItemKey.BRAIN, 7],
  [MazeItemKey.BLACK_HOLE, 12],
  [MazeItemKey.UNLIMITED_SPLITS, 14],
  [MazeItemKey.GHOST, 16],
]);

export const BIOME_UPGRADE_UNLOCKS: Map<UpgradeKey, BiomeKey> = new Map([
  [UpgradeKey.BIOME, 0],
  [UpgradeKey.AUTO_MOVE, 1],
  [UpgradeKey.POINTS_PER_VISIT, 1],
  [UpgradeKey.BOT_MOVEMENT_SPEED, 1],
  [UpgradeKey.PRIORITIZE_UNVISITED, 2],
  [UpgradeKey.MAZE_SIZE_UPGRADE, 2],
  [UpgradeKey.AVOID_REVISIT_LAST_POSITION, 3],
  [UpgradeKey.MAZE_COMPLETION_BONUS, 3],
  [UpgradeKey.AUTO_EXIT_MAZE, 4],
  [UpgradeKey.PLAYER_MOVE_INDEPENDENTLY, 4],
  [UpgradeKey.FRUIT_SPAWN, 5],
  [UpgradeKey.TELEPORT_BOT_BACK_TO_PLAYER, 5],
  [UpgradeKey.TELEPORT_PLAYER_BACK_TO_BOT, 5],
  [UpgradeKey.FRUIT_PICKUP_POINTS, 6],
  [UpgradeKey.BOT_SPLIT_DIRECTION, 6],
  [UpgradeKey.BOT_REMEMBER_DEADEND_TILES, 7],
  [UpgradeKey.BRAIN_SPAWN, 7],
  [UpgradeKey.SPEED_UP_ACTIVATE_DURATION, 8],
  [UpgradeKey.POINTS_PER_REVISIT, 9],
  [UpgradeKey.SPEED_UP_ACTIVATE_DURATION, 9],
  [UpgradeKey.BRAIN_TILE_DISTANCE, 10],
  [UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE, 10],
  [UpgradeKey.SPEED_UP_MULTIPLIER_STRENGTH, 11],
  [UpgradeKey.MULTIPLIER_POWER_UP_ACTIVATE_DURATION, 11],
  [UpgradeKey.MULTIPLIER_POWER_UP_STRENGTH, 12],
  [UpgradeKey.DESTRUCTIBLE_WALLS, 15],
]);

export const getMazeGridByBiome = (biomeKey: BiomeKey): MazeGridType => {
  if (biomeKey >= 0 && biomeKey < 8) {
    return MazeGridType.SQUARE;
  } else if (biomeKey >= 8 && biomeKey < 12) {
    return MazeGridType.RECTANGLE;
  } else if (biomeKey >= 12 && biomeKey < 16) {
    return MazeGridType.PLUS_SIGN;
  } else if (biomeKey >= 16 && biomeKey < 20) {
    return MazeGridType.DIAMOND;
  } else {
    return getMazeGridByBiome(biomeKey % 20);
  }
};

export const getMazeAlgorithmTypeByBiome = (biomeKey: BiomeKey): MazeAlgorithmType => {
  if (biomeKey >= 0 && biomeKey < 5) {
    return MazeAlgorithmType.BACK_TRACKER;
  } else if (biomeKey >= 5 && biomeKey < 8) {
    return MazeAlgorithmType.BINARY_TREE;
  } else if (biomeKey >= 8 && biomeKey < 12) {
    return MazeAlgorithmType.PRIMS;
  } else {
    return getMazeAlgorithmTypeByBiome(biomeKey % 12);
  }
};
