# DemoDocs Project

A **Customer Documents Dashboard** web application built with **React (Vite + TypeScript)** for the frontend and **ASP.NET Core (.NET 8)** for the backend API.  

The app allows users to view documents, filter by status (Active, Near Expiry, Expired), search, and sort by expiry date.  

---

## **Folder Structure**

DemoDocsProject/  
├─ DemoDocsAPI/        # ASP.NET Core backend  
│  ├─ Controllers/     # API controllers  
│  ├─ Models/          # Data models  
│  ├─ wwwroot/         # Built frontend files served as static content  
│  ├─ Program.cs  
│  └─ DemoDocsAPI.csproj  
├─ DemoDocsUI/         # React frontend  
│  ├─ src/  
│  ├─ public/  
│  ├─ package.json  
│  └─ vite.config.ts  
└─ README.md  

---

## **Local Setup**

### **Backend (API)**

1. Navigate to the API folder:  
   `cd DemoDocsAPI`

2. Restore dependencies and run the API:  
   `dotnet restore`  
   `dotnet run`

---

### **Frontend (React)**

1. Navigate to the frontend folder:  
   `cd DemoDocsUI`

2. Install dependencies:  
   `npm install`

3. Run development server:  
   `npm run dev`

- CORS is enabled in the backend to allow requests from the frontend dev server.

---

## **Features**

- Filter documents: All, Active, Near Expiry, Expired  
- Search documents by name or status  
- Sort documents by expiry date  
- Show document status: Active, Near Expiry (days left), Expired  
- Clickable document links (don't currently lead anywhere)
- Fully responsive design  

---

## **Technologies Used**

- **Frontend:** React, TypeScript, Vite, Tailwind CSS  
- **Backend:** ASP.NET Core 8, C#  
- **Hosting:** Azure App Service (optional)  
- **Authentication:** Dummy authentication scheme (for dev purposes)  

