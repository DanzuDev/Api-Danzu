import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './lib/botredeem-59076-firebase-adminsdk-fbsvc-6d4f6d597a.json';

const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore(app);

export { db };
