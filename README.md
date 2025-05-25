### panels:
- Digital Clock endpoints: 
  - `<HOST>/digital-clock/`
  - `<HOST>/digital-clock/index.html`

### if you are going to compile to run directly from the file in OBS, use the minification option as false in `vite.config.js`, due to a limitation in the OBS native browser.
```
{
    build:{
        manifest: false,
            outDir: "../dist",
            minify: false,
            target: "esnext",
            terserOptions: {
            mangle: false
        }
    }
}
```
### customization
due to a strange security limitation of the OBS browser;
To change the background, you need to use the custom css box, directly in OBS.

```css
.digital-clock{
--digitalClockBgImage: url("/home/username/clock-directory/assets/png/clock.png");
--digitalClockBgImageAfter: url("/home/username/clock-directory/assets/png/visor.png");
}
```

for online server, just change the directory link where the images - `clock.png` and `visor.png` - are located in the json file: `assets/json/settings.json`;        
if you want to change the background color as well... it can also be changed by json.
```json
{
  "panels": {
    "digital-clock": {
      "background": {
        "color": "transparent",
        "image_src": "./assets/png/"
      }
    }
  }
}
```