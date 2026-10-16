# Custom sounds (optional)

The app synthesises its own reveal, strike and round-win sounds, so this folder can stay empty.

To replace one, add an audio file here (MP3, OGG or WAV) and reference it in your quiz JSON:

```json
"sounds": { "reveal": "sounds/ding.mp3", "strike": null, "win": false }
```

`null` keeps the built-in sound and `false` mutes it. Only use audio you have the rights to.
