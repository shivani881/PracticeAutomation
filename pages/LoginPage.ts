import {Page, Locator} from '@playwright/test'


export class LoginPage{
// declare variables
readonly page: Page;
readonly companyid: Locator;
readonly usernameInput:Locator;
readonly passwordInput: Locator;
readonly loginbtn : Locator;

constructor(page:Page){
    this.page = page;
    this.companyid = page.locator('input[placeholder = "Company Identifier"]:visible');
    this.usernameInput = page.locator('input[placeholder = "Enter your username"]:visible')
    this.passwordInput = page.locator('input[placeholder = "Enter your password"]:visible')
    this.loginbtn = page.locator('#app-login-btn:visible')
}
async navigate(){
    await this.page.goto("https://tmqa.trackofarm.in/?lang=en")
}

async login(cid:string,username:string,password:string){
    await this.companyid.fill(cid);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginbtn.click();
}

}