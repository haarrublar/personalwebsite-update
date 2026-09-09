export default function Project({ item, index, isOpen, toggleAccordion, projects }) {
	return (
		<div className="border-b border-gray-200 dark:border-gray-700">
			<button
				type="button"
				onClick={() => toggleAccordion(index)}
				className={`w-full flex flex-row justify-between items-center text-left px-2 select-none transition-colors duration-200 ${isOpen ? "text-blue-800 dark:text-blue-400" : "text-gray-900 dark:text-gray-100"}`}
				style={{ height: "70px" }}
			>
				<h3 className={`${isOpen ? "text-blue-800! dark:text-blue-400!" : ""}`}>{item.title}</h3>
				<i className={`fa-solid text-xl ${isOpen ? "text-blue-800 dark:text-blue-400 fa-chevron-up" : "text-gray-900 dark:text-gray-100 fa-chevron-down"} transition-transform duration-300`}></i>
			</button>

			<div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
				<div className="overflow-hidden">
					<div className="p-4">
						<ol className="relative border-l border-gray-200 dark:border-gray-700">
							{projects.map((project) => (
								<li key={project.id} className="mb-10 ml-6">
									<span className="flex absolute -left-3.5 justify-center items-center w-7 h-7 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
										<i className="fa-solid fa-thumbtack fa-sm dark:text-white"></i>
									</span>

									<h4>{project.project_name || project.name || project.title}</h4>

									<p style={{ lineHeight: "1.25" }}>
                                        {project.year || (project.start_date && project.start_date.split("-")[0])}
									</p>

									{project.skills && (
										<p className="block mt-4 mb-2 text-sm" style={{ lineHeight: "1.25" }}>
											<span className="font-semibold text-gray-900 dark:text-white"> Skills:</span>{" "}
											<span className="text-gray-900 dark:text-white" style={{ fontStyle: "italic" }}>
												{project.skills}
											</span>
										</p>
									)}
								</li>
							))}
						</ol>
					</div>
				</div>
			</div>
		</div>
	);
}
