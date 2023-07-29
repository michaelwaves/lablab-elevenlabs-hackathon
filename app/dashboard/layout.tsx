"use client"
import Link from "next/link"

import SidebarModelSelector from "./SidebarModelSelector"

import { motion } from "framer-motion"
import { useState, useEffect, } from "react"
import { getUserModels, useAuth } from "@/Firebase"

export default function Layout({ children }: { children: React.ReactNode }) {
    const [leftOpen, setLeftOpen] = useState(false)
    const [rightOpen, setRightOpen] = useState(false)
    const [models, setModels] = useState<any>([])
    const handleResize = () => {
        if (window.innerWidth >= 760) {
            setLeftOpen(false)
            setRightOpen(false)
        }
    };

    const { user, signedIn } = useAuth()

    useEffect(() => {
        const gum = async (uid: string | undefined) => {
            let m = await getUserModels(uid ?? "HJ7clLOTV5TKRNaTfB5S")
            setModels(m)
        }
        if (signedIn) {
            gum(user?.uid)
        } else {
            gum(undefined)
        }
    }, [signedIn, user?.uid])



    let sideBarModelSelectors = models.map((model: any) => {
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
                    <Link href="/browse" className="font-heading relative bg-gray-800  p-4 rounded-xl w-60 font-bold  hover:translate-x-2 text-white text-center  hover:translate-y-2 transition-all duration-75">

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
                <Link href="/browse" className="font-heading relative bg-gray-800  p-4 rounded-xl w-60 font-bold  hover:translate-x-2 text-white text-center  hover:translate-y-2 transition-all duration-75">

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