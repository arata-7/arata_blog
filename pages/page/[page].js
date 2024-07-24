import { client } from "../../libs/client";
import Link from "next/link";
import styles from "../../styles/Home.module.scss";
import { Pagination } from "../../components/Pagination";

const PER_PAGE = 5;

export default function BlogPage({ blogs, totalCount, currentPage }) {
  return (
    <div>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} currentPage={currentPage} />
    </div>
  );
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  // ページ数を計算して、そのページに対するパスを生成
  const totalPages = Math.ceil(data.totalCount / PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
  const page = parseInt(context.params.page, 10) || 1;
  const offset = (page - 1) * PER_PAGE;
  const data = await client.get({
    endpoint: "blog",
    queries: { offset, limit: PER_PAGE },
  });

  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
      currentPage: page
    },
  };
};
