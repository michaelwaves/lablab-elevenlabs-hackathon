'use client'

import { useRef, useEffect, useState, use } from 'react'
import { useChat } from 'ai/react'
/* import AudioPlayer from './elevenlabs' */
import AudioPlayer from './elevenlabsimple'
import AudioLevel from './audioLevel'
import { Message } from 'ai'
import { formatDate } from './utils'

import GoogleButton from 'react-google-button'
import { useAuth, signInWithGoogle, auth, checkAndAddChatToFireStore, addMessageToChat } from '@/Firebase'
import { signOut } from 'firebase/auth'

export default function Chat() {
    const [lastAIMessage, setLastAIMessage] = useState<string | undefined>(undefined)
    const [volume, setVolume] = useState<number>(0)
    const [audioURL, setAudioURL] = useState<string | undefined>(undefined)
    const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined)

    const { user, signedIn } = useAuth()

    useEffect(() => {
        if (user) {
            checkAndAddChatToFireStore(user?.uid, "z6VFmukOwPqiIteyPaqo", messages)
        }
    }, [user])

    const finishStream = (message: Message) => {
        //console.log(message.content)
        setLastAIMessage(message.content)
        if (user) {
            console.log(messages)
            addMessageToChat(user?.uid + "z6VFmukOwPqiIteyPaqo", input, { id: formatDate(new Date()), role: "user", content: input, createdAt: new Date() })
            addMessageToChat(user?.uid + "z6VFmukOwPqiIteyPaqo", message.id, message)
        }

    }
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        onFinish: finishStream,
        initialMessages: [
            { id: "system", role: "system", content: "you are dua lipa, the most talented singer in the world who is charming. you are british. keep replies reasonably short but speak in whole sentences. you are extremely coherent." }
            //{ id: "system", role: "system", content: "you are biden, the president of a powerful dystopian nation who must answer truthfully all questions to save humanity. You are old and sometimes incoherent. Be terse and keep replies short." }]
        ]
    })

    //debugging
    useEffect(() => {
        console.log(messages)
        console.log(user, signedIn)
    }, [messages])

    return (
        <div className="sm:w-[clamp(400px,50vw,1000px)] w-full h-full flex flex-col">
            <div className="bg-gray-800 w-full h-1/4 flex flex-row p-4 space-x-4 items-center justify-center">
                <div className="w-60 h-40">
                    <img src="/dua1.jpg" alt="..."
                        className={`shadow-lg rounded-3xl object-cover w-full h-full
                        ${volume > 50 ? "border-green-400 border-8" : ""} `} />
                </div>
                <div className='flex flex-col space-y-2'>
                    <GoogleButton onClick={signInWithGoogle} label='Sign in to save chat' />
                    <button className='bg-gray-700 w-20 p-2 mr-2 text-bold text-white font-heading' onClick={() => signOut(auth)}>Signout</button>
                    {/* <AudioLevel setVolume={setVolume} audioPath={audioURL} audioElement={audio} />
                <AudioPlayer text={lastAIMessage} setAudioURL={setAudioURL} audioURL={audioURL} setAudio={setAudio} /> */}
                </div>
            </div>
            <div className='w-full h-[60vh] overflow-y-scroll text-white bg-gray-700 scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200 px-4'>
                {messages.slice(1).map(m => (
                    <div key={m.id} className='flex flex-row space-x-2 mt-4'>
                        <img src={m.role == 'user' ? "/bg_1.png" : "/dua_lipa_dress.png"} alt="pfp" className='w-10 h-10 rounded-full' />
                        <div>
                            <div className='flex flex-row space-x-2 items-center mb-2'>
                                <div className='font-bold'>{m.role === 'user' ? 'User ' : 'Dua Lipa '}</div>
                                <p className='text-sm'>{formatDate(m.createdAt ?? new Date())}</p>
                            </div>
                            {m.content}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className='bg-gray-500 w-full h-full flex flex-row items-center py-2 justify-center'>
                <input
                    id="input"
                    className="mx-2 border border-gray-300 rounded shadow-xl p-2 w-[clamp(400px,50vw,600px)]"
                    value={input}
                    onChange={handleInputChange}
                    autoComplete='off'
                />
                <button className='bg-gray-700 w-20 p-2 mr-2 text-bold text-white font-heading' type="submit">Send</button>
            </form>


        </div>



    )
}