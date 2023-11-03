import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductList } from "../../components/ProductList";
import "./product.css";
import Filter, { sortOptions } from "../../components/filters";
import { useDebounce } from "use-debounce";

const apiEndpoint = `https://fakestoreapi.com/products`;
const categoryEndpoint = "https://fakestoreapi.com/products/categories";

export const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    sort: null,
    category: null,
    search: "",
  });
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [debouncedSearch] = useDebounce(filters.search, 300);

  useEffect(() => {
    const productsData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
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
    if (filters.sort === "name") {
      return [...products].sort((a, b) => a.title.localeCompare(b.title));
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

  return (
    <>
      <Filter
        categoryOptions={categoryOptions}
        handleFilters={handleFilters}
        filters={filters}
      />
      <ProductList products={filteredList} />
    </>
  );
};
