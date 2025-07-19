import type { FC } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ pageCount, currentPage, onPageChange }) => (
  <ReactPaginate
    pageCount={pageCount}
    forcePage={currentPage - 1}
    onPageChange={({ selected }) => onPageChange(selected + 1)}
    containerClassName={styles.pagination}
    pageLinkClassName={styles.pageLink}
    activeClassName={styles.active}
    disabledClassName={styles.disabled}
    previousLabel="<"
    nextLabel=">"
    breakLabel="..."
    marginPagesDisplayed={1}
    pageRangeDisplayed={3}
  />
);

export default Pagination;