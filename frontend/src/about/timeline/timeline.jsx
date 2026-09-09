import { useState } from "react";
import WorkExp from "./workExp";
import AcademyParticipation from "./academy";

export default function Timeline() {
	const [activeTab, setActiveTab] = useState("one");

	return (
		<div className="w-full">
			<div className="flex flex-row items-stretch">
				<button type="button" onClick={() => setActiveTab("one")} className="focus:outline-none w-1/2 flex select-none">
					<h3
						className={`w-full h-full flex items-center justify-center content-center prose text-xl font-extrabold leading-6 tracking-tight text-gray-900 dark:text-black text-center py-4 px-2 transition-all duration-200 ${
							activeTab === "one"
								? "bg-white dark:bg-white/20 border-l border-t border-r border-gray-700 rounded-t-md"
								: "border-b border-gray-700 dark:text-white border-t border-l border-t-transparent border-l-transparent  hover:border-t-gray-300 hover:border-l-gray-300 hover:rounded-t-md"
						}`}
					>
						Work Experience
					</h3>
				</button>

				<button type="button" onClick={() => setActiveTab("two")} className="focus:outline-none w-1/2 flex select-none">
					<h3
						className={`w-full h-full flex items-center justify-center content-center prose text-xl font-extrabold leading-6 tracking-tight text-gray-900 dark:text-black text-center py-4 px-2 transition-colors duration-200 ${
							activeTab === "two"
								? "bg-white dark:bg-white/20 border-l border-t border-r border-gray-700 rounded-t-md"
								: "border-b border-gray-700 dark:text-white border-t border-l border-t-transparent border-l-transparent  hover:border-t-gray-300 hover:border-l-gray-300 hover:rounded-t-md"
						}`}
					>
						Academic Participations
					</h3>
				</button>
			</div>

			<div className="py-4 text-gray-900 dark:text-gray-100">
				<div className={`grid transition-[grid-template-rows,opacity,transform] duration-300 ease-in-out ${activeTab === "one" ? "grid-rows-[1fr] opacity-100 translate-y-0" : "grid-rows-[0fr] opacity-0 -translate-y-2 pointer-events-none"}`}>
					<div className="overflow-hidden">
						<div className="py-2">
							<WorkExp />
						</div>
					</div>
				</div>

				<div className={`grid transition-[grid-template-rows,opacity,transform] duration-300 ease-in-out ${activeTab === "two" ? "grid-rows-[1fr] opacity-100 translate-y-0" : "grid-rows-[0fr] opacity-0 -translate-y-2 pointer-events-none"}`}>
					<div className="overflow-hidden">
						<div className="py-2">
							<AcademyParticipation />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
