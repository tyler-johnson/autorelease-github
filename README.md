# Autorelease Github

[![npm](https://img.shields.io/npm/v/autorelease-github.svg)](https://www.npmjs.com/package/autorelease-github) [![David](https://img.shields.io/david/tyler-johnson/autorelease-github.svg)](https://david-dm.org/tyler-johnson/autorelease-github) [![Build Status](https://travis-ci.org/tyler-johnson/autorelease-github.svg?branch=master)](https://travis-ci.org/tyler-johnson/autorelease-github)

[Autorelease](http://ghub.io) steps for Github repositories that creates Github releases with the changelog. Check out [this very repo's releases](https://github.com/tyler-johnson/autorelease-github/releases) for an example.

Check out [autorelease-travis](http://ghub.io/autorelease-travis) for Travis CI integration.

## Quick Setup

To avoid the manual install process, use [autorelease-setup](http://ghub.io/autorelease-setup). The prompts will guide you through the correct configuration.

```bash
npm i autorelease-setup -g
autorelease-setup
```

## Manual Setup

Install with NPM as a dev dependency with `autorelease`:

```bash
npm i autorelease autorelease-github --save-dev
```

Add the following to a `.autoreleaserc` file in the root directory:

```json
{
  "pre": {
    "verify": [ "autorelease-github/verify.js" ]
  },
  "post": {
    "publishChangelog": [ "autorelease-github/create-release.js" ]
  }
}
```

Make sure the Github repository URL is specified in the `package.json` file:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/ghusername/my-autorelease-project.git"
  }
}
```

And lastly, set a Github [personal access token](https://github.com/settings/tokens) to the `GH_TOKEN` environment variable. The token needs to have the minimum scopes of `repo`, `read:org`, `user:email`, and `write:repo_hook`.

```bash
export GH_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
