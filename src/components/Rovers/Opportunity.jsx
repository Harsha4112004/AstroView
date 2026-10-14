
import React, { useEffect, useState } from "react";

const API_BASE = "https://api.marsvista.dev/api/v1";

export default function Opportunity() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [retry, setRetry] = useState(0);

  const [sol, setSol] = useState("1000");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchImages() {
      setLoading(true);
      setError("");
      setItems([]);

      try {
        const apiKey = import.meta.env.VITE_MARSVISTA_API_KEY;

        if (!apiKey) {
          throw new Error(
            "Missing Mars Vista API key. Add VITE_MARSVISTA_API_KEY to your .env file."
          );
        }

        const url = new URL(
          `${API_BASE}/rovers/opportunity/photos`
        );

        url.searchParams.set("sol", sol);
        url.searchParams.set("page", String(page));

        const response = await fetch(url.toString(), {
          headers: {
            "X-API-Key": apiKey,
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          const message = await response.text();

          throw new Error(
            `Mars Vista returned HTTP ${response.status}: ${message.slice(0, 200)}`
          );
        }

        const result = await response.json();

        // Support common response structures.
        const photos = Array.isArray(result)
          ? result
          : result.photos ??
            result.data ??
            result.results ??
            result.items ??
            result.collection?.items;

        if (!Array.isArray(photos)) {
          throw new Error(
            "Unexpected Mars Vista response. Check the API response structure."
          );
        }

        const normalized = photos
          .map((photo, index) => {
            const imageUrl =
              photo.img_src ??
              photo.image_url ??
              photo.imageUrl ??
              photo.imgUrl ??
              photo.url ??
              photo.src;

            if (!imageUrl) return null;

            return {
              ...photo,
              id: photo.id ?? photo.photo_id ?? `${page}-${index}`,
              imageUrl,
              cameraName:
                photo.camera?.full_name ??
                photo.camera?.name ??
                photo.camera_name ??
                photo.camera ??
                "Opportunity Camera",
              title:
                photo.title ??
                photo.camera?.full_name ??
                "Opportunity Rover Photo",
            };
          })
          .filter(Boolean);

        setItems(normalized);
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("Mars Vista error:", err);
        setError(err.message || "Unable to load Opportunity photos.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchImages();

    return () => controller.abort();
  }, [page, sol, retry]);

  return (
    <div className="w-full h-full flex flex-col items-center pl-10 pr-10">
      {/* Header */}
      <div className="w-full flex flex-col lg:flex-row">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold mb-4">
            Opportunity
          </h1>

          <p className="mb-4">
            Opportunity, also known as MER-B, landed on Mars
            in January 2004. Designed for a 90-sol mission,
            it operated for nearly 15 years and traveled
            more than 45 kilometers across the Martian
            surface. It studied rocks, meteorites, and
            geological formations that revealed evidence
            of ancient water on Mars.
          </p>

          <div className="mb-4">
            <h2>Landing Date: January 25, 2004</h2>
            <h2>Last contact: June 10, 2018</h2>
            <h2>Status: Mission ended in 2019</h2>
            <h2>Cameras:</h2>
            <ul className="list-disc ml-5">
              <li>FHAZ - Front Hazard Avoidance Camera</li>
              <li>RHAZ - Rear Hazard Avoidance Camera</li>
              <li>NAVCAM - Navigation Camera</li>
              <li>PANCAM - Panoramic Camera</li>
              <li>MINITES - Miniature Thermal Emission Spectrometer</li>
            </ul>
          </div>
        </div>

        <div className="shrink-0">
          <img
            src="https://i.extremetech.com/imagery/content-types/00tsAaPVjB55e08CLC2vqjr/hero-image.fill.size_1200x675.jpg"
            alt="Opportunity rover"
            className="rounded-3xl lg:ml-10 w-full lg:w-96 mt-4 object-cover"
          />
        </div>
      </div>

      {/* Gallery controls */}
      <div className="w-full mt-6 mb-6">
        <h2 className="text-xl font-bold">
          Opportunity Photo Gallery
        </h2>
        <p className="mt-1 mb-4">
          Select a Martian sol and browse photos.
        </p>

        <label htmlFor="sol" className="block mb-2">
          Martian Sol
        </label>

        <div className="flex flex-wrap gap-3">
          <input
            id="sol"
            type="number"
            min="0"
            value={sol}
            onChange={(event) => {
              setSol(event.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-gray-400 bg-transparent px-3 py-2 w-40"
          />

          <button
            onClick={() => setRetry((value) => value + 1)}
            className="rounded-lg bg-[#9d85e6] text-black font-semibold px-4 py-2"
          >
            Search
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-lg text-center py-8">
          Fetching Opportunity images...
        </p>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="w-full text-center py-8">
          <p className="text-red-500 whitespace-pre-wrap">
            {error}
          </p>

          <button
            onClick={() => setRetry((value) => value + 1)}
            className="mt-4 rounded-lg bg-gray-700 text-white px-4 py-2"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && items.length === 0 && (
        <p className="text-center py-8">
          No photos returned for this sol.
        </p>
      )}

      {/* Gallery */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedItem(item)}
              className="text-left cursor-pointer flex flex-col bg-[#35294f] rounded-lg shadow-md overflow-hidden hover:scale-[1.02] transition-transform"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-64 object-cover"
              />

              <div className="p-3 text-gray-200">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm mt-1">
                  {item.cameraName}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6 mb-8">
        <button
          onClick={() => setPage((value) => Math.max(1, value - 1))}
          disabled={page === 1 || loading}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-bold">Page {page}</span>

        <button
          onClick={() => setPage((value) => value + 1)}
          disabled={loading || items.length === 0}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center p-4 z-50"
          onClick={() => setSelectedItem(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="bg-[#35294f] text-gray-200 rounded-lg shadow-xl max-w-4xl w-full overflow-y-auto max-h-[90vh]"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.title}
              className="w-full max-h-[55vh] object-contain bg-black"
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                {selectedItem.title}
              </h2>

              <p className="mb-3">
                {selectedItem.description ||
                  selectedItem.caption ||
                  "No description available."}
              </p>

              <p>
                <strong>Camera:</strong> {selectedItem.cameraName}
              </p>

              <p>
                <strong>Sol:</strong>{" "}
                {selectedItem.sol ?? sol}
              </p>

              <p>
                <strong>Photo ID:</strong> {selectedItem.id}
              </p>

              <button
                onClick={() => setSelectedItem(null)}
                className="bg-[#9d85e6] font-bold text-black px-5 py-3 hover:bg-black hover:text-white rounded-lg mt-5"
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
