import Link from "next/link";

export function Pagination({ totalCount, currentPage }) {
  const PER_PAGE = 5;
  const totalPages = Math.ceil(totalCount / PER_PAGE);

  if (totalPages <= 1) return null; // ページネーションが不要な場合は表示しない

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div>
      {prevPage && (
        <Link href={`/blog/page/${prevPage}`}>
          <a>Previous</a>
        </Link>
      )}
      {nextPage && (
        <Link href={`/blog/page/${nextPage}`}>
          <a>Next</a>
        </Link>
      )}
    </div>
  );
}
