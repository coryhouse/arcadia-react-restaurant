import { createFileRoute, notFound } from "@tanstack/react-router";
import { FoodCard } from "../shared/FoodCard";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { z } from "zod";
import { foodCollection } from "../collections/foodCollection";
import { FoodRatings } from "../shared/FoodRatings";

export const Route = createFileRoute("/food/$foodId")({
  params: {
    parse: (params) => ({
      foodId: z.string().parse(params.foodId),
    }),
  },
  component: FoodDetail,
});

function FoodDetail() {
  const { foodId } = Route.useParams();

  const { data: foods, isLoading } = useLiveQuery((q) =>
    q.from({ food: foodCollection }).where(({ food }) => eq(food.id, foodId))
  );

  if (isLoading) return <p>Loading...</p>;
  if (foods.length === 0) throw notFound();
  return (
    <>
      <FoodCard food={foods[0]} />
      <FoodRatings foodId={foods[0].id} />
    </>
  );
}
