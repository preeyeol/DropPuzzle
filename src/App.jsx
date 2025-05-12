import React, { useState } from "react";
import DropBox from "./pages/DropBox";
import DraggableImage from "./pages/DraggableImages";
import { DndContext, DragOverlay } from "@dnd-kit/core";

const allImages = Array.from({ length: 50 }, (_, i) => ({
  id: `img-${i + 1}`,
  src: `https://picsum.photos/seed/${i + 1}/100`, // placeholder images
}));

const MAX_VISIBLE_OPTIONS = 10;
const GRID_SIZE = 25;

export default function App() {
  const [trayImages, setTrayImages] = useState(
    allImages.slice(0, MAX_VISIBLE_OPTIONS)
  );
  const [usedImages, setUsedImages] = useState([]);
  const [gridImages, setGridImages] = useState(Array(GRID_SIZE).fill(null));
  const [activeDrag, setActiveDrag] = useState(null);

  function handleDragStart(event) {
    setActiveDrag(event.active.data.current);
  }

  function handleDragEnd(event) {
    const { over, active } = event;
    if (over && over.id.startsWith("dropbox-")) {
      const index = parseInt(over.id.split("-")[1]);
      const newGrid = [...gridImages];
      newGrid[index] = activeDrag;
      setGridImages(newGrid);

      // remove image from tray
      const nextImage = allImages.find(
        (img) =>
          !trayImages.includes(img) &&
          !usedImages.includes(img) &&
          img.id !== activeDrag.id
      );
      const updatedTray = trayImages.filter((img) => img.id !== activeDrag.id);
      if (nextImage) updatedTray.push(nextImage);
      setTrayImages(updatedTray);

      setUsedImages([...usedImages, activeDrag]);
    }
    setActiveDrag(null);
  }

  return (
    <div className="p-4 overflow-hidden">
      <h1 className="font-bold text-2xl mb-10 text-center">
        Q4. Put the room into correct position based on environment and
        situation
      </h1>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex justify-center items-center">
          <div className="grid grid-cols-5 gap-2 w-[30rem] justify-center items-center">
            {gridImages.map((img, index) => (
              <DropBox key={index} id={`dropbox-${index}`} image={img} />
            ))}
          </div>
            </div>
            <div>

          <h1 className="text-center py-7 text-2xl text-[#959595] font-medium">Drag from the options below</h1>
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {trayImages.map((img) => (
              <DraggableImage key={img.id} image={img} />
            ))}
            </div>
          </div>

          <DragOverlay>
            {activeDrag ? (
              <img
                src={activeDrag.src}
                alt="drag-preview"
                className="w-20 h-20 rounded border"
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
  );
}
