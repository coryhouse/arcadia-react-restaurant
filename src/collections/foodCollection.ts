import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/react-db";
import ky from "ky";
import { foodSchema } from "../types/food.types";
import { queryClient } from "../queryClient";
import { env } from "../types/env.types";

const baseUrl = env.VITE_API_URL + "/foods";

export const foodCollection = createCollection(
  queryCollectionOptions({
    queryClient,
    queryKey: ["foods"],
    getKey: (item) => item.id,
    schema: foodSchema, // Type the collection via Zod (so don't need to specify types elsewhere such as getKey)

    // Handle all CRUD operations. The read is named queryFn (inspired by Tanstack Query)
    queryFn: async () => {
      const json = await ky.get(baseUrl).json();
      return foodSchema.array().parse(json);
    },
    onInsert: async ({ transaction }) => {
      const { changes } = transaction.mutations[0];
      return await ky.post(baseUrl, { json: changes });
    },
    onUpdate: async ({ transaction }) => {
      const { original, modified } = transaction.mutations[0];
      return await ky.put(`${baseUrl}/${original.id}`, { json: modified });
    },
    onDelete: async ({ transaction }) => {
      const { key } = transaction.mutations[0];
      return await ky.delete(`${baseUrl}/${key}`);
    },
  })
);
