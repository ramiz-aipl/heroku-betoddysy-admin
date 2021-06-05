import { ModuleWithProviders } from '@angular/core';

export interface ILogin {
    status: boolean,
    message: string,
    data: {
        _id: any,
        UserID: any,
        UserName: string,
        UserGroup: string,
        ProfileImage: string,
        UserFirstName: string,
        UserLastName: string,
        UserEmail: string,
        UserPicture: string
    },
    token: string
}
export interface ICommon {
    count: any;
    link(link: any);
    entries: any;
    text: any;
    file_requests: any;
    status: boolean,
    code: number,
    message: string,
    Message: string,
    data: any
}
export interface file { }