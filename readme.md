## checklist-model
AngularJS directive for list of checkboxes

### Why this is needed?  
In Angular one checkbox `<input type="checkbox" ng-model="...">` is linked 
with one model.  
But in practice we usually want one model to store array of checked values 
from several checkboxes.  
**Checklist-model** solves that task without additional code in controller.   
You should play with attributes of `<input>` tag:
  
1. set `checklist-model` instead of `ng-model`
2. set `checklist-value` - what should be picked as array item  

Please, try out live demo: http://vitalets.github.io/checklist-model

License: MIT 