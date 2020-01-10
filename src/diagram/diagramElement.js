var forEach = require('async-foreach').forEach;


let UMLClass = null;
let UMLInterface = null;
let UMLAssociation = null;
let UMLGeneralization = null;
let UMLInterfaceRealization = null;
let UMLEnumeration = null;
let UMLAssociationClassLink = null;
let AllElement = null;

function processVisibleAttributeViews(mAllElement) {
    forEach(mAllElement, function (element) {
        if (element instanceof type.UMLClass || element instanceof type.UMLInterface) {
            console.log("----view-checking----Class", element.name);
            let newAttributes = [];
            forEach(element.attributes, function (attrib) {
                console.log("----view-checking----attr-", attrib);
                let ArrUMLAttributeView = app.repository.getViewsOf(attrib);
                if (ArrUMLAttributeView.length >= 1) {

                    let resAttr = ArrUMLAttributeView.filter(function (item) {
                        return item.model._id == attrib._id;
                    });
                    console.log("----view-checking----attr-views", resAttr);
                    if (resAttr.length > 0) {

                        let UMLAttributeView = resAttr[0];
                        if (UMLAttributeView.visible) {
                            newAttributes.push(attrib);
                        }
                    }
                }
            });
            element.attributes = newAttributes;
        }
    });
}

function processVisibleLiteralViews(mAllElement) {
    forEach(mAllElement, function (element) {
        if (element instanceof type.UMLEnumeration) {
            console.log("----view-checking----Enumeration", element.name);
            let newLiterals = [];
            forEach(element.literals, function (mEnum) {
                console.log("----view-checking----mEnum-", mEnum);
                let ArrUMLEnumerationView = app.repository.getViewsOf(mEnum);
                if (ArrUMLEnumerationView.length >= 1) {

                    let resAttr = ArrUMLEnumerationView.filter(function (item) {
                        return item.model._id == mEnum._id;
                    });
                    console.log("----view-checking----mEnum-views", resAttr);
                    if (resAttr.length > 0) {

                        let UMLEnumerationView = resAttr[0];
                        if (UMLEnumerationView.visible) {
                            newLiterals.push(mEnum);
                        }
                    }
                }
            });
            element.literals = newLiterals;
        }
    });
}

function processVisibleOperationViews(mAllElement) {
    forEach(mAllElement, function (element) {
        if (element instanceof type.UMLInterface) {
            console.log("----view-checking----Interface", element.name);
            let newOperations = [];
            forEach(element.operations, function (mOperation) {
                console.log("----view-checking----mOperation-", mOperation);
                let ArrUMLOperationView = app.repository.getViewsOf(mOperation);
                if (ArrUMLOperationView.length >= 1) {

                    let resAttr = ArrUMLOperationView.filter(function (item) {
                        return item.model._id == mOperation._id;
                    });
                    console.log("----view-checking----mOperation-views", resAttr);
                    if (resAttr.length > 0) {

                        let UMLOperationView = resAttr[0];
                        if (UMLOperationView.visible) {
                            newOperations.push(mOperation);
                        }
                    }
                }
            });
            element.operations = newOperations;
        }
    });
}
/**
 * @function setUMLDiagramElement
 * @description save & sort all element from UMLClassDiagram 
 * @param {Array} mAllElement
 */
function setUMLDiagramElement(mAllElement) {
    mAllElement.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });

    /* Filter for visible attribute Views from diagram elements (Class & Interface) */
    //processVisibleAttributeViews(mAllElement);

    /* Filter for visible literal Views from diagram elements (Enumeration) */
    // processVisibleLiteralViews(mAllElement);

    /* Filter for visible operation Views from diagram elements (Interface) */
    // processVisibleOperationViews(mAllElement);

    AllElement = mAllElement;
}

/**
 * @function getUMLDiagramElement
 * @description returns all element from UMLClasssDiagram
 * @returns {Array} AllElement
 */
function getUMLDiagramElement() {
    return AllElement;
}

/**
 * @function setUMLClass
 * @description save UMLClass from UMLClassDiagram
 * @param {Array} mUMLClass
 */
function setUMLClass(mUMLClass) {
    console.log("UMLClasses", mUMLClass);
    UMLClass = mUMLClass
}

/**
 * @function getUMLClass
 * @description retuns the Array of UMLClass from UMLClassDiagra
 * @returns {Array} UMLClass
 */
function getUMLClass() {
    return UMLClass;
}

/**
 * @function setUMLInterface
 * @description save array of UMLInterface from UMLClassDiagram
 * @param {Array} mUMLInterface
 */
