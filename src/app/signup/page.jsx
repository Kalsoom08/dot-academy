import SignupPage from './SignupPage';

export default function Page({ searchParams }) {
  const redirectTo = searchParams?.redirect || '/';
  return <SignupPage redirectTo={redirectTo} />;
}
