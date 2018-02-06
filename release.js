const request = require('./request');
const { fetchReleases, pullRequests } = require('./githubConst');
const { updateVersion } = require('./semVar');

const releaseQuestions = [
  {
    type : 'input',
    name : 'owner',
    message : 'Enter github repo owner ..',
    default: 'easybib'
  },
  {
    type : 'input',
    name : 'repo',
    message : 'Enter github repo ...',
    default: 'citationmachine-bibme'
  },
  {
    type : 'input',
    name : 'site',
    message : 'Enter site ...', 
    default: 'cm'
  },  
  {
    type : 'input',
    name : 'draft',
    message : 'Draft release?',
    default: false
  },
];

const compileNotes = pullRequests => {
  let notes = [];
  for (var i = 0, len = pullRequests.length; i < len; i++) {
    let pullRequest = pullRequests[i]
    notes.push(`${pullRequest.number} - ${pullRequest.title}`);
  }
  return notes.join("\n")
}

const compareTags = (owner, repo, currentRelease, nextRelease) => {
  request(compareTags(owner, repo, currentRelease, nextRelease))
    .then(response => resolve(response))
    .catch(error => console.log('[compareTags] ', error))
}

const filterPullRequestsBySite = (pullRequests, siteCode) => {
  return (siteCode === 'eb') ?
    pullRequests.filter(pullRequest => pullRequest.title.match(new RegExp(siteCode, "i"))) :
    pullRequests.filter(pullRequest => !pullRequest.title.match(new RegExp("eb", "i")))
}

const filterReleasesBySite  = (releases, siteCode) => releases.filter(release => release.name.match(new RegExp(siteCode, "i")))

const updateRelease = (body, link, htmlDiff) => {

}

const createRelease = (prompts) => {
  const { owner, repo, site, draft=false } = prompts;
  request(fetchReleases(owner, repo), 'GET')
    .then(releases => {
      const currentRelease = filterReleasesBySite(releases, site)[0];
      const nextRelease    = updateVersion(currentRelease.name);
      request(pullRequests(owner, repo), 'GET')
        .then(pullRequests => {
          let notes = compileNotes(filterPullRequestsBySite(pullRequests, site));
          let data  = { tag_name: nextRelease, name: nextRelease, body: notes };
          let resp  = { statusCode: 200, body: JSON.stringify(data), headers: {'Content-Type': 'application/json'} };
          request(createRelease(owner, repo), 'POST', data)
            .then(release => {
              let compareResult = compareTags(owner, repo, currentRelease, nextRelease)
              // updateRelease()
            })
            .catch(error => console.log(error));
        });
    });
}

module.exports = { createRelease, releaseQuestions };