function setUMLInterface(mUMLInterface) {
    mUMLInterface.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
    console.log("UMLInterface", mUMLInterface);
    UMLInterface = mUMLInterface;
}

/**
 * @function getUMLInterface
 * @description returns array of UMLInterface from UMLClassDiagram
 * @returns {Array} UMLInterface
 */
function getUMLInterface() {
    return UMLInterface;
}

/**
 * @function setUMLAssociation
 * @description save and sort UMLAssociation from UMLClassDiagram
 * @param {Array} mUMLAssociation
 */
function setUMLAssociation(mUMLAssociation) {
    mUMLAssociation.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
    console.log("UMLAssociation", mUMLAssociation);
    UMLAssociation = mUMLAssociation;
}

/**
 * @function getUMLAssociation
 * @description returns array of UMLAssociation from UMLClassDiagram
 * @returns {Array} UMLAssociation
 */
function getUMLAssociation() {
    return UMLAssociation;
}

/**
 * @function setUMLGeneralization
 * @description save and sort UMLGeneralization from UMLClassDiagram
 * @param {Array} mUMLGeneralization
 */
function setUMLGeneralization(mUMLGeneralization) {
    mUMLGeneralization.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
    console.log("UMLGeneralization", mUMLGeneralization);
    UMLGeneralization = mUMLGeneralization;
}

/**
 * @function getUMLGeneralization
 * @description returns array of UMLGeneralization from UMLClassDiagram
 * @returns {Array} UMLGeneralization
 */
function getUMLGeneralization() {
    return UMLGeneralization;
}

/**
 * @function setUMLInterfaceRealization
 * @description save and sort UMLInterfaceRealization from UMLClassDiagram
 * @param {Array} mUMLInterfaceRealization
 */
function setUMLInterfaceRealization(mUMLInterfaceRealization) {
    mUMLInterfaceRealization.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
    console.log("UMLInterfaceRealization", mUMLInterfaceRealization);
    UMLInterfaceRealization = mUMLInterfaceRealization;
}

/**
 * @function getUMLInterfaceRealization
 * @description returns array of UMLInterfaceRealization from UMLClassDiagram
 * @returns {Array} UMLInterfaceRealization
 */
function getUMLInterfaceRealization() {
    return UMLInterfaceRealization;
}

/**
 * @function setUMLEnumeration
 * @description save and sort UMLEnumeration from UMLClassDiagram
 * @param {Array} mUMLEnumeration
 */
function setUMLEnumeration(mUMLEnumeration) {
    mUMLEnumeration.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
    console.log("UMLEnumeration", mUMLEnumeration);
    UMLEnumeration = mUMLEnumeration;
}

/**
 * @function getUMLEnumeration
 * @description returns array of UMLEnumeration from UMLClassDiagram
 * @returns {Array} UMLEnumeration
 */
function getUMLEnumeration() {
    return UMLEnumeration
}

/**
 * @function setUMLAssociationClassLink
 * @description save and sort UMLAssociationClassLink from UMLClassDiagram
 * @param {Array} mUMLAssociationClassLink
 */
function setUMLAssociationClassLink(mUMLAssociationClassLink) {
    mUMLAssociationClassLink.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
    console.log("UMLAssociationClassLink", mUMLAssociationClassLink);
    UMLAssociationClassLink = mUMLAssociationClassLink;
}

/**
 * @function getUMLAssociationClassLink
 * @description returns array of UMLAssociationClassLink from UMLClassDiagram
 * @returns {Array} UMLAssociationClassLink
 */
function getUMLAssociationClassLink() {
    return UMLAssociationClassLink;
}

/**
 * @function removeIDFromOwnedElement
 * @description remove '_id' property from element to clone new element and returns array of new cloned elements
 * @param {*} UMLEle
 * @param {*} allDiagramElement
 * @returns {Array} tempOwnedElements
 */
