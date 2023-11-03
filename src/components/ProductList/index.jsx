import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router";

export function ProductList({ products }) {
  const navigate = useNavigate();
  const PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * PER_PAGE;
  const currentPageData = products
    .slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(products.length / PER_PAGE);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  return (
    <>
      <div className="products">
        {currentPageData.map((product, index) => (
          <div
            className="productItem"
            key={index}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="productImageContainer">
              <img
                className="saleProductImage"
                src={product.image}
                alt={product.title}
              />
            </div>
            <div className="productDescription">
              <div className="productName">
                <h4 className="productTitle">{product.title}</h4>
                <AiOutlineHeart size={20} />
              </div>
              <div className="productPrice">${product.price}</div>
            </div>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </>
  );
}
