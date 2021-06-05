import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {Http, ResponseContentType} from '@angular/http';
import * as io from 'socket.io-client';
import { map, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICommon } from '../shared/interfaces';
import { createUrl, createSocialUrl, appHeader } from "../shared/app.constants";
import { UserService } from './user.service';
import * as Rx from 'rxjs';
import { ErrorLogService } from './error-log.service';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    invokeEvent: Subject<any> = new Subject();
    private socket;
    messages: Subject<any>;
    constructor(
        private http: HttpClient,
        private spinner: NgxSpinnerService,
        private errorLogService: ErrorLogService,
        private userService: UserService) {
        
    }
    ChangeRoute(Route) {
        this.invokeEvent.next(Route);
    }
    appHeader() {
        return {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('Token')
            }
        };
    }
    ChangeUpdate(TypeCalling) {
        this.invokeEvent.next(TypeCalling)
    }
    getData(method: string, showSp = true): Observable<ICommon> {
        if (showSp) {
            this.spinner.show();
        }
        return this.http.get<ICommon>(createUrl('api/v1/' + method))
            .pipe(
                map((response) => {
                    this.spinner.hide();
                    if (response) {
                        return response;
                    }else {
                        this.userService.logout()
                    }
                }),
                catchError(this.handleError.bind(this))
            );
    }

    getSocialData(method: string, showSp = true): Observable<ICommon> {

        return this.http.get<ICommon>(createUrl('api/v1/' + method))
            .pipe(
                map((response) => {
                    if (response.code == 401) {
                        this.userService.logout()
                    }
                    return response;
                }),
                catchError(this.handleError.bind(this))
            );
    }

    addData(method, data, showSp = true): Observable<ICommon> {
        if (showSp) {
            this.spinner.show();
        }
        return this.http.post<ICommon>(createUrl('api/v1/' + method), data)
            .pipe(
                map((response) => {
                    if (response.code == 401) {
                        this.userService.logout()
                    }
                    this.spinner.hide();
                    return response;
                }),
                catchError(this.handleError.bind(this))
            );
    }

    updateData(method, data, showSp = true): Observable<ICommon> {
        if (showSp) {
            this.spinner.show();
        }
        return this.http.post<ICommon>(createUrl('api/' + method), data, this.appHeader())
            .pipe(
                map((response) => {
                    if (response.code == 401) {
                        this.userService.logout()
                    }
                    this.spinner.hide();
                    return response;
                }),
                catchError(this.handleError.bind(this))
            );
    }

    deleteData(method): Observable<ICommon> {
        this.spinner.show();
        return this.http.delete<ICommon>(createUrl('api/' + method), this.appHeader())
            .pipe(
                map((response) => {
                    if (response.code == 401) {
                        this.userService.logout()
                    }
                    this.spinner.hide();
                    return response;
                }),
                catchError(this.handleError.bind(this))
            );
    }

    // downloadFile(filename): Observable<any>{
    //     console.log('http://localhost:3000/uploads/user_excel/'+filename)
    //     return this.http.get('http://localhost:3000/uploads/user_excel/'+filename, {responseType: 'blob'});
    // }

    private handleError(error) {
        this.spinner.hide();
        this.errorLogService.handleError(error);
    }

}
