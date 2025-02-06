import { FaRegUserCircle } from "react-icons/fa";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { BsCart4 } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Search from "./Search";
import useMobile from "../hooks/useMobile";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserMenu from "./UserMenu";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const user = useSelector((state) => state?.user?.userDetails);

  const isSearchpage = () => {
    return location.pathname === "/search";
  };

  const redirectToLoginPage = () => {
    navigate("/login");
  };
  const handleClose = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user?._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };

  // console.log(isMobile, "isMobileisMobile"); // true
  // console.log(location, "location"); // true
  // console.log(isSearchpage, "isSearchpage"); // true

  return (
    <header className="h-24 lg:h-20 shadow-md sticky top-0 flex  bg-white flex-col justify-center gap-1">
      {!(isSearchpage && isMobile) && (
        <div className="container mx-auto flex items-center  px-2 justify-between">
          {/* logo */}
          <div className="h-full">
            <Link to="/" className="h-full  flex justify-center items-center">
              <img
                src={logo}
                width={170}
                height={60}
                alt="logo"
                className=" hidden lg:block"
              />
              <img
                src={logo}
                width={120}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>

          {/* serch bar */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* login and my cart */}
          <div>
            {/* user icon displayin mobile version */}
            <button
              className="text-neutral-600 lg:hidden"
              onClick={handleMobileUser}
            >
              <FaRegUserCircle size={26} />
            </button>

            {/* user icon displayin Desktop version */}
            <div className="hidden lg:flex gap-10 items-center ">
              {user !== null ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="flex items-center gap-2 cursor-pointer select-none"
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12 ">
                      <div className="bg-white lg:shadow-md rounded p-4 min-w-52">
                        <UserMenu close={handleClose} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirectToLoginPage} className="text-lg">
                  Login
                </button>
              )}
              <button className="flex items-center  gap-2 bg-green-700 px-2 py-2 rounded text-white">
                <div className="animate-bounce">
                  <BsCart4 size={35} />
                </div>
                <div>My Cart</div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2   lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
