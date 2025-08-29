import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import type { Food, FoodTag } from "../types/food.types";
import { Card } from "./Card";
import { foodCollection } from "../collections/foodCollection";

const tagIcons: Record<FoodTag, string> = {
  Breakfast: "🥞",
  Lunch: "🍽️",
  Dinner: "🍖",
  Dessert: "🍰",
  Drink: "🥤",
  Appetizer: "🥗",
  Spicy: "🌶️",
  Vegetarian: "🥬",
  Alcoholic: "🍷",
};

type FoodCardProps = {
  food: Food;
  showActions?: boolean;
};

export function FoodCard({ food, showActions = false }: FoodCardProps) {
  return (
    <Card>
      <div
        className={`flex flex-col sm:flex-row gap-4 ${showActions ? "h-80" : ""}`}
      >
        <div className="flex-1 flex flex-col">
          <h2
            className={
              showActions
                ? "text-lg font-semibold mb-2"
                : "text-2xl font-bold mb-4"
            }
          >
            {showActions ? (
              <Link
                to="/food/$foodId"
                params={{ foodId: food.id }}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {food.name}
              </Link>
            ) : (
              food.name
            )}
          </h2>

          {showActions && (
            <div className="flex gap-2 mb-3">
              <Link
                className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                to="/admin/{-$foodId}"
                params={{ foodId: food.id }}
              >
                Edit
              </Link>
              <button
                aria-label={"Delete " + food.name}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                onClick={() => {
                  foodCollection.delete(food.id);
                  toast.success("Food deleted");
                }}
              >
                Delete
              </button>
            </div>
          )}

          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {food.description}
          </p>

          <div
            className={`flex items-center justify-between ${showActions ? "mt-auto" : ""}`}
          >
            <p
              className={`font-bold ${showActions ? "text-lg" : "text-xl"} text-green-600`}
            >
              ${food.price}
            </p>

            <div className="flex flex-wrap gap-1">
              {food.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full flex items-center gap-1"
                  title={tag}
                >
                  <span>{tagIcons[tag]}</span>
                  <span className="hidden sm:inline">{tag}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full sm:w-32 md:w-40 flex-shrink-0">
          <img
            className="w-full h-32 sm:h-full object-cover rounded-lg shadow-sm"
            alt={food.name}
            src={`/images/${food.image}`}
          />
        </div>
      </div>
    </Card>
  );
}
