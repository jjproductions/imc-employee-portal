# IMC Employee Portal - SharePoint Framework (SPFx) Web Parts

A client-side solution for the **Institute of Music for Children (IMC) Employee Portal**, containing custom SharePoint Framework (SPFx) web parts designed for SharePoint Online and Microsoft Teams.

---

## Included Web Parts

### 1. IMC-Hero Banner (`imcHero`)
A modern hero banner designed to match the IMC Portal branding and layout, featuring smooth image blending, customizable typography, and flush section alignment.

* **3 Configurable Text Rows**:
  * **Row 1 (Overline / Tagline)**: Clean, letterspaced overline with accent dot (default: `EMPLOYEE RESOURCE CENTER`).
  * **Row 2 (Main Headline)**: High-impact title with balanced wrapping (default: `Together Through Music`).
  * **Row 3 (Description)**: Refined supporting text for policies, benefits, and portal resources.
* **Seamless Dual-Layer Image Blending**:
  * An overlapping image layer (68% width bleed) combined with a multi-stop color gradient wash and dynamic CSS `mask-image` feathering.
  * Ensures the image and background color blend smoothly into each other with zero vertical seam lines.
* **Branding & Colors**:
  * Configurable background color (defaults to `#e6edf8`, sampled from the IMC design specifications).
  * Configurable accent color (defaults to `#0d2755` IMC Navy).
  * Automatic contrast detection (`auto`, `dark`, or `light` text modes).
* **Mission Highlights**:
  * Optional IMC mission point chips with vector icons:
    * 👥 *Support Our Community*
    * 🎵 *Empower Young People*
    * ❤️ *Make a Lasting Impact*
* **Call-to-Action (CTA)**:
  * Optional primary button with hover micro-animations, link target, and new tab toggles.
  * Optional secondary glass/outline button.
* **Layout & Imagery**:
  * Switchable panel arrangement: **Text on Left, Image on Right** vs. **Image on Left, Text on Right**.
  * Embedded high-resolution IMC photo (`imc-dance-pose.jpeg`) with zero-config rendering, plus custom Image URL override support.
  * Height presets: Compact (`300px`), Standard (`380px`), and Spacious (`480px`).
* **Inter-WebPart Spacing Control**:
  * Configurable **Spacing Below Banner** property (`flush`, `tight`, `none`, `normal`).
  * Default `flush` setting (`margin-bottom: -24px`) neutralizes SharePoint's default canvas control zone gap, allowing the banner to sit directly against the Quick Links grid below.

---

### 2. IMC-Quick Links (`customLinks`)
A quick-access grid for essential employee resources with customized category styling.

* **Modern Tile Cards**: Pastel color-coded category cards with vector icons, descriptions, and interactive hover elevation:
  * 📘 **Employee Handbook** (Policies, procedures & shared values)
  * 🩺 **My Benefits** (Health, wellness & financial resources)
  * 📄 **Forms & Documents** (PTO requests, expense reimbursements)
  * 🎓 **Training & Development** (Skills & professional growth)
  * 📅 **Calendar** (Holidays, events & important dates)
  * 👥 **Staff Directory** (Team contacts & communication)
* **Classic Bracket Links Mode**: Alternate layout style for compact link lists.
* **Container Query Responsive**: Fluid CSS container queries (`@container`) adapt the grid from 6 columns down to 3, 2, and 1 columns depending on SharePoint section width.
* **Zero Top Padding**: Optimized to sit flush beneath the IMC-Hero Banner when placed in the same column section.
* **Configurable Data**: Individual tile titles, subtitles, URLs, or custom JSON data feed.

---

## Tech Stack & Versions

* **SharePoint Framework (SPFx)**: `v1.23.2`
* **UI Framework**: React `17.0.1` & React DOM `17.0.1`
* **Language**: TypeScript `~5.8.0`
* **Build Tooling**: Rushstack Heft `1.2.17` & Webpack `5.105.4`
* **Styling**: SCSS Modules with CSS Container Queries (`@container`) & Flexbox

---

## Project Structure

```text
employeeportal/
├── config/                      # SPFx build and bundle configurations
│   ├── config.json              # Web part bundles & localized resources
│   ├── package-solution.json    # Solution package manifest & GUIDs
│   └── serve.json               # Hosted workbench URL
├── src/
│   ├── data/                    # Static image assets (imc-dance-pose.jpeg)
│   └── webparts/
│       ├── customLinks/         # IMC-Quick Links Web Part
│       │   ├── components/      # React components, SCSS modules, icons
│       │   └── loc/             # Localized strings
│       └── imcHero/             # IMC-Hero Banner Web Part
│           ├── components/      # Hero component, default image, SCSS modules
│           └── loc/             # Localized strings
├── teams/                       # Microsoft Teams manifest icons
└── sharepoint/solution/         # Generated .sppkg deployment packages
```

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Local Development
Start the local Heft development server:
```bash
npm run dev
# or: heft start --clean
```
Open your tenant hosted workbench:
```text
https://instituteofmusic.sharepoint.com/_layouts/workbench.aspx
```

### 3. Build & Package for Production
Build, test, and package the solution into a `.sppkg` file:
```bash
npm run build
```
The deployable package is generated at:
```text
sharepoint/solution/sharepoint-custom-links.sppkg
```
Upload this package to your tenant **SharePoint App Catalog** (`Manage Apps`) and deploy globally or to specific site collections.