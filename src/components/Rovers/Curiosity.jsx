
import React, { useEffect, useState } from "react";
import {
  RoverProvider,
  useFormData,
} from "../../Contexts/Rover.context";
import CuriosityForm from "./CuriosityForm";

const API_BASE = "https://api.marsvista.dev/api/v1";

const CAMERA_GROUPS = {
  NAVCAM: ["NAVCAM", "NAV_LEFT", "NAV_RIGHT", "NAV_LEFT_B", "NAV_RIGHT_B"],
  FHAZ: ["FHAZ_LEFT", "FHAZ_RIGHT", "FHAZ"],
  RHAZ: ["RHAZ_LEFT", "RHAZ_RIGHT", "RHAZ"],
  CHEMCAM: ["CHEMCAM", "CHEMCAM_RMI"],
  MAST: ["MAST"],
  MAHLI: ["MAHLI"],
  MARDI: ["MARDI"],
};

function CuriosityContent() {
  const { date, camera } = useFormData();

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!date || !camera) return;

    const controller = new AbortController();

    async function fetchPhotos() {
      setLoading(true);
      setError("");
      setPhotos([]);
      setHasSearched(true);

      try {
        const cameras = CAMERA_GROUPS[camera];

        if (!cameras) {
          throw new Error("Please select a valid camera.");
        }

        const apiKey = import.meta.env.VITE_MARSVISTA_API_KEY;

        if (!apiKey) {
          throw new Error(
            "Mars Vista API key is missing. Check your .env file."
          );
        }

        // Mars Vista v1 example uses the rover's sol (Martian day).
        // This component receives an Earth date, so convert it first.
        const earthDate = new Date(`${date}T00:00:00Z`);

        if (Number.isNaN(earthDate.getTime())) {
          throw new Error("Invalid Earth date selected.");
        }

        const results = await Promise.all(
          cameras.map(async (cam) => {
            const url = new URL(
              `${API_BASE}/rovers/curiosity/photos`
            );

            url.searchParams.set("camera", cam);
            url.searchParams.set("earth_date", date);
            url.searchParams.set("page", "1");

            const response = await fetch(url.toString(), {
              headers: {
                "X-API-Key": apiKey,
              },
              signal: controller.signal,
            });

            if (!response.ok) {
              const message = await response.text();

              throw new Error(
                `Camera ${cam}: HTTP ${response.status}. ${message.slice(0, 200)}`
              );
            }

            const data = await response.json();

            // Accommodate common API response shapes.
            if (Array.isArray(data.photos)) return data.photos;
            if (Array.isArray(data.data)) return data.data;
            if (Array.isArray(data.results)) return data.results;
            if (Array.isArray(data)) return data;

            throw new Error(
              `Unexpected response format for camera ${cam}.`
            );
          })
        );

        const uniquePhotos = new Map();

        results.flat().forEach((photo) => {
          const imageUrl =
            photo.img_src ??
            photo.image_url ??
            photo.imageUrl ??
            photo.url;

          if (!imageUrl) return;

          const id = photo.id ?? photo.photo_id ?? imageUrl;

          uniquePhotos.set(id, {
            ...photo,
            id,
            img_src: imageUrl,
            camera: {
              full_name:
                photo.camera?.full_name ??
                photo.camera?.name ??
                photo.camera_name ??
                photo.camera ??
                "Mars Rover Camera",
            },
          });
        });

        setPhotos([...uniquePhotos.values()]);
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("Mars Vista API error:", err);
        setError(err.message || "Unable to fetch Mars photos.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => controller.abort();
  }, [date, camera]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center pl-10 pr-10">
      <div className="w-full flex flex-row">
        <div>
          <h1 className="text-3xl font-bold mb-4">Curiosity</h1>

          <p className="mb-4">
            Launched in 2011 and landing in Gale Crater in 2012,
            Curiosity is a car-sized rover designed to study Mars'
            climate and geology. Its mission is to investigate
            whether Mars ever had conditions suitable for microbial
            life.
          </p>

          <div className="mb-4">
            <h2>Landing Date: August 6, 2012</h2>
            <h2>Status: Active</h2>
            <h2>Cameras:</h2>
            <ul className="list-disc ml-5">
              <li>FHAZ - Front Hazard Avoidance Camera</li>
              <li>RHAZ - Rear Hazard Avoidance Camera</li>
              <li>MAST - Mast Camera</li>
              <li>CHEMCAM - Chemistry and Camera Complex</li>
              <li>MAHLI - Mars Hand Lens Imager</li>
              <li>MARDI - Mars Descent Imager</li>
              <li>NAVCAM - Navigation Camera</li>
            </ul>
          </div>
        </div>

        <div>
          <img
            src="https://www.silicon.co.uk/wp-content/uploads/2013/04/Mars-curiosity-rover-NASA.jpg"
            alt="Curiosity rover"
            className="rounded-3xl ml-20 w-140 mt-15"
          />
        </div>
      </div>

      <h1 className="text-xl mt-15 flex h-fit w-full items-start font-bold">
        Explore Mars Through Rover Eyes
      </h1>

      <div className="flex h-fit w-full items-start">
        <CuriosityForm />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 w-full">
        {loading && (
          <p className="text-lg col-span-full text-center">
            Fetching images from Mars... please wait!
          </p>
        )}

        {!loading && error && (
          <p className="text-red-500 col-span-full text-center">
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          hasSearched &&
          photos.length === 0 && (
            <p className="text-lg col-span-full text-center">
              No photos found for this date and camera.
              Try another date or camera.
            </p>
          )}

        {!loading &&
          photos.map((photo) => (
            <div
              key={photo.id}
              className="flex flex-col items-center"
            >
              <img
                src={photo.img_src}
                alt={`Curiosity ${photo.camera.full_name}`}
                loading="lazy"
                className="rounded-lg w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <p className="text-sm mt-1">
                {photo.camera.full_name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default function Curiosity() {
  return (
    <RoverProvider>
      <CuriosityContent />
    </RoverProvider>
  );
}
