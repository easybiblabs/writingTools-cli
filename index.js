#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');

const { createRelease, releaseQuestions } = require('./release')

program
  .version('0.0.1')

program
  .command('create')
  .alias('c')
  .action(() => prompt(releaseQuestions).then((answers) => createRelease(answers)));

if (!process.argv.slice(1).length || !/[arudl]/.test(process.argv.slice(1))) {
  program.outputHelp();
  process.exit();
}

if (!process.env.GITHUB_ACCESS_TOKEN || !process.env.GITHUB_API_TOKEN) {
  return console.log('[Missing Github Credentials] - GITHUB_ACCESS_TOKEN || GITHUB_API_TOKEN')
}

program.parse(process.argv)
