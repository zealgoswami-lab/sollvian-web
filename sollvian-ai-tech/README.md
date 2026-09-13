# Sollvian AI Tech

Unzip this folder, then start the site.

```bash
unzip sollvian-ai-tech.zip
cd sollvian-ai-tech
npm start
```

Open http://127.0.0.1:43147

Node 18+ is enough. No `npm install`.

Horizontal line: **Home · Product · Contact**

| File | What it is |
| --- | --- |
| `server.js` | Node server and `/api/contact` |
| `public/` | The page, styles, hub image |
| `package.json` | `npm start` |

The contact form posts to `/api/contact`. There is no mail backend: the server checks the note and prints it in the terminal.
