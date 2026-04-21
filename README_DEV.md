# 🚀 React Native / Expo / EAS Commands Cheat Sheet

---

## 📦 Install dependencies
npm install

---

## ▶️ Run Expo
npx expo start

### Clear cache
npx expo start -c

---

## 🤖 Run Android Emulator
npx expo start --android

---

## 📱 Run iOS (Mac only)
npx expo start --ios

---

## 🧹 Clean Project

### Delete node_modules
rm -rf node_modules

### Delete lock file
rm -rf package-lock.json

### Reinstall everything
npm install

---

## 🔥 Full clean reset (IMPORTANT)
rm -rf node_modules package-lock.json .expo
npm install
npx expo start -c

---

## 📦 EAS Setup

### Install EAS CLI
npm install -g eas-cli

### Login
eas login

### Configure project
eas build:configure

---

## 🤖 Build Android APK

### Build APK (preview profile)
eas build -p android --profile preview

---

## 🤖 Build Android AAB (Play Store)
eas build -p android --profile production

---

## 📥 Check build status
eas build:list

---

## 📦 Download build
eas build:view

---

## 🔐 Fix permissions / login issues
eas logout
eas login

---

## 🧾 Check installed packages
npm ls

---

## 🔍 Check specific package
npm ls @react-navigation/native

---

## 🧹 Fix dependency issues
rm -rf node_modules package-lock.json
npm install

---

## ⚠️ Fix Metro / bundler errors
npx expo start -c

---

## 📁 Git Commands

### Check current repo
git remote -v

### Change origin
git remote set-url origin NEW_URL

### Remove origin
git remote remove origin

### Add new origin
git remote add origin NEW_URL

### Push code
git push -u origin main

---

## 🚫 Remove ignored files (after updating .gitignore)
git rm -r --cached node_modules
git rm -r --cached .expo
git commit -m "clean ignored files"

---

## 🧠 Useful Tips

- Always run `npx expo start -c` after fixing errors
- Use `preview` profile for APK
- Use `production` for Play Store
- If error is weird → CLEAN RESET 🔥

---

## ✅ Done