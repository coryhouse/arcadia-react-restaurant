import * as z from "zod";

export const foodTags = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Drink",
  "Appetizer",
  "Spicy",
  "Vegetarian",
  "Alcoholic",
] as const;

export type FoodTag = (typeof foodTags)[number];

export const foodSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  tags: z.array(z.enum(foodTags)),
});

export type Food = z.infer<typeof foodSchema>;

export type NewFood = Omit<Food, "id">;
