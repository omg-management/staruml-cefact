const common=require('./common-utils');
/**
 *
 *
 * @class Operations
 */
class Operations {
     /**
      * Creates an instance of Operations.
      * 
      * @constructor Operations
      */
     constructor(operations,mFilePath) {
          this.operations=operations;
          this.mFilePath=mFilePath;
          this.utils=new common.Utils();    
     }

     /**
      * Return Operations object 
      * 
      * @function getData
      * @return {string}
      */
     getOperations(codeWriter) {
          let mainPathsObject={};
          
          try {
               let interReal = app.repository.select("@UMLInterfaceRealization");
               this.operations.forEach(objOperation => {
                    
                    let filterInterface = interReal.filter(itemInterface => {
                         return itemInterface.target.name == objOperation.name;
                    });

                    if (filterInterface.length > 0) {
                         

                         let objInterface = filterInterface[0];

                         let interfaceAssociation = app.repository.select(objInterface.target.name + "::@UMLAssociation");
                         let filterInterfaceAssociation = interfaceAssociation.filter(item => {
                              return item.end2.aggregation == "composite";
                         });

                         if (filterInterfaceAssociation.length == 0) {
                              let pathsObject={};
                              mainPathsObject["/" + objInterface.target.name]=pathsObject;
                              codeWriter.writeLine("/" + objInterface.target.name + ":", 1, 0);

                              codeWriter.writeLine(null, 1, 0);

                              objInterface.target.operations.forEach(objOperation => {
                                   let wOperationObject={};
                                   
                                   if (objOperation.name.toUpperCase() == "GET") {
                                        console.log("---WO-1-get","/" + objInterface.target.name);
                                        pathsObject.get=wOperationObject;
                                        codeWriter.writeLine("get:", 0, 0);

                                        let tagsArray=[];
                                        

                                        codeWriter.writeLine("tags:", 1, 0);
                                        wOperationObject.tags=tagsArray;

                                        codeWriter.writeLine("- " + objInterface.target.name, 1, 1);
                                        tagsArray.push(objInterface.target.name);

                                        
                                        codeWriter.writeLine("description: Get a list of " + objInterface.source.name, 0, 0);
                                        wOperationObject.description='Get a list of '+objInterface.source.name;

                                        let parametersArray=[];
                                        wOperationObject.parameters=parametersArray;
                                        codeWriter.writeLine("parameters: " + (objOperation.parameters.filter(itemParameters => itemParameters.name != "id" && itemParameters.name != "identifier").length > 0 ?
                                             "" :
                                             "[]"), 0, 0);

                                        this.writeQueryParameters(parametersArray,codeWriter, objOperation);

                                        let responsesObject={};
                                        codeWriter.writeLine("responses:", 0, 0);
                                        wOperationObject.responses=responsesObject;

                                        let ok200Object={}
                                        codeWriter.writeLine("'200':", 1, 0);
                                        responsesObject['200']=ok200Object;

                                        ok200Object.description='OK';

                                        let contentObject={};
                                        codeWriter.writeLine("content:", 1, 0);
                                        ok200Object.content=contentObject;

                                        let appJsonObject={};
                                        codeWriter.writeLine("application/json:", 1, 0);
                                        contentObject['application/json']=appJsonObject;

                                        let schemaObject={};
                                        codeWriter.writeLine("schema:", 1, 0);
                                        appJsonObject.schema=schemaObject;

                                        let itemsObject={};
                                        codeWriter.writeLine("items: {$ref: '#/components/schemas/" + objInterface.source.name + "'}", 1, 0);
                                        schemaObject.items=itemsObject;
                                        itemsObject['$ref']='#/components/schemas/' + objInterface.source.name;

                                        codeWriter.writeLine("type: array", 0, 3);
                                        schemaObject.type='array';



                                        codeWriter.writeLine("description: OK", 0, 3);
                                        



                                   } else if (objOperation.name.toUpperCase() == "POST") {
                                        console.log("---WO-2-post","/" + objInterface.target.name);
                                        pathsObject.post=wOperationObject;
                                        codeWriter.writeLine("post:", 0, 0);


                                        let tagsArray=[];

                                        codeWriter.writeLine("tags:", 1, 0);
                                        wOperationObject.tags=tagsArray;

                                        codeWriter.writeLine("- " + objInterface.target.name, 1, 1);
                                        tagsArray.push(objInterface.target.name);


                                        codeWriter.writeLine("description:  Create a new " + objInterface.source.name, 0, 0);
                                        wOperationObject.description='Create a new ' + objInterface.source.name;

                                        let requestBodyObj={}
                                        wOperationObject.requestBody=requestBodyObj;
                                        this.buildRequestBody(codeWriter, objInterface,requestBodyObj);

                                        
                                        let responsesObject={};
                                        codeWriter.writeLine("responses:", 0, 0);
                                        wOperationObject.responses=responsesObject;

                                        let created201Object={};
                                        codeWriter.writeLine("'201':", 1, 0);
                                        responsesObject['201']=created201Object;

                                        let contentObj={};
                                        codeWriter.writeLine("content:", 1, 0);
                                        created201Object.content=contentObj;

                                        let appJsonObj={};
                                        codeWriter.writeLine("application/json:", 1, 0);
                                        contentObj['application/json']=appJsonObj;

                                        let schemaObj={};
                                        codeWriter.writeLine("schema: {$ref: '#/components/schemas/" + objInterface.source.name + "'}", 1, 2);
                                        appJsonObj.schema=schemaObj;
                                        schemaObj['$ref']='#/components/schemas/' + objInterface.source.name;


                                        codeWriter.writeLine("description: Created", 0, 3);
                                        created201Object.description='Created';

                                   }
                              });


                              codeWriter.writeLine(null, 0, 1);

                              let checkOperationArr = objInterface.target.operations.filter(item => {
                                   return item.name == "GET" || item.name == "PUT" || item.name == "DELTE";
                              });

                              if (checkOperationArr.length > 0) {
                                   let pathsObject={};
                                   let operationAttributes = objInterface.target.attributes.filter(item => {
                                        return item.name == "id" || item.name == "identifier";
                                   });
                                   operationAttributes.forEach(operationAttribute => {
                                        codeWriter.writeLine("/" + objInterface.target.name + "/{" + operationAttribute.name + "}:", 0, 0);
                                        mainPathsObject["/" + objInterface.target.name+'/{' + operationAttribute.name + '}']=pathsObject

                                        codeWriter.writeLine(null, 1, 0);

                                        objInterface.target.operations.forEach(objOperation => {
                                             let wOperationObject={};
                                             if (objOperation.name.toUpperCase() == "GET") {
                                                  console.log("---WO-3-get","/" + objInterface.target.name+'/{' + operationAttribute.name + '}');
                                                  pathsObject.get=wOperationObject;
                                                  codeWriter.writeLine("get:", 0, 0);


                                                  let tagsArray=[];
                                                  codeWriter.writeLine("tags:", 1, 0);
                                                  wOperationObject.tags=tagsArray;

                                                  codeWriter.writeLine("- " + objInterface.target.name, 1, 1);
                                                  tagsArray.push(objInterface.target.name);


                                                  wOperationObject.description='Get single ' + objInterface.source.name + ' by ' + operationAttribute.name;
                                                  codeWriter.writeLine("description: Get single " + objInterface.source.name + " by " + operationAttribute.name, 0, 0);

                                                  let parametersArray=[];
                                                  codeWriter.writeLine("parameters:", 0, 0);
                                                  wOperationObject.parameters=parametersArray;
                                                  let paramsObject={};
                                                  parametersArray.push(paramsObject);

                                                  let objSchema={};
                                                  objSchema.type='string';

                                                  this.utils.buildParameter(codeWriter, operationAttribute.name, "path", (operationAttribute.documentation ? this.utils.buildDescription(operationAttribute.documentation) : "missing description"), true, objSchema,paramsObject);

                                                  objInterface.target.attributes.forEach(itemAttribute => {
                                                       if (itemAttribute.name != "id" && itemAttribute.name != "identifier") {
                                                            let paramsObject={};
                                                            this.utils.buildParameter(codeWriter, itemAttribute.name, "query", (itemAttribute.documentation ? this.utils.buildDescription(itemAttribute.documentation) : "missing description"), false, objSchema,paramsObject);
                                                            parametersArray.push(paramsObject);
                                                       }
                                                  })

                                                  let responsesObj={};
                                                  codeWriter.writeLine("responses:", 0, 0);
                                                  wOperationObject.responses=responsesObj;

                                                  let ok200ResOjb={};
                                                  codeWriter.writeLine("'200':", 1, 0);
                                                  responsesObj['200']=ok200ResOjb;

                                                  ok200ResOjb.description='OK';

                                                  let contentObj={};
                                                  codeWriter.writeLine("content:", 1, 0);
                                                  ok200ResOjb.content=contentObj;


                                                  let appJsonObj={};
                                                  codeWriter.writeLine("application/json:", 1, 0);
                                                  contentObj['application/json']=appJsonObj;

                                                  let schemaObj={};
                                                  codeWriter.writeLine("schema: {$ref: '#/components/schemas/" + objInterface.source.name + "'}", 1, 2);
                                                  appJsonObj.schema=schemaObj;
                                                  schemaObj['$ref']='#/components/schemas/' + objInterface.source.name;



                                                  codeWriter.writeLine("description: OK", 0, 3);
                                                  




                                             } else if (objOperation.name.toUpperCase() == "DELETE") {
                                                  console.log("---WO-4-delete","/" + objInterface.target.name+'/{' + operationAttribute.name + '}');
                                                  codeWriter.writeLine("delete:", 0, 0);
                                                  pathsObject.delete=wOperationObject;

                                                  let tagsArray=[];
                                                  codeWriter.writeLine("tags:", 1, 0);
                                                  wOperationObject.tags=tagsArray;

                                                  codeWriter.writeLine("- " + objInterface.target.name, 1, 1);
                                                  tagsArray.push(objInterface.target.name);


                                                  codeWriter.writeLine("description: Delete an existing " + objInterface.source.name, 0, 0);
                                                  wOperationObject.description='Delete an existing ' + objInterface.source.name;

                                                  let parametersArray=[];
                                                  codeWriter.writeLine("parameters:", 0, 0);
                                                  wOperationObject.parameters=parametersArray;
                                                  let paramsObject={};
                                                  parametersArray.push(paramsObject);

                                                  let objSchema={};
                                                  objSchema.type='string';

                                                  this.utils.buildParameter(codeWriter, operationAttribute.name, "path", (operationAttribute.documentation ? this.utils.buildDescription(operationAttribute.documentation) : "missing description"), true, objSchema,paramsObject);

                                                  objInterface.target.attributes.forEach(itemAttribute => {
                                                       let paramsObject={};
                                                       if (itemAttribute.name != "id" && itemAttribute.name != "identifier") {
                                                            this.utils.buildParameter(codeWriter, itemAttribute.name, "query", (itemAttribute.documentation ? this.utils.buildDescription(itemAttribute.documentation) : "missing description"), false, objSchema,paramsObject);
                                                            parametersArray.push(paramsObject);
                                                       }
                                                  });

                                                  let resObj={};
                                                  codeWriter.writeLine("responses:", 0, 0);
                                                  wOperationObject.responses=resObj;

                                                  let noContent204Obj={};
                                                  codeWriter.writeLine("'204': {description: No Content}", 1, 2);
                                                  resObj['204']=noContent204Obj;
                                                  noContent204Obj.description='No Content';




                                             } else if (objOperation.name.toUpperCase() == "PUT") {
                                                  console.log("---WO-5-put","/" + objInterface.target.name+'/{' + operationAttribute.name + '}');
                                                  codeWriter.writeLine("put:", 0, 0);
                                                  pathsObject.put=wOperationObject;

                                                  let tagsArray=[];
                                                  codeWriter.writeLine("tags:", 1, 0);
                                                  wOperationObject.tags=tagsArray;

                                                  codeWriter.writeLine("- " + objInterface.target.name, 1, 1);
                                                  tagsArray.push(objInterface.target.name);


                                                  codeWriter.writeLine("description: Update an existing " + objInterface.source.name, 0, 0);
                                                  wOperationObject.description='Update an existing ' + objInterface.source.name;

                                                  let parametersArray=[];
                                                  codeWriter.writeLine("parameters:", 0, 0);
                                                  wOperationObject.parameters=parametersArray;
                                                  let paramsObject={};
                                                  parametersArray.push(paramsObject);

                                                  let objSchema={};
                                                  objSchema.type='string';

                                                  this.utils.buildParameter(codeWriter, operationAttribute.name, "path", (operationAttribute.documentation ? this.utils.buildDescription(operationAttribute.documentation) : "missing description"), true, objSchema,paramsObject);
                                                  objInterface.target.attributes.forEach(itemAttribute => {
                                                       let paramsObject={};
                                                       if (itemAttribute.name != "id" && itemAttribute.name != "identifier") {
                                                            this.utils.buildParameter(codeWriter, itemAttribute.name, "query", (itemAttribute.documentation ? this.utils.buildDescription(itemAttribute.documentation) : "missing description"), false, objSchema,paramsObject);
                                                            parametersArray.push(paramsObject);
                                                       }
                                                  });

                                                  let requestBodyObj={}
                                                  wOperationObject.requestBody=requestBodyObj;

                                                  this.buildRequestBody(codeWriter, objInterface,requestBodyObj);
                                                  
                                                  let resObj={};
                                                  codeWriter.writeLine("responses:", 0, 0);
                                                  wOperationObject.responses=resObj;

                                                  let ok200Obj={};
                                                  codeWriter.writeLine("'200':", 1, 0);
                                                  resObj['200']=ok200Obj;

                                                  ok200Obj.description='OK';

                                                  let contentObj={};
                                                  codeWriter.writeLine("content:", 1, 0);
                                                  ok200Obj.content=contentObj;

                                                  let appJsonObj={};
                                                  codeWriter.writeLine("application/json:", 1, 0);
                                                  contentObj['application/json']=appJsonObj;

                                                  let schemaObj={};
                                                  codeWriter.writeLine("schema: {$ref: '#/components/schemas/" + objInterface.source.name + "'}", 1, 2);
                                                  appJsonObj.schema=schemaObj;
                                                  schemaObj['$ref']='#/components/schemas/' + objInterface.source.name;


                                                  codeWriter.writeLine("description: OK", 0, 3);
                                                  



                                             } else if (objOperation.name.toUpperCase() == "PATCH") {
                                                  console.log("---WO-6-patch","/" + objInterface.target.name+'/{' + operationAttribute.name + '}');
                                                  codeWriter.writeLine("patch:", 0, 0);
                                                  pathsObject.patch=wOperationObject;

                                                  let tagsArray=[];
                                                  codeWriter.writeLine("tags:", 1, 0);
                                                  wOperationObject.tags=tagsArray;

                                                  codeWriter.writeLine("- " + objInterface.target.name, 1, 1);
                                                  tagsArray.push(objInterface.target.name);


                                                  codeWriter.writeLine("description:  Update " + objInterface.source.name, 0, 0);
                                                  wOperationObject.description='Update ' + objInterface.source.name;

                                                  let parametersArray=[];
                                                  codeWriter.writeLine("parameters:", 0, 0);
                                                  wOperationObject.parameters=parametersArray;
                                                  let paramsObject={};
                                                  parametersArray.push(paramsObject);

                                                  let objSchema={};
                                                  objSchema.type='string';

                                                  this.utils.buildParameter(codeWriter, operationAttribute.name, "path", (operationAttribute.documentation ? this.utils.buildDescription(operationAttribute.documentation) : "missing description"), true, objSchema,paramsObject);
                                                  objInterface.target.attributes.forEach(itemAttribute => {
                                                       let paramsObject={};
                                                       if (itemAttribute.name != "id" && itemAttribute.name != "identifier") {
                                                            this.utils.buildParameter(codeWriter, itemAttribute.name, "query", (itemAttribute.documentation ? this.utils.buildDescription(itemAttribute.documentation) : "missing description"), false, objSchema,paramsObject);
                                                            parametersArray.push(paramsObject);
                                                       }
                                                  });

                                                  let requestBodyObj={}
                                                  wOperationObject.requestBody=requestBodyObj;
                                                  this.buildRequestBody(codeWriter, objInterface,requestBodyObj);

                                                  let resObj={};
                                                  codeWriter.writeLine("responses:", 0, 0);
                                                  wOperationObject.responses=resObj;


                                                  let noContentObj={};
                                                  codeWriter.writeLine("'204': {description: No Content}", 1, 2);
                                                  resObj['204']=noContentObj;
                                                  noContentObj.description='No Content';


                                             }
                                        });

                                        codeWriter.writeLine(null, 0, 1);
                                   });

                                   codeWriter.writeLine(null, 0, 1);
                              }

                         } else {
                              if (objInterface.target.ownedElements.length > 0) {
                                   let interfaceRelation = objInterface.target.ownedElements;
                                   interfaceRelation.forEach(interAsso => {
                                        if (interAsso instanceof type.UMLAssociation) {
                                             if (interAsso.end2.aggregation == "composite") {
                                                  this.writeInterfaceComposite(codeWriter, objInterface, interAsso,mainPathsObject);
                                             }
                                        }
                                   });
                              }
                         }

                    }
               });
          } catch (error) {
               console.error("Found error", error.message);
               this.utils.writeErrorToFile(error,this.mFilePath);
          }

          return mainPathsObject;
     }


     

