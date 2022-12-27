const simpleGit = require('simple-git')
const git = simpleGit.default()

async function main() {
  try {
    const status = await git.status()

    if (!status.isClean()) {
      return
    }
    await git.commit('SampleCommit')
    await git.push('origin', 'main', ['--force'])
  } catch (error) {
    const status = await git.status()

    if (status.conflicted.length > 0) {
      return
    }

    console.log(error)
  }
}