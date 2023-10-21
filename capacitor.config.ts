import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wanikanjigation',
  appName: 'wanikanjigation',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
