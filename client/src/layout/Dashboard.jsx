import { Outlet } from "react-router-dom";
import UserMenu from "../components/UserMenu";

const Dashboard = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto p-3 grid lg:grid-cols-[200px,1fr]">
        {/* left for menu */}

        <div className="py-4 sticky top-24 overflow-y-auto hidden lg:block border-r">
          <UserMenu />
        </div>

        {/* right for content */}
        <div className="bg-white min-h-[75vh]">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
