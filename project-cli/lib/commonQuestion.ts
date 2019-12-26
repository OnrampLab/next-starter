import * as inquirer from 'inquirer';
import { CliQuestion } from './interfaces/question';

const defaultValue = {
  hasStyle: false,
  isPage: false,
  name: '',
  componentBasedOnModuleName: '',
  hasCustomRoute: false,
};

export namespace Common {
  export const commonQuestion: inquirer.QuestionCollection<CliQuestion.Common> = [
    {
      default: defaultValue.hasStyle,
      message: 'Do you want to add style file?',
      name: 'hasStyle',
      type: 'confirm',
    },
    {
      default: defaultValue.isPage,
      message: 'Is a page module?',
      name: 'isPage',
      type: 'confirm',
    },
    {
      when(val) {
        return !val.isPage;
      },
      message: 'Where should the component be placed?',
      type: 'fuzzypath',
      name: 'componentBasedOnModuleName',
      excludePath: nodePath => nodePath.startsWith('node_modules'),
      excludeFilter: nodePath => nodePath === '.',
      itemType: 'directory',
      depth: 7,
      suggestOnly: true,
      rootPath: './src/modules',
    },
    {
      default: defaultValue.name,
      message: val => `What is ${val.isPage ? 'page' : 'component'} name?`,
      type: 'input',
      name: 'name',
    },
    {
      default: defaultValue.hasCustomRoute,
      message: 'Enable the custom route?',
      type: 'confirm',
      name: 'hasCustomRoute',
      when(val) {
        return val.isPage;
      },
    },
    {
      default: '',
      message: 'What is the custom route path?',
      type: 'input',
      name: 'customRouteName',
      when(val) {
        return val.hasCustomRoute;
      },
    },
  ];
}
