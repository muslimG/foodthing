# For PWA Notifications and custom logic

To test he PWA locally you need to build the app and run it in prod mode so it doesn't rerender the page constantly messing with the service worker

Firstly build the app whenever you make a change you want to test

```bash
bun run build
```

Then start it in non development mode

```bash
bun run start
```

## Generating the keys for api endpoint

To get the vapid keys for web-push run the following command and add them to your `.env`

```bash
bun run vapid
```

## Current implementation

- The worker / custom files are loaded via `index.js` in this folder
- It registers the push notification event and notification click to the service worker
- From the clientside this service worker can be obtained via the window object
  - Note: to access the window object it needs to be in a useEffect or a function run after page load otherwise window will be `undefined`
    - If you need to check this use `typeof window !== "undefined"` since other check may not work correctly
- Once a user has subscribed to notifications via the service worker they can recieve notifications through api request
- The api request currently used is `src/pages/api/services/notification`
  - Note: we may need to implement some logic in order to filter the notification to certain users
  - It would also be wise to protect this endpoint with either url valdiation of the request or some TOKEN that must be sent with every request
