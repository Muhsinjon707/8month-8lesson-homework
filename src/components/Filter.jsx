import { useState } from "react";
import { NavLink } from "react-router-dom";
import menu from "../assets/icons/Menu.svg";

function Filter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white h-auto sm:h-[75px] flex items-center justify-center border-b-0 border-[#636270] px-4">
      <div className="container max-w-5xl h-full py-3 flex flex-col sm:flex-row justify-between items-center w-full gap-4">
        <div className="flex gap-4 sm:gap-8 items-center justify-between w-full sm:w-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-[176px] h-[47px] flex items-center justify-center gap-4 border border-[#E1E3E5] rounded-md sm:hidden"
          >
            <img src={menu} alt="Burger Menu" />
            <h3 className="text-[15px] text-[#272343]">All Categories</h3>
          </button>

          <ul
            className={`list text-sm flex flex-col sm:flex-row gap-4 sm:gap-8 ${
              isOpen ? "flex" : "hidden"
            } sm:flex`}
          >
            <li className="navElement">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-black px-2 py-1 rounded-lg text-white hover:text-white transition-all duration-700 hover:underline"
                    : "text-[#636270] hover:text-[#007580] transition-all duration-700 pb-0.5 hover:underline"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="navElement">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? "bg-black px-2 py-1 rounded-lg text-white hover:text-white transition-all duration-700 hover:underline"
                    : "text-[#636270] hover:text-[#007580] transition-all duration-700 pb-0.5 hover:underline"
                }
              >
                Products
              </NavLink>
            </li>
            <li className="navElement">
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive
                    ? "bg-black px-2 py-1 rounded-lg text-white hover:text-white transition-all duration-700 hover:underline"
                    : "text-[#636270] hover:text-[#007580] transition-all duration-700 pb-0.5 hover:underline"
                }
              >
                Favorites
              </NavLink>
            </li>
            <li className="navElement">
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive
                    ? "bg-black px-2 py-1 rounded-lg text-white hover:text-white transition-all duration-700 hover:underline"
                    : "text-[#636270] hover:text-[#007580] transition-all duration-700 pb-0.5 hover:underline"
                }
              >
                Shop
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#272343]">
          <span className="font-normal text-[#636270]">Contact:</span>
          <span>(808) 555-0111</span>
        </div>
      </div>
    </div>
  );
}

export default Filter;
