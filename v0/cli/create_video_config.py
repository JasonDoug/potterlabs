import questionary, json
from pathlib import Path

def main():
    config = {
        "style": questionary.select("Style:", choices=["cinematic", "anime", "slideshow"]).ask(),
        "voice": questionary.select("Voice:", choices=["Charlie", "Sarah"]).ask(),
        "theme": questionary.select("Theme:", choices=["Hormozi_1", "Beast"]).ask(),
        "aspect_ratio": questionary.select("Aspect:", choices=["9:16", "1:1"]).ask(),
        "duration": questionary.select("Duration:", choices=["30-60", "5 min"]).ask(),
        "prompt": questionary.text("Prompt:").ask(),
        "include_voiceover": "1" if questionary.confirm("Include voice?").ask() else "0",
        "bg_music": "default" if questionary.confirm("Include music?").ask() else None,
        "use_ai": "1",
        "language": "English"
    }
    Path("video-config.json").write_text(json.dumps(config, indent=2))
    print("✅ Config saved!")

if __name__ == "__main__":
    main()