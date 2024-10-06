import img from "../../assets/images (2).png";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import DarkMode from "../DarkMode/DarkMode";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allproperty">All properties</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <div className="lg:ml-32 sm:0  lg:mt-3  ">
        <DarkMode />
      </div>
    </>
  );
  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu gap-5 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <img className="w-48 h-12" src={img} alt="" />
          </a>
        </div>
        <div className="navbar-center gap-3 hidden lg:flex">
          <ul className="menu   gap-5 menu-horizontal px-2">{links}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user?.photoURL || "https://i.ibb.co/W04bXGg/student.jpg"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={() => logOut()}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link className="btn  bg-green-400" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
