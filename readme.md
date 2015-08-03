# checklist-model
AngularJS directive for list of checkboxes

## Why this is needed?  
In Angular one checkbox `<input type="checkbox" ng-model="...">` is linked 
with one model.  
But in practice we usually want one model to store array of checked values 
from several checkboxes.  
**Checklist-model** solves that task without additional code in controller.   
You should play with attributes of `<input>` tag:
  
1. set `checklist-model` instead of `ng-model`
2. set `checklist-value` - what should be picked as array item  

Please, try out live demo: http://vitalets.github.io/checklist-model

Jsfiddle: http://jsfiddle.net/Ebv3p/2/  
Plunker (more advanced): http://plnkr.co/edit/pZLF0KesMDnIap0eCfSG?p=preview

## Installation
1. [Download latest release](https://github.com/vitalets/checklist-model/releases) or use bower:
````
bower install checklist-model 
````

2. Add to app dependencies:
````js
var app = angular.module("app", ["checklist-model"]);
````

## Development
We're using grunt as the build system. `grunt jade` generates the demo file and `grunt server` starts the demo server that can be access at `http://localhost:8000`. Tests can be ran by accessing `http://localhost:8000/test`.

The best way to involve is to report an issue/enhancement and then provide a pull request for it using Github usual features.

### How to add a new test case
1. Create a new folder under `docs/blocks` named `your-test`.
2. Create under that folder `ctrl.js` to describe the test Angular controller, `view.html` to describe the view part in HTML and `test.js` for the Angular scenario test. You can use an existing test as an example.
3. Add a line like `- items.push({id: 'your-test', text: 'Your test, ctrlName: 'CtrlTestName', testValue: 'selectedItems'})` to `docs/index.jade`
4. Add a line like `<script src="../docs/blocks/your-test/test.js"></script>` to `test\index.html`
5. Run `grunt jade` to generate `index.html` from `docs/index.jade`
6. Run `grunt server`
7. Access `http://localhost:8000` for samples and `http://localhost:8000/test` for running the tests.

## License
MIT 
