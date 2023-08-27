export default function Page() {
    return (
        <div className="w-full h-screen bg-white flex flex-col items-center justify-center">
            <div className=" z-10 relative p-1 rounded-xl flex items-center justify-center overflow-hidden">

                <div className="border-[1px] border-gray-300 shadow-lg bg-white rounded-xl w-80 h-60 group flex flex-col items-center justify-center font-heading">

                    Hello Im a card

                    <div
                        className="bg-gradient-to-r from-p-5 to-a1-5 opacity-50 hidden object-fill w-[500px] h-[500px] absolute rounded-full blur-md -z-10 group-hover:animate-spin group-hover:block"
                    />
                </div>

            </div>
        </div>
    )
}