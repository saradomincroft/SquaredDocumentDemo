import React, { useEffect, useState } from 'react';
import type { Document } from '../models/Document';
import { fetchDocuments } from '../services/documentService';

export const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments()
      .then(docs => setDocuments(docs))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Customer Documents</h2>
      <ul>
        {documents.map(doc => (
          <li key={doc.name}>
            <a href={doc.url} target="_blank" rel="noreferrer">{doc.name}</a> — {doc.status} — Expires: {doc.expiryDate}
          </li>
        ))}
      </ul>
    </div>
  );
};
