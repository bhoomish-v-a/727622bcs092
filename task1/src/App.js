import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopUsers from './components/TopUsers';
import PostAnalytics from './components/PostAnalytics';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <Link className="navbar-brand" to="/">Social Analytics</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/top-users">Top Users</Link>
          <Link className="nav-link" to="/posts?type=popular">Popular Posts</Link>
          <Link className="nav-link" to="/posts?type=latest">Latest Posts</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<TopUsers />} />
        <Route path="/top-users" element={<TopUsers />} />
        <Route path="/posts" element={<PostWrapper />} />
      </Routes>
    </Router>
  );
}

// Wrapper to extract query param
const PostWrapper = () => {
  const query = new URLSearchParams(window.location.search);
  const type = query.get("type") || "popular";
  return <PostAnalytics type={type} />;
};

export default App;
