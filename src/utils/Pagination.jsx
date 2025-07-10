import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPages = () => {
    const pages = [];

    // Always show page 1
    pages.push(
      <button
        key={1}
        onClick={() => handleClick(1)}
        className={`px-4 py-3  hover:bg-gray-200 border-l text-gray-600 ${
          currentPage === 1 ? "bg-blue-500 text-white" : "text-gray-600"
        }`}
      >
        1
      </button>
    );

    // Show page 2 only if totalPages > 2
    if (totalPages >= 2) {
      if (currentPage <= 2) {
        pages.push(
          <button
            key={2}
            onClick={() => handleClick(2)}
            className={`px-4 py-3  border-l hover:bg-gray-200 text-gray-600 ${
              currentPage === 2 ? "bg-blue-500 text-white" : "text-gray-600"
            }`}
          >
            2
          </button>
        );
      } else {
        pages.push(
          <button
            key={currentPage}
            onClick={() => handleClick(currentPage)}
            className="px-3 py-4 border-l  hover:bg-gray-200 text-gray-600"
          >
            {currentPage}
          </button>
        );

        if (currentPage + 1 < totalPages) {
          pages.push(
            <button
              key={currentPage + 1}
              onClick={() => handleClick(currentPage + 1)}
              className="px-3 py-4 border-l  hover:bg-gray-200 text-gray-600"
            >
              {currentPage + 1}
            </button>
          );
        }
      }
    }

    // Ellipsis if currentPage is far from last
    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="ellipsis" className="px-4 border-l py-1 text-gray-500">
          ...
        </span>
      );
    }

    // Always show last page
    if (totalPages > 2) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => handleClick(totalPages)}
          className={`px-4 py-3 border-l  hover:bg-gray-200 text-gray-600 ${
            currentPage === totalPages
              ? "bg-blue-500 text-white"
              : "text-gray-600"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="my-10 flex   border rounded-md   shadow-sm">
      {/* Prev */}
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-3  hover:bg-gray-200 text-gray-600 disabled:opacity-50"
      >
        <ChevronLeft />
      </button>

      {/* Page numbers */}
      {renderPages()}

      {/* Next */}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1  border-l rounded hover:bg-gray-100 text-gray-600 disabled:opacity-50"
      >
        <ChevronRight />
      </button>
    </div>
  );
};
