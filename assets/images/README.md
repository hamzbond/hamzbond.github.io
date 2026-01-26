# Images Folder

This folder contains all image assets for the portfolio website.

## Recommended Image Specifications

### Profile Images
- **Avatar**: 300x300px (square, high quality)
- **Format**: JPG or PNG
- **Size**: < 500KB for optimal loading

### Portfolio Project Images
- **Dimensions**: 400x300px (4:3 aspect ratio)
- **Format**: JPG or WebP for better compression
- **Size**: < 300KB each
- **Quality**: High resolution for retina displays

### Background Images (Optional)
- **Hero Background**: 1920x1080px
- **Format**: JPG or WebP
- **Size**: < 1MB

## File Naming Convention

Use descriptive, lowercase names with hyphens:
- `profile-avatar.jpg`
- `project-ecommerce.jpg`
- `project-taskapp.jpg`
- `hero-background.jpg`

## Usage

Replace the placeholder URLs in `assets/data/data.json`:

```json
{
  "profile": {
    "avatar": "./assets/images/profile-avatar.jpg"
  },
  "portfolio": [
    {
      "title": "Project Name",
      "image": "./assets/images/project-name.jpg"
    }
  ]
}
```

## Optimization Tips

1. **Compress images** before uploading using tools like:
   - TinyPNG
   - ImageOptim
   - Squoosh

2. **Use WebP format** when possible for better compression

3. **Consider lazy loading** for below-the-fold images

4. **Provide alt text** for accessibility