# -------------------
# Stage 1: Build frontend
# -------------------
FROM node:20 AS frontend-build

WORKDIR /app/DemoDocsUI

# Install dependencies
COPY DemoDocsUI/package*.json ./
RUN npm install

# Copy frontend source
COPY DemoDocsUI/ ./

# Build frontend
RUN npm run build

# -------------------
# Stage 2: Build backend
# -------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

# Copy backend files
COPY DemoDocsAPI/*.csproj ./DemoDocsAPI/
RUN dotnet restore DemoDocsAPI/DemoDocsAPI.csproj

COPY DemoDocsAPI/ ./DemoDocsAPI/
# Copy built frontend into backend wwwroot
COPY --from=frontend-build /app/DemoDocsUI/dist/ ./DemoDocsAPI/wwwroot/

# Build backend
RUN dotnet publish DemoDocsAPI/DemoDocsAPI.csproj -c Release -o /app/publish

# -------------------
# Stage 3: Runtime image
# -------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app
COPY --from=build /app/publish .

# Expose port
EXPOSE 80

# Start the app
ENTRYPOINT ["dotnet", "DemoDocsAPI.dll"]
