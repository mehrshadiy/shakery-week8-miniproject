import React, {Dispatch, SetStateAction} from "react";

interface Props {
    currentPage: number,
    totalPage: number,
    children: React.ReactNode,
    title?: string,
    setPage: Dispatch<SetStateAction<number>>
}
export function PaginatedList({currentPage, totalPage, children, title, setPage}: Props) {


    let list = []
    for (let i = 1; i <= totalPage; i++) {
        list.push(<li onClick={()=>{setPage(i)}} className={`${currentPage === i && "text-red-500"} cursor-pointer`} key={i}>{i}</li>)
    }


    return (
        <div className={"border-2 rounded p-8 mb-4"}>
            <div>{title}</div>
            <div>{children}</div>
            <ul className={"flex flex-row gap-4"}>
                {list}
            </ul>
        </div>
    );
}