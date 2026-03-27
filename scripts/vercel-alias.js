(async () => {
  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    console.error('Missing VERCEL_TOKEN env var');
    process.exit(1);
  }

  const projectId = process.env.VERCEL_PROJECT_ID || 'prj_PdRlURgcTt4zBPKYclJVkVcd3qlJ';
  const teamId = process.env.VERCEL_TEAM_ID; // optional
  const alias = process.env.VERCEL_ALIAS || (process.env.VERCEL_NEW_NAME ? `${process.env.VERCEL_NEW_NAME}.vercel.app` : 'bastosdeveloper.vercel.app');

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  async function tryGet(url) {
    const res = await fetch(url, { headers });
    const txt = await res.text();
    try { return { ok: res.ok, json: JSON.parse(txt), status: res.status }; } catch(e) { return { ok: res.ok, text: txt, status: res.status }; }
  }

  console.log('Listing deployments for project:', projectId);

  const endpoints = [
    `https://api.vercel.com/v13/deployments?projectId=${encodeURIComponent(projectId)}${teamId ? `&teamId=${encodeURIComponent(teamId)}` : ''}`,
    `https://api.vercel.com/v6/deployments?projectId=${encodeURIComponent(projectId)}${teamId ? `&teamId=${encodeURIComponent(teamId)}` : ''}`,
    `https://api.vercel.com/v12/deployments?projectId=${encodeURIComponent(projectId)}${teamId ? `&teamId=${encodeURIComponent(teamId)}` : ''}`,
    `https://api.vercel.com/v3/now/deployments?projectId=${encodeURIComponent(projectId)}${teamId ? `&teamId=${encodeURIComponent(teamId)}` : ''}`
  ];

  let deployments = null;
  for (const url of endpoints) {
    console.log('Trying', url);
    const r = await tryGet(url);
    if (r.ok) {
      const j = r.json || r.text;
      if (j) {
        if (Array.isArray(j)) { deployments = j; break; }
        if (Array.isArray(j.deployments)) { deployments = j.deployments; break; }
        if (Array.isArray(j.result)) { deployments = j.result; break; }
      }
    }
  }

  if (!deployments || deployments.length === 0) {
    console.error('No deployments found for project. Try deploying from Git or the dashboard.');
    process.exit(1);
  }

  // pick latest by created/createdAt/created_time
  deployments.sort((a,b) => {
    const ta = a.created || a.createdAt || a.created_time || 0;
    const tb = b.created || b.createdAt || b.created_time || 0;
    return tb - ta;
  });

  const dep = deployments[0];
  const deploymentId = dep.uid || dep.id || dep.deploymentId || dep.uuid || dep.name || dep.uid;
  const deploymentUrl = dep.url || dep.deploymentUrl || dep.name || dep.uid;

  console.log('Selected deployment:', deploymentId, deploymentUrl);

  // Try creating alias via v2 endpoint
  const aliasEndpoints = [
    `https://api.vercel.com/v2/deployments/${encodeURIComponent(deploymentId)}/aliases${teamId ? `?teamId=${encodeURIComponent(teamId)}` : ''}`,
    `https://api.vercel.com/v13/aliases${teamId ? `?teamId=${encodeURIComponent(teamId)}` : ''}`
  ];

  let aliasSuccess = false;
  for (const url of aliasEndpoints) {
    console.log('Attempting alias create at', url);
    let body;
    if (url.includes('/v2/deployments/')) {
      body = JSON.stringify({ alias });
    } else {
      body = JSON.stringify({ deploymentId, alias });
    }
    const res = await fetch(url, { method: 'POST', headers, body });
    const txt = await res.text();
    try {
      const j = JSON.parse(txt);
      if (res.ok) {
        console.log('Alias created:', JSON.stringify(j, null, 2));
        aliasSuccess = true;
        break;
      } else {
        console.warn('Alias create returned status', res.status, j);
      }
    } catch(e) {
      console.warn('Alias create response (non-json):', txt);
    }
  }

  if (!aliasSuccess) {
    console.error('Failed to create alias. You may need to create a deployment or set domain in dashboard.');
    process.exit(1);
  }

  // Wait a bit then check site
  console.log('Waiting 3s for propagation then checking', `https://${alias}/`);
  await new Promise(r => setTimeout(r, 3000));
  try {
    const check = await fetch(`https://${alias}/`);
    console.log('Site check status:', check.status);
    const txt = await check.text();
    console.log('First 400 chars of body:\n', txt.slice(0,400));
  } catch (err) {
    console.error('Error checking site:', err.message || err);
  }

  process.exit(0);
})().catch(err => { console.error('Error:', err); process.exit(1); });
