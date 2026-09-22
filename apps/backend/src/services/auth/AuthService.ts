import prisma from '../../config/database';
import { AuthenticationError, ValidationError } from '@devpilot/shared';

export interface LoginInput {
  githubId: string;
  username: string;
  email?: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    username: string;
    email: string | null;
    avatarUrl: string | null;
  };
  token: string;
}

export class AuthService {
  async findOrCreateUser(input: LoginInput): Promise<AuthResponse> {
    const { githubId, username, email, avatarUrl } = input;

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { githubId },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          githubId,
          username,
          email,
          avatarUrl,
        },
      });
    } else {
      // Update existing user
      user = await prisma.user.update({
        where: { githubId },
        data: {
          username,
          email,
          avatarUrl,
        },
      });
    }

    // Create session token
    const token = this.generateToken(user.id);

    // Create session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
      token,
    };
  }

  async validateToken(token: string): Promise<any> {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session) {
      throw new AuthenticationError('Invalid token');
    }

    if (session.expiresAt < new Date()) {
      await prisma.session.delete({ where: { id: session.id } });
      throw new AuthenticationError('Token expired');
    }

    return session.user;
  }

  async logout(token: string): Promise<void> {
    await prisma.session.deleteMany({
      where: { token },
    });
  }

  private generateToken(userId: string): string {
    // Simple token generation - in production, use JWT
    return Buffer.from(`${userId}:${Date.now()}`).toString('base64');
  }
}
