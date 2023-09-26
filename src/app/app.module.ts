import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './core/token.interceptor';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { MyEventsComponent } from './pages/my-events/my-events.component';
import { AdminComponent } from './pages/admin/admin.component';
import { OrganizationComponent } from './pages/organization/organization.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { OrganizationSettingsComponent } from './pages/organization-settings/organization-settings.component';
import { EventComponent } from './pages/event/event.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/feature/header/header.component';
import { FeedComponent } from './components/feature/feed/feed.component';
import { FilterComponent } from './components/ui/filter/filter.component';
import { UserRegisterFormComponent } from './components/ui/user-register-form/user-register-form.component';
import { OrganizationRegisterFormComponent } from './components/ui/organization-register-form/organization-register-form.component';
import { EventCreationFormComponent } from './components/ui/event-creation-form/event-creation-form.component';
import { EventUpdateFormComponent } from './components/feature/event-update-form/event-update-form.component';
import { EventCardComponent } from './components/ui/event-card/event-card.component';
import { UserAccountSettingsComponent } from './components/feature/user-account-settings/user-account-settings.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { OrganizationAccountSettingsComponent } from './components/feature/organization-account-settings/organization-account-settings.component';
import { SearchBarForFriendsComponent } from './components/ui/search-bar-for-friends/search-bar-for-friends.component';
import { SearchBarForEventsComponent } from './components/ui/search-bar-for-events/search-bar-for-events.component';
import { FollowEventComponent } from './components/feature/follow-event/follow-event.component';
import { ContactComponent } from './pages/contact/contact.component';
import { UserRegisterComponent } from './components/feature/user-register/user-register.component'
import { OrganizationRegisterComponent } from './components/feature/organization-register/organization-register.component';
import { SearchBarComponent } from './components/ui/search-bar/search-bar.component'
import { NavBarComponent } from './components/ui/nav-bar/nav-bar.component';
import { LocalizationFormComponent } from './components/ui/localization-form/localization-form.component';
import { CategoriesFormComponent } from './components/ui/categories-form/categories-form.component';
import { EventCreationComponent } from './components/feature/event-creation/event-creation.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginShapeComponent } from './components/feature/login-shape/login-shape.component';
import { LoginFormComponent } from './components/ui/login-form/login-form.component';
import { PopUpComponent } from './components/feature/pop-up/pop-up.component';
import { PopUpContentsComponent } from './components/ui/pop-up-contents/pop-up-contents.component';
import { EventDetailedComponent } from './components/feature/event-detailed/event-detailed.component';
import { EventFullComponent } from './components/ui/event-full/event-full.component';
import { MapComponent } from './pages/map/map.component';
import { MapGatherComponent } from './components/feature/map-gather/map-gather.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HeroComponent } from './components/ui/hero/hero.component';
import { HelperComponent } from './pages/helper/helper.component';
import { HelpAdviceComponent } from './components/ui/help-advice/help-advice.component';
import { ContactFormComponent } from './components/ui/contact-form/contact-form.component';
import { InformationComponent } from './components/ui/information/information.component';
import { InputStyleComponent } from './components/ui/input-style/input-style.component';
import { ReactButtonComponent } from './components/feature/react-button/react-button.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminManagerComponent } from './components/feature/admin-manager/admin-manager.component';
import { AdminPopupComponent } from './components/ui/admin-popup/admin-popup.component';
import { ErrorPageContentsComponent } from './components/ui/error-page-contents/error-page-contents.component';
import { OrganizationDetailedComponent } from './components/feature/organization-detailed/organization-detailed.component';
import { OrgnizationDetailedContentsComponent } from './components/ui/orgnization-detailed-contents/orgnization-detailed-contents.component';
import { TitleStyleComponent } from './components/ui/title-style/title-style.component';
import { JoinEventComponent } from './components/feature/join-event/join-event.component';
import { LegalComponent } from './pages/legal/legal.component';
import { LegalContentsComponent } from './components/ui/legal-contents/legal-contents.component';
import { CguComponent } from './pages/cgu/cgu.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserProfileComponent } from './components/feature/user-profile/user-profile.component';
import { ProfileIntroComponent } from './components/ui/profile-intro/profile-intro.component';
import { ProfileEventsComponent } from './components/ui/profile-events/profile-events.component';
import { ProfileOrgaComponent } from './components/ui/profile-orga/profile-orga.component';
import { ProfileReactsComponent } from './components/ui/profile-reacts/profile-reacts.component';
import { MapFocusComponent } from './components/feature/map-focus/map-focus.component';
import { OrgaToFavoriteComponent } from './components/feature/orga-to-favorite/orga-to-favorite.component';
import { WeekComponent } from './pages/week/week.component';
import { WeekProposalComponent } from './components/feature/week-proposal/week-proposal.component';
import { WeekStructureComponent } from './components/ui/week-structure/week-structure.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    MyEventsComponent,
    AdminComponent,
    OrganizationComponent,
    CreateEventComponent,
    UserSettingsComponent,
    OrganizationSettingsComponent,
    EventComponent,
    HeaderComponent,
    FeedComponent,
    FilterComponent,
    UserRegisterFormComponent,
    OrganizationRegisterFormComponent,
    EventCreationFormComponent,
    EventUpdateFormComponent,
    EventCardComponent,
    UserAccountSettingsComponent,
    FooterComponent,
    OrganizationAccountSettingsComponent,
    SearchBarForFriendsComponent,
    SearchBarForEventsComponent,
    FollowEventComponent,
    ContactComponent,
    OrganizationRegisterComponent,
    UserRegisterComponent,
    SearchBarComponent,
    NavBarComponent,
    LocalizationFormComponent,
    CategoriesFormComponent,
    EventCreationFormComponent,
    CreateEventComponent,
    EventCreationComponent,
    LoginComponent,
    LoginShapeComponent,
    LoginFormComponent,
    PopUpComponent,
    PopUpContentsComponent,
    EventDetailedComponent,
    EventFullComponent,
    MapComponent,
    MapGatherComponent,
    LandingComponent,
    HeroComponent,
    HelperComponent,
    HelpAdviceComponent,
    ContactFormComponent,
    InformationComponent,
    InputStyleComponent,
    RegisterComponent,
    AdminManagerComponent,
    AdminPopupComponent,
    ReactButtonComponent,
    RegisterComponent,
    ErrorPageContentsComponent,
    OrganizationDetailedComponent,
    OrgnizationDetailedContentsComponent,
    TitleStyleComponent,
    JoinEventComponent,
    LegalComponent,
    LegalContentsComponent,
    CguComponent,
    ProfileComponent,
    UserProfileComponent,
    ProfileIntroComponent,
    ProfileEventsComponent,
    ProfileOrgaComponent,
    ProfileReactsComponent,
    MapFocusComponent,
    OrgaToFavoriteComponent,
    WeekComponent,
    WeekProposalComponent,
    WeekStructureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
