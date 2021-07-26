const { graphql } = require('@octokit/graphql')
const { GITHUB_PERSONAL_TOKEN } = process.env
const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${GITHUB_PERSONAL_TOKEN}`
  }
})
module.exports = graphqlWithAuth
