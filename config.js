System.config({
  "baseURL": ".",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "angular": "npm:angular@1.4.0-rc.1",
    "angular-animate": "npm:angular-animate@1.4.0-rc.1",
    "angular-aria": "npm:angular-aria@1.4.0-rc.1",
    "angular-mocks": "npm:angular-mocks@1.4.0-rc.1",
    "angular-route": "npm:angular-route@1.4.0-rc.1",
    "babel": "npm:babel-core@5.2.17",
    "babel-core": "npm:babel-core@5.2.17",
    "babel-runtime": "npm:babel-runtime@5.2.17",
    "core-js": "npm:core-js@0.9.7",
    "jquery": "github:components/jquery@2.1.4",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:angular@1.4.0-rc.1": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.7": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

