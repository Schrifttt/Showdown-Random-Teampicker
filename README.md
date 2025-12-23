# Showdown Team Picker Extension

A custom Chrome extension that adds a **"🎲 Randomize Team"** button directly into the Pokémon Showdown interface. This tool helps you quickly swap between teams of the same tier without manually opening the team selection menu.

### **Features**
- **Native Integration:** Injects a button directly into the Main Menu and Challenge/Friendly windows.
- **Smart Filtering:** Automatically detects your current Tier (e.g., Gen 6 OU, Gen 8 Doubles OU) and only picks from matching teams.
- **Universal Support:** Works on the home screen, challenge dialogs, and friendly match requests.
- **Lightweight & Private:** Runs entirely in the browser's "Main World" to access local team data without external tracking.

### **How to Install**
1. **Download:** Click the green **Code** button and select **Download ZIP**.
2. **Extract:** Unzip the folder to a location on your computer.
3. **Developer Mode:** Open Google Chrome and navigate to `chrome://extensions/`.
4. **Load Unpacked:** - Enable the **Developer mode** toggle in the top-right corner.
   - Click the **Load unpacked** button.
   - Select the folder containing the extension files.
5. **Verify:** Open [Pokémon Showdown](https://play.pokemonshowdown.com). You should see the extension icon in your toolbar and a "Randomize Team" button under your team selector.

### **Usage**
- **Main Menu:** Select a format and click **Randomize Team** to swap between all teams you have built for that tier.
- **Challenges:** When challenging a friend or accepting a request, use the button to pick a random legal team for the agreed-upon format.

### **About**
Created by **Tricknology**.  
[View Smogon Profile](https://www.smogon.com/forums/members/trickery-and-deception.583025/)

### **Privacy**
This extension does not collect, store, or transmit any user data. It functions by reading the `showdown_teams` key in your browser's LocalStorage and interacting with the page's internal Room objects.
