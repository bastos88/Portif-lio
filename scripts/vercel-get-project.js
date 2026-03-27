(async () => {
  const token = process.env.VERCEL_TOKEN;
  const pid = process.env.VERCEL_PROJECT_ID;
  const team = process.env.VERCEL_TEAM_ID;
  if (!token || !pid) {
    console.error('Missing VERCEL_TOKEN or VERCEL_PROJECT_ID');
    process.exit(1);
  }
  const url = `https://api.vercel.com/v10/projects/${pid}` + (team ? `?teamId=${team}` : '');
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
})().catch(e => { console.error(e); process.exit(1); });
