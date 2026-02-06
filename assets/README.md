# Assets Folder

This folder contains all static assets for the Salesforce website.

## Folder Structure

```
assets/
├── images/     # Image files (PNG, JPG, SVG, WebP)
├── icons/      # Icon files (SVG, PNG)
├── fonts/      # Custom font files (WOFF, WOFF2, TTF)
└── videos/     # Video files (MP4, WebM)
```

## Usage

### Images
Place all images in the `images/` folder. Import them in your JavaScript or reference them in HTML:

```javascript
import logo from '@assets/images/logo.svg';
```

```html
<img src="/assets/images/logo.svg" alt="Logo">
```

### Icons
Store icon files in the `icons/` folder for easy organization and reuse.

### Fonts
Add custom font files to the `fonts/` folder and reference them in your SCSS:

```scss
@font-face {
  font-family: 'Salesforce Sans';
  src: url('/assets/fonts/SalesforceSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}
```

### Videos
Place video files in the `videos/` folder for the video player component.

## Best Practices

1. **Optimize images** before adding them (use WebP format when possible)
2. **Use SVG** for icons and logos for better scalability
3. **Compress videos** to reduce file size
4. **Use descriptive filenames** (e.g., `hero-background.jpg` instead of `img1.jpg`)
