import { readFileSync, existsSync, writeFileSync, mkdirSync, appendFileSync } from 'fs';
import { resolve, dirname } from 'path';
import * as mustache from 'mustache';

function createComponentTemplate(props: {
  name: string;
  hasStyle: boolean;
  styleName: string;
  tag: string;
  isComponent: boolean;
  definitionName: string;
}) {
  const template = readFileSync(
    resolve(__dirname, './templates/functional/fc.component.mustache'),
    'utf8',
  );
  const result = mustache.render(template, props);
  return result;
}

function createPageTemplate(props: { name: string }) {
  const template = readFileSync(
    resolve(__dirname, './templates/functional/pages.mustache'),
    'utf8',
  );
  const result = mustache.render(template, props);
  return result;
}

function createDefinitionTemplate(props: { name: string }) {
  const template = readFileSync(
    resolve(__dirname, './templates/functional/fc.d.ts.mustache'),
    'utf8',
  );
  const result = mustache.render(template, props);
  return result;
}

function createStyleTemplate(props: { name: string; tag: string }) {
  const template = readFileSync(
    resolve(__dirname, './templates/functional/style.component.mustache'),
    'utf8',
  );
  const result = mustache.render(template, props);
  return result;
}

function checkExists(absPath: string) {
  return existsSync(absPath);
}

function writeFileRecursive(data: string, absPath: string) {
  mkdirSync(dirname(absPath), { recursive: true });
  writeFileSync(absPath, data);
  return true;
}

function indexAppend(folderPath: string, nameOfFile: string) {
  appendFileSync(resolve(folderPath, 'index.ts'), `export * from './${nameOfFile}';\n`);
}

function caseTransform(str: string) {
  return str.replace(/([A-Z0-9])/g, $1 => `-${$1.toLowerCase()}`).replace(/^\-/, '');
}

function firstLetter(str: string) {
  return {
    upper: `${str[0].toUpperCase()}${str.slice(1)}`,
    lower: `${str[0].toLowerCase()}${str.slice(1)}`,
  };
}

function createCustomRoute(routePath: string, targetPath: string) {
  const regex = /^(?:[\t ]*(?:\r?\n|\r))+module.exports = routes;/gm;
  const content = readFileSync('./src/server/routes.js', 'utf8');
  const replaceTemplate = mustache.render(
    readFileSync(resolve(__dirname, './templates/functional/routes.mustache'), 'utf8'),
    { routePath, targetPath },
  );
  const replaceContent = content.replace(regex, replaceTemplate);
  writeFileSync('./src/server/routes.js', replaceContent, { encoding: 'utf8' });
}

class TemplateCreator {
  static component(name: string, rootPath: string, hasStyle: boolean) {
    const styleName = `${firstLetter(name).upper}Style`;
    const _template = createComponentTemplate({
      name,
      hasStyle,
      styleName,
      definitionName: firstLetter(name).upper,
      isComponent: true,
      tag: 'div',
    });
    const _componentPath = rootPath;

    if (hasStyle) {
      const _styleTemplate = createStyleTemplate({
        name: `${firstLetter(name).upper}Style`,
        tag: 'div',
      });
      writeFileRecursive(_styleTemplate, resolve(_componentPath, `styles/${name}.ts`));
      indexAppend(resolve(_componentPath, `styles`), name);
    }
    writeFileRecursive(_template, resolve(_componentPath, `${name}.tsx`));
    indexAppend(_componentPath, `${name}`);
  }

  static pageWriter(name: string, rootPath: string, hasStyle = false) {
    const _path = resolve(rootPath, 'src', 'pages', caseTransform(name), `index.tsx`);
    const definitionName = firstLetter(name).upper;
    if (!checkExists(_path)) {
      const _pageTemplate = createPageTemplate({ name });
      const _componentTemplate = createComponentTemplate({
        hasStyle,
        name,
        definitionName,
        isComponent: false,
        styleName: `${name}Style`,
        tag: 'div',
      });
      const _defFiles = createDefinitionTemplate({ name: definitionName });

      const _modulePath = resolve(rootPath, 'src', 'modules', name);
      // Write page
      writeFileRecursive(_pageTemplate, _path);
      // Write definition
      writeFileRecursive(
        _defFiles,
        resolve(_modulePath, 'entities', `I${definitionName}Page.d.ts`),
      );
      // Write Component
      writeFileRecursive(
        _componentTemplate,
        resolve(_modulePath, 'pages', `${firstLetter(name).upper}.tsx`),
      );

      if (hasStyle) {
        const _styleTemplate = createStyleTemplate({ name: `${name}Style`, tag: 'div' });
        writeFileRecursive(_styleTemplate, resolve(_modulePath, 'pages/styles', `${name}.ts`));
        indexAppend(resolve(_modulePath, 'pages/styles'), name);
      }

      // pages index append
      indexAppend(resolve(_modulePath, 'pages'), `${firstLetter(name).upper}`);
      // module index append
      indexAppend(_modulePath, 'pages');
      // entities index append
      indexAppend(resolve(_modulePath, 'entities'), `I${definitionName}Page`);
    } else {
      throw new Error(`${name} page module already exists!`);
    }
  }
}

export { TemplateCreator, createCustomRoute, caseTransform };
