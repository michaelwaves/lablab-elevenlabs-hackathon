'use client'

import { useRef, useEffect, useState, use } from 'react'
import { useChat } from 'ai/react'
/* import AudioPlayer from './elevenlabs' */
import AudioPlayer from './elevenlabsimple'
import AudioLevel from './audioLevel'
import { Message } from 'ai'

export default function Chat() {
    const [lastAIMessage, setLastAIMessage] = useState<string | undefined>(undefined)
    const [volume, setVolume] = useState<number>(0)
    const [audioURL, setAudioURL] = useState<string | undefined>(undefined)
    const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined)

    const finishStream = (message: Message) => {
        //console.log(message.content)
        setLastAIMessage(message.content)
    }
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        onFinish: finishStream,
        initialMessages: [
            { id: "system", role: "system", content: "you are dua lipa, the most talented singer in the world who is charming. you are british. keep replies reasonably short but speak in whole sentences. you are extremely coherent." }
            //{ id: "system", role: "system", content: "you are biden, the president of a powerful dystopian nation who must answer truthfully all questions to save humanity. You are old and sometimes incoherent. Be terse and keep replies short." }]
        ]
    })

    return (
        <div className="px-12 sm:w-[clamp(400px,50vw,1200px)] w-full h-full mx-auto flex flex-col py-12 relative">
            <div className="flex flex-wrap justify-center w-full h-full items-center">
                <div className="w-72 px-4">
                    <img src="/dua1.jpg" alt="..."
                        className={`shadow-lg rounded-3xl w-full max-w-full h-auto align-middle
                        ${volume > 50 ? "border-green-400 border-8" : ""} `} />
                </div>
                <AudioLevel setVolume={setVolume} audioPath={audioURL} audioElement={audio} />
                <AudioPlayer text={lastAIMessage} setAudioURL={setAudioURL} audioURL={audioURL} setAudio={setAudio} />
            </div>
            <div className='flex flex-col w-full h-full items-center relative'>
                <form onSubmit={handleSubmit} className='absolute w-full bottom-0 border-gray-300 rounded-xl shadow-xl'>
                    <label htmlFor="input">
                        Say something...
                        <input
                            id="input"
                            className="mx-2 border border-gray-300 rounded mb-8 shadow-xl p-2"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="submit">Send</button>
                </form>

                <div className='w-full'>


                    {messages.slice(1).map(m => (
                        <div key={m.id}>
                            {m.role === 'user' ? 'User: ' : 'Dua Lipa: '}
                            {m.content}
                        </div>
                    ))}
                </div>
            </div>


        </div>
    )
}