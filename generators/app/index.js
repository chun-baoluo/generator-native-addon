'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');
const path = require('path');
const chalk = require('chalk');

module.exports = class extends Generator {
    constructor(args, opts) {
      super(args, opts);
    };

    initializing() {
      this.log(yosay('Yo! Welcome to the humble ' + chalk.green('native-addon') + ' generator!'));

      this.sourceRoot(path.join(__dirname, 'templates'));

      this.data = {
        appName: path.basename(process.cwd()),
      };
    };

    prompting() {
      let done = this.async();

      let prompts = [{
        type: 'input',
        name: 'name',
        message: 'What is the name of your addon?',
        default: this.data.appName
      }, {
        type: 'confirm',
        name: 'nan',
        message: 'Do you want to use Nan?',
        default: true
      }];

      this.prompt(prompts).then(function(answers) {
        this.data.name = answers.name;
        this.data.nan = answers.nan;

        done();
      }.bind(this));
    };

    writing() {
      if(this.data.nan == true) {
        this.fs.copyTpl(
          this.templatePath('./nan/src/template.cpp'),
          this.destinationPath('./src/' + this.data.name + '.cpp'),
          this.data
        );

        this.fs.copyTpl(
          this.templatePath('./nan/src/functions.cpp'),
          this.destinationPath('./src/functions.cpp'),
          this.data
        );

        this.fs.copyTpl(
          this.templatePath('./nan/src/functions.h'),
          this.destinationPath('./src/functions.h'),
          this.data
        );

        this.fs.copyTpl(
          this.templatePath('./nan/package.json'),
          this.destinationPath('./package.json'),
          this.data
        );

        this.fs.copyTpl(
          this.templatePath('./nan/index.js'),
          this.destinationPath('./index.js'),
          this.data
        );

        this.fs.copyTpl(
          this.templatePath('./nan/example.js'),
          this.destinationPath('./example.js'),
          this.data
        );

        this.fs.copyTpl(
          this.templatePath('./nan/binding.gyp'),
          this.destinationPath('./binding.gyp'),
          this.data
        );

        this.fs.copyTpl(
          this.templatePath('./nan/README.md'),
          this.destinationPath('./README.md'),
          this.data
        );

        this.fs.copy(
          this.templatePath('./nan/_gitignore'),
          this.destinationPath('./.gitignore')
        );
      } else {
        this.fs.copyTpl(
          this.templatePath('./pure/src/template.cpp'),
          this.destinationPath('./src/' + this.data.name + '.cpp'),
          this.data
        );

        this.fs.copyTpl(
          this.templatePath('./pure/package.json'),
          this.destinationPath('./package.json'),
          this.data
        );

        this.fs.copyTpl(
          this.templatePath('./pure/index.js'),
          this.destinationPath('./index.js'),
          this.data
        );

        this.fs.copyTpl(
          this.templatePath('./pure/example.js'),
          this.destinationPath('./example.js'),
          this.data
        );

        this.fs.copyTpl(
          this.templatePath('./pure/binding.gyp'),
          this.destinationPath('./binding.gyp'),
          this.data
        );

        this.fs.copyTpl(
          this.templatePath('./pure/README.md'),
          this.destinationPath('./README.md'),
          this.data
        );

        this.fs.copy(
          this.templatePath('./pure/_gitignore'),
          this.destinationPath('./.gitignore')
        );
      };
    };

    install() {
      this.installDependencies({
        bower: false,
        npm: true
      });
    };

    end() {   
    };
};

