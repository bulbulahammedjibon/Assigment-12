import { Link, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin/useAdmin";
import useAgent from "../../Hooks/UseAgent/UseAgent";
import useAuth from "../../Hooks/UseAuth/UseAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isAgent] = useAgent();
  console.log("admin", isAdmin, "agent", isAgent);
  let users = true;
  if (isAdmin || isAgent) {
    users = false;
  }
  console.log("user", user);

  const links = (
    <>
      <div className="px-4 py-6">
        <Link to="/">
          <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
            Home
          </span>
        </Link>

        {users && (
          <ul className="mt-6 space-y-1">
            <li>
              <Link
                to="user"
                href="#"
                className="block rounded-lg   px-4 py-2 text-sm font-medium text-gray-700"
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="wishlist"
                href="#"
                className="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700"
              >
                Wish List
              </Link>
            </li>

            <li>
              <Link
                to="property-bought"
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Property bought
              </Link>
            </li>

            <li>
              <Link
                to="my-review"
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                My reviews
              </Link>
            </li>
          </ul>
        )}

        {/* Agent Dashboard */}

        {isAgent && (
          <ul className="mt-6 space-y-1">
            <li>
              <Link
                to="agent-profile"
                href="#"
                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
              >
                Agent Profile
              </Link>
            </li>
            <li>
              <Link
                to="add-property"
                href="#"
                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
              >
                Add Property
              </Link>
            </li>

            <li>
              <Link
                to="my-added-property"
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                My added properties
              </Link>
            </li>

            <li>
              <Link
                to="my-sold-property"
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                My sold properties
              </Link>
            </li>

            <li>
              <Link
                to="requested-properties"
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Requested properties
              </Link>
            </li>
          </ul>
        )}

        {/* Admin  */}
        {isAdmin && (
          <ul className="mt-6 space-y-1">
            <li>
              <Link
                to="admin-profile"
                href="#"
                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
              >
                Admin Profile
              </Link>
            </li>
            <li>
              <Link
                to="manage-properties"
                href="#"
                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
              >
                Manage Properties
              </Link>
            </li>

            <li>
              <Link
                to="manage-users"
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Manage Users
              </Link>
            </li>

            <li>
              <Link
                to="manage-reviews"
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Manage reviews
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );

  return (
    <div className="grid grid-cols-10   gap-5">
      <div className=" mx-4 block col-span-2 flex-1 h-screen flex-col justify-between border-e  ">
        <div className="navbar navbar-start">
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
              className="menu gap-5 menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            {/* <img className='w-48 h-12' src={img} alt="" /> */}
          </a>
        </div>

        {/* sidebar */}

        <div className="px-4 py-6 hidden lg:flex flex-col">
          <Link to="/">
            <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              Home
            </span>
          </Link>

          {users && (
            <ul className="mt-6 space-y-1">
              <li>
                <Link
                  to="user"
                  href="#"
                  className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="wishlist"
                  href="#"
                  className="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700"
                >
                  Wish List
                </Link>
              </li>

              <li>
                <Link
                  to="property-bought"
                  href="#"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Property bought
                </Link>
              </li>

              <li>
                <Link
                  to="my-review"
                  href="#"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  My reviews
                </Link>
              </li>
            </ul>
          )}

          {/* Agent Dashboard */}

          {isAgent && (
            <ul className="mt-6 space-y-1">
              <li>
                <Link
                  to="agent-profile"
                  href="#"
                  className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  Agent Profile
                </Link>
              </li>
              <li>
                <Link
                  to="add-property"
                  href="#"
                  className="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700"
                >
                  Add Property
                </Link>
              </li>

              <li>
                <Link
                  to="my-added-property"
                  href="#"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  My added properties
                </Link>
              </li>

              <li>
                <Link
                  to="my-sold-property"
                  href="#"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  My sold properties
                </Link>
              </li>

              <li>
                <Link
                  to="requested-properties"
                  href="#"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Requested properties
                </Link>
              </li>
            </ul>
          )}

          {/* Admin  */}
          {isAdmin && (
            <ul className="mt-6 space-y-1">
              <li>
                <Link
                  to="admin-profile"
                  href="#"
                  className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  Admin Profile
                </Link>
              </li>
              <li>
                <Link
                  to="manage-properties"
                  href="#"
                  className="block rounded-lg  bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  Manage Properties
                </Link>
              </li>

              <li>
                <Link
                  to="manage-users"
                  href="#"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Manage Users
                </Link>
              </li>

              <li>
                <Link
                  to="manage-reviews"
                  href="#"
                  className="block bg-gray-100 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Manage reviews
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                    <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                        <img
                            alt=""
                            src={user?.photoURL}
                            className="size-10 rounded-full object-cover"
                        />

                        <div>
                            <p className="text-xs">
                                <strong className="block font-medium">{user?.displayName}</strong>

                                <span> {user?.email} </span>
                            </p>
                        </div>
                    </a>
                </div> */}
      </div>

      <div className="col-span-8   mr-5 my-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
