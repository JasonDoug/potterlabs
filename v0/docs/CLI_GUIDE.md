# CLI Usage Guide

The AI Video CLI provides an interactive wizard to create video configuration files that can be used with the AI Story API.

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
cd v0/cli
npm install
```

## Usage

### Interactive Mode

Run the CLI wizard to create a video configuration:

```bash
node create-ai-video.mjs
```

Or if installed globally:
```bash
create-ai-video
```

### CLI Workflow

The CLI will guide you through the following steps:

#### 1. Visual Style Selection
Choose the visual style which determines the AI provider:

```
? Choose a visual style:
  ● Cinematic (Runway)         - Movie-style AI visuals
  ○ Photorealistic (Runway)    - Realistic AI-generated visuals  
  ○ Animation (Pika)           - Animated AI-generated content
  ○ Artistic (Pika)            - Creative and experimental styles
  ○ Abstract (Pika)            - Non-realistic, creative content
  ○ Documentary (Runway)       - Serious, realistic documentary style
  ○ Modern Slideshow           - Clean slideshow with images
  ○ Classic Slideshow          - Traditional slideshow format
```

#### 2. Voice Selection
Choose a text-to-speech voice for narration:

```
? Choose a voice:
  ● Sarah (American Female)    - Professional female voice
  ○ Mike (American Male)       - Confident male voice
  ○ Emma (British Female)      - British female voice
  ○ James (British Male)       - British male voice
  ○ Maria (Spanish Female)     - Spanish accent female voice
```

#### 3. Caption Theme
Select the visual theme for captions and text overlays:

```
? Choose a caption theme:
  ● Modern        - Clean, contemporary styling
  ○ Classic       - Traditional, elegant styling
  ○ Bold          - High contrast, vibrant colors
  ○ Minimal       - Simple, clean design
  ○ Cinematic     - Movie-style presentation
```

#### 4. Aspect Ratio
Choose video dimensions:

```
? Choose an aspect ratio:
  ● 9:16          - Vertical (mobile/social)
  ○ 1:1           - Square (Instagram)
  ○ 16:9          - Horizontal (YouTube/TV)
```

#### 5. Duration Selection
Select video length (affects provider routing):

```
? Select video duration:
  ● 15 seconds (Pika optimized)    - Fast generation, creative content
  ○ 30 seconds (Short)             - Standard short-form content
  ○ 60 seconds (Medium)            - Medium-length content
  ○ 120 seconds (Long)             - Extended content
  ○ 300 seconds (Extended)         - Long-form content
```

#### 6. Custom Prompt
Enter a custom script prompt or leave blank:

```
? Enter a custom script prompt (leave blank to skip):
  A robot teaches quantum physics to children...
```

#### 7. Voiceover Option
Choose whether to include AI-generated narration:

```
? Include voiceover? (y/N)
```

#### 8. Background Music
Choose whether to include background music:

```
? Include background music? (y/N)
```

#### 9. Content Category
Select content type for optimal routing:

```
? Choose a content category:
  ● History       - Historical events and figures
  ○ Science       - Scientific discoveries and concepts
  ○ Technology    - Tech innovations and trends
  ○ Nature        - Wildlife and natural phenomena
  ○ Space         - Astronomy and space exploration
  ○ Custom        - Custom story from your prompt
```

## Output

The CLI generates a `video-config.json` file in your current directory:

```json
{
  "topic": "science",
  "prompt": "Explain quantum physics in simple terms",
  "style": "cinematic",
  "voice": "sarah",
  "theme": "modern",
  "duration": 60,
  "aspect_ratio": "16:9",
  "include_voiceover": true,
  "bg_music": "default",
  "language": "English"
}
```

## Using the Generated Config

### With curl
```bash
curl -X POST -H "Content-Type: application/json" -H "X-API-KEY: your_key" \
  --data-binary @video-config.json \
  http://localhost:3000/video/generate
```

### With Node.js
```javascript
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('video-config.json', 'utf8'));

