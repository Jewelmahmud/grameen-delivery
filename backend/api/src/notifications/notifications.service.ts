import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationsService {
  private initialized = false;

  private init() {
    if (this.initialized) return;
    if (!process.env.FCM_PROJECT_ID || !process.env.FCM_CLIENT_EMAIL || !process.env.FCM_PRIVATE_KEY) return;
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FCM_PROJECT_ID,
        clientEmail: process.env.FCM_CLIENT_EMAIL,
        privateKey: (process.env.FCM_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      } as any),
    });
    this.initialized = true;
  }

  async sendToTokens(tokens: string[], title: string, body: string, data?: Record<string, string>) {
    this.init();
    if (!this.initialized) return { skipped: true };
    const message: admin.messaging.MulticastMessage = {
      tokens,
      notification: { title, body },
      data,
    };
    return admin.messaging().sendMulticast(message);
  }
}


