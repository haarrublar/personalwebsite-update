import { useState, useEffect } from "react";
import { get_publication } from "../utils/api";

const getYear = (publication) =>
    publication.year || (publication.date ? parseInt(publication.date.split("-")[0], 10) : 0);

export default function HomePublications() {
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        const loadPublications = async () => {
            const publicationData = await get_publication();
            const sortedData = [...(publicationData || [])].sort((a, b) => getYear(b) - getYear(a));
            setPublications(sortedData);
        };

        loadPublications();
    }, []);

    return (
        <div className="mt-8">
            <h3>Publications</h3>
            <div className="p-4">
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                    {publications.map((publication) => {
                        const citation = [
                            publication.title,
                            publication.participants,
                            publication.journal,
                            publication.year,
                        ]
                            .filter(Boolean)
                            .join(", ");

                        return (
                            <li key={publication.id || publication.url} className="mb-10 ml-6">
                                <span className="flex absolute -left-3.5 justify-center items-center w-7 h-7 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                    <i className="fa-solid fa-book-open fa-sm dark:text-white"></i>
                                </span>

                                {publication.role && (
                                    <div className="mb-1">
                                        <p className="text-sm">{publication.role}</p>
                                    </div>
                                )}

                                <div>
                                    {publication.url ? (
                                        <a href={publication.url} target="_blank" rel="noopener noreferrer">
                                            {citation}
                                        </a>
                                    ) : (
                                        <span>{citation}</span>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
}
