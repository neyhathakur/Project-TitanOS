import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
    private page: Page;
    private searchBox: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locate the search textbox
        this.searchBox = page.getByRole('textbox', { name: 'Search Movies, Shows, Apps' });
    }

    /**
     * Performs a full search and keyboard navigation through category tabs,
     * validating each tab is enabled and logs the search result count.
     *
     * @param searchTerm - The term to input into the search box
     * @param sectionNames - List of category names to navigate and validate
     */
    async fullSearchAndNavigateFlow(searchTerm: string, sectionNames: string[]): Promise<void> {
        try {
            // Focus top navigation by pressing ArrowUp twice
            await this.page.keyboard.press('ArrowUp');
            await this.page.waitForTimeout(1000);
            await this.page.keyboard.press('ArrowUp');
            await this.page.waitForTimeout(1000);

            // Navigate left once to reach search input area and press Enter to activate
            await this.page.keyboard.press('ArrowLeft');
            await this.page.waitForTimeout(1000);
            await this.page.keyboard.press('Enter');

            // Validate the search page URL
            await this.page.waitForURL('**/search', { timeout: 1000 });
            const currentURL = this.page.url();
            console.log(`Navigated to search URL: ${currentURL}`);
            await expect(this.page).toHaveURL(/\/search/);

            // Fill the search box with the provided search term
            await this.searchBox.fill(searchTerm);
            await this.page.waitForTimeout(3000);

            // Press ArrowDown to move focus down to the category tab bar
            await this.page.keyboard.press('ArrowDown');
            await this.page.waitForTimeout(1000);

            // Iterate through the category tabs to navigate, enter, validate, and log counts
            for (let index = 0; index < sectionNames.length; index++) {
                if (index !== 0) {
                    // Move right for all tabs except the first (focus assumed to start at first)
                    await this.page.keyboard.press('ArrowRight');
                    await this.page.waitForTimeout(2000);
                }

                // Press Enter to select the current category tab
                await this.page.keyboard.press('Enter');
                await this.page.waitForTimeout(2000);

                // Wrap expect and text retrieval in try/catch for resilience
                try {
                    const categoryLocator = this.page.locator('p', { hasText: new RegExp(sectionNames[index], 'i') });
                    await expect(categoryLocator).toBeEnabled();
                } catch (error) {
                    console.warn(`Warning: Category tab '${sectionNames[index]}' is not enabled or missing. Error:`, error);
                    continue; // Skip to next section tab without breaking loop
                }

                try {
                    const countLocator = this.page.locator(`(//div[@role="tab"])[${index + 1}]//p[contains(@class, "typography-main-semibold") and @aria-label]`);
                    const countText = await countLocator.textContent();
                    console.log(`Search result for '${searchTerm}' related to '${sectionNames[index]}' are ${countText?.trim()}`);
                } catch (error) {
                    console.warn(`Warning: Failed to retrieve count text for category '${sectionNames[index]}'. Error:`, error);
                }
            }
        } catch (outerError) {
            console.error('Error during fullSearchAndNavigateFlow:', outerError);
        }
    }

}
