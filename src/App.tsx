import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import { useReduxAction, useReduxState } from "./hooks/UseRedux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef, useState } from "react";
import Admin from "./pages/admin/Admin";
import axios from "./axios";
import OrdersPage from "./pages/OrdersPage";
import DefaultRoute from "./pages/DefaultRoute";

function App() {
    const [isBackendActive, setIsBackendActive] = useState(false);
    //TODO CHANGE TO REDUX STATE
    const { isSignedIn } = useReduxState();
    const { setIsSignedIn, setLoginData } = useReduxAction();

    const refreshTimer = useRef<NodeJS.Timeout | null>(null);

    //polling for menu call, set isBackendActive to true if successful also clear timeout when successful
    useEffect(() => {
        refreshTimer.current = setInterval(() => {
            GetMenu();
        }, 1000);
        return () => {
            if (refreshTimer.current) {
                clearInterval(refreshTimer.current);
            }
        }
    }, []);



    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsSignedIn(true);
            setLoginData({
                username: "Hehe",
                password: "Hehe",
            });
        }
    }, []);

    const { setMenu } = useReduxAction();

    async function GetMenu() {
        try {
            const resp = await axios.get("/menu");
            if (resp.status == 200) {
                setMenu(resp.data.data);
                setIsBackendActive(true);
                if (refreshTimer.current) {
                    clearInterval(refreshTimer.current);
                }
            }
        }
        catch (e: any) {
            console.log(e);
        }
    }

    return (
        <div className="">
            <ToastContainer />
            <div className={`${isBackendActive?"pointer-events-none opacity-0":""} duration-1000 flex flex-col items-center justify-center h-screen z-50 fixed top-0 left-0 w-screen bg-[#FFFFF0]`}>
                <div className={`flex flex-col items-center ${isBackendActive?"-translate-y-96":""} duration-1000`}>
                <div className="loader">
                    <div className="panWrapper">
                        <div className="pan">
                            <div className="food"></div>
                            <div className="panBase"></div>
                            <div className="panHandle"></div>
                        </div>
                        <div className="panShadow"></div>
                    </div>
                </div>
                <h2 className="mt-4 text-white">Loading...</h2>
                </div>
            </div>
            {
                isBackendActive && (
                    <Routes>
                        {
                            isSignedIn ?
                                (
                                    <>
                                        <Route path="/" element={<DashboardPage />} />
                                        <Route path='/orders' element={<OrdersPage />} />
                                    </>
                                ) :
                                (
                                    <>
                                        <Route path="/" element={<LandingPage />} />
                                        <Route path="/Dashboard" element={<DashboardPage />} />
                                        <Route path="/signin" element={<SignInPage />} />
                                        <Route path="/signup" element={<SignUpPage />} />
                                    </>
                                )
                        }
                        <Route path="/*" element={<DefaultRoute />} />
                        <Route path="/admin/*" element={<Admin />} />
                    </Routes>
                )
            }
        </div>
    );
}

export default App;
