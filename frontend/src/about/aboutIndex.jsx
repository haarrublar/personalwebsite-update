import { useEffect, useState } from "react";
import { get_author_info } from "../utils/api";
import Expertise from "../home/expertise";
import Timeline from "./timeline/timeline";

const BACKEND_URL = "http://127.0.0.1:8000";

export default function AboutIndex() {
	const [author, setAuthor] = useState(null);

	useEffect(() => {
		const getAuthorInfo = async () => {
			try {
				const authorData = await get_author_info();
				setAuthor(authorData[0]);
			} catch (error) {
				error;
			}
		};

		getAuthorInfo();
	}, []);

	const getImageUrl = (imagePath) => {
		if (!imagePath || imagePath === "none") return null;
		if (imagePath.startsWith("http")) return imagePath;
		const formattedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
		return `${BACKEND_URL}${formattedPath}`;
	};

	return (
		<div className="mt-10 lg:w-[70%] w-[90%] mx-auto">
			<div className="py-8 border-b-2 border-b-gray-200">
				<div>
					<h1>About me!</h1>
				</div>
			</div>
			<div className="flex flex-col md:flex-row mx-auto justify-center items-center md:items-start">
				<div className="md:w-1/3 w-full py-2 md:flex md:flex-col md:items-center md:divide-y-2 md:divide-gray-200">
					<div className="w-full md:justify-start border-b-2 border-b-gray-200 md:border-b-0">
						<div className="my-6 flex items-center space-x-2">
							<img src={getImageUrl(author?.author_photo)} width={38} height={38} className="h-14 w-14 rounded-full" />
							<div className="whitespace-nowrap text-sm font-medium leading-5">
								<h3>Harrinson arrubla</h3>
								<a href="https://twitter.com/haarrublar">@ Twitter</a>
							</div>
						</div>
					</div>
				</div>
				<div className="md:w-2/3 md:px-8 divide-y-2 divide-gray-200">
					<p className="author-bio py-10" dangerouslySetInnerHTML={{ __html: author?.author_resume }} />
					<div>
						<Expertise />
					</div>
					<div className="mt-10">
						<Timeline />
					</div>
				</div>
			</div>
		</div>
	);
}
