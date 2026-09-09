import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { get_post } from "../utils/api";
import markdownComponents from "./markdownComponents";

const BACKEND_URL = "http://127.0.0.1:8000";


export default function BlogPage() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    const getImageUrl = (imagePath) => {
        if (!imagePath || imagePath === "none") return "";
        if (imagePath.startsWith("http")) return imagePath;
        const formattedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
        return `${BACKEND_URL}${formattedPath}`;
    };

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const postsData = await get_post();
                const matchedPost = postsData.find((p) => p.slug === slug) || postsData[0];
                setPost(matchedPost);
            } catch (error) {
                console.error("Error loading blog post:", error);
            }
        };

        fetchPostData();
    }, [slug]);

    if (!post) {
        return <div className="mt-10 text-center">Loading article...</div>;
    }

    const author = post.author_details;

    return (
        <div className="mt-10 lg:w-[70%] w-[90%] mx-auto">
            {/* Header / Title */}
            <div className="py-8 border-b-2 border-b-gray-200 text-center w-full">
                {post.publish && (
                    <p className="text-sm text-gray-500 mt-2 text-center">
                        Published on{" "}
                        {new Date(post.publish).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </p>
                )}
                <h1 className="capitalize text-center">
                    {post.slug ? post.slug.replace(/-/g, " ") : "Blog Post"}
                </h1>
            </div>

            {/* Layout Container */}
            <div className="flex flex-col md:flex-row mx-auto justify-center items-center md:items-start mt-6">
                
                {/* Author Sidebar */}
                <div className="md:w-1/3 w-full py-2 md:flex md:flex-col md:items-center md:divide-y-2 md:divide-gray-200">
                    <div className="w-full md:justify-start border-b-2 border-b-gray-200 md:border-b-0">
                        <div className="my-6 flex items-center space-x-3">
                            {author?.author_photo && (
                                <img
                                    src={getImageUrl(author.author_photo)}
                                    alt={author.author_name}
                                    className="h-14 w-14 rounded-full object-cover"
                                />
                            )}
                            <div className="whitespace-nowrap text-sm font-medium leading-5">
                                <h3>{author?.author_name || "Harrinson Arrubla"}</h3>
                                {author?.author_git_user && (
                                    <a
                                        href={`https://github.com/${author.author_git_user}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-700 hover:underline"
                                    >
                                        @{author.author_git_user}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Article Content */}
                <div className="md:w-2/3 md:px-8">
                    {post.image && (
                        <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                            <img
                                src={getImageUrl(post.image)}
                                alt={post.slug}
                                className="w-full h-auto max-h-96 object-cover"
                            />
                        </div>
                    )}

                    {/* Markdown Renderer with Custom CSS Mapping */}
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]} 
                        components={markdownComponents}
                    >
                        {post.body}
                    </ReactMarkdown>
                </div>

            </div>
        </div>
    );
}