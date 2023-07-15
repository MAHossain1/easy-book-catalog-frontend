import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";
import { useAppDispatch } from "./redux/hook";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.config";
import { setLoading, setUser } from "./redux/features/user/userSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(setUser(user.email));
        dispatch(setLoading(false));
      } else setLoading(false);
    });
  }, [dispatch]);

  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
