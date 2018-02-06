module.exports = {
  githubHost: 'api.github.com',
  compareTags: (owner, repo, currentRelease, nextRelease) => `/repos/${owner}/${repo}/compare/${currentRelease}...${nextRelease}`,
  createRelease: (owner, repo) => `/repos/${owner}/${repo}/releases`,
  fetchReleases: (owner, repo, direction='created') => `/repos/${owner}/${repo}/releases?direction=${direction}`,
  pullRequests: (owner, repo, state='closed') => `/repos/${owner}/${repo}/pulls?state=${state}`
};
