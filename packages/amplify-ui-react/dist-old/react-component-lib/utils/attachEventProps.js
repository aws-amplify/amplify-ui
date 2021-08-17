'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.syncEvent =
  exports.isCoveredByReact =
  exports.getClassName =
  exports.attachEventProps =
    void 0;
function attachEventProps(node, newProps, oldProps) {
  if (oldProps === void 0) {
    oldProps = {};
  }
  var className = getClassName(node.classList, newProps, oldProps);
  if (className) {
    node.className = className;
  }
  Object.keys(newProps).forEach(function (name) {
    if (
      name === 'children' ||
      name === 'style' ||
      name === 'ref' ||
      name === 'className'
    ) {
      return;
    }
    if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
      var eventName = name.substring(2);
      var eventNameLc = eventName[0].toLowerCase() + eventName.substring(1);
      if (!isCoveredByReact(eventNameLc)) {
        syncEvent(node, eventNameLc, newProps[name]);
      }
    } else {
      node[name] = newProps[name];
    }
  });
}
exports.attachEventProps = attachEventProps;
function getClassName(classList, newProps, oldProps) {
  // map the classes to Maps for performance
  var currentClasses = arrayToMap(classList);
  var incomingPropClasses = arrayToMap(
    newProps.className ? newProps.className.split(' ') : []
  );
  var oldPropClasses = arrayToMap(
    oldProps.className ? oldProps.className.split(' ') : []
  );
  var finalClassNames = [];
  // loop through each of the current classes on the component
  // to see if it should be a part of the classNames added
  currentClasses.forEach(function (currentClass) {
    if (incomingPropClasses.has(currentClass)) {
      // add it as its already included in classnames coming in from newProps
      finalClassNames.push(currentClass);
      incomingPropClasses.delete(currentClass);
    } else if (!oldPropClasses.has(currentClass)) {
      // add it as it has NOT been removed by user
      finalClassNames.push(currentClass);
    }
  });
  incomingPropClasses.forEach(function (s) {
    return finalClassNames.push(s);
  });
  return finalClassNames.join(' ');
}
exports.getClassName = getClassName;
/**
 * Checks if an event is supported in the current execution environment.
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isCoveredByReact(eventNameSuffix, doc) {
  if (doc === void 0) {
    doc = document;
  }
  var eventName = 'on' + eventNameSuffix;
  var isSupported = eventName in doc;
  if (!isSupported) {
    var element = doc.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }
  return isSupported;
}
exports.isCoveredByReact = isCoveredByReact;
function syncEvent(node, eventName, newEventHandler) {
  var eventStore = node.__events || (node.__events = {});
  var oldEventHandler = eventStore[eventName];
  // Remove old listener so they don't double up.
  if (oldEventHandler) {
    node.removeEventListener(eventName, oldEventHandler);
  }
  if (newEventHandler != null) {
    // Bind new listener.
    node.addEventListener(
      eventName,
      (eventStore[eventName] = function handler(e) {
        newEventHandler.call(this, e);
      })
    );
  }
}
exports.syncEvent = syncEvent;
function arrayToMap(arr) {
  var map = new Map();
  arr.forEach(function (s) {
    return map.set(s, s);
  });
  return map;
}
//# sourceMappingURL=attachEventProps.js.map
