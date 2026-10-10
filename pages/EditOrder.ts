import { Page, Locator } from "@playwright/test";

export class EditOrder {
  readonly page: Page;
  readonly orderRef: Locator;
  readonly orderDesc: Locator;
  readonly orderPriority: Locator;
  readonly  orderType : Locator;
  readonly editPickupOrderStartTime: Locator;
   readonly editDropoffOrderStartTime: Locator;
  readonly selectStartHour;
  readonly selectStartMinute: Locator;
  readonly applyTime: Locator;
  readonly editcontiune1: Locator;
  readonly editcontinue2: Locator;
  readonly updateBtn: Locator;
  readonly message: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderRef = page.locator("#edit-task-order-refrenceId");
    this.orderDesc = page.locator("#edit-task-description");
    this.orderPriority = page.locator("#edit-task-priority");
    this.orderType = page.locator("#select2-edit-task-type-container")
    this.editDropoffOrderStartTime = page.locator("#edit-dropoff-start-date");
    this.editPickupOrderStartTime = page.locator("#edit-pickup-start-date");
    this.selectStartHour = page.locator(".hourselect");
    this.selectStartMinute = page.locator(".minuteselect");
    this.applyTime = page.locator(".applyBtn:not(:disabled)");
    this.editcontiune1 = page.locator("#continue-load-parameter-form-edit");
    this.editcontinue2 = page.locator("#continue-skills-form-edit");
    this.updateBtn = page.locator("#edit-task-order-update-btn");
    this.message = page.locator("#swal2-content");
  }

  async editOrderDetails(ReferenceID: string, Description: string) {
    await this.orderRef.clear();
    await this.orderRef.fill(ReferenceID);
    await this.orderDesc.fill(Description);
    const orderType = await this.orderType.innerText()
    console.log(orderType)
    if(orderType==='Pickup'){
      await this.editPickupOrderStartTime.click()
    }else if (orderType === "DropOff"
     || orderType === "Service"){
await this.editDropoffOrderStartTime.click()
    }
    
    let now = new Date();
    now.setMinutes(now.getMinutes() + 5);
    let newHour = String(now.getHours()).padStart(2, "0");
    let newMinute = String(now.getMinutes()).padStart(2, "0");
    await this.selectStartHour.nth(0).selectOption(newHour);
    await this.selectStartMinute.nth(0).selectOption(newMinute);
    //  let getMinute =  await this.selectStartTime.nth(0).inputValue()
    //  console.log(getMinute)
    //  let updatedMinute= Number(getMinute)+5;
    //  await this.selectStartTime.nth(0).selectOption(updatedMinute.toString())
    await this.applyTime.nth(0).click();
    await this.editcontiune1.click();
    await this.editcontinue2.click();
    await this.updateBtn.click();
  }
}
