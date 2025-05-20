import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Posts } from '../pages/Posts';
import { PostLists } from '../pages/PostLists';
import { Post } from '../pages/Post';
import { NoMatch } from '../pages/NoMatch';
import { Login } from '../auth/Login';
import { Stats } from '../auth/Stats';
import { NewPost } from '../auth/NewPost';

export function AppLayout() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}> Home </Link>
        <Link to="/posts" style={{ padding: 5 }}> Posts </Link>
        <Link to="/about" style={{ padding: 5 }}> About </Link>
        <span> | </span>
        {user && <Link to="/stats" style={{ padding: 5 }}> Stats </Link>}
        {user && <Link to="/newPost" style={{ padding: 5 }}> New Post </Link>}
        {!user && <Link to="/login" style={{ padding: 5 }}> Login </Link>}
        {user && (
          <span onClick={handleLogout} style={{ padding: 5, cursor: 'pointer' }}>
            Logout
          </span>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />}>
          <Route index element={<PostLists />} />
          <Route path=":slug" element={<Post user={user} />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/stats" element={<Stats user={user} />} />
        <Route path="/newPost" element={<NewPost user={user} />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}