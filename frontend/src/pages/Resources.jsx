import React, { useState } from "react";
import { Link } from "react-router-dom";
import resourcesData from "../data/resourcesData";
import "../styles/resources.css";

function Resources() {
  const [search, setSearch] = useState("");

  const filteredResources = resourcesData.filter((res) =>
    res.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="resources-page">
      <h1 className="resources-title">Psychoeducational Resources</h1>
      <p className="resources-subtitle">
        Curated articles, podcasts, and self-help guides to support your well-being.
      </p>

      <input
        type="text"
        className="search-bar"
        placeholder="🔍 Search resources..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="resources-grid">
        {filteredResources.map((res) => (
          <div className="resource-card" key={res.id}>
            <img src={res.image} alt={res.title} />
            <div className="resource-content">
              <h3>{res.title}</h3>
              <span className={`badge badge-${res.type.toLowerCase()}`}>
                {res.type}
              </span>
              <p>{res.description}</p>
              <Link to={`/resources/${res.id}`} className="explore-link">
                Explore →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;
