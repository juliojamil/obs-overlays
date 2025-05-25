"use strict";

import {getObjectMethod} from "./getObject.js";
import {getJsonMethod} from "./getJson.js";
import {loadMethod} from "./load.js";
import {createMethod} from "./create.js";
import {setStateMethod} from "./setState.js";
import {setShadowMethod} from "./setShadow.js";
import {setHtmlMethod} from "./setHtml.js";
import {setTextMethod} from "./setText.js";
import {addAttrMethod} from "./addAttr.js";
import {addAttrNSMethod} from "./addAttrNS.js";
import {addListenMethod} from "./addListen.js";
import {addDataMethod} from "./addData.js";
import {addChildMethod} from "./addChild.js";

const SimplyBuilderObjectMethods = (types) => {
    return {
        addAttr: (data = {}) => addAttrMethod({...data, types}),
        addAttrNS: (data = {}) => addAttrNSMethod({...data, types}),
        addChild: (data = {}) => addChildMethod({...data, types}),

        addData: (data = {}) => addDataMethod({...data, types}),
        addListen: (data = {}) => addListenMethod({...data, types}),

        setText: (data = {}) => setTextMethod({...data, types}),
        setHtml: (data = {}) => setHtmlMethod({...data, types}),
        setShadow: (data = {}) => setShadowMethod({...data, types}),
        setState: (data = {}) => setStateMethod({...data, types}),
        createElement: (data = {}) => createMethod({...data, types}),
        load: (data = {}) => loadMethod({...data, types}),
        getObject: (data = {}) => getObjectMethod({...data, types}),
        getJson: (data = {}) => getJsonMethod({...data, types})
    }
};

export const SBOMethods = Object.freeze(SimplyBuilderObjectMethods);