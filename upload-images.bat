@echo off
echo Creating image upload package for Azure Storage...

REM Create a new folder for image uploads
if exist "azure-images" rmdir /s /q "azure-images"
mkdir "azure-images"
mkdir "azure-images\assets"

REM Copy all image files from static-deploy/assets to azure-images/assets
xcopy "static-deploy\assets\*.png" "azure-images\assets\" /Y
xcopy "static-deploy\assets\*.jpg" "azure-images\assets\" /Y
xcopy "static-deploy\assets\*.jpeg" "azure-images\assets\" /Y
xcopy "static-deploy\assets\*.webp" "azure-images\assets\" /Y
xcopy "static-deploy\assets\*.pdf" "azure-images\assets\" /Y

echo Done! All images ready for upload in 'azure-images\assets' folder
echo.
echo Now upload all files from 'azure-images\assets' to Azure Storage $web/assets/ folder
echo.
pause