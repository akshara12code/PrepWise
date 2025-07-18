// src/firebase/admin.ts

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Directly embedded credentials (NOT RECOMMENDED FOR PRODUCTION)
// Please use environment variables (e.g., process.env.FIREBASE_PROJECT_ID)
// for sensitive information in a real application.
const FIREBASE_PROJECT_ID = "prepiai";
const FIREBASE_CLIENT_EMAIL = "firebase-adminsdk-fbsvc@prepiai.iam.gserviceaccount.com";
const FIREBASE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQB90sTUr+4Xd4\nt2FeJ+oBgtelb2EGeskTnq5927GRCuhDQ8eeIhveq3niSN5XP9oH8N6G8MHswgL6\nzWKFTRw+9rMyWj5j5IMKSFr95ovcz4RE6p2oQruQe4fDM+huNIXqqOeTEzqaSmsL\nXC0UnjPmyUg6qX9lIVVcgkoUeS2ZdDV4dkZhl37gGEiRwWzyfoPiUeOP8lmR8zr8\nJMxWJir7RH/mO5ig4sVGDKXndAYQdsjfIjhjACRApZtiohYcE2K9myB9WEeUvg8d\n8JRICRYVnFMFM1S5xgRdrm0He6bTi3tR+u/wWBbNlpcO2oWja2krLhQ5pJqzqXbC\naUQmneuPAgMBAAECggEABWm2Pzb8bY3NrqS9rQs0+S+QqTABZnvw2KLrDeHWz4uo\nZPbEJsZDY9/v6bgxWvgUWp4Lzuh3cU1tTT2wyS+3swoUe/z2QUzSO+2yNb6XXQoT\nf3+Nw0gWwnxSAt0NjC6/Ja2JXnaniirn0Pp62z6C1taTt1itaACTs7FV1WUkeJLe\nCKAaQqWpF+FeHTaDEVNqA7/JvBnkD8w+HmEO//KkL6dVIlzbxAC9xIJpORBhKvOC\nIbOqNoCgWNQS+9sb3nn47rbnGraPLkIYWx9wJVAJXEYP52vxzdTmquI8pPO2KWew\nUpCnMISjuoqxaImiRYpP678AuB0pnbSUA7981SNMSQKBgQDJO93/yMeCfynItEOJ\n98vyVCqd0XKtFwml8UQ4G9SN/m3/Xn2pV20WZeUf3es7fD2XAPaX1euNOjv4dAOQ\n43lpNATmPB8/2gnTJpaDJVdyUDgZVfH5vLrdDYEdDbwpW1X/u6bd3JSTxDrgsY2R\nOpVaZDVRFVjFWDqeP/Dq/DkdawKBgQC3OpsYDv+d169o1aGcu95lKBtE7JURb8Jn\n+PtAc/Aa7iDxpZKu3BBd/E2XwuXKwKOD2nMlQ00LSOOt9PMnnaVdjwI8/0HFpL6Q\ncgU5soaKEOkk2L4O0y/lVbIXNKTevmH/JY7SPcXF2ZtT6TJ4ZJ4x5v4eYzDxBLpw\nHygmy2FvbQKBgQCGWSvLm1Znr1JMJt14fTFyJfMVzkHLgbf1S/CJnTrpWdZCSemH\nZ1DzRTAFaHmmCzprWD9J+435icmEBKBk2RmzvQEQXU9Xp9ArYnXWNNX/AcOSVqjo\nXLI85skuhn769Xmi9LthH+UqCjZs0N18/inAYWqfKatMha0M/g9wMthG5QKBgF5t\nrqZsfGHtWTIO/xYWYBwD2mHgB0cQMMGCuIHT/kbyuDmxGfJR6YF2WMrAn8qpEtwO\nBc+LarZJH0V0eqfM//9Ch2XGKzBfofIxQO4mSl33LyBVL0XWotVvH7QD5oAA3+It\nifhh6332kq1g/ii7uid/ozEn734W8Lp95CRyJknVAoGAELhrMHYbTj19HootuLB9\nPNkcn2FRjlQ3q2V2OxxN6/Ej9DaaGTPuGtQKddyQXO134doqCYAPZVHEafe1QCCc\nN05bMdxOPk12OMLT50BiYARFwEx4lz8mWvFA/dfcDwM87pQyeXVemLIjbPQxiWUK\nwRRliq5QGkxM0omH3G1vU8g=\n-----END PRIVATE KEY-----\n";


// Initialize Firebase Admin SDK if it hasn't been initialized already
// This function ensures that the app is initialized only once.
function initializeFirebaseAdminApp() {
  // Check if a Firebase app is already initialized
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        // Ensure newlines are correctly parsed for the private key
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      // Optional: Add databaseURL if using Realtime Database
      // databaseURL: "https://your-project-id.firebaseio.com"
    });
  }
}

// Call the initialization function
initializeFirebaseAdminApp();

// Export auth and db instances from the initialized app
export const auth = getAuth();
export const db = getFirestore();