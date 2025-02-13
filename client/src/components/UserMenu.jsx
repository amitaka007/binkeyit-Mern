/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
// import Axios from "../utils/axios";
// import SummaryApi from "../common/api/SummaryApi";
// import { logout } from "../store/slices/userSlice";
import AxiosToastError from "../utils/AxiosToastError";
import { HiExternalLink } from "react-icons/hi";
import { userlogout } from "../store/thunk/auth/authThunk";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state?.authSlice?.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // const response = await Axios({
      //   ...SummaryApi.logout,
      // });
      // if (response.data.success) {
      //   if (close) {
      //     close();
      //   }
      //   dispatch(logout());
      //   localStorage.clear();
      //   toast.success(response.data.message);
      //   navigate("/");
      // }

       await dispatch(userlogout());
      

      navigate("/");
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-200 text-ellipsis line-clamp-1">
          {user.name || user.mobile}{" "}
        </span>
        <Link to={"/dashboard/profile"} className="hover:text-primary-200">
          <HiExternalLink size={15} />
        </Link>{" "}
      </div>
      <Divider />
      <div className="text-sm grid gap-1">
        <Link
          to={"/dashboard/category"}
          onClick={handleClose}
          className="px-2 py-1 hover:bg-orange-200"
        >
          Category
        </Link>
        <Link
          to={"/dashboard/subcategory"}
          onClick={handleClose}
          className="px-2 py-1 hover:bg-orange-200"
        >
          Sub Category
        </Link>

        <Link
          to={"/dashboard/upload-product"}
          onClick={handleClose}
          className="px-2 py-1 hover:bg-orange-200"
        >
          Upload Product
        </Link>

        <Link
          to={"/dashboard/products"}
          onClick={handleClose}
          className="px-2 py-1 hover:bg-orange-200"
        >
          Products
        </Link>
        <Link
          to={"/dashboard/myorders"}
          onClick={handleClose}
          className="px-2 py-1 hover:bg-orange-200"
        >
          My Orders
        </Link>
        <Link
          to={"/dashboard/address"}
          onClick={handleClose}
          className="px-2 py-1 hover:bg-orange-200"
        >
          Save Address{" "}
        </Link>

        <button
          className="text-left px-2 hover:bg-orange-200  "
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
