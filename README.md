## webpack-branch-notes-plugin

### Installation
```js
npm i -D webpack-branch-notes-plugin
```

### Usage
Include th following in your webpack config
```js
const BranchNotesPlugin = require('webpack-branch-notes-plugin')
...
plugins: [
  new BranchNotesPlugin()
]
```

### Output
```js
/* packageName | packageVersion | currentBranchName | currentCommitHash */
...js content
```

### Options
* includes: array, default: ['packageName', 'packageVersion', 'branchName', 'commitHash']

### License
MIT