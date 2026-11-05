import os
import time
import subprocess
import imageio_ffmpeg
from playwright.sync_api import sync_playwright

output_dir = r"C:\Users\sverk\Documents\CV\assets\videos"
temp_video_dir = r"C:\Users\sverk\Documents\CV\assets\videos\temp_new"
os.makedirs(output_dir, exist_ok=True)
os.makedirs(temp_video_dir, exist_ok=True)

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

def smooth_scroll(page, distance, steps=15, delay=0.03):
    step_dist = distance / steps
    for _ in range(steps):
        page.mouse.wheel(0, step_dist)
        time.sleep(delay)

def convert_and_thumbnail(webm_source, name, thumb_sec="00:00:03"):
    target_webm = os.path.join(output_dir, f"{name}.webm")
    target_mp4 = os.path.join(output_dir, f"{name}.mp4")
    target_thumb = os.path.join(output_dir, f"{name}_thumb.jpg")
    
    if os.path.exists(target_webm):
        os.remove(target_webm)
    os.rename(webm_source, target_webm)
    
    print(f"Converting {name} to MP4...")
    cmd_mp4 = [
        ffmpeg_exe, "-y",
        "-i", target_webm,
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-crf", "22",
        "-preset", "medium",
        target_mp4
    ]
    subprocess.run(cmd_mp4, check=True)
    
    print(f"Extracting thumbnail for {name} at {thumb_sec}...")
    cmd_thumb = [
        ffmpeg_exe, "-y",
        "-ss", thumb_sec,
        "-i", target_mp4,
        "-vframes", "1",
        "-q:v", "2",
        target_thumb
    ]
    subprocess.run(cmd_thumb, check=True)
    print(f"Done: {name} (WebM: {os.path.getsize(target_webm)}B, MP4: {os.path.getsize(target_mp4)}B, Thumb: {os.path.getsize(target_thumb)}B)")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # ========================================================
    # 1. RECORD: therand.ee
    # ========================================================
    print("\n--- 1. RECORDING: therand.ee ---")
    ctx = browser.new_context(viewport={'width': 1280, 'height': 720}, record_video_dir=temp_video_dir, record_video_size={'width': 1280, 'height': 720})
    page = ctx.new_page()
    page.goto("https://therand.ee", wait_until="domcontentloaded")
    time.sleep(2.0)
    # Scroll down smoothly
    smooth_scroll(page, 450, steps=15, delay=0.03)
    time.sleep(1.2)
    # Scroll further to courts and pricing
    smooth_scroll(page, 550, steps=18, delay=0.03)
    time.sleep(1.5)
    # Scroll down to photos
    smooth_scroll(page, 500, steps=15, delay=0.03)
    time.sleep(1.2)
    # Scroll back up to hero
    smooth_scroll(page, -1500, steps=25, delay=0.02)
    time.sleep(1.5)
    ctx.close()
    
    v_rand = max([os.path.join(temp_video_dir, f) for f in os.listdir(temp_video_dir) if f.endswith('.webm')], key=os.path.getctime)
    convert_and_thumbnail(v_rand, "therand_ee", thumb_sec="00:00:03")

    # ========================================================
    # 2. RECORD: prosystem.ee (esindusveeb + sisekeskkond)
    # ========================================================
    print("\n--- 2. RECORDING: prosystem.ee koos sisekeskkonnaga ---")
    ctx = browser.new_context(viewport={'width': 1280, 'height': 720}, record_video_dir=temp_video_dir, record_video_size={'width': 1280, 'height': 720})
    page = ctx.new_page()
    page.goto("https://prosystem.ee", wait_until="domcontentloaded")
    time.sleep(2.0)
    # Scroll down to services and experience
    smooth_scroll(page, 450, steps=15, delay=0.03)
    time.sleep(1.5)
    smooth_scroll(page, 450, steps=15, delay=0.03)
    time.sleep(1.2)
    # Navigate to login / PWA töökeskkond
    print("Navigating to login/PWA...")
    page.goto("https://prosystem.ee/login", wait_until="domcontentloaded")
    time.sleep(2.0)
    # Smooth scroll down to show PWA app prompt and credentials box
    smooth_scroll(page, 300, steps=12, delay=0.03)
    time.sleep(1.8)
    ctx.close()

    v_pro = max([os.path.join(temp_video_dir, f) for f in os.listdir(temp_video_dir) if f.endswith('.webm')], key=os.path.getctime)
    convert_and_thumbnail(v_pro, "prosystem_ee", thumb_sec="00:00:02")

    # ========================================================
    # 3. RECORD: rannahalli valguse kood (rannahalli_valgus.py)
    # ========================================================
    print("\n--- 3. RECORDING: rannahalli_valgus.py kood ---")
    code_path = "file:///" + os.path.abspath(r"scratch\code_viewer.html").replace("\\", "/")
    ctx = browser.new_context(viewport={'width': 1280, 'height': 720}, record_video_dir=temp_video_dir, record_video_size={'width': 1280, 'height': 720})
    page = ctx.new_page()
    page.goto(code_path, wait_until="load")
    time.sleep(1.5)
    # Smooth scroll down through the code
    smooth_scroll(page, 300, steps=15, delay=0.04)
    time.sleep(1.2)
    smooth_scroll(page, 400, steps=18, delay=0.04)
    time.sleep(1.5)
    smooth_scroll(page, 400, steps=18, delay=0.04)
    time.sleep(1.5)
    # Scroll back up to the top
    smooth_scroll(page, -1100, steps=25, delay=0.03)
    time.sleep(1.5)
    ctx.close()

    v_code = max([os.path.join(temp_video_dir, f) for f in os.listdir(temp_video_dir) if f.endswith('.webm')], key=os.path.getctime)
    convert_and_thumbnail(v_code, "rannahalli_valgus", thumb_sec="00:00:03")

    browser.close()

# Cleanup temp dir
try:
    for f in os.listdir(temp_video_dir):
        os.remove(os.path.join(temp_video_dir, f))
    os.rmdir(temp_video_dir)
except Exception:
    pass

print("\nALL 3 NEW VIDEOS AND THUMBNAILS COMPLETED SUCCESSFULLY!")
