# WordBog Privacy Policy

WordBog is built so there is nothing to collect. This page explains exactly
what the app does and does not do with your information.

## What WordBog does not do

- **No data collection.** No accounts, no analytics, no advertising SDKs, no
  trackers. Nothing is sent to the developer.
- **No photos leave your device.** The photo solver runs entirely on your
  device using Apple's Vision framework. Photos are held in memory only —
  they are never saved to disk by WordBog and never uploaded.
- **No network requests.** The dictionary is bundled in the app. WordBog
  itself never connects to a server.

## What stays on your device

- **Game history, saved boards, and Daily Bog results** are stored locally
  with SwiftData and never leave the device. You can delete them at any
  time from the History and Saved tabs.
- **Settings** (sounds, haptics, dictionary choice) are stored locally.
- **Crash diagnostics**, if Apple's MetricKit produces them, stay on your
  device unless you explicitly share them from Settings → Diagnostics.

## Multiplayer

- **Nearby matches** use Apple's MultipeerConnectivity over your local
  network, encrypted. While you host a nearby match, your device's name
  (e.g. "Greg's iPhone") is visible to other WordBog players on the same
  network so they can find your match. It never leaves your local network.
- **Online matches and Daily Bog standings** use Apple's Game Center. If
  you choose to play online or submit a score, Apple's Game Center service
  handles matchmaking and shows your Game Center display name to other
  players, exactly as it does for every Game Center game. That name is
  processed by Apple under Apple's own privacy policy; the developer
  receives nothing.

## Contact

Questions about this policy: see the [support page](https://gregnazario.github.io/wordbog-pages/).
