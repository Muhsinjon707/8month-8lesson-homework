import rightArrow from "../assets/icons/right-arrow.svg";
import chair from "../assets/img/chair.svg";

import right from "../assets/icons/button/right.svg"
import left from "../assets/icons/button/left.svg"

function Hero() {
    return (
        <div className='flex items-center justify-center mt-4'>
            <div className='
                flex items-center justify-between bg-[#f0f2f3] w-[1440px] h-[850px]
                px-[200px] relative
            '>
                <div>
                    <span>Welcome to chairy</span>
                    <h1 className="
                        text-[#272343] w-[630px] text-[68px] font-bold 
                        tracking-tighter capitalize leading-16 mb-6 mt-3
                    ">
                        Best Furniture
                        Collection yor your
                        interior.
                    </h1>
                    <button className="
                        bg-[#029FAE] rounded-2xl w-[170px] h-[52px] py-4 px-6 
                        flex items-center justify-between gap-5 text-white
                    ">
                        Shop Now <img src={rightArrow} alt="Right Arrow" />
                    </button>
                </div>
                <div className="
                    absolute top-1/2 left-20
                ">
                    <button className="bg-white p-5 rounded-full">
                        <img src={left} alt="Left Arrow" />
                    </button>
                </div>
                <div className="
                    absolute top-1/2 right-20
                ">
                    <button className="bg-white p-5 rounded-full">
                        <img src={right} alt="Right Arrow" />
                    </button>
                </div>
                <div>
                    <img className="z-10" src={chair} alt="Chair Image" />
                </div>
            </div>
        </div>
    )
}

export default Hero
