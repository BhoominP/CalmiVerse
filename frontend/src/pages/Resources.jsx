import React, { useState } from "react";
import ResourceCard from "../components/ResourceCard";
import "../styles/resources.css";

const resourcesData = [
  {
    id: 1,
    title: "Understanding Anxiety",
    description: "A deep dive into what anxiety is and how it affects us.",
    type: "Article",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    content: "Full detailed content about Anxiety here..."
  },
  {
    id: 2,
    title: "Mindful Breathing Exercise",
    description: "A 5-minute guided audio to calm your mind.",
    type: "Podcast",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    content: "Here is a guided mindful breathing exercise..."
  },
  // ...add others
];

function Resources() {
  const [search, setSearch] = useState("");

  const filteredResources = resourcesData.filter((res) =>
    res.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="resources-page">
      <h1>Psychoeducational Resources</h1>
      <p>Curated articles, podcasts, and self-help guides to support your well-being.</p>

      <input
        type="text"
        className="search-bar"
        placeholder="🔍 Search resources..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="resources-grid">
        {filteredResources.map((res, index) => (
          <ResourceCard key={index} {...res} />
        ))}
      </div>
    </div>
  );
}

export default Resources;
