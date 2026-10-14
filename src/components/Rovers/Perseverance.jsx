
import React, { useEffect, useState } from "react";

const API_BASE = "https://api.marsvista.dev/api/v1";

const CAMERAS = [
  { label: "All Cameras", value: "" },
  { label: "Navigation Left", value: "NAVCAM_LEFT" },
  { label: "Navigation Right", value: "NAVCAM_RIGHT" },
  { label: "Front Hazcam Left", value: "FRONT_HAZCAM_LEFT_A" },
  { label: "Front Hazcam Right", value: "FRONT_HAZCAM_RIGHT_A" },
  { label: "Rear Hazcam Left", value: "REAR_HAZCAM_LEFT" },
  { label: "Rear Hazcam Right", value: "REAR_HAZCAM_RIGHT" },
  { label: "Mastcam Zoom Left", value: "MCZ_LEFT" },
  { label: "Mastcam Zoom Right", value: "MCZ_RIGHT" },
  { label: "SHERLOC WATSON", value: "SHERLOC_WATSON" },
  { label: "Skycam", value: "SKYCAM" },
];

function Perseverance() {
  const [photos, setPhotos] = useState([]);
  const [sol, setSol] = useState("1000");
  const [camera, setCamera] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const fetchPhotos = async (pageNum = 1) => {
    const apiKey = import.meta.env.VITE_MARSVISTA_API_KEY;

    if (!apiKey) {
      setError("Mars Vista API key is missing. Check your .env file.");
      setPhotos([]);
      return;
    }

    if (sol.trim() === "" || !Number.isInteger(Number(sol)) || Number(sol) < 0) {
      setError("Enter a valid non-negative Martian sol.");
      return;
    }

    setLoading(true);
    setError("");
    setPhotos([]);

    try {
      const params = new URLSearchParams({
        sol: sol.trim(),
        page: String(pageNum),
      });

      if (camera) {
        params.set("camera", camera);
      }

      const response = await fetch(
        `${API_BASE}/rovers/perseverance/photos?${params.toString()}`,
        {
          headers: {
            "X-API-Key": apiKey,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.error || `Request failed (${response.status})`
        );
      }

      const list = Array.isArray(result)
        ? result
        : result.photos ??
          result.data ??
          result.results ??
          result.items ??
          result.collection?.items ??
          [];

      const normalizedPhotos = list
        .map((photo) => {
          const imageUrl =
            photo.img_src ??
            photo.image_url ??
            photo.imageUrl ??
            photo.imgUrl ??
            photo.url ??
            photo.src;

          return imageUrl
            ? {
                ...photo,
                imageUrl,
                id: photo.id ?? imageUrl,
                sol: photo.sol,
                earthDate: photo.earth_date ?? photo.earthDate,
                cameraName:
                  photo.camera?.full_name ??
                  photo.camera?.name ??
                  photo.camera_name ??
                  camera ??
                  "Perseverance Camera",
              }
            : null;
        })
        .filter(Boolean);

      setPhotos(normalizedPhotos);
      setPage(pageNum);

      if (normalizedPhotos.length === 0) {
        setError(
          "No photos found for this sol and camera. Try another sol or camera."
        );
      }
    } catch (err) {
      setError(err.message || "Unable to fetch Perseverance photos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos(1);
    // Fetch initial results when the page opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchPhotos(1);
  };

  return (
    <div className="min-h-screen w-full px-5 py-8 md:px-10">
      <h1 className="mb-4 text-3xl font-bold">
        Perseverance Rover
      </h1>

      <p className="mb-6 leading-7 text-gray-600 dark:text-gray-300">
        NASA's Perseverance rover landed on Mars on February 18, 2021,
        and explores Jezero Crater. Its mission is to study the planet's
        geology, search for signs of ancient microbial life, and collect
        rock and soil samples for possible return to Earth. Browse images
        captured by its navigation cameras, hazard cameras, Mastcam-Z,
        and other scientific instruments.
      </p>

      <form
        onSubmit={handleSearch}
        className="mb-8 flex flex-col gap-4 rounded-xl border border-gray-200 p-5 dark:border-gray-700 md:flex-row md:items-end"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="sol" className="font-medium">
            Martian Sol
          </label>
          <input
            id="sol"
            type="number"
            min="0"
            value={sol}
            onChange={(event) => setSol(event.target.value)}
            className="rounded-lg border border-gray-300 bg-transparent px-3 py-2 dark:border-gray-600"
            required
          />
        </div>

        <div className="flex flex-col gap-2 md:min-w-64">
          <label htmlFor="camera" className="font-medium">
            Camera
          </label>
          <select
            id="camera"
            value={camera}
            onChange={(event) => setCamera(event.target.value)}
            className="rounded-lg border border-gray-300 bg-transparent px-3 py-2 dark:border-gray-600"
          >
            {CAMERAS.map((item) => (
              <option
                key={item.value}
                value={item.value}
                className="text-black"
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-red-600 px-6 py-2 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Loading..." : "Search Photos"}
        </button>
      </form>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700"
        >
          {error}
        </div>
      )}

      {loading && (
        <div className="py-12 text-center">
          Loading images from Mars...
        </div>
      )}

      {!loading && photos.length > 0 && (
        <>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">
              Perseverance Photo Gallery
            </h2>
            <p className="text-sm text-gray-500">
              Sol {sol} · Page {page} · {photos.length} photos
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {photos.map((photo) => (
              <button
                type="button"
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="overflow-hidden rounded-xl border border-gray-200 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700"
              >
                <img
                  src={photo.imageUrl}
                  alt={`Perseverance rover - ${photo.cameraName}`}
                  loading="lazy"
                  className="h-56 w-full bg-gray-100 object-cover dark:bg-gray-800"
                />

                <div className="p-4">
                  <p className="font-semibold">{photo.cameraName}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Sol {photo.sol ?? sol}
                  </p>
                  {photo.earthDate && (
                    <p className="mt-1 text-sm text-gray-500">
                      {photo.earthDate}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => fetchPhotos(page - 1)}
              className="rounded-lg border border-gray-300 px-5 py-2 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600"
            >
              Previous
            </button>

            <span className="font-medium">{page}</span>

            <button
              type="button"
              disabled={loading}
              onClick={() => fetchPhotos(page + 1)}
              className="rounded-lg border border-gray-300 px-5 py-2 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600"
            >
              Next
            </button>
          </div>
        </>
      )}

      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo details"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-h-[95vh] w-full max-w-5xl overflow-auto rounded-xl bg-white p-4 dark:bg-gray-900"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close photo"
              onClick={() => setSelectedPhoto(null)}
              className="mb-3 ml-auto block rounded-lg px-3 py-1 text-2xl"
            >
              &times;
            </button>

            <img
              src={selectedPhoto.imageUrl}
              alt={`Perseverance - ${selectedPhoto.cameraName}`}
              className="mx-auto max-h-[70vh] w-auto max-w-full object-contain"
            />

            <div className="mt-4">
              <h3 className="text-lg font-semibold">
                {selectedPhoto.cameraName}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Martian Sol: {selectedPhoto.sol ?? sol}
              </p>
              {selectedPhoto.earthDate && (
                <p className="mt-1 text-sm text-gray-500">
                  Earth Date: {selectedPhoto.earthDate}
                </p>
              )}
              <a
                href={selectedPhoto.imageUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-blue-600 underline"
              >
                Open original image
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Perseverance;
