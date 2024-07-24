import { Pagination } from "../components/Pagination";
import Link from "next/link";
import { client } from "../libs/client";

export default function Home({ blog, totalCount }) {
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount}/>
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog", queries: { offset: 0, limit: 5 } });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount
    },
  };
};
