# BMS Mobile App

Mobile client for the BMS platform, built with Expo and React Native and connected to the same backend API used by the web application.

## Project Summary

This repository contains the mobile version of the BMS project. It was developed as part of a full-stack portfolio application with separate repositories for the backend, admin web frontend, and mobile client.

The mobile app was tested locally with Expo Go during development.

## Important Note for Reviewers

This is a native mobile project built with Expo and React Native. Unlike a normal website, it is not hosted as a standard web application. Instead, this project is presented through source code, screenshots, setup instructions, and backend integration details.

The absence of a permanent public mobile deployment should not be taken as missing functionality. This repository is intended to demonstrate mobile application development, API integration, and multi-platform project structure.

## What This Demonstrates

- Building a mobile client with React Native and Expo
- Connecting a phone-based application to a backend API
- Reusing a shared authentication and API flow across web and mobile clients
- Understanding the difference between web applications and native mobile application workflows

## Tech Stack

- Expo
- React Native
- Axios
- React Navigation

## Development Scripts

- `npm start`
- `npm run android`
- `npm run ios`
- `npm run web`

## Running Locally

1. Install dependencies with `npm install`
2. Start the Expo development server with `npm start`
3. Open the app in Expo Go or a simulator

## API Integration

The mobile app connects to the shared backend API through a central Axios configuration.

## Suggested Screenshots

To help reviewers understand the app quickly, it is useful to include screenshots such as:

<img width="1410" height="1418" alt="image" src="https://github.com/user-attachments/assets/755bf6a1-55c7-432d-ba0e-45fcfe827a5d" />


## Troubleshooting Note

During development, network issues can happen if the app points to the wrong API URL or uses an outdated Expo bundle. Restarting Expo and clearing the cache is a common fix.

## For Reviewers

This repository is included to demonstrate mobile development capability within a full-stack project. Even without a permanent public mobile deployment, the codebase, API integration, screenshots, and project structure should provide a clear picture of the work completed.

## Related Repositories

- Backend API repository
- Admin web frontend repository
