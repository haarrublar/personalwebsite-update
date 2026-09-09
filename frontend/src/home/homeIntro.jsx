import { React, useState, useEffect } from "react";
import { get_author_info } from "../utils/api";

export default function HomeIntro() {
	const [info, setInfo] = useState([]);

	useEffect(() => {
		const getAuthorInfo = async () => {
			try {
				const authorData = await get_author_info();
				setInfo(authorData[0]);
			} catch (error) {
				console.error(error);
			}
		};

		getAuthorInfo();
	}, []);

	return (
		<div>
			<h1>About me</h1>
			<div className="mt-8 mb-4">
				<p className="author-bio" dangerouslySetInnerHTML={{ __html: info?.author_intro }} />
			</div>
		</div>
	);
}
