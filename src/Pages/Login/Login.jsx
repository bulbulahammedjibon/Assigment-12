import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";


const Login = () => {
    

    const {logInEmailPassword, googleLogin} = useContext(AuthContext);

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email
                }
                axios.post('http://localhost:7000/all-user', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to the database')

                            toast.success('User Create Successfully')
                             
                        }
                    })
                console.log(res.user);

            }).catch(error => {
                console.log(error.message);
            })
    }


    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const loginData = { email, password };
        console.log(loginData);
        
        logInEmailPassword(email, password)
            .then(res => {
                console.log(res.user);
                toast.success('SuccessFully Login')
            }).catch(error => {
                console.log(error.message);
                toast.error(error.message);
            })
    }

    return (
        <div>
            <section className="bg-white loginbg dark:bg-gray-900">
                <div className="container flex items-center   justify-center min-h-screen px-6 mx-auto">
                    <div className="w-full max-w-md">
                        

                        <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">Login </h1>

                        <form onSubmit={handleSubmit}>
                            <div className="relative flex items-center mt-8">
                                <span className="absolute">

                                </span>

                                <input type="email" name="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
                            </div>

                            <div className="relative flex items-center mt-4">
                                <span className="absolute">

                                </span>

                                <input type="password" name="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                            </div>

                            <button className="w-full mt-7 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Sign in
                            </button>

                        </form>

                        <div className="mt-6">

                            <p className="mt-4 text-center text-gray-900 dark:text-gray-400">or sign in with</p>

                            <button onClick={handleGoogleLogin} href="#" className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                               <FcGoogle />

                                <span className="mx-2">Sign in with Google</span>
                            </button >

                            <div className="mt-6 text-center ">
                                <Link to='/singup' href="#" className="text-sm  text-blue-200 hover:underline dark:text-blue-400">
                                    Don’t have an account yet? Sign up
                                </Link >
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;