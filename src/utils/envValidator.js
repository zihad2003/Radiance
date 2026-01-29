/**
 * Environment Variable Validator
 * Ensures all required VITE_ variables are present before the app boots.
 */

const REQUIRED_VARS = [
    'VITE_CONVEX_URL',
];

const OPTIONAL_VARS = [
    'VITE_GA_MEASUREMENT_ID',
    'VITE_CLARITY_PROJECT_ID',
    'VITE_APP_TITLE',
    'VITE_ENABLE_MIGRATOR'
];

export const validateEnv = () => {
    const missing = REQUIRED_VARS.filter(key => !import.meta.env[key]);

    if (missing.length > 0) {
        console.error(
            "CRITICAL ERROR: Missing required environment variables:\n" +
            missing.join('\n') +
            "\n\nPlease check your .env.local file. Refer to env.example for guidance."
        );

        // In development, we alert the dev specifically
        if (import.meta.env.DEV) {
            alert(`Missing Required Env Vars: ${missing.join(', ')}`);
        }
    }

    // Log status of optional vars
    const presentOptionals = OPTIONAL_VARS.filter(key => import.meta.env[key]);
    console.log(`[Env] Loaded ${REQUIRED_VARS.length} required and ${presentOptionals.length} optional variables.`);
};
