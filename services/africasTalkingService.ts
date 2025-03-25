import axios from 'axios';
//import { AFRICAS_TALKING_API_KEY, AFRICAS_TALKING_USERNAME } from '@env';

// Africa's Talking API configuration
const API_KEY = process.env.AFRICAS_TALKING_API_KEY;
const USERNAME = process.env.AFRICAS_TALKING_USERNAME;
const BASE_URL = 'https://api.africastalking.com/version1';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'apiKey': API_KEY,
    'Accept': 'application/json'
  }
});

// Service for airtime operations
export const airtimeService = {
  // Send airtime to a phone number
  sendAirtime: async (phoneNumber: string, amount: number, currencyCode: string = 'UGX') => {
    try {
      const response = await apiClient.post('/airtime/send', {
        username: USERNAME,
        recipients: JSON.stringify([{
          phoneNumber,
          amount: `${currencyCode} ${amount}`
        }])
      });
      
      return response.data;
    } catch (error) {
      console.error('Error sending airtime:', error);
      throw error;
    }
  }
};

// Service for data bundles
export const dataService = {
  // Purchase data bundle for a phone number
  purchaseData: async (phoneNumber: string, bundleId: string, amount: number, currencyCode: string = 'UGX') => {
    try {
      // Extract bundle details from the ID
      // Format: validity-size (e.g., daily-70mb, monthly-1.5gb)
      const [validity, size] = bundleId.split('-');
      
      // Parse size to get quantity and unit
      let quantity = 0;
      let unit = '';
      
      if (size.includes('mb')) {
        quantity = parseInt(size.replace('mb', ''));
        unit = 'MB';
      } else if (size.includes('gb')) {
        // Convert to number (handles cases like 1.5gb)
        quantity = parseFloat(size.replace('gb', ''));
        unit = 'GB';
      }
      
      // Format validity (capitalize first letter)
      const formattedValidity = validity.charAt(0).toUpperCase() + validity.slice(1);
      
      // Create request payload - keep quantity as number, but convert amount to string
      const payload = {
        username: USERNAME,
        productName: "Mobile Data",
        recipients: [
          {
            phoneNumber: phoneNumber,
            quantity: quantity, // Keep as number
            unit: unit,
            validity: formattedValidity,
            metadata: {
              bundleId: bundleId,
              amount: amount.toString(), // Convert to string
              transactionId: `swiftload-${Date.now()}`
            }
          }
        ]
      };
      
      console.log('Sending data bundle request with payload:', JSON.stringify(payload));
      
      // Make the API request
      const response = await axios.post('https://bundles.africastalking.com/mobile/data/request', payload, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'apiKey': API_KEY,
          'Idempotency-Key': `data-${phoneNumber}-${Date.now()}`
        }
      });

      console.log('API Response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      });
      
      return response.data;
    } catch (error: any) {
      console.error('Error purchasing data bundle:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      }
      throw error;
    }
  },
  
  // Get available data bundles
  getDataBundles: async () => {
    // Data bundles based on the MTN Uganda packages
    return [
      { id: 'daily-70mb', name: '70 MB', amount: 500, validity: 'Daily', provider: 'MTN Uganda' },
      { id: 'daily-165mb', name: '165 MB', amount: 1000, validity: 'Daily', provider: 'MTN Uganda' },
      { id: 'daily-500mb', name: '500 MB', amount: 2000, validity: 'Daily', provider: 'MTN Uganda' },
      { id: 'daily-1.5gb', name: '1.5 GB', amount: 5000, validity: 'Daily', provider: 'MTN Uganda' },
      { id: 'weekly-1.5gb', name: '1.5 GB', amount: 10000, validity: 'Weekly', provider: 'MTN Uganda' },
      { id: 'weekly-5gb', name: '5 GB', amount: 20000, validity: 'Weekly', provider: 'MTN Uganda' },
      { id: 'monthly-1.5gb', name: '1.5 GB', amount: 5000, validity: 'Monthly', provider: 'MTN Uganda' },
      { id: 'monthly-3.2gb', name: '3.2 GB', amount: 10000, validity: 'Monthly', provider: 'MTN Uganda' },
      { id: 'monthly-7.5gb', name: '7.5 GB', amount: 20000, validity: 'Monthly', provider: 'MTN Uganda' },
      { id: 'monthly-22gb', name: '22 GB', amount: 50000, validity: 'Monthly', provider: 'MTN Uganda' },
      { id: 'monthly-48gb', name: '48 GB', amount: 100000, validity: 'Monthly', provider: 'MTN Uganda' },
      { id: 'monthly-170gb', name: '170 GB', amount: 550000, validity: 'Monthly', provider: 'MTN Uganda' }
    ];
  }
};