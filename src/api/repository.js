const graphqlWithAuth = require('./request/graphqlWithAuth')

async function getRepository () {
  const { repository } = await graphqlWithAuth(`
  {
    repository(owner: "octokit", name: "graphql.js") {
      issues(last: 3) {
        edges {
          node {
            title
          }
        }
      }
    }
  }
`)
  return repository
}

module.exports = {
  getRepository
}
