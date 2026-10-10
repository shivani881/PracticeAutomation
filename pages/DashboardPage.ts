import{Page,Locator} from '@playwright/test'

export class DashboardPage{
    readonly page : Page;
    readonly addOrderBtn : Locator;
    readonly editOrderBtn : Locator;
    readonly removeRiderBtn: Locator;
    readonly cloneOrderBtn : Locator;
    readonly cancelOrderBtn : Locator;
    readonly unscheduleOrderBtn : Locator;
    readonly selectOrder : Locator;
    readonly messagePopup : Locator;
    readonly closepopup : Locator;
    readonly editmodaltitle:Locator;
    readonly clonemodaltitle:Locator;


    constructor(page:Page){
        this.page = page;
        this.addOrderBtn = page.getByRole('button', { name: 'Add Order' })
        this.editOrderBtn = page.getByRole('button', { name: ' Edit Order' })
        this.removeRiderBtn = page.getByRole('button', { name: ' Remove Rider' })
        this.cloneOrderBtn = page.getByRole('button', { name: ' Clone Order' })
        this.cancelOrderBtn = page.getByRole('button', { name: ' Cancel Order' })
        this.unscheduleOrderBtn = page.getByRole('button', { name: ' Unschedule Order' })
        this.selectOrder = page.locator("tbody>tr>td.checkbox-column>input")
         this.messagePopup = page.locator("#swal2-content");
         this.closepopup = page.locator(".swal2-actions>button")
         this.editmodaltitle =  page.getByRole('heading', { name: 'Update Order' })
         this.clonemodaltitle = page.getByRole('heading', { name: 'Clone Order' })
    }

   async navigate() {
  await this.page.goto("https://tmqa.trackofarm.in/web/0/route/allocation/dashboard?lang=en", {
    waitUntil: 'domcontentloaded', 
    timeout: 60000 
  });
}

  async checkOrders(){
    await this.selectOrder.nth(0).check();
       
  }

 
}