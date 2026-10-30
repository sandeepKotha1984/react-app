# Employee Information Form

A simple React + Vite + TypeScript form with five fields and document upload.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Included features

- Five required fields: full name, email, phone, department and address
- Document upload: PDF, DOC and DOCX
- Client-side file extension and 5 MB size validation
- Reset and submit actions
- Responsive styling
- FormData prepared for future API integration

## Backend note

The current project validates the form in the browser and logs the submitted values to the developer console. It does not send data to a server or permanently store uploaded files. To persist submissions, connect the `FormData` in `src/App.tsx` to your backend API.
