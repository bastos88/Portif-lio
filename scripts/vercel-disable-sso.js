(async () => {
  const token = process.env.VERCEL_TOKEN;
  const pid = process.env.VERCEL_PROJECT_ID;
  const team = process.env.VERCEL_TEAM_ID;
  if (!token || !pid) {
    console.error('Missing VERCEL_TOKEN or VERCEL_PROJECT_ID');
    process.exit(1);
  }

  const url = `https://api.vercel.com/v10/projects/${pid}` + (team ? `?teamId=${team}` : '');
  console.log('Patching', url, '-> ssoProtection.deploymentType = none');

  const res = await fetch(url, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ssoProtection: { deploymentType: 'none' } })
  });

  const json = await res.json();
  if (!res.ok) {
    console.error('PATCH failed', res.status);
    console.error(JSON.stringify(json, null, 2));
    process.exit(1);
  }
  console.log('PATCH succeeded:', JSON.stringify(json, null, 2));
})();
