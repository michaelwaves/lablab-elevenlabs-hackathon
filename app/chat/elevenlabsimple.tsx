import { useState, useEffect, useRef } from "react"
import { voiceIds } from "./voiceIds"
import axios from "axios";
import { newVoices } from "@/Firebase";
export default function AudioPlayer({ text, audioURL, setAudioURL, setAudio, voiceId }:
    { text: string | undefined, audioURL: string | undefined, setAudioURL: Function, setAudio: Function, voiceId: string }) {
    //const [audioURL, setAudioURL] = useState<string | undefined>(undefined)
    async function postData(voiceID: string) {
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`;

        const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY as string

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': apiKey,
                'accept': 'audio/mpeg'
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_monolingual_v1",
                voice_settings: {
                    stability: 0,
                    similarity_boost: 0,
                    style: 0.5,
                    use_speaker_boost: false
                }
            })
        };

        const axiosConfig = {
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': apiKey,
                'accept': 'audio/mpeg',
                'output_format': 'mp3_44100'
            },
            data: {
                text: text,
                model_id: "eleven_monolingual_v1",
                voice_settings: {
                    stability: 0,
                    similarity_boost: 0,
                    style: 0.5,
                    use_speaker_boost: false
                }
            },
        }

        try {
            const response = await fetch(url, requestOptions);
            //const response = await axios(axiosConfig)  
            console.log(requestOptions)
            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }
            // Handle the response here
            const data = await response.blob()
            const blob = new Blob([data], { type: 'audio/mpeg' })
            console.log(blob)
            const audiourl = URL.createObjectURL(data)
            setAudioURL(audiourl)

        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Play the audio
    const playAudio = () => {
        const audio = new Audio(audioURL);
        audio.play();
        /*  if (ref.current) {
             ref.current.play()
         } */
        console.log(audioURL)
        setAudioURL(audioURL)
        setAudio(audio)
    };

    useEffect(() => {
        console.log(text)
        if (text) {
            postData(voiceId)
        }
    }, [text])

    useEffect(() => {
        if (audioURL) {
            playAudio()
        }
    }, [audioURL])
    const ref = useRef<HTMLAudioElement>(null)

    return (
        <div>
            <audio src={audioURL} ref={ref} />
            {/* <button onClick={() => newVoices()}>New Voices</button> */}
            {/* <h1>audio</h1>
            <button onClick={playAudio}>Play</button> */}
        </div>
    )
} 