     /**
      * @function buildRequestBody
      * @description Build request body for api
      * @param {CodeWriter} codeWriter class instance 
      * @param {UMLInterfaceRealization} objInterface 
      */
     buildRequestBody(codeWriter, objInterface,requestBodyObj) {
          codeWriter.writeLine('requestBody:', 0, 0);

          let contentObj={};
          codeWriter.writeLine("content:", 1, 0);
          requestBodyObj.content=contentObj;

          let appJsonObject={};
          codeWriter.writeLine("application/json:", 1, 0);
          contentObj['application/json']=appJsonObject;

          let schemaObj={};
          codeWriter.writeLine("schema: {$ref: '#/components/schemas/" + objInterface.source.name + "'}", 1, 2);
          appJsonObject.schema=schemaObj;

          schemaObj['$ref']='#/components/schemas/' + objInterface.source.name;


          codeWriter.writeLine("description: ''", 0, 0);
          requestBodyObj.description='';
          codeWriter.writeLine("required: true", 0, 1);
          requestBodyObj.required=true;

     }

     /**
      * @function writeInterfaceComposite
      * @description Adds interface composision
      * @param {CodeWriter} codeWriter class instance
      * @param {UMLInterfaceRealization} interfaceRealization 
      * @param {UMLAssociation} interfaceAssociation 
      * @param {Object} mainPathsObject
      */
     
