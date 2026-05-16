from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

temp = Path.home() / "AppData" / "Local" / "Temp"
screens = [
    ("overview", "Overview"),
    ("heat", "UHI Mitigation"),
    ("flood", "Flood Risk"),
    ("assets", "Infrastructure"),
    ("scenario", "Simulation"),
    ("reports", "Reports"),
]

font_path = Path("C:/Windows/Fonts/segoeui.ttf")
bold_path = Path("C:/Windows/Fonts/segoeuib.ttf")
title_font = ImageFont.truetype(str(bold_path), 26)
label_font = ImageFont.truetype(str(bold_path), 20)

thumb_w, thumb_h = 520, 354
gap = 24
header = 74
card_h = thumb_h + 44
canvas_w = thumb_w * 2 + gap * 3
canvas_h = header + card_h * 3 + gap * 4

montage = Image.new("RGB", (canvas_w, canvas_h), "#ece8dc")
draw = ImageDraw.Draw(montage)
draw.text((gap, 22), "AURCAP GIS Dashboard Screen Set", fill="#202422", font=title_font)

for index, (slug, label) in enumerate(screens):
    source = temp / f"aurcap-{slug}.png"
    image = Image.open(source).convert("RGB")
    image.thumbnail((thumb_w, thumb_h), Image.Resampling.LANCZOS)

    col = index % 2
    row = index // 2
    x = gap + col * (thumb_w + gap)
    y = header + gap + row * (card_h + gap)

    draw.rounded_rectangle(
        (x - 5, y - 5, x + thumb_w + 5, y + thumb_h + 34),
        radius=10,
        fill="#fbfaf6",
        outline="#d9d5c9",
        width=1,
    )
    montage.paste(image, (x, y))
    draw.text((x + 10, y + thumb_h + 7), label, fill="#202422", font=label_font)

out = temp / "aurcap-screen-montage.png"
montage.save(out)
print(out)
