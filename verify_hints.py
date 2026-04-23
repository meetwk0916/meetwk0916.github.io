import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the local server
        await page.goto('http://localhost:8080')

        # Wait for the quote text to be populated (not "Loading...")
        await page.wait_for_function('document.querySelector(".quote-text").innerText !== "Loading..."')

        # Create output directory
        import os
        os.makedirs('/home/jules/verification', exist_ok=True)

        # Take screenshot of initial state (mouse hint should be visible on hover/default, keyboard hint hidden)
        await page.hover('.quote')
        await page.screenshot(path='/home/jules/verification/initial_state.png', full_page=True)

        # Simulate Tab key to focus the widget
        await page.keyboard.press('Tab')

        # Small wait for CSS to apply
        await asyncio.sleep(0.5)

        # Take screenshot of focused state (keyboard hint should be visible, mouse hint hidden)
        await page.screenshot(path='/home/jules/verification/focused_state.png', full_page=True)

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
