import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DiscussionComponent } from '../../discussion/discussion.component';
import { AdvertisementComponent } from '../../advertisement/advertisement.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { LoginComponent } from '../../login/login.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
// import { ModalModule,BsModalRef } from 'ngx-bootstrap/modal';
import {ConfirmationDialog} from '../../discussion/confirmation-dialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatExpansionModule,
    NgxSpinnerModule,
    MatDialogModule,
    // ModalModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    DiscussionComponent,
    AdvertisementComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    LoginComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ConfirmationDialog
  ],entryComponents: [ConfirmationDialog],exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatTooltipModule,
    MatExpansionModule,
    NgxSpinnerModule
  ],
  providers: [],
})

export class AdminLayoutModule {}
