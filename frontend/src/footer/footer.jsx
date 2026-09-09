import React from "react";

export default function FooterIndex() {
    return (
        <footer className="w-full mt-auto py-8">
            <div className="flex flex-col items-center justify-center mx-auto text-center mt-10">
                <div className="mb-3 flex space-x-4">
                    <a href="https://twitter.com/haarrublar" target="_blank" rel="noopener noreferrer">
                        <i className="text-gray-900 hover:bg-black hover:text-white dark:border-gray-300 dark:text-white transition-colors fab fa-twitter fa-2x"></i>
                    </a>
                    <a href="https://github.com/haarrublar" target="_blank" rel="noopener noreferrer">
                        <i className="text-gray-900 hover:bg-black hover:text-white dark:border-gray-300 dark:text-white transition-colors fab fa-github fa-2x"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/harrinsonarrubla" target="_blank" rel="noopener noreferrer">
                        <i className="text-gray-900 hover:bg-black hover:text-white dark:border-gray-300 dark:text-white transition-colors fab fa-linkedin fa-swap-opacity fa-2x"></i>
                    </a>
                </div>
                
                <div className="mb-2 flex justify-between space-x-2 text-xl cursor-default">
                    <p>Harrinson Arrubla</p>
                    <span className="text-gray-700 dark:text-gray-200">•</span>
                    <p>© 2024</p>
                </div>
                
                <div className="mb-2 flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400 prose">
                    <span>Django • Tailwind • React • SQL</span>
                </div>
                
                <div>
                    <p href="https://github.com/haarrublar/personalWebsite" target="_blank" rel="noopener noreferrer">
                        Personal website
                    </p>
                </div>
            </div>
        </footer>
    );
}