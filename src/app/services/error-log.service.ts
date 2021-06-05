import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { errorMessage } from '../shared/app.constants'
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from 'rxjs';
// import { MatSnackBar } from '@angular/material';
@Injectable()
export class ErrorLogService extends ErrorHandler {

  messageConfig = {
    animate: 'slideFromRight',
    position: 'top-right',
    enableHTML: true,
    toastTimeout:6000
  };

  constructor(
    public toastr: ToastrManager,
    // private snackBar: MatSnackBar
  ) {
    super();
  }

  // handleError(error): void {
  //   this.errorLogService.logError(error);
  // }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (typeof error.error.message !== 'undefined') {
        this.toastr.errorToastr(error.error.message, '', this.messageConfig);
      } else if (typeof error.message !== 'undefined') {
        if (error.status === 404) {
          this.toastr.errorToastr(errorMessage.pageNotFound, '404', this.messageConfig);
        } else if (error.status === 500) {
          this.toastr.errorToastr(errorMessage.internalServerError, '500', this.messageConfig);
        } else if (error.status === 403) {
          this.toastr.errorToastr(errorMessage.forbidden, '403', this.messageConfig);
        } else if (error.status === 0) {
          this.toastr.errorToastr(errorMessage.unknownError, '0', this.messageConfig);
        } else {
          this.toastr.errorToastr(error.message, '', this.messageConfig);
        }
      } else if (typeof error.status !== 'undefined') {
        this.toastr.errorToastr(error.status.toString(), '', this.messageConfig);
      } else {
        this.toastr.errorToastr(errorMessage.httpError, '', this.messageConfig);
      }
      // console.error(date, AppConstants.httpError, error.message, 'Status code:',
      // (<HttpErrorResponse>error).status);
    }
    else if (error instanceof TypeError) {
      if (typeof error.message !== 'undefined') {
        this.toastr.errorToastr(error.message, '', this.messageConfig);
      } else {
        this.toastr.errorToastr(errorMessage.typeError, '', this.messageConfig);
      }
      // console.error(date, AppConstants.typeError, error.message, error.stack);
    }
    else if (error instanceof Error) {
      if (typeof error.message !== 'undefined') {
        this.toastr.errorToastr(error.message, '', this.messageConfig);
      } else {
        this.toastr.errorToastr(errorMessage.generalError, '', this.messageConfig);
      }
      // console.error(date, AppConstants.generalError, error.message, error.stack);
    }
    else if (error instanceof ErrorEvent) {
      if (typeof error.message !== 'undefined') {
        this.toastr.errorToastr(error.message, '', this.messageConfig);
      } else {
        this.toastr.errorToastr(errorMessage.generalError, '', this.messageConfig);
      }
      //A client-side or network error occurred. Handle it accordingly.
      // console.error(date, AppConstants.generalError, error.message);
    }
    else {
      if (typeof error !== 'undefined') {
        this.toastr.errorToastr(error, '', this.messageConfig);
      } else {
        this.toastr.errorToastr(errorMessage.somethingWrong, '', this.messageConfig);
      }
      // console.error(date, AppConstants.somethingHappened, error.message, error.stack);
    }
  }
  handleSuccess(message: any) {
    // this.snackBar.open(message, 'Ok', {
    //   duration: 3000,
    //   // verticalPosition: 'bottom',
    //   // horizontalPosition: 'right',
    // });
    this.toastr.successToastr(message, '', this.messageConfig);
  }
  handleWarning(message: any) {
    this.toastr.warningToastr(message, '', this.messageConfig);
  }
}