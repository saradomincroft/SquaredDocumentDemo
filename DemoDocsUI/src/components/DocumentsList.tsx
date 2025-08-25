// src/components/DocumentsList.tsx
import React, { useEffect, useState } from "react";
import "./DocumentsList.css";
import type { Document } from "../types/Document";
import { getAllDocuments } from "../services/DocumentService";

const DocumentsList = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Document[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "expired">("all");
  const [sortAsc, setSortAsc] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDocuments()
      .then((docs) => {
        setDocuments(docs);
        setFilteredDocs(docs);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    let updatedDocs = [...documents];
    const now = new Date();

    if (filter === "active") {
      updatedDocs = updatedDocs.filter((doc) => new Date(doc.expiryDate) >= now);
    } else if (filter === "expired") {
      updatedDocs = updatedDocs.filter((doc) => new Date(doc.expiryDate) < now);
    }

    updatedDocs.sort((a, b) => {
      const diff = new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
      return sortAsc ? diff : -diff;
    });

    setFilteredDocs(updatedDocs);
  }, [filter, sortAsc, documents]);

  if (error)
    return <div className="error">Error fetching documents: {error}</div>;

  return (
    <div className="container">
      <h1 className="title">Customer Documents</h1>
      <h2 className="subtitle">Documents Dashboard</h2>

      <div className="filters">
        {(["all", "active", "expired"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`filter-button ${filter === type ? "active" : ""}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
        <button onClick={() => setSortAsc(!sortAsc)} className="sort-button">
          Sort by Date {sortAsc ? "↑" : "↓"}
        </button>
      </div>

      <div className="cards-container">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => {
            const isExpired = new Date(doc.expiryDate) < new Date();
            return (
              <div key={doc.name} className="card">
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  {doc.name}
                </a>
                <span className={`status ${isExpired ? "expired" : "active"}`}>
                  {isExpired ? "Expired" : "Active"}
                </span>
                <div className="card-info">Status: {doc.status}</div>
                <div className="card-info">
                  Expiry: {new Date(doc.expiryDate).toLocaleDateString()}
                </div>
              </div>
            );
          })
        ) : (
          <div className="card-info">No documents to display.</div>
        )}
      </div>
    </div>
  );
};

export default DocumentsList;
