import { ReactNode } from "react";
import { useAppSelector } from "../redux/hook";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user, isLoading } = useAppSelector(state => state.user);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
}
