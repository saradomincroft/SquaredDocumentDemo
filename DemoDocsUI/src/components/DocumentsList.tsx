import { useEffect, useState } from "react";
import "./DocumentsList.css";
import type { Document } from "../types/Document";
import { getAllDocuments } from "../services/DocumentService";

const DocumentsList = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Document[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "near-expiry" | "expired">("all");
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDocuments()
      .then((docs) => {
        setDocuments(docs);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    const now = new Date();
    const lowerSearch = searchTerm.trim().toLowerCase();

    // Filter + search combined
    const updatedDocs = documents.filter((doc) => {
      const expiry = new Date(doc.expiryDate);
      const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / 86400000);

      // Status filter
      const statusMatch =
        filter === "all" ||
        (filter === "active" && expiry >= now && daysLeft > 7) ||
        (filter === "near-expiry" && expiry >= now && daysLeft <= 7) ||
        (filter === "expired" && expiry < now);

      // Search filter (name or customer)
      const searchMatch =
        lowerSearch === "" ||
        doc.name.toLowerCase().includes(lowerSearch) ||
        doc.customerName.toLowerCase().includes(lowerSearch);

      return statusMatch && searchMatch;
    });

    // Sort by expiry date
    updatedDocs.sort((a, b) => {
      const diff = new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
      return sortAsc ? diff : -diff;
    });

    setFilteredDocs(updatedDocs);
  }, [documents, filter, sortAsc, searchTerm]);

  if (error) return <div className="error">Error fetching documents: {error}</div>;

  const getStatusClass = (expiry: Date) => {
    const now = new Date();
    const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / 86400000);
    if (expiry < now) return "status expired";
    if (daysLeft <= 7) return "status near-expiry";
    return "status active";
  };

  const getStatusText = (expiry: Date) => {
    const now = new Date();
    const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / 86400000);
    if (expiry < now) return "Expired";
    if (daysLeft <= 7) return `Near Expiry (${daysLeft}d)`;
    return "Active";
  };

  return (
    <div className="container">
      <h1 className="title">Customer Documents Dashboard</h1>

      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Search documents or customer..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {(["all", "active", "near-expiry", "expired"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`filter-button ${filter === type ? "active" : ""}`}
          >
            {type.replace("-", " ").toUpperCase()}
          </button>
        ))}

        <button onClick={() => setSortAsc(!sortAsc)} className="sort-button">
          Sort by Date {sortAsc ? "↑" : "↓"}
        </button>
      </div>

      <div className="cards-container">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => {
            const expiryDate = new Date(doc.expiryDate);
            return (
              <div key={doc.name + doc.customerName} className="card">
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  {doc.name}
                </a>
                <span className={getStatusClass(expiryDate)}>{getStatusText(expiryDate)}</span>
                <div className="card-info">Customer: {doc.customerName}</div>
                <div className="card-info">Status: {doc.status}</div>
                <div className="card-info">Expiry: {expiryDate.toLocaleDateString()}</div>
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