function removeIDFromOwnedElement(UMLEle, allDiagramElement) {
    let tempOwnedElements = [];

    if (UMLEle.hasOwnProperty('ownedElements')) {

        forEach(UMLEle.ownedElements, function (element) {
            let searchedEle = allDiagramElement.filter(function (mEle) {
                return element._id == mEle._id;
            });
            if (searchedEle.length != 0) {
                let mJsonRel = app.repository.writeObject(element);
                let mObjRel = JSON.parse(mJsonRel);
                delete mObjRel['_id'];
                if (element instanceof type.UMLAssociation) {
                    let end1, end2;
                    end1 = app.repository.writeObject(element.end1);
                    end1 = JSON.parse(end1);
                    delete end1['_id'];
                    end1 = app.repository.readObject(end1);
                    end1 = app.repository.writeObject(end1);
                    end1 = JSON.parse(end1);

                    end2 = app.repository.writeObject(element.end2);
                    end2 = JSON.parse(end2);
                    delete end2['_id'];
                    end2 = app.repository.readObject(end2);
                    end2 = app.repository.writeObject(end2);
                    end2 = JSON.parse(end2);

                    mObjRel.end1 = end1;
                    mObjRel.end2 = end2;
                }
                tempOwnedElements.push(mObjRel);
            }
        });
    }
    return tempOwnedElements;
}

function getViewOf(element) {
    let ViewOfElement = app.repository.getViewsOf(element);

    let ArrUMLAttributeView = app.repository.getViewsOf(attrib);

    if (ArrUMLAttributeView.length === 1) {
        let UMLAttributeView = ArrUMLAttributeView[0];
        if (UMLAttributeView.visible) {

            let mJsonAttrib = app.repository.writeObject(attrib);
            let mObjAttrib = JSON.parse(mJsonAttrib);
            delete mObjAttrib['_id'];
            // delete mObjAttrib['tags'];
            tempAttributes.push(mObjAttrib);
        }
    }
}
/**
 * @function removeIDFromAttribute
 * @description remove '_id' property from UMLAttribute to clone new UMLAttribute and returns array of new cloned UMLAttributes
 * @param {*} UMLEle
 * @returns {Array} tempAttributes
 */
function removeIDFromAttribute(UMLEle, UMLClassDiagram) {
    let tempAttributes = [];
    let allCView = [];

    if (UMLEle instanceof type.UMLClass) {
        allCView = app.repository.select(UMLClassDiagram.name + '::@UMLClassView');
    } else if (UMLEle instanceof type.UMLInterface) {
        allCView = app.repository.select(UMLClassDiagram.name + '::@UMLInterfaceView');
    } else if (UMLEle instanceof type.UMLEnumeration) {
        allCView = app.repository.select(UMLClassDiagram.name + '::@UMLEnumerationView');
    }
    let resAllCView = allCView.filter(function (item) {
        return UMLEle._id == item.model._id;
    });
    console.log("resAllCView", resAllCView);
    if (resAllCView.length == 1) {

        let subAttributeViews = resAllCView[0].attributeCompartment.subViews
        let resultAttrView = subAttributeViews.filter(function (itemAttrView) {
            return itemAttrView.visible
        });
        let resAttribute = [];
        forEach(resultAttrView, function (item) {
            resAttribute.push(item.model);
        });
        console.log("refactore attribute : " + UMLEle.name + " : ", resAttribute);


        // if (UMLEle.hasOwnProperty('attributes')) {

        forEach(resAttribute, function (attrib) {

            let newEnum=null;
            
            let mJsonAttrib = app.repository.writeObject(attrib);
            let mObjAttrib = JSON.parse(mJsonAttrib);


            //TODO Do not remove this code : This is for invisible enumeration code
            
            if (attrib.type instanceof type.UMLEnumeration) {
                let enumView = app.repository.select(UMLClassDiagram.name + '::@UMLEnumerationView');
                let resEnumView = enumView.filter(function (item) {
                    return item.model._id == attrib.type._id;
                });
                if (resEnumView.length == 1) {
                    let subLiteralViews = resEnumView[0].enumerationLiteralCompartment.subViews
                    let resultLiteralView = subLiteralViews.filter(function (itemLiteralView) {
                        return itemLiteralView.visible
                    });
                    let resLiteral = [];
                    forEach(resultLiteralView, function (item) {
                        let tmp=app.repository.writeObject(item.model);
                        let tmpObj=JSON.parse(tmp);
                        delete tmpObj['_id'];
                        resLiteral.push(tmpObj);
                    });
                    let stringEnum=app.repository.writeObject(attrib.type)
                    let tempNewEnum=JSON.parse(stringEnum);

                    delete tempNewEnum['_id'];

                    tempNewEnum.literals=resLiteral;

                    newEnum=app.repository.readObject(tempNewEnum);
                    mObjAttrib.type={'$ref':newEnum._id};

                }
            } 
           

            delete mObjAttrib['_id'];
            // delete mObjAttrib['tags'];
            tempAttributes.push(mObjAttrib);
        });
        // }
    }
    return tempAttributes;
}

