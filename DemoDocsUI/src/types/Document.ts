export interface Document {
  name: string;
  url: string;
  expiryDate: string;
  status: "Active" | "Expired";
}
