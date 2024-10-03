import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface TableSkeletonProps {
    numberOfRows?: number;
    numberOfTableColumns: number;
}

const TableLoading: React.FC<TableSkeletonProps> = ({
    numberOfRows = 3,
    numberOfTableColumns,
}) => {
    return (
        <SkeletonTheme baseColor="#404040" highlightColor="#707070">
            <table className="w-full bg-zinc-900 border-collapse">
                <thead>
                    <tr className="bg-zinc-700">
                        {Array.from({ length: numberOfRows }).map(
                            (_, colIndex) => (
                                <th
                                    className="py-3 px-4 text-zinc-300 border-b border-zinc-600"
                                    key={colIndex}
                                >
                                    <Skeleton className="h-4 w-3/4 rounded-md" />
                                </th>
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: numberOfTableColumns }).map(
                        (_, rowIndex) => (
                            <tr className="hover:bg-zinc-800" key={rowIndex}>
                                {Array.from({ length: numberOfRows }).map(
                                    (_, colIndex) => (
                                        <td
                                            className="text-zinc-300 border-t border-zinc-600 py-2 px-4 text-sm"
                                            key={colIndex}
                                        >
                                            <Skeleton
                                                className="h-4 rounded-md"
                                                width={
                                                    colIndex === 0
                                                        ? "60%"
                                                        : colIndex ===
                                                          numberOfTableColumns -
                                                              1
                                                        ? "40%"
                                                        : "90%"
                                                }
                                            />
                                        </td>
                                    )
                                )}
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </SkeletonTheme>
    );
};

export default TableLoading;
