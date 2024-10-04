import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardLoading = () => {
    return (
        <SkeletonTheme baseColor="#303030" highlightColor="#4a4a4a">
            <div className="mx-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="p-3 bg-zinc-800 rounded-lg shadow"
                        >
                            <Skeleton height={20} width="50%" />
                            <Skeleton
                                height={15}
                                width="80%"
                                className="mt-3"
                            />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 w-full m-auto mt-8 gap-3">
                    <div className="p-4 bg-zinc-800 rounded-lg shadow">
                        <Skeleton height={20} width="40%" />
                        <Skeleton height={180} className="mt-4" />
                    </div>
                    <div className="p-4 bg-zinc-800 rounded-lg shadow">
                        <Skeleton height={20} width="40%" />
                        <Skeleton height={180} className="mt-4" />
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default DashboardLoading;
