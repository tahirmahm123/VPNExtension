import zod from 'zod';

import { vpnTokenDataScheme } from './vpnTokenData';

export const credentialsStateScheme = zod.object({
    subscriptionStatus: vpnTokenDataScheme.or(zod.null()),
    vpnCredentials: zod.string().or(zod.null()),
    email: zod.string().or(zod.null()),
    appId: zod.string().or(zod.null()),
}).strict();

export type CredentialsState = zod.infer<typeof credentialsStateScheme>;

export const CREDENTIALS_STATE_DEFAULTS = {
    subscriptionStatus: null,
    vpnCredentials: null,
    email: null,
    appId: null,
};
