
## Project Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/neyhathakur/Project-TitanOS.git
cd your-repo
```

### 2. Install Dependencies
npm install

### 3. Install Playwright
npx playwright install

---


## Test Case Summary


Add app to favourites
Located in: testing/src/functional/www/test.spec.ts
Description: Automates adding an app to favourites using keyboard navigation on Titanos.tv.

Full search and category navigation flow
Located in: testing/src/functional/www/test.spec.ts
Description: Performs a full search and navigates through category tabs, verifying expected UI elements and search counts.

Favourite apps management from Home Page
Located in: pages/www/home.page.ts
Description: Iterates the favourite apps list on the home page, performs long press keyboard actions to detect and remove removable apps or logs apps that cannot be removed.

Delete favourite apps from Home Screen
Located in: pages/www/home.page.ts (or the relevant test file)
Description: Simulates keyboard navigation to the Home Screen, performs long press on favourite apps to remove them, handling UI errors and validation gracefully.


All test locators are structured using Page Object Model under `pages/www/`.

---

## How to Run Tests

## Prerequisites
Node.js installed (version >= 14 recommended)
VS Code with Playwright Runner and Playwright Test Explorer extensions installed.

### Run All Tests
```bash
npx playwright test
```

### Generate and View HTML Report
```bash
npx playwright test
npx playwright show-report
```

---

## Folder Structure

PLAYWRIGHTTEST/
│
├── playwright-report/          # Test run HTML reports
├── test-results/               # Output of test/runs
│
├── testing/
│   └── src/
│       └── functional/
│           ├── TestData/             
│           └── www/
│               └── test.spec.ts       # Test files
│
├── pages/
│   └── www/
│       ├── apps.page.ts
│       ├── channel.page.ts
│       ├── home.page.ts
│       └── search.page.ts
│
├── playwright.config.js/ts      # Playwright config for project
├── package.json                 # Node.js dependencies
├── README.md                    # Project instructions and info


---

## Tools and Libraries

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)


## Example Output

[1/1] [chromium] › testing\src\functional\www\test.spec.ts:25:9 › Titanos tv E2E Test › Add app to home page f
[chromium] › testing\src\functional\www\test.spec.ts:25:9 › Titanos tv E2E Test › Add app to home page favourites from apps page
[2025-08-30T07:09:50.323Z] Successfully pinned the app to the Home Page favourites.
  1 passed (41.1s)

[1/1] [chromium] › testing\src\functional\www\test.spec.ts:42:9 › Titanos tv E2E Test › Search and category na
[chromium] › testing\src\functional\www\test.spec.ts:42:9 › Titanos tv E2E Test › Search and category navigation flow
Navigated to search URL: https://app.titanos.tv/search
Search result for 'crime' related to 'Movies' are 43
Search result for 'crime' related to 'TV Shows' are 14
Search result for 'crime' related to 'Apps' are 1
Search result for 'crime' related to 'Channels' are 3
Search result for 'crime' related to 'Games' are 2
Search result for 'crime' related to 'Sport' are 0
Search result for 'crime' related to 'YouTube' are 30
[2025-08-30T07:11:44.341Z] Search categories are available to use
  1 passed (44.8s)

[1/1] [chromium] › testing\src\functional\www\test.spec.ts:58:9 › Titanos tv E2E Test › Channel page navigatio
[chromium] › testing\src\functional\www\test.spec.ts:58:9 › Titanos tv E2E Test › Channel page navigation and player overlay validation with keyboard
Navigated to channels page
[2025-08-30T07:13:47.146Z] Channel page is available to use
  1 passed (18.9s)


[1/1] [chromium] › testing\src\functional\www\test.spec.ts:79:9 › Titanos tv E2E Test › Long-press Enter to re
[chromium] › testing\src\functional\www\test.spec.ts:79:9 › Titanos tv E2E Test › Long-press Enter to remove or log favourite apps using keyboard
Total favourite apps: 14
Processing app: Watch TV
Cannot remove app (no remove icon): Watch TV
Processing app: BBC Sounds
Remove icon visible for app: BBC Sounds
Attempt 1 to remove app: BBC Sounds
App 'BBC Sounds' still visible, retrying (attempt 2)...
Attempt 2 to remove app: BBC Sounds
App 'BBC Sounds' still visible, retrying (attempt 3)...
Attempt 3 to remove app: BBC Sounds
Failed to remove app 'BBC Sounds' after 3 attempts.
Switching app after failed delete for BBC Sounds
Processing new app after switch: BBC Sounds
Extra attempt 1 to remove app: BBC Sounds
App 'BBC Sounds' still visible, retrying (extra attempt 2)...
Extra attempt 2 to remove app: BBC Sounds
App 'BBC Sounds' still visible, retrying (extra attempt 3)...
Extra attempt 3 to remove app: BBC Sounds
Failed to remove app 'BBC Sounds' after extra 3 attempts.
Processing app: BBC iPlayer
Cannot remove app (no remove icon): BBC iPlayer
Processing app: Disney+
Cannot remove app (no remove icon): Disney+
Processing app: SWEET.TV
Cannot remove app (no remove icon): SWEET.TV
Processing app: Crunchyroll
Cannot remove app (no remove icon): Crunchyroll
Processing app: Internet browser
Cannot remove app (no remove icon): Internet browser
Processing app: YouTube
Cannot remove app (no remove icon): YouTube
Processing app: Prime Video
Cannot remove app (no remove icon): Prime Video
Processing app: DAZN
Cannot remove app (no remove icon): DAZN
Processing app: Oneplay
Cannot remove app (no remove icon): Oneplay
Processing app: Netflix
Cannot remove app (no remove icon): Netflix
Processing app: Red Bull TV
Cannot remove app (no remove icon): Red Bull TV
Processing app: Toon Goggles
Cannot remove app (no remove icon): Toon Goggles
Finished processing all favourite apps.