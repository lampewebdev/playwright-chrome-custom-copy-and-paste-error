# Playwright/Chrome copy and paste problem in headless mode

### Reproduction of the problem
```
pnpm install
pnpm run test:integration
```
The second command will run playwright in headless mode and in the "New headless mode".
Both will fail. The copy command will be successful, but the paste will be an empty string ("").

### Consequences of this problem 
We cannot run our full test suite on any environment that has no desktop environment.
This means we cannot run it on any CI/CD in our case.

### Workaround 
Running playwright in headead mode will fix this issue.
```
pnpm run test:integration --headed
```
This will run chrome in headed mode and the new headless mode.
The headed mode will pass, and the headless mode will still fail.
