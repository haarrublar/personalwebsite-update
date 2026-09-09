import { useState, useEffect } from "react";
import { get_academic_participation, get_project, get_publication } from "../../utils/api";
import Participation from "./participation";
import Project from "./project";
import Publication from "./publication";

export default function AuthorAcademicPar() {
    const [openIndex, setOpenIndex] = useState(null);
    const [academy, setAcademy] = useState([]);
    const [project, setProject] = useState([]);
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        const getAcademy = async () => {
            try {
                const academyData = await get_academic_participation();
                const sortedData = (academyData || []).sort((a, b) => b.year - a.year);
                setAcademy(sortedData);
            } catch (error) {
                console.error("Error fetching academic participation:", error);
            }
        };

        getAcademy();
    }, []);

    useEffect(() => {
        const getProject = async () => {
            try {
                const projectData = await get_project();
                const sortedData = (projectData || []).sort((a, b) => {
                    const yearA = a.year || (a.start_date ? parseInt(a.start_date.split("-")[0], 10) : 0);
                    const yearB = b.year || (b.start_date ? parseInt(b.start_date.split("-")[0], 10) : 0);
                    return yearB - yearA;
                });
                setProject(sortedData);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        getProject();
    }, []);

    useEffect(() => {
        const getPublications = async () => {
            try {
                const publicationData = await get_publication();
                const sortedData = (publicationData || []).sort((a, b) => {
                    const yearA = a.year || (a.date ? parseInt(a.date.split("-")[0], 10) : 0);
                    const yearB = b.year || (b.date ? parseInt(b.date.split("-")[0], 10) : 0);
                    return yearB - yearA;
                });
                setPublications(sortedData);
            } catch (error) {
                console.error("Error fetching publications:", error);
            }
        };

        getPublications();
    }, []);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const items = [
        { id: 1, title: "Academic Participations", type: "academy" },
        { id: 2, title: "Projects", type: "project" },
        { id: 3, title: "Publications", type: "publication" },
    ];

    return (
        <div className="flex flex-col">
            {items.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                    <div key={item.id} className="border-b border-gray-700">
                        {item.type === "academy" && (
                            <Participation
                                item={item}
                                index={index}
                                isOpen={isOpen}
                                toggleAccordion={toggleAccordion}
                                academy={academy}
                            />
                        )}

                        {item.type === "project" && (
                            <Project
                                item={item}
                                index={index}
                                isOpen={isOpen}
                                toggleAccordion={toggleAccordion}
                                projects={project}
                            />
                        )}

                        {item.type === "publication" && (
                            <Publication
                                item={item}
                                index={index}
                                isOpen={isOpen}
                                toggleAccordion={toggleAccordion}
                                publications={publications}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}