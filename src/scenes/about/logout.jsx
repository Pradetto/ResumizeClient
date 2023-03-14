import { useEffect } from 'react';

function Logout() {
  useEffect(() => {
    async function logout() {
      const response = await fetch('http://localhost:8000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        console.log('Successfully logged out');
      } else {
        console.error('Failed to log out');
      }
    }
    logout();
  }, []);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default Logout;