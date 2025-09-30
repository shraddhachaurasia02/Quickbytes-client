import { useState } from "react";
import SignInModal from "../../components/admin/SigninModal";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import MenuPage from "./MenuPage";
import OrderHistoryPage from "./OrderHistoryPage";

function Admin() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <>
      {
        !isSignedIn && <SignInModal setIsSignedIn={setIsSignedIn} />
      }
      <div className="lg:h-screen flex flex-col bg-background">
        <AdminNavbar />
        {
          isSignedIn && <Routes>
            <Route path="/" element={<DashboardPage/>} />
            <Route path="/menu" element={<MenuPage/>} />
            <Route path="/orders" element={<OrderHistoryPage/>} />
          </Routes>
        }
      </div>
    </>
  )
}

export default Admin;