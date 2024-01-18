import { devices, type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    webServer: {
        command: 'npm run build && npm run preview',
        port: 4173
    },
    use: {
        permissions: ['clipboard-read', 'clipboard-write']
    },
    testDir: 'tests',
    testMatch: /(.+\.)?(test|spec)\.[jt]s/,
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
        {
            // this will always run in headless mode.
            name: 'chromiumNewHeadless',
            use: {
                ...devices['Desktop Chrome'],
                launchOptions: {
                    args: ['--headless=new'],
                },
            },
        },
    ],
};

export default config;
