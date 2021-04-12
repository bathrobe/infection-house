import { fetcher } from "../../lib/fetcher";
import { getAllPosts } from "../../lib/getAllPosts";

export default function Post({ WPpost, GApost }) {
  return (
    <div>
      <h1>{WPpost[0]?.title?.rendered}</h1>
      {/* <p>
        {GApost?.description
          ? GApost?.description
          : "Couldn't find description"}
      </p> */}
    </div>
  );
}
//we need guest author post_name == slug from vanilla API, use this to link them

export async function getStaticPaths() {
  // fetch content (e.g. using a WordPress API helper...
  const authors = await fetcher(
    "https://infectionhouse.com/wp-json/guest-author/authors"
  );
  const allPosts = await getAllPosts(authors);

  // then return all of the rendered paths here:
  if (allPosts && allPosts.length) {
    return {
      // put the slugs in with /blog/[slug] format
      paths: allPosts.map(({ post_name, ID }) => ({
        params: { post_name, ID },
      })),
      fallback: true,
    };
  }

  // fallback to empty path if no posts found
  return {
    paths: [],
    fallback: true,
  };
}

export const getStaticProps = async ({ params }) => {
  if (!params) {
    return {
      props: {
        post: null,
      },
    };
  }
  const WPpost = await fetcher(
    `https://infectionhouse.com/wp-json/wp/v2/posts?slug=${params.post_name}`
  );
  // const author = await fetcher(
  //   `https://infectionhouse.com//wp-json/guest-author/authors?id=${params.guest_author?.id}`
  // );
  return {
    props: {
      WPpost,
    },
  };
};
