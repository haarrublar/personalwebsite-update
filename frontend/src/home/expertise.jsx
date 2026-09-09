import { useEffect, useState } from "react";
import { get_expertise } from "../utils/api";

const BACKEND_URL = "http://127.0.0.1:8000";

export default function Expertise() {

    const [expertise, setExpertise] = useState([]);

    useEffect(() => {
        const getExpertise = async () => {
            try {
                const expertiseData = await get_expertise();
                setExpertise(expertiseData);
            } catch (error) {
                console.error(error);
            }
        };
        
        getExpertise();
    }, []);

    const getImageUrl = (imagePath) => {
        if (!imagePath || imagePath === "none") return null;
        if (imagePath.startsWith("http")) return imagePath;
        const formattedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
        return `${BACKEND_URL}${formattedPath}`;
    };

    return (
        <div>
            {expertise?.map((category) => (
                <div key={category.id} className="flex content-center  flex-col justify-center my-4">
                    <h3 className="mb-0 mt-3">
                        {category.expertise}
                    </h3>

                    <div className="hidden dark:block">
                        <ul className="flex flex-wrap gap-3 items-center my-1">
                            {category.subcategories
                                ?.filter((tool) => tool.tool_name !== 'Latex_light')
                                .map((tool) => {
                                    const imgUrl = getImageUrl(tool.tool_image);
                                    return imgUrl && (
                                        <li key={tool.id || tool.tool_name} className="flex items-center">
                                            <a href={tool.tool_url || "#"}>
                                                <img 
                                                    src={imgUrl} 
                                                    className="img-fluid rounded d-block mx-auto" 
                                                    alt={tool.tool_name || "..."} 
                                                    title={tool.tool_name} 
                                                    style={{ height: '50px' }} 
                                                />
                                            </a>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>

                    <div className="block dark:hidden">
                        <ul className="flex flex-wrap gap-3 items-center my-1">
                            {category.subcategories
                                ?.filter((tool) => tool.tool_name !== 'Latex_dark')
                                .map((tool) => {
                                    const imgUrl = getImageUrl(tool.tool_image);
                                    return imgUrl && (
                                        <li key={tool.id || tool.tool_name} className="flex items-center">
                                            <a href={tool.tool_url || "#"}>
                                                <img 
                                                    src={imgUrl} 
                                                    className="img-fluid rounded d-block mx-auto" 
                                                    alt={tool.tool_name || "..."} 
                                                    title={tool.tool_name} 
                                                    style={{ height: '50px' }} 
                                                />
                                            </a>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}