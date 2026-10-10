import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";
import { AddOrder } from "../pages/AddOrder";

test("Add Pickup order through UI", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  const addorder = new AddOrder(page);
  await dashboard.navigate();
  await dashboard.addOrderBtn.click();
  await expect(addorder.modaltitle).toHaveText("Add Order");
  await addorder.fillBasicOrderDetails("pickup order","pickup desc","Critical","Pickup","boss","gorgan","9089789032")
  await addorder.fillLocationDetails("pinnacle business park"," Noida Sector 3")
  await addorder.fillOtherDetails("Pickup","05","4","pickup notes");
  await addorder.submitOrderForm();
    await expect(addorder.message).toHaveText("Order Successfully Saved",{timeout:20000})
 
});

test("Add Dropoff order through UI", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  const addorder = new AddOrder(page);
  await dashboard.navigate();
  await dashboard.addOrderBtn.click();
  await expect(addorder.modaltitle).toHaveText("Add Order");
  await addorder.fillBasicOrderDetails("dropoff order","dropoff desc","High","DropOff","anaya","mrunal","899789032")
  await addorder.fillLocationDetails("pinnacle business park"," Noida Sector 3")
  await addorder.fillOtherDetails("DropOff","01","3","dropoff notes");
  await addorder.submitOrderForm();
    await expect(addorder.message).toHaveText("Order Successfully Saved",{timeout:20000})

});

test("Add Service order through UI", async ({ page }) => {
  const dashboard = new DashboardPage(page);
  const addorder = new AddOrder(page);
  await dashboard.navigate();
  await dashboard.addOrderBtn.click();
  await expect(addorder.modaltitle).toHaveText("Add Order");
  await addorder.fillBasicOrderDetails("service order","service desc","Normal","Service","anaya","mrunal","899789032")
  await addorder.fillLocationDetails("pinnacle business park"," Noida Sector 3")
  await addorder.fillOtherDetails("Service","10","5","service notes");
  await addorder.submitOrderForm();
    await expect(addorder.message).toHaveText("Order Successfully Saved",{timeout:20000})

});

