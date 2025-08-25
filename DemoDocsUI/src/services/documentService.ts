export interface Document {
  name: string;
  url: string;
  expiryDate: string;
  status: string;
}

export const fetchDocuments = async (): Promise<Document[]> => {
  const response = await fetch('https://localhost:5001/api/Documents'); // replace with your deployed API URL
  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }
  return response.json();
};