/**
 * @function removeIDFromOperation
 * @description remove '_id' property from UMLOperation to clone new UMLOperation and returns array of new cloned UMLOperations 
 * @param {*} UMLEle
 * @returns {Array} tempOperation
 */
function removeIDFromOperation(UMLEle, UMLClassDiagram) {
    let tempOperation = [];
    let allCView = [];

    if (UMLEle instanceof type.UMLClass) {
        allCView = app.repository.select(UMLClassDiagram.name + '::@UMLClassView');
    } else if (UMLEle instanceof type.UMLInterface) {
        allCView = app.repository.select(UMLClassDiagram.name + '::@UMLInterfaceView');
    } else if (UMLEle instanceof type.UMLEnumeration) {
        allCView = app.repository.select(UMLClassDiagram.name + '::@UMLEnumerationView');
    }
    let resAllCView = allCView.filter(function (item) {
        return UMLEle._id == item.model._id;
    });
    console.log("resAllCView", resAllCView);
    if (resAllCView.length == 1) {

        let subOperationViews = resAllCView[0].operationCompartment.subViews
        let resultOperationView = subOperationViews.filter(function (itemOperationView) {
            return itemOperationView.visible
        });
        let resOperation = [];
        forEach(resultOperationView, function (item) {
            resOperation.push(item.model);
        });
        console.log("refactore attribute : " + UMLEle.name + " : ", resOperation);


        // if (UMLEle.hasOwnProperty('attributes')) {

        forEach(resOperation, function (attrib) {

            let mJsonOperation = app.repository.writeObject(attrib);
            let mObjOperation = JSON.parse(mJsonOperation);
            delete mObjOperation['_id'];
            // delete mObjAttrib['tags'];
            tempOperation.push(mObjOperation);
        });
        // }
    }
    /* if (UMLEle.hasOwnProperty('operations')) {

        forEach(UMLEle.operations, function (operation) {

            let mJsonOperation = app.repository.writeObject(operation);
            let mObjOperation = JSON.parse(mJsonOperation);
            delete mObjOperation['_id'];

            mObjOperation.parameters = removeIDFromParameter(operation);
            tempOperation.push(mObjOperation);
        });
    } */
    return tempOperation;
}

/**
 * @function removeIDFromParameter
 * @description remove '_id' property from UMLParameter to clone new UMLParameter and returns array of new cloned UMLParameters 
 * @param {*} UMLEle
 * @returns {Array} tempParams
 */
function removeIDFromParameter(UMLOperation) {
    let tempParams = [];
    if (UMLOperation.hasOwnProperty('parameters')) {

        forEach(UMLOperation.parameters, function (params) {

            let mJsonParams = app.repository.writeObject(params);
            let mObjParams = JSON.parse(mJsonParams);
            delete mObjParams['_id'];
            tempParams.push(mObjParams);
        });
    }
    return tempParams;
}

/**
 * @function removeIDFromLiterals
 * @description remove '_id' property from UMLEnumerationLiteral to clone new UMLEnumerationLiteral and returns array of new cloned UMLEnumerationLiterals 
 * @param {*} UMLEle
 * @returns {Array} tempLiterals
 */
