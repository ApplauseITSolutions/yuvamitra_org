@echo off
echo Creating upload package for Azure Storage...

REM Create a new folder for Azure upload
if exist "azure-upload" rmdir /s /q "azure-upload"
mkdir "azure-upload"
mkdir "azure-upload\assets"

REM Copy the essential files
copy "static-deploy\index.html" "azure-upload\"
copy "static-deploy\assets\index-C7xnqRHX.css" "azure-upload\assets\"
copy "static-deploy\assets\index-N5QZp92f.js" "azure-upload\assets\"

echo Done! Files ready for upload in 'azure-upload' folder
echo.
echo Upload these files to Azure Storage:
echo 1. Upload index.html to $web container (root)
echo 2. Upload assets folder contents to $web/assets/
echo.
pause