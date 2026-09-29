"""
Regenerates the web logo assets in public/brand/ from the master artwork
(brand-source/ejourney-logo-master.png — cream background, 2000x2000).

Removes the cream background (preserving anti-aliased edges and the gold gradient),
then exports: full logo, wordmark, lockup, emblem, pin icon, favicons and og-image,
each in original colours and a "-light" version (green -> cream) for dark backgrounds.

Usage:  python scripts/process_logo.py      (requires Pillow + numpy)
Crop regions below are tuned to the current master artwork.
"""
from PIL import Image
import numpy as np

import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "brand-source", "ejourney-logo-master.png")
OUT = os.path.join(ROOT, "public", "brand") + os.sep
BG = np.array([253, 246, 238], np.float32)
CREAM = np.array([253, 247, 239], np.float32)
INKS = {'green': np.array([20, 62, 50], np.float32), 'gold': np.array([195, 152, 78], np.float32)}

a = np.asarray(Image.open(SRC).convert('RGB')).astype(np.float32)
v = a - BG
best_res = None
for name, ink in INKS.items():
    u = ink - BG
    al = (v @ u) / (u @ u)
    res = np.linalg.norm(v - al[..., None] * u, axis=2)
    if best_res is None:
        best_res, alpha, cls = res, al, np.zeros(al.shape, bool)
    else:
        take = res < best_res
        best_res = np.where(take, res, best_res)
        alpha = np.where(take, al, alpha)
        cls = np.where(take, True, cls)  # True = gold
alpha = np.clip(alpha, 0, 1)
alpha[np.abs(v).max(axis=2) < 6] = 0          # kill paper noise
safe = np.maximum(alpha, 1e-3)[..., None]
color = np.clip(BG + v / safe, 0, 255)
color = np.where(alpha[..., None] >= 0.985, a, color)
is_gold, is_green = cls & (alpha > 0), (~cls) & (alpha > 0)

H, W = alpha.shape
yy, xx = np.mgrid[0:H, 0:W]

def build(select, light=False):
    al = np.where(select, alpha, 0)
    col = color.copy()
    if light:
        col = np.where((is_green & select)[..., None], CREAM, col)
    rgba = np.dstack([col, al * 255]).astype(np.uint8)
    return Image.fromarray(rgba, 'RGBA')

def crop_save(img, name, pad=10, width=None, height=None):
    bbox = img.getchannel('A').point(lambda p: 255 if p > 8 else 0).getbbox()
    x0, y0, x1, y1 = bbox
    img = img.crop((max(0, x0 - pad), max(0, y0 - pad), min(W, x1 + pad), min(H, y1 + pad)))
    if width or height:
        w, h = img.size
        if width: size = (width, round(h * width / w))
        else: size = (round(w * height / h), height)
        img = img.convert('RGBa').resize(size, Image.LANCZOS).convert('RGBA')
    img.save(OUT + name, optimize=True)
    print(name, img.size)
    return img

everything = alpha > 0
emblem_sel = (xx >= 585) & (xx <= 1425) & (yy >= 530) & (yy <= 1200) & (is_gold | (is_green & (yy < 1099)))
wordmark_sel = (xx >= 420) & (xx <= 1555) & (yy >= 1096) & (yy <= 1372) & is_green & ~((xx > 632) & (yy < 1128))
tagline_sel = (yy >= 1374) & (yy <= 1425) & (alpha > 0)
pin_sel = (xx >= 420) & (xx <= 628) & (yy >= 1096) & (yy <= 1350) & is_green

for light in (False, True):
    sfx = '-light' if light else ''
    crop_save(build(everything, light), f'logo-full{sfx}.png', pad=16, width=900)
    crop_save(build(emblem_sel, light), f'logo-emblem{sfx}.png', pad=10, width=560)
    crop_save(build(wordmark_sel, light), f'logo-wordmark{sfx}.png', pad=6, height=180)
    crop_save(build(wordmark_sel | tagline_sel, light), f'logo-lockup{sfx}.png', pad=8, width=900)

pin = crop_save(build(pin_sel), 'logo-pin.png', pad=4, height=256)

# Favicons: pin centred on a square transparent canvas; apple icon on cream
def square(img, size, bg=None, scale=0.84):
    canvas = Image.new('RGBA', (size, size), bg or (0, 0, 0, 0))
    w, h = img.size
    s = size * scale / max(w, h)
    small = img.convert('RGBa').resize((max(1, round(w * s)), max(1, round(h * s))), Image.LANCZOS).convert('RGBA')
    canvas.alpha_composite(small, ((size - small.width) // 2, (size - small.height) // 2))
    return canvas

src_pin = build(pin_sel)
src_pin = src_pin.crop(src_pin.getchannel('A').point(lambda p: 255 if p > 8 else 0).getbbox())
square(src_pin, 32, scale=0.94).save(OUT + 'favicon-32.png', optimize=True)
square(src_pin, 192, scale=0.8).save(OUT + 'icon-192.png', optimize=True)
square(src_pin, 512, scale=0.8).save(OUT + 'icon-512.png', optimize=True)
square(src_pin, 180, bg=(253, 247, 239, 255), scale=0.66).save(OUT + 'apple-touch-icon.png', optimize=True)

# Social share image: full logo on cream
full = build(everything)
full = full.crop(full.getchannel('A').point(lambda p: 255 if p > 8 else 0).getbbox())
og = Image.new('RGBA', (1200, 630), (253, 247, 239, 255))
s = 500 / full.height
fs = full.convert('RGBa').resize((round(full.width * s), 500), Image.LANCZOS).convert('RGBA')
og.alpha_composite(fs, ((1200 - fs.width) // 2, (630 - fs.height) // 2))
og.convert('RGB').save(OUT + 'og-image.jpg', quality=88)
print('done')
