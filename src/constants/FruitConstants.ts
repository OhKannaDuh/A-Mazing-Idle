import { 
  APPLE_IMAGE_URL, 
  BANANA_IMAGE_URL, 
  CHERRY_IMAGE_URL,
  GRAPES_IMAGE_URL,
  ORANGE_IMAGE_URL
} from "constants/ItemConstants";

export interface Fruit {
  fruitTier: number;
  imageUrl: string;
}

export const FRUIT_TIER_1: Fruit = {
  fruitTier: 1,
  imageUrl: BANANA_IMAGE_URL,
};
export const FRUIT_TIER_2: Fruit = {
  fruitTier: 2,
  imageUrl: APPLE_IMAGE_URL,
};
export const FRUIT_TIER_3: Fruit = {
  fruitTier: 3,
  imageUrl: GRAPES_IMAGE_URL,
};
export const FRUIT_TIER_4: Fruit = {
  fruitTier: 4,
  imageUrl: ORANGE_IMAGE_URL,
};
export const FRUIT_TIER_5: Fruit = {
  fruitTier: 5,
  imageUrl: CHERRY_IMAGE_URL,
};
