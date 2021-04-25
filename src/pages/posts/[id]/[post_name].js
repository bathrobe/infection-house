import { fetcher } from "../../../lib/fetcher";
import { getAllPosts } from "../../../lib/getAllPosts";
import Layout from "../../../components/Layout";
import dayjs from "dayjs";
export default function Post({ author, authorPost, post, loc, cat }) {
  function createMarkup(descrip) {
    return { __html: descrip };
  }
  const { name, description, avatar_url } = author;
  return (
    <Layout>
      <main className="max-w-5xl mx-auto my-16">
        <h1
          className="text-5xl text-gray-700 font-bold my-4"
          dangerouslySetInnerHTML={createMarkup(post[0].title.rendered)}
        />
        <p className="text-lg my-2"></p>
        <p className="text-lg">
          {dayjs(post[0].date).format("MM-DD-YY")} // {cat.name} - {loc.name}
        </p>
        <p className="uppercase text-lg my-4">{name}</p>{" "}
        <div className="flex"></div>
        <img height="500px" src={authorPost[0].featured_image} />
        <div
          className="my-4 text-xl mx-4"
          dangerouslySetInnerHTML={createMarkup(post[0].content?.rendered)}
        />
        <hr className="my-16" />
        <div>
          <div className="md:flex md:items-center">
            <img src={avatar_url} />{" "}
            <div className="md:ml-6">
              <h1 className="text-2xl mb-4">{name}</h1>
              <div dangerouslySetInnerHTML={createMarkup(description)} />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const authors = await fetcher(
    "https://wp-api.infectionhouse.com/wp-json/guest-author/authors"
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
    `https://wp-api.infectionhouse.com/wp-json/guest-author/authors?id=${params.id}`
  );
  const authorPost = await fetcher(
    `https://wp-api.infectionhouse.com/wp-json/guest-author/posts?id=${params.id}`
  );
  const post = await fetcher(
    `https://wp-api.infectionhouse.com/wp-json/wp/v2/posts?slug=${params.post_name}`
  );
  const loc = await fetcher(
    `https://wp-api.infectionhouse.com/wp-json/wp/v2/location/${post[0].location[0]}`
  );
  const cat = await fetcher(
    `https://wp-api.infectionhouse.com/wp-json/wp/v2/categories/${post[0].categories[0]}`
  );
  return {
    props: {
      author,
      authorPost,
      post,
      loc,
      cat,
    },
  };
};
