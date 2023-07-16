import { useState, FormEvent } from "react";
import { usePostBookMutation } from "../redux/api/apiSlice";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../redux/hook";

export default function AddNewBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [error, setError] = useState("");

  const [postBook, { isLoading, isError }] = usePostBookMutation();

  console.log(isError);
  console.log(isLoading);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userEmail = useAppSelector(state => state.user.user.email);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Perform validation
    if (!title || !author || !genre || !publicationDate) {
      setError("Please fill out all fields");
      return;
    }

    // Make API call to add the new book
    const bookData = {
      title,
      author,
      genre,
      publicationDate,
      userEmail: userEmail || "",
    };

    console.log(bookData);

    postBook(bookData)
      .unwrap()
      .then(() => {
        // Display success message or show notification
        toast.success("Book added successfully");
        // Reset form fields
        setTitle("");
        setAuthor("");
        setGenre("");
        setPublicationDate("");
        setError("");
      })
      .catch(error => {
        // Handle error response or show notification
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        toast.error("Failed to add book", error);
        setError("Failed to add book");
      });
  };

  return (
    <div className="text-center">
      <h2 className="text-center text-3xl my-4 ">Add New Book</h2>
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
            className="input mb-8  input-bordered w-full max-w-xs"
            type="text"
            value={genre}
            placeholder="Genre"
            onChange={e => setGenre(e.target.value)}
          />
        </div>
        <div>
          <input
            className="input mb-8  input-bordered w-full max-w-xs"
            type="text"
            value={publicationDate}
            placeholder="Publication Year"
            onChange={e => setPublicationDate(e.target.value)}
          />
        </div>
        <button className="btn btn-outline btn-accent">Add New Book</button>
      </form>
    </div>
  );
}
