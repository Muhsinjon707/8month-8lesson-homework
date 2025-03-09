import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function getComments() {
  return axios.get("https://dummyjson.com/products");
}

function Comments() {
  const { id } = useParams();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  const product = data?.data?.products.find((item) => item.id === Number(id));

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error occurred during fetching...</p>}

      {product ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="font-bold text-3xl">
            Reviews for {product.brand} - {product.category}
          </h2>
          {product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div
                className="
                    w-[60%] border shadow-md shadow-slate-500 rounded-lg
                    px-4 py-3
                  "
                key={index}
              >
                <p>Rating: {review.rating}</p>
                <p>
                  Comment:{" "}
                  <span
                    className={`
                       p-1 rounded-sm text-white
                      ${
                        review.rating >= 3
                          ? "bg-green-500"
                          : review.rating > 2
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }
                    `}
                  >
                    {review.comment}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
}

export default Comments;
