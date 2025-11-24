# PWA Testing Guide

## Prerequisites
✅ **Production build completed** - PWA features only work in production mode

## How to Test

### 1. Start Production Server

```bash
npm run build  # You've already done this!
npm start      # Start production server
```

The app will run on `http://localhost:3000`

### 2. Test Offline Functionality

**Desktop (Chrome/Edge):**
1. Open DevTools (F12)
2. Go to **Application** tab → **Service Workers**
3. You should see `sw.js` registered
4. Check "Offline" checkbox
5. Refresh the page - it should still load!

**Mobile:**
1. Open the app in your mobile browser
2. Turn on Airplane Mode
3. The app should continue working (loading cached data)

### 3. Test Install Prompt

**Android (Chrome):**
1. Visit `http://localhost:3000` (or your deployed URL)
2. Look for the custom **"Install App"** banner at the bottom
3. Click "Install" - the app will be added to your home screen
4. Open from home screen - it looks like a native app!

**Desktop (Chrome/Edge):**
1. Look for install icon in the address bar
2. Or use our custom prompt if it appears
3. Install and launch from taskbar/desktop

**iOS (Safari) - Manual:**
1. Tap the Share button
2. Scroll and tap "Add to Home Screen"
3. Name it and tap "Add"

### 4. Test Haptic Feedback

**Mobile Only:**
1. Open the Kanban board (`/dashboard/kanban`)
2. Tap on any order card - you should feel a light vibration
3. Tap the arrow buttons - each tap vibrates

**Note:** Haptic feedback requires a physical device. Won't work on desktop browsers.

### 5. Test Biometric Login

**Mobile/Desktop with biometrics:**
1. Go to the home page
2. Click "Quick Login" button
3. The biometric prompt should appear (currently simulated)

**Note:** For real FaceID/TouchID, you need proper WebAuthn server setup.

---

## Verification Checklist

- [ ] Service Worker registered (check DevTools → Application)
- [ ] App works offline
- [ ] Install prompt appears and works
- [ ] Haptic feedback works on mobile
- [ ] All pages load correctly in production
- [ ] Notifications (test with real API keys if configured)

##  Deployed Testing

For full PWA testing, deploy to:
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`

PWAs require HTTPS in production (localhost is exempt).
