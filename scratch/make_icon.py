from playwright.sync_api import sync_playwright
import os
from PIL import Image

svg_content = """<svg xmlns="http://www.w3.org/2000/svg" width="55" height="59" viewBox="0 0 55 59" fill="none">
  <circle cx="27.5" cy="29.5" r="17.5" stroke="#2E2E52" stroke-width="3.5"/>
  <line x1="10" y1="29.5" x2="45" y2="29.5" stroke="#2E2E52" stroke-width="3.2"/>
  <ellipse cx="27.5" cy="29.5" rx="8.5" ry="17.5" stroke="#2E2E52" stroke-width="3.2"/>
  <line x1="27.5" y1="12" x2="27.5" y2="47" stroke="#2E2E52" stroke-width="3.2"/>
</svg>"""

with open('scratch/icon_web.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 55, 'height': 59})
    page.goto(f"file:///{os.path.abspath('scratch/icon_web.svg').replace(os.sep, '/')}")
    page.screenshot(path='scratch/icon_web.png', omit_background=True)
    browser.close()

img = Image.open('scratch/icon_web.png')
print('Generated icon_web.png:', img.size, img.mode, img.getbbox())
