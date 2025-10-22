import zod from 'zod';

export const authAccessTokenScheme = zod.object({
    isLoggedIn: zod.boolean(),
    accessToken: zod.string(),
    tokenType: zod.literal('bearer'),
    tempToken: zod.string().or(zod.null()),
});

/**
 * Auth access token example:
 * {
 *  "accessToken":"9f8duv8dfv",
 *  "tokenType":"bearer",
 *  "expiresIn":2627940,
 *  "scope":"trust"
 * }
 */
export type AuthAccessToken = zod.infer<typeof authAccessTokenScheme>;
