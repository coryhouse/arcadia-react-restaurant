import { FixedSizeGrid as Grid } from "react-window";
import { FoodCard } from "./FoodCard";
import type { Food } from "../types/food.types";
import { useMemo, useState, useEffect } from "react";

type VirtualizedFoodListProps = {
  foods: Food[];
  showActions?: boolean;
  isPending?: boolean;
};

const CARD_WIDTH = 400; // Approximate width including margin
const CARD_HEIGHT = 390; // Accommodate all content + row margin
const MENU_HEIGHT = 300; // Height for navigation + menu header section

export function VirtualizedFoodList({
  foods,
  showActions = false,
  isPending = false,
}: VirtualizedFoodListProps) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerWidth = windowSize.width - 40;
  const containerHeight = windowSize.height - MENU_HEIGHT;
  const columnsCount = Math.min(
    3,
    Math.max(1, Math.floor(containerWidth / CARD_WIDTH))
  );
  const rowsCount = Math.ceil(foods.length / columnsCount);

  const itemData = useMemo(
    () => ({
      foods,
      columnsCount,
      showActions,
    }),
    [foods, columnsCount, showActions]
  );

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
    data,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
    data: { foods: Food[]; columnsCount: number; showActions: boolean };
  }) => {
    const index = rowIndex * data.columnsCount + columnIndex;
    const food = data.foods[index];

    if (!food) {
      return <div style={style} />;
    }

    return (
      <div style={style}>
        <div style={{ padding: "12px", paddingBottom: "20px" }}>
          <FoodCard food={food} showActions={data.showActions} />
        </div>
      </div>
    );
  };

  if (foods.length === 0) {
    return <div>No foods found.</div>;
  }

  return (
    <div style={{ opacity: isPending ? 0.7 : 1 }}>
      <Grid
        columnCount={columnsCount}
        columnWidth={CARD_WIDTH}
        height={containerHeight}
        rowCount={rowsCount}
        rowHeight={CARD_HEIGHT}
        width={containerWidth}
        itemData={itemData}
      >
        {Cell}
      </Grid>
    </div>
  );
}
