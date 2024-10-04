import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CustomerDetailLoading = () => {
    return (
        <SkeletonTheme baseColor="#e0e0e0" highlightColor="#cfcfcf">
            <div className="flex flex-col lg:flex-row justify-between items-start py-2">
                <div className="py-1 pb-6 px-4 flex flex-col gap-y-2 w-11/12 lg:w-1/4 bg-zinc-200">
                    <Skeleton
                        count={3}
                        height={26}
                        width="100%"
                        baseColor="#eee"
                        highlightColor="#ddd"
                        className="mt-3"
                    />
                </div>
                <div className="px-8 py-1 w-3/4">
                    <Skeleton width="50%" height={26} />
                    <Skeleton count={3} height={22} className="mt-3" />
                    <Skeleton width="18%" height={32} className="mt-4" />
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default CustomerDetailLoading;
