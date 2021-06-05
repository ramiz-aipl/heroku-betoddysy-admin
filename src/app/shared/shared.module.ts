import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ErrorLogService } from '../services/error-log.service';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { ModalModule } from 'ngx-bootstrap/modal';
// import { ValidationComponent } from '../components/validation/validation.component';
// import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

// import { ConfirmationDialogService } from '../services/confirmation-dialog.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatDialogModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule
    // ModalModule.forRoot(),
  ],
  declarations: [
    // ValidationComponent,
    // ConfirmationDialogComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatDialogModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    MatBottomSheetModule,
    // ValidationComponent,
    // ConfirmationDialogComponent,
  ],
  entryComponents: [
    // ConfirmationDialogComponent
  ],
  providers: [
    DatePipe,
    ErrorLogService
    // ConfirmationDialogService,
    
  ]
})
export class SharedModule { }
