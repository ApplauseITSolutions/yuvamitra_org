@echo off
echo Creating proper folder structure for Azure Storage...

REM Create a new folder for proper upload structure
if exist "azure-proper-structure" rmdir /s /q "azure-proper-structure"
mkdir "azure-proper-structure"
mkdir "azure-proper-structure\assets"
mkdir "azure-proper-structure\assets\Images"
mkdir "azure-proper-structure\assets\Images\Sdg"

REM Copy SDG images to proper nested folder
if exist "public\assets\Images\Sdg\*" (
    copy "public\assets\Images\Sdg\*.png" "azure-proper-structure\assets\Images\Sdg\"
    echo SDG images copied from public folder
) else (
    echo SDG images not found in public folder
)

echo Done! Proper folder structure created in 'azure-proper-structure'
echo.
echo Upload the entire 'assets' folder from 'azure-proper-structure' to Azure Storage
echo This will create the proper nested folder structure: /assets/Images/Sdg/
echo.
pause