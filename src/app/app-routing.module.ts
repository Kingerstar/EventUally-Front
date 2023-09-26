import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { ErrorComponent } from './pages/error/error.component';
import { EventComponent } from './pages/event/event.component';
import { MyEventsComponent } from './pages/my-events/my-events.component';
import { OrganizationComponent } from './pages/organization/organization.component';
import { OrganizationSettingsComponent } from './pages/organization-settings/organization-settings.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { MapComponent } from './pages/map/map.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HelperComponent } from './pages/helper/helper.component';
import { RegisterComponent } from './pages/register/register.component';
import { LegalComponent } from './pages/legal/legal.component';
import { CguComponent } from './pages/cgu/cgu.component';
import { ConnectedGuard } from './core/connected.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WeekComponent } from './pages/week/week.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'welcome', component: LandingComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'event/:id', component: EventComponent },
  { path: 'map', component: MapComponent },
  { path: 'my-events', component: MyEventsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'organization/:id', component: OrganizationComponent },
  { path: 'organization-settings', component: OrganizationSettingsComponent },
  { path: 'settings', component: UserSettingsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'help', component: HelperComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'cgu', component: CguComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [ConnectedGuard] },
  { path: 'week', component: WeekComponent, canActivate: [ConnectedGuard] },
  { path: '**', component: ErrorComponent, pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
