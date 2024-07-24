import { z, defineCollection, reference } from "astro:content";

const blogPostCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    topics: z.array(reference("topics")),
  }),
});

const topicsCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    icon: z.string(),
  }),
});

export const collections = {
  blogpost: blogPostCollection,
  topics: topicsCollection,
};
