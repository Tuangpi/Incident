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
        <SkeletonTheme baseColor="#313131" highlightColor="#525252">
            <table className="bg-zinc-800">
                <thead>
                    <tr className="bg-zinc-600">
                        {Array.from({ length: numberOfTableColumns }).map(
                            (_, colIndex) => (
                                <th
                                    className="py-2 text-zinc-300 border border-solid border-zinc-600"
                                    key={colIndex}
                                >
                                    <Skeleton className="h-6 w-full" />
                                </th>
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: numberOfRows }).map((_, rowIndex) => (
                        <tr className="hover:bg-zinc-700" key={rowIndex}>
                            {Array.from({ length: numberOfTableColumns }).map(
                                (_, colIndex) => (
                                    <td
                                        className="text-zinc-300 border border-solid border-zinc-600 text-sm"
                                        key={colIndex}
                                    >
                                        <Skeleton className="h-6 w-full" />
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

export default TableLoading;
