# SwiftLoad - Mobile Airtime & Data Bundle App

SwiftLoad is a mobile application for purchasing airtime and data bundles for various MTN Uganda using the Africa's Talking API.

## Features

- Purchase airtime
- Buy data bundles with different sizes and validity periods
- User-friendly interface with dark/light mode support
- Secure transactions through Africa's Talking API

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm or yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Africa's Talking account with API credentials

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/egesamichael/AT-Airtime-and-Data-app.git
   
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Africa's Talking credentials:
   ```plaintext
   AFRICAS_TALKING_API_KEY=your_api_key
   AFRICAS_TALKING_USERNAME=your_username
   ```
4. Start the development server:
   ```bash
   npx expo start
   ```

## Usage

### Buying Airtime
1. Navigate to the **Buy Airtime** screen.
2. Enter the recipient's phone number.
3. Enter the amount of airtime to purchase.
4. Tap **Buy Airtime** to complete the transaction.

### Purchasing Data Bundles
1. Navigate to the **Buy Data** screen.
2. Enter the recipient's phone number.
3. Select a data bundle from the available options.
4. Tap **Buy Data Bundle** to complete the transaction.

## Testing

For testing purposes, generate a sandbox api key from https://africatalking.com and use username sandbox

## Technologies Used

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Africa's Talking API](https://africastalking.com/)

## Project Structure

```
/app        - Main application screens using file-based routing
/components - Reusable UI components
/services   - API services and business logic
/hooks      - Custom React hooks
/assets     - Images, fonts, and other static assets
```

## Developer

- **X (Twitter):** [@egesamichael](https://x.com/egesamichael)
- **Website:** [egesamichael.dev](https://egesamichael.dev)

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to contribute, open issues, or suggest features to improve the project!
