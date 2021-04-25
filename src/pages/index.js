import { fetcher } from "../lib/fetcher";
import { getAllPosts } from "../lib/getAllPosts";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import { useState } from "react";
import { getWpPosts } from "../lib/getWpPosts";
import Layout from "../components/Layout";
export default function Home({ allPosts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const posts = allPosts.map((p) => {
    return <PostCard post={p} />;
  });
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <Layout>
      <div className="mx-4 md:mx-24 my-24">
        <div className="grid grid-cols-1 md:grid-cols-3">{currentPosts}</div>{" "}
        <div className="flex justify-center">
          {" "}
          <Pagination
            paginate={paginate}
            itemsPerPage={postsPerPage}
            totalItems={allPosts.length}
          />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const authors = await fetcher(
    "https://wp-api.infectionhouse.com/wp-json/guest-author/authors"
  );
  const allPosts = await getAllPosts(authors);
  // post.ID for allPosts gets fed into vanilla API
  const wpPosts = await getWpPosts(allPosts);

  return { props: { authors, allPosts, wpPosts } };
}
