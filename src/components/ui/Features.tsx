import { useState } from "react";
import clsx from "clsx";

import {IconContract, IconTag, IconDeviceIpadHorizontalQuestion, IconLibrary, IconBrain } from "@tabler/icons-react";

const features = [
  {
    title: "Extract Content",
    description: "Automatically extract useful content from webpages, PDFs, videos, docs, and more using smart parsers.",
    icon: IconContract, // Replace with your icon path
  },
  {
    title: "Summarize & Tag",
    description: "Get clean AI-generated summaries and intelligent tags to make every drop easy to recall later.",
    icon: IconTag,
  },
  {
    title: "Ask Anything",
    description: "Use natural language to search or query across your saved content. Like chatting with your second brain.",
    icon: IconDeviceIpadHorizontalQuestion,
  },
  {
    title: "Smart Collections",
    description: "Organize links into smart, shareable collections powered by embeddings and semantic clustering.",
    icon: IconLibrary,
  },
  {
    title: "Share Brain",
    description: "Publicly share your curated collections with others — turn your research into insights.",
    icon: IconBrain,
  }
];

export const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 px-6 py-10 max-w-7xl mx-auto mt-12">
      {features.map((feature, i) => (
        <div
          key={i}
          onMouseEnter={() => setActiveIndex(i)}
          className={clsx(
            "rounded-2xl p-6 cursor-pointer transition-all border",
            activeIndex === i
              ? "bg-indigo-500 text-white shadow-md border-transparent"
              : "bg-white text-black border-zinc-200 hover:bg-zinc-50"
          )}
        >
          <div className="mb-4">
            <feature.icon size={28} stroke={1.5} />
          </div>
          <h4 className="font-semibold text-md mb-1">{feature.title}</h4>
          <p className="text-[12px]">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};
