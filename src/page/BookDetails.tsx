/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useParams } from "react-router-dom";
import { useSingleBookQuery } from "../redux/api/apiSlice";
import img from "../assets/images/book.jpg";
import BookReview from "../components/BookReview";

export default function BookDetails() {
  const { id } = useParams();

  const { data: book } = useSingleBookQuery(id);

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
          {/* <ul className="space-y-1 text-lg">
            {book?.reviews?.map((review: any) => (
              <li key={review}>Review: {review?.comment}</li>
            ))}
          </ul> */}
          {/* <Button onClick={() => handleAddProduct(product)}>Add to cart</Button> */}
        </div>
      </div>
      <BookReview id={id!} />
    </>
  );
}
