import os
import time
import subprocess
import imageio_ffmpeg
from playwright.sync_api import sync_playwright

output_dir = r"C:\Users\sverk\Documents\CV\assets\videos"
temp_video_dir = r"C:\Users\sverk\Documents\CV\assets\videos\temp_batch2"
os.makedirs(output_dir, exist_ok=True)
os.makedirs(temp_video_dir, exist_ok=True)

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

def smooth_scroll(page, distance, steps=20, delay=0.03):
    step_dist = distance / steps
    for _ in range(steps):
        page.mouse.wheel(0, step_dist)
        time.sleep(delay)

def convert_and_thumbnail(webm_source, name, thumb_sec="00:00:02"):
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
    print(f"Done {name}!")

def record_all():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        # 1. Markowitz Portfolio (Code Walkthrough)
        print("Recording Markowitz Portfolio code walkthrough...")
        context1 = browser.new_context(
            viewport={"width": 1280, "height": 720},
            record_video_dir=temp_video_dir,
            record_video_size={"width": 1280, "height": 720}
        )
        page1 = context1.new_page()
        markowitz_html = os.path.abspath("scratch/markowitz_viewer.html").replace("\\", "/")
        page1.goto(f"file:///{markowitz_html}")
        page1.wait_for_timeout(1500)
        
        # Scroll through the Java code
        smooth_scroll(page1, 350, steps=25, delay=0.03)
        page1.wait_for_timeout(1500)
        smooth_scroll(page1, 380, steps=25, delay=0.03)
        page1.wait_for_timeout(1500)
        smooth_scroll(page1, -730, steps=25, delay=0.02)
        page1.wait_for_timeout(1200)
        
        video_path1 = page1.video.path()
        context1.close()
        convert_and_thumbnail(video_path1, "markowitz_portfolio", thumb_sec="00:00:03")

        # 2. Autom-sots.meedia (Mockup Dashboard)
        print("Recording Autom-sots.meedia dashboard mockup...")
        context2 = browser.new_context(
            viewport={"width": 1280, "height": 720},
            record_video_dir=temp_video_dir,
            record_video_size={"width": 1280, "height": 720}
        )
        page2 = context2.new_page()
        sots_html = os.path.abspath("scratch/autom_sots_mockup.html").replace("\\", "/")
        page2.goto(f"file:///{sots_html}")
        page2.wait_for_timeout(1500)
        
        # Hover over pipeline stages
        page2.mouse.move(300, 240)
        page2.wait_for_timeout(800)
        page2.mouse.move(600, 240)
        page2.wait_for_timeout(800)
        page2.mouse.move(900, 240)
        page2.wait_for_timeout(1000)
        
        # Move to active queue item
        page2.mouse.move(400, 390)
        page2.wait_for_timeout(1500)
        page2.mouse.move(850, 420)
        page2.wait_for_timeout(1500)
        
        video_path2 = page2.video.path()
        context2.close()
        convert_and_thumbnail(video_path2, "autom_sots", thumb_sec="00:00:02")

        browser.close()

if __name__ == "__main__":
    record_all()
