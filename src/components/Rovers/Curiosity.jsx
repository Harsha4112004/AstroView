import React, { useEffect, useState } from "react";
import { RoverProvider, useFormData } from "../../Contexts/Rover.context";
import CuriosityForm from "./CuriosityForm";

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
  const [hasSearched, setHasSearched] = useState(false);

  const fetchPhotos = async (date, cameraGroup) => {
    if (!date || !cameraGroup) return;

    setLoading(true);
    setHasSearched(true); 
    setPhotos([]);

    const cameras = CAMERA_GROUPS[cameraGroup];
    let allPhotos = [];

    for (let cam of cameras) {
      try {
        const res = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=${cam}&api_key=${import.meta.env.VITE_NASA_API_KEY}`
        );
        const data = await res.json();
        if (data.photos) allPhotos = [...allPhotos, ...data.photos];
      } catch (error) {
        console.error(`Error fetching photos for ${cam}:`, error);
      }
    }

    setPhotos(allPhotos);
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos(date, camera);
  }, [date, camera]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center pl-10 pr-10">
      <div className="w-full flex flex-row">
        <div>
          <h1 className="text-3xl font-bold mb-4">Curiosity</h1>
          <p className="w-200 mb-4">
            Launched in 2011 and landing in Gale Crater in 2012, Curiosity is a car-sized rover designed to study Mars’ climate and geology. Its main goal is to determine whether Mars ever had conditions suitable for microbial life. Equipped with powerful instruments, including a drill, laser spectrometer, and weather station, Curiosity has found evidence of ancient lakes, organic molecules, and seasonal methane variations — all key clues in the search for past habitability.
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
            alt="Curiosity"
            className="rounded-3xl ml-20 w-140 mt-15"
          />
        </div>
      </div>

      {/* --- The Form --- */}
      <h1 className="text-xl mt-15 flex h-fit w-full items-start font-bold">Explore Mars Through Rover Eyes</h1>
      <div className="flex h-fit w-full items-start">
        <CuriosityForm />
      </div>

      {/* --- Photos / Loading / Empty State --- */}
      <div className="grid grid-cols-3 gap-4 mt-5 w-full">
        {loading && (
          <p className="text-lg w-full col-span-3 text-center">
            Fetching images from Mars... please wait!
          </p>
        )}

        {!loading && hasSearched && photos.length === 0 && (
          <p className="text-lg w-full col-span-3 text-center">
            No photos available for this date and camera. Try another date or camera option!
          </p>
        )}

        {!loading &&
          photos.map((photo) => (
            <div key={photo.id} className="flex flex-col items-center">
              <img
                src={photo.img_src}
                alt={`Mars Rover ${photo.camera.full_name}`}
                className="rounded-lg"
              />
              <p className="text-sm mt-1">{photo.camera.full_name}</p>
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
