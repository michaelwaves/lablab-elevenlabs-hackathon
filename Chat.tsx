'use client'

import { useRef, useEffect, useState, use } from 'react'
import { useChat } from 'ai/react'
/* import AudioPlayer from './elevenlabs' */
import AudioPlayer from './app/chat/elevenlabsimple'
import AudioLevel from './app/chat/audioLevel'
import { Message } from 'ai'
import { formatDate } from './app/chat/utils'

import GoogleButton from 'react-google-button'
import { useAuth, signInWithGoogle, auth, checkAndAddChatToFireStore, addMessageToChat, db, deleteCollection } from '@/Firebase'
import { getDocs, collection, orderBy, query } from 'firebase/firestore'
import { signOut } from 'firebase/auth'


export default function Chat({ modelId, name, prompt, img, img_alt }: { modelId: string, name: string, prompt: string, img: string, img_alt: string }) {
    const [lastAIMessage, setLastAIMessage] = useState<string | undefined>(undefined)
    const [previousMessages, setPreviousMessages] = useState<Message[]>([])
    const [volume, setVolume] = useState<number>(0)
    const [audioURL, setAudioURL] = useState<string | undefined>(undefined)
    const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined)

    const { user, signedIn } = useAuth()
    let chatId = user?.uid + modelId

    useEffect(() => {
        if (user) {
            checkAndAddChatToFireStore(user?.uid, modelId, messages)
        }
        let chatId = user?.uid + modelId
        const getMessages = async (chatId: string) => {
            let messages = (await getDocs(query(collection(db, `/chats/${chatId}/messages`), orderBy("createdAt")))).docs.map((d) => d.data() as Message)
            const sortFunction = (a: any, b: any) => {
                if (a.createdAt?.toDate() < b.createdAt?.toDate()) {
                    return 1
                }
                if (a.createdAt?.toDate() > b.createdAt?.toDate()) {
                    return -1
                }
                return 0
            }
            messages.sort(sortFunction)
            return messages
        }
        let prevMessages = getMessages(chatId).then((messages) => {
            console.log(messages)
            setPreviousMessages(messages)
        })

    }, [user])

    const finishStream = (message: Message) => {
        //console.log(message.content)
        setLastAIMessage(message.content)
        if (user) {
            console.log(messages)
            addMessageToChat(user?.uid + modelId, input, { id: formatDate(new Date()), role: "user", content: input, createdAt: new Date() })
            addMessageToChat(user?.uid + modelId, message.id, message)
        }

    }
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        onFinish: finishStream,
        initialMessages: [
            { id: "system", role: "system", content: prompt },
            ...previousMessages
            //{ id: "system", role: "system", content: "you are biden, the president of a powerful dystopian nation who must answer truthfully all questions to save humanity. You are old and sometimes incoherent. Be terse and keep replies short." }]
        ]
    })

    //debugging
    useEffect(() => {
        console.log(messages)
        console.log(user, signedIn)
    }, [messages])

    return (
        <div className="sm:w-[clamp(400px,50vw,1000px)] w-full h-full flex flex-col relative">
            <div className="bg-gray-800 w-full h-1/4 flex flex-row p-4 space-x-4 items-center justify-center">

                <div className="w-60 h-40">
                    <img src={img} alt={img_alt}
                        className={`shadow-lg rounded-3xl object-cover w-full h-full
                        ${volume > 50 ? "border-green-400 border-8" : ""} `} />
                </div>
                <div className='flex flex-col space-y-2 items-center'>
                    {!signedIn && <GoogleButton onClick={signInWithGoogle} label='Sign in to save chat' />}

                    {signedIn && <button className='bg-gray-700 w-20 p-2 text-bold text-white font-heading absolute top-0' onClick={() => signOut(auth)}>Signout</button>}
                    <AudioLevel setVolume={setVolume} audioPath={audioURL} audioElement={audio} />
                    <AudioPlayer voiceId={modelId} text={lastAIMessage} setAudioURL={setAudioURL} audioURL={audioURL} setAudio={setAudio} />
                    {signedIn && <button className='bg-red-500 hover:bg-red-700 w-20 h-fit p-2 text-bold text-white font-heading' onClick={() => deleteCollection(`/chats/${chatId}/messages`)}>Delete Messages</button>}

                </div>

            </div>
            <div className='w-full h-[60vh] overflow-y-scroll text-white bg-gray-700 scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200 px-4'>
                {messages.slice(1).map(m => (
                    <div key={m.id} className='flex flex-row space-x-2 mt-4'>
                        <img src={m.role == 'user' ? user?.photoURL ?? "/bg_1.png" : img} alt="pfp" className='w-10 h-10 rounded-full' />
                        <div>
                            <div className='flex flex-row space-x-2 items-center mb-2'>
                                <div className='font-bold'>{m.role === 'user' ? 'User ' : name + ' '}</div>
                                {/* <p className='text-sm'>{formatDate(m.createdAt.toDate() ?? new Date())}</p> */}
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