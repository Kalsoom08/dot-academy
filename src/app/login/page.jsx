import LoginPage from "./LoginPage";

export default function Page({ searchParams }) {
  const redirectTo = searchParams?.next || searchParams?.redirect || "/";
  return <LoginPage redirectTo={redirectTo} />;
}
