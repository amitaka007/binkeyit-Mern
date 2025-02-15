import { Outlet } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css"; // Import the styles for Skeleton
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/slices/authSlice";
import { setLoadingCategory } from "./store/slices/categoriesSlice";
import { fetchAllCategory } from "./store/thunk/categories/categoriesApi";

function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data.data));
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      await dispatch(fetchAllCategory());
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  useEffect(() => {
    // Fetch user details on app load or when the user's details change
    fetchUser();
    fetchCategory();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
