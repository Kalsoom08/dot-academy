import LoginPage from './LoginPage';

export default function Page({ searchParams }) {
  const redirectTo = searchParams?.redirect || '/';
  return <LoginPage redirectTo={redirectTo} />;
}
