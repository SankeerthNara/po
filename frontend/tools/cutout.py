# One-off: remove the flat white studio background from the portrait via edge flood-fill.
import sys
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
from collections import deque

src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
a = np.asarray(im).astype(np.int16)
h, w, _ = a.shape
bright = (a.min(axis=2) >= 251)  # studio white is 253-255; the cream shirt tops out near 250
bg = np.zeros((h, w), bool)
q = deque()
for x in range(w):
    for y in (0,):
        if bright[y, x]: q.append((y, x)); bg[y, x] = True
for y in range(h):
    for x in (0, w - 1):
        if bright[y, x] and not bg[y, x]: q.append((y, x)); bg[y, x] = True
while q:
    y, x = q.popleft()
    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < h and 0 <= nx < w and not bg[ny, nx] and bright[ny, nx]:
            bg[ny, nx] = True; q.append((ny, nx))
alpha = Image.fromarray(((~bg) * 255).astype(np.uint8))
# Hair edges are blends of dark hair and studio white: in a thin band around the head, fade out
# light, unsaturated pixels so no white halo shows on a dark page.
bgimg = Image.fromarray((bg * 255).astype(np.uint8))
band = (np.asarray(bgimg.filter(ImageFilter.MaxFilter(13))) > 0) & ~bg
band[int(h * 0.5):] = False
f = a.astype(np.float32)
lum = f.mean(axis=2)
sat = (f.max(axis=2) - f.min(axis=2)) / 255.0
fringe = np.clip((lum - 110) / 110, 0, 1) * np.clip(1 - sat * 4, 0, 1)
alpha = np.asarray(alpha).astype(np.float32)
alpha[band] *= (1 - fringe[band])
alpha = Image.fromarray(alpha.astype(np.uint8))
alpha = alpha.filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(1.3))  # erode 2px to drop the white halo
out = im.convert("RGBA"); out.putalpha(alpha)
out.save(dst, "WEBP", quality=90)
print("bg fraction", bg.mean())
