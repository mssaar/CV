from playwright.sync_api import sync_playwright
import os

def test_page():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1400, "height": 900})
        
        url = f"file:///{os.path.abspath('index.html').replace(os.sep, '/')}"
        page.goto(url)
        page.wait_for_timeout(1000)
        
        # Verify 7 project cards
        cards = page.locator(".project-card")
        count = cards.count()
        print(f"Total project cards rendered: {count}")
        assert count == 7, f"Expected 7 project cards, got {count}"
        
        # Check titles in ET
        titles_et = [cards.nth(i).locator(".project-title").inner_text() for i in range(count)]
        print("ET Titles:", titles_et)
        
        # Check language switch to EN
        page.locator("#btnLangEN").click()
        page.wait_for_timeout(500)
        titles_en = [cards.nth(i).locator(".project-title").inner_text() for i in range(count)]
        print("EN Titles:", titles_en)
        assert titles_en[0] == "The Rand — Beach Sports Center Platform"
        assert titles_en[1] == "Beach Arena Smart Lighting Automation"
        assert titles_en[2] == "ProSystem OÜ — Corporate Web & Internal PWA"
        
        # Switch back to ET
        page.locator("#btnLangET").click()
        page.wait_for_timeout(500)
        
        # Test CV Modal
        modal = page.locator("#cvModal")
        assert not modal.is_visible()
        page.locator(".hero-cta .btn-primary").click()
        page.wait_for_timeout(500)
        assert modal.is_visible()
        print("CV modal opened successfully")
        page.locator(".close-btn").click()
        page.wait_for_timeout(500)
        assert not modal.is_visible()
        print("CV modal closed successfully")
        
        # Screenshot of projects grid
        page.locator("#projects").screenshot(path="assets/projects_preview_updated.png")
        print("Saved projects grid screenshot to assets/projects_preview_updated.png")
        
        browser.close()

if __name__ == "__main__":
    test_page()
