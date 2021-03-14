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
  POINTS_PER_VISIT_BASE_AMOUNT_BIOME_7
} from "constants/UpgradeConstants";


export enum BiomeKey {
  // Use indexes to match up with upgrades
  BIOME_0 = 0,
  BIOME_1 = 1,
  BIOME_2 = 2,
  BIOME_3 = 3,
  BIOME_4 = 4,
  BIOME_5 = 5,
  BIOME_6 = 6,
  BIOME_7 = 7,
  BIOME_8 = 8,
}

export const BIOME_IMAGE_URL_MAP: Map<BiomeKey, string> = new Map([
  [BiomeKey.BIOME_0, BANANA_IMAGE_URL],
  [BiomeKey.BIOME_1, BANANA_IMAGE_URL],
  [BiomeKey.BIOME_2, APPLE_IMAGE_URL],
  [BiomeKey.BIOME_3, APPLE_IMAGE_URL],
  [BiomeKey.BIOME_4, GRAPES_IMAGE_URL],
  [BiomeKey.BIOME_5, GRAPES_IMAGE_URL],
  [BiomeKey.BIOME_6, ORANGE_IMAGE_URL],
  [BiomeKey.BIOME_6, ORANGE_IMAGE_URL],
  [BiomeKey.BIOME_7, CHERRY_IMAGE_URL],
  [BiomeKey.BIOME_8, CHERRY_IMAGE_URL],
]);

export const BIOME_BASE_POINTS_PER_VISIT_VALUE: Map<BiomeKey, number> = new Map([
  [BiomeKey.BIOME_0, POINTS_PER_VISIT_BASE_AMOUNT_BIOME_0],
  [BiomeKey.BIOME_1, POINTS_PER_VISIT_BASE_AMOUNT_BIOME_1],
  [BiomeKey.BIOME_2, POINTS_PER_VISIT_BASE_AMOUNT_BIOME_2],
  [BiomeKey.BIOME_3, POINTS_PER_VISIT_BASE_AMOUNT_BIOME_3],
  [BiomeKey.BIOME_4, POINTS_PER_VISIT_BASE_AMOUNT_BIOME_4],
  [BiomeKey.BIOME_5, POINTS_PER_VISIT_BASE_AMOUNT_BIOME_5],
  [BiomeKey.BIOME_6, POINTS_PER_VISIT_BASE_AMOUNT_BIOME_6],
  [BiomeKey.BIOME_7, POINTS_PER_VISIT_BASE_AMOUNT_BIOME_7],
  [BiomeKey.BIOME_8, POINTS_PER_VISIT_BASE_AMOUNT_BIOME_7],
]);

export const BIOME_BASE_FRUIT_ITEM_PICKUP_VALUE: Map<BiomeKey, number> = new Map([
  [BiomeKey.BIOME_0, FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_0],
  [BiomeKey.BIOME_1, FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_1],
  [BiomeKey.BIOME_2, FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_2],
  [BiomeKey.BIOME_3, FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_3],
  [BiomeKey.BIOME_4, FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_4],
  [BiomeKey.BIOME_5, FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_5],
  [BiomeKey.BIOME_6, FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_6],
  [BiomeKey.BIOME_7, FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_7],
  [BiomeKey.BIOME_8, FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_8],
]);

export const BIOME_UPGRADE_COST: Map<BiomeKey, number> = new Map([
  [BiomeKey.BIOME_0, BIOME_0_UPGRADE_COST],
  [BiomeKey.BIOME_1, BIOME_1_UPGRADE_COST],
  [BiomeKey.BIOME_2, BIOME_2_UPGRADE_COST],
  [BiomeKey.BIOME_3, BIOME_3_UPGRADE_COST],
  [BiomeKey.BIOME_4, BIOME_4_UPGRADE_COST],
  [BiomeKey.BIOME_5, BIOME_5_UPGRADE_COST],
  [BiomeKey.BIOME_6, BIOME_6_UPGRADE_COST],
  [BiomeKey.BIOME_7, BIOME_6_UPGRADE_COST],
  [BiomeKey.BIOME_8, BIOME_6_UPGRADE_COST],
]);

