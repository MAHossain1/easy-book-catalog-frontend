/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useSingleBookQuery,
} from "../redux/api/apiSlice";
import img from "../assets/images/book.jpg";
import BookReview from "../components/BookReview";
import { useAppSelector } from "../redux/hook";
import { toast } from "react-hot-toast";

export default function BookDetails() {
  const { id } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userEmail = useAppSelector(state => state.user?.user?.email);
  console.log(userEmail, "from client");

  const navigate = useNavigate();

  const { data: book } = useSingleBookQuery(id);

  const [deleteBookMutation, { isLoading, isError }] = useDeleteBookMutation();
  console.log(isLoading);
  console.log(isError);

  const handleDeleteBook = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmed) {
      deleteBookMutation(id)
        .unwrap()
        .then(() => {
          toast.success("Book deleted successfully");
          navigate("/");
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={img} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{book?.title}</h1>
          <p className="text-xl">Author: {book?.author}</p>
          <p className="text-xl">Genre: {book?.genre}</p>
          <p className="text-xl">Publication Year: {book?.publicationDate}</p>
          {userEmail === book?.userEmail && ( // Compare userEmail and book.email
            <>
              <Link
                to={`/edit-book/${id}`}
                className="btn btn-outline btn-primary"
              >
                Edit Book
              </Link>
              <button className="btn ml-4 btn-error" onClick={handleDeleteBook}>
                Delete Book
              </button>
            </>
          )}
        </div>
      </div>
      <BookReview id={id!} />
    </>
  );
}
