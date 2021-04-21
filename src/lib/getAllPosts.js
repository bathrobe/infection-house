import { fetcher } from "./fetcher";

export const getAllPosts = async (auths) => {
  const ids = auths.map((a) => a.id);
  let allPosts = [];
  for (const id of ids) {
    const posts = await fetcher(
      `https://wp-api.infectionhouse.com/wp-json/guest-author/posts?id=${id}&withauthor=true`
    );
    allPosts.push(...posts);
  }
  for (const post of allPosts) {
    const wpPost = await fetcher(
      `https://wp-api.infectionhouse.com/wp-json/wp/v2/posts?slug=${post.post_name}`
    );
    //loc and category ids
    const loc = await fetcher(
      `https://wp-api.infectionhouse.com/wp-json/wp/v2/location/${wpPost[0].location[0]}`
    );
    post.location = loc;

    return allPosts;
  }
};
