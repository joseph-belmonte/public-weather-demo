# Weather and Air Quality App

See the deployed application here: [https://example.com](https://example.com)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview

This application, built with Next.js, React, TypeScript, and Tailwind CSS, provides weather, air quality, and UV index data for U.S. locations using the following public APIs:

- **National Weather Service API** for weather data.
- **EPA AirNow API** for air quality data.
- **EPA UV Index API** for UV index data.

The app includes a search bar that allows users to input their desired U.S. location and receive up-to-date information. Please note:

- The National Weather Service API is only available for U.S. locations.
- The APIs may occasionally return errors due to service availability.

The app is fully responsive, working across desktop and mobile devices.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/new-repo.git

```

Then create a `.env` file in the root directory and add the following:

```bash
MAPBOX_TOKEN=your_api_key_here
TIMEZONEDB_API_KEY=your_api_key_here

```

Finally, install the dependencies and then run the development server:

```bash
npm install
npm run dev
```

## References

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Resources

- NWS API documentation: https://www.weather.gov/documentation/services-web-api
- EPA UV API documentation: https://www.epa.gov/enviro/web-services
- AirNow API documentation: https://docs.airnowapi.org/webservices
- TimeZoneDB API documentation: https://timezonedb.com/

## Previews

![desktop-1](https://github.com/user-attachments/assets/ddac826e-6818-4a3f-a8f5-5396bbec87c3)
![desktop-2](https://github.com/user-attachments/assets/1d845ac6-d14a-4e15-83bb-853330fc2607)
![mobile-1](https://github.com/user-attachments/assets/8ed18d55-0b46-48ab-b183-b29cf8b644fb)
![mobile-2](https://github.com/user-attachments/assets/c32a7883-631c-4836-9f1e-5bbe29de2497)
![mobile-3](https://github.com/user-attachments/assets/e387cd88-98d9-4711-8d0b-349f4edfbfec)
![mobile-4](https://github.com/user-attachments/assets/c6bc195e-37a0-432c-adab-d4f6aa4dd314)
