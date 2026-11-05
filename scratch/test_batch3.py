from playwright.sync_api import sync_playwright
import os

def test_page():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1400, "height": 900})
        
        url = f"file:///{os.path.abspath('index.html').replace(os.sep, '/')}"
        page.goto(url)
        page.wait_for_timeout(1000)
        
        cards = page.locator(".project-card")
        count = cards.count()
        assert count == 8, f"Expected 8 cards, got {count}"
        
        print("\n--- ET BADGES & TITLES ---")
        badges_et = [cards.nth(i).locator(".media-overlay .badge").inner_text() for i in range(count)]
        titles_et = [cards.nth(i).locator(".project-title").inner_text() for i in range(count)]
        for i in range(count):
            print(f"{i+1}. [{badges_et[i]}] {titles_et[i]}")
            
        assert badges_et[0] == "Live Veebirakendus"
        assert badges_et[1] == "Avatud lähtekood"
        assert badges_et[2] == "Live Veeb & PWA"
        assert badges_et[3] == "Avatud lähtekood"
        assert badges_et[4] == "Finants- & kvantmudel"
        assert badges_et[5] == "Avatud lähtekood"
        assert badges_et[6] == "Avatud lähtekood"
        assert badges_et[7] == "Automaatika pipeline"
        
        # Check Markowitz ET description
        m_desc_et = cards.nth(4).locator(".project-desc").inner_text()
        print("\nMarkowitz ET Desc:", m_desc_et)
        assert "mitu tükki" in m_desc_et or "mitu tk" in m_desc_et
        
        # Check Autom-sots ET description
        s_desc_et = cards.nth(7).locator(".project-desc").inner_text()
        print("\nAutom-sots ET Desc:", s_desc_et)
        assert "Meta Graph API" in s_desc_et
        assert "ElevenLabs" in s_desc_et
        assert "FFmpeg" in s_desc_et
        
        # Check that Markowitz and Autom-sots do NOT have GitHub links
        assert cards.nth(4).locator("a[href*='Markowitz-Portfolio']").count() == 0
        assert cards.nth(7).locator("a[href*='Autom-sots.meedia']").count() == 0
        print("Confirmed no broken GitHub links on private repos.")
        
        # Switch to EN
        print("\n--- EN BADGES & TITLES ---")
        page.locator("#btnLangEN").click()
        page.wait_for_timeout(500)
        
        badges_en = [cards.nth(i).locator(".media-overlay .badge").inner_text() for i in range(count)]
        titles_en = [cards.nth(i).locator(".project-title").inner_text() for i in range(count)]
        for i in range(count):
            print(f"{i+1}. [{badges_en[i]}] {titles_en[i]}")
            
        assert badges_en[0] == "Live Platform"
        assert badges_en[1] == "Open Source"
        assert badges_en[2] == "Live Web & PWA"
        assert badges_en[3] == "Open Source"
        assert badges_en[4] == "Quantitative Finance Model"
        assert badges_en[5] == "Open Source"
        assert badges_en[6] == "Open Source"
        assert badges_en[7] == "Automation Pipeline"
        
        # Check Markowitz EN description
        m_desc_en = cards.nth(4).locator(".project-desc").inner_text()
        print("\nMarkowitz EN Desc:", m_desc_en)
        assert "share quantities to purchase" in m_desc_en
        
        # Check Autom-sots EN description
        s_desc_en = cards.nth(7).locator(".project-desc").inner_text()
        print("\nAutom-sots EN Desc:", s_desc_en)
        assert "Meta Graph API" in s_desc_en
        assert "ElevenLabs" in s_desc_en
        
        # Switch back to ET
        page.locator("#btnLangET").click()
        page.wait_for_timeout(500)
        
        # Screenshot
        page.locator("#projects").screenshot(path="assets/projects_preview_updated.png")
        print("\nSaved updated screenshot to assets/projects_preview_updated.png")
        
        browser.close()

if __name__ == "__main__":
    test_page()
