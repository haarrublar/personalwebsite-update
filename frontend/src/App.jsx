import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeIndex from "./home/homeIndex";
import HeaderIndex from "./header/headerIndex";
import FooterIndex from "./footer/footer";
import AboutIndex from "./about/aboutIndex";
import Blogindex from "./blog/blogindex";
import BlogPage from "./blog/blogPage";

function App() {
	return (
		<Router>
			<div className="flex flex-col min-h-[calc(100vh-300px)]">
				<HeaderIndex />
				<Routes>
					<Route path="/" element={<HomeIndex />} />
					<Route path="/about/" element={<AboutIndex />} />
					<Route path="/blog/" element={<Blogindex />} />
					<Route path="/blog/:slug" element={<BlogPage />} />
				</Routes>
			</div>
			<FooterIndex />
		</Router>
	);
}

export default App;
