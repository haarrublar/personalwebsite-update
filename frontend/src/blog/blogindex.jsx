import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get_post } from "../utils/api";

const BACKEND_URL = "http://127.0.0.1:8000";

export default function Blogindex() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const getPosts = async () => {
			try {
				const postData = await get_post();
				console.log(postData);
				setPosts(postData);
			} catch (error) {
				console.error(error);
			}
		};

		getPosts();
	}, []);

	const getImageUrl = (imagePath) => {
		if (!imagePath || imagePath === "none") return null;
		if (imagePath.startsWith("http")) return imagePath;
		const formattedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
		return `${BACKEND_URL}${formattedPath}`;
	};

	return (
		<div className="mt-10 lg:w-[70%] w-[90%] mx-auto">
			<div className="border-b-2 border-gray-200 dark:border-gray-100">
				<div className="space-y-2 pb-8 md:pt-6 md:space-y-5">
					<h1>Latest</h1>
				</div>
			</div>

			<div className="md:flex">
				<div className="hidden md:w-1/3 md:flex md:justify-center">
					<div className="w-full flex justify-start my-5">
						<div className="lg:m-3">
							<div className="mt-2 dark:bg-gray-800 bg-gray-50 md:p-3 lg:p-4">
								<h3>All posts</h3>

								<p>
									I have written <span className="text-blue-400">{posts.length}</span> post{posts.length !== 1 ? "s" : ""} and counting!
								</p>

								<h3 className="mt-7">Content</h3>
								<ul className="list-disc text-primary-500 pl-5 space-y-2">
									{posts.map((post) => (
										<li key={post.id}>
											<a href={`/blog/${post.slug}/`} className="list">
												{post.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className="hidden md:block" style={{ width: "2rem" }} />

				<div className="md:w-2/3 grid grid-cols-1 px-0 md:px-8 divide-y-2 divide-gray-200">
					{posts.map((post) => (
						<article key={post.id} className="py-6">
							<p className="mb-3 date">
								{new Date(post.publish).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</p>

							<h3>
								<a href={`/blog/${post.slug}/`}>{post.title}</a>
							</h3>

							<div className="uppercase">
								<small>
									{post.tags?.map((tag, index) => (
										<span key={tag}>
											<span className="text-primary-500">{tag}</span>

											{index < post.tags.length - 1 && <span className="text-gray-900 dark:text-gray-100">, </span>}
										</span>
									))}
								</small>
							</div>

							<div className="w-3/5 mx-auto my-5">
								<img src={getImageUrl(post?.image)} className="img-fluid shadow-xl" alt={post.title} />
							</div>

							{/* Summary */}
							<div className="mt-6">
								<p>{post.summary}</p>
							</div>

							<div className="w-full text-end">
								<Link to={`/blog/${post.slug}`} className="text-primary-700 font-bold hover:underline">
									Read Article
								</Link>
							</div>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}
