import { 
  APPLE_IMAGE_URL, 
  BANANA_IMAGE_URL, 
  FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_0, 
  FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_1, 
  FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_2, 
  FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_3, 
  GRAPES_IMAGE_URL, 
  ORANGE_IMAGE_URL 
} from "./ItemConstants";
import { 
  BIOME_0_PURCHASE_COST,
  BIOME_1_PURCHASE_COST,
  BIOME_2_PURCHASE_COST,
  BIOME_3_PURCHASE_COST,
  POINTS_PER_VISIT_BASE_AMOUNT_BIOME_0, 
  POINTS_PER_VISIT_BASE_AMOUNT_BIOME_1, 
  POINTS_PER_VISIT_BASE_AMOUNT_BIOME_2, 
  POINTS_PER_VISIT_BASE_AMOUNT_BIOME_3 
} from "./UpgradeConstants";



export enum BiomeKey {
  // Use indexes to match up with upgrades
  BIOME_0 = 0,
  BIOME_1 = 1,
  BIOME_2 = 2,
  BIOME_3 = 3,
}

export const BIOME_IMAGE_URL_MAP: Map<BiomeKey, string> = new Map([
  [BiomeKey.BIOME_0, BANANA_IMAGE_URL],
  [BiomeKey.BIOME_1, APPLE_IMAGE_URL],
  [BiomeKey.BIOME_2, GRAPES_IMAGE_URL],
  [BiomeKey.BIOME_3, ORANGE_IMAGE_URL],
]);

export const BIOME_BASE_POINTS_PER_VISIT_VALUE: Map<BiomeKey, number> = new Map([
  [BiomeKey.BIOME_0, POINTS_PER_VISIT_BASE_AMOUNT_BIOME_0],
  [BiomeKey.BIOME_1, POINTS_PER_VISIT_BASE_AMOUNT_BIOME_1],
  [BiomeKey.BIOME_2, POINTS_PER_VISIT_BASE_AMOUNT_BIOME_2],
  [BiomeKey.BIOME_3, POINTS_PER_VISIT_BASE_AMOUNT_BIOME_3],
]);

export const BIOME_BASE_FRUIT_ITEM_PICKUP_VALUE: Map<BiomeKey, number> = new Map([
  [BiomeKey.BIOME_0, FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_0],
  [BiomeKey.BIOME_1, FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_1],
  [BiomeKey.BIOME_2, FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_2],
  [BiomeKey.BIOME_3, FRUIT_PICKUP_POINTS_BASE_AMOUNT_BIOME_3],
]);

export const BIOME_UPGRADE_COST: Map<BiomeKey, number> = new Map([
  [BiomeKey.BIOME_0, BIOME_0_PURCHASE_COST],
  [BiomeKey.BIOME_1, BIOME_1_PURCHASE_COST],
  [BiomeKey.BIOME_2, BIOME_2_PURCHASE_COST],
  [BiomeKey.BIOME_3, BIOME_3_PURCHASE_COST],
]);