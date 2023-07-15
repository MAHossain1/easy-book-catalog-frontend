/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import img from "../assets/images/login.svg";
import { useAppDispatch } from "../redux/hook";
import { createUser } from "../redux/features/user/userSlice";

interface INewUser {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<INewUser>();

  const dispatch = useAppDispatch();

  const handleSignup: SubmitHandler<INewUser> = (data: INewUser) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(createUser({ email: data.email, password: data.password }));
  };

  return (
    <div className="hero w-full my-20">
      <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img className="w-3/4" src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-12">
          <h1 className="text-5xl text-center font-bold">Sign Up</h1>
          <form onSubmit={handleSubmit(handleSignup)} className="card-body">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "name is required" })}
                className="input input-bordered w-full"
              />
              {errors?.name && (
                <p className="text-red-500 pt-2" role="alert">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Enter Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
              />
              {errors?.email && (
                <p className="text-red-500 pt-2" role="alert">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "password is Required",
                  pattern: {
                    value:
                      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                    message: "Password must be strong",
                  },
                  minLength: {
                    value: 6,
                    message: "password should be at least 6 character",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors?.password && (
                <p className="text-red-500 pt-2" role="alert">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-error" type="submit" value="Sign Up" />
            </div>
          </form>

          <p className="text-center">
            already have an account?{" "}
            <Link className="font-bold text-orange-600" to="/login">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
