import { fetcher } from "../../../lib/fetcher";
import { getAllPosts } from "../../../lib/getAllPosts";

export default function Post({ author, post, loc, cat }) {
  function createMarkup(descrip) {
    return { __html: descrip };
  }
  const { name, description, avatar_url } = author;
  return (
    <div>
      <h1 dangerouslySetInnerHTML={createMarkup(post[0].title.rendered)} />
      <p>{post[0].date}</p>
      <p>{name}</p>
      <p>{loc.name}</p>
      <p>{cat.name}</p>
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
  const loc = await fetcher(
    `https://infectionhouse.com/wp-json/wp/v2/location/${post[0].location[0]}`
  );
  const cat = await fetcher(
    `https://infectionhouse.com/wp-json/wp/v2/categories/${post[0].categories[0]}`
  );
  return {
    props: {
      author,
      post,
      loc,
      cat,
    },
  };
};
