import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";

test("clone order", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.navigate();
    await dashboard.checkOrders();
  await dashboard.cloneOrderBtn.click();
await expect(dashboard.clonemodaltitle).toBeVisible()
  await expect(dashboard.clonemodaltitle).toHaveText("Clone Order");
});
