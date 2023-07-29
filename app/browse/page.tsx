"use client"

import { useEffect, useState } from "react"
import { db, useAuth, signInWithGoogle, auth } from "@/Firebase"
import { getDocs, collection, setDoc, getDoc, doc, updateDoc, arrayRemove } from "firebase/firestore"
import GoogleButton from "react-google-button"
import { signOut } from "firebase/auth"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Page() {

    const [input, setInput] = useState('')
    const [models, setModels] = useState<any>([])
    const [filteredModels, setFilteredModels] = useState<any>([])
    const [userModels, setUserModels] = useState<any>([])
    const { user, signedIn } = useAuth()


    const getUserModels = async () => {
        let m = (await getDoc(doc(db, 'users', user?.uid ?? "HJ7clLOTV5TKRNaTfB5S"))).data()?.models
        setUserModels(m)
    }
    const addModelToUserList = async (modelId: any) => {
        if (userModels.includes(modelId)) {
            console.log("Model already in list")
            return
        } else {
            setUserModels([...userModels, modelId])
            userModels.push(modelId)
            console.log(userModels)
            await setDoc(doc(db, 'users', user?.uid ?? "HJ7clLOTV5TKRNaTfB5S"), { models: userModels }, { merge: true })
            console.log(`Added ${modelId} to user list`)
        }
    }

    const removeModelFromUserList = async (modelId: string) => {
        if (userModels.includes(modelId)) {
            await updateDoc((doc(db, 'users', user?.uid ?? "HJ7clLOTV5TKRNaTfB5S")), {
                models: arrayRemove(modelId)
            });
            setUserModels(userModels.filter((m: string) => m !== modelId))
            console.log(`Removed ${modelId} from user list`)
        }
    }


    useEffect(() => {
        const getAllModels = async () => {
            let m = (await getDocs(collection(db, 'models'))).docs.map((d) => d.data())
            setModels(m)
            setFilteredModels(m)
            console.log(m)
        }
        getAllModels()

    }, [])

    useEffect(() => {
        if (user) {
            getUserModels()
        }
    }, [user])

    useEffect(() => {
        setUserModels(userModels)
    }, [userModels])

    useEffect(() => {
        if (input === '') {
            setFilteredModels(models)
        }
    }, [input, models])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        let filtered = models.filter((model: any) => {
            return model.name.toLowerCase().includes(input.toLowerCase())
        }
        )
        setFilteredModels(filtered)
    }

    let modelCards = filteredModels.map((model: any) => {
        if (model === undefined) {
            return
        }
        return (
            <div key={model.voiceId} className='w-60 h-[300px] flex flex-row items-center justify-center z-10 group'>
                <div className='w-full h-full bg-gray-500 rounded-xl shadow-xl'>
                    <img src={model.img} alt={model.img_alt} className="w-full h-40 object-cover rounded-xl" />
                    <div className="p-2 px-4">
                        <h2 className="text-xl text-white">{model.name}</h2>
                        <p className="text-p-5">{model.tagline}</p>
                        {signedIn && (!userModels.includes(model.voiceId) ?
                            <button className="font-heading text-white bg-gray-800 p-2 hover:bg-gradient-to-r from-p-5 to-a1-6"
                                onClick={() => addModelToUserList(model.voiceId)}
                            >Add Model</button> :
                            <button className="font-heading text-white bg-red-700 p-2 hover:bg-red-500"
                                onClick={() => removeModelFromUserList(model.voiceId)}
                            >Remove Model</button>)
                        }
                    </div>

                </div>
                <div className="hidden group-hover:block w-[244px] h-[304px] overflow-hidden absolute rounded-xl -z-10">
                    <div className="bg-gradient-to-r from-p-5 to-a1-6 w-[500px] h-[500px] group-hover:animate-pulse
                    "></div>
                </div>
            </div>
        )
    })




    return (
        <div className="w-full h-auto min-h-screen flex flex-col items-center justify-center bg-gray-700">
            <div className="w-[clamp(400px, 50vw, 1000px)] flex flex-col items-center justify-center m-auto">
                <div className="flex flex-row justify-between my-12">
                    <Link href="/dashboard" className="font-heading relative bg-gray-800  p-4 rounded-xl w-60 font-bold  hover:translate-x-2 text-white text-center  hover:translate-y-2 transition-all duration-75">

                        Now Let&rsquo;s Chat!
                        <motion.div whileTap={{ scale: 0.9 }} transition={{ duration: 0.5 }} className=" bg-gradient-to-r from-green-500 to-blue-500 w-60 h-16 rounded-xl absolute top-1 left-1 -z-10 "></motion.div>
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className='z-50 fixed top-2 bg-gray-500 flex flex-row items-center py-2 justify-center'>
                    <input
                        id="input"
                        className="mx-2 border border-gray-300 rounded shadow-xl p-2 w-[clamp(400px,50vw,600px)]"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        autoComplete='off'
                    />
                    <button className='bg-gray-700 hover:bg-p-6 w-20 p-2 mr-2 text-bold text-white font-heading' type="submit">Search</button>
                    {!signedIn && <GoogleButton onClick={signInWithGoogle} label='Sign in to add models' />}
                    {signedIn && <button className='bg-red-700 hover:bg-red-500 w-20 mr-2 h-auto  p-2 text-bold text-white font-heading' onClick={() => signOut(auth)}>Signout</button>}
                </form>
                <div className="flex flex-wrap gap-2 w-[clamp(400px, 50vw, 1000px)] items-center justify-center">
                    {modelCards}
                </div>
            </div>
        </div>
    )

}