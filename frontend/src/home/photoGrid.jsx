import { useState, useEffect, useCallback } from "react";
import { get_author_info } from "../utils/api";

const BACKEND_URL = "http://127.0.0.1:8000";

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export default function PhotoGrid() {
    const [photos, setPhotos] = useState([]);
    const [items, setItems] = useState([
        { id: 1, content: "Card 01" },
        { id: 2, content: "Card 02" },
        { id: 3, content: "Card 03" },
        { id: 4, content: "Card 04" },
        { id: 5, content: "Card 05" },
    ]);
    const [isFading, setIsFading] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const moveRight = useCallback(() => {
        if (isFading) return;
        setIsFading(true);

        setTimeout(() => {
            setItems((prevItems) => {
                if (prevItems.length === 0) return prevItems;
                const newArray = [...prevItems];
                const lastItem = newArray.pop();
                newArray.unshift(lastItem);
                return newArray;
            });
            setIsFading(false);
        }, 300);
    }, [isFading]);

    const moveLeft = useCallback(() => {
        if (isFading) return;
        setIsFading(true);

        setTimeout(() => {
            setItems((prevItems) => {
                if (prevItems.length === 0) return prevItems;
                const newArray = [...prevItems];
                const firstItem = newArray.shift();
                newArray.push(firstItem);
                return newArray;
            });
            setIsFading(false);
        }, 300);
    }, [isFading]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setSelectedPhoto(null);
            }
        };

        if (selectedPhoto) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedPhoto]);

    useEffect(() => {
        const getPhotos = async () => {
            try {
                const photosData = await get_author_info();
                const authorInfo = photosData[0];
                setPhotos(authorInfo);

                if (authorInfo?.photos?.length > 0) {
                    setItems(shuffleArray(authorInfo.photos));
                }
            } catch (error) {
                console.error("Error fetching author photos:", error);
            }
        };

        getPhotos();
    }, []);

    useEffect(() => {
        if (selectedPhoto) return;

        const interval = setInterval(() => {
            moveLeft();
        }, 5000);

        return () => clearInterval(interval);
    }, [moveLeft, selectedPhoto]);

    const getImageUrl = (imagePath) => {
        if (!imagePath || imagePath === "none") return null;
        if (imagePath.startsWith("http")) return imagePath;
        const formattedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
        return `${BACKEND_URL}${formattedPath}`;
    };

    return (
        <div className="flex flex-col">
            <div className="my-5">
                <h2>Memoirs</h2>
            </div>
            <div className="flex items-center gap-4 w-full">
                <div className="flex flex-col w-full">
                    <div className="flex-1 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {items.slice(0, 2).map((photoItem, index) => {
                                const imgUrl = getImageUrl(photoItem.photo);
                                return (
                                    <div
                                        key={photoItem.id || index}
                                        onClick={() => setSelectedPhoto(photoItem)}
                                        className={`flex justify-center items-center overflow-hidden h-70 transition-all duration-300 ease-in-out transform cursor-pointer ${
                                            isFading
                                                ? "opacity-0 scale-95"
                                                : "opacity-100 scale-100"
                                        } ${index > 0 ? "hidden md:block" : "block"}`}
                                    >
                                        <img
                                            src={imgUrl}
                                            alt="Author photo"
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex flex-row mt-3 justify-between content-center w-full">
                        <button
                            onClick={moveLeft}
                            className="shrink-0 flex justify-center items-center w-10 h-10 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                        >
                            <i className="fa-solid text-xl md:text-3xl fa-chevron-left dark:text-white"></i>
                        </button>

                        <button
                            onClick={moveRight}
                            className="shrink-0 flex justify-center items-center w-10 h-10 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                        >
                            <i className="fa-solid text-xl md:text-3xl fa-chevron-right dark:text-white"></i>
                        </button>
                    </div>
                </div>
            </div>

            {selectedPhoto && (
                <div className="fixed inset-0 z-50 flex items-center justify-between p-4 md:p-8 bg-black/80">
                    <button
                        onClick={() => setSelectedPhoto(null)}
                        className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300 transition-colors"
                        aria-label="Close full screen view"
                    >
                        <i className="fa-solid fa-xmark text-3xl"></i>
                    </button>

                    <button
                        onClick={moveLeft}
                        className="z-10 shrink-0 p-3 text-white hover:text-gray-300 transition-colors"
                        aria-label="Previous image"
                    >
                        <i className="fa-solid fa-chevron-left text-3xl md:text-5xl"></i>
                    </button>

                    <div className="flex-1 flex justify-center items-center h-full px-4 overflow-hidden">
                        <img
                            src={getImageUrl(items[0]?.photo || selectedPhoto.photo)}
                            alt="Author photo full view"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>

                    <button
                        onClick={moveRight}
                        className="z-10 shrink-0 p-3 text-white hover:text-gray-300 transition-colors"
                        aria-label="Next image"
                    >
                        <i className="fa-solid fa-chevron-right text-3xl md:text-5xl"></i>
                    </button>
                </div>
            )}
        </div>
    );
}