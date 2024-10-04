const CustomerDashboard = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-11/12 m-auto mt-6 gap-4 text-sm">
            <div className="bg-white p-4 w-full shadow-md rounded-md">
                <div className="font-bold mb-4 text-green-800 text-lg">
                    Project Title
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700">
                    <div className="font-semibold">View bugs</div>
                    <div className="text-right">Open</div>

                    <div className="font-semibold">Status</div>
                    <div className="text-right">Open</div>

                    <div className="font-semibold">Progress</div>
                    <div className="text-right">10%</div>
                </div>
            </div>
        </div>
    );
};
export default CustomerDashboard;
