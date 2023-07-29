"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

interface SidebarModelSelectorProps {
    id: string,
    [props: string]: string,
}

export default function SidebarModelSelector({ id, img, img_alt, name, tagline }: SidebarModelSelectorProps) {
    let segment = useSelectedLayoutSegment();
    let active = id == `${segment}`
    console.log(segment, id, active)

    return (
        <Link href={`/dashboard/${id}`} className="relative w-full h-20 z-10" id={id}>
            <div className={` hover:bg-gray-700 w-full h-20 rounded-xl rounded-tl-none z-20 flex flex-row p-4 space-x-4 border-r-p-6 border-b-p-2 ${active ? "border-2 bg-gray-700" : ""}`}>
                <img src={img} alt={img_alt} className="z-20 object-cover w-12 h-12 rounded-full border-r-p-6 border-b-p-2 border-2" />
                <div className="z-20 flex flex-col">
                    <b>{name}</b>
                    <p className="text-sm text-p-6">{tagline}</p>
                </div>
            </div>
            {active && <div className="bg-gradient-to-t from-p-2 to-p-6 blur-lg w-full -z-10 h-20 rounded-xl absolute top-2 -left-2 "></div>}
        </Link>
    )
}