import { useState, useDeferredValue } from "react";
import { type FoodTag, foodTags } from "../types/food.types";
import { createFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "@tanstack/react-db";
import { foodCollection } from "../collections/foodCollection";
import { VirtualizedFoodList } from "../shared/VirtualizedFoodList";

export const Route = createFileRoute("/")({
  component: Index,
  errorComponent: () => <div>Oops! Failed to load the menu.</div>,
});

function Index() {
  const [selectedTag, setSelectedTag] = useState<FoodTag | "">("");
  const [searchText, setSearchText] = useState("");
  const deferredSearchText = useDeferredValue(searchText);
  const { data: foods, isLoading } = useLiveQuery(foodCollection);

  if (isLoading) return <p>Loading...</p>;
  if (!foods) return <p>No foods found</p>;

  // Derived state
  const matchingFoods = foods.filter((food) => {
    const matchesTag = selectedTag === "" || food.tags.includes(selectedTag);
    const matchesSearch =
      deferredSearchText === "" ||
      food.name.toLowerCase().includes(deferredSearchText.toLowerCase()) ||
      food.description.toLowerCase().includes(deferredSearchText.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Menu</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="tag-filter"
            >
              Filter by category
            </label>
            <select
              id="tag-filter"
              value={selectedTag}
              onChange={(event) =>
                setSelectedTag(event.target.value as FoodTag)
              }
              className="block w-full h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All categories</option>
              {foodTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="search-input"
            >
              Search menu
            </label>
            <input
              id="search-input"
              type="text"
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
              placeholder="Search by name or description..."
              className="block w-full h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {(selectedTag !== "" || searchText !== "") && (
          <div className="mb-4 p-3 bg-blue-50 rounded-md">
            <p className="text-blue-700 font-medium">
              {matchingFoods.length} item{matchingFoods.length !== 1 && "s"}{" "}
              found
            </p>
          </div>
        )}
      </div>

      <VirtualizedFoodList
        foods={matchingFoods}
        showActions={true}
        isPending={searchText !== deferredSearchText}
      />
    </>
  );
}
