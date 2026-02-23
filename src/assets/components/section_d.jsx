import { useRef } from "react";
import { Maximize, SquareStack } from "lucide-react"; // Using Lucide for clean icons
import videoFile from "../components/MWTC.mp4";

function SectionD() {
  const videoRef = useRef(null);

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) { /* Safari */
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { /* IE11 */
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const handlePiP = async () => {
    try {
      if (videoRef.current !== document.pictureInPictureElement) {
        await videoRef.current.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    } catch (error) {
      console.error("PiP failed", error);
    }
  };

  return (
    <section className="relative bg-white py-24 px-6 overflow-hidden">
      {/* Decorative Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50 -z-10"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE – TEXT */}
        <div className="z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            How We Transform Business
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            We modernize operations through high-performance industrial
            electrical systems, strategic infrastructure planning, and scalable
            energy solutions built for long-term success.
          </p>

          <ul className="space-y-3 mb-8 text-gray-700 font-medium">
            <li className="flex items-center gap-2 text-blue-600">✔ <span className="text-gray-700">Increased operational efficiency</span></li>
            <li className="flex items-center gap-2 text-blue-600">✔ <span className="text-gray-700">Reliable industrial-grade systems</span></li>
            <li className="flex items-center gap-2 text-blue-600">✔ <span className="text-gray-700">Sustainable energy integration</span></li>
            <li className="flex items-center gap-2 text-blue-600">✔ <span className="text-gray-700">Long-term cost optimization</span></li>
          </ul>

          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300 shadow-lg active:scale-95">
            Discover Our Process
          </button>
        </div>

        {/* RIGHT SIDE – VIDEO WITH CONTROLS */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-blue-100 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500"></div>

          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <video
              ref={videoRef}
              className="w-full h-87.5 md:h-112.5 object-cover transition duration-500 group-hover:scale-105"
              src={videoFile}
              autoPlay
              loop
              muted
              playsInline
            >
              Your browser does not support the video tag.
            </video>

            {/* Hover Overlay Controls */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-6 gap-3">
              <button 
                onClick={handlePiP}
                className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition border border-white/30"
                title="Picture in Picture"
              >
                <SquareStack size={20} />
              </button>
              <button 
                onClick={handleFullScreen}
                className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition border border-white/30"
                title="Full Screen"
              >
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionD;