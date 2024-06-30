# Create a release from the main branch

## 1. Create release commit

From your local, bump the package version with `npm version <action>`. This creates a new commit.

This commit should now be merged to remote main branch.

## 2. Create a GitHub release

Create a new GitHub release, configured with a new tag `v<x>.<y>.<x>`. **Generate release notes** can be used.

**Please note any updates to the database configuration.**

If merging from a branch, please delete the branch.

## 3. Deploy new version

### BYU TRG BaseTerm API instance

GitHub automatically deploys to BYU TRG BaseTerm API instance on updates to main branch. 

However, changes to database configurations are not automatically applied. To apply new database migrations, the following can be run from the repository root: 

```
# Retrieve the database url from Heroku
npm ci
DATABASE_URL=<url for the database> \
APP_ENV=production \
PGSSLMODE=no-verify \
npm run migrate up
```

### New deployment

See the [Deploy Heroku stack guide](deploy-heroku-stack.md).
