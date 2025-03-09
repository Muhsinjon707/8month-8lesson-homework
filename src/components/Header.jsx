import bed from "../assets/icons/bed.svg";
import search from "../assets/icons/search.svg";
import basket from "../assets/icons/basket.svg";
import heart from "../assets/icons/heart.svg";
import person from "../assets/icons/person.svg";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../store/slice/cartSlice";

function Header() {
  const cartItems = useSelector((state) => state.cart.packages);
  const favorites = useSelector((state) => state.favorites.favoritesList);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleRedirectCart = () => {
    setTimeout(() => {
      navigate("/shop");
    }, 500);
  };

  return (
    <div className="bg-[#f0f2f3] h-auto sm:h-[84px] flex items-center justify-center p-4">
      <div className="container max-w-5xl h-full flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <div className="flex gap-2 items-center">
          <img width={40} src={bed} alt="Bed Icon" />
          <h3 className="text-lg sm:text-[26px] font-medium text-[#272343]">
            <Link to="/">Comforty</Link>
          </h3>
        </div>

        <div className="relative h-[43px] rounded-sm bg-white w-full sm:max-w-[413px]">
          <input
            type="text"
            className="w-full outline-none rounded-sm focus:border focus:border-[#007580] px-4 py-3 h-full"
            placeholder="Search here..."
          />
          <img
            width={22}
            src={search}
            alt="Search Icon"
            className="absolute z-10 top-1/2 right-4 -translate-y-1/2 cursor-pointer"
          />
        </div>

        <div className="flex gap-3">
          <div className="basket flex bg-white h-[44px] items-center justify-center gap-2 py-3 px-4 rounded-lg">
            <img width={22} src={basket} alt="Basket Icon" />
            <h4 className="text-xs sm:text-[12px] text-[#272343]">Cart</h4>
            <span className="h-[20px] flex items-center justify-center text-[10px] px-[7px] rounded-full bg-[#007580] text-white">
              {cartItems.length}
            </span>

            <div className="inner-basket flex flex-col justify-between items-center">
              <div
                className={`w-full min-h-[250px] ${
                  cartItems.length > 3 && "overflow-y-scroll"
                }`}
              >
                {cartItems.length > 0 &&
                  cartItems.map((item) => {
                    return (
                      <div
                        className="w-full flex items-center gap-5 h-[80px] hover:bg-slate-200 relative"
                        key={item.id}
                      >
                        <img
                          width={70}
                          src={item.images?.[0]}
                          alt={item.title}
                        />
                        <div className="flex flex-col">
                          <h3 className="text-lg font-semibold">
                            {item.title}
                          </h3>
                          <div className="flex gap-2 items-center">
                            <h4>${item.price}</h4>
                            <span>|</span>
                            <h3>{item.availabilityStatus}</h3>
                            <span>|</span>
                            <h3 className="flex gap-1">{item.tags.map(item => `#${item} `)}</h3>
                          </div>
                        </div>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="
                              absolute top-7 -translate-y-1/2 right-4 cursor-pointer hover:underline
                              transition-all duration-300 delay-75
                              hover:bg-red-400 hover:text-white p-1 rounded-md
                            "
                        >
                          Delete
                        </button>
                      </div>
                    );
                  })}
              </div>
              <div className="py-4 bg-gray-400 w-full flex items-center justify-center">
                <button
                  onClick={handleRedirectCart}
                  className="w-[90%] text-white bg-violet-700 py-3 cursor-pointer"
                >
                  To Carts
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="relative bg-white h-[44px] w-[44px] rounded-lg flex items-center justify-center">
              <Link to="/favorites">
                <img width={22} src={heart} alt="Heart Icon" />
              </Link>
              <span
                className="
                absolute -top-3 -right-2 w-6 h-6 bg-amber-300 rounded-full flex items-center justify-center text-white
              "
              >
                {favorites.length}
              </span>
            </div>
            <div className="bg-white h-[44px] w-[44px] rounded-lg flex items-center justify-center">
              <img width={22} src={person} alt="Person Icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
