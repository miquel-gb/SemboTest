@echo off

echo "Starting app deployment..."

cd sembo-frontend

echo "Building frontend app..."

call npm install

call npm run build

echo "Frontend succesfully built."
echo .

cd ..
cd node-server

echo "Building server..."

call npm install

call node index.js