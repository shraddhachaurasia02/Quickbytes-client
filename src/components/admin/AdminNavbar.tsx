import { Link } from "react-router-dom";
import Icon from "../common/Icon";

export default function AdminNavbar() {
  return (
    <>
      <header
        className={`w-full bg-background/50 backdrop-blur hidden md:block z-30`}
      >
        <div className={`p-4 lg:p-6 flex  items-center container mx-auto`}>
          <Link className="flex items-center justify-center" to="/">
            <Icon className="w-6 h-6 " />
          </Link>
          <nav className="ml-auto  flex gap-4 sm:gap-6">
            <Link to="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 hover:text-primary  hover:scale-105 active:scale-95 duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </Link>
            <Link to="/admin/menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="33"
                fill="none"
                viewBox="0 0 32 33"
                className="w-8 h-8 hover:text-primary hover:scale-105 active:scale-95 duration-200"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 31.8h29.3M2.7 28.2a13.3 13.3 0 0113-11 13.1 13.1 0 0112.9 11M15.7 17.1a2.6 2.6 0 100-5.2 2.6 2.6 0 000 5.2zM15.7 4v3.7M8 6.5v3.6M23.4 6.5v3.6"
                ></path>
              </svg>
            </Link>
            <Link to="/admin/orders">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
                className="w-8 h-8 hover:text-primary hover:scale-105 active:scale-95 duration-200"
                viewBox="0 0 32 32"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M30.2 4H2v24.34h28.2V4z"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.4 24.6a3.4 3.4 0 100-6.8 3.4 3.4 0 000 6.8zM18.5 24.6a3.4 3.4 0 100-6.8 3.4 3.4 0 000 6.8zM25 19.2h1.9M25 23.2h1.9M8.4 14.6a3.4 3.4 0 100-6.8 3.4 3.4 0 000 6.8zM18.5 14.6a3.4 3.4 0 100-6.8 3.4 3.4 0 000 6.8zM25 9.2h1.9M25 13.2h1.9"
                ></path>
              </svg>
            </Link>
          </nav>
        </div>
      </header>
      <header className="bg-background border-t shadow-inner md:hidden fixed bottom-0 left-0 w-full flex items-center justify-evenly sm:justify-center sm:gap-16 px-8 py-4">
        <Link to="">
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
        <Link to="/admin/menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="33"
            fill="none"
            viewBox="0 0 32 33"
            className="w-8 h-8 hover:text-primary hover:scale-105 active:scale-95 duration-200"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 31.8h29.3M2.7 28.2a13.3 13.3 0 0113-11 13.1 13.1 0 0112.9 11M15.7 17.1a2.6 2.6 0 100-5.2 2.6 2.6 0 000 5.2zM15.7 4v3.7M8 6.5v3.6M23.4 6.5v3.6"
            ></path>
          </svg>
        </Link>
        <Link to="/admin/orders">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            className="w-8 h-8 hover:text-primary hover:scale-105 active:scale-95 duration-200"
            viewBox="0 0 32 32"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M30.2 4H2v24.34h28.2V4z"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.4 24.6a3.4 3.4 0 100-6.8 3.4 3.4 0 000 6.8zM18.5 24.6a3.4 3.4 0 100-6.8 3.4 3.4 0 000 6.8zM25 19.2h1.9M25 23.2h1.9M8.4 14.6a3.4 3.4 0 100-6.8 3.4 3.4 0 000 6.8zM18.5 14.6a3.4 3.4 0 100-6.8 3.4 3.4 0 000 6.8zM25 9.2h1.9M25 13.2h1.9"
            ></path>
          </svg>
        </Link>
      </header>
    </>
  );
}
