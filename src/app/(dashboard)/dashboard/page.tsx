import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // Redirect to the main hub page, which serves as the primary dashboard.
  redirect('/hub');
}
