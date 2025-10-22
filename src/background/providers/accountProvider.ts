import { apiManager } from '../api';
import { type VpnTokenData } from '../schema';

const getVpnToken = async (accessToken: string): Promise<VpnTokenData | null> => {
    const vpnTokenData = await apiManager.getAccountDetails(accessToken);

    if (!vpnTokenData) {
        return null;
    }

    const {
        expired: isExpired,
        timestamp: timeExpiresSec,
        plan: planName,
    } = vpnTokenData;
    const expiryDate = new Date(timeExpiresSec);
    return {
        timeExpiresSec,
        timeExpiresIso: expiryDate.toISOString(),
        isExpired,
        planName,
    };
};

export const accountProvider = {
    getVpnToken,
};
