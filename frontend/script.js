document.getElementById('subscribe-btn').addEventListener('click', async () => {
  const email = document.getElementById('subscribe-email').value;
  const statusEl = document.getElementById('subscribe-status');

  const res = await fetch('http://localhost:3000/subscribe', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email}),
  });

  const data = await res.json();
  statusEl.textContent = data.message || data.error;
});