import { useDroppable } from "@dnd-kit/core";
import React from "react";

const DropBox=({ id, image })=> {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-20 h-20 border-2 rounded flex items-center justify-center ${
        isOver ? "border-blue-500" : "border-gray-300"
      }`}
    >
      {image ? (
        <img src={image.src} alt="puzzle-piece" className="w-full h-full object-cover rounded" />
      ) : null}
    </div>
  );
}

export default DropBox