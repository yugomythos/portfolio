# Alex Chen — Developer Portfolio

A fully responsive, animated portfolio website built with **pure HTML, CSS, and JavaScript** — zero frameworks, zero dependencies.

## ✨ Features

- **Dark / Light mode** toggle (persists via localStorage)
- **4 accent color themes** — Cyan, Green, Purple, Orange
- **Smooth scroll** with active nav highlighting
- **Fade-up + counter animations** on scroll
- **Typing effect** for dynamic hero role text
- **Custom mouse cursor** (desktop)
- **Project filter** by category (Full Stack / Frontend / Backend)
- **Animated skill bars**
- **Contact form** with full client-side validation
- **Blog section** for technical articles
- **Fully responsive** (Flexbox + CSS Grid + Media Queries)
- **Parallax orbs** following mouse movement

## 📁 Structure

```
portfolio/
├── index.html          # Main page (all sections)
├── css/
│   └── style.css       # All styles (tokens, themes, components)
├── js/
│   └── main.js         # All interactivity
└── README.md
```

## 🚀 GitHub Pages Deployment

### Step 1 — Create a GitHub Repository

```bash
git init
git add .
git commit -m "feat: initial portfolio"
```

Go to [github.com/new](https://github.com/new) and create a repo named:
- `yourusername.github.io` → for a user site at `https://yourusername.github.io`
- OR any name like `portfolio` → hosted at `https://yourusername.github.io/portfolio`

### Step 2 — Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose `main` branch, `/ (root)` folder
4. Click **Save**

Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO` in ~60 seconds!

### Step 4 — Automatic Deployments

Every `git push` to `main` will automatically redeploy your site.

```bash
# Make changes, then:
git add .
git commit -m "update: your change description"
git push
```

## 🎨 Customizing

### Personal Info
Edit `index.html`:
- Replace `Alex Chen` with your name
- Update bio, education, skills, projects, blog articles
- Add real GitHub/LinkedIn URLs to social links
- Replace the DiceBear avatar with your photo: `<img src="your-photo.jpg" />`

### Accent Colors
Add new themes in `css/style.css`:
```css
[data-accent="red"] { --accent: #f87171; --accent2: #991b1b; }
```
Then add a dot in `index.html`:
```html
<span class="accent-dot" data-accent="red"></span>
```

### Contact Form Backend (Java Spring MVC)
Replace the mock submission in `js/main.js`:
```javascript
// Replace the setTimeout mock with:
const res = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: form.name.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value
  })
});
if (!res.ok) throw new Error('Failed');
```

## 🛠 Tech Stack

| Layer     | Tech                                  |
|-----------|---------------------------------------|
| Markup    | HTML5                                 |
| Styling   | CSS3 (Custom Properties, Flexbox, Grid, Media Queries) |
| Scripting | Vanilla JavaScript (ES2020+)          |
| Fonts     | Google Fonts (Syne, Space Mono, DM Mono) |
| Avatar    | DiceBear API                          |
| Hosting   | GitHub Pages (free)                   |

## 📸 Screenshots

Open `index.html` in any modern browser — no build step required.

---

Built with ❤️ — pure web craft, no frameworks needed.