export const BIOME_COLOR_PALETTE_MAP = new Map<BiomeKey, BiomeColorPalette>([
  [BiomeKey.BIOME_0, BIOME_0_COLOR_PALETTE],
  [BiomeKey.BIOME_1, BIOME_1_COLOR_PALETTE],
  [BiomeKey.BIOME_2, BIOME_1_COLOR_PALETTE],
  [BiomeKey.BIOME_3, BIOME_1_COLOR_PALETTE],
  [BiomeKey.BIOME_4, BIOME_1_COLOR_PALETTE],
  [BiomeKey.BIOME_5, BIOME_1_COLOR_PALETTE],
  [BiomeKey.BIOME_6, BIOME_1_COLOR_PALETTE],
  [BiomeKey.BIOME_7, BIOME_1_COLOR_PALETTE],
  [BiomeKey.BIOME_8, BIOME_1_COLOR_PALETTE]
]);

export const BIOME_ITEM_UNLOCKS: Map<MazeItemKey, BiomeKey> = new Map([
  [MazeItemKey.FRUIT, BiomeKey.BIOME_1],
  [MazeItemKey.UNLIMITED_SPLITS, BiomeKey.BIOME_8],
  [MazeItemKey.BLACK_HOLE, BiomeKey.BIOME_8],
  [MazeItemKey.BRAIN, BiomeKey.BIOME_6],
  [MazeItemKey.MULTIPLIER, BiomeKey.BIOME_2],
]);

export const BIOME_UPGRADE_UNLOCKS: Map<UpgradeKey, BiomeKey> = new Map([
  // Biome 0
  [UpgradeKey.POINTS_PER_VISIT, BiomeKey.BIOME_0],
  [UpgradeKey.BOT_MOVEMENT_SPEED, BiomeKey.BIOME_0],
  [UpgradeKey.AVOID_REVISIT_LAST_POSITION, BiomeKey.BIOME_0],
  [UpgradeKey.PRIORITIZE_UNVISITED, BiomeKey.BIOME_0],
  [UpgradeKey.BIOME, BiomeKey.BIOME_0],
  
  // Biome 1
  [UpgradeKey.MAZE_SIZE_UPGRADE, BiomeKey.BIOME_1],
  [UpgradeKey.MAZE_COMPLETION_BONUS, BiomeKey.BIOME_1],
  
  // Biome 2
  [UpgradeKey.FRUIT_SPAWN, BiomeKey.BIOME_2],
  [UpgradeKey.FRUIT_PICKUP_POINTS, BiomeKey.BIOME_2],
  [UpgradeKey.BOT_SPLIT_DIRECTION, BiomeKey.BIOME_2],
  [UpgradeKey.AUTO_EXIT_MAZE, BiomeKey.BIOME_2],
  
  // Biome 3
  [UpgradeKey.BOT_REMEMBER_DEADEND_TILES, BiomeKey.BIOME_3],
  [UpgradeKey.MULTIPLIER_ITEM_SPAWN_RATE, BiomeKey.BIOME_3],
  [UpgradeKey.MULTIPLIER_ITEM_STRENGTH, BiomeKey.BIOME_3],
  
  // Biome 4
  [UpgradeKey.MULTIPLIER_ITEM_EXTRA_BOT, BiomeKey.BIOME_4],
  [UpgradeKey.UNLIMITED_SPLIT_ITEM_EXTRA_BOT, BiomeKey.BIOME_4],
  
  // Biome X
  [UpgradeKey.DESTRUCTIBLE_WALLS, BiomeKey.BIOME_8],
  [UpgradeKey.BRAIN_TILE_DISTANCE, BiomeKey.BIOME_6],
  [UpgradeKey.BRAIN_SPAWN, BiomeKey.BIOME_6],
  [UpgradeKey.POINTS_PER_REVISIT, BiomeKey.BIOME_7],
  [UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE, BiomeKey.BIOME_7],
]);
