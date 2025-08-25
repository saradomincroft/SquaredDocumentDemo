// src/components/DocumentsList.tsx
import React, { useEffect, useState } from "react";
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

    // Filter
    const now = new Date();
    if (filter === "active") {
      updatedDocs = updatedDocs.filter((doc) => new Date(doc.expiryDate) >= now);
    } else if (filter === "expired") {
      updatedDocs = updatedDocs.filter((doc) => new Date(doc.expiryDate) < now);
    }

    // Sort
    updatedDocs.sort((a, b) => {
      const diff = new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
      return sortAsc ? diff : -diff;
    });

    setFilteredDocs(updatedDocs);
  }, [filter, sortAsc, documents]);

  if (error)
    return (
      <div className="text-red-600 font-semibold mt-4">
        Error fetching documents: {error}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Documents</h1>

      {/* Filters and Sorting */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "active" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "expired" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter("expired")}
          >
            Expired
          </button>
        </div>

        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setSortAsc(!sortAsc)}
        >
          Sort by Date {sortAsc ? "↑" : "↓"}
        </button>
      </div>

      {/* Documents List */}
      <ul className="grid md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => {
          const isExpired = new Date(doc.expiryDate) < new Date();
          return (
            <li
              key={doc.name}
              className={`p-4 border rounded shadow-sm hover:shadow-md transition ${
                isExpired ? "bg-red-50 border-red-300" : "bg-green-50 border-green-300"
              }`}
            >
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700 hover:underline"
              >
                {doc.name}
              </a>
              <div className="mt-1 text-sm">
                Status:{" "}
                <span className={isExpired ? "text-red-600" : "text-green-600"}>
                  {doc.status}
                </span>
              </div>
              <div className="text-sm mt-1">
                Expiry: {new Date(doc.expiryDate).toLocaleDateString()}
              </div>
            </li>
          );
        })}
      </ul>

      {filteredDocs.length === 0 && (
        <div className="mt-4 text-gray-500">No documents to display.</div>
      )}
    </div>
  );
};

export default DocumentsList;
