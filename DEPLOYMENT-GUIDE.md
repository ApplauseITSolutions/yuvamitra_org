# Complete Azure Static Website Deployment Guide

## Overview
This guide shows how we successfully deployed the Yuva Mitra React website to Azure Storage Static Website hosting.

## Final Result
**Website URL:** https://yuvamitrastatic.z29.web.core.windows.net

---

## STEP 1: Build the React Application

### 1.1 Install Dependencies
```bash
npm install
```

### 1.2 Build for Production
```bash
npm run build
```
- This creates a `dist` folder with optimized production files
- Contains `index.html`, CSS, JS, and image assets

### 1.3 Create Static Deploy Folder
```bash
# Copy dist contents to static-deploy folder for deployment
xcopy dist static-deploy /E /I
```

---

## STEP 2: Create Azure Storage Account

### 2.1 Create Storage Account
1. Go to **Azure Portal** → **Storage accounts**
2. Click **+ Create**
3. Fill in details:
   - **Resource Group:** Choose or create new
   - **Storage Account Name:** `yuvamitrastatic` (must be unique)
   - **Region:** Choose nearest region
   - **Performance:** Standard
   - **Redundancy:** LRS (Locally Redundant Storage)
4. Click **Review + Create** → **Create**

### 2.2 Enable Static Website
1. In the Storage Account, go to **Settings** → **Static website**
2. Click **Enabled**
3. Set **Index document name:** `index.html`
4. Set **Error document path:** `index.html`
5. Click **Save**
6. **Note the Primary endpoint URL** (this will be your website URL)

---

## STEP 3: Upload Website Files

### 3.1 Access Storage Browser
1. In Storage Account, go to **Data storage** → **Storage browser**
2. Click **Blob containers**
3. Click on **$web** container (auto-created when static website enabled)

### 3.2 Upload Main HTML File
1. Click **Upload** button
2. Select `static-deploy/index.html`
3. Upload to root (no folder specified)

### 3.3 Create Assets Folder Structure
1. Click **Upload** button
2. Select `static-deploy/assets/index-C7xnqRHX.css` and `static-deploy/assets/index-N5QZp92f.js`
3. Set **Upload to folder:** `assets`
4. Click Upload

### 3.4 Upload All Asset Images
1. Click **Upload** button
2. Select ALL files from `static-deploy/assets/` folder (219 files total)
3. Set **Upload to folder:** `assets`
4. Click Upload

### 3.5 Create Nested Image Folders
1. Inside **assets** folder, click **Add Directory**
2. Create folder named: `Images`
3. Inside **Images** folder, click **Add Directory**
4. Create folder named: `Sdg`

### 3.6 Upload SDG Images
1. Navigate to `assets/Images/Sdg/` folder
2. Click **Upload**
3. Select SDG images from `public/assets/Images/Sdg/`:
   - E-WEB-Goal-01.png
   - E-WEB-Goal-02.png
   - E-WEB-Goal-03.png
   - E-WEB-Goal-04.png
   - E-WEB-Goal-05.png
   - E-WEB-Goal-06.png
   - E-WEB-Goal-08.png
   - E-WEB-Goal-09.png
   - E-WEB-Goal-10.png
   - E-WEB-Goal-13.png
   - E-WEB-Goal-15.png
   - E-WEB-Goal-16.png
4. Click Upload

### 3.7 Upload Additional Images
1. Navigate to `assets/Images/` folder
2. Upload from `public/assets/Images/`:
   - about_farmer.png
   - donate_save.png
   - reach_map.png

### 3.8 Upload Favicon
1. Navigate back to **$web** root
2. Click **Upload**
3. Select `static-deploy/favicon.svg`
4. Upload to root (no folder)

---

## STEP 4: Final File Structure in Azure Storage

```
$web/
├── index.html
├── favicon.svg
└── assets/
    ├── index-C7xnqRHX.css          ← Critical CSS file
    ├── index-N5QZp92f.js           ← Critical JS file
    ├── [219 image files...]         ← All other images
    └── Images/
        ├── about_farmer.png
        ├── donate_save.png
        ├── reach_map.png
        └── Sdg/
            ├── E-WEB-Goal-01.png
            ├── E-WEB-Goal-02.png
            ├── E-WEB-Goal-03.png
            ├── E-WEB-Goal-04.png
            ├── E-WEB-Goal-05.png
            ├── E-WEB-Goal-06.png
            ├── E-WEB-Goal-08.png
            ├── E-WEB-Goal-09.png
            ├── E-WEB-Goal-10.png
            ├── E-WEB-Goal-13.png
            ├── E-WEB-Goal-15.png
            └── E-WEB-Goal-16.png
```

---

## STEP 5: Test and Verify

### 5.1 Test Website
1. Visit the **Primary endpoint URL** from Step 2.2
2. Verify:
   - ✅ Website loads (not blank page)
   - ✅ CSS styling applied
   - ✅ JavaScript functionality works
   - ✅ All images display correctly
   - ✅ SDG images in footer display
   - ✅ Favicon shows in browser tab

### 5.2 Check Browser Console
1. Open **F12 Developer Tools** → **Console**
2. Verify no 404 errors for missing files
3. All resources should load successfully

---

## TROUBLESHOOTING COMMON ISSUES

### Issue 1: Blank Page
**Cause:** Missing CSS/JS files in assets folder
**Solution:** Upload `index-C7xnqRHX.css` and `index-N5QZp92f.js` to `assets/` folder

### Issue 2: Images Not Loading (404 errors)
**Cause:** Missing image files or incorrect folder structure
**Solution:** Upload all images from `static-deploy/assets/` to `$web/assets/`

### Issue 3: SDG Images Not Loading
**Cause:** Missing nested folder structure `assets/Images/Sdg/`
**Solution:** Create nested folders and upload SDG images to correct path

### Issue 4: Favicon Error
**Cause:** HTML references external favicon from old WordPress site
**Solution:** 
1. Update HTML to reference local `/favicon.svg`
2. Upload favicon.svg to $web root

---

## DEPLOYMENT SUMMARY

**What We Built:**
- React website with Vite build system
- Converted from PHP contact form to Node.js (ready for future backend deployment)
- Optimized for static hosting

**What We Deployed:**
- Static HTML/CSS/JS files to Azure Storage
- All image assets with proper folder structure
- Favicon for proper browser display

**Final Status:**
- ✅ Website fully functional
- ✅ All images displaying correctly
- ✅ Fast loading times (CDN delivery)
- ✅ Cost-effective hosting solution
- ✅ Ready for production use

**Next Steps (Optional):**
- Set up custom domain
- Deploy contact form as Azure Function
- Add SSL certificate (if using custom domain)
- Set up CDN for global performance

---

**Website URL:** https://yuvamitrastatic.z29.web.core.windows.net
**Deployment Date:** January 18, 2025
**Status:** ✅ LIVE AND WORKING