(async () => {
  const token = process.env.VERCEL_TOKEN;
  if (!token) {
    console.error('Missing VERCEL_TOKEN env var');
    process.exit(1);
  }

  const projectSearch = process.env.VERCEL_PROJECT_SEARCH; // optional
  const newName = process.env.VERCEL_NEW_NAME || 'bastosdeveloper';
  const teamId = process.env.VERCEL_TEAM_ID; // optional

  let listUrl;
  if (projectSearch && projectSearch.trim() !== '') {
    listUrl = `https://api.vercel.com/v10/projects?search=${encodeURIComponent(projectSearch)}` + (teamId ? `&teamId=${encodeURIComponent(teamId)}` : '');
  } else {
    listUrl = `https://api.vercel.com/v10/projects?limit=100` + (teamId ? `&teamId=${encodeURIComponent(teamId)}` : '');
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  console.log('Searching projects for:', projectSearch);
  const listRes = await fetch(listUrl, { headers });
  const listJson = await listRes.json();

  const projects = Array.isArray(listJson) ? listJson : (listJson.projects || []);
  if (projects.length === 0) {
    console.error('No projects found. Response:');
    console.error(JSON.stringify(listJson, null, 2));
    process.exit(1);
  }

  // Try to find the project by several heuristics
  const projectSearchLower = projectSearch ? projectSearch.toLowerCase() : null;
  let project = null;
  if (projectSearchLower) {
    project = projects.find(p => (p.name && p.name.toLowerCase() === projectSearchLower) || (p.deploymentHostname && p.deploymentHostname.toLowerCase().includes(projectSearchLower)));
    if (!project) {
      // check aliases
      project = projects.find(p => Array.isArray(p.alias) && p.alias.some(a => {
        const aliasStr = (a && (a.alias || a.domain || a)) + '';
        return aliasStr.toLowerCase().includes(projectSearchLower);
      }));
    }
  }
  project = project || projects[0];
  console.log('Found project:', project.id, project.name, project.deploymentHostname || project.deploymentHostname);

  const patchUrl = `https://api.vercel.com/v10/projects/${project.id}` + (teamId ? `?teamId=${encodeURIComponent(teamId)}` : '');
  console.log(`Patching project ${project.id} -> name='${newName}'`);

  const patchRes = await fetch(patchUrl, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ name: newName })
  });

  const patchJson = await patchRes.json();

  if (!patchRes.ok) {
    console.error('Failed to rename project. Status:', patchRes.status);
    console.error(JSON.stringify(patchJson, null, 2));
    process.exit(1);
  }

  console.log('Rename successful:');
  console.log(JSON.stringify(patchJson, null, 2));
  // Also print the default hostname if present
  if (patchJson.deploymentHostname) {
    console.log('New deployment hostname:', patchJson.deploymentHostname);
  }

  process.exit(0);
})().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
