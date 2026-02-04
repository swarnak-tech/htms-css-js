function loadPage(page) {
  const content = document.getElementById('content');

  if (page === 'home') {
    content.innerHTML = '<h2>Home Page</h2><p>Welcome to SPA</p>';
  } else if (page === 'about') {
    content.innerHTML = '<h2>About Page</h2><p>SPA without reload</p>';
  }
}