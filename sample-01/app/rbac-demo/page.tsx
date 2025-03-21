import { auth0 } from '../../lib/auth0';
import RoleBasedAccess from '../components/RoleBasedAccess';

export default async function RbacDemoPage() {
  const session = await auth0.getSession();

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>Role-Based Access Control</h1>
      <p>
        This page demonstrates how to implement role-based access control (RBAC) with Auth0.
        RBAC allows you to assign permissions to users based on their roles, and then
        control what they can access in your application.
      </p>

      {!session && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffeeba',
          borderRadius: '0.25rem',
          marginTop: '1rem'
        }}>
          <p style={{ color: '#856404', margin: 0 }}>
            <strong>Note:</strong> You must be logged in to view role and permission information.
            <a href="/auth/login" style={{ marginLeft: '0.5rem' }}>Log in</a>
          </p>
        </div>
      )}

      {session && <RoleBasedAccess />}

      <div style={{ marginTop: '2rem' }}>
        <h2>Setting Up RBAC with Auth0</h2>
        <p>
          To implement RBAC in your own application:
        </p>
        <ol style={{ marginLeft: '1.5rem', lineHeight: '1.6' }}>
          <li>Create roles in your Auth0 dashboard</li>
          <li>Assign permissions to those roles</li>
          <li>Assign users to roles</li>
          <li>Configure your application to receive role information in the access token</li>
          <li>Implement access checks in your application based on roles and permissions</li>
        </ol>

        <h3 style={{ marginTop: '1.5rem' }}>Code Example: Protecting a Component</h3>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '1rem', 
          borderRadius: '0.25rem',
          overflow: 'auto',
          fontSize: '0.9rem',
          fontFamily: 'monospace',
          lineHeight: '1.4'
        }}>
{`// Protecting a component with RBAC
function ProtectedComponent({ user, children }) {
  // Check if user has required role
  const hasAdminRole = user?.roles?.includes('admin');
  
  if (!hasAdminRole) {
    return <p>You don't have permission to view this content.</p>;
  }
  
  return <>{children}</>;
}`}
        </pre>

        <h3 style={{ marginTop: '1.5rem' }}>Code Example: Protecting an API Route</h3>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '1rem', 
          borderRadius: '0.25rem',
          overflow: 'auto',
          fontSize: '0.9rem',
          fontFamily: 'monospace',
          lineHeight: '1.4' 
        }}>
{`// Protecting an API route with RBAC
export async function GET(request) {
  const session = await auth0.getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const token = await auth0.getAccessToken();
  const permissions = token.claims['https://your-domain.com/permissions'] || [];
  
  // Check if user has the required permission
  if (!permissions.includes('read:protected-data')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  // User has permission, return protected data
  return NextResponse.json({ data: 'Protected data' });
}`}
        </pre>
      </div>
    </div>
  );
} 