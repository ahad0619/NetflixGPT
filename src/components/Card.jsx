import { useRef, useEffect } from "react";
import { IMG_URL } from "../utils/constants";



export const Card = ({ movies, title, className }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;

    const handleWheel = (e) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY * 8;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <>

      <div>
        <h1 className={`font-bold text-2xl text-white ${className || ""} `}>{title}</h1>
      </div>
      <div
        ref={scrollRef}
        className="overflow-x-scroll gap-3 p-3 hide-scrollbar"
        style={{ scrollBehavior: "smooth" }}>


        <div className="flex gap-4 ">
          {movies?.map((movie, index) => (
            <img
              key={index}
              src={IMG_URL + movie.poster_path}
              alt="movie poster"
              className="h-64 rounded shadow"
            />

          ))}
        </div>
      </div>
    </>
  );
}
