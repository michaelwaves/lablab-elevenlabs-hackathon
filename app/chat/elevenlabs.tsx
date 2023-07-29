import { useEffect, useState } from "react";
import { voiceIds } from "./voiceIds"

export default function AudioPlayer({ text }: { text: string }) {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
    const [audioUrl, setAudioUrl] = useState('' as string | undefined)
    const [voiceId, setVoiceId] = useState(voiceIds[0].id)
    const [voiceName, setVoiceName] = useState(voiceIds[0].name)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isVoiceMenuOpen, setIsVoiceMenuOpen] = useState(false)

    const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedVoiceId = e.target.value
        const selectedVoiceName = voiceIds.find(voice => voice.id === selectedVoiceId)?.name
        setVoiceId(selectedVoiceId)
        setVoiceName(selectedVoiceName || '')
    }
    let url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?optimize_streaming_latency=0`
    const handlePlay = () => {
        if (audio) {
            audio.play()
            setIsPlaying(true)
        }
    }

    const handlePause = () => {
        if (audio) {
            audio.pause()
            setIsPlaying(false)
        }
    }

    const handleStop = () => {
        if (audio) {
            audio.pause()
            audio.currentTime = 0
            setIsPlaying(false)
        }
    }

    const handleVoiceMenuToggle = () => {
        setIsVoiceMenuOpen(!isVoiceMenuOpen)
    }

    const handleAudioLoaded = () => {
        setIsLoaded(true)
    }

    const handleAudioError = () => {
        setIsError(true)
    }

    const handleAudioEnded = () => {
        setIsPlaying(false)
    }

    const handleAudioRef = (audio: HTMLAudioElement | null) => {
        setAudio(audio)
    }

    async function postData() {
        const url = 'https://api.elevenlabs.io/v1/text-to-speech/1L397VD01OlEpqZEK2aP?optimize_streaming_latency=0';
        const apiKey = '977fd85bffb4c70a08e4651d1ba44c05';

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
            const audiourl = URL.createObjectURL(blob)
            setAudioUrl(audiourl)
            /* audio.addEventListener("loadeddata", handleAudioLoaded)
            audio.addEventListener("error", handleAudioError)
            audio.addEventListener("ended", handleAudioEnded)
            handleAudioRef(audio) */
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const playAudio = () => {
        const audio = new Audio(audioUrl);
        audio.play();
    };

    useEffect(() => {
        postData()
    }, [text, voiceId])

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={playAudio}
                    disabled={!isLoaded || isPlaying}
                >
                    Play
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handlePause}
                    disabled={!isLoaded || !isPlaying}
                >
                    Pause
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleStop}
                    disabled={!isLoaded || !isPlaying}
                >
                    Stop
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleVoiceMenuToggle}
                >
                    {voiceName}
                </button>
                {isVoiceMenuOpen && (
                    <select
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onChange={handleVoiceChange}
                    >
                        {voiceIds.map(voice => (
                            <option key={voice.id} value={voice.id}>{voice.name}</option>
                        ))}
                    </select>
                )}
            </div>
            <div className="flex items-center">
                <audio ref={handleAudioRef} />
            </div>
        </div>
    )

}