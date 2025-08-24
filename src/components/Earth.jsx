import React, { useEffect, useState } from "react";
import ViirsTrueColor from "./Gibs";

function Earth() {
    const [src, setSrc] = useState(null);
    const [error, setError] = useState(null);
    // commented due to server not able to retrive this api
    /*async function fetchData(retries = 3) {
        try {
            const response = await fetch(
                `https://api.nasa.gov/EPIC/api/natural?api_key=${import.meta.env.VITE_NASA_API_KEY}`
            );

            if (!response.ok) {
                // Grab any error message body if NASA returns one
                const message = await response.text();
                throw new Error(`HTTP ${response.status}: ${message}`);
            }

            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                const latest = data[data.length - 1];
                setSrc(latest);
                setError(null);
            } else {
                setError("No EPIC data available yet. Try again later.");
            }
        } catch (err) {
            console.error("Error fetching Earth data:", err.message);

            if (retries > 0) {
                // wait a bit before retry
                setTimeout(() => fetchData(retries - 1), 2000);
            } else {
                setError("NASA EPIC API is temporarily unavailable. Please try again later.");
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // 🔒 Show loading state
    if (!src && !error) {
        return (
            <p className="flex w-full h-screen justify-center items-center font-bold text-4xl">
                Loading latest Earth image...
            </p>
        );
    }

    // 🔒 Show error state
    if (error) {
        return (
            <div className="flex w-full h-screen justify-center items-center flex-col text-center p-6">
                <h1 className="text-3xl font-bold mb-4">🌍 Earth</h1>
                <p className="text-red-500 font-semibold">{error}</p>
            </div>
        );
    }

    // Render image if available
    const [year, month, day] = src.date.split(" ")[0].split("-");
    const imgurl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${src.image}.png`;
    
    // if server is working keep in the return
    <h1 className="flex w-full h-fit items-start text-xl font-bold m-4">EPIC (DSCOVR)</h1>
            <p>EPIC captures natural-color photographs of Earth from ~1.6 million km away at the Sun–Earth L1 point. Use this to view the full planet in a single frame—global weather systems, the terminator, and seasonal color changes. (Publishing can lag by a few days or more.)</p>
    <p className="text-start mb-6">
                Our home planet is constantly changing—clouds swirl, seasons shift, and land and ocean interact in ways we can see from space. Thanks to NASA’s Earth-observing missions, we can watch our planet in stunning detail almost every day. Through missions like EPIC and tools like GIBS, we can explore Earth from two perspectives: a full-disk view of the entire planet, and high-resolution daily snapshots that reveal local details. Together, they allow us to see Earth as both a global whole and a collection of interconnected regions.
            </p>

    <img src={imgurl} alt="Earth from EPIC" className="w-150 rounded-xl shadow-lg mt-12" />
            <p className="mt-2">Date: {src.date}</p>
            <p className="mt-2">{src.caption}</p>
    */

    return (
        <div className="w-full min-h-full flex justify-center items-center  flex-col p-6">
            <h1 className="text-4xl font-bold flex items-start w-full h-fit ">Earth</h1>
            <p className="text-start mb-6">
                Our home planet is constantly changing—clouds swirl across continents, seasons shift, and land and ocean interact in dynamic ways that shape life on Earth. From space, these transformations come to life through true-color imagery, which captures Earth as our eyes would see it. Thanks to NASA’s Earth-observing missions, we can watch these changes unfold almost every day in stunning natural detail.. Thanks to NASA’s Earth-observing missions, we can watch our planet in stunning detail almost every day. Through tools like GIBS, we can explore Earth with both a broad global perspective and high-resolution daily snapshots that reveal local details. Together, they allow us to see Earth as both a global whole and a collection of interconnected regions.
            </p>


            <h1 className="flex w-full h-fit items-start text-xl font-bold m-4">GIBS True Color</h1>
            <p>Rendered from VIIRS/MODIS satellite data, GIBS delivers map-ready, true-color imagery you can pan and zoom. Perfect for tracking daily features like cloud cover, smoke plumes, dust storms, algal blooms, and snowpack. (Typically updates with a ~1–2 day delay.)</p>


            <div>
                <ViirsTrueColor />
            </div>
        </div>
    );
}

export default Earth;
