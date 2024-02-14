# POSTHOG DEMO RUNNER SHIRTS/SIGNUP

This project is a demo of [Posthog's](https://posthog.com) cross-domain tracking solution. It contains two React/Vite frontend only applications. The two apps are meant to be hosted on different domains (localhost and an ngrok http instance) and then demonstrate how PostHog tracks users as they move between domains.

## Outline of the Demo Project

The basic setup of the flow is as follows: Runner Signup is a company which manages registrations for charity runs or marathons. Runner Signup has a partner organization, Runner Shirts, which handles the race shirt requests and corporate sponsor tracking for people signing up for the race.

## Project Requirements

1. A PostHog account with access to the API key and instance URL (probably https://app.posthog.com)
2. A JavaScript package manager such as npm or yarn
3. Ngrok, or some equivalent, which can create a domain based on localhost (this isn’t strictly necessary, but this is how you will see two different domains being captured in your PostHog activities dashboard)

## Project Setup

### 1: Install dependencies

Install the dependencies using the package manager of your choice, `npm` or `yarn`.
From the root of the project, run:

_npm_

```
cd RunnerShirts && npm install && cd ../RunnerSignup && npm install
```

OR

_yarn_

```
cd RunnerShirts && yarn install && cd ../RunnerSignup && yarn install
```

### 2: Create .env files

Create an `.env` file in the RunnerShirts and RunnerSignup folders respectively. The contents of the file should look like this:

```
VITE_POSTHOG_API_KEY=<YOUR API KEY>
VITE_POSTHOG_INSTANCE_ADDRESS=<YOUR ADDRESS>
```

You can get these values from the settings section of your PostHog dashboard.

This project uses Zod for env validation, so if you don't have those values, the app won't start. Also, Zod exports these values as `POSTHOG_API_KEY` and `POSTHOG_INSTANCE_ADDRESS`, stripping the `VITE_` prefix.

### 3: Start your servers

Run the `start` script using either `npm` or `yarn`.
From the root of the project, run:

_npm_
From inside RunnerSignup

```
npm start
```

OR

_yarn_

```
yarn start
```

In a separate window or split, navigate to the RunnerShirts directory and run:

```
npm start
```

OR

_yarn_

```
yarn start
```

### 4: Start ngrok

Again, you can use whatever tool you like, I used [ngrok](https://ngrok.com/). Once you have ngrok installed, run the following command from anywhere in a new terminal window or split:

```
ngrok http 3000
```

This will start ngrok and provide a url which tunnels to Runner Signup app running on `localhost:3000`. It's nice to use ngrok for Runner Signup instead of Runner Shirts because then you don't have to adjust the link button each time you start the ngrok tunnel. None of this is necessary. You'll see `localhost:3000` and `localhost:3001` in the dashboard without doing this, but for POC, it's nice to run ngrok and use truly different domains.

## Using the App

If using ngrok, go to the url displayed on your ngrok terminal window, otherwise go to `localhost:3000`. From there, just fill in the information, press "SIGN UP" and you'll see a thank page with a button link to Runner Shirts. Click it, and then fill out the information on Runner Shirts and press "SUBMIT". That completes the flow. You can now go to your PostHog dashboard and see the activities, user, and groups that have been created.
