export default function RightSidebarModelInspector({ img, img_alt, banner, banner_alt, name, tagline, description, date, tags }: { img: string, img_alt: string, banner: string, banner_alt: string, name: string, tagline: string, description: string, date: string, tags: string[] }) {

    let tagsArray = tags.map((tag, index) => {
        return (
            <div key={index} className="bg-p-6 rounded-full px-2 ">
                <p className="text-sm">{tag}</p>
            </div>
        )
    })

    return (
        <div className="w-[600px] bg-gray-700 text-white ">
            <img src={banner} alt={banner_alt} className="w-full h-40 object-cover" />

            <div className=" relative flex flex-col">
                <img src={img} alt={img_alt} className="absolute object-cover w-20 h-20 rounded-full top-0 left-0 -translate-y-1/2 translate-x-2" />
                <div className="w-full">
                    <h3 className="mt-8 mx-auto w-fit">{name}</h3>
                    <p className=" mx-auto w-fit text-p-6">{tagline}</p>
                </div>
                <div className="mt-4 p-6 bg-gray-800 rounded-xl mx-2 flex flex-col space-y-4">
                    <div>
                        <b className="text-sm font-heading">About</b>
                        <p className="text-sm">{description}</p>
                    </div>
                    <div>
                        <b className="text-sm font-heading">VocalVerse Member Since</b>
                        <p className="text-sm">{date}</p>
                    </div>
                    <div>
                        <b className="text-sm font-heading">
                            Tags
                        </b>
                        <div className="flex flex-row space-x-2 text-p-2 font-bold mt-2">
                            {tagsArray}
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}