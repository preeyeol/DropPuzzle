import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";

const allImages = Array.from({ length: 50 }, (_, i) => ({
  id: `img-${i + 1}`,
  src: `https://picsum.photos/seed/${i + 1}/100` // placeholder images
}));

const MAX_VISIBLE_OPTIONS = 8;
const GRID_SIZE = 25;

export default function App() {
  const [trayImages, setTrayImages] = useState(allImages.slice(0, MAX_VISIBLE_OPTIONS));
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
      const nextImage = allImages.find(img =>
        !trayImages.includes(img) && !usedImages.includes(img) && img.id !== activeDrag.id
      );
      const updatedTray = trayImages.filter(img => img.id !== activeDrag.id);
      if (nextImage) updatedTray.push(nextImage);
      setTrayImages(updatedTray);

      setUsedImages([...usedImages, activeDrag]);
    }
    setActiveDrag(null);
  }

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-10">Q4. Put the room into correct position based on environment and situation</h1>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-6 gap-2">
          {gridImages.map((img, index) => (
            <DropBox key={index} id={`dropbox-${index}`} image={img} />
          ))}
        </div>
<h1>DRAG IMAGES FROM HERE</h1>
        <div className="flex gap-2 flex-wrap">
          {trayImages.map((img) => (
            <DraggableImage key={img.id} image={img} />
          ))}
        </div>

        <DragOverlay>
          {activeDrag ? (
            <img src={activeDrag.src} alt="drag-preview" className="w-28 h-28 rounded border" />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function DraggableImage({ image }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: image.id,
    data: image,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <img
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      src={image.src}
      alt="draggable"
      className="w-28 h-28 border rounded cursor-grab"
      style={style}
    />
  );
}

function DropBox({ id, image }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-28 h-28 border-2 rounded flex items-center justify-center ${
        isOver ? "border-blue-500" : "border-gray-300"
      }`}
    >
      {image ? (
        <img src={image.src} alt="puzzle-piece" className="w-full h-full object-cover rounded" />
      ) : null}
    </div>
  );
}
