import {
    createBrowserRouter
} from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Trainers from "../Pages/Trainers/Trainers";
import Classes from "../Pages/Classes/Classes";
import Community from "../Pages/Community/Community";
import TrainerDetails from "../Pages/Trainers/TrainerDetails";
import UseAxios from "../hooks/UseAxios";
import TrainerBookingPage from "../Pages/Trainers/TrainerBookingPage";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import BecomeTrainer from "../Pages/Trainers/BecomeTrainer";
import DashboardHome from "../Pages/Dashboard/DashboradHome/DashboardHome";
import MemberActivityLog from "../Pages/Dashboard/MemberActivityLog/MemberActivityLog";
import MemberProfile from "../Pages/Dashboard/MemberProfile/MemberProfile";
import SubscribersDashboard from "../Pages/Dashboard/AdminComponents/SubscribersDashboard/SubscribersDashboard";
import AllTrainers from "../Pages/Dashboard/AdminComponents/AllTrainers/AllTrainers";
import AppliedTrainer from "../Pages/Dashboard/AdminComponents/AppliedTrainer/AppliedTrainer";
import TrainerDetailsAdmin from "../Pages/Dashboard/AdminComponents/TrainerDetailsAdmin/TrainerDetailsAdmin";
import AddNewClass from "../Pages/Dashboard/AdminComponents/AddNewClass/AddNewClass";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
import ManageSlots from "../Pages/Dashboard/TrainerComponent/ManageSlots/ManageSlots";
import AddNewSlot from "../Pages/Dashboard/TrainerComponent/AddNewSlot/AddNewSlot";
import AddNewForum from "../Pages/Dashboard/AdminComponents/AddNewForum/AddNewForum";
import BookedTrainer from "../Pages/Dashboard/BookedTrainer/BookedTrainer";
import ManageAdmin from "../Pages/Dashboard/AdminComponents/ManageAdmin/ManageAdmin";
import PrivateRoute from "../Routes/PrivateRoute";
export const trainerDetailsLoader = async ({ params }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/trainers/${params.id}`);
    if (!res.ok) throw new Error("Trainer not found");
    return res.json(); // ✅ return trainer object
};


const axiosInstance = UseAxios()

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            },
            {
                path: "trainers",
                Component: Trainers
            },
            {
                path: "classes",
                Component: Classes
            },
            {
                path: "community",
                Component: Community
            },
            {
                path: "trainers/:id",
                Component: TrainerDetails,
                loader: ({ params }) => {
                    return axiosInstance.get(`/trainers/${params.id}`)
                },
            },
            {
                path: "/trainer/:trainerId/book",
                element: <PrivateRoute>
                    <TrainerBookingPage></TrainerBookingPage>
                </PrivateRoute>
            },
            {
                path: "become-trainer",
                Component: BecomeTrainer
            },
            {
                path: "payment",
                element: <PrivateRoute>
                    <PaymentPage></PaymentPage>
                </PrivateRoute>
            },
        ]
    },

    {
        path: 'dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'activity-log',
                Component: MemberActivityLog
            },
            {
                path: 'memberprofile',
                Component: MemberProfile
            },
            {
                path: 'subscribers-dashboard',
                Component: SubscribersDashboard
            },
            {
                path: 'all-trainers',
                Component: AllTrainers
            },
            {
                path: 'applied-trainers',
                Component: AppliedTrainer
            },
            {
                path: 'applied-trainer/:id',
                Component: TrainerDetailsAdmin
            },
            {
                path: 'add-class',
                Component: AddNewClass
            },
            {
                path: 'manage-admin',
                Component: ManageAdmin
            },
            {
                path: 'manage-slots',
                Component: ManageSlots
            },
            {
                path: 'add-class',
                Component: AddNewClass
            },
            {
                path: 'add-slot',
                Component: AddNewSlot
            },
            {
                path: 'add-forum',
                Component: AddNewForum
            },
            {
                path: 'booked-trainer',
                Component: BookedTrainer
            },


        ]
    }
]);