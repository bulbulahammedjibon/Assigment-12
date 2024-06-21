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


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
        element: <DetailsPage />,
        loader: ({ params }) => fetch(` http://localhost:7000/single-property/${params.id}`)
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
        element: <MyProfile />
      },
      {
        path: 'wishlist',
        element: <WishList />,

      },
      {
        path: 'property-bought',
        element: <PropertyBought />
      },
      {
        path: 'my-review',
        element: <MyReview />
      },
      {
        path: 'user-make-offer/:id',
        element: <MakeAnOffer />,
        loader: ({ params }) => fetch(`http://localhost:7000/make-offer/${params.id}`)

      },

      //Agent DashBoard

      {
        path: 'agent-profile',
        element: <AgentProfile />
      },
      {
        path: 'add-property',
        element: <AddProperty />
      },
      {
        path: 'my-added-property',
        element: <MyAddedProperty />
      },
      {
        path: 'my-sold-property',
        element: <PrivateRoute>
          <MySoldProperty />
        </PrivateRoute>
      },
      {
        path: 'requested-properties',
        element: <RequestedProperties />
      },
      //Admin ROute

      {
        path: 'admin-profile',
        element: <AdminProfile />
      },
      {
        path: 'manage-properties',
        element: <ManageProperty />
      },
      {
        path: 'manage-users',
        element: <ManageUsers />
      },
      {
        path: 'manage-reviews',
        element: <ManageReviews />
      },

    ]
  }
]);

export default router;