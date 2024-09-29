import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/ROUTE_PATHS";
import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const CustomerHeader = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout("/customer/logout")
      .then(() => <Navigate to={ROUTE_PATHS.CUSTOMER_LOGIN} />)
      .catch((error) => console.log(error));
  };
  return (
    <div className="w-full h-16 bg-stone-800 flex flex-col justify-center text-primary">
      <div className="flex justify-between items-center px-4">
        <div className="ml-8">
          <img alt="company logo" />
          <p>Company name</p>
        </div>
        <Button onClick={() => handleLogout()}>Logout</Button>
      </div>
    </div>
  );
};
export default CustomerHeader;
