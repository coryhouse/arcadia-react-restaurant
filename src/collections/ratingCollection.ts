import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/react-db";
import ky from "ky";
import { ratingSchema } from "../types/rating.types";
import { queryClient } from "../queryClient";
import { env } from "../types/env.types";

const baseUrl = env.VITE_API_URL + "/ratings";

export const ratingCollection = createCollection(
  queryCollectionOptions({
    queryClient,
    queryKey: ["ratings"],
    getKey: (item) => item.id,
    schema: ratingSchema,

    queryFn: async () => {
      const json = await ky.get(baseUrl).json();
      return ratingSchema.array().parse(json);
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
