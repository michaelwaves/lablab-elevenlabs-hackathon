import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ audioPath, setVolume, audioElement }: { audioPath: string | undefined, setVolume: Function, audioElement: HTMLAudioElement | undefined }) => {
    const audioRef = useRef(null);
    const analyserRef = useRef(null);

    useEffect(() => {
        const audioContext = new (window.AudioContext || window.AudioContext)();
        audioContext.resume();
        if (!audioElement) return;
        const audioSource = audioContext.createMediaElementSource(audioElement);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        audioSource.connect(analyser);
        audioSource.connect(audioContext.destination);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const getAudioLevel = () => {
            analyser.getByteFrequencyData(dataArray);
            const sum = dataArray.reduce((acc, value) => acc + value);
            const average = sum / bufferLength;
            console.log('Audio Level:', average);
            setVolume(average);
        };

        let animationFrameId = requestAnimationFrame(function update() {
            getAudioLevel();
            animationFrameId = requestAnimationFrame(update);
        });

        return () => {
            cancelAnimationFrame(animationFrameId);
            audioContext.close();
        };
    }, [audioElement]);

    return (
        <div>
            <audio ref={audioRef} controls src={audioElement?.src} />
        </div>
    );
};

export default AudioPlayer;