import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, clearAll } from "../store/slice/favoritesSlice";
import { Link } from "react-router-dom";

function Favorites() {
  const favorites = useSelector((state) => state.favorites.favoritesList);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="container flex flex-col gap-5 max-w-5xl bg-white shadow-lg rounded-xl p-6">
        {favorites.length > 0 && (
          <button
            onClick={() => dispatch(clearAll())}
            className="self-end bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
          >
            Clear favorites
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.length > 0 ? (
            favorites.map((item, index) => (
              <Link
                to={`/products/${item.id}`}
                key={index}
                className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
              >
                <div className="relative">
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-full h-60 object-cover rounded-lg"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold">{item.brand}</h3>
                  <h2 className="text-gray-600">{item.title}</h2>

                  <div className="mt-2 flex items-center gap-2">
                    {item.oldPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        ${item.oldPrice}
                      </span>
                    )}
                    <span className="text-2xl font-bold text-gray-800">
                      ${item.price}
                    </span>
                  </div>

                  <p className="bg-yellow-200 text-gray-800 text-sm px-2 py-1 rounded-md inline-block mt-2">
                    {item.warrantyInformation}
                  </p>

                  <div className="flex justify-between mt-2 text-gray-500 text-sm">
                    <p>
                      Stock:{" "}
                      <span className="text-green-500 font-medium">
                        {item.stock}
                      </span>
                    </p>
                    <p>
                      Rating:{" "}
                      <span className="font-bold text-lg">{item.rating}</span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/products/${item.id}/comments`}
                    className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Comments
                  </Link>
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-gray-800 transition"
                  >
                    ✕
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">
              No current items are chosen yet...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
