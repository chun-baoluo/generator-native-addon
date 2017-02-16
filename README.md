# generator-native-addon

![alt tag](https://raw.githubusercontent.com/bakharevpavel/generator-electron-humble/master/generators/app/templates/dev/app/home/icon.png)

Humble native addon generator for Yeoman. Allows to generate a native addon using Nan or without it.

## Installation

```sh

	$ npm install -g generator-native-addon

```

## Usage

```sh

	$ yo native-addon

```

## Structure

Generated project has the following structure:

```sh

	.
	├── ./binding.gyp # Compilation settings
	├── ./example.js # Example file showing your addon's functionality.
	├── ./index.js # This file exports your addon.
	├── ./package.json
	├── ./README.md
	└── ./src # C or C++ source code from which your native addon will be generated.
	    └── ./src/[name].cpp

```