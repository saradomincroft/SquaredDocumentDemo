// src/components/DocumentsList.tsx
import React, { useEffect, useState } from "react";
import type { Document } from "../types/Document";
import { getAllDocuments } from "../services/DocumentService";

const DocumentsList = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDocuments()
      .then(setDocuments)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {documents.map((doc) => (
        <li key={doc.name}>
          <a href={doc.url} target="_blank" rel="noopener noreferrer">
            {doc.name}
          </a>{" "}
          - {doc.status} - {new Date(doc.expiryDate).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
};
export default DocumentsList;