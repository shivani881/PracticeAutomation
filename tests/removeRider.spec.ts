import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";
import { AddOrder } from "../pages/AddOrder";

test("remove rider from an order", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  const addorder = new AddOrder(page);
  await dashboard.navigate();
  await dashboard.checkOrders();
  await dashboard.removeRiderBtn.click();
  await expect(addorder.message).toHaveText(
    "Rider(s) have been successfully removed from the order(s).",
  );
  await dashboard.closepopup.first().click()
  await dashboard.removeRiderBtn.click();
  await expect(addorder.message).toHaveText("Please select at least one order")
});
