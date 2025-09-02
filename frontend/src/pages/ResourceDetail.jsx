import React from "react";
import { useParams, Link } from "react-router-dom";
import resourcesData from "../data/resourcesData"; // we’ll move resource list here later

function ResourceDetail() {
  const { id } = useParams();
  const resource = resourcesData.find((res) => res.id === parseInt(id));

  if (!resource) return <p>Resource not found.</p>;

  return (
    <div className="resource-detail">
      <Link to="/resources" className="back-link">← Back to Resources</Link>
      <h1>{resource.title}</h1>
      <img src={resource.image} alt={resource.title} />
      <p><strong>Type:</strong> {resource.type}</p>
      <p>{resource.content}</p>
    </div>
  );
}

export default ResourceDetail;
