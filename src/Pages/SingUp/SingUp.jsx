import { useForm } from "react-hook-form";

import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useContext } from "react";
 
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/AxiosPublic/axiosPublic";
import { AuthContext } from "../../AuthProvider/AuthProvider";



const image_hosting_key = import.meta.env.VITE_IMAGEBB;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SingUp2 = () => {
    const { createEmailPassword, googleLogin, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    photo: res.user.photoURL
                }
                axiosPublic.post('/all-user', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to the database')

                            toast.success('User Create Successfully')
                            // navigate('/');
                        }
                    })
                console.log(res.user);

            }).catch(error => {
                console.log(error.message);
            })
    }

    //user Email password

    const onSubmit = async (data) => {
        console.log(data)
        //create user



        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image url

            //user create
            createEmailPassword(data.email, data.password)
                .then(() => {
                    // create user entry in the database
                    const userData = {
                        name: data.name,
                        email: data.email,
                        role: 'user',
                        // password: data.password,
                        image: res.data.data.display_url
                    }
                    axiosPublic.post('/all-user', userData)
                        .then(res => {
                            if (res.data.insertedId) {
                                console.log('user added to the database')

                                toast.success('User Create Successfully')
                                // navigate('/');
                            }
                        })

                    //update user PRofile
                    updateUserProfile(data.name, res.data.data.display_url)
                        .then()
                        .catch(err => console.log(err.message))


                })
                .catch(error => console.log(error))


            
        }
        
    };

    return (
        <div className=" py-5 singbg">

            <div className="w-full container flex items-center justify-center  px-6 mx-auto  text-center max-w-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full max-w-md my-6">
                        <label className="label">
                            <span className="label-text">Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Recipe Name"
                            {...register('name', { required: true })}
                            required
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div className="form-control w-full max-w-md my-6">
                        <label className="label">
                            <span className="label-text">Email*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email', { required: true })}
                            required
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div className="form-control w-full max-w-md my-6">
                        <label className="label">
                            <span className="label-text">Password*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password', { required: true })}
                            required
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>






                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Upload photo*</span>
                        </label>
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn w-full bg-blue-500 rounded-lg">
                        Sing up
                    </button>
                </form>


            </div>
            <div className="mt-6 text-center">


                <p className="mt-4 text-center text-gray-600 dark:text-gray-400">or sign in with</p>

                <div className="text-center flex justify-center">
                    <button onClick={handleGoogleLogin} className="flex items-center justify-center px-6 py-3 mt-4 text-gray-900 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <FcGoogle />

                        <span className="mx-2">Sign in with Google</span>
                    </button>
                </div>

                <div className="mt-6  text-center ">
                    <Link to='/login' href="#" className="text-sm text-blue-300 hover:underline dark:text-blue-400">
                        Don’t have an account yet? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default SingUp2;