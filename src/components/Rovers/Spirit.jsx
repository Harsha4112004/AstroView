import React, { useEffect, useState } from "react";

export default function Spirit() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // for modal

  const fetchImages = async (pageNum) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://images-api.nasa.gov/search?q=spirit+rover&media_type=image&page=${pageNum}`
      );
      const data = await res.json();
      setItems(data.collection.items || []);
    } catch (err) {
      console.error("Error fetching NASA images:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center pl-10 pr-10">
      {/* --- Header Section --- */}
      <div className="w-full flex flex-row">
        <div>
          <h1 className="text-3xl font-bold mb-4">Spirit</h1>
          <p className="w-200 mb-4">
            Spirit, also known as MER-A, landed on Mars in January 2004 at
            Gusev Crater. Like its twin Opportunity, Spirit was designed for a
            90-sol mission but far exceeded expectations, operating until March
            2010. Spirit traversed over 7.7 kilometers, climbing Husband Hill,
            analyzing diverse rock and soil samples, discovering evidence of
            ancient hot springs, and capturing spectacular panoramic images. The
            rover got stuck in soft sand in 2009, and despite months of recovery
            attempts, NASA lost contact in March 2010. Spirit’s discoveries
            provided critical evidence that Mars once hosted environments that
            could have supported microbial life.
          </p>
          <div className="mb-4">
            <h2>Landing Date: January 4, 2004</h2>
            <h2>Last Contact: March 22, 2010</h2>
            <h2>Status: Complete (mission ended May 25, 2011)</h2>
            <h2>Cameras:</h2>
            <ul className="list-disc ml-5">
              <li>FHAZ - Front Hazard Avoidance Camera</li>
              <li>RHAZ - Rear Hazard Avoidance Camera</li>
              <li>NAVCAM - Navigation Camera</li>
              <li>PANCAM - Panoramic Camera</li>
              <li>MINITES - Miniature Thermal Emission Spectrometer</li>
              <li>MI - Microscopic Imager</li>
            </ul>
          </div>
        </div>
        <div>
          <img
            src="https://d2pn8kiwq2w21t.cloudfront.net/original_images/missionswebmer.jpg"
            alt="Spirit"
            className="rounded-3xl ml-20 w-140 mt-15"
          />
        </div>
      </div>

      <div className="flex items-start w-full h-fit flex-col mt-6 mb-8">
        <h1 className="text-xl font-bold">Spirit Photo Gallery</h1>
        <p className="mt-1">Click on any image to expand and see full details!</p>
      </div>

      {/* --- Photos Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {loading && (
          <p className="text-lg w-full col-span-3 text-center">
            Fetching images from NASA... please wait!
          </p>
        )}

        {!loading &&
          items.map((item, idx) => {
            const link =
              item.links && item.links[0] ? item.links[0].href : null;
            const data = item.data && item.data[0] ? item.data[0] : {};
            const title = data.title || "Untitled";

            return (
              link && (
                <div
                  key={idx}
                  onClick={() => setSelectedItem(item)} // open modal
                  className="cursor-pointer flex flex-col bg-[#35294f] rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
                >
                  <img
                    src={link}
                    alt={title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )
            );
          })}
      </div>

      {/* --- Pagination Controls --- */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-700 text-white rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-bold">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-700 text-white rounded-lg"
        >
          Next
        </button>
      </div>

      {/* --- Modal for Expanded View --- */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-6 z-50">
          <div className="bg-[#35294f] text-gray-200 rounded-lg shadow-xl max-w-4xl w-full overflow-y-auto max-h-[90vh]">
            <img
              src={selectedItem.links[0].href}
              alt={selectedItem.data[0].title}
              className="w-full object-contain rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                {selectedItem.data[0].title}
              </h2>
              <p className="mb-4">{selectedItem.data[0].description}</p>
              <p>
                <strong>Center:</strong> {selectedItem.data[0].center}
              </p>
              <p>
                <strong>Date Created:</strong>{" "}
                {selectedItem.data[0].date_created}
              </p>
              <p>
                <strong>NASA ID:</strong> {selectedItem.data[0].nasa_id}
              </p>
              <button
                onClick={() => setSelectedItem(null)}
                className="bg-[#9d85e6] font-bold text-black p-3 hover:bg-black hover:text-white rounded-4xl w-25 mt-5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
