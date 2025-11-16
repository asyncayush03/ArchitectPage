import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const API_HOST = import.meta.env.VITE_API || 'http://localhost:8080';
const API_BASE = `${API_HOST}/api/v1/admin`;

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Fetching:', `${API_BASE}/blog`);
      const res = await fetch(`${API_BASE}/blog`);

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : data.blogs || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [location.key]);

  const deleteBlog = async (id) => {
    if (!window.confirm('Delete this blog?')) return;

    try {
      const res = await fetch(`${API_BASE}/blog/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');

      setBlogs(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Manage Blogs</h2>
        <Link to="/admin/blogs/new" className="bg-amber-500 text-white px-4 py-2 rounded">Add New</Link>
      </div>

      {loading && <p>Loading…</p>}
      {error && (
        <div className="bg-red-50 p-4 border border-red-200 rounded">
          <p className="text-red-600 mb-2">Error: {error}</p>
          <button onClick={fetchBlogs} className="px-3 py-1 bg-red-500 text-white rounded">Retry</button>
        </div>
      )}

      {!loading && !error && blogs.length === 0 && <p>No blogs found.</p>}

      {!loading && !error && blogs.map(blog => (
        <div key={blog._id} className="bg-white border rounded p-4 flex gap-4 items-start">
          <div className="w-36 h-24 bg-gray-100 rounded overflow-hidden">
            {blog.image ? (
              <img src={`${API_HOST}${blog.image}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="text-sm text-gray-500">
              {blog.category} · {new Date(blog.createdAt).toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">{blog.content}</p>
          </div>

          <button
            onClick={() => deleteBlog(blog._id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
