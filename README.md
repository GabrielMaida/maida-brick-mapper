# 🧱 Maida Brick Mapper

A lightweight, open-source desktop application that adds full **Mouse & Keyboard** support (including 360° MouseLook free camera rotation) to classic and mid-era LEGO PC games.

> **Disclaimer:** This is an unofficial community-driven project aimed at improving accessibility and gameplay. It is not affiliated with, endorsed by, or connected to The LEGO Group, TT Games, or Warner Bros. Games.

---

## 🎯 The Problem We Solve

Most PC ports of the LEGO franchise released between 2012 and 2018 were designed strictly for gamepads, completely ignoring mouse input. Players without controllers are forced to manage the camera and attack using uncomfortable keyboard layouts.

**Maida Brick Mapper** solves this through a straightforward horizontal interface: select your platform (Steam, GOG, or Epic Games), click the desired game icon, and play with seamless mouse and scroll support.

---

## ✨ Key Features

* **360° Camera (MouseLook):** Converts X and Y mouse movements into smooth, continuous camera rotation in open-world areas.
* **Mapped Clicks and Scroll:**
  * **Left Mouse Button:** Attack / Action (Mapped to H)
  * **Right Mouse Button:** Special / Build (Mapped to J)
  * **Scroll Up / Down:** Quick character swap (LShift / LCtrl) with an intelligent cooldown to prevent accidental double-skips.
* **Strict Focus Isolation (WinActive):** Mouse mapping only operates when the game window is active in the foreground. If you press Alt+Tab or close the game, your mouse instantly reverts to normal Windows behavior.
* **Individual Game Profiles (JSON):** Adjust mouse sensitivity, return speed, and executable paths for each game independently.
* **Automatic & Manual Detection:** Automatically searches standard Steam, GOG, and Epic Games directories, with a fallback for manual .exe selection.

---

## 🏗️ Technical Architecture

* **Core / Backend:** Rust (process management, JSON configuration parsing, and directory detection).
* **Desktop Framework:** Tauri (native rendering via WebView2 with minimal RAM footprint).
* **Frontend:** HTML5, CSS3, and Vanilla TypeScript (with i18next for localization).
* **Input Engine:** AutoHotkey v2 (triggered automatically in the background by the Rust backend).

---

## ⚠️ Important Usage Notes

1. **Windows Defender SmartScreen Warning:** Because this is a free community project without a paid commercial digital certificate, Windows may show a "Windows protected your PC" alert on the first launch. Click **More info** and then **Run anyway**.
2. **Linear Levels vs. Open World:** In TT Games titles, some story missions lock the camera to cinematic 2.5D angles by default. The 360° mouse rotation works freely whenever the game engine releases camera control (e.g., in open-world hub areas).
3. **Borderless Windowed Mode:** In older DirectX 9 ports, "Exclusive Fullscreen" can force-lock the cursor centering. If you experience camera stuttering, switch the game to **Windowed** or **Borderless Windowed** in the video options.
4. **Player 2 Conflicts:** Ensure Player 2's keys in the game menu are mapped exclusively to the Numpad to prevent mouse commands from triggering split-screen mode accidentally.

---

## ⚖️ License and Commercial Use Restriction

The source code and interface of **Maida Brick Mapper** are licensed under the **[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](./LICENSE)**.

* **Allowed:** Download, use for free, study the code, create forks, and distribute modified versions to the community (keeping the same license and author credits).
* **Prohibited:** Any commercial use or sale of this software, its code, or derivative versions.
* The **AutoHotkey v2** interpreter used for input scripts is an independent component distributed under the **GNU General Public License v2.0 (GPLv2)**.