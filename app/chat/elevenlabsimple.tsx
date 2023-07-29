import { useState, useEffect } from "react"
import { voiceIds } from "./voiceIds"
export default function AudioPlayer({ text, audioURL, setAudioURL, setAudio, voiceId }:
    { text: string | undefined, audioURL: string | undefined, setAudioURL: Function, setAudio: Function, voiceId: string }) {
    //const [audioURL, setAudioURL] = useState<string | undefined>(undefined)
    async function postData(voiceID: string) {
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}?optimize_streaming_latency=0`;
        const apiKey = '1ea3928d9c20431833bab8e611aa2a53';

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': apiKey,
                'accept': 'audio/mpeg'
            },
            body: JSON.stringify({
                text: text,
                model_id: 'eleven_monolingual_v1',
                voice_settings: {
                    stability: 0,
                    similarity_boost: 0,
                    style: 0.5,
                    use_speaker_boost: false
                }
            })
        };

        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }
            // Handle the response here
            const blob = await response.blob()
            console.log(blob)
            const audiourl = URL.createObjectURL(blob)
            setAudioURL(audiourl)

        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Play the audio
    const playAudio = () => {
        const audio = new Audio(audioURL);
        audio.play();
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

    return (
        <div>
            {/* <h1>audio</h1>
            <button onClick={playAudio}>Play</button> */}
        </div>
    )
} 