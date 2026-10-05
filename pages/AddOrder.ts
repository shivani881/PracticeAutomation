import { Page, Locator, expect } from "@playwright/test";

export class AddOrder {
  readonly modaltitle: Locator;
  readonly page: Page;
  readonly orderRef: Locator;
  readonly orderDesc: Locator;
  readonly orderPriority: Locator;
  readonly orderType: Locator;
  readonly listbox: Locator;
  readonly selectRider: Locator;
  readonly selectCustomer: Locator;
  readonly phoneNo: Locator;
  readonly location: Locator;
  readonly searchAddress: Locator;
  readonly searchResults: Locator;
  readonly selectedAddress: Locator;
  readonly addLocation: Locator;
  //   readonly haltDuration: Locator;
  readonly selectHalt: Locator;
  readonly applyHalt: Locator;
  //   readonly stopNumber: Locator;
  //   readonly notes: Locator;
  readonly pickupdateWithTime: Locator;
  readonly pickupdateWithoutTime: Locator;
  readonly dropoffdateWithTime: Locator;
  readonly dropoffdateWithoutTime: Locator;
  readonly contiuneToLoadParameter: Locator;
  readonly continueToSkills: Locator;
  readonly saveBtn: Locator;
  readonly message: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modaltitle = page.locator("#add-task-modal-title");
    this.orderRef = page.locator("#add-task-order-refrenceId");
    this.orderDesc = page.locator("#add-task-description");
    this.orderPriority = page.locator("#add-task-priority");
    this.orderType = page.locator("#select2-add-task-type-container");
    this.listbox = page.getByRole("listbox");
    this.selectRider = page.locator("#select2-add-rider-container");
    this.selectCustomer = page.locator("#select2-add-customer-container");
    this.phoneNo = page.locator("#add-task-order-phone");
    this.location = page.getByRole("link", { name: "Select Location" });
    this.searchAddress = page.getByPlaceholder("Search Address");
    this.searchResults = page.locator("#place");
    this.selectedAddress = page.locator(".leaflet-popup-content");
    this.addLocation = page.locator("#add-poi-btn:visible");
    // this.haltDuration = page.locator("#add-pickup-halt-duration");
    this.selectHalt = page.locator(".minuteselect");
    this.applyHalt = page.locator(".applyBtn:not(:disabled)");
    // this.stopNumber = page.locator("#add-pickup-task-number");
    // this.notes = page.locator("#add-pickup-task-notes");
    this.pickupdateWithTime = page.locator(
      'label[for="pickupDateWithTimeRadio"]',
    );
    this.pickupdateWithoutTime = page.locator(
      'label[for="pickupDateWithOutTimeRadio"]',
    );
    this.dropoffdateWithTime = page.locator(
      'label[for="dropoffDateWithTimeRadio"]',
    );
    this.dropoffdateWithoutTime = page.locator(
      'label[for="dropoffDateWithOutTimeRadio"]',
    );
    this.contiuneToLoadParameter = page.locator(
      "#continue-load-parameter-form",
    );
    this.continueToSkills = page.locator("#continue-skills-form");
    this.saveBtn = page.locator("#save-task-order");
    this.message = page.locator("#swal2-content");
  }

  async fillBasicOrderDetails(
    refID: string,
    desc: string,
    priority: string,
    orderType: string,
    rider: string,
    customer: string,
    num: string,
  ) {
    await this.orderRef.fill(refID);
    await this.orderDesc.fill(desc);
    await this.orderPriority.selectOption(priority);
    await this.orderType.click();
    await this.listbox.getByText(orderType).click();
    await this.selectRider.click();
    await this.listbox.getByText(rider).click();
    await this.selectCustomer.click();
    await this.listbox.getByText(customer).click();
    await this.phoneNo.clear();
    await this.phoneNo.fill(num);
  }
  async fillLocationDetails(address: string, Results: string) {
    await this.location.click();
    await this.searchAddress.fill(address);
    await this.searchResults.getByText(Results).click();
    await expect(this.selectedAddress).toBeVisible();
    await this.addLocation.click();
  }


  // 🔑 Ye method order type (jaise 'pickup', 'dropoff') lega aur field name ke sath combine karke exact ID bana dega
  private getDynamicFieldLocator(orderType: string, fieldName: string) {
    // Agar orderType 'Pickup' hai, toh ye lowercase karke 'pickup' bana lega
    // Result banega: #add-pickup-halt-duration ya #add-dropoff-halt-duration
    const typeLower = orderType.toLowerCase();
    let prefix = typeLower;
    if (typeLower === "service") {
      prefix = "dropoff";
    }
    return this.page.locator(`#add-${prefix}-${fieldName}`);
  }

  async fillOtherDetails(
    orderType: string,
    halt: string,
    stop: string,
    notes: string,
  ) {
    const haltDurationLocator = this.getDynamicFieldLocator(
      orderType,
      "halt-duration",
    );
    const stopNumberLocator = this.getDynamicFieldLocator(
      orderType,
      "task-number",
    );
    const NotesLocator = this.getDynamicFieldLocator(orderType, "task-notes");
    await haltDurationLocator.click();
    await this.selectHalt.first().selectOption(halt);
    await this.applyHalt.nth(0).click();
    await stopNumberLocator.fill(stop);
    await NotesLocator.fill(notes);
    if (orderType === "pickup") {
      await this.pickupdateWithoutTime.click();
    } else if (orderType === "dropoff" || orderType === "service") {
      await this.dropoffdateWithoutTime.click();
    }
  }
  async submitOrderForm() {
    await this.contiuneToLoadParameter.click();
    await this.continueToSkills.click();
    await this.saveBtn.click();
  }
}
