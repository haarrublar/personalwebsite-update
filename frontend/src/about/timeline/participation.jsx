export default function Participation({ item, index, isOpen, toggleAccordion, academy }) {
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
							{academy.map((participation) => (
								<li key={participation.id} className="mb-10 ml-6">
									<span className="flex absolute -left-3.5 justify-center items-center w-7 h-7 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
										<i className="fa-solid fa-book-open-reader fa-sm dark:text-white"></i>
									</span>

									<h4>{participation.role}</h4>

									<p style={{ lineHeight: "1.25" }}>{participation.year}</p>

									<p>{participation.event}</p>
								</li>
							))}
						</ol>
					</div>
				</div>
			</div>
		</div>
	);
}
