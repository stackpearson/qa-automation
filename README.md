# qa-automation
Automated test suite for TenFore Software

## Setup:
Install Java: Configured with 22.0.2
Install Node: Configured with 20.11.1
Install Android Studio: https://developer.android.com/studio

## Running Tests

To start running tests, connect your tablet & open birdie to the pin entry screen. Open two terminals in your ide.
Terminal 1:
 ```bash
 appium --use-plugins=images
 ```

Terminal 2:
```bash
npm run wdio
```
You can run individual test files like so:
npm run wdio -- --spec ./tests/path_to_desired_test_file