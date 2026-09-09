import PresentationCard from './card';
import Expertise from './expertise';
import HomeIntro from "./homeIntro";
import Timeline from '../about/timeline/timeline';
import PhotoGrid from './photoGrid';

export default function HomeIndex() {
    return (
        <>
            <div className="flex flex-col md:gap-3 md:flex-row mx-auto justify-center items-center md:items-start lg:w-[70%] w-[90%]">
                
                <div className="md:w-[70%] lg:w-[30%] pb-6 flex justify-center">
                    <PresentationCard />
                </div>

                <div className="hidden md:block" style={{ width: "2rem" }}></div>

                <div className="md:w-[80%] lg:w-[60%] px-0 lg:px-8 divide-y-2 divide-gray-200">
                    <div>
                        <HomeIntro />
                    </div>
                    <div>
                        <PhotoGrid />
                    </div>
                    {/* <div>
                        <Expertise />
                    </div>
                    <div className="mt-10">
                        <Timeline />
                    </div> */}
                </div>
            </div>
        </>
    );
}