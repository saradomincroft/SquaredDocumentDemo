export interface Document {
  name: string;
  customerName: string;
  url: string;
  expiryDate: string;
  status: "Active" | "Expired";
}
