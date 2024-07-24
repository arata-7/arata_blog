// pages/blog/[id].js
import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss";
import { Pagination } from "../../components/Pagination";

const PER_PAGE = 5;

export default function BlogId({ blog, totalCount }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <p> {blog.category && blog.category.name}</p>
      <div
        className={styles.post}
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
      <Pagination totalCount={totalCount} />
    </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
    const repos = await client.get({ endpoint: "blog" });
  
    const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
  
    const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);
  
    return { paths, fallback: false };
  };

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
    const id = context.params.id;
  
    const data = await client.get({ endpoint: "blog", queries: { offset: (id - 1) * PER_PAGE, limit: PER_PAGE } });
  
    return {
      props: {
        blog: data.contents,
        totalCount: data.totalCount,
      },
    };
  };