import { useEffect, useState } from "react";

export default function AsteroidFeed() {
    const [date, setDate] = useState("");
    const [asteroids, setAsteroids] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!date) return;

        async function fetchAsteroids() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(
                    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${import.meta.env.VITE_NASA_API_KEY
                    }`
                );
                if (!res.ok) throw new Error("Failed to fetch asteroid data");
                const data = await res.json();
                setAsteroids(data.near_earth_objects[date] || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchAsteroids();
    }, [date]);

    // handle row click
    const handleRowClick = (id) => {
        const url = `https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=${id}&view=VOP`
        window.open(url, "_blank"); // open JPL page in new tab
    };

    return (
        <div className="p-6 w-full h-full flex items-start flex-col">
            <div className="flex flex-row">
                <div>
                <h1 className="text-3xl font-bold mb-4">Asteroids</h1>
                <p className="w-250">Asteroids are small, rocky bodies that orbit the Sun, primarily found in the asteroid belt between Mars and Jupiter, and are considered remnants from the early formation of the solar system over 4.5 billion years ago. They vary greatly in size, ranging from tiny boulders to massive objects hundreds of kilometers across, and are composed mainly of rock, metal, and sometimes clay or organic compounds. Some asteroids, known as Near-Earth Asteroids (NEAs), have orbits that bring them close to Earth, and a subset of these are classified as potentially hazardous if they are large enough to cause significant damage in the event of a collision. Tracking these asteroids is crucial for planetary defense, scientific research, and understanding the origins of our solar system. NASA and other space agencies actively monitor thousands of NEAs using advanced observation techniques and databases such as the NeoWs (Near Earth Object Web Service) API, providing valuable data on their size, velocity, trajectory, and approach dates. Studying asteroids not only helps us assess potential threats but also offers insights into the early solar system, the formation of planets, and opportunities for future space missions and resource exploration.</p>
                </div>
                <div>
                <img src="https://images.stockcake.com/public/3/4/9/3494658c-6fe5-4ba5-b0fb-40adef7dbee7_large/cosmic-asteroid-field-stockcake.jpg" alt="" className="ml-30 w-80 rounded-3xl mt-6" />    
                </div>           
            </div>
            <h1 className="text-xl font-bold mb-1">Search to See Close-Approaching Asteroids</h1>
            <p className="mb-2">- Click a row to explore the asteroid’s orbital path</p>
            {/* Calendar Input */}
            <div className="mb-4">
                <label className="block mb-2 font-medium">Pick a Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="px-3 py-2 rounded-lg border bg-gray-900 text-gray-200"
                />
            </div>

            {loading && <p>Loading asteroids for {date}...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {date && !loading && !error && (
                <div className="overflow-x-auto">
                    <h1 className="text-xl font-bold mb-4">Close-Approaching Asteroids on {date}</h1>
                    {asteroids.length === 0 ? (
                        <p>No asteroids found for this date 🚀</p>
                    ) : (
                        <table className="w-365 border-gray-700 bg-gray-900 text-gray-200">
                            <thead>
                                <tr className="bg-gray-800 text-left">
                                    <th className="px-4 py-2 border">Name</th>
                                    <th className="px-4 py-2 border">Min Size (m)</th>
                                    <th className="px-4 py-2 border">Max Size (m)</th>
                                    <th className="px-4 py-2 border">Velocity (km/h)</th>
                                    <th className="px-4 py-2 border">Miss Distance (km)</th>
                                    <th className="px-4 py-2 border">Orbiting Body</th>
                                    <th className="px-4 py-2 border">Hazardous</th>
                                </tr>
                            </thead>
                            <tbody>
                                {asteroids.map((a) => {
                                    const approach = a.close_approach_data[0];
                                    return (
                                        <tr
                                            key={a.id}
                                            className="hover:bg-gray-800 cursor-pointer"
                                            onClick={() => handleRowClick(a.id)}
                                        >
                                            <td className="px-4 py-2 border">{a.name}</td>
                                            <td className="px-4 py-2 border">
                                                {a.estimated_diameter.meters.estimated_diameter_min.toFixed(1)}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {a.estimated_diameter.meters.estimated_diameter_max.toFixed(1)}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {parseFloat(
                                                    approach.relative_velocity.kilometers_per_hour
                                                ).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {parseFloat(approach.miss_distance.kilometers).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-2 border">{approach.orbiting_body}</td>
                                            <td className="px-4 py-2 border">
                                                {a.is_potentially_hazardous_asteroid ? (
                                                    <span className="text-red-500 font-bold">Yes 🚨</span>
                                                ) : (
                                                    <span className="text-green-500">No ✅</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}
