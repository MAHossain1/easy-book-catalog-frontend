import { Link } from "react-router-dom";

import logo from "../assets/images/book-catalog.png";

export default function Navbar() {
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-gray-200">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div className="flex items-center">
            <img className="h-8" src={logo} alt="log" />
            <h1 className="text-bold text-2xl ml-2 text-accent">
              Easy Book Catalog
            </h1>
          </div>
          <div>
            <ul className="flex items-center">
              <button className="btn btn-ghost">
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </button>
              <li>
                <button className="btn btn-ghost">
                  <Link to="/signup">Sign up</Link>
                </button>
              </li>
              <li>
                <button className="btn btn-ghost">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
