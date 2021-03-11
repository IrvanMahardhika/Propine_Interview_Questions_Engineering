"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfReturnValue = void 0;
function instanceOfReturnValue(object) {
    return Boolean(object.status &&
        ['SUCCESS', 'FAILED', 'VALID', 'INVALID', 'NOT_FOUND', 'ERROR'].includes(object.status));
}
exports.instanceOfReturnValue = instanceOfReturnValue;
//# sourceMappingURL=returnValue.js.map