import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function SitePagination({ currentPage, totalPages, onPageChange }: Props) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Display the page numbers dynamically with ellipsis if needed
  const renderPaginationItems = () => {
    const visibleRange = 2;
    const items = [];

    // Current page and surrounding pages
    const startPage = Math.max(1, currentPage - visibleRange);
    const endPage = Math.min(totalPages, currentPage + visibleRange);

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? "bg-gray-100 font-bold" : ""}
          >
            {page}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem className={`${currentPage <= 1 ? "hidden" : ""}`}>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>

        {renderPaginationItems()}

        <PaginationItem
          className={`${currentPage >= totalPages ? "hidden" : ""}`}
        >
          <PaginationNext
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default SitePagination;
