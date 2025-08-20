import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
interface PaginationProps {
  totalPages: number;
  page: number;
  changePage: (value: React.SetStateAction<number>) => void;
}

export default function Pagination({
  totalPages,
  page,
  changePage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => changePage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
