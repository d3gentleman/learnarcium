import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login, // Make sure login is passed
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.githubUsername) {
        (session.user as any).username = token.githubUsername;
      }
      return session;
    },
    async jwt({ token, profile, trigger, user }) {
      if (profile && 'login' in profile) {
        token.githubUsername = profile.login;
      } else if (user && 'username' in user) {
        token.githubUsername = (user as any).username;
      }
      return token;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
};
