import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductList } from "../../components/ProductList";
import "./product.css";
import Filter, { sortOptions } from "../../components/filters";
import { useDebounce } from "use-debounce";
import { ClipLoader } from "react-spinners";
import { AiOutlineShopping, AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const apiEndpoint = `https://fakestoreapi.com/products`;
const categoryEndpoint = "https://fakestoreapi.com/products/categories";

export const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    sort: null,
    category: null,
    search: "",
  });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const navigate = useNavigate();

  const [debouncedSearch] = useDebounce(filters.search, 300);

  useEffect(() => {
    const productsData = async () => {
      setLoading(true)
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); 
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await fetch(categoryEndpoint);
        const data = await response.json();
        const options = data.map((category) => ({
          value: category,
          label: category,
        }));
        setCategoryOptions(options);
      } catch (error) {
        console.log(error);
      }
    };
    productsData();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!products) return;
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const isValidSort = sortOptions.find((option) => option.value === sort);
    if (isValidSort) handleFilters("sort", sort);
  }, [products, searchParams]);

  const handleFilters = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));
  

  const sortedList = useMemo(() => {
    if (filters.sort === "price") {
      return [...products].sort((a, b) => a.price - b.price);
    }
    if (filters.sort === "price-desc") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    if (filters.sort === "name") {
      return [...products].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (filters.sort === "name-desc") {
      return [...products].sort((a, b) => b.title.localeCompare(a.title));
    }
    return products;
  }, [filters.sort, products]);

  const filteredByCategory = useMemo(() => {
    return filters.category
      ? sortedList.filter((product) =>
          product.category.includes(filters.category)
        )
      : sortedList;
  }, [filters.category, sortedList]);

  const filteredList = useMemo(() => {
    return filteredByCategory.filter((product) =>
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, filteredByCategory]);

  if (loading) {
    return (
      <div className="products-loader">
        <div className="loader-container">
          <ClipLoader size={60} color="var(--primary-color)" />
          <p className="loading-text">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="products-section">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <button 
            className="breadcrumb-link"
            onClick={() => navigate("/")}
          >
            <AiOutlineArrowLeft size={16} />
            Back to Home
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Products</span>
        </div>

        {/* Products Header */}
        <div className="products-header">
          <div className="products-header-content">
            <div className="products-header-icon">
              <AiOutlineShopping size={32} />
            </div>
            <div className="products-header-text">
              <h1 className="heading-1">All Products</h1>
              <p className="body-large text-gray-600">
                Discover our complete collection of amazing products
              </p>
            </div>
          </div>
          <div className="products-stats">
            <span className="products-count">
              {filteredList.length} product{filteredList.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>

        {/* Filters and Products */}
        <div className="products-content">
          <div className="filters-sidebar">
            <Filter
              categoryOptions={categoryOptions}
              handleFilters={handleFilters}
              filters={filters}
            />
          </div>
          <div className="products-main">
            {filteredList.length === 0 ? (
              <div className="no-products">
                <div className="no-products-icon">
                  <AiOutlineShopping size={64} />
                </div>
                <h3 className="heading-3">No Products Found</h3>
                <p className="body-medium text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
                <button 
                  className="btn btn-outline"
                  onClick={() => {
                    setFilters({ sort: null, category: null, search: "" });
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <ProductList products={filteredList} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
