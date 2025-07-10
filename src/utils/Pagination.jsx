import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPages = () => {
    const pages = [];

    const showPage = (page) => (
      <button
        key={page}
        onClick={() => handleClick(page)}
        className={`px-4 py-3 border-l hover:bg-gray-200 ${
          currentPage === page ? "bg-blue-500 text-white" : "text-gray-600"
        }`}
      >
        {page}
      </button>
    );

    pages.push(showPage(1));

    // Show left ellipsis
    if (currentPage > 4) {
      pages.push(
        <span key="start-ellipsis" className="px-4 py-3 border-l text-gray-500">
          ...
        </span>
      );
    }

    // Show middle pages around currentPage
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i !== 1 && i !== totalPages) {
        pages.push(showPage(i));
      }
    }

    // Show right ellipsis
    if (currentPage < totalPages - 3) {
      pages.push(
        <span key="end-ellipsis" className="px-4 py-3 border-l text-gray-500">
          ...
        </span>
      );
    }

    // Show last page if it's not current
    if (totalPages > 1) {
      pages.push(showPage(totalPages));
    }

    return pages;
  };

  return (
    <div className="my-10 flex border rounded-md shadow-sm">
      {/* Prev */}
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-3 hover:bg-gray-200 text-gray-600 disabled:opacity-50"
      >
        <ChevronLeft />
      </button>

      {/* Page numbers */}
      {renderPages()}

      {/* Next */}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-3 border-l hover:bg-gray-200 text-gray-600 disabled:opacity-50"
      >
        <ChevronRight />
      </button>
    </div>
  );
};
