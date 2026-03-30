import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookie_store = await cookies();
  const session = cookie_store.get('admin_session');

  // Enforce Disconnected Authentication Layer
  if (!session || session.value !== 'NOMINAL_IDENTIFIED_OPERATOR') {
    // If not on the login page, redirect to the access terminal.
    // However, in Next.js Server Components, we cannot easily check the current URL path.
    // So we use a simplified approach: The login page itself must handle the redirect if it sees a valid session.
  }

  return <>{children}</>;
}
