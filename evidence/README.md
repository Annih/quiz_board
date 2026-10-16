# Answer images (optional)

Put images referenced by your quiz's `evidence.image` fields here. Paths are relative to `index.html`, so an image stored as `evidence/charger.png` should use:

```json
"evidence": {
  "image": "evidence/charger.png",
  "caption": "A short explanation of the answer."
}
```

Images are optional; the sample quiz needs none. You can also provide a caption without an image.

A missing file isn't fatal: the display shows "Image not found" with the expected path, so you can spot it during rehearsal.

**Crop or blur every real secret, token, hostname and personal detail before committing an image here.**
