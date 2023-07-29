"use client"
import RightSidebarModelInspector from "../RightSidebarModelSelector"
import { getDocById } from "@/Firebase"
import { use } from "react"
import Chat from "@/Chat"

export default function Page({ params }: { params: any }) {
    let model = use(getDocById("models", params.id))
    let data = model?.data()
    let page = <RightSidebarModelInspector
        name={data?.name}
        description={data?.description}
        tags={data?.tags}
        key={data?.voiceId}
        img={data?.img}
        img_alt={data?.img_alt}
        banner={data?.banner}
        banner_alt={data?.banner_alt}
        tagline={data?.tagline}
        date={data?.date}
    />

    console.log(data)

    return (
        <>
            {/* <div className="w-full">
                <h3>{params.id}</h3>
                <div className="relative overflow-y-scroll">
                    <input type="text" placeholder="Search" className="fixed bottom-5 w-[400px] border-2 p-2 rounded-xl" />
                </div>
            </div> */}
            <Chat modelId={params.id} name={data?.name}
                prompt={data?.prompt} img={data?.img} img_alt={data?.img_alt}
            />
            {page}
        </>
    )
}