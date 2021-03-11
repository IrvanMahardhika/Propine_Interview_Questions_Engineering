"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryOptionConverter = exports.modelFinder = void 0;
const sequelize_1 = require("sequelize");
const models_1 = __importDefault(require("@infras/database/sequelize/models"));
const modelFinder = (modelName) => {
    return models_1.default[modelName];
};
exports.modelFinder = modelFinder;
const whereOptionsConverter = (whereOptions) => {
    const whereOptionsConverted = {};
    Object.keys(whereOptions).forEach((key) => {
        const selectedOption = whereOptions[key];
        if (typeof selectedOption === 'object') {
            const selectedOptionOperator = Object.keys(selectedOption)[0];
            const selectedOptionValues = selectedOption[selectedOptionOperator];
            const operator = sequelize_1.Op[selectedOptionOperator];
            if (operator) {
                whereOptionsConverted[key] = {
                    [operator]: selectedOptionValues === undefined ? null : selectedOptionValues,
                };
                return;
            }
        }
        whereOptionsConverted[key] = selectedOption;
    });
    return whereOptionsConverted;
};
const includeOptionsConverter = (includeOption) => {
    const { model = '', where, include: childInclude } = includeOption;
    const selectedModel = exports.modelFinder(model);
    const childIncludeOptions = [];
    let whereOptions;
    if (where && Object.keys(where).length > 0) {
        whereOptions = whereOptionsConverter(where);
    }
    if (childInclude && Array.isArray(childInclude)) {
        childInclude.forEach((child) => {
            childIncludeOptions.push(includeOptionsConverter(child));
        });
    }
    return Object.assign(Object.assign({}, includeOption), { model: selectedModel, where: whereOptions, include: childIncludeOptions || [] });
};
const repositoryOptionConverter = (options) => {
    let includeOptions = [];
    let whereOptions;
    const _a = options || {}, { where, include, model } = _a, restOptions = __rest(_a, ["where", "include", "model"]);
    // convert include options
    if (Array.isArray(include) && include.length > 0) {
        includeOptions = include.map((includeData = {}) => {
            return includeOptionsConverter(includeData);
        });
    }
    // convert where options
    if (where && Object.keys(where).length > 0) {
        whereOptions = whereOptionsConverter(where);
    }
    return Object.assign(Object.assign({}, restOptions), { where: whereOptions, include: includeOptions });
};
exports.repositoryOptionConverter = repositoryOptionConverter;
//# sourceMappingURL=helpers.js.map