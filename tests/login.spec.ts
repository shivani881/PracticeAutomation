import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test("Login in TM",async({page})=>{
    let loginpage = new LoginPage(page);
   await loginpage.navigate();
   await loginpage.login("tm_roles","tm_roles","roles123");
   await expect(page).toHaveURL(/allocation/)
   
})

