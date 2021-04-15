import Head from "next/head";
import styles from "../styles/Home.module.css";
import { fetcher } from "../lib/fetcher";
import { getAllPosts } from "../lib/getAllPosts";
import Link from "next/link";
export default function Home({ authors, allPosts }) {
  function createMarkup(descrip) {
    return { __html: descrip };
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          {allPosts.map((p) => {
            return (
              <div>
                <h1>
                  <Link href={`/posts/${p.post_name}`}>
                    <a>{p.post_title}</a>
                  </Link>
                </h1>
                <p>{p.post_date}</p>
                <h4>
                  <Link href={`/authors/${p.guest_author.id}`}>
                    <a>{p.guest_author.name}</a>
                  </Link>
                </h4>
              </div>
            );
          })}
        </div>
        {/* {authors.map((a) => {
          return (
            <div>
              <h1>{a.name}</h1>
              <img src={a.avatar_url} />
              <div
                style={{ textAlign: "center" }}
                dangerouslySetInnerHTML={createMarkup(a.description)}
              />
              ;
            </div>
          );
        })} */}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const authors = await fetcher(
    "https://infectionhouse.com/wp-json/guest-author/authors"
  );
  const allPosts = await getAllPosts(authors);
  return { props: { authors, allPosts } };
}
