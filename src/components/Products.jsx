import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useDispatch } from "react-redux";
import { addToCart } from "../store/slice/cartSlice";

import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";

function getProducts(page, limit) {
  return axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`
  );
}

function Products() {
  const [page, setPage] = useState(1);
  const limit = 30;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page, limit),
    keepPreviousData: true,
  });

  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    if (data?.data?.products) {
      setProducts((prev) => [...prev, ...data.data.products]);
    }
  }, [data]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const dispatch = useDispatch();
  const addToCartFunc = (item, e) => {
    e.stopPropagation();
    toast("Successfully added to the cart", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    dispatch(addToCart(item));
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="container max-w-5xl h-auto flex flex-col gap-5 py-6">
        <div className="pl-1 self-start">
          <h2 className="text-[#272343] font-semibold text-3xl">
            Featured Products
          </h2>
          <h3 className="font-semibold">
            Items number:{" "}
            <span className="text-lg underline">{products.length}</span>
          </h3>
        </div>

        {isLoading && products.length === 0 ? (
          <div className="text-center py-10 text-lg font-semibold text-gray-700">
            Loading products...
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 font-semibold">
            Error fetching products. Try again later.
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative">
                    <div className="group absolute top-2 right-2 p-2 rounded-full cursor-pointer scale-150">
                      <FaHeart className="opacity-0 visibility-none group-hover:opacity-100 group-hover:visible group-hover:text-red-500 transition duration-300" />
                    </div>

                    <Link to={`/products/${item.id}`}>
                      <img
                        className="h-[240px] w-full object-cover"
                        src={
                          item.images[0]?.startsWith("http")
                            ? item.images[0]
                            : "https://via.placeholder.com/250"
                        }
                        alt={item.title}
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/250")
                        }
                      />
                    </Link>

                    <div className="p-4">
                      <h3 className="text-[#007580] text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="font-bold text-gray-700">${item.price}</p>
                    </div>
                  </div>

                  <div className="p-4 flex justify-end">
                    <button
                      onClick={(e) => addToCartFunc(item, e)}
                      className="text-2xl text-blue-500 hover:text-blue-700 transition cursor-pointer"
                    >
                      <FaCartPlus />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {data?.data?.products?.length > 0 && (
              <div className="text-center py-4">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="w-[140px] bg-blue-500 py-2 px-5 text-white cursor-pointer rounded-md hover:bg-blue-600 transition disabled:opacity-50"
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Products;
