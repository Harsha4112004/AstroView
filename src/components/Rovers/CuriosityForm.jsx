import React from "react";
import Cal from "../Asthetics/Cal";
import { useFormData } from "../../Contexts/Rover.context";

export default function CuriosityForm() {
  const { date, camera, setCamera } = useFormData();

  return (
   <div className="mt-5 flex flex-row gap-[15px]">
  <Cal min="2012-08-06" max={new Date().toISOString().split("T")[0]}/>
  <select
    value={camera}
    onChange={(e) => setCamera(e.target.value)}
    className="select bg-gray-900 hover:bg-gray-800 border-purple-700 focus:outline-none focus:ring-0 border-2 focus:border-purple-700 h-11"
  >
    <option value="" hidden>Pick a Camera</option>
    <option value="FHAZ">FHAZ</option>
    <option value="RHAZ">RHAZ</option>
    <option value="MAST">MAST</option>
    <option value="CHEMCAM">CHEMCAM</option>
    <option value="MAHLI">MAHLI</option>
    <option value="MARDI">MARDI</option>
    <option value="NAVCAM">NAVCAM</option>
  </select>
</div>

  );
}
