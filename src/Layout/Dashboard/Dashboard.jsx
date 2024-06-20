import { Link, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin/useAdmin";
import useAgent from "../../Hooks/UseAgent/UseAgent";


const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const [isAgent] = useAgent();
    console.log('admin',isAdmin,"agent",isAgent);
    let user = true;
    if(isAdmin || isAgent){
        user = false;
    }
   console.log("user", user);
     
    return (
        <div className="grid grid-cols-10 ">



            <div className="flex col-span-2 h-screen flex-col justify-between border-e bg-white">
                <div className="px-4 py-6">
                    <Link to='/'>
                    <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                        Home
                    </span>
                    </Link>

                    {user &&
                        <ul className="mt-6 space-y-1">
                            <li>
                                <Link to='user'
                                    href="#"
                                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                                >
                                    My Profile
                                </Link >
                            </li>
                            <li>
                                <Link to='wishlist'
                                    href="#"
                                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                                >
                                    Wish List
                                </Link >
                            </li>


                            <li>
                                <Link to='property-bought'
                                    href="#"
                                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    Property bought
                                </Link >
                            </li>

                            <li>
                                <Link to='my-review'
                                    href="#"
                                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    My reviews
                                </Link >
                            </li>


                        </ul>}

                    {/* Agent Dashboard */}

                    {isAgent &&
                        <ul className="mt-6 space-y-1">
                            <li>
                                <Link to='agent-profile'
                                    href="#"
                                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                                >
                                   Agent Profile
                                </Link >
                            </li>
                            <li>
                                <Link to='add-property'
                                    href="#"
                                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                                >
                                    Add Property
                                </Link >
                            </li>


                            <li>
                                <Link to='my-added-property'
                                    href="#"
                                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    My added properties
                                </Link >
                            </li>

                            <li>
                                <Link to='my-sold-property'
                                    href="#"
                                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    My sold properties
                                </Link >
                            </li>

                            <li>
                                <Link to='requested-properties'
                                    href="#"
                                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    Requested properties
                                </Link >
                            </li>


                        </ul>}

                    {/* Admin  */}
                    {isAdmin &&
                        <ul className="mt-6 space-y-1">
                            <li>
                                <Link to='admin-profile'
                                    href="#"
                                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                                >
                                    Admin Profile
                                </Link >
                            </li>
                            <li>
                                <Link to='manage-properties'
                                    href="#"
                                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                                >
                                   Manage Properties
                                </Link >
                            </li>


                            <li>
                                <Link to='manage-users'
                                    href="#"
                                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    Manage Users
                                </Link >
                            </li>

                            <li>
                                <Link to='manage-reviews'
                                    href="#"
                                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    Manage reviews
                                </Link >
                            </li>


                        </ul>}


                </div>

                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                    <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            className="size-10 rounded-full object-cover"
                        />

                        <div>
                            <p className="text-xs">
                                <strong className="block font-medium">Eric Frusciante</strong>

                                <span> eric@frusciante.com </span>
                            </p>
                        </div>
                    </a>
                </div>
            </div>


            <div className="col-span-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;