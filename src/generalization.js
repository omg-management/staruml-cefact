const openAPI = require('./openapi');
const constant = require('./constant');
const Utils = require('./utils');
var diagramEle = require('./diagram/diagramElement');

/**
 * @class Generalization 
 * @description class returns the API Generalization 
 */
class Generalization {
     /**
      * @constructor Creates an instance of Generalization.
      */
     constructor() {
          this.utils = new Utils();
     }


     /**
      * @function addGeneralization
      * @description add Generalization in mainClassesObj
      * @param {Array} arrGeneral
      * @param {Object} mainClassesObj
      * @returns {Object}
      * @memberof Generalization
      */
     addGeneralization(arrGeneral, mainClassesObj) {
          /**
           * Add Generalization class
           * Inherite all properties of parent class
           */
          if (arrGeneral.length > 0) {
               let allOfArray = [];
               mainClassesObj.allOf = allOfArray;
               arrGeneral.forEach(generalizeClass => {
                    let allOfObj = {};
                    allOfObj['$ref'] = constant.getReference() + generalizeClass.target.name;
                    allOfArray.push(allOfObj);


                    allOfObj = {};
                    allOfObj['type'] = 'object';
                    allOfArray.push(allOfObj);
               });

          }

          return mainClassesObj;
     }

     /**
      * @function findGeneralizationRecursivelyOfClass
      * @description Function will check recursively for ownedElements UMLGeneralization of target class to check if target has isID property or not
      * @param {UMLClass} itemClass
      * @param {Array} parentGeneralizationClassAttribute
      * @memberof Aggregation
      */
     findGeneralizationRecursivelyOfClass(itemClass, parentGeneralizationClassAttribute) {
          if (itemClass instanceof type.UMLClass) {
               itemClass.ownedElements.forEach(item => {
                    if (item instanceof type.UMLGeneralization) {


                         let generalizationSourceID = item.source._id;
                         if (itemClass._id == generalizationSourceID) {
                              parentGeneralizationClassAttribute.push(item);
                              this.findGeneralizationRecursivelyOfClass(item.target, parentGeneralizationClassAttribute);
                         }
                    }

               });
          }
          console.log("Generalization classes", parentGeneralizationClassAttribute);
     }

     /**
      * @function findGeneralizationOfClass
      * @description Find all generalization of UMLClass
      * @param {UMLClass} objClass 
      * @memberof Generalization
      */
     findGeneralizationOfClass(objClass) {
          try {

               let filterGeneral = null;
               if (openAPI.isModelPackage()) {

                    let generalizeClasses = app.repository.select(openAPI.getUMLPackage().name + "::" + objClass.name + "::@UMLGeneralization");
                    //  let generalizeClasses = app.repository.select("@UMLGeneralization");
                    filterGeneral = generalizeClasses.filter(item => {
                         return item.source._id == objClass._id
                    });

               } else if (openAPI.isModelDiagram()) {
                    let generalizeClasses = diagramEle.getUMLGeneralization();;
                    filterGeneral = generalizeClasses.filter(item => {
                         return item.source._id == objClass._id
                    });

               }


               return filterGeneral;
          } catch (error) {
               console.error("Found error", error.message);
               this.utils.writeErrorToFile(error);
          }
     }
}

module.exports = Generalization;