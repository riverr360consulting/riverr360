# TROUBLESHOOTING: Extraction & Setup Issues

## Problem: "ENOENT: no such file or directory, open 'C:\riverr360\package.json'"

This means the files weren't extracted correctly or you're in the wrong directory.

## Solution: Proper Extraction Steps

### Option 1: Using Windows Built-in Extraction

1. **Locate the downloaded file**: `riverr360-consulting.tar.gz`

2. **Extract TWICE** (tar.gz is double-compressed):
   
   **First extraction** (removes .gz):
   ```
   Right-click riverr360-consulting.tar.gz
   → Extract All
   → Choose location
   ```
   This creates: `riverr360-consulting.tar`
   
   **Second extraction** (removes .tar):
   ```
   Right-click riverr360-consulting.tar
   → Extract All
   → Choose location
   ```
   This creates the folder: `riverr360-consulting`

3. **Navigate into the folder**:
   ```cmd
   cd riverr360-consulting
   ```
   
4. **Verify files exist**:
   ```cmd
   dir
   ```
   You should see:
   - package.json
   - README.md
   - app folder
   - components folder
   - etc.

5. **Run setup**:
   ```cmd
   npm install
   ```

### Option 2: Using 7-Zip (Recommended for Windows)

1. **Download 7-Zip** (free): https://www.7-zip.org/

2. **Right-click** `riverr360-consulting.tar.gz`
   → 7-Zip → Extract Here

3. **Right-click** the resulting `riverr360-consulting.tar`
   → 7-Zip → Extract Here

4. **Open the folder** and verify files

5. **Open Command Prompt** in that folder:
   - Hold Shift + Right-click in the folder
   - Select "Open PowerShell window here" or "Open command window here"

6. **Run**:
   ```cmd
   npm install
   ```

### Option 3: Using Command Line (Advanced)

```cmd
# Extract the tar.gz file
tar -xzf riverr360-consulting.tar.gz

# Navigate into folder
cd riverr360-consulting

# Verify you're in the right place
dir

# Install
npm install
```

## How to Verify You're in the Right Directory

Run this command:
```cmd
dir package.json
```

**If you see the file**: You're in the right place! ✅
**If you see "File Not Found"**: You're in the wrong directory ❌

## Common Mistakes

### ❌ Wrong: Being in parent directory
```
C:\Downloads> npm install
# This looks for C:\Downloads\package.json
```

### ✅ Correct: Being in project directory
```
C:\Downloads\riverr360-consulting> npm install
# This looks for C:\Downloads\riverr360-consulting\package.json
```

### ❌ Wrong: Renamed folder but files are missing
```
C:\riverr360> npm install
# Folder renamed but files weren't extracted into it
```

### ✅ Correct: Extract first, then rename if needed
```
1. Extract riverr360-consulting.tar.gz
2. You get: riverr360-consulting folder with all files
3. Optional: Rename folder to "riverr360"
4. cd into that folder
5. npm install
```

## Quick Fix Commands

If you're getting errors, try these in order:

```cmd
# 1. Check where you are
cd

# 2. Check if package.json exists in current directory
dir package.json

# 3. If not found, navigate to the correct folder
cd path\to\riverr360-consulting

# 4. Verify again
dir package.json

# 5. Now install
npm install
```

## File Structure You Should See

After extracting, you should have:

```
riverr360-consulting/
├── package.json          ← MUST BE HERE
├── README.md
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── ...
├── components/
│   ├── Header.tsx
│   └── ...
└── ...
```

## Still Having Issues?

### Check Node.js Installation
```cmd
node --version
npm --version
```

Both should return version numbers. If not:
- Download Node.js from: https://nodejs.org/
- Install LTS version
- Restart Command Prompt
- Try again

### Check File Permissions
- Make sure you have write permissions in the folder
- Try running Command Prompt as Administrator

### Start Fresh
```cmd
# Delete the extracted folder
# Re-download riverr360-consulting.tar.gz
# Extract using 7-Zip (recommended)
# Navigate into folder
# Verify package.json exists
# Run npm install
```

## Alternative: Manual File Download

If extraction keeps failing, I can provide files individually. Let me know!

---

**Need more help?** Take a screenshot of:
1. The error message
2. The output of `dir` command in your current directory
3. Share and I'll help troubleshoot!
