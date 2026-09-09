import { useEffect, useState } from "react";
import { get_author_info, get_study } from "../utils/api";

const BACKEND_URL = "http://127.0.0.1:8000";

export default function PresentationCard() {
	const [author, setAuthor] = useState(null);
	const [studies, setStudy] = useState(null);

	useEffect(() => {
		const getAuthorInfo = async () => {
			try {
				const authorData = await get_author_info();
				const studiesData = await get_study();

				const sortedStudies = [...studiesData].sort((a, b) => {
					if (a.is_current && !b.is_current) return -1;
					if (!a.is_current && b.is_current) return 1;

					const dateA = a.graduation_date ? new Date(a.graduation_date) : new Date(0);
					const dateB = b.graduation_date ? new Date(b.graduation_date) : new Date(0);
					return dateB - dateA;
				});

				setAuthor(authorData[0]);
				setStudy(sortedStudies);
			} catch (error) {
				console.error(error);
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
		<div className="md:fixed md:w-[40%] lg:w-100 flex flex-col justify-center items-center">
			<div className="md:block md:px-0 px-3 pb-3 flex justify-center items-center gap-0">
				<div className="flex justify-center items-center mx-auto">
					<img src={getImageUrl(author?.author_photo)} className="shadow-xl md:h-60 md:w-60 h-40 w-40 aspect-square rounded-full object-cover" alt="..." />
				</div>
			</div>

			<div className="flex flex-col w-full">
				<div className="mb-2 mt-4 text-center">
					<h2>{author?.author_name}</h2>
					<p className="mb-1 text-center!">{author?.author_role}</p>
				</div>

				<div>
					<div className="my-2 flex items-center gap-3">
						<div className="w-7 flex justify-center items-center shrink-0 dark:text-white">
							<i className="fa-regular fa-envelope fa-lg"></i>
						</div>
						<a href="mailto:harrubla.96@gmail.com">{author?.author_email}</a>
					</div>
					<div className="my-2 flex items-center gap-3">
						<div className="w-7 flex justify-center items-center shrink-0 dark:text-white">
							<i className="fas fa-map-marker-alt fa-lg"></i>
						</div>
						<a>{author?.author_country}</a>
					</div>
					<div className="my-2 flex items-center gap-3">
						<div className="w-7 flex justify-center items-center shrink-0 dark:text-white">
							<i className="fab fa-github fa-lg"></i>
						</div>
						<a href="https://github.com/haarrublar">{author?.author_git_user}</a>
					</div>
				</div>

				<div className="opacity-100 mt-6">
					<ol className="relative border-l border-blue-300 dark:border-white">
						{studies?.map((degree) => (
							<li key={degree.id} className="mb-4 ml-6">
								<span className="flex absolute -left-3.5 justify-center items-center w-7 h-7 bg-blue-300 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900 dark:text-white text-blue-900">
									<i className="fa-solid fa-trophy fa-sm"></i>
								</span>

								<h4>
									{degree.degree_type_display} in {degree.field_of_study}
								</h4>
								<div>{degree.is_current && <span className="bg-blue-100 text-blue-800 text-sm font-medium py-0.5 px-2 rounded dark:bg-blue-200 dark:text-blue-800">CURRENTLY</span>}</div>

								<p className="my-2 text-sm" style={{ lineHeight: 1.25 }}>
									{degree.university}, {degree.is_current ? "Present" : degree.graduation_date?.split("-")[0]}
								</p>
							</li>
						))}
					</ol>
				</div>
			</div>
		</div>
	);
}
