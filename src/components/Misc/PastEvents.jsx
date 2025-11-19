import React from "react";

const events = [
  { id: "tedx01", img: "/events/tedx1.png", title: "1.0" },
  { id: "tedx02", img: "/events/tedx2.png", title: "2.0" },
  { id: "tedx03", img: "/events/tedx3.png", title: "3.0" },
  { id: "tedx04", img: "/events/ted44.jpg", title: "4.0" },
];

export default function PastEvents() {
  return (
    <div className="w-full px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div key={event.id} className="text-center">
              <img
                src={event.img}
                alt={`TEDx ${event.title}`}
                className="w-full h-auto rounded"
              />
              <h2 className="mt-2 text-lg font-semibold">{`TEDx ${event.title}`}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
