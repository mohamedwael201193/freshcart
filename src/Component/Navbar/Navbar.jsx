import {
  faCircleXmark,
  faHeart,
  faIdCard,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBabyCarriage,
  faBars,
  faBolt,
  faCaretDown,
  faCartShopping,
  faEllipsis,
  faEnvelope,
  faPerson,
  faPersonDress,
  faPhone,
  faRightFromBracket,
  faSpinner,
  faSuitcaseMedical,
  faUserPlus,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import freshcartLogo from "../../assets/Images/freshcart-logo.svg";
import { AuthContext } from "../../Context/Auth.context";
import { CartContext } from "../../Context/Cart.context";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

function Navbar() {
  const isOnline = useOnlineStatus();

  const [isMenuOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isMenuOpen);
  };
  const { logout, token } = useContext(AuthContext);
  const { CartInfo, loading } = useContext(CartContext);
  return (
    <>
      <header>
        <div className="container">
          {/* top navbar */}
          <div className="top-navbar hidden  lg:flex justify-between align-center text-md border-b border-gray-200">
            <div className="contact">
              <ul className="flex justify-between align-center gap-4">
                <li>
                  <FontAwesomeIcon icon={faPhone} className="size-4" />
                  <a href="tel: +1 (800) 123-456" className="px-2 text-sm">
                    {" "}
                    +1 (800) 123-456
                  </a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faEnvelope} className="size-4" />
                  <a
                    href="mailto: support@freshcart.com"
                    className="px-2 text-sm"
                  >
                    support@freshcart.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              {" "}
              {isOnline && (
                <li className="text-primary-500">
                  <FontAwesomeIcon icon={faWifi} />
                  <span className="px-2 text-sm ">Online</span>
                </li>
              )}
            </div>
          </div>
          {/* main navbar */}
          <nav className="main-navbar text-md flex justify-between items-center py-4">
            <div className="logo">
              <Link to={`/`}>
                <img src={freshcartLogo} alt="FreshCart Logo" className="w-38 pt-3" />
              </Link>
            </div>

            <div className="list-pages ">
              <ul className="hidden lg:flex justify-center items-center gap-5">
                <li>
                  <NavLink
                    to={`wishlist`}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-primary-500" : ""
                      } flex flex-col gap-1.5 items-center transition-all duration-200 hover:text-primary-500`
                    }
                  >
                    <FontAwesomeIcon icon={faHeart} />
                    <span>Wishlist</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`cart`}
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-primary-500" : ""
                      } flex flex-col gap-1.5 items-center transition-all duration-200 hover:text-primary-500`
                    }
                  >
                    <div className="relative flex items-center">
                      <FontAwesomeIcon icon={faCartShopping} />
                      <span className="bg-primary-400 text-white size-4 flex justify-center items-center rounded-full text-[12px] absolute top-0 -right-2 -translate-y-1/2">
                        {loading ? (
                          <FontAwesomeIcon icon={faSpinner} />
                        ) : (
                          CartInfo?.numOfCartItems || 0
                        )}
                      </span>
                    </div>
                    <span>Cart</span>
                  </NavLink>
                </li>

                {!token ? (
                  <>
                    {" "}
                    <li>
                      <NavLink
                        to={`signup`}
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-primary-500" : ""
                          } flex flex-col gap-1.5 items-center transition-all duration-200 hover:text-primary-500`
                        }
                      >
                        <FontAwesomeIcon icon={faUserPlus} />
                        <span>Signup</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={`login`}
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-primary-500" : ""
                          } flex flex-col gap-1.5 items-center transition-all duration-200 hover:text-primary-500`
                        }
                      >
                        <FontAwesomeIcon icon={faIdCard} />
                        <span>Login</span>
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li>
                    <NavLink
                      className="flex flex-col gap-1.5 items-center transition-all duration-200 hover:text-primary-500"
                      onClick={logout}
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} />
                      <span>Logout</span>
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
            <div className="offcanvas-btn lg:hidden">
              <button className="btn btn-primary" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} className="text-xl" />
              </button>
            </div>
          </nav>
        </div>
        {/* bottom navbar */}
        <nav className="bottom-navbar hidden lg:block bg-gray-100 w-full ">
          <div className="container flex  items-center gap-4 py-4">
            <div className="categories relative group">
              <button className="btn btn-primary flex justify-between align-center gap-2">
                <FontAwesomeIcon icon={faBars} />
                <span className="text-sm">All Categories</span>
                <FontAwesomeIcon icon={faCaretDown} />
              </button>
              <menu
                className="bg-white absolute left-0 z-10 min-w-60 shadow-md rounded-md divide-y-2 divide-gray-200 text-md
  opacity-0 scale-95 pointer-events-none transition-all duration-700 ease-in-out
  group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
  *:hover:bg-gray-300 *:py-3 *:px-3"
              >
                <li>
                  <Link className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faPerson}
                      className="text-primary-600 "
                    />
                    <span>Men's Fashion</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-2 ">
                    <FontAwesomeIcon
                      icon={faPersonDress}
                      className="text-primary-600 "
                    />
                    <span>Women's Fashion</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faBabyCarriage}
                      className="text-primary-600"
                    />
                    <span>Baby & Toys</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faSuitcaseMedical}
                      className="text-primary-600"
                    />
                    <span>Beauty & Health</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faBolt}
                      className="text-primary-600"
                    />
                    <span>Electronics</span>
                  </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      className="text-primary-600"
                    />
                    <span>More Categories</span>
                  </Link>
                </li>
              </menu>
            </div>

            <ul className="flex justify-between items-center gap-4 text-md font-semibold [&_a]:hover:text-primary-500 [&_a]:transition-all [&_a]:duration-200 ">
              <li>
                <NavLink to={`/home`}>Home</NavLink>
              </li>

              <li>
                <NavLink
                  to={`/allorders`}
                  className={({ isActive }) => {
                    return `${isActive ? "text-primary-500" : ""}`;
                  }}
                >
                  Ordars
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/brands`}
                  className={({ isActive }) => {
                    return `${isActive ? "text-primary-500" : ""}`;
                  }}
                >
                  Brands
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {/* offcanvas */}
        {isMenuOpen && (
          <>
            <div
              className="bg-black/50  fixed inset-0 z-30 "
              onClick={toggleMenu}
            ></div>
            <div className="offcanvas animate-slide-in space-y-4  bg-white fixed top-0 bottom-0 z-40   shadow-lg py-4 px-6 w-80  left-0">
              <div className="logo flex justify-between items-center  ">
                <Link to={`/`}>
                  <img src={freshcartLogo} alt="FreshCart Logo" className="w-38 " />
                </Link>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="text-xl cursor-pointer"
                  onClick={toggleMenu}
                />
              </div>

              <div className="list-pages">
                <h2 className="font-bold mb-4">Main Menu</h2>
                <ul className="flex flex-col justify-between align-center gap-5 [&_a]:flex  [&_a]:items-center  [&_a]:gap-2  [&_a]:hover:text-primary-500 [&_a]:transition-all [&_a]:duration-200">
                  <li>
                    <NavLink
                      to={`wishlist`}
                      className={({ isActive }) => {
                        return `${isActive ? "text-primary-500" : ""}`;
                      }}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                      <span>Wishlist</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`cart`}
                      className={({ isActive }) => {
                        return `${isActive ? "text-primary-500" : ""}`;
                      }}
                    >
                      <div className="relative flex items-center">
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span className="bg-primary-400 text-white size-4 flex justify-center items-center rounded-full text-[12px] absolute top-0 -right-2 -translate-y-1/2">
                          {loading ? (
                            <FontAwesomeIcon icon={faSpinner} />
                          ) : (
                            CartInfo?.numOfCartItems || 0
                          )}
                        </span>
                      </div>
                      <span>Cart</span>
                    </NavLink>
                  </li>

                  <h2 className="font-bold ">Account</h2>
                  {!token ? (
                    <>
                      {" "}
                      <li>
                        <NavLink
                          to={`signup`}
                          className={({ isActive }) => {
                            return `${isActive ? "text-primary-500" : ""}`;
                          }}
                        >
                          <FontAwesomeIcon icon={faUserPlus} />
                          <span>Signup</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={`login`}
                          className={({ isActive }) => {
                            return `${isActive ? "text-primary-500" : ""}`;
                          }}
                        >
                          <FontAwesomeIcon icon={faIdCard} />
                          <span>Login</span>
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <li>
                      <NavLink onClick={logout}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        <span>Logout</span>
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}

export default Navbar;
