import { UserProvider } from '@auth0/nextjs-auth0/client';

export const mockUser = {
  email: 'foo@example.com',
  email_verified: true,
  name: 'foo',
  nickname: 'foo',
  picture: 'foo.jpg',
  sub: '1',
  updated_at: null
};

export const withUserProvider = ({ user, profileUrl } = {}) => {
  return props => <UserProvider {...props} user={user} profileUrl={profileUrl} />;
};
