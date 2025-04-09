# MelodyCheck

**MelodyCheck** is a web application designed to manage concert events. Users can create events and add candidate participants. These candidates receive an email invitation and can manage their arrival time for the concert. This feature provides better clarity for event organizers, helping them plan more effectively.

Organizers have access to a variety of features such as:
- Sharing tables to track who will attend
- Custom forms filled out by candidates
- Bulk import of candidates via CSV
- Export of all candidates from an event
- Customization of email templates sent to candidates

The app supports different types of registered users based on usage tiers. A basic account allows the creation of one event, while an advanced account supports managing multiple events concurrently. This makes melody-check a robust and database-intensive web application.

## Project Structure

### Frontend Architecture

The frontend is built entirely with vanilla JavaScript, avoiding popular frameworks. It uses a modular architecture, where every element functions independently. Components are introduced to maintain code clarity and are recognizable by the `C` prefix (e.g., `CInputs`, `CContents`, `CDatabase`).

- **CInputs**: Manages button elements with predefined behaviors (clicks, etc.)
- **CContents**: Handles data processing and rendering into DOM elements
- **CDatabase**: Fetches and transforms data from the backend for easy manipulation in code

All components are located in the `components` folder, categorized into subfolders based on their function.

### Elements

Custom elements form the core of the application and operate in a modular fashion. They can be reused for different purposes and may resemble React components in concept. However, unlike React, there’s no frequent re-rendering or use of hooks. Elements are typically rendered once, and dynamic changes are made via logic found in `CContents`.

### Core

Helper functions and utility scripts are stored in `Core` classes. These are mostly static and act as singletons. Some scripts use metaprogramming through JavaScript prototypes to extend native types like strings with custom methods.

New developers should review `routes.js`, which handles rendering HTML pages based on URL hash fragments. These HTML files are pre-imported as raw files and stored in a public `PAGES` object.

### Packages

Packages work similarly to elements but are designed for consistent modular reuse across different projects. Some interact with the Core using singleton patterns.

The most essential package is `template-rjs-0.1.1`, which includes the `elm-priority-routes` element. This is injected into the main `index.html` and renders pages based on URL hash (e.g., `#signin` loads `signin.html`).

### Routing

The `routes.js` script searches the `PAGES` object for a hash name. If not found, it renders `error.html`. Page priorities are defined in `routes.json` in the `src/json` folder. Higher priority pages load by default, while negative priority pages are hidden or serve as fallbacks.

### Other Folders in `src`

Additional folders in `src` improve organization:
- `css`, `html`, `js`, `rb` folders for respective file types
- `root` contains RubyJS-Vite-related Ruby files and serves as the root entry point for transpilation

Localization is supported. Translations are stored in JSON format (e.g., `cs.json` for Czech). When creating new hash-based routes, be sure to define a corresponding title in this file.

### Folder Overview

```txt
src
├── css
├── html
├── js
│   ├── components
│   ├── core
│   ├── elements
│   └── packages
├── json
├── rb
│   ├── components
│   ├── core
│   ├── elements
│   └── packages
└── root
```

## Scripts and Development Workflow

This project supports both JavaScript and Ruby syntax, thanks to RubyJS-Vite, which transpiles Ruby into JavaScript. JS files remain readable and are auto-generated. This dual-syntax approach allows flexibility for developers.

Developers can choose to write in either JS or Ruby. To use the RubyJS environment, run the `bin/server` script, which launches both Vite and RubyJS tools.

### Essentials

Check out `elements.js` to see the definition of custom DOM elements, each prefixed with `elm-`. These elements usually integrate their own components for handling inputs, content, and database interactions, supporting clean, modular coding.

## API

The project includes its own API hosted on Vercel. Server-side logic (using Vercel functions) handles sensitive operations, including the use of third-party services with API keys hidden in environment variables (ENV). These keys must be set correctly on Vercel for the application to function properly.

## JavaScript Packages

The project uses several third-party JS libraries:

- `bootstrap-icons` – for icon rendering
- `crypto-js` – for data encryption
- `node-mailjet` – for email sending
- `papaparse` – for handling CSV files

## Running the Project

To run the project locally, use the following commands:

```bash
npm install
npm run dev
```

This will install all dependencies and launch the development server using Vite.

## Repository Status

> ⚠️ **This repository is archived.**
>
> No further development or maintenance is planned. Use the codebase as-is or fork it if you wish to build upon it.
