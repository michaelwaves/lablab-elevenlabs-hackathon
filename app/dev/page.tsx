import CardComponent from "./CardComponent"


export default function Page() {
    return (
        <div id="bg" className="w-full flex-col h-screen flex items-center justify-center">
            <CardComponent text="This is a card" />
            <div>

            </div>
            <div className="font-heading relative w-fit h-fit mb-4 ">
                <button className="hover:translate-y-2 transition-all duration-75 bg-p-5 rounded-xl p-4 active:bg-p-6 active:translate-y-4">I AM A BUTTON</button>
                <div className="bg-p-2 absolute top-0 left-0 rounded-xl mt-2 w-full h-full -z-10 translate-y-2" />
            </div>
            <div className="font-heading relative w-fit h-fit overflow-hidden pb-2 rounded-xl">
                <button className="hover:translate-y-2 transition-all duration-75 bg-p-6 rounded-xl p-4 active:bg-p-5 active:translate-y-4">I AM A BUTTON</button>
                <div className="bg-p-2 absolute top-0 left-0 rounded-xl mt-2 w-full h-full -z-10 " />
            </div>



            <div></div>
        </div>
    )
}