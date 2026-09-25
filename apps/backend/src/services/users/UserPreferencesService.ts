import prisma from '../../config/database';
import { ValidationError } from '@devpilot/shared';

export interface UserPreferencesInput {
  theme?: string;
  language?: string;
  notifications?: boolean;
  fontSize?: number;
}

export interface UserPreferences {
  id: string;
  userId: string;
  theme: string;
  language: string;
  notifications: boolean;
  fontSize: number;
}

export class UserPreferencesService {
  async getUserPreferences(userId: string): Promise<UserPreferences> {
    let preferences = await prisma.userPreferences.findUnique({
      where: { userId },
    });

    if (!preferences) {
      // Create default preferences
      preferences = await prisma.userPreferences.create({
        data: {
          userId,
          theme: 'light',
          language: 'en',
          notifications: true,
          fontSize: 14,
        },
      });
    }

    return preferences;
  }

  async updateUserPreferences(
    userId: string,
    input: UserPreferencesInput
  ): Promise<UserPreferences> {
    const existing = await prisma.userPreferences.findUnique({
      where: { userId },
    });

    if (existing) {
      return prisma.userPreferences.update({
        where: { userId },
        data: input,
      });
    } else {
      return prisma.userPreferences.create({
        data: {
          userId,
          ...input,
        },
      });
    }
  }

  async resetUserPreferences(userId: string): Promise<UserPreferences> {
    return prisma.userPreferences.upsert({
      where: { userId },
      create: {
        userId,
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 14,
      },
      update: {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 14,
      },
    });
  }
}