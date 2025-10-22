import { z } from 'zod';

/**
 * This is a schema for the data that is returned from the social auth endpoint.
 */
const socialAuthUnderScoreSchema = z.object({
    id_token: z.string(),
    state: z.string(),
});

/**
 * This is a schema for the data that is returned from the social auth endpoint after transforming the keys.
 */
export const socialAuthSchema = socialAuthUnderScoreSchema.transform((data) => ({
    idToken: data.id_token,
    state: data.state,
    provider: (data as any).provider || undefined,
}));

export type SocialAuthData = z.infer<typeof socialAuthSchema>;
