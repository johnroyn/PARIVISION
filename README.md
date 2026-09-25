<<<<<<< HEAD
# 👁️‍🗨️ PARIVISION - Team App Guide

Welcome to the **PARIVISION** team project! We are a 6-member Dota 2 esports app team.

---

## 🛠️ STEP 0: Install Git First! (Crucial)

Before you can type any commands, your computer needs to understand what `git` means. If you haven't installed it yet, do this first:

1. Go to the official download page: [://git-scm.com](https://git-scm.com)
2. Download the installer for your computer (Windows or Mac).
3. Open the installer file and just click **Next** through all the settings (the default options are perfect).
4. **CRUCIAL:** Close your VS Code completely and reopen it. If you don't restart VS Code, it won't realize you just installed Git!

---

## 🍌 PART 1: How to Download the App to Your PC (First Time Only)

Think of our project like a shared Lego set. Right now, the Lego set is sitting online on GitHub. You need to download a copy of it to your computer so you can add your own pieces.

Open your terminal window inside an empty folder and type these **3 commands**, pressing **Enter** after each one:

### 1. Download the Lego Set

This grabs the project from the internet and puts it into a folder on your computer.

```bash
git clone https://github.com
cd PARIVISION
```

### 2. Install the Missing Parts

When we send code to GitHub, we leave out the heavy background files to keep things fast. This command downloads all those missing files.
⚠️ **NEVER TYPE `npm audit fix --force`!** It will break the app.

```bash
npm install
```

### 3. Turn on the App

This boots up your local testing website. It will give you a link (like `localhost:8081`). Open that link inside your **Brave** browser to see the app running live!

```bash
npx expo start
```

---

## 🌿 PART 2: The Golden Rules of Multi-Player Coding (For All 6 Members)

Imagine 6 people trying to draw on the exact same piece of paper at the same time. It would be a messy disaster.

In Git, the main paper is called **`main`**. We NEVER draw directly on `main`. Instead, everyone must make a copy of the paper, draw their page on their copy, and send it back.

Here is what you must do every single time you work:

### Step 1: Grab Today's Fresh Paper

Before you write any code, download whatever your teammates finished yesterday so your computer is updated:

```bash
git checkout main
git pull origin main
```

### Step 2: Make Your Own Personal Workspace (Branch)

This command splits you off into your own safe bubble. Give it a name based on your position role:

```bash
# Example for Position 2: git checkout -b pos2
git checkout -b pos2
```

### Step 3: Write Your Code and Save It

Open VS Code, go to your page file, and write your profile details. Test it in your Brave browser to make sure it looks good. When you are done, save your work and send your bubble up to GitHub:

```bash
git add .
git commit -m "Added my profile information"
git push origin pos2
```

_(Change `pos2` to whatever name you chose in Step 2)._

---

## OKAY PART 3: How Team Leader John Combines the Pages Together

Once a teammate pushes their bubble up to GitHub, their code is safe online, but it isn't connected to the main app dashboard yet. John (The Leader) must combine them on the website:

1. **Go to GitHub:** Open `https://github.com` in your browser.
2. **Look for the Yellow Box:** A bright yellow banner will pop up saying your teammate just pushed code. Click the green **"Compare & pull request"** button next to it.
3. **Click Create:** Click **"Create pull request"**. This tells GitHub to double-check that the code won't crash.
4. **The Big Green Button:** Scroll down and click the green **"Merge pull request"** button, then click **"Confirm"**.

**BOOM!** Your teammate's page is now officially part of the main app.

Tell the rest of the team to run `git checkout main` and `git pull origin main` on their computers, and your teammate's new profile card will magically show up on their screens too!
=======
# Welcome to your Expo app hehe

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
>>>>>>> 7c9249d161628b965147dd0380b39c2095dce8d9
