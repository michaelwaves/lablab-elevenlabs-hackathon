"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
export default function Home() {

    const ref = useRef<HTMLSpanElement>(null)
    useEffect(() => {
        //a timer function that vertically scrolls through a list of words that replaves "Anyone"
        const words = ["Anyone", "Dua Lipa", "Elon Musk", "Joe Biden"]
        //const future_celebs = ["Elon Musk", "Donald Trump", "Joe Biden", "Barack Obama", "Bill Gates", "Jeff Bezos", "Mark Zuckerberg", "Jack Dorsey", "Tim Cook", "Sundar Pichai", "Larry Page", "Sergey Brin", "Warren Buffet", "Oprah Winfrey", "Kylie Jenner", "Kim Kardashian", "Kendall Jenner", "Khloe Kardashian", "Kourtney Kardashian", "Travis Scott", "Kris Jenner", "Caitlyn Jenner", "Kanye West", "Kourtney Kardashian", "Kendall Jenner", "Kylie Jenner", "Khloe Kardashian", "Kim Kardashian", "Kris Jenner", "Caitlyn Jenner", "Travis Scott", "Kanye West", "Kourtney Kardashian", "Kendall Jenner", "Kylie Jenner", "Khloe Kardashian", "Kim Kardashian", "Kris Jenner", "Caitlyn Jenner", "Travis Scott", "Kanye West", "Kourtney Kardashian", "Kendall Jenner", "Kylie Jenner", "Khloe Kardashian", "Kim Kardashian", "Kris Jenner", "Caitlyn Jenner", "Travis Scott"]
        let i = 0
        const interval = setInterval(() => {
            i++
            if (i >= words.length) {
                i = 0
            }

            //document.querySelector(".border-b-p-5").innerHTML = words[i]
            if (ref.current) {
                ref.current.innerHTML = words[i]
            }



        }, 1000)

        return () => {
            clearInterval(interval)
        }

    }, [])
    return (
        <div className="w-full min-h-screen h-auto flex flex-col  overflow-y-hidden">

            <div className="space-y-6 md:w-[clamp(600px,60vw,1000px) relative flex flex-col h-auto my-auto mx-auto w-full items-center justify-center">
                <h1 className="text-white">Speak With <span className="border-b-p-5 border-b-2" ref={ref}>Anyone</span>🛸</h1>
                <p className="text-white">
                    Voice chat on demand with celebrities, characters, and more
                </p>
                <Link href="/dashboard" className="font-heading relative bg-gray-800  p-4 rounded-xl w-60 font-bold  hover:translate-x-2 text-white text-center  hover:translate-y-2 transition-all duration-75">

                    Chat with Dua Lipa
                    <motion.div whileTap={{ scale: 0.9 }} transition={{ duration: 0.5 }} className=" bg-gradient-to-r from-green-500 to-blue-500 w-60 h-16 rounded-xl absolute top-1 left-1 -z-10 "></motion.div>
                </Link>

            </div>
            <img src="/bg_1.png" alt="majesstic woman" className="absolute w-full md:w-1/2 h-full top-0 left-0 -z-10 object-contain" />
            <img src="/taylor_swift.png" alt="majestic taylor swift" className="w-full absolute md:w-1/2 h-full translate-x-full top-0 left-0 -z-10 object-contain" />
        </div>
    )
}