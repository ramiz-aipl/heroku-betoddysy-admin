import { environment } from '../../environments/environment';

export function createUrl(actionName: string): string {
  return `${environment.apiHost}${actionName}`;
}

export function createSocialUrl(actionName: string): string {
  return `${environment.SocialSite}${actionName}`;
}

export function apiUrl(): string {
  return `${environment.apiHost}`;
}

export const appApi = {
  login: createUrl('api/v1/adminLogin'),
  setting: createUrl('api/auth/setting'),
  logout: createUrl('api/auth/logout'),
  forgotPassword: createUrl('api/auth/forgot-password'),
  changePassword: createUrl('api/auth/change-password')
};

export const appURL = {
  baseUrl: environment.apiHost,
  uploadsPath: `${environment.apiHost}uploads/`,
  ProfilePath: `${environment.apiHost}uploads/Profile/`,
  BrandLogoPath: `${environment.apiHost}uploads/BrandLogo/`,
  logoImagesPath: `${environment.apiHost}uploads/logo/`,
  ThemePath: `${environment.apiHost}uploads/Theme/`,
  ProductPath: `${environment.apiHost}uploads/ProductImage/`,
  BannerPath: `${environment.apiHost}uploads/BannerImage/`
};

export const appHeader = {
  headers: {
    'Authorization': 'Basic ' + localStorage.getItem('Token')
  }
};

export const roleNames = {
  superAdmin: 'Super Admin',
  admin: 'Admin',
  doctor: 'Doctor',
  fellow: 'Fellow',
  consult: 'Consult'
};

export const appVariables = {
  accessToken: 'X-Auth-Token',
  contentType: 'application/json',
  resourceActions: {
    getActionName: 'Read',
    addActionName: 'Create',
    updateActionName: 'Update',
    deleteActionName: 'Delete',
  }
};

export const errorMessage = {
  pageNotFound: 'Page not found',
  forbidden: 'Forbidden',
  internalServerError: 'Internal Server error',
  unknownError: 'Unknown Error (Response not get)',
  httpError: 'There was an HTTP error.',
  typeError: 'There was a Type error.',
  generalError: 'There was a general error.',
  somethingWrong: 'Nobody threw an Error but something wrong!'
}

export class AppConstants { }
