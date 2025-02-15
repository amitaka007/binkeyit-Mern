import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";

const Home = () => {
  return (
    <section>
      <div className="container mx-auto">
        <div
          className={`w-full h-full min-h-48 bg-blue-100 rounded ${
            !banner && "animate-pulse my-2"
          } `}
        >
          <img
            src={banner}
            className="w-full h-full hidden lg:block"
            alt="banner"
          />
          <img
            src={bannerMobile}
            className="w-full h-full lg:hidden"
            alt="banner"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10  gap-2">
        <h2> shop by category</h2>
      </div>
    </section>
  );
};

export default Home;
