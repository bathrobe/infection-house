import Link from "next/link";
import dayjs from "dayjs";

export default function PostCard({ post }) {
  const {
    guest_author,
    post_title,
    post_name,
    post_date,
    featured_image,
  } = post;
  return (
    <article className="my-4 mx-6">
      <Link href={`/posts/${guest_author.id}/${post_name}`}>
        <a>
          <img width={400} src={featured_image} />

          <div>
            <h1 className="text-2xl tracking-tight">{post_title}</h1>
            <p className="uppercase">{guest_author.name}</p>
            <p>{dayjs(post_date).format("MM-DD-YYYY")}</p>
          </div>
        </a>
      </Link>
    </article>
  );
}
