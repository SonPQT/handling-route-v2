import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (user: { username: string }) => void;
}

interface LoginResponse {
  username: string;
  token: string;
}

export function Login({ onLogin }: LoginProps) {
  const [creds, setCreds] = useState<{ username?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleLogin() {
    if (!creds.username || !creds.password) {
      setError('Username and password are required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: creds.username,
          password: creds.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const data: LoginResponse = await response.json();
      onLogin({ username: data.username });
      
      navigate('/stats');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ padding: 10 }}>
      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
      <span>Username:</span><br/>
      <input
        type="text"
        value={creds.username || ''}
        onChange={(e) => setCreds({...creds, username: e.target.value})}
      /><br/>
      <span>Password:</span><br/>
      <input
        type="password"
        value={creds.password || ''}
        onChange={(e) => setCreds({...creds, password: e.target.value})}
      /><br/><br/>
      <button
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
}