# Salesforce Website

A modern, responsive website for Salesforce SMB (Small and Medium Business) landing page built with HTML, SCSS, and JavaScript using Vite.

## 🚀 Features

- ✅ Fully responsive design with 11 breakpoints
- ✅ Modern SCSS with nested structure
- ✅ Fast development with Vite
- ✅ Interactive JavaScript components
- ✅ SEO optimized
- ✅ Clean and maintainable code structure

## 📁 Project Structure

```
salesforce/
├── assets/              # Static assets
│   ├── images/         # Image files
│   ├── icons/          # Icon files
│   ├── fonts/          # Custom fonts
│   └── videos/         # Video files
├── css/                # Stylesheets
│   ├── style.scss      # Main SCSS file (nested structure)
│   └── variable.scss   # SCSS variables
├── js/                 # JavaScript files
│   └── main.js         # Main JavaScript entry point
├── index.html          # Main HTML file
├── vite.config.js      # Vite configuration
├── package.json        # NPM dependencies
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **SCSS** - CSS preprocessor with nested syntax
- **JavaScript (ES6+)** - Modern JavaScript
- **Vite** - Fast build tool and dev server
- **Node.js** - Runtime environment

## 📦 Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd salesforce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173/`

## 🏗️ Build

Build for production:

```bash
npm run build
```

The optimized files will be in the `dist/` folder.

## 👀 Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📱 Responsive Breakpoints

The website is fully responsive with the following breakpoints:

| Breakpoint | Size | Description |
|------------|------|-------------|
| `$too-small-mobile` | 320px | Very small mobile devices |
| `$mid-small-mobile` | 340px | Small mobile devices |
| `$small-mobile` | 375px | Standard small mobile |
| `$mid-mobile` | 500px | Medium mobile devices |
| `$mobile` | 576px | Mobile devices |
| `$small-tab` | 768px | Small tablets |
| `$big-tab` | 992px | Large tablets |
| `$small-desktop` | 1024px | Small desktop screens |
| `$desktop` | 1200px | Desktop screens |
| `$mid-desktop` | 1440px | Medium desktop screens |
| `$large-desktop` | 1500px | Large desktop screens |

## 🎨 SCSS Structure

The SCSS follows a nested structure for better organization:

```scss
.header {
    .nav {
        .nav-menu {
            .nav-item {
                .nav-link {
                    &:hover { }
                }
            }
        }
    }
}
```

### Variables

All design tokens are stored in `css/variable.scss`:
- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Transitions
- Z-index values
- Breakpoints

## 🎯 Components

### Header
- Sticky navigation
- Responsive menu
- Search functionality
- Contact information

### Hero Section
- Two-column layout
- Call-to-action buttons
- Video card with play button
- Decorative elements

### Chat Widget
- Fixed position
- Interactive button
- Agentforce integration ready

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🔧 Configuration

### Vite Config (`vite.config.js`)

- SCSS preprocessing
- Path aliases (@, @css, @js, @assets)
- Build optimization
- Asset handling

### Path Aliases

```javascript
import logo from '@assets/images/logo.svg';
import '@css/style.scss';
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

ISC

## 👨‍💻 Development Notes

### Adding New Styles

1. Add variables to `css/variable.scss`
2. Use nested SCSS in `css/style.scss`
3. Follow the existing naming conventions

### Adding New Components

1. Create HTML structure in `index.html`
2. Add styles in `css/style.scss` with nested syntax
3. Add JavaScript functionality in `js/main.js`

### Adding Assets

Place files in the appropriate `assets/` subfolder:
- Images → `assets/images/`
- Icons → `assets/icons/`
- Fonts → `assets/fonts/`
- Videos → `assets/videos/`

## 🐛 Known Issues

None at the moment.

## 🚀 Future Enhancements

- [ ] Add more page sections
- [ ] Implement actual video player
- [ ] Add form validation
- [ ] Integrate with backend API
- [ ] Add animations library
- [ ] Implement dark mode

## 🚀 Deployment

To deploy this project to GitHub Pages:

1. Update `vite.config.js` with your repository name:
   ```javascript
   export default {
     base: '/salesforce-clone4/',
     // ... other config
   }
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Git Push:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push -u origin main
   ```

4. Enable GitHub Pages:
   - Go to Settings > Pages
   - Select `main` branch (or `gh-pages` if you set that up) / `dist` folder if deploying manually, OR easier:
   - Use a deploy action.


## 📞 Contact

For questions or support, please contact the development team.

---

**Built with ❤️ using Vite + SCSS + JavaScript**
