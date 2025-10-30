import { Routes } from '@angular/router';
import { LoginComponent } from './features/sdmtek/pages/login/login.component';
import { HomeComponent } from './features/sdmtek/pages/home/home.component';
import { ServicesComponent } from './features/sdmtek/pages/services/services.component';
import { AboutComponent } from './features/sdmtek/pages/about/about.component';
import { ContactComponent } from './features/sdmtek/pages/contact/contact.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'services', component: ServicesComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
