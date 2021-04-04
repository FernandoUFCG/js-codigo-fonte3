/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const = require("./dependencies/ConstDependency");
const = require("./ParserHelpers");

const = require("./NullFactory");
const { APIPlugin } = require("./APIPlugin.1");

/* eslint-disable camelcase */
const REPLACEMENTS = {
	__webpack_require__: "__webpack_require__",
	__webpack_public_path__: "__webpack_require__.p",
	__webpack_modules__: "__webpack_require__.m",
	__webpack_chunk_load__: "__webpack_require__.e",
	__non_webpack_require__: "require",
	__webpack_nonce__: "__webpack_require__.nc",
	"require.onError": "__webpack_require__.oe"
};
exports.REPLACEMENTS = REPLACEMENTS;
const NO_WEBPACK_REQUIRE = {
	__non_webpack_require__: true
};
exports.NO_WEBPACK_REQUIRE = NO_WEBPACK_REQUIRE;
const REPLACEMENT_TYPES = {
	__webpack_public_path__: "string",
	__webpack_require__: "function",
	__webpack_modules__: "object",
	__webpack_chunk_load__: "function",
	__webpack_nonce__: "string"
};
exports.REPLACEMENT_TYPES = REPLACEMENT_TYPES;
module.exports = APIPlugin;
