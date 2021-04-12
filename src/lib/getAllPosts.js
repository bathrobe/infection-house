import { fetcher } from "./fetcher";

export const getAllPosts = async (auths) => {
  const ids = auths.map((a) => a.id);
  let allPosts = [];
  for (const id of ids) {
    const posts = await fetcher(
      `https://infectionhouse.com/wp-json/guest-author/posts?id=${id}&withauthor=true`
    );
    allPosts.push(...posts);
  }
  return allPosts;
};
