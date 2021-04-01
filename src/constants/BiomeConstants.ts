import BiomeColorPalette from "models/BiomeColorPalette";
import { BIOME_0_COLOR_PALETTE, BIOME_1_COLOR_PALETTE } from "constants/ColorConstants";
import { 
  APPLE_IMAGE_URL, 
  BANANA_IMAGE_URL, 
  CHERRY_IMAGE_URL, 
  FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_0, 
  FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_1, 
  FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_2, 
  FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_3, 
  FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_4, 
  GRAPES_IMAGE_URL, 
  MazeItemKey, 
  ORANGE_IMAGE_URL,
  FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_5,
  FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_6,
  FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_7,
  FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_8
} from "constants/ItemConstants";
import {
  BIOME_0_UPGRADE_COST,
  BIOME_1_UPGRADE_COST,
  BIOME_2_UPGRADE_COST,
  BIOME_3_UPGRADE_COST,
  BIOME_4_UPGRADE_COST,
  POINTS_PER_VISIT_BASE_AMOUNT_BIOME_0, 
  POINTS_PER_VISIT_BASE_AMOUNT_BIOME_1, 
  POINTS_PER_VISIT_BASE_AMOUNT_BIOME_2, 
  POINTS_PER_VISIT_BASE_AMOUNT_BIOME_3, 
  POINTS_PER_VISIT_BASE_AMOUNT_BIOME_4,
  UpgradeKey,
  BIOME_5_UPGRADE_COST,
  BIOME_6_UPGRADE_COST,
  POINTS_PER_VISIT_BASE_AMOUNT_BIOME_5,
  POINTS_PER_VISIT_BASE_AMOUNT_BIOME_6,
  POINTS_PER_VISIT_BASE_AMOUNT_BIOME_7,
  BIOME_UPGRADE_BASE_COST,
  BIOME_UPGRADE_SCALING_START_LEVEL,
  BIOME_UPGRADE_BASE_MULTPLIER
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
import { Maze } from "models/Maze";

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

const BIOME_UPGRADE_COST: Map<BiomeKey, number> = new Map([
  [0, BIOME_0_UPGRADE_COST],
  [1, BIOME_1_UPGRADE_COST],
  [2, BIOME_2_UPGRADE_COST],
  [3, BIOME_3_UPGRADE_COST],
  [4, BIOME_4_UPGRADE_COST],
  [5, BIOME_5_UPGRADE_COST],
  [6, BIOME_6_UPGRADE_COST],
]);

export const getBiomeUpgradeCost = (biomeKey: BiomeKey): number => {
  if (BIOME_UPGRADE_COST.has(biomeKey)) {
    return BIOME_UPGRADE_COST.get(biomeKey);
  } else {
    return BIOME_UPGRADE_BASE_COST * Math.pow(BIOME_UPGRADE_BASE_MULTPLIER, (biomeKey + 1 - BIOME_UPGRADE_SCALING_START_LEVEL));
  }
};

export const getBiomeColorPalette = (biomeKey: BiomeKey): BiomeColorPalette => {
  if (biomeKey >= 0) {
    return BIOME_0_COLOR_PALETTE;
  }
  return BIOME_0_COLOR_PALETTE;
};

export const BIOME_ITEM_UNLOCKS: Map<MazeItemKey, BiomeKey> = new Map([
  [MazeItemKey.FRUIT, 1],
  [MazeItemKey.MULTIPLIER, 2],
  [MazeItemKey.BRAIN, 6],
  [MazeItemKey.UNLIMITED_SPLITS, 8],
  [MazeItemKey.BLACK_HOLE, 8],
  [MazeItemKey.GHOST, 8],
]);

export const BIOME_UPGRADE_UNLOCKS: Map<UpgradeKey, BiomeKey> = new Map([
  [UpgradeKey.BIOME, 0],
  [UpgradeKey.AUTO_MOVE, 1],
  [UpgradeKey.POINTS_PER_VISIT, 1],
  [UpgradeKey.BOT_MOVEMENT_SPEED, 1],
  [UpgradeKey.AVOID_REVISIT_LAST_POSITION, 2],
  [UpgradeKey.PRIORITIZE_UNVISITED, 2],
  [UpgradeKey.MAZE_SIZE_UPGRADE, 2],
  [UpgradeKey.MAZE_COMPLETION_BONUS, 3],
  [UpgradeKey.PLAYER_MOVE_INDEPENDENTLY, 4],
  [UpgradeKey.FRUIT_PICKUP_POINTS, 4],
  [UpgradeKey.TELEPORT_BOT_BACK_TO_PLAYER, 5],
  [UpgradeKey.TELEPORT_PLAYER_BACK_TO_BOT, 5],
  [UpgradeKey.FRUIT_SPAWN, 5],
  [UpgradeKey.BOT_SPLIT_DIRECTION, 6],
  [UpgradeKey.AUTO_EXIT_MAZE, 7],
  
  [UpgradeKey.BOT_REMEMBER_DEADEND_TILES, 8],
  [UpgradeKey.BRAIN_TILE_DISTANCE, 10],
  [UpgradeKey.BRAIN_SPAWN, 10],
  [UpgradeKey.POINTS_PER_REVISIT, 7],
  [UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE, 7],
  [UpgradeKey.DESTRUCTIBLE_WALLS, 15],
]);

export const getMazeGridByBiome = (biomeKey: BiomeKey): MazeGridType => {
  if (biomeKey >= 0 && biomeKey < 8) {
    return MazeGridType.SQUARE;
  } else if (biomeKey >= 8 && biomeKey < 15) {
    return MazeGridType.RECTANGLE;
  } else if (biomeKey >= 15 && biomeKey < 20) {
    return MazeGridType.PLUS_SIGN;
  } else if (biomeKey >= 20 && biomeKey < 25) {
    return MazeGridType.DIAMOND;
  } else {
    return getMazeGridByBiome(biomeKey % 25);
  }
};

export const getMazeAlgorithmTypeByBiome = (biomeKey: BiomeKey): MazeAlgorithmType => {
  if (biomeKey >= 0 && biomeKey < 5) {
    return MazeAlgorithmType.BACK_TRACKER;
  } else if (biomeKey >= 5 && biomeKey < 10) {
    return MazeAlgorithmType.BINARY_TREE;
  } else if (biomeKey >= 10 && biomeKey < 15) {
    return MazeAlgorithmType.PRIMS;
  } else {
    return getMazeAlgorithmTypeByBiome(biomeKey % 15)
  }
};
