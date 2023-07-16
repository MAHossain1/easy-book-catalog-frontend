/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/api/apiSlice";
import { toast } from "react-hot-toast";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: book, isLoading, isError } = useSingleBookQuery(id);
  const [updateBook, { isLoading: isUpdating, isError: updateError }] =
    useUpdateBookMutation();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setGenre(book.genre);
      setPublicationDate(book.publicationDate);
    }
  }, [book]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Perform validation
    if (!title || !author || !genre || !publicationDate) {
      setError("Please fill out all fields");
      return;
    }

    const updatedBook = {
      id,
      title,
      author,
      genre,
      publicationDate,
    };

    updateBook(updatedBook)
      .unwrap()
      .then(() => {
        toast.success("Book updated successfully");
        navigate(`/`);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(error => {
        toast.error("Failed to update book");
        setError("Failed to update book");
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching book data</div>;
  }

  return (
    <div className="text-center">
      <h2 className="text-center text-3xl my-4 ">Edit Book</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="input mb-8 input-bordered w-full max-w-xs"
            type="text"
            value={title}
            placeholder="Title"
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            className="input mb-8 input-bordered w-full max-w-xs"
            type="text"
            value={author}
            placeholder="Author"
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <input
            className="input mb-8 input-bordered w-full max-w-xs"
            type="text"
            value={genre}
            placeholder="Genre"
            onChange={e => setGenre(e.target.value)}
          />
        </div>
        <div>
          <input
            className="input mb-8 input-bordered w-full max-w-xs"
            type="text"
            value={publicationDate}
            placeholder="Publication Year"
            onChange={e => setPublicationDate(e.target.value)}
          />
        </div>
        <button
          className="btn btn-outline btn-accent"
          type="submit"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
}
