import { apiManager } from '../api';

/**
 * Social login for Google/Apple
 * @param provider 'google' | 'apple'
 * @param idToken string
 * @param deviceDetails
 * @returns Promise<any>
 */
const socialLogin = async (
    provider: 'google' | 'apple',
    idToken: string,
    deviceDetails: object,
): Promise<any> => {
    let response;
    try {
        if (provider === 'google') {
            response = await apiManager.socialLoginGoogle(idToken, deviceDetails);
        } else if (provider === 'apple') {
            response = await apiManager.socialLoginApple(idToken, deviceDetails);
        } else {
            throw new Error('Unsupported social provider');
        }
    } catch (e) {
        let errorData;
        try {
            errorData = JSON.parse(e.message);
        } catch (e) {
            throw new Error(JSON.stringify({ error: 'Social login failed' }));
        }
        throw new Error(JSON.stringify(errorData));
    }
    return response;
};

/**
 * Auth Initialize
 * @param email
 * @returns Promise<any>
 */
const authInitialize = async (
    email: string,
): Promise<any> => {
    let response;
    try {
        response = await apiManager.authInitialize(email);
    } catch (e) {
        let errorData;
        try {
            errorData = JSON.parse(e.message);
        } catch (e) {
            throw new Error(JSON.stringify({ error: 'Auth Initialize Failed' }));
        }
        throw new Error(JSON.stringify(errorData));
    }
    return response;
};

const authVerifyOtp = async (
    email: string,
    otp: string,
): Promise<any> => {
    let response;
    try {
        response = await apiManager.authVerifyOtp(email, otp);
    } catch (e) {
        let errorData;
        try {
            errorData = JSON.parse(e.message);
        } catch (e) {
            throw new Error(JSON.stringify({ error: 'Auth Verify Otp Failed' }));
        }
        throw new Error(JSON.stringify(errorData));
    }
    return response;
};
const authComplete = async (
    email: string,
    password: string,
    token: string,
    deviceDetails: object,
): Promise<any> => {
    let response;
    try {
        response = await apiManager.authComplete(email, password, token, deviceDetails);
    } catch (e) {
        let errorData;
        try {
            errorData = JSON.parse(e.message);
        } catch (e) {
            throw new Error(JSON.stringify({ error: 'Auth Complete Failed' }));
        }
        throw new Error(JSON.stringify(errorData));
    }
    return response;
};

export const authProvider = {
    // getAccessToken,
    socialLogin,
    authInitialize,
    authVerifyOtp,
    authComplete,
};
