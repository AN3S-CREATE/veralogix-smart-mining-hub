import { redirect } from 'next/navigation';

export default function LoginPage() {
  // This page is no longer in use. Redirect to the main hub.
  redirect('/hub');
}
