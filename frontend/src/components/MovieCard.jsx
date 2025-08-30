import React from "react";
import { Play, Plus, Heart } from "lucide-react";

const MovieCard = ({ title, rating, poster, size = "medium" }) => {
  const sizeClasses = {
    small: "w-48 h-72",
    medium: "w-64 h-80",
    large: "w-72 h-96",
  };

  return (
    <div
      className={`relative rounded-xl overflow-hidden group cursor-pointer shadow-lg ${sizeClasses[size]}`}
    >
      {/* Poster */}
      <img
        src={poster}
        alt={title}
        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between'>
        {/* Rating at top-right */}
        <div className='flex justify-end p-3'>
          <span className='bg-yellow-500 text-black px-2 py-1 rounded-md text-xs font-bold shadow-md'>
            {rating ? rating.toFixed(1) : "N/A"}
          </span>
        </div>

        {/* Action Buttons (center) */}
        <div className='flex justify-center items-center flex-grow opacity-0 group-hover:opacity-100 transition-all duration-500'>
          <div className='flex space-x-4'>
            <button className='bg-yellow-500 text-black p-3 rounded-full hover:bg-yellow-400 transition-colors shadow-md'>
              <Play className='w-5 h-5' />
            </button>
            <button className='bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-yellow-500 hover:text-black transition-colors shadow-md'>
              <Plus className='w-5 h-5' />
            </button>
            <button className='bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-yellow-500 hover:text-black transition-colors shadow-md'>
              <Heart className='w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Title at bottom */}
        <div className='flex items-center justify-center px-4 pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
          <span className='bg-yellow-500 text-black text-sm font-bold px-2 py-1 rounded-md shadow-md'>
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
