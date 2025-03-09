import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { removeFromCart, clearAll } from "../store/slice/cartSlice";

function Cart() {
  const shopItems = useSelector((state) => state.cart.packages);
  console.log("SHop items: ", shopItems);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDeleteFromCart = (id) => {
    if (window.confirm("Do you want to delete this?")) {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="container max-w-5xl flex gap-5 flex-col items-center my-3">
        {shopItems.length > 0 && (
          <button
            onClick={() => dispatch(clearAll())}
            className="self-end bg-red-600 text-white py-2 px-4 cursor-pointer"
          >
            Clear All
          </button>
        )}
        <div className="w-[85%] flex flex-col gap-3 ">
          {shopItems.length > 0 &&
            shopItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className="
                      h-[200px] flex justify-between items-center px-7 border-b-1
                    "
                >
                  <div
                    className="
                      bg-white w-[95%] h-full rounded-4xl p-4 flex 
                      items-center gap-10
                    "
                  >
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="bg-gray-200 w-40 h-40 object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-between h-full w-1/3">
                      <div className="flex flex-col">
                        <h3 className="font-bold">{item.brand}</h3>
                        <h2 className="text-[#666]">
                          {item.title} |{" "}
                          <span className="text-black">{item.category}</span>
                        </h2>
                      </div>
                      <h3 className="bg-yellow-300 w-[170px] px-2 py-1 rounded-xl">
                        {item.returnPolicy}
                      </h3>
                      <div className="text-[#666] text-xl">
                        <h2 className="font-semibold text-xl text-black">
                          ${item.price}
                        </h2>
                        <div>
                          {item.availabilityStatus}:{" "}
                          <span className="text-green-500">{item.stock}</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-md">
                          Rating:{" "}
                          <span className="font-bold text-xl">
                            {item.rating}
                          </span>
                        </h3>
                        <img width={80} src={item.meta.qrCode} alt={item.titlel} />
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/products/${item.id}/comments`)
                        }
                        className="
                          text-white bg-slate-700 inline-flex justify-center
                          items-center py-1 px-2 rounded-3xl hover:underline cursor-pointer
                        "
                      >
                        Comments
                      </div>
                    </div>
                  </div>
                  <div
                    className="
                                    bg-[#666] w-[50px] h-[50px] text-white rounded-full
                                    flex items-center justify-center text-2xl hover:text-slate-300
                                    cursor-pointer
                                    "
                  >
                    <button onClick={() => handleDeleteFromCart(item.id)}>
                      X
                    </button>
                  </div>
                </div>
              );
            })}

          {shopItems.length == 0 && <p>No items currently available...</p>}
        </div>
      </div>
    </div>
  );
}

export default Cart;
