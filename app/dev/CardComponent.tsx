interface CardComponentProps {
    text: string;
    className?: string;
    children?: React.ReactNode;
}


export default function CardComponent({ text, className, children }: CardComponentProps) {
    return (
        <div id="mask" className={`p-[8px] rounded-xl relative overflow-hidden group`}>
            <div id="card"
                className={` ${className} w-80 h-60 rounded-xl 
                bg-white shadow-lg 
                 border-[1px] border-gray-300 
                 flex items-center justify-center`}>
                <h1>{text}</h1>
                {children}
            </div>
            <div id="gradient"
                className={`w-[500px] h-[500px] 
                bg-gradient-to-r from-p-6 to-a2-6 
                absolute -top-1/2 -left-1/4 -z-10 
                group-hover:animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-100`}></div>
        </div>
    )
}