import{test,expect} from '@playwright/test'
import { DashboardPage } from '../pages/DashboardPage'
import { EditOrder } from '../pages/EditOrder';

test("Edit an order", async({page})=>{
    const dashboard = new DashboardPage(page);
    const editorder = new EditOrder(page);
    await dashboard.navigate();
    await dashboard.checkOrders();
    await dashboard.editOrderBtn.click();
    await expect(dashboard.editmodaltitle).toHaveText("Update Order")
    await editorder.editOrderDetails('edit order id','editeddddddd')
    await expect(editorder.message).toHaveText("Order Successfully Updated")
    

})