# Whisper to Subtitles (JSON to VTT Converter)

A simple, browser-based tool to convert JSON transcript files to WebVTT format.
Perfect for creating subtitles and captions for web videos.

Whisper JSON output can be generated directly in your browser, with no other
tools needed, using
[Whisper Web](https://huggingface.co/spaces/Xenova/whisper-web).

## Features

- 🚀 Browser-based conversion - no server needed
- 📁 Local file processing - your files never leave your computer
- ⚡ Instant conversion and download
- 🎯 Input validation with helpful error messages
- 💅 Clean, modern interface

## Usage

1. Open `index.html` in your web browser
2. Click "Select JSON File" to choose your JSON file
3. The converted VTT file will automatically download

## Input JSON Format

Your JSON file should be an array of objects with this structure:

```json
[
  {
    "timestamp": [0, 8.24],
    "text": "Your subtitle text here"
  },
  {
    "timestamp": [8.24, 12.48],
    "text": "Next subtitle text"
  }
]
```

- `timestamp`: Array with [start_time, end_time] in seconds
- `text`: The subtitle text to display

## Deployment

This is a static site that can be deployed anywhere. For Netlify:

1. Fork/clone this repository
2. Connect your repository to Netlify
3. Deploy! (No build configuration needed)

## License

MIT License - Feel free to use this in your projects!
