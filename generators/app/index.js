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
      this.log(yosay('Yo! Welcome to the humble ' + chalk.green.bold('native-addon') + ' generator!'));

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
        type: 'list',
        name: 'type',
        message: 'What type of native addon technology would you like to use?',
        choices: [{
          value   : 'napi',
          name    : 'N-API',
          checked : true
        }, {
          value   : 'nan',
          name    : 'Nan',
          checked : false
        }, {
          value   : 'node',
          name    : 'Node',
          checked : false
        }]
      }];

      this.prompt(prompts).then(function(answers) {
        this.data.name = answers.name;
        this.data.type = answers.type;

        done();
      }.bind(this));
    };

    writing() {
      if(this.data.type == 'nan') {
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
          this.templatePath('./nan/binding.gyp'),
          this.destinationPath('./binding.gyp'),
          this.data
        );

      } else {
        this.fs.copyTpl(
          this.templatePath('./' + this.data.type + '/src/template.cpp'),
          this.destinationPath('./src/' + this.data.name + '.cpp'),
          this.data
        );

        this.fs.copyTpl(
          this.templatePath('./' + this.data.type + '/package.json'),
          this.destinationPath('./package.json'),
          this.data
        );

        this.fs.copyTpl(
          this.templatePath('./' + this.data.type + '/binding.gyp'),
          this.destinationPath('./binding.gyp'),
          this.data
        );
      };
      
      this.fs.copyTpl(
        this.templatePath('./common/index.js'),
        this.destinationPath('./index.js'),
        this.data
      );

      this.fs.copyTpl(
        this.templatePath('./common/example.js'),
        this.destinationPath('./example.js'),
        this.data
      );
      this.fs.copyTpl(
        this.templatePath('./common/README.md'),
        this.destinationPath('./README.md'),
        this.data
      );

      this.fs.copy(
        this.templatePath('./common/_gitignore'),
        this.destinationPath('./.gitignore')
      );
    };

    install() {
      this.installDependencies({
        bower: false,
        npm: true
      });
    };

    end() {
      this.log(chalk.green.bold('Done! Have fun!'));
    };
};

