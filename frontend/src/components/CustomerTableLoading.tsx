import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface TableSkeletonProps {
    numberOfRows?: number;
    numberOfTableColumns: number;
}

const CustomerTableLoading: React.FC<TableSkeletonProps> = ({
    numberOfRows = 3,
    numberOfTableColumns,
}) => {
    return (
        <SkeletonTheme baseColor="#e0e0e0" highlightColor="#cfcfcf">
            <table className="w-full bg-white border-collapse shadow-md">
                <thead>
                    <tr className="bg-gray-200">
                        {Array.from({ length: numberOfTableColumns }).map(
                            (_, colIndex) => (
                                <th
                                    className="py-3 px-4 text-gray-700 border-b border-gray-300"
                                    key={colIndex}
                                >
                                    <Skeleton className="h-4 w-3/4 rounded-md" />
                                </th>
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: numberOfRows }).map((_, rowIndex) => (
                        <tr className="hover:bg-gray-100" key={rowIndex}>
                            {Array.from({ length: numberOfTableColumns }).map(
                                (_, colIndex) => (
                                    <td
                                        className="text-gray-700 border-t border-gray-300 py-2 px-4 text-sm"
                                        key={colIndex}
                                    >
                                        <Skeleton
                                            className="h-4 rounded-md"
                                            width={
                                                colIndex === 0
                                                    ? "60%"
                                                    : colIndex ===
                                                      numberOfTableColumns - 1
                                                    ? "40%"
                                                    : "90%"
                                            }
                                        />
                                    </td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </SkeletonTheme>
    );
};

export default CustomerTableLoading;
