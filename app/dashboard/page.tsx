"use client"
import { Pikachu } from "@/public/Pikachu"
import { OrbitControls, Stars, Cloud } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

export default function Page() {
    return (
        <div className="w-full">

            <h3 className="bg-gray-700 text-white mx-auto">Welcome to the Vocalverse. Pick a model to get started</h3>

            <div className="w-full h-screen bg-galaxy">
                <Canvas>
                    <OrbitControls />
                    <ambientLight intensity={3} />
                    <pointLight position={[0, -3, 1]} color={[1, 1, 10]} intensity={1.5} />
                    <pointLight position={[0, -2, 1]} color={[1, 1, 10]} intensity={1.5} />
                    <Pikachu />
                    <Stars />
                    <Cloud />

                </Canvas>
            </div>
        </div>
    )
}