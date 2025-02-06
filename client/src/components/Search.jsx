import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile] = useMobile();
  // console.log("location: ", location);

  const [isSearchPage, setIsSearchPage] = useState(false);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  // console.log("Search", isSearchPage);

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center bg-slate-50 text-neutral-600 group focus-within:border-primary-200">
      <div>
        {isMobile && isSearchPage ? (
          <Link
            to={"/"}
            className="flex items-center justify-center h-full p-2 m-1 group-focus-within:text-primary-200 shadow-md"
          >
            <FaArrowLeft size={20} />
          </Link>
        ) : (
          <button className="flex items-center justify-center h-full p-3 group-focus-within:text-primary-200 ">
            <CiSearch size={22} />
          </button>
        )}
      </div>
      <div className="w-full">
        {!isSearchPage ? (
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed once, initially
                'Search "Milk"',
                1000,
                'Search "Bread"',
                1000,
                'Search "Sugar"',
                1000,
                'Search "Panner"',
                1000,
                'Search "Egg"',
                1000,
                'Search "Choclate"',
                1000,
                'Search "Rice"',
                1000,
                'Search "Chips"',
                1000,
                'Search "Biscuit"',
                1000,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search for Atta Dal More..."
              autoFocus
              className="bg-transparent w-full h-full outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
