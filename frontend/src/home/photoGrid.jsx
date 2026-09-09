import { useState, useEffect } from "react";
import { get_author_info } from "../utils/api";

const BACKEND_URL = "http://127.0.0.1:8000";

export default function PhotoGrid() {
	const [photos, setPhotos] = useState([]);
	const [items, setItems] = useState([
		{ id: 1, content: "Card 01" },
		{ id: 2, content: "Card 02" },
		{ id: 3, content: "Card 03" },
		{ id: 4, content: "Card 04" },
		{ id: 5, content: "Card 05" },
	]);

	const handleNext = () => {
		setItems((prevItems) => {
			const newArray = [...prevItems];
			newArray.push(newArray.shift());
			return newArray;
		});
	};

	const handlePrev = () => {
		setItems((prevItems) => {
			const newArray = [...prevItems];
			newArray.unshift(newArray.pop());
			return newArray;
		});
	};

	useEffect(() => {
		const getPhotos = async () => {
			try {
				const photosData = await get_author_info();
				const authorInfo = photosData[0];
				setPhotos(authorInfo);

				if (authorInfo?.photos?.length > 0) {
					setItems(authorInfo.photos);
				}
			} catch (error) {
				console.error(error);
			}
		};

		getPhotos();
	}, []);

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
										key={photoItem.id}
										className={`flex justify-center items-center overflow-hidden h-70 
                    ${index > 0 ? "hidden md:block" : "block"}`}
									>
										<img src={imgUrl} alt="Author photo" className="object-contain w-full h-full" />
									</div>
								);
							})}
						</div>
					</div>
					<div className="flex flex-row mt-3 justify-between content-center w-full">
						<button onClick={handlePrev} className="shrink-0 flex justify-center items-center w-10 h-10 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
							<i className="fa-solid text-xl md:text-3xl fa-chevron-left dark:text-white"></i>
						</button>

						<button onClick={handleNext} className="shrink-0 flex justify-center items-center w-10 h-10 rounded-full  hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
							<i className="fa-solid text-xl md:text-3xl fa-chevron-right dark:text-white"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
