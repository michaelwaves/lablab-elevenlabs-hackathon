export default function Page() {
    return (
        <div className="w-full">
            <h3>Pick a model to get started</h3>
            <div className="relative overflow-y-scroll">
                <input type="text" placeholder="Search" className="fixed bottom-5 w-[400px] border-2 p-2 rounded-xl" />
            </div>
        </div>
    )
}