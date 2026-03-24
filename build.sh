#!/bin/bash
set -e

echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Preparing backend..."
cd backend
npm install
cd ..

echo "Build complete! Run 'npm start' to start the server."
