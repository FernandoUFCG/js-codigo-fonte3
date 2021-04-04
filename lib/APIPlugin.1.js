/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const ConstDependency = require("./dependencies/ConstDependency");
const ParserHelpers = require("./ParserHelpers");
const NullFactory = require("./NullFactory");
const { REPLACEMENTS, NO_WEBPACK_REQUIRE, REPLACEMENT_TYPES } = require("./APIPlugin");

/* eslint-enable camelcase */
class APIPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"APIPlugin",
			(compilation, { normalModuleFactory }) => {
				compilation.dependencyFactories.set(ConstDependency, new NullFactory());
				compilation.dependencyTemplates.set(
					ConstDependency,
					new ConstDependency.Template()
				);

				const handler = parser => {
					Object.keys(REPLACEMENTS).forEach(key => {
						parser.hooks.expression
							.for(key)
							.tap(
								"APIPlugin",
								NO_WEBPACK_REQUIRE[key]
									? ParserHelpers.toConstantDependency(
										parser,
										REPLACEMENTS[key]
									)
									: ParserHelpers.toConstantDependencyWithWebpackRequire(
										parser,
										REPLACEMENTS[key]
									)
							);
						parser.hooks.evaluateTypeof
							.for(key)
							.tap(
								"APIPlugin",
								ParserHelpers.evaluateToString(REPLACEMENT_TYPES[key])
							);
					});
				};

				normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("APIPlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/dynamic")
					.tap("APIPlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/esm")
					.tap("APIPlugin", handler);
			}
		);
	}
}
exports.APIPlugin = APIPlugin;
