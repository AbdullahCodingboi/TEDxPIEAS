import React from "react";

const events = [
  {
    id: "tedx01",
    img: "/events/tedx1.png",
    title: "1.0",
  },
  {
    id: "tedx02",
    img: "/events/tedx2.png",
    title: "2.0",
  },
  {
    id: "tedx03",
    img: "/events/tedx3.png",
    title: "3.0",
  },
  {
    id: "tedx04",
    img: "/events/ted44.jpg",
    title: "4.0",
  },
];

export default function PastEvents() {
  return (
    <div className="w-full px-4 py-12 ">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Past <span className="text-red-600">Events</span>
        </h1> */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {events.map((event) => (
            <a
              href={`legacy.html#${event.id}`}
              key={event.id}
              className="group bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden aspect-video bg-zinc-800">
                <img
                  src={event.img}
                  alt={`TEDx ${event.title}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 bg-zinc-900 border-t-4 border-red-600">
                <h2 className="text-2xl font-bold text-white group-hover:text-red-600 transition-colors duration-300">
                  TEDx <span className="text-red-600 group-hover:text-white">{event.title}</span>
                </h2>
                {/* <p className="text-gray-400 text-sm mt-2">View Event Details →</p> */}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}