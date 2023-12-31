/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ChangeEvent, FormEvent, useState } from "react";
import { useGetCommentQuery, usePostBookMutation } from "../redux/api/apiSlice";
import { getAuth } from "firebase/auth";

interface IProps {
  id: string;
}
export default function BookReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const auth = getAuth();
  const user = auth.currentUser;

  // if (!user) {
  //   return null;
  // }

  const [postComment, { isError, isLoading, isSuccess }] =
    usePostBookMutation();

  const { data } = useGetCommentQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  console.log(isLoading);
  console.log(isError);
  console.log(isSuccess);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options = { id: id, data: { comment: inputValue } };

    console.log(options);

    try {
      await postComment(options);
    } catch (error) {
      console.log(error);
    }

    setInputValue("");
  };
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      {user?.email && (
        <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
          <textarea
            className="min-h-[30px] textarea textarea-bordered textarea-xs w-full max-w-xs"
            onChange={handleChange}
            value={inputValue}
            placeholder="Enter your review"
          />

          <button type="submit" className="btn btn-accent rounded-md p-2 ">
            Submit Review
          </button>
        </form>
      )}
      <div className="mt-10">
        {data?.comments?.map((comment: string, index: number) => (
          <div key={index} className="mb-5">
            <p>Review: {comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
