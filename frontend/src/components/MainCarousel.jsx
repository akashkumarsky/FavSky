import { useState } from "react";

const slides = [
    "https://images.bewakoof.com/uploads/grid/app/1x1-IK--1--1755882377.gif?text=Slide+1",
    "https://images.bewakoof.com/uploads/grid/app/3-Denim-Verse-1x1-HC-BANNE-BESTSELLER-MEN-1755952723.gif?text=Slide+2",
    "https://images.bewakoof.com/uploads/grid/app/BewakoofXGoogle-1x1-01rev--1--1755856949.jpg?text=Slide+3",
];

const MainCarousel = () => {
    const [current, setCurrent] = useState(0);

    const prev = () =>
        setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
    const next = () =>
        setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform ease-out duration-500"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {slides.map((s, i) => (
                        <img key={i} src={s} alt={`Slide ${i + 1}`} />
                    ))}
                </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                    onClick={prev}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    &lt;
                </button>
                <button
                    onClick={next}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default MainCarousel;