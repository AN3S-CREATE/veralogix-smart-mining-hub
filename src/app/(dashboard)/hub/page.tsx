
import { redirect } from 'next/navigation';

export default function HubPage() {
  // Redirect to the main dashboard page, which serves as the primary role-based view.
  redirect('/dashboard');
}
