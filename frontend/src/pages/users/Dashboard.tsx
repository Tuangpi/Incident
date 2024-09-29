import MyBarChart from "./MyBarChart";
import MyPiechart from "./MyPiechart";

const Dashboard = () => {
  return (
    <div className="flex justify-between gap-x-2 items-center text-white m-2">
      <div className="w-full">
        <MyBarChart />
      </div>
      <div className="w-full">
        <MyPiechart />
      </div>
    </div>
  );
};
export default Dashboard;
