import type { Document } from "../types/Document";

const API_BASE = "http://localhost:5080/api";

export const getAllDocuments = async (): Promise<Document[]> => {
  const res = await fetch(`${API_BASE}/documents`);
  if (!res.ok) throw new Error("Failed to fetch documents");
  return res.json();
};

export const getDocumentByName = async (name: string): Promise<Document | null> => {
  const res = await fetch(`${API_BASE}/documents/${name}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch document");
  return res.json();
};
