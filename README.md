# NovaWeb Studio — website

A free static website for a web-design and AI-automation studio, designed for GitHub + Cloudflare Pages.

## Files
- `index.html` — landing page, service offerings, starting prices and portfolio
- `styles.css` — responsive styling
- `script.js` — mobile navigation, portfolio filters and email form
- `studio-config.js` — contact email setting
- `demos/` — three **fictional** portfolio showcase pages

## Before accepting inquiries
Edit `studio-config.js` and replace the empty `contactEmail` with an address you own. The inquiry form prepares a message in a visitor's email program; it **does not** submit a request to a server. Without an email, it displays a clear warning and cannot send requests.

## Deploy free with Cloudflare Pages
1. Create a GitHub repository named `novaweb-studio`.
2. Upload all the files and the `demos` folder to the repository root.
3. In [Cloudflare Dashboard](https://dash.cloudflare.com), go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
4. Select the repository and production branch `main`.
5. Use framework preset **None**, no build command, and build output directory `/` (repository root).
6. Deploy. Cloudflare will supply a free `*.pages.dev` address; subsequent GitHub updates deploy automatically.

This is a **static** site. It does not run a server-based AI assistant, database or online payments.

## License & claims
Sample portfolio concepts are fictional and are clearly labeled as such. Replace placeholder contact details and independently verify business/legal claims before marketing commercially.
