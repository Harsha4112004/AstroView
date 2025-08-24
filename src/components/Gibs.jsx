import React, { useState, useEffect } from "react";

const ViirsTrueColor = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const today = new Date();
  today.setDate(today.getDate() - 2); // GIBS lags ~1-2 days
  const dateStr = today.toISOString().split("T")[0];

  useEffect(() => {
    const url = `https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=VIIRS_SNPP_CorrectedReflectance_TrueColor&STYLES=&FORMAT=image/jpeg&TRANSPARENT=FALSE&HEIGHT=2048&WIDTH=4096&CRS=EPSG:4326&BBOX=-90,-180,90,180&TIME=${dateStr}`;
    setImageUrl(url);
  }, [dateStr]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }} className=" text-white m-11">
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          aspectRatio: "2 / 1", // ✅ Forces 2:1 ratio
          margin: "auto",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <img
          src={imageUrl}
          alt="Earth True Color VIIRS"
          className="w-300 h-fit object-cover"
        />
      </div>
      <h2>🌍 Earth True Color (VIIRS SNPP)</h2>
      <p>Date: {dateStr}</p>
    </div>
  );
};

export default ViirsTrueColor;
