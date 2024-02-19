import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { ViewAllBooksComponent } from './page/view-all-books/view-all-books.component';
import { Component } from '@angular/core';
import { RegisterComponent } from './page/register/register.component';

export const routes: Routes = [
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"view-all-book",
        component:ViewAllBooksComponent
    },
    {
        path:"sign-up",
        component:RegisterComponent
    }
];
