const fs = require('fs-extra');
const readline = require('readline');
const replace = require('replace-in-file');

process.chdir(require('path').resolve(__dirname, '../packages'));

const BASE_DIRECTORY = './';
const DEFAULT_COMPANY_NAME = 'myprojectcompany';
const DEFAULT_PROJECT_NAME = 'myprojectname';
const DEFAULT_PACKAGE_NAME = `com.${DEFAULT_COMPANY_NAME}.${DEFAULT_PROJECT_NAME}`;
const VALID_CHARACTERS = /^[a-zA-Z\s]+$/;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readInput = input => {
  return new Promise((resolve, reject) => {
    rl.question(`Enter your ${input}: `, answer => {
      resolve(answer);
    });
  });
};

const replaceInFile = (from, to) => {
  return new Promise((resolve, reject) => {
    const options = {
      files: ['./mobile/android/**', './mobile/ios/**', './mobile/*', './web/**'],
      from: new RegExp(from, 'g'),
      to: to,
      glob: {
        dot: true,
      },
    };
    replace(options)
      .then(results => {
        if (results) {
          const changedFiles = results.filter(result => result.hasChanged).map(result => result.file);
          console.log('[replaceInFile] Modified files: \n', changedFiles.join('\n'));
        }
        resolve();
      })
      .catch(error => {
        console.error('[replaceInFile] Error occurred: ', error);
        reject(error);
      });
  });
};

const renameFiles = (dir, from, to) => {
  const files = fs.readdirSync(dir);
  for (let i = 0; i < files.length; i += 1) {
    const filename = files[i];
    const path = dir + '/' + filename;
    const file = fs.statSync(path);
    let newPath;
    if (filename.indexOf(from) !== -1) {
      newPath = dir + '/' + filename.replace(from, to);
      fs.renameSync(path, newPath);
      console.log(`[renameFiles] Renamed: ${path} to: ${newPath}`);
    }
    // Recursive
    if (file.isDirectory()) {
      renameFiles(newPath || path, from, to);
    }
  }
};

const updateProjectName = name => {
  console.log('---------------------------------------');
  console.log(`Updating project name: ${name}`);
  console.log('---------------------------------------');
  return replaceInFile(DEFAULT_PROJECT_NAME, name).then(() => {
    console.log('---------------------------------------');
    console.log('Finished updating project name');
    console.log('---------------------------------------');
    console.log();
  });
};

const updatePackageName = packageName => {
  console.log('---------------------------------------');
  console.log(`Updating package name: ${packageName}`);
  console.log('---------------------------------------');
  return replaceInFile(DEFAULT_PACKAGE_NAME, packageName).then(() => {
    console.log('---------------------------------------');
    console.log('Finished updating package name');
    console.log('---------------------------------------');
    console.log();
  });
};

const renameProjectFiles = name => {
  console.log('---------------------------------------');
  console.log(`Rename project files`);
  console.log('---------------------------------------');
  return new Promise((resolve, reject) => {
    renameFiles(BASE_DIRECTORY, DEFAULT_PROJECT_NAME, name);
    renameFiles(BASE_DIRECTORY, DEFAULT_PROJECT_NAME.toLowerCase(), name.toLowerCase());
    console.log('---------------------------------------');
    console.log('Finished renaming project files');
    console.log('---------------------------------------');
    console.log();
    resolve();
  });
};

const renameCompanyFiles = name => {
  console.log('---------------------------------------');
  console.log(`Rename company files`);
  console.log('---------------------------------------');
  return new Promise((resolve, reject) => {
    renameFiles(BASE_DIRECTORY, DEFAULT_COMPANY_NAME, name);
    console.log('---------------------------------------');
    console.log('Finished renaming company files');
    console.log('---------------------------------------');
    console.log();
    resolve();
  });
};

const updatePackageJSON = name => {
  const package = fs.readJSONSync('../package.json');
  package.name = name;
  fs.writeJSONSync('../package.json', package, { spaces: 2 });
};

const run = async () => {
  console.log('---------------------------------------------------------');
  let projectName = await readInput('Project name, e.g. My Amazing Project');
  console.log('---------------------------------------------------------');
  if (!projectName || projectName === '' || projectName.trim() === '') {
    throw new Error('ERROR: Please supply a project name');
  }
  if (!projectName.match(VALID_CHARACTERS)) {
    throw new Error('ERROR: The project name must only contain letters or spaces');
  }

  let companyName = await readInput('Company name, e.g. My Company');
  console.log('---------------------------------------------------------');
  if (!companyName || companyName === '' || companyName.trim() === '') {
    throw new Error('ERROR: Please supply a company name');
  }
  if (!companyName.match(VALID_CHARACTERS)) {
    throw new Error('ERROR: The company name must only contain letters or spaces');
  }
  const packageJsonName = projectName.replace(/ /g, '-').toLowerCase();
  projectName = projectName.replace(/ /g, '').toLowerCase();
  companyName = companyName.replace(/ /g, '').toLowerCase();

  const packageName = `com.${companyName}.${projectName.toLowerCase()}`;
  // Close the input
  rl.close();

  updatePackageName(packageName)
    .then(() => updateProjectName(projectName))
    .then(() => renameProjectFiles(projectName))
    .then(() => renameCompanyFiles(companyName))
    .then(() => updatePackageJSON(packageJsonName))
    .then(() => {
      console.log();
      console.log('---------------------------------------------------------');
      console.log('Set project parameters to:');
      console.log('---------------------------------------------------------');
      console.log('Project name: ', projectName);
      console.log('Company name: ', companyName);
      console.log('Package name: ', packageName);
      console.log('package.json name: ', packageJsonName);
      console.log('---------------------------------------------------------');
      console.log();
    });
};

run().catch(error => {
  console.error(error.message);
  console.log('---------------------------------------------------------');
  process.exit();
});
