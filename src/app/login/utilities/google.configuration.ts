import { AuthServiceConfig, GoogleLoginProvider } from "angularx-social-login";

export function getGoogleClientCredentials(): AuthServiceConfig {
    let config: AuthServiceConfig = new AuthServiceConfig([
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("176152464540-uv4anvbherda5lsrouk0v4lsuaeio2oj.apps.googleusercontent.com")
        }
    ]);
    return config;
}