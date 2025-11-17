# Daily Stretch App – 骨盆前傾 Daily Reset

專為骨盆前傾（Anterior Pelvic Tilt）打造的每日伸展 App，完整收錄 Tone and Tighten YouTube 影片（[How To Fix Lower Back Pelvic Tilt Posture – PART ONE](https://youtu.be/mkbNJKiWNlI)）中的 5 個核心動作，搭配互動式示範、進度追蹤與提醒通知，幫助你在手機上建立穩定的矯正習慣。

## 特色

- ✅ **影片授權動作**：Hip Flexor Stretch、Lower Back Decompression、兩組 Lower Abs Strength 以及 Glute Bridge Pulses，皆附上影片時間戳。
- 🌀 **互動畫面示範**：每個動作都有簡易動畫，快速掌握動作感覺與發力方向。
- 📈 **每日完成度＋連續天數**：自動記錄每天完成狀態與 streak，幫助建立 21 天骨盆 reset 習慣。
- 🔔 **三段提醒時段**：內建晨間、午休、晚間提醒，一鍵排程本機推播（需授權通知）。
- ☁️ **Expo 一鍵部署**：開發與執行皆使用 Expo，支援 Android / iOS。

## 快速開始

```bash
cd daily-stretch-app
npm install        # 若尚未安裝依賴
npm run start      # 透過 Expo 啟動開發伺服器
```

1. 用手機安裝 [Expo Go](https://expo.dev/client)。
2. 掃描終端機或瀏覽器中的 QR code，即可在手機上即時預覽。

## 打包到手機

1. 確認已登入 Expo 帳號（`npx expo login`）。
2. 執行 `npx expo build:android` 產生 APK / AAB，或 `npx expo build:ios` 生成 iOS 測試版連結。
3. 依照 Expo 指示下載並安裝，就能每天直接開啟 App 進行伸展。

> **提醒**：若要讓提醒功能長期運作，請在裝置上允許通知權限，並保持 App 為最新版本。

## 檔案結構

```
daily-stretch-app/
├── App.js                 # 首頁、統計、整體版面
├── src/
│   ├── data/routine.js    # 動作資料 & 影片段落
│   ├── hooks/useDailyProgress.js
│   └── components/
│        ├── AnimatedDemo.js
│        ├── ExerciseCard.js
│        └── ReminderCard.js
└── README.md
```

歡迎依個人時程調整提醒時間、動作組數或加入 PART TWO 動作，打造最適合自己的骨盆 reset 方案。祝每日伸展順利！💪