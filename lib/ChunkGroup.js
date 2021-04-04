/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const = require("./util/SortableSet");
const compareLocations = require("./compareLocations");
const { ChunkGroup } = require("./ChunkGroup.1");

/** @typedef {import("./Chunk")} Chunk */
/** @typedef {import("./Module")} Module */
/** @typedef {import("./ModuleReason")} ModuleReason */

/** @typedef {{id: number}} HasId */
/** @typedef {{module: Module, loc: TODO, request: string}} OriginRecord */
/** @typedef {string|{name: string}} ChunkGroupOptions */

let debugId = 5000;
exports.debugId = debugId;

/**
 * @template T
 * @param {Set<T>} set set to convert to array.
 * @returns {T[]} the array format of existing set
 */
const getArray = set => Array.from(set);
exports.getArray = getArray;

/**
 * A convenience method used to sort chunks based on their id's
 * @param {HasId} a first sorting comparitor
 * @param {HasId} b second sorting comparitor
 * @returns {1|0|-1} a sorting index to determine order
 */
const sortById = (a, b) => {
	if (a.id < b.id) return -1;
	if (b.id < a.id) return 1;
	return 0;
};
exports.sortById = sortById;

/**
 * @param {OriginRecord} a the first comparitor in sort
 * @param {OriginRecord} b the second comparitor in sort
 * @returns {1|-1|0} returns sorting order as index
 */
const sortOrigin = (a, b) => {
	const aIdent = a.module ? a.module.identifier() : "";
	const bIdent = b.module ? b.module.identifier() : "";
	if (aIdent < bIdent) return -1;
	if (aIdent > bIdent) return 1;
	return compareLocations(a.loc, b.loc);
};
exports.sortOrigin = sortOrigin;

module.exports = ChunkGroup;
