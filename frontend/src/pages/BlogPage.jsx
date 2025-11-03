import React from "react";

const BlogPage = () => {
  const sections = [
    {
      id: "updates",
      title: "Latest Updates",
      color: "text-indigo-600",
      cards: [
        {
          title: "Tech Innovations 2025",
          desc: "A look into this year's breakthrough technologies.",
          img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1000&q=80",
        },
        {
          title: "Company Growth",
          desc: "Our journey and milestones achieved this quarter.",
          img: "https://images.unsplash.com/photo-1556767576-cfba2b6b8af9?auto=format&fit=crop&w=1000&q=80",
        },
      ],
    },
    {
      id: "design",
      title: "Design Inspirations",
      color: "text-pink-600",
      cards: [
        {
          title: "Minimalist Aesthetics",
          desc: "Exploring the beauty of simplicity in modern UI design.",
          img: "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1000&q=80",
        },
        {
          title: "Creative Layouts",
          desc: "How to build interfaces that tell stories visually.",
          img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
        },
      ],
    },
    {
      id: "trending",
      title: "Trending Topics",
      color: "text-purple-600",
      cards: [
        {
          title: "AI in Everyday Life",
          desc: "How artificial intelligence is reshaping creativity.",
          img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80",
        },
        {
          title: "Future of Remote Work",
          desc: "What the next generation of collaboration looks like.",
          img: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=1000&q=80",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-24 px-6 scroll-smooth">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
          Blog
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Discover insights, updates, and inspirations shaping the future.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow hover:from-indigo-600 hover:to-purple-600 transition-all`}
          >
            {section.title}
          </a>
        ))}
      </div>

      {/* Blog Sections */}
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="mb-20">
          <h2
            className={`text-3xl font-semibold ${section.color} mb-8 text-center`}
          >
            {section.title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {section.cards.map((card, index) => (
              <div
                key={index}
                className="relative h-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer transform hover:scale-[1.02] transition duration-500"
              >
                {/* Background Image */}
                <img
                  src={card.img}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500"></div>

                {/* Text Content */}
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-semibold mb-1 drop-shadow-lg">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-200 max-w-sm">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Footer Info */}
      <div className="text-center pb-10">
        <h3 className="text-lg font-semibold text-indigo-600">WeTransfer</h3>
        <p className="text-gray-600 mt-2">
          Stay inspired with design, technology, and innovation.
        </p>
      </div>
    </div>
  );
};

export default BlogPage;
