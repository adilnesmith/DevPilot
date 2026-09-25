'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorAlert } from '../../../components/ui/ErrorAlert';
import { useAuth } from '../../../lib/auth';

interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  url: string;
  isPrivate: boolean;
  lastSyncedAt: string;
}

export default function RepositoriesPage() {
  const router = useRouter();
  const { getUser, getToken, getAccessToken, isAuthenticated } = useAuth();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = getUser() || {};
  const token = getToken() || '';
  const accessToken = getAccessToken() || '';

  // Don't render if not authenticated (prevents SSR issues)
  if (!isAuthenticated) {
    return null;
  }

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/repositories', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }

      const data = await response.json();
      setRepositories(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch repositories');
      setLoading(false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/repositories/sync', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to sync repositories');
      }

      const data = await response.json();
      setRepositories(data);
      setSyncing(false);
    } catch (err) {
      setError('Failed to sync repositories. Please ensure you have authorized GitHub access.');
      setSyncing(false);
    }
  };

  const handleRefresh = async (repoId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/repositories/${repoId}/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh repository');
      }

      const updatedRepo = await response.json();
      setRepositories(repos => repos.map(repo => 
        repo.id === repoId ? updatedRepo : repo
      ));
    } catch (err) {
      setError('Failed to refresh repository');
    }
  };

  const handleDelete = async (repoId: string) => {
    if (!confirm('Are you sure you want to remove this repository?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/repositories/${repoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete repository');
      }

      setRepositories(repos => repos.filter(repo => repo.id !== repoId));
    } catch (err) {
      setError('Failed to delete repository');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-600 hover:text-gray-900 mr-4"
              >
                ← Back
              </button>
              <h1 className="text-xl font-bold text-gray-900">Repositories</h1>
            </div>
            <div className="flex items-center space-x-2">
              {user.avatarUrl && (
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="h-8 w-8 rounded-full"
                />
              )}
              <span className="text-gray-700">{user.username}</span>
              <button
                onClick={() => router.push('/settings')}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Repositories</h2>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {syncing ? 'Syncing...' : 'Sync from GitHub'}
            </button>
          </div>

          {error && (
            <ErrorAlert 
              message={error} 
              onDismiss={() => setError(null)} 
            />
          )}

          {repositories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No repositories connected yet</p>
              <button
                onClick={handleSync}
                disabled={syncing}
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
              >
                Sync Your Repositories
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {repositories.map((repo) => (
                <div key={repo.id} className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-900">{repo.name}</h3>
                        {repo.isPrivate && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            Private
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{repo.fullName}</p>
                      {repo.description && (
                        <p className="text-gray-700 mb-2">{repo.description}</p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500 flex-wrap">
                        {repo.language && (
                          <span className="flex items-center">
                            <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                            {repo.language}
                          </span>
                        )}
                        <span>Last synced: {new Date(repo.lastSyncedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleRefresh(repo.id)}
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border rounded hover:bg-gray-50 transition-colors"
                      >
                        Refresh
                      </button>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border rounded hover:bg-gray-50 transition-colors"
                      >
                        View on GitHub
                      </a>
                      <button
                        onClick={() => handleDelete(repo.id)}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-900 border border-red-200 rounded hover:bg-red-50 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}