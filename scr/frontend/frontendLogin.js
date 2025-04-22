fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        if (data.role === 'admin') {
          window.location.href = '/admin.html';
        } else {
          window.location.href = '/user.html';
        }
      } else {
        alert(data.message);
      }
    });