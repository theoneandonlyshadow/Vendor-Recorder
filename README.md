This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## before gettin started
- edit `.env.local`:
  - go to ![Google auth platform](https://console.cloud.google.com/auth) and create new OAuth credentials for web application.
  - make sure to follow this ![post](https://stackoverflow.com/a/78366351/29005197) or else you wont be able to sign in.
  - and then add mongodb uri.
  - type `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))" ` in the terminal and add the string to `NEXTAUTH_SECRET`.
- `npm i` in console to install modules from `package.json` file.
- `npm run build` to build the app before running.
- `npm start` to run the app.
- visit `http://localhost:3000` in the browser.

## working result will look like
![alt text](https://github.com/theoneandonlyshadow/vendor-recorder/blob/master/1.jpg?raw=true)
