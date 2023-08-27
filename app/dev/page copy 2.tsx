export default function Page() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="p-1 rounded-xl relative overflow-hidden group">
                <div className="w-80 h-60 border-[1px] border-gray-300 rounded-xl shadow-lg bg-white items-center justify-center flex">
                    <h2>This is a card</h2>

                </div>
                <div id="gradient" className="absolute w-[500px] h-[500px] bg-gradient-to-r from-p-6 to-a2-6 -z-10 -top-1/4 -left-1/4 group-hover:animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-100 "></div>
            </div>
        </div >)
}