import type { Document } from '../models/Document';

export const fetchDocuments = async (): Promise<Document[]> => {
  const res = await fetch('http://localhost:5000/api/documents');
  if (!res.ok) throw new Error('Failed to fetch documents');
  return res.json();
};
