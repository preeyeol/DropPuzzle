import { useDraggable } from "@dnd-kit/core";
import React from "react";

const DraggableImage=({ image }) =>{
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
      className="w-20 h-20 border rounded cursor-grab"
      style={style}
    />
  );
}

export default DraggableImage