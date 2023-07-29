"use client"
import Link from "next/link"

import SidebarModelSelector from "./SidebarModelSelector"
import RightSidebarModelInspector from "./RightSidebarModelSelector"

import { motion } from "framer-motion"
import { useState, useEffect, ReactComponentElement } from "react"
import { getUserModels } from "@/Firebase"
import { use } from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
    const [leftOpen, setLeftOpen] = useState(false)
    const [rightOpen, setRightOpen] = useState(false)
    const [models, setModels] = useState([])
    const handleResize = () => {
        if (window.innerWidth >= 760) {
            setLeftOpen(false)
            setRightOpen(false)
        }
    };

    useEffect(() => {
        const gum = async () => {
            let m = await getUserModels("HJ7clLOTV5TKRNaTfB5S")
            setModels(m)
        }
        gum()
    }, [])



    let sideBarModelSelectors = models.map((model) => {
        if (model === undefined) {
            return
        }
        return (
            <SidebarModelSelector
                key={model.voiceId}
                id={model.voiceId}
                img={model.img}
                img_alt={model.img_alt}
                name={model.name}
                tagline={model.tagline}
            />
        )
    })

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className="w-full min-h-screen h-auto flex flex-row">
            <div className="block sm:hidden w-12">
                <button onClick={() => setLeftOpen(true)}>X</button>
            </div>


            {leftOpen && <div className="w-[clamp(400px,50vw,400px)] absolute h-full z-30 bg-white">
                <div className="flex flex-row justify-between">
                    <Link href="/chat" className="font-heading relative bg-gray-800  p-4 rounded-xl w-60 font-bold  hover:translate-x-2 text-white text-center  hover:translate-y-2 transition-all duration-75">

                        Find More Models
                        <motion.div whileTap={{ scale: 0.9 }} transition={{ duration: 0.5 }} className=" bg-gradient-to-r from-green-500 to-blue-500 w-60 h-16 rounded-xl absolute top-1 left-1 -z-10 "></motion.div>
                    </Link>
                    <button onClick={() => setLeftOpen(false)}>X</button>
                </div>
                <div>
                    <p>Direct Messages</p>
                    <div>
                        <p>Dua Lipa</p>
                        <p>Levitating</p>
                    </div>
                </div>

            </div>
            }
            <div className="sm:flex sm:flex-col hidden w-[clamp(400px,50vw,400px)] p-4 bg-gray-600">
                <Link href="/chat" className="font-heading relative bg-gray-800  p-4 rounded-xl w-60 font-bold  hover:translate-x-2 text-white text-center  hover:translate-y-2 transition-all duration-75">

                    Find More Models
                    <motion.div whileTap={{ scale: 0.9 }} transition={{ duration: 0.5 }} className=" bg-gradient-to-r from-green-500 to-blue-500 w-60 h-16 rounded-xl absolute top-1 left-1 -z-10 "></motion.div>
                </Link>
                <div className="mt-6 text-white">
                    <b>Direct Messages</b>
                    <div className="flex flex-col mt-4">

                        {sideBarModelSelectors}
                    </div>
                </div>
            </div>
            {children}

        </div >
    )
}