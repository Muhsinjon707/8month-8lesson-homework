import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import star from "../assets/img/star.svg";
import heart from "../assets/icons/heart.svg";
import leftMini from "../assets/icons/button/left-mini.svg";
import rightMax from "../assets/icons/button/right-max.svg";

import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/slice/favoritesSlice";
import { addToCart } from "../store/slice/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import { useFetch } from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";

function getDetails(id) {
  return axios.get(`https://dummyjson.com/products/${id}`);
}

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // const [product, setProduct] = useState({});
  const [isExpanded, setExpanded] = useState(false);

  // const { data: product, error, isLoading } = useFetch(`/${id}`);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getDetails(id),
  });

  const product = data?.data;

  const favoritesList = useSelector((state) => state.favorites.favoritesList);

  const isFavorite =
    product?.id && favoritesList.some((item) => item.id === product.id);

  if (isLoading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center text-lg">Product not found.</p>;
  }

  const handleAddToCart = (product) => {
    toast("Successfully added to the cart", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });

    dispatch(addToCart(product));
  };

  const handleFavorites = () => {
    if (!isFavorite) {
      dispatch(addItem(product));
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
    } else {
      toast("Already in the cart", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="container max-w-5xl">
        {product.id == id && (
          <div className="my-5 min-h-svh flex justify-between">
            <div className="w-[545px] h-[735px]">
              <div className="relative">
                <img
                  className="w-[458px] top-0 right-0 h-[610px] bg-[#f2f2f2]"
                  src={product.images?.[0]}
                  alt={product.title}
                />
                <button
                  onClick={handleFavorites}
                  className={`absolute top-0 left-0 flex items-center justify-center
                    p-4 rounded-lg cursor-pointer transition duration-300
                    ${
                      isFavorite
                        ? "bg-red-500"
                        : "hover:bg-red-500 hover:text-white"
                    }
                `}
                >
                  <img src={heart} alt="Heart Icon" />
                </button>
              </div>
              {product.images?.length > 1 && (
                <>
                  <button
                    className="
                        absolute bottom-45 right-4 flex items-center justify-center
                        bg-[#f2f2f2] p-4 rounded-lg 
                    "
                  >
                    <img src={leftMini} alt="Heart Icon" />
                  </button>
                  <button
                    className="
                        absolute bottom-30 right-4 flex items-center justify-center
                        bg-[#f2f2f2] p-4 rounded-lg 
                    "
                  >
                    <img src={rightMax} alt="Heart Icon" />
                  </button>
                </>
              )}
              <div className="w-[460px] flex justify-between gap-6">
                {product.images.length > 1 &&
                  product.images.map((img, index) => {
                    return (
                      <img
                        key={index}
                        src={img}
                        alt={product.title}
                        className="w-[76px] h-[100px] object-cover"
                      />
                    );
                  })}
              </div>
            </div>
            <div className="w-[520px] h-[717px]">
              <h3 className="font-medium text-2xl text-[#8F8F8F] mb-3">
                {product.brand}
              </h3>
              <h2 className="font-semibold text-4xl text-[#292929 mb-5]">
                {product.title}
              </h2>
              <div className="flex justify-between items-center mt-5">
                <div className="flex items-center gap-3">
                  <span className="text-[#666666] self-end text-lg font-medium">
                    ${product.price}
                  </span>
                  <span className="font-semibold text-2xl text-[#141414]">
                    {(
                      product.price -
                      (product.price * product.discountPercentage) / 100
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-[#666666] text-xl">
                    {product.minimumOrderQuantity} Sold
                  </span>
                  <span className="bg-[#666666] w-2 h-2 rounded-full"></span>
                  <li className="text-2xl flex gap-2 items-center">
                    <img src={star} alt="Star Image" />
                    <span className="text-[#141414]font-semibold">
                      {product.rating}
                    </span>
                  </li>
                </div>
              </div>
              <hr className="my-7 border-t border-dashed border-gray-300" />
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-[#292929]">
                  Description:{" "}
                </h3>
                <p className="text-lg text-[#666666]">
                  {isExpanded
                    ? product.description
                    : `${product.description.substring(0, 150)}...`}
                  <button
                    onClick={() => setExpanded(!isExpanded)}
                    className="text-black cursor-pointer font-semibold"
                  >
                    {isExpanded ? "See Less" : "See More"}
                  </button>
                </p>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="
                  bg-[#141414] w-[296px] h-[58px] py-4 px-[93px] rounded-lg text-white mt-[56px]
                  cursor-pointer
                "
              >
                Add To Cart
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Details;
