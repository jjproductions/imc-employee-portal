# IMC Employee Portal - Quick Links Web Part

Custom SharePoint Framework (SPFx) web part for the IMC Employee Portal, providing quick access tiles for essential employee resources (Employee Handbook, My Benefits, Forms & Documents, Training & Development, Calendar, Staff Directory) and classic link rows.

## Features
- **Modern Tile Cards**: Pastel color-coded category cards with vector icons, descriptions, and interactive hover animations.
- **Container Query Responsive**: Automatically adapts layout across desktop, tablet, and mobile views depending on the SharePoint column section width.
- **Property Pane Configurable**: Custom section title, toggle between Modern Tiles and Classic Bracket links, open links in new tab, and configure each tile's title, subtitle, and URL directly from the SharePoint page editor.
- **Teams & SharePoint Supported**: Can be added as a SharePoint web part, full-page app, or Microsoft Teams tab.

## Used SharePoint Framework Version
SPFx v1.23.2 (React 17, TypeScript 5.8)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Local Development
```bash
npm run dev
# or: heft start --clean
```
Open your SharePoint hosted workbench:
`https://instituteofmusic.sharepoint.com/_layouts/workbench.aspx`

### 3. Build & Package for Deployment
```bash
npm run build
```
The deployable package is output to:
`sharepoint/solution/sharepoint-custom-links.sppkg`
Upload this `.sppkg` to the tenant SharePoint App Catalog.