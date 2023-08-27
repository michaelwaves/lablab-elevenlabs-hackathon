export default function Page() {
    return (
        <div className="w-full h-screen bg-gray-700 flex flex-col items-center justify-center">
            <div className=" z-10 w-80 h-64 relative p-2 rounded-lg flex items-center justify-center overflow-hidden">

                <div className=" bg-white rounded-xl w-80 h-60 group flex flex-col items-center justify-center font-heading">

                    Hello I'm a card

                    <img src="/Ellipse 3.png" alt=""
                        className="hidden object-fill w-[500px] h-[500px] absolute left-0 blur-md z-10 group-hover:animate-spin group-hover:block"
                    />
                </div>

            </div>
        </div>
    )
}