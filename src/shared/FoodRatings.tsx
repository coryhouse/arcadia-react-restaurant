import { eq, useLiveQuery } from "@tanstack/react-db";
import type { Rating } from "../types/rating.types";
import { ratingCollection } from "../collections/ratingCollection";

type FoodRatingsProps = {
  foodId: string;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function RatingItem({ rating }: { rating: Rating }) {
  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <StarRating rating={rating.rating} />
        <span className="text-sm text-gray-600">({rating.rating}/5)</span>
      </div>
      {rating.comment && <p className="text-gray-700">{rating.comment}</p>}
    </div>
  );
}

export function FoodRatings({ foodId }: FoodRatingsProps) {
  const { data: ratings, isLoading } = useLiveQuery((q) =>
    q
      .from({ rating: ratingCollection })
      .where(({ rating }) => eq(rating.foodId, foodId))
  );

  if (isLoading || !ratings) return <p>Loading ratings...</p>;

  if (ratings.length === 0) {
    return (
      <div className="mt-8 p-4">
        <h3 className="text-xl font-bold mb-4">Reviews</h3>
        <p className="text-gray-600">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  const averageRating =
    ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;

  return (
    <div className="mt-8 p-4">
      <h3 className="text-xl font-bold mb-4">Reviews</h3>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <StarRating rating={Math.round(averageRating)} />
          <span className="text-lg font-semibold">
            {averageRating.toFixed(1)}/5
          </span>
          <span className="text-gray-600">
            ({ratings.length} review{ratings.length > 1 ? "s" : ""})
          </span>
        </div>
      </div>
      <div className="space-y-0">
        {ratings.map((rating) => (
          <RatingItem key={rating.id} rating={rating} />
        ))}
      </div>
    </div>
  );
}
