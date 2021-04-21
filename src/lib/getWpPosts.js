import { fetcher } from "./fetcher";

export const getWpPosts = async (allPosts) => {
  const pNames = allPosts.map((p) => p.post_name);
  let postsByName = [];
  for (const postName of pNames) {
    const wpPosts = await fetcher(
      `https://wp-api.infectionhouse.com/wp-json/wp/v2/posts?slug=${postName}`
    );
    postsByName.push(...wpPosts);
  }
  return postsByName;
};
