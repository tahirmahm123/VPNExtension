import zod from 'zod';

export const vpnTokenDataScheme = zod.object({
    isExpired: zod.boolean(),
    timeExpiresSec: zod.number(),
    timeExpiresIso: zod.string(),
    planName: zod.string(),
});

export type VpnTokenData = zod.infer<typeof vpnTokenDataScheme>;