     writeInterfaceComposite(codeWriter, interfaceRealization, interfaceAssociation,mainPathsObject) {
          try {
               
               let end1Interface = interfaceAssociation.end1;
               let end2Interface = interfaceAssociation.end2;
               codeWriter.writeLine(null, 1, 0);
               let pathsObject={};
               interfaceRealization.target.operations.forEach(objOperation => {
                    
                    let wOperationObject={};
                    if (objOperation.name.toUpperCase() == "GET") {
                         let mICPath="/" + end2Interface.reference.name + "/{" + end2Interface.reference.name + "_" + end2Interface.reference.attributes[0].name + "}/" + end1Interface.reference.name;
                         console.log('---WIC-1-get',mICPath);

                         mainPathsObject[mICPath]=pathsObject;
                         /* Get all list */
                         codeWriter.writeLine(mICPath + ":", 0, 0);

                         pathsObject.get=wOperationObject;
                         codeWriter.writeLine("get:", 1, 0);

                         let tagsArray=[];
                         codeWriter.writeLine("tags:", 1, 0);
                         wOperationObject.tags=tagsArray;

                         codeWriter.writeLine("- " + interfaceRealization.target.name, 1, 1);
                         tagsArray.push(interfaceRealization.target.name);


                         wOperationObject.description='Get a list of ' +interfaceRealization.source.name;
                         codeWriter.writeLine("description: Get a list of " + interfaceRealization.source.name, 0, 0);

                         let parametersArray=[];
                         codeWriter.writeLine("parameters:", 0, 0);
                         wOperationObject.parameters=parametersArray;
                         let paramsObject={};
                         parametersArray.push(paramsObject);

                         let objSchema={};
                         objSchema.type='string';

                         this.utils.buildParameter(codeWriter, end2Interface.reference.name + "_" + end2Interface.reference.attributes[0].name, "path", (end2Interface.reference.attributes[0].documentation ? this.utils.buildDescription(end2Interface.reference.attributes[0].documentation) : "missing description"), true, objSchema,paramsObject);

                         let responsesObj={};
                         codeWriter.writeLine("responses:", 0, 0);
                         wOperationObject.responses=responsesObj;

                         let ok200ResOjb={};
                         codeWriter.writeLine("'200':", 1, 0);
                         responsesObj['200']=ok200ResOjb;

                         ok200ResOjb.description='OK';

                         let contentObj={};
                         codeWriter.writeLine("content:", 1, 0);
                         ok200ResOjb.content=contentObj;

                         let appJsonObj={};
                         codeWriter.writeLine("application/json:", 1, 0);
                         contentObj['application/json']=appJsonObj;

                         let schemaObj={};
                         codeWriter.writeLine("schema:", 1, 0);
                         appJsonObj.schema=schemaObj;
                         

                         let itemsArray=[];
                         schemaObj.items=itemsArray;
                         let itemsObj={};
                         itemsArray.push(itemsObj);
                         itemsObj['$ref']='#/components/schemas/' + interfaceRealization.source.name;
                         codeWriter.writeLine("items: {$ref: '#/components/schemas/" + interfaceRealization.source.name + "'}", 1, 0);
                         schemaObj.type='array';
                         codeWriter.writeLine("type: array", 0, 3);


                         codeWriter.writeLine("description: OK", 0, 4);
                         





                         /* Get single element record */

                         let mICPath1="/" + end2Interface.reference.name + "/{" + end2Interface.reference.name + "_" + end2Interface.reference.attributes[0].name + "}/" + end1Interface.reference.name + "/{" + end1Interface.reference.name + "_" + end1Interface.reference.attributes[0].name + "}";

                         codeWriter.writeLine(mICPath1+":", 0, 0);
                         console.log('---WIC-2-get',mICPath1);
                         let pathsSingleObject={};
                         mainPathsObject[mICPath1]=pathsSingleObject;

                         let wOperationSingleObject={};
                         pathsSingleObject.get=wOperationSingleObject;
                         codeWriter.writeLine("get:", 1, 0);

                         let tagsSingleArray=[];
                         codeWriter.writeLine("tags:", 1, 0);
                         wOperationSingleObject.tags=tagsSingleArray;

                         codeWriter.writeLine("- " + interfaceRealization.target.name, 1, 1);
                         tagsSingleArray.push(interfaceRealization.target.name);


                         wOperationSingleObject.description='Get a list of ' +interfaceRealization.source.name;
                         codeWriter.writeLine("description: Get a list of " + interfaceRealization.source.name, 0, 0);

                         let parametersSingleArray=[];
                         codeWriter.writeLine("parameters:", 0, 0);
                         wOperationSingleObject.parameters=parametersSingleArray;
                         let paramsSingleObject={};
                         parametersSingleArray.push(paramsSingleObject);

                         let objSingleSchema={};
                         objSingleSchema.type='string';

                         this.utils.buildParameter(codeWriter, end2Interface.reference.name + "_" + end2Interface.reference.attributes[0].name, "path", (end2Interface.reference.attributes[0].documentation ? this.utils.buildDescription(end2Interface.reference.attributes[0].documentation) : "missing description"), true, "{type: string}")
                         this.utils.buildParameter(codeWriter, end1Interface.reference.name + "_" + end1Interface.reference.attributes[0].name, "path", (end1Interface.reference.attributes[0].documentation ? this.utils.buildDescription(end1Interface.reference.attributes[0].documentation) : "missing description"), true,objSingleSchema,paramsSingleObject)

                         wOperationSingleObject.responses=responsesSingleObj;
                         codeWriter.writeLine("responses:", 0, 0);

                         responsesSingleObj['200']=ok200SingleResOjb;
                         codeWriter.writeLine("'200':", 1, 0);

                         ok200SingleResOjb.description='OK';

                         let contentSingleObj={};
                         codeWriter.writeLine("content:", 1, 0);
                         ok200SingleResOjb.content=contentSingleObj;

                         let appJsonSingleObj={};
                         codeWriter.writeLine("application/json:", 1, 0);
                         contentSingleObj['application/json']=appJsonSingleObj;

                         let schemaSingleObj={};
                         codeWriter.writeLine("schema:", 1, 0);
                         appJsonSingleObj.schema=schemaSingleObj;

                         schemaSingleObj['$ref']='#/components/schemas/' + interfaceRealization.source.name;
                         codeWriter.writeLine("schema: {$ref: '#/components/schemas/" + interfaceRealization.source.name + "'}", 1, 2);



                         codeWriter.writeLine("description: OK", 0, 4);




                    } else if (objOperation.name.toUpperCase() == "POST") {

                         let mICPath="/" + end2Interface.reference.name + "/{" + end2Interface.reference.attributes[0].name + "}/" + end1Interface.reference.name;
                         console.log('---WIC-2-post',mICPath);

                         mainPathsObject[mICPath]=pathsObject;


                         codeWriter.writeLine(mICPath + ":", 0, 0);

                         codeWriter.writeLine("post:", 1, 0);
                         pathsObject.post=wOperationObject;

                         let tagsArray=[];

                         codeWriter.writeLine("tags:", 1, 0);
                         wOperationObject.tags=tagsArray;

                         codeWriter.writeLine("- " + interfaceRealization.target.name, 1, 1);
                         tagsArray.push(interfaceRealization.target.name);

                         codeWriter.writeLine("description:  Create a new " + interfaceRealization.source.name, 0, 0);
                         wOperationObject.description='Create a new ' + interfaceRealization.source.name;

                         let parametersArray=[];
                         codeWriter.writeLine("parameters:", 0, 0);
                         wOperationObject.parameters=parametersArray;
                         let paramsObject={};
                         parametersArray.push(paramsObject);

                         let objSchema={};
                         objSchema.type='string';

                         this.utils.buildParameter(codeWriter, end2Interface.reference.attributes[0].name, "path", (end2Interface.reference.attributes[0].documentation ? this.utils.buildDescription(end2Interface.reference.attributes[0].documentation) : "missing description"), true, objSchema,paramsObject);

                         let requestBodyObj={}
                         wOperationObject.requestBody=requestBodyObj;

                         this.buildRequestBody(codeWriter, interfaceRealization,requestBodyObj);

                         let resObj={};
                         codeWriter.writeLine("responses:", 0, 0);
                         wOperationObject.responses=resObj;

                         let ok201Obj={};
                         codeWriter.writeLine("'201':", 1, 0);
                         resObj['201']=ok201Obj;

                         let contentObj={};
                         codeWriter.writeLine("content:", 1, 0);
                         ok201Obj.content=contentObj;

                         let appJsonObj={};
                         codeWriter.writeLine("application/json:", 1, 0);
                         contentObj['application/json']=appJsonObj;

                         let schemaObj={};
                         codeWriter.writeLine("schema: {$ref: '#/components/schemas/" + interfaceRealization.source.name + "'}", 1, 2);
                         appJsonObj.schema=schemaObj;
                         schemaObj['$ref']='#/components/schemas/' + interfaceRealization.source.name;


                         codeWriter.writeLine("description: Created", 0, 4);
                         ok201Obj.description='Created';




                    } else if (objOperation.name.toUpperCase() == "DELETE") {

                         let mICPath="/" + end2Interface.reference.name + "/{" + end2Interface.reference.name + "_" + end2Interface.reference.attributes[0].name + "}/" + end1Interface.reference.name + "/{" + end1Interface.reference.name + "_" + end1Interface.reference.attributes[0].name + "}";
                         console.log('---WIC-3-delete',mICPath);

                         mainPathsObject[mICPath]=pathsObject;

                         console.log('---WIC-3-delete',);

                         codeWriter.writeLine(mICPath+":", 0, 0);

                         codeWriter.writeLine("delete:", 1, 0);
                         pathsObject.delete=wOperationObject;

                         let tagsArray=[];
                         codeWriter.writeLine("tags:", 1, 0);
                         wOperationObject.tags=tagsArray;

                         //AskQue
                         // codeWriter.writeLine("- " + objInterface.target.name, 1, 1);
                         codeWriter.writeLine("- " + interfaceRealization.target.name, 1, 1);
                         tagsArray.push(interfaceRealization.target.name);
                         


                         //AskQue
                         // codeWriter.writeLine("description: Delete an existing " + objInterface.source.name, 0, 0);
                         codeWriter.writeLine("description: Delete an existing " + interfaceRealization.source.name, 0, 0);
                         wOperationObject.description='Delete an existing ' + interfaceRealization.source.name;


                         let parametersArray=[];
                         codeWriter.writeLine("parameters:", 0, 0);
                         wOperationObject.parameters=parametersArray;
                         let paramsObject={};
                         parametersArray.push(paramsObject);

                         let objSchema={};
                         objSchema.type='string';

                         this.utils.buildParameter(codeWriter, end2Interface.reference.name + "_" + end2Interface.reference.attributes[0].name, "path", (end2Interface.reference.attributes[0].documentation ? this.utils.buildDescription(end2Interface.reference.attributes[0].documentation) : "missing description"), true, objSchema,paramsObject);

                         //AskQue
                         let paramsObject1={};
                         this.utils.buildParameter(codeWriter, end1Interface.reference.name + "_" + end1Interface.reference.attributes[0].name, "path", (end1Interface.reference.attributes[0].documentation ? this.utils.buildDescription(end1Interface.reference.attributes[0].documentation) : "missing description"), true, objSchema,paramsObject1);
                         parametersArray.push(paramsObject1);
                         let resObj={};
                         codeWriter.writeLine("responses:", 0, 0);
                         wOperationObject.responses=resObj;

                         let noContent204Obj={};
                         codeWriter.writeLine("'204': {description: No Content}", 1, 3);
                         resObj['204']=noContent204Obj;
                         noContent204Obj.description='No Content';

                    }
               });
               codeWriter.writeLine(null, 0, 1);
          } catch (error) {
               console.error("Found error", error.message);
               this.utils.writeErrorToFile(error,this.mFilePath);
          }
     }

     
     /**
      * @function writeQueryParameters
      * @description Ads query paramater 
      * @param {CodeWriter} codeWriter class instance
      * @param {UMLOperation} objOperation
      */
     writeQueryParameters(parametersArray,codeWriter, objOperation) {
          ////Here to start
          try {
               objOperation.parameters.forEach(itemParameters => {
                    let paramsObject={};
                    
                    if (itemParameters.name != "id" && itemParameters.name != "identifier") {
                         parametersArray.push(paramsObject);
                         let objSchema={};
                         objSchema.type='string';
                         if (!(itemParameters.type instanceof type.UMLClass)) {
                              // codeWriter, name, type, description, required, schema
                              
                              this.utils.buildParameter(codeWriter, itemParameters.name, "query", (itemParameters.documentation ?
                                   this.utils.buildDescription(itemParameters.documentation) :
                                   "missing description"), false, objSchema,paramsObject);

                                   //AskQue
                                   // this.utils.buildParameter(codeWriter, itemParameters.name, "query", (itemParameters.documentation ?
                                   //      this.utils.buildDescription(itemParameters.documentation) :
                                   //      "missing description"), false, "{type: string}");
                         } else {

                              let param = itemParameters.type.attributes.filter(item => {
                                   return itemParameters.name.toUpperCase() == item.name.toUpperCase();
                              });

                              if (param.length == 0) {
                                   let generalizeClasses = this.utils.findGeneralizationOfClass(itemParameters.type,this.mFilePath);
                                   console.log(generalizeClasses);
                                   param = generalizeClasses[0].target.attributes.filter(item => {
                                        return itemParameters.name.toUpperCase() == item.name.toUpperCase();
                                   });
                              }

                              if (param[0].type == "DateTime") {
                                   this.utils.buildParameter(codeWriter, "before_" + param[0].name, "query", (itemParameters.documentation ?
                                        this.utils.buildDescription(itemParameters.documentation) :
                                        "missing description"), false, objSchema,paramsObject);
                                   this.utils.buildParameter(codeWriter, "after_" + param[0].name, "query", (itemParameters.documentation ?
                                        this.utils.buildDescription(itemParameters.documentation) :
                                        "missing description"), false, objSchema,paramsObject);

                              } else {
                                   this.utils.buildParameter(codeWriter, param[0].name, "query", (itemParameters.documentation ?
                                        this.utils.buildDescription(itemParameters.documentation) :
                                        "missing description"), false, objSchema,paramsObject);
                              }

                         }
                    }
               });
          } catch (error) {
               console.error("Found error", error.message);
               this.utils.writeErrorToFile(error,this.mFilePath);
          }
     }
     
}

exports.Operations = Operations;