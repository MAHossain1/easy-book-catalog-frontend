import { Link } from "react-router-dom";

import logo from "../assets/images/book-catalog.png";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { setUser } from "../redux/features/user/userSlice";

export default function Navbar() {
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    void signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  };

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
              {user.email && (
                <>
                  {" "}
                  <li>
                    <button onClick={handleSignOut} className="btn btn-ghost">
                      Sign Out
                    </button>
                  </li>
                  <li>
                    <button className="btn btn-ghost">
                      <Link to="/add-new-book">Add New Book</Link>
                    </button>
                  </li>
                </>
              )}{" "}
              {!user.email && (
                <>
                  {" "}
                  <li>
                    <button className="btn btn-ghost">
                      <Link to="/login">Login</Link>
                    </button>
                  </li>
                  <li>
                    <button className="btn btn-ghost">
                      <Link to="/signup">Sign up</Link>
                    </button>
                  </li>
                </>
              )}
              <li>
                <li>
                  <button className="btn btn-ghost">
                    <Link to="/">Home</Link>
                  </button>
                </li>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
