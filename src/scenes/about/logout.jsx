import { useEffect } from 'react';

function Logout() {
useEffect(() => {
  const test = async () => {
    const response = await fetch("http://localhost:8000/auth/test-logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
  });
  }
  test()
},[])

async function handleLogout() {
  console.log("Logout button clicked");
  try {
    const response = await fetch("http://localhost:8000/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      console.log("Logout successful");
      // Perform any additional actions needed after logout
    } else {
      console.log("Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
}

  return (
    <div>
      <h1>Logging out...</h1>
      <button onClick={handleLogout}>Click me</button>
    </div>
  );
}

export default Logout;