function removeIDFromLiterals(UMLEle, UMLClassDiagram) {
    let tempLiterals = [];
    let allCView = [];

    if (UMLEle instanceof type.UMLClass) {
        allCView = app.repository.select(UMLClassDiagram.name + '::@UMLClassView');
    } else if (UMLEle instanceof type.UMLInterface) {
        allCView = app.repository.select(UMLClassDiagram.name + '::@UMLInterfaceView');
    } else if (UMLEle instanceof type.UMLEnumeration) {
        allCView = app.repository.select(UMLClassDiagram.name + '::@UMLEnumerationView');
    }
    let resAllCView = allCView.filter(function (item) {
        return UMLEle._id == item.model._id;
    });
    console.log("resAllCView", resAllCView);
    if (resAllCView.length == 1) {

        let subLiteralViews = resAllCView[0].enumerationLiteralCompartment.subViews
        let resultLiteralView = subLiteralViews.filter(function (itemLiteralView) {
            return itemLiteralView.visible
        });
        let resLiteral = [];
        forEach(resultLiteralView, function (item) {
            resLiteral.push(item.model);
        });
        console.log("refactore attribute : " + UMLEle.name + " : ", resLiteral);


        // if (UMLEle.hasOwnProperty('attributes')) {

        forEach(resLiteral, function (attrib) {

            let mJsonLiteral = app.repository.writeObject(attrib);
            let mObjLiteral = JSON.parse(mJsonLiteral);
            delete mObjLiteral['_id'];

            let tags = mObjLiteral.tags;
            /* remove ID from Tags from literal */
            if (tags != null && tags.length > 0) {

                let tempTags = [];
                forEach(tags, function (tag) {
                    delete tag['_id'];
                    tempTags.push(tag);
                });
                mObjLiteral.tags = tempTags;
            }

            tempLiterals.push(mObjLiteral);
        });
        // }
    }

    // if (UMLEle.hasOwnProperty('literals')) {

    //     forEach(UMLEle.literals, function (literals) {

    //         let mJsonLiteral = app.repository.writeObject(literals);
    //         let mObjJsonLiteral = JSON.parse(mJsonLiteral);
    //         delete mObjJsonLiteral['_id'];

    //         let tags = mObjJsonLiteral.tags;
    //         /* remove ID from Tags from literal */
    //         if (tags != null && tags.length > 0) {

    //             let tempTags = [];
    //             forEach(tags, function (tag) {
    //                 delete tag['_id'];
    //                 tempTags.push(tag);
    //             });
    //             mObjJsonLiteral.tags = tempTags;
    //         }
    //         tempLiterals.push(mObjJsonLiteral);
    //     });
    // }
    return tempLiterals;
}

/**
 * @function filterUMLClassDiagram
 * @description filter class, interface, enumeration, association, generalization, interfacerealization, association class link views from UMLClassDiagram
 * @param {UMLClassDiagram} UMLClassDiagram
 * @returns {Array} allDiagramView
 */
function filterUMLClassDiagram(UMLClassDiagram) {

    /* Filter all diagram views */
    let allDiagramView = UMLClassDiagram.ownedViews.filter(function (view) {
        return (view instanceof type.UMLClassView ||
                view instanceof type.UMLAssociationView ||
                view instanceof type.UMLInterfaceView ||
                view instanceof type.UMLInterfaceRealizationView ||
                view instanceof type.UMLGeneralizationView ||
                view instanceof type.UMLAssociationClassLinkView ||
                view instanceof type.UMLEnumerationView) &&
            view.visible
    });

    let allDiagramElement = [];
    forEach(allDiagramView, function (dView) {
        let model = dView.model;
        allDiagramElement.push(model);
    });

    setUMLDiagramElement(allDiagramElement);

    /* Filter UMLClass from model */
    let UMLClasses = allDiagramElement.filter(function (dElement) {
        return dElement instanceof type.UMLClass
    });
    setUMLClass(UMLClasses);

    /* Filter UMLInterface from model */
    let UMLInterface = allDiagramElement.filter(function (dElement) {
        return dElement instanceof type.UMLInterface
    });
    setUMLInterface(UMLInterface);

    /* Filter UMLAssociation from model */
    let UMLAssociation = allDiagramElement.filter(function (dElement) {
        return dElement instanceof type.UMLAssociation
    });
    setUMLAssociation(UMLAssociation);

    /* Filter UMLGeneralization from model */
    let UMLGeneralization = allDiagramElement.filter(function (dElement) {
        return dElement instanceof type.UMLGeneralization
    });
    setUMLGeneralization(UMLGeneralization);

    /* Filter UMLInterfaceRealization from model */
    let UMLInterfaceRealization = allDiagramElement.filter(function (dElement) {
        return dElement instanceof type.UMLInterfaceRealization
    });
    setUMLInterfaceRealization(UMLInterfaceRealization);

    /* Filter UMLEnumeration from model */
    let UMLEnumeration = allDiagramElement.filter(function (dElement) {
        return dElement instanceof type.UMLEnumeration
    });
    setUMLEnumeration(UMLEnumeration);

    /* Filter UMLAssociationClassLink from model */
    let UMLAssociationClassLink = allDiagramElement.filter(function (dElement) {
        return dElement instanceof type.UMLAssociationClassLink
    });
    setUMLAssociationClassLink(UMLAssociationClassLink);

    /* Process package object of diagram */
    let mainOwnedElements = []
    let tempPackage = {
        'name': 'tempPkg',
        'ownedElements': mainOwnedElements,
        'documentation': UMLClassDiagram.documentation,
        '_type': 'UMLPackage'
    };

    let newClasses = [];
    /* Process UMLClasses in package */
    forEach(UMLClasses, function (mClass) {

        let mJson = app.repository.writeObject(mClass);
        let mObj = JSON.parse(mJson);
        delete mObj['_id'];

        /* Remove '_id' field from UMLAttribute */
        mObj.attributes = removeIDFromAttribute(mClass, UMLClassDiagram);

        /* Remove '_id' field from UMLOperation */
        mObj.operations = removeIDFromOperation(mClass, UMLClassDiagram);

        /* Remove '_id' field from Elements available in 'ownedElements' array */
        mObj.ownedElements = removeIDFromOwnedElement(mClass, allDiagramElement);


        let created = app.repository.readObject(mObj);

        mainOwnedElements.push(created);

        newClasses.push(created);

    });
    setUMLClass(newClasses);

    /* Process UMLInterface in package */
    let newInterfaces = [];
    forEach(UMLInterface, function (mInterface) {

        let mJson = app.repository.writeObject(mInterface);
        let mObj = JSON.parse(mJson);
        delete mObj['_id'];

        /* Remove '_id' field from UMLAttribute */
        mObj.attributes = removeIDFromAttribute(mInterface, UMLClassDiagram);

        /* Remove '_id' field from UMLOperation */
        mObj.operations = removeIDFromOperation(mInterface, UMLClassDiagram);

        /* Remove '_id' field from Elements available in 'ownedElements' array */
        mObj.ownedElements = removeIDFromOwnedElement(mInterface, allDiagramElement);

        let created = app.repository.readObject(mObj);

        mainOwnedElements.push(created);

        newInterfaces.push(created);
    });
    setUMLInterface(newInterfaces);

    /* Process UMLEnumeration in package */
    let newEnumeration = [];
    forEach(UMLEnumeration, function (mEnum) {
        let mJson = app.repository.writeObject(mEnum);
        let mObj = JSON.parse(mJson);
        delete mObj['_id'];

        /* Remove '_id' field from UMLAttribute */
        mObj.attributes = removeIDFromAttribute(mEnum, UMLClassDiagram);

        /* Remove '_id' field from UMLOperation */
        mObj.operations = removeIDFromOperation(mEnum, UMLClassDiagram);

        /* Remove '_id' field from Elements available in 'ownedElements' array */
        mObj.ownedElements = removeIDFromOwnedElement(mEnum, allDiagramElement);

        /* Remove '_id' field from 'literals' array */
        mObj.literals = removeIDFromLiterals(mEnum, UMLClassDiagram);

        let created = app.repository.readObject(mObj);

        mainOwnedElements.push(created);

        newEnumeration.push(created);

    });
    setUMLEnumeration(newEnumeration);

    return tempPackage;
}

