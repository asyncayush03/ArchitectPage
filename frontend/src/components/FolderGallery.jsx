// frontend/src/components/FolderGallery.jsx
import { useEffect, useState } from "react";

function FolderGallery({ folder = "" }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const url = folder
      ? `http://localhost:8080/api/images?folder=${encodeURIComponent(folder)}`
      : "http://localhost:8080/api/images";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setImages(data.images);
      })
      .catch((err) => {
        console.error("Error fetching images:", err);
      });
  }, [folder]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
      {images.map((img) => (
        <img
          key={img.publicId || img.url}
          src={img.url}
          alt={img.id}
          width={250}
          style={{ borderRadius: "8px" }}
        />
      ))}
    </div>
  );
}

export default FolderGallery;
