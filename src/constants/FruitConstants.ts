import { 
  APPLE_IMAGE_URL, 
  BANANA_IMAGE_URL, 
  CHERRY_IMAGE_URL,
  GRAPES_IMAGE_URL,
  ORANGE_IMAGE_URL
} from "constants/ItemConstants";

export interface Fruit {
  basePoints: number;
  fruitTier: number;
  imageUrl: string;
}

export const FRUIT_TIER_1: Fruit = {
  basePoints: 20,
  fruitTier: 1,
  imageUrl: BANANA_IMAGE_URL,
};
export const FRUIT_TIER_2: Fruit = {
  basePoints: 40,
  fruitTier: 2,
  imageUrl: APPLE_IMAGE_URL,
};
export const FRUIT_TIER_3: Fruit = {
  basePoints: 80,
  fruitTier: 3,
  imageUrl: GRAPES_IMAGE_URL,
};
export const FRUIT_TIER_4: Fruit = {
  basePoints: 160,
  fruitTier: 4,
  imageUrl: ORANGE_IMAGE_URL,
};
export const FRUIT_TIER_5: Fruit = {
  basePoints: 320,
  fruitTier: 5,
  imageUrl: CHERRY_IMAGE_URL,
};
