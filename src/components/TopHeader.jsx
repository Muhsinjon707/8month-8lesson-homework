import React from "react";
import check from "../assets/icons/check.svg";
import alertCircle from "../assets/icons/alert-circle.svg";

function TopHeader() {
    return (
      <div className="bg-[#272343] w-full h-auto flex items-center justify-center py-2">
        <div className="container max-w-5xl px-4 text-[#9896a5] flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex gap-2 items-center">
            <img src={check} alt="Check Icon" className="w-4 h-4" />
            <span className="text-xs sm:text-sm text-center">
              Free shipping on all orders over $50
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <select className="bg-transparent text-xs sm:text-sm border border-[#9896a5] rounded px-2 py-1">
              <option value="Eng">Eng</option>
              <option value="Rus">Rus</option>
              <option value="Uzb">Uzb</option>
            </select>

            <span className="text-xs sm:text-sm cursor-pointer">FAQs</span>

            <div className="flex gap-2 items-center">
              <img src={alertCircle} alt="Alert Circle" className="w-4 h-4" />
              <span className="text-xs sm:text-sm cursor-pointer">
                Need Help
              </span>
            </div>
          </div>
        </div>
      </div>
    );
}

export default TopHeader;
