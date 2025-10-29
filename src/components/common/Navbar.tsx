import { Link } from "react-router-dom";
import Icon from "./Icon";
import TextButton from "./TextButton";
import Button from "./Button";
import { useReduxState } from "../../hooks/UseRedux";
import { useState } from "react";
import Cart from "./Cart";
import { useModal } from "../../context/ModalContext";

function Navbar() {
  const { isSignedIn } = useReduxState();
console.log("hi")
  const [cartOpen, setCartOpen] = useState(false);
  const modal = useModal();

  return (
    <>
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <div className="md:h-20" />
      <header
  className="fixed top-3 left-0 w-full bg-[#477023] border-b-4 border-green-700 hidden md:block z-20"
  style={{ borderRadius: "30px" }}
>



        <div className={`p-4 lg:p-6 flex items-center container mx-auto`}>
          <Link className="flex items-center justify-center" to="/">
          <div className="bg-[#E49B0F] rounded-full p-2">
  <Icon className="w-6 h-6" color="#ffffff" />
</div>
           
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            {!isSignedIn ? (
              <>
                <Link to="/signup">
                  <TextButton className="bg-[#E49B0F] rounded-lg text-white">Signup</TextButton>
                </Link>
                <Link to="/signin">
                  <TextButton className="bg-[#E49B0F] rounded-lg text-white ">Signin</TextButton>
                </Link>
                <div onClick={() => setCartOpen(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 hover:text-primary hover:scale-105 active:scale-95 duration-200">
                    <path strokeLinecap="round" strokeLinejoin="round"  stroke="#ffffff" color="#fffff"  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </div>
              </>
            ) : (
              <>
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 hover:text-primary hover:scale-105 active:scale-95 duration-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#ffffff"
                      
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </Link>
                <Link to="/orders">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 hover:text-primary hover:scale-105 active:scale-95 duration-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#ffffff"
                     
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </Link>
                <div onClick={async () => {
                  if (await modal?.CreateModal("Are you sure you want to sign out?", "You will have to sign in again", "Sign Out", "Cancel")) {
                    localStorage.removeItem("token");
                    window.location.reload();
                    // navigator("/");
                  }
                }} className="cursor-pointer">
                  <svg className="w-8 h-8 hover:text-primary hover:scale-105 active:scale-95 duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" stroke="#ffffff" color="#fffff" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                  </svg>
                </div>
                <div onClick={() => setCartOpen(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 hover:text-primary hover:scale-105 active:scale-95 duration-200">
                    <path strokeLinecap="round" strokeLinejoin="round" stroke="#ffffff" color="#fffff" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </div>
              </>
            )}
          </nav>
        </div>
      </header>
      {isSignedIn && (
        <header className="bg-background border-t shadow-inner md:hidden fixed z-20 bottom-0 left-0 w-full flex items-center justify-evenly sm:justify-center sm:gap-16 px-8 py-4">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
          <Link to="/orders">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </Link>
          <div onClick={async () => {
            if (await modal?.CreateModal("Do you want to sign out?", "You will have to sign in again", "Sign Out", "Cancel")) {
              localStorage.removeItem("token");
              window.location.reload();
              // navigator("/");
            }
          }} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
            </svg>
          </div>
          <div onClick={() => setCartOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </div>
        </header>
      )}
    </>
  );
}

export default Navbar;
