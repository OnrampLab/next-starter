#!/usr/bin/env node
/* eslint-disable complexity */
import * as chalk from 'chalk';
/* import * as clear from 'clear'; */
import * as program from 'commander';
import * as figlet from 'figlet';
import * as inquirer from 'inquirer';
import * as inquirerFuzzyPath from 'inquirer-fuzzy-path';
import { Common } from './lib/commonQuestion';
import { TemplateCreator, createCustomRoute, caseTransform } from './lib/helper';

inquirer.registerPrompt('fuzzypath', inquirerFuzzyPath);
console.clear();

console.log(chalk(figlet.textSync('Onramplab CLI Boilerplate')));

inquirer.prompt;

program
  .command('addFile')
  .alias('a')
  .description('Add a file')
  .action(async () => {
    const answers = await inquirer.prompt(Common.commonQuestion);
    if (answers.isPage) {
      TemplateCreator.pageWriter(answers.name, process.cwd(), answers.hasStyle);
      if (answers.hasCustomRoute) {
        const routeName = answers.customRouteName.replace(/^\//, '');
        createCustomRoute(routeName, `${caseTransform(answers.name)}`);
      }
    } else if (answers.name !== '') {
      TemplateCreator.component(answers.name, answers.componentBasedOnModuleName, answers.hasStyle);
    }
  });

program.parse(process.argv);
