import { API_URL } from '../config';

import { BaseApi } from './baseApi';
import { type RequestProps, type UserDetailsResponse } from './apiTypes';

interface ApiManagerInterface {
    authInitialize(email: string): Promise<any>
    authVerifyOtp(email: string, otp: string): Promise<any>;
    authComplete(email: string, password: string, token: string, deviceDetails: object): Promise<any>
    socialLoginGoogle(idToken: string, deviceDetails: object): Promise<any>;
    socialLoginApple(idToken: string, deviceDetails: object): Promise<any>
    getAccountDetails(apiToken: string): Promise<UserDetailsResponse>;
    logout(accessToken: string): Promise<any>;
    logoutAllDevices(accessToken: string): Promise<any>;
    logoutDevice(apiToken: string, tokenId: number): Promise<any>
    getServersList(authToken: string): Promise<any>
}

class ApiManager extends BaseApi implements ApiManagerInterface {
    SOCIAL_LOGIN_GOOGLE: RequestProps = {
        path: 'v3/auth/social-login/google',
        method: 'POST',
    };

    static init(): ApiManager {
        return new ApiManager(API_URL);
    }

    socialLoginGoogle(idToken: string, deviceDetails: object): Promise<any> {
        const { path, method } = this.SOCIAL_LOGIN_GOOGLE;
        const body = {
            idToken,
            deviceDetails,
        };
        return this.makeRequest(
            path,
            {
                body: JSON.stringify(body),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            method,
        );
    }

    SOCIAL_LOGIN_APPLE: RequestProps = {
        path: 'v3/auth/social-login/apple',
        method: 'POST',
    };

    socialLoginApple(idToken: string, deviceDetails: object): Promise<any> {
        const { path, method } = this.SOCIAL_LOGIN_APPLE;
        const body = {
            idToken,
            deviceDetails,
        };
        return this.makeRequest(
            path,
            {
                body: JSON.stringify(body),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            method,
        );
    }

    LOGOUT_ALL: RequestProps = { path: 'v3/logout-all', method: 'POST' };

    logoutAllDevices(apiToken: string): Promise<any> {
        const { path, method } = this.LOGOUT_ALL;
        const config = {
            headers: { Authorization: `Bearer ${apiToken}` },
        };
        return this.makeRequest(path, config, method);
    }

    LOGOUT_DEVICE: RequestProps = { path: 'v3/logout/', method: 'POST' };

    logoutDevice(apiToken: string, tokenId: number): Promise<any> {
        const { path, method } = this.LOGOUT_DEVICE;
        const config = {
            headers: { Authorization: `Bearer ${apiToken}` },
        };
        return this.makeRequest(`${path}${tokenId}`, config, method);
    }

    DEAUTHENTICATE: RequestProps = { path: 'v3/signout', method: 'POST' };

    logout(apiToken: string): Promise<any> {
        const { path, method } = this.DEAUTHENTICATE;
        const config = {
            headers: { Authorization: `Bearer ${apiToken}` },
        };
        return this.makeRequest(path, config, method);
    }

    AUTH_INITIALIZE: RequestProps = { path: 'v3/auth/initialize', method: 'POST' };

    authInitialize(email: string): Promise<any> {
        const { path, method } = this.AUTH_INITIALIZE;
        const body = {
            email,
        };
        return this.makeRequest(
            path,
            {
                body: JSON.stringify(body),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            method,
        );
    }

    AUTH_VERIFY_OTP: RequestProps = { path: 'v3/auth/verify-otp', method: 'POST' };

    authVerifyOtp(email: string, otp: string): Promise<any> {
        const { path, method } = this.AUTH_VERIFY_OTP;
        const body = {
            email,
            code: otp,
        };
        return this.makeRequest(
            path,
            {
                body: JSON.stringify(body),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            method,
        );
    }

    AUTH_COMPLETE: RequestProps = { path: 'v3/auth/complete', method: 'POST' };

    authComplete(email: string, password: string, token: string, deviceDetails: object): Promise<any> {
        const { path, method } = this.AUTH_COMPLETE;
        const body = {
            email,
            password,
            token,
            deviceDetails,
        };
        return this.makeRequest(
            path,
            {
                body: JSON.stringify(body),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            method,
        );
    }

    USER_DETAILS: RequestProps = { path: 'v3/details', method: 'GET' };

    async getAccountDetails(apiToken: string): Promise<UserDetailsResponse> {
        const { path, method } = this.USER_DETAILS;
        const config = {
            headers: { Authorization: `Bearer ${apiToken}` },
        };
        return this.makeRequest(path, config, method);
    }

    GET_SERVERS_LIST: RequestProps = { path: 'v3/servers-list?platform=extension', method: 'GET' };

    getServersList(authToken: string): Promise<any> {
        const { path, method } = this.GET_SERVERS_LIST;
        return this.makeRequest(path, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        }, method);
    }
}

export const apiManager = ApiManager.init();
