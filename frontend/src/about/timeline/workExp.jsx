import { useState, useEffect } from "react";
import { get_work_experience } from "../../utils/api";

export default function WorkExp() {
	const [work, setWork] = useState([]);

	useEffect(() => {
		const getAuthorInfo = async () => {
			try {
				const workData = await get_work_experience();

				const sortedData = (workData || []).sort((a, b) => {
					if (a.is_current && !b.is_current) return -1;
					if (!a.is_current && b.is_current) return 1;
					return new Date(b.start_date) - new Date(a.start_date);
				});

				setWork(sortedData);
			} catch (error) {
				console.error(error);
			}
		};

		getAuthorInfo();
	}, []);

	const formatDate = (dateString) => {
		if (!dateString) return "";

		const parts = dateString.split("-");
		if (parts.length < 2) return dateString;

		const year = parseInt(parts[0], 10);
		const month = parseInt(parts[1], 10) - 1;

		const date = new Date(Date.UTC(year, month, 1));
		return new Intl.DateTimeFormat("en-US", {
			month: "long",
			year: "numeric",
			timeZone: "UTC",
		}).format(date);
	};

	return (
		<div className="opacity-100 px-3">
			<div style={{ height: "2em" }}></div>
			<ol className="relative border-l border-gray-200 dark:border-gray-700">
				{work.map((item) => {
					const descriptionList = item.job_description ? item.job_description.split("\n").filter(Boolean) : [];

					const startFormatted = formatDate(item.start_date);
					const endFormatted = formatDate(item.end_date);

					return (
						<li key={item.id} className="mb-10 ml-6">
							<span className="flex absolute -left-3.5 justify-center items-center w-7 h-7 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
								<i className="fa-solid fa-bookmark fa-sm"></i>
							</span>

							<h4>
								{item.position}
								{item.is_current && <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">Currently</span>}
							</h4>

							<p className="my-1" style={{ lineHeight: "1.25" }}>
								{item.company}
							</p>

							<p className="mb-4" style={{ lineHeight: "1.25" }}>
								{startFormatted}
								{item.is_current ? " - Present" : endFormatted ? ` - ${endFormatted}` : ""}
							</p>

							{descriptionList.length > 0 && (
								<ul className="list-disc text-primary-500 pl-5 space-y-2">
									{descriptionList.map((desc, idx) => (
										<li key={idx}>
											<p>{desc}</p>
										</li>
									))}
								</ul>
							)}
						</li>
					);
				})}
			</ol>
		</div>
	);
}
