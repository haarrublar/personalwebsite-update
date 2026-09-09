import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HeaderIndex() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef(null);

	const toggleDarkMode = () => {
		document.documentElement.classList.toggle("dark");
	};

	return (
		<header className="inset-x-0 top-0 z-50 w-full mb-10">
			<div className="flex content-center justify-center items-center">
				<div className="md:w-[90%] w-full" ref={menuRef} style={{ position: "relative" }}>
					<nav className="flex content-center items-center pt-8 justify-between">
						<div className="flex items-center">
							<Link to="/" className="prose hidden md:block text-gray-900 dark:text-gray-100 font-bold text-3xl">
								<span className="text">Navbar</span>
								<span className="cursor">_</span>
								<span>🐑🐐🐑</span>
							</Link>
							<Link to="/" className="prose block md:hidden ml-5 text-gray-900 dark:text-gray-100 font-bold text-3xl">
								🐑🐐🐑
							</Link>
						</div>

						<div className="lg1:block prose">
							<div className="flex justify-end items-end">
								<div className="flex justify-center items-center space-x-4">
									<button
										type="button"
										id="dark-mode-toggle"
										onClick={toggleDarkMode}
										className="border border-gray-700 rounded-md px-4 py-1 text-gray-900 hover:bg-black hover:text-white dark:border-gray-300 dark:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
									>
										<i className="fa-solid fa-ghost fa-2x"></i>
									</button>

									<div className="flex lg1:hidden items-center justify-end w-full">
										<button
											type="button"
											onClick={() => setIsMenuOpen((prev) => !prev)}
											className="inline-flex items-end content-end justify-end rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white py-2"
										>
											<span className="sr-only">Toggle main menu</span>
											<svg className={`${isMenuOpen ? "hidden" : "block"} h-8 w-8`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
											</svg>
											<svg className={`${isMenuOpen ? "block" : "hidden"} h-8 w-8`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</div>

									<div className="hidden lg1:block" style={{ whiteSpace: "nowrap" }}>
										<Link to="/" className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-xl font-medium">
											Home
										</Link>
										<Link to="/about/" className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-xl font-medium">
											About
										</Link>
										<Link to="/blog/" className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-xl font-medium">
											Blog
										</Link>
									</div>
								</div>
							</div>
						</div>
					</nav>

					{/* Conditional Dropdown */}
					{isMenuOpen && (
						<div
							className="lg1:hidden bg-linear-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-b-2xl mt-4"
							style={{
								marginLeft: "3%",
								marginRight: "3%",
								width: "94%",
							}}
						>
							<div className="px-4 pt-2 pb-3 space-y-1 prose">
								<Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-900 dark:text-white block px-3 py-2 rounded-md text-xl font-medium">
									Home
								</Link>
								<Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-gray-900 dark:text-white block px-3 py-2 rounded-md text-xl font-medium">
									About
								</Link>
								<Link to="/blog" onClick={() => setIsMenuOpen(false)} className="text-gray-900 dark:text-white block px-3 py-2 rounded-md text-xl font-medium">
									Blog
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
