/*
 * (C) Copyright IBM Corp. 2012, 2016 All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = class DojoAMDMiscParserPlugin {

	apply(parser) {
		const context = Object.create(this, {parser: {value: parser}});
		parser.plugin("call cjsRequire", this.callRequire.bind(context));
		parser.plugin("expression module", this.expressionModule.bind(context));
}

	callRequire(expr) {
		return this.parser.applyPluginsBailResult("call require", expr);
	}

	expressionModule() {
		if (this.parser.state.module.isAMD) {
			return true;
		}
	}
};