/**
 * @function removeDiagram
 * @description delete package from staruml after openapi is generated from diagram
 * @param {UMLPackage} tempPackage
 */
function removeDiagram(tempPackage) {
    let operationBuilder = app.repository.getOperationBuilder()
    operationBuilder.begin('remove item')
    operationBuilder.remove(tempPackage);
    operationBuilder.end();
    var cmd = operationBuilder.getOperation()
    app.repository.doOperation(cmd)
    console.log("deleted package", tempPackage);
}
module.exports.filterUMLClassDiagram = filterUMLClassDiagram;
module.exports.removeIDFromLiterals = removeIDFromLiterals;
module.exports.removeIDFromOperation = removeIDFromOperation;
module.exports.removeIDFromAttribute = removeIDFromAttribute;
module.exports.removeIDFromOwnedElement = removeIDFromOwnedElement;
module.exports.setUMLClass = setUMLClass;
module.exports.getUMLClass = getUMLClass;
module.exports.setUMLInterface = setUMLInterface;
module.exports.getUMLInterface = getUMLInterface;
module.exports.setUMLAssociation = setUMLAssociation;
module.exports.getUMLAssociation = getUMLAssociation;
module.exports.setUMLGeneralization = setUMLGeneralization;
module.exports.getUMLGeneralization = getUMLGeneralization;
module.exports.setUMLInterfaceRealization = setUMLInterfaceRealization;
module.exports.getUMLInterfaceRealization = getUMLInterfaceRealization;
module.exports.setUMLEnumeration = setUMLEnumeration;
module.exports.getUMLEnumeration = getUMLEnumeration;
module.exports.setUMLAssociationClassLink = setUMLAssociationClassLink;
module.exports.getUMLAssociationClassLink = getUMLAssociationClassLink;
module.exports.setUMLDiagramElement = setUMLDiagramElement;
module.exports.getUMLDiagramElement = getUMLDiagramElement;
module.exports.removeDiagram = removeDiagram;