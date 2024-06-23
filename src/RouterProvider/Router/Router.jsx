import {
  createBrowserRouter,

} from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import SingUp from "../../Pages/SingUp/SingUp";
import AllProperty from "../../Pages/AllProperty/AllProperty";
import DetailsPage from "../../Component/DetailsPage/DetailsPage";
import Dashboard from "../../Layout/Dashboard/Dashboard";
import MyProfile from "../../Layout/Dashboard/UserProfile/MyProfile/MyProfile";
import WishList from "../../Layout/Dashboard/UserProfile/WishList";
import PropertyBought from "../../Layout/Dashboard/UserProfile/MyProfile/PropertyBought";
import MyReview from "../../Layout/Dashboard/UserProfile/MyProfile/MyReview";
import AgentProfile from "../../Layout/Dashboard/Agent DashBoard/AgentProfile/AgentProfile";
import AddProperty from "../../Layout/Dashboard/Agent DashBoard/AgentProfile/AddProperty/AddProperty";
import MyAddedProperty from "../../Layout/Dashboard/Agent DashBoard/AgentProfile/My Added Property/MyAddedProperty";
import MySoldProperty from "../../Layout/Dashboard/Agent DashBoard/AgentProfile/My Sold Property/MySoldProperty";
import RequestedProperties from "../../Layout/Dashboard/Agent DashBoard/AgentProfile/ Requested properties/ RequestedProperties";
import AdminProfile from "../../Layout/Dashboard/Admin DashBoard/AdminProfile/AdminProfile";
import ManageProperty from "../../Layout/Dashboard/Admin DashBoard/Manage Property/ManageProperty";
import ManageUsers from "../../Layout/Dashboard/Admin DashBoard/Manage Users/ManageUsers";
import ManageReviews from "../../Layout/Dashboard/Admin DashBoard/Manage Reviews/ManageReviews";
import SingUp2 from "../../Pages/SingUp/SingUp";
import MakeAnOffer from "../../Layout/Dashboard/UserProfile/MyProfile/MakeAnOffer";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PaymentPage from "../../Layout/Dashboard/UserProfile/MyProfile/Payment/PaymentPage";
import ErrorPage from "../../Component/errorPage/ErrorPage";
import UpdateAddProperty from "../../Layout/Dashboard/Agent DashBoard/UpdateAddProperty/UpdateAddProperty";
import axios from "axios";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/singup',
        element: <SingUp2></SingUp2>
      },
      {
        path: '/allproperty',
        element: <AllProperty />
      },
      {
        path: '/details-page/:id',
        element: <PrivateRoute>
          <DetailsPage />
        </PrivateRoute>,
        loader: ({ params }) => fetch(` https://server-real-state.vercel.app/single-property/${params.id}`)
      }
    ],


  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <Dashboard />
    </PrivateRoute>,
    children: [
      //user Dashboard
      {
        path: 'user',
        element: <PrivateRoute>
          <MyProfile />
        </PrivateRoute>
      },
      {
        path: 'payment/:id',
        element: <PrivateRoute>
          <PaymentPage />
        </PrivateRoute>
      },
      {
        path: 'wishlist',
        element: <PrivateRoute>
          <WishList />
        </PrivateRoute>


      },
      {
        path: 'property-bought',
        element: <PrivateRoute>
          <PropertyBought />
        </PrivateRoute>
      },
      {
        path: 'my-review',
        element: <PrivateRoute>
          <MyReview />
        </PrivateRoute>
      },
      {
        path: 'user-make-offer/:id',
        element: <PrivateRoute>
          <MakeAnOffer />
        </PrivateRoute>,
        loader: ({ params }) => fetch(`https://server-real-state.vercel.app/make-offer/${params.id}`)

      },

      //Agent DashBoard

      {
        path: 'agent-profile',
        element: <PrivateRoute>
          <AgentProfile />
        </PrivateRoute>
      },
      {
        path: 'add-property',
        element: <PrivateRoute>
          <AddProperty />
        </PrivateRoute>
      },
      {
        path: 'my-added-property',
        element: <PrivateRoute>
          <MyAddedProperty />
        </PrivateRoute>
      },
      {
        path: 'update-property/:id',
        element: <PrivateRoute>
           <UpdateAddProperty/>
        </PrivateRoute> ,
        loader: ({params}) => fetch(`https://server-real-state.vercel.app/single-property/${params.id}`)
      },
      {
        path: 'my-sold-property',
        element: <PrivateRoute>
          <MySoldProperty />
        </PrivateRoute>
      },
      {
        path: 'requested-properties',
        element: <PrivateRoute>
          <RequestedProperties />
        </PrivateRoute>
      },
      //Admin ROute

      {
        path: 'admin-profile',
        element: <PrivateRoute>
          <AdminProfile />
        </PrivateRoute>
      },
      {
        path: 'manage-properties',
        element: <PrivateRoute>
          <ManageProperty />
        </PrivateRoute>


      },
      {
        path: 'manage-users',
        element: <PrivateRoute>
          <ManageUsers />
        </PrivateRoute>
      },
      {
        path: 'manage-reviews',
        element: <PrivateRoute>
          <ManageReviews />
        </PrivateRoute>
      },

    ]
  }
]);

export default router;