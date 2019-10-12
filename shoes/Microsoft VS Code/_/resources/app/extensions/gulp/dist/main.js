!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t){e.exports=require("path")},function(e,t){e.exports=require("fs")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=r(0),n=r(1),s=r(3),i=r(4),a=r(5).loadMessageBundle(r(0).join(__dirname,"main.ts"));function l(e){return new Promise((t,r)=>{n.exists(e,e=>{t(e)})})}const u=["build","compile","watch"];function c(e){for(let t of u)if(-1!==e.indexOf(t))return!0;return!1}const d=["test"];function f(e){for(let t of d)if(-1!==e.indexOf(t))return!0;return!1}let p,g;function h(){return p||(p=i.window.createOutputChannel("Gulp Auto Detection")),p}function v(){i.window.showWarningMessage(a(0,null),a(1,null)).then(e=>{void 0!==e&&p.show(!0)})}async function m(e){let t,r=process.platform;if("win32"===r&&await l(o.join(e,"node_modules",".bin","gulp.cmd"))){const e=o.join(process.env.APPDATA?process.env.APPDATA:"","npm","gulp.cmd");t=await l(e)?'"'+e+'"':o.join(".","node_modules",".bin","gulp.cmd")}else t="linux"!==r&&"darwin"!==r||!await l(o.join(e,"node_modules",".bin","gulp"))?"gulp":o.join(".","node_modules",".bin","gulp");return t}class k{constructor(e,t){this._workspaceFolder=e,this._gulpCommand=t}get workspaceFolder(){return this._workspaceFolder}isEnabled(){return"on"===i.workspace.getConfiguration("gulp",this._workspaceFolder.uri).get("autoDetect")}start(){let e=o.join(this._workspaceFolder.uri.fsPath,"{node_modules,gulpfile{.babel.js,.js,.ts}}");this.fileWatcher=i.workspace.createFileSystemWatcher(e),this.fileWatcher.onDidChange(()=>this.promise=void 0),this.fileWatcher.onDidCreate(()=>this.promise=void 0),this.fileWatcher.onDidDelete(()=>this.promise=void 0)}async getTasks(){return this.isEnabled()?(this.promise||(this.promise=this.computeTasks()),this.promise):[]}async getTask(e){const t=e.definition.task;if(t){let r=e.definition,o={cwd:this.workspaceFolder.uri.fsPath};return new i.Task(r,this.workspaceFolder,t,"gulp",new i.ShellExecution(await this._gulpCommand,[t],o))}}async computeTasks(){let e="file"===this._workspaceFolder.uri.scheme?this._workspaceFolder.uri.fsPath:void 0,t=[];if(!e)return t;let r=o.join(e,"gulpfile.js");if(!await l(r)&&(r=o.join(e,"gulpfile.babel.js"),!await l(r)))return t;let n=`${await this._gulpCommand} --tasks-simple --no-color`;try{let{stdout:r,stderr:o}=await function(e,t){return new Promise((r,o)=>{s.exec(e,t,(e,t,n)=>{e&&o({error:e,stdout:t,stderr:n}),r({stdout:t,stderr:n})})})}(n,{cwd:e});if(o&&o.length>0){const e=o.split("\n");e.pop(),e.every(e=>e.indexOf("No license field")>=0)||(h().appendLine(o),v())}let l=[];if(r){let e=r.split(/\r{0,1}\n/);for(let t of e){if(0===t.length)continue;let e={type:"gulp",task:t},r={cwd:this.workspaceFolder.uri.fsPath},o=new i.Task(e,this.workspaceFolder,t,"gulp",new i.ShellExecution(await this._gulpCommand,[t],r));l.push(o);let n=t.toLowerCase();c(n)?o.group=i.TaskGroup.Build:f(n)&&(o.group=i.TaskGroup.Test)}}return l}catch(e){let r=h();return e.stderr&&r.appendLine(e.stderr),e.stdout&&r.appendLine(e.stdout),r.appendLine(a(2,null,this.workspaceFolder.name,e.error?e.error.toString():"unknown")),v(),t}}dispose(){this.promise=void 0,this.fileWatcher&&this.fileWatcher.dispose()}}class b{constructor(){this.detectors=new Map}start(){let e=i.workspace.workspaceFolders;e&&this.updateWorkspaceFolders(e,[]),i.workspace.onDidChangeWorkspaceFolders(e=>this.updateWorkspaceFolders(e.added,e.removed)),i.workspace.onDidChangeConfiguration(this.updateConfiguration,this)}dispose(){this.taskProvider&&(this.taskProvider.dispose(),this.taskProvider=void 0),this.detectors.clear()}updateWorkspaceFolders(e,t){for(let e of t){let t=this.detectors.get(e.uri.toString());t&&(t.dispose(),this.detectors.delete(e.uri.toString()))}for(let t of e){let e=new k(t,m(t.uri.fsPath));this.detectors.set(t.uri.toString(),e),e.isEnabled()&&e.start()}this.updateProvider()}updateConfiguration(){for(let e of this.detectors.values())e.dispose(),this.detectors.delete(e.workspaceFolder.uri.toString());let e=i.workspace.workspaceFolders;if(e)for(let t of e)if(!this.detectors.has(t.uri.toString())){let e=new k(t,m(t.uri.fsPath));this.detectors.set(t.uri.toString(),e),e.isEnabled()&&e.start()}this.updateProvider()}updateProvider(){if(!this.taskProvider&&this.detectors.size>0){const e=this;this.taskProvider=i.workspace.registerTaskProvider("gulp",{provideTasks:()=>e.getTasks(),resolveTask:t=>e.getTask(t)})}else this.taskProvider&&0===this.detectors.size&&(this.taskProvider.dispose(),this.taskProvider=void 0)}getTasks(){return this.computeTasks()}computeTasks(){if(0===this.detectors.size)return Promise.resolve([]);if(1===this.detectors.size)return this.detectors.values().next().value.getTasks();{let e=[];for(let t of this.detectors.values())e.push(t.getTasks().then(e=>e,()=>[]));return Promise.all(e).then(e=>{let t=[];for(let r of e)r&&r.length>0&&t.push(...r);return t})}}async getTask(e){if(0!==this.detectors.size){if(1===this.detectors.size)return this.detectors.values().next().value.getTask(e);if(e.scope!==i.TaskScope.Workspace&&e.scope!==i.TaskScope.Global&&e.scope){const t=this.detectors.get(e.scope.uri.toString());if(t)return t.getTask(e)}}}}t.activate=function(e){(g=new b).start()},t.deactivate=function(){g.dispose()}},function(e,t){e.exports=require("child_process")},function(e,t){e.exports=require("vscode")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,n,s,i,a,l=r(0),u=r(1),c=Object.prototype.toString;function d(e){return void 0!==e}function f(e){return"[object String]"===c.call(e)}function p(e){return JSON.parse(u.readFileSync(e,"utf8"))}function g(e,t){return a&&(e="［"+e.replace(/[aouei]/g,"$&$&")+"］"),0===t.length?e:e.replace(/\{(\d+)\}/g,function(e,r){var o=r[0],n=t[o],s=e;return"string"==typeof n?s=n:"number"!=typeof n&&"boolean"!=typeof n&&void 0!==n&&null!==n||(s=String(n)),s})}function h(e){return function(t,r){for(var o=[],n=2;n<arguments.length;n++)o[n-2]=arguments[n];return function(e){return"[object Number]"===c.call(e)}(t)?t>=e.length?void console.error("Broken localize call found. Index out of bounds. Stacktrace is\n: "+new Error("").stack):g(e[t],o):f(r)?(console.warn("Message "+r+" didn't get externalized correctly."),g(r,o)):void console.error("Broken localize call found. Stacktrace is\n: "+new Error("").stack)}}function v(e,t){for(var r=[],o=2;o<arguments.length;o++)r[o-2]=arguments[o];return g(t,r)}function m(e,t){return s[e]=t,t}function k(e,t){var r,o=l.join(i.cacheRoot,e.id+"-"+e.hash+".json"),n=!1,s=!1;try{return r=JSON.parse(u.readFileSync(o,{encoding:"utf8",flag:"r"})),function(e){var t=new Date;u.utimes(e,t,t,function(){})}(o),r}catch(e){if("ENOENT"===e.code)s=!0;else{if(!(e instanceof SyntaxError))throw e;console.log("Syntax error parsing message bundle: "+e.message+"."),u.unlink(o,function(e){e&&console.error("Deleting corrupted bundle "+o+" failed.")}),n=!0}}if(!(r=function(e,t){var r=i.translationsConfig[e.id];if(r){var o=p(r).contents,n=p(l.join(t,"nls.metadata.json")),s=Object.create(null);for(var a in n){var u=n[a],c=o[e.outDir+"/"+a];if(c){for(var d=[],g=0;g<u.keys.length;g++){var h=u.keys[g],v=c[f(h)?h:h.key];void 0===v&&(v=u.messages[g]),d.push(v)}s[a]=d}else s[a]=u.messages}return s}}(e,t))||n)return r;if(s)try{u.writeFileSync(o,JSON.stringify(r),{encoding:"utf8",flag:"wx"})}catch(e){if("EEXIST"===e.code)return r;throw e}return r}function b(e){try{return function(e){var t=p(l.join(e,"nls.metadata.json")),r=Object.create(null);for(var o in t){var n=t[o];r[o]=n.messages}return r}(e)}catch(e){return void console.log("Generating default bundle from meta data failed.",e)}}function w(e,t){var r;if(!0===i.languagePackSupport&&void 0!==i.cacheRoot&&void 0!==i.languagePackId&&void 0!==i.translationsConfigFile&&void 0!==i.translationsConfig)try{r=k(e,t)}catch(e){console.log("Load or create bundle failed ",e)}if(!r){if(i.languagePackSupport)return b(t);var o=function(e){for(var t=i.locale;t;){var r=l.join(e,"nls.bundle."+t+".json");if(u.existsSync(r))return r;var o=t.lastIndexOf("-");t=o>0?t.substring(0,o):void 0}if(void 0===t&&(r=l.join(e,"nls.bundle.json"),u.existsSync(r)))return r}(t);if(o)try{return p(o)}catch(e){console.log("Loading in the box message bundle failed.",e)}r=b(t)}return r}function y(e){if(!e)return v;var t=l.extname(e);if(t&&(e=e.substr(0,e.length-t.length)),i.messageFormat===o.both||i.messageFormat===o.bundle){var r=function(e){for(var t,r=l.dirname(e);t=l.join(r,"nls.metadata.header.json"),!u.existsSync(t);){var o=l.dirname(r);if(o===r){t=void 0;break}r=o}return t}(e);if(r){var n=l.dirname(r),c=s[n];if(void 0===c)try{var f=JSON.parse(u.readFileSync(r,"utf8"));try{var g=w(f,n);c=m(n,g?{header:f,nlsBundle:g}:null)}catch(e){console.error("Failed to load nls bundle",e),c=m(n,null)}}catch(e){console.error("Failed to read header file",e),c=m(n,null)}if(c){var k=e.substr(n.length+1).replace(/\\/g,"/"),b=c.nlsBundle[k];return void 0===b?(console.error("Messages for file "+e+" not found. See console for details."),function(){return"Messages not found."}):h(b)}}}if(i.messageFormat===o.both||i.messageFormat===o.file)try{var y=p(function(e){var t;if(i.cacheLanguageResolution&&t)t=t;else{if(a||!i.locale)t=".nls.json";else for(var r=i.locale;r;){var o=".nls."+r+".json";if(u.existsSync(e+o)){t=o;break}var n=r.lastIndexOf("-");n>0?r=r.substring(0,n):(t=".nls.json",r=null)}i.cacheLanguageResolution&&(t=t)}return e+t}(e));return Array.isArray(y)?h(y):d(y.messages)&&d(y.keys)?h(y.messages):(console.error("String bundle '"+e+"' uses an unsupported format."),function(){return"File bundle has unsupported format. See console for details"})}catch(e){"ENOENT"!==e.code&&console.error("Failed to load single file bundle",e)}return console.error("Failed to load message bundle for file "+e),function(){return"Failed to load message bundle. See console for details."}}!function(e){e.file="file",e.bundle="bundle",e.both="both"}(o=t.MessageFormat||(t.MessageFormat={})),function(e){e.is=function(e){var t=e;return t&&d(t.key)&&d(t.comment)}}(n||(n={})),function(){if(i={locale:void 0,languagePackSupport:!1,cacheLanguageResolution:!0,messageFormat:o.bundle},f(process.env.VSCODE_NLS_CONFIG))try{var e=JSON.parse(process.env.VSCODE_NLS_CONFIG);if(f(e.locale)&&(i.locale=e.locale.toLowerCase()),function(e){return!0===e||!1===e}(e._languagePackSupport)&&(i.languagePackSupport=e._languagePackSupport),f(e._cacheRoot)&&(i.cacheRoot=e._cacheRoot),f(e._languagePackId)&&(i.languagePackId=e._languagePackId),f(e._translationsConfigFile)){i.translationsConfigFile=e._translationsConfigFile;try{i.translationsConfig=p(i.translationsConfigFile)}catch(t){e._corruptedFile&&u.writeFile(e._corruptedFile,"corrupted","utf8",function(e){console.error(e)})}}}catch(e){}a="pseudo"===i.locale,void 0,s=Object.create(null)}(),t.loadMessageBundle=y,t.config=function(e){return e&&(f(e.locale)&&(i.locale=e.locale.toLowerCase(),void 0,s=Object.create(null)),void 0!==e.messageFormat&&(i.messageFormat=e.messageFormat)),a="pseudo"===i.locale,y}}]));
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/88f15d17dca836346e787762685a40bb5cce75a8/extensions/gulp/dist/main.js.map