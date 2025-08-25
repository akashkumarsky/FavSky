import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, onPageChange, forcePage }) => { // Add forcePage here
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      forcePage={forcePage} // And use it here
      containerClassName="flex justify-center items-center space-x-2 mt-8"
      pageClassName="px-4 py-2 border rounded-md"
      pageLinkClassName="text-gray-700"
      previousClassName="px-4 py-2 border rounded-md bg-gray-100"
      nextClassName="px-4 py-2 border rounded-md bg-gray-100"
      activeClassName="bg-indigo-500 text-white"
    />
  );
};

export default Pagination;