import { fetcher } from "../../../lib/fetcher";
import { getAllPosts } from "../../../lib/getAllPosts";

export default function Post({ author, post }) {
  console.log(post);
  function createMarkup(descrip) {
    return { __html: descrip };
  }
  const { name, description, avatar_url } = author;
  return (
    <div>
      <h1>{post[0].title.rendered}</h1>
      <p>{post[0].date}</p>
      <p>{name}</p>
      <img src={post[0].jetpack_featured_media_url} />
      <div dangerouslySetInnerHTML={createMarkup(post[0].excerpt?.rendered)} />
      <div dangerouslySetInnerHTML={createMarkup(post[0].content?.rendered)} />

      <div>
        <hr />
        <h1>{name}</h1>
        <img src={avatar_url} />
        <div dangerouslySetInnerHTML={createMarkup(description)} />
        <hr />
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const authors = await fetcher(
    "https://infectionhouse.com/wp-json/guest-author/authors"
  );
  const allPosts = await getAllPosts(authors);

  return {
    paths: allPosts.map((p) => {
      return {
        params: { id: p.guest_author.id.toString(), post_name: p.post_name },
      };
    }),
    fallback: false, // fallback is set to false because we already know the slugs ahead of time
  };
};

export const getStaticProps = async ({ params }) => {
  if (!params) {
    return {
      props: {
        post: null,
      },
    };
  }
  const author = await fetcher(
    `https://infectionhouse.com/wp-json/guest-author/authors?id=${params.id}`
  );
  const post = await fetcher(
    `https://infectionhouse.com/wp-json/wp/v2/posts?slug=${params.post_name}`
  );
  return {
    props: {
      author,
      post,
    },
  };
};
