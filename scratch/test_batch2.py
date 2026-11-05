from playwright.sync_api import sync_playwright
import os

def test_page():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1400, "height": 900})
        
        url = f"file:///{os.path.abspath('index.html').replace(os.sep, '/')}"
        page.goto(url)
        page.wait_for_timeout(1000)
        
        # 1. Check favicon tags
        svg_favicon = page.locator("link[type='image/svg+xml']").get_attribute("href")
        png_favicon = page.locator("link[type='image/png']").get_attribute("href")
        print(f"Favicon SVG: {svg_favicon}, PNG: {png_favicon}")
        assert svg_favicon == "assets/favicon.svg"
        assert png_favicon == "assets/favicon.png"
        assert os.path.exists("assets/favicon.svg")
        assert os.path.exists("assets/favicon.png")
        
        # 2. Check hero greeting
        hero_greeting = page.locator("h1.hero-title [data-i18n='heroGreeting']").inner_text()
        print(f"Hero greeting (ET): {hero_greeting}")
        assert hero_greeting == "Olen"
        
        # 3. Check 8 project cards
        cards = page.locator(".project-card")
        count = cards.count()
        print(f"Total project cards rendered: {count}")
        assert count == 8, f"Expected 8 project cards, got {count}"
        
        # ET Titles
        titles_et = [cards.nth(i).locator(".project-title").inner_text() for i in range(count)]
        print("ET Titles:")
        for idx, t in enumerate(titles_et, 1):
            print(f"  {idx}. {t}")
            
        assert "Markowitz" in titles_et[4]
        assert "Kuku Raadio" in titles_et[6]
        assert "Sotsiaalmeedia" in titles_et[7]
        
        # Kuku Raadio ET description check
        kuku_desc_et = cards.nth(6).locator(".project-desc").inner_text()
        print("Kuku ET Desc:", kuku_desc_et)
        assert "otse" in kuku_desc_et.lower()
        assert "reklaam" in kuku_desc_et.lower()
        assert "cronjob" in kuku_desc_et.lower()
        
        # 4. Check EN Language toggle
        page.locator("#btnLangEN").click()
        page.wait_for_timeout(500)
        
        hero_greeting_en = page.locator("h1.hero-title [data-i18n='heroGreeting']").inner_text()
        print(f"Hero greeting (EN): {hero_greeting_en}")
        assert hero_greeting_en == "I am"
        
        titles_en = [cards.nth(i).locator(".project-title").inner_text() for i in range(count)]
        print("EN Titles:")
        for idx, t in enumerate(titles_en, 1):
            print(f"  {idx}. {t}")
            
        assert "Markowitz" in titles_en[4]
        assert "Kuku Radio" in titles_en[6]
        assert "Social Media" in titles_en[7] or "Automated" in titles_en[7]
        
        kuku_desc_en = cards.nth(6).locator(".project-desc").inner_text()
        print("Kuku EN Desc:", kuku_desc_en)
        assert "live stream" in kuku_desc_en.lower()
        assert "ad removal" in kuku_desc_en.lower()
        assert "cronjob" in kuku_desc_en.lower()
        
        # Switch back to ET
        page.locator("#btnLangET").click()
        page.wait_for_timeout(500)
        
        # 5. Check CV modal
        modal = page.locator("#cvModal")
        assert not modal.is_visible()
        page.locator(".hero-cta .btn-primary").click()
        page.wait_for_timeout(500)
        assert modal.is_visible()
        page.locator(".close-btn").click()
        page.wait_for_timeout(500)
        assert not modal.is_visible()
        print("CV Modal opens and closes properly!")
        
        # 6. Screenshot
        page.locator("#projects").screenshot(path="assets/projects_preview_updated.png")
        print("Saved updated screenshot to assets/projects_preview_updated.png")
        
        browser.close()

if __name__ == "__main__":
    test_page()
