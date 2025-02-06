import { useEffect, useState } from "react";
import UploadCategory from "../components/UploadCategory";
import Loading from "../components/Loading";
import NoData from "../components/NoData";

const CategoryPage = () => {
  const [openUpload, setOpenUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const handleOpen = () => {
    setOpenUpload(true);
  };

  const handleClose = () => {
    setOpenUpload(false);
  };

  const fetchCategory = async () => {
    try {
      setLoading(true);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section>
      <div className="p-2 font-semibold bg-white shadow-md flex items-center justify-between">
        <h2>Category</h2>
        <button
          className="border p-2 font-semibold hover:bg-primary-100 border-primary-100 text-primary-200 hover:text-neutral-800 rounded"
          onClick={handleOpen}
        >
          Add Category
        </button>
      </div>

      {!categoryData[0] && !loading && (<NoData />)}
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      

      {loading && <Loading />}

      {openUpload && <UploadCategory close={handleClose} />}
    </section>
  );
};

export default CategoryPage;