import React, { useState, useRef, useEffect } from "react";
import { useFormData } from "../../Contexts/Rover.context";

export default function Cal() {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);
  const { date, setDate } = useFormData("");

  const MIN_DATE = "2012-08-06"; // Curiosity landing date
  const MAX_DATE = new Date().toISOString().split("T")[0]; // today

  useEffect(() => {
    function handleClickOutside(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-3 relative" ref={popoverRef}>
      <button
        type="button"
        className="w-48 flex justify-between items-center rounded-lg px-3 py-2 bg-gray-900 text-gray-200 hover:bg-gray-800 border-purple-700 border-2"
        onClick={() => setOpen(!open)}
      >
        {date || "Pick a date"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-14 left-0 bg-gray-900 border rounded-lg shadow-lg p-3 z-10">
          <input
            type="date"
            className="bg-gray-800 text-gray-200 px-2 py-1 rounded-md border w-48"
            value={date || ""}
            min={MIN_DATE}
            max={MAX_DATE}
            onChange={(e) => {
              setDate(e.target.value);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
