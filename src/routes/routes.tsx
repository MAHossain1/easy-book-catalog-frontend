import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import App from "../App";
import NotFound from "../page/NotFound";
import Login from "../page/Login";
import Signup from "../page/Signup";
import AddNewBook from "../page/AddNewBook";
import PrivateRoute from "./PrivateRoute";
import BookDetails from "../page/BookDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/book-details/:id",
        element: <BookDetails />,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
