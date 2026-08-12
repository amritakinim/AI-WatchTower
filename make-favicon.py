"""Generate a favicon PNG (64x64, dark rounded bg + beacon glyph) using Pillow."""
from PIL import Image, ImageDraw

S = 64
img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
d = ImageDraw.Draw(img)

INDIGO = (118, 116, 235, 255)  # approx oklch(0.62 0.19 275)
BG = (16, 17, 28, 255)

# Dark rounded square background
d.rounded_rectangle([2, 2, S - 3, S - 3], radius=14, fill=BG)

# Beacon glyph: mast + base + bulb + quarter arcs
STROKE = 2.4

# Mast (x=10 in 40-unit viewBox scaled x1.5 to 64px-ish)
sx = S / 40.0
def pt(x, y):
    return (x * sx, y * sx)

# base line: (4,36)-(16,36)
d.line([pt(4, 36), pt(16, 36)], fill=INDIGO, width=3)
# mast: (10,36)-(10,18)
d.line([pt(10, 36), pt(10, 18)], fill=INDIGO, width=3)
# bulb at (10,15.5) r=2.6
cx, cy = pt(10, 15.5)
d.ellipse([cx - 2.6 * sx, cy - 2.6 * sx, cx + 2.6 * sx, cy + 2.6 * sx], fill=INDIGO)


def arc(cx, cy, r, start_deg, end_deg, width=2):
    # start angle 0 = right, 90 = down. We want arcs opening to the upper-right.
    bbox = [pt(cx - r, cy - r), pt(cx + r, cy + r)]
    d.arc(bbox, start=start_deg, end=end_deg, fill=INDIGO, width=width)


# quarter-arcs centered on bulb, sweeping the upper-right quadrant:
# inner arc radius 8: from -45 deg (upper-right) up to 135? Simpler: 315..45 deg (top)
arc(10, 15.5, 8, 300, 330)    # short arc upper-right
arc(10, 15.5, 13, 305, 325)
arc(10, 15.5, 18, 308, 322)

img.save("/home/ubuntu/copy-of-ai-watch-tower/client/public/favicon.png", "PNG")
print("saved favicon.png", img.size)
