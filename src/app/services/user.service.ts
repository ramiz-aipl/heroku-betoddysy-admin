import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorLogService } from './error-log.service';
import { ILogin } from '../shared/interfaces';
import { appApi, appHeader } from "../shared/app.constants";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorLogService: ErrorLogService,
    private spinner: NgxSpinnerService) { }

  login(data) {
    // let input = new FormData();
    // for (var key in data) {
    //   if (typeof data[key] == 'object') {
    //     var details = JSON.stringify(data[key]);
    //     input.append(key, details);
    //   } else {
    //     input.append(key, data[key]);
    //   }
    // }

    console.log('login called')
    this.spinner.show();
    const headers= new HttpHeaders()
      .set('Authorization', 'Bearer 6cacea4e172df35ae78ca1d2231e312cc92eead2')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
      .set('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    return this.http.post<any>(appApi.login, data,{ 'headers': headers }).subscribe(
      (result) => {
        this.spinner.hide();
        console.log(result,'result')
        if (result.status) {
          // if (result.data.RoleID == '5') {
          //   result.data.RoleID = '4';
          // }
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('ID', result.data._id);
          localStorage.setItem('UserID', result.data.UserID);
          localStorage.setItem('Username', result.data.UserName);
          localStorage.setItem('Name', result.data.UserFirstName + ' ' + result.data.UserLastName);
          localStorage.setItem('Email', result.data.UserEmail);
          localStorage.setItem('RoleID', result.data.UserGroup);
          localStorage.setItem('ProfileImage', result.data.UserPicture);
          localStorage.setItem('Token', result.token);
          this.errorLogService.handleSuccess(result.message);
          this.router.navigate(['/'])
          
        } else {
          this.errorLogService.handleError(result.message)
        }
      },
      (error) => this.handleError(error)
      );
      
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(['/'])
      
  }

  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString())
  }

  logout() {
    this.spinner.show();
    // return this.http.get<ILogin>(appApi.logout, appHeader).subscribe(
    //   (result) => {
    //     this.spinner.hide();
    //     if (result.status) {
    //       localStorage.setItem('loggedIn', 'false');
    //       localStorage.setItem('UserID', 'false');
    //       localStorage.setItem('Username', 'false');
    //       localStorage.setItem('RoleID', 'false');
    //       localStorage.setItem('Token', 'false');
    //       this.errorLogService.handleSuccess(result.message)
    //       this.router.navigate(['/login'])
    //     } else {
    //       this.errorLogService.handleError(result.message)
    //     }
    //   },
    //   (error) => this.handleError(error)
    // );
    this.errorLogService.handleSuccess('Logout Successfully')
          this.router.navigate(['/login'])
  }

  forgotPassword(data) {
    this.spinner.show();
    return this.http.post<ILogin>(appApi.forgotPassword, data).subscribe(
      (result) => {
        this.spinner.hide();
        if (result.status) {
          this.errorLogService.handleSuccess(result.message);
          this.router.navigate(['/login'])
        } else {
          this.errorLogService.handleError(result.message)
        }
      },
      (error) => this.handleError(error)
    );
  }
  // SiteSetting() {
  //   this.spinner.show();
  //   return this.http.get<ILogin>(appApi.setting).subscribe(
  //     (result) => {
  //       this.spinner.hide();
  //       if (result.status) {
  //         // this.errorLogService.handleSuccess(result.message);
  //         return result.data;
  //       } else {
  //         this.errorLogService.handleError(result.message)
  //       }
  //     },
  //     (error) => this.handleError(error)
  //   );
  // }

  changePassword(data) {
    this.spinner.show();
    return this.http.post<ILogin>(appApi.changePassword, data, appHeader).subscribe(
      (result) => {
        this.spinner.hide();
        if (result.status) {
          this.errorLogService.handleSuccess(result.message);
          this.router.navigate(['/'])
        } else {
          this.errorLogService.handleError(result.message)
        }
      },
      (error) => this.handleError(error)
    );
  }

  public roleCheck(role_id): boolean {
    var isMatch = false;
    var userRole: string[] = JSON.parse(localStorage.getItem('RoleID'));
    role_id.forEach(element => {
      if (userRole.toString().indexOf(element) > -1) {
        // console.log(userRole.toString().indexOf(element));
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  private handleError(error) {
    this.spinner.hide();
    this.errorLogService.handleError(error);
  }

}