fetch('http://localhost:3000/video/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': 'your_key'
  },
  body: JSON.stringify(config)
})
.then(response => response.json())
.then(data => console.log(data));
```

### With Python
```python
import json
import requests

with open('video-config.json', 'r') as f:
    config = json.load(f)

response = requests.post(
    'http://localhost:3000/video/generate',
    headers={
        'Content-Type': 'application/json',
        'X-API-KEY': 'your_key'
    },
    json=config
)

print(response.json())
```

## Provider Routing

The CLI selections automatically determine which AI provider is used:

### Runway ML Routes
- **Styles:** Cinematic, Photorealistic, Documentary
- **Best for:** Professional videos, realistic content, corporate presentations
- **Generation time:** 3-8 minutes

### Pika Labs Routes  
- **Styles:** Animation, Artistic, Abstract
- **Best for:** Creative projects, animated content, experimental videos
- **Generation time:** 1-3 minutes

### Slideshow Routes
- **Styles:** Modern Slideshow, Classic Slideshow
- **Best for:** Educational content, presentations, long-form content
- **Generation time:** 30-60 seconds

## Configuration Examples

### Educational Science Video
```bash
# CLI selections:
# Style: Modern Slideshow
# Voice: Sarah (American Female)  
# Theme: Modern
# Duration: 120 seconds
# Topic: Science
# Prompt: "Explain photosynthesis to middle school students"
```

**Generated config routes to:** Slideshow provider  
**Reasoning:** Educational content + slideshow style + long duration

### Creative Art Project
```bash
# CLI selections:
# Style: Animation (Pika)
# Voice: Emma (British Female)
# Theme: Artistic
# Duration: 30 seconds
# Topic: Custom
# Prompt: "Abstract shapes dancing to music"
```

**Generated config routes to:** Pika provider  
**Reasoning:** Animation style + creative content + short duration

### Corporate Presentation
```bash
# CLI selections:
# Style: Cinematic (Runway)
# Voice: James (British Male)
# Theme: Professional
# Duration: 60 seconds
# Topic: Technology
# Prompt: "Introduction to our new AI platform"
```

**Generated config routes to:** Runway provider  
**Reasoning:** Cinematic style + professional content + medium duration

## Tips and Best Practices

### Choosing the Right Style
- **Runway styles** for professional, realistic content
- **Pika styles** for creative, animated, experimental content  
- **Slideshow styles** for educational, presentation content

### Duration Guidelines
- **15-30 seconds:** Great for social media, quick demos
- **60-120 seconds:** Perfect for explainer videos, presentations
- **300+ seconds:** Best for educational content, detailed tutorials

### Voice Selection
- **American voices (Sarah, Mike):** Neutral, widely understood
- **British voices (Emma, James):** Authoritative, educational feel
- **Accented voices (Maria):** Adds personality, cultural context

### Prompt Writing Tips
- Be specific but concise
- Include key concepts you want visualized
- Mention the target audience if relevant
- Avoid overly complex or abstract concepts for realistic styles

## Troubleshooting

### CLI Won't Start
```bash
# Check Node.js version
node --version  # Should be 18+

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Config File Issues
```bash
# Validate JSON syntax
node -e "console.log(JSON.parse(require('fs').readFileSync('video-config.json', 'utf8')))"

# Check required fields
# Ensure either 'topic' or 'prompt' is present
# Ensure 'style' is specified
```

### API Integration Issues
- Verify API key is correct
- Check API server is running on correct port
- Validate config file structure matches API expectations
- Review API error messages for specific issues

## Advanced Usage

### Batch Generation
Create multiple configs and process them programmatically:

```bash
# Generate multiple configs
for topic in science history technology; do
  echo -e "1\n1\n1\n1\n2\n$topic explained simply\n1\n1\n1" | \
  node create-ai-video.mjs
  mv video-config.json "config-$topic.json"
done
```

### Custom Templates
Modify the CLI source to add your own style presets or voice options:

```javascript
// In create-ai-video.mjs, add custom styles:
const customStyles = [
  { label: 'My Custom Style', value: 'custom_style' },
  // ... existing styles
];
```