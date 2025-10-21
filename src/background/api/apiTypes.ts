import { type Method } from 'axios';

export type RequestProps = {
    path: string;
    method: Method;
};
// ----------------------------
// User Login & Auth Responses
// ----------------------------
export interface UserLoginResponse {
    message: string;
    password: boolean;
    state: boolean;
    token?: string;
}

export interface UserAuthResponse {
    response: UserLoginResponseDetails;
    message: string;
    state: boolean;
}

export interface UserLoginResponseDetails {
    auth: boolean;
    active: boolean;
    expired: boolean;
    allowLogin: boolean;
    expiry_date: string;
    ApiToken: string;
    totalSessionAllowed: number;
    loggedInSessions: number;
    is_paid: boolean;
    activeSessions: DeviceSession[];
    timestamp: number;
    email: string;
    plan: string;
    vpn_username: string;
    vpn_password: string;
    localIP: string;
    showAds: boolean;

    is_fta: boolean;
    days: number;
    location: {
        code: string;
        country: string;
        city: string;
        latitude: string;
        longitude: string;
        ip: string;
        isp: string;
        is_vpn_connected: boolean;
        premium: boolean;
    };
    uuid: string;
    user_profile: string;
    reward_points: number;
    notificationCount: number;
    created_from: string | null;
    paid_from: string | null;
    accountId: string | null;
    is_pro: boolean;
    isGuest: boolean;
    serverTime: number;
    plan_obj: any;
    is_trial: boolean;
    is_free_allowed?: boolean;
    delayPointPerConnection: number[];
}

// ----------------------------
// Device Session Models
// ----------------------------
export interface DeviceSession {
    tokenId: number;
    details?: DeviceSessionDetails;
    _last_used_at: string;
    currentSession: boolean;
}

export interface DeviceSessionDetails {
    id: string;
    name: string;
    type: string;
}

// ----------------------------
// User Details & Logout
// ----------------------------
export interface UserDetailsResponse {
    plan: string;
    active: boolean;
    expired: boolean;
    timestamp: number;
    totalSessionsAllowed: number;
    loggedInSessions: number;
    activeSessions: DeviceSession[];
    showAds: boolean;
}

export interface UserLogoutResponse {
    message: string;
}

export interface UserLogoutDeviceResponse {
    activeSessions: DeviceSession[];
    totalSessionsAllowed?: number;
    loggedInSessions?: number;
}

// ----------------------------
// Verification & OTP
// ----------------------------
export interface VerificationCodeResponse {
    state: boolean;
    password: boolean;
    successCode: number;
    message: string;
}

export interface UserVerifyOtpResponse {
    state: boolean;
    successCode: number;
    message: string;
    token: string;
}

// ----------------------------
// DNS Configuration
// ----------------------------
export interface DNSServers {
    default: {
        dns1: string;
        dns2: string;
    };
    antiTrackerIp: string;
}

// ----------------------------
// WireGuard Instance
// ----------------------------
export interface WireGuardInstance {
    PublicKey: string;
    port: number;
    local_ip?: string;
    HostIp: string;
}

// ----------------------------
// Tag Item
// ----------------------------
export interface TagItem {
    id: number;
    name: string;
    _icon: string;
    description: string;
    color: string;
}

// ----------------------------
// Server List Item
// ----------------------------
export interface ServerListItem {
    id: number;
    name: string;
    ip: string;
    port: number;
    flag: string;
    dns1: string;
    dns2: string;
    premium: boolean;
    country: string;
    city: string;
    country_code: string;
    wg: WireGuardInstance[];
    tags: TagItem[];
    location: {
        latitude: string;
        longitude: string;
    };
}

// ----------------------------
// Complete Server List Response
// ----------------------------
export interface ServerListResponse {
    servers?: ServerListItem[];
}
