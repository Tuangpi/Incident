import { useAppDispatch, useAppSelector } from "@/store";
import { toggleAction } from "@/store/activeActionReducer";
import { ReactNode } from "react";
import { BiMenuAltLeft } from "react-icons/bi";

export const TableActionUser = ({
    id,
    children,
}: {
    id: string;
    children: ReactNode;
}) => {
    const dispatch = useAppDispatch();
    const actionId = useAppSelector((state) => state.activeAction.id);

    const handleActionToggle = (
        id: string,
        e: React.MouseEvent<SVGElement>
    ) => {
        e.stopPropagation();
        dispatch(toggleAction({ id: actionId === id ? undefined : id }));
    };

    return (
        <div className="flex justify-center items-center right-10 absolute top-1/2 transform -translate-y-1/2 z-10">
            <BiMenuAltLeft
                size={20}
                className="cursor-pointer"
                onClick={(e) => handleActionToggle(id, e)}
            />
            {actionId == id && (
                <div
                    className="bg-zinc-700 w-28 max-h-28 absolute top-0 right-5 rounded-md select-none border border-zinc-500"
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export const TableActionCustomer = ({
    id,
    children,
}: {
    id: string;
    children: ReactNode;
}) => {
    const dispatch = useAppDispatch();
    const actionId = useAppSelector((state) => state.activeAction.id);

    const handleActionToggle = (
        id: string,
        e: React.MouseEvent<SVGElement>
    ) => {
        e.stopPropagation();
        dispatch(toggleAction({ id: actionId === id ? undefined : id }));
    };

    return (
        <div className="flex justify-center items-center right-10 absolute top-1/2 transform -translate-y-1/2 z-10">
            <BiMenuAltLeft
                size={20}
                className="cursor-pointer"
                onClick={(e) => handleActionToggle(id, e)}
            />
            {actionId == id && (
                <div
                    className="bg-zinc-700 w-28 max-h-28 absolute -top-2 right-0 rounded-md select-none"
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            )}
        </div>
    );
};
