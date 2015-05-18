!function(definition){if("function"==typeof bootstrap)bootstrap("promise",definition);else if("object"==typeof exports)module.exports=definition();else if("function"==typeof define&&define.amd)define(definition);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeQ=definition}else Q=definition()}(function(){"use strict";function uncurryThis(f){return function(){return call.apply(f,arguments)}}function isObject(value){return value===Object(value)}function isStopIteration(exception){return"[object StopIteration]"===object_toString(exception)||exception instanceof QReturnValue}function makeStackTraceLong(error,promise){if(hasStacks&&promise.stack&&"object"==typeof error&&null!==error&&error.stack&&-1===error.stack.indexOf(STACK_JUMP_SEPARATOR)){var stacks=[];for(var p=promise;p;p=p.source)p.stack&&stacks.unshift(p.stack);stacks.unshift(error.stack);var concatedStacks=stacks.join("\n"+STACK_JUMP_SEPARATOR+"\n");error.stack=filterStackString(concatedStacks)}}function filterStackString(stackString){var lines=stackString.split("\n");var desiredLines=[];for(var i=0;i<lines.length;++i){var line=lines[i];isInternalFrame(line)||isNodeFrame(line)||!line||desiredLines.push(line)}return desiredLines.join("\n")}function isNodeFrame(stackLine){return-1!==stackLine.indexOf("(module.js:")||-1!==stackLine.indexOf("(node.js:")}function getFileNameAndLineNumber(stackLine){var attempt1=/at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);if(attempt1)return[attempt1[1],Number(attempt1[2])];var attempt2=/at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);if(attempt2)return[attempt2[1],Number(attempt2[2])];var attempt3=/.*@(.+):(\d+)$/.exec(stackLine);return attempt3?[attempt3[1],Number(attempt3[2])]:void 0}function isInternalFrame(stackLine){var fileNameAndLineNumber=getFileNameAndLineNumber(stackLine);if(!fileNameAndLineNumber)return!1;var fileName=fileNameAndLineNumber[0];var lineNumber=fileNameAndLineNumber[1];return fileName===qFileName&&lineNumber>=qStartingLine&&qEndingLine>=lineNumber}function captureLine(){if(hasStacks)try{throw new Error}catch(e){var lines=e.stack.split("\n");var firstLine=lines[0].indexOf("@")>0?lines[1]:lines[2];var fileNameAndLineNumber=getFileNameAndLineNumber(firstLine);if(!fileNameAndLineNumber)return;return qFileName=fileNameAndLineNumber[0],fileNameAndLineNumber[1]}}function deprecate(callback,name,alternative){return function(){return"undefined"!=typeof console&&"function"==typeof console.warn&&console.warn(name+" is deprecated, use "+alternative+" instead.",new Error("").stack),callback.apply(callback,arguments)}}function Q(value){return isPromise(value)?value:isPromiseAlike(value)?coerce(value):fulfill(value)}function defer(){function become(newPromise){resolvedPromise=newPromise,promise.source=newPromise,array_reduce(messages,function(undefined,message){nextTick(function(){newPromise.promiseDispatch.apply(newPromise,message)})},void 0),messages=void 0,progressListeners=void 0}var messages=[],progressListeners=[],resolvedPromise;var deferred=object_create(defer.prototype);var promise=object_create(Promise.prototype);if(promise.promiseDispatch=function(resolve,op,operands){var args=array_slice(arguments);messages?(messages.push(args),"when"===op&&operands[1]&&progressListeners.push(operands[1])):nextTick(function(){resolvedPromise.promiseDispatch.apply(resolvedPromise,args)})},promise.valueOf=function(){if(messages)return promise;var nearerValue=nearer(resolvedPromise);return isPromise(nearerValue)&&(resolvedPromise=nearerValue),nearerValue},promise.inspect=function(){return resolvedPromise?resolvedPromise.inspect():{state:"pending"}},Q.longStackSupport&&hasStacks)try{throw new Error}catch(e){promise.stack=e.stack.substring(e.stack.indexOf("\n")+1)}return deferred.promise=promise,deferred.resolve=function(value){resolvedPromise||become(Q(value))},deferred.fulfill=function(value){resolvedPromise||become(fulfill(value))},deferred.reject=function(reason){resolvedPromise||become(reject(reason))},deferred.notify=function(progress){resolvedPromise||array_reduce(progressListeners,function(undefined,progressListener){nextTick(function(){progressListener(progress)})},void 0)},deferred}function promise(resolver){if("function"!=typeof resolver)throw new TypeError("resolver must be a function.");var deferred=defer();try{resolver(deferred.resolve,deferred.reject,deferred.notify)}catch(reason){deferred.reject(reason)}return deferred.promise}function race(answerPs){return promise(function(resolve,reject){for(var i=0,len=answerPs.length;len>i;i++)Q(answerPs[i]).then(resolve,reject)})}function Promise(descriptor,fallback,inspect){void 0===fallback&&(fallback=function(op){return reject(new Error("Promise does not support operation: "+op))}),void 0===inspect&&(inspect=function(){return{state:"unknown"}});var promise=object_create(Promise.prototype);if(promise.promiseDispatch=function(resolve,op,args){var result;try{result=descriptor[op]?descriptor[op].apply(promise,args):fallback.call(promise,op,args)}catch(exception){result=reject(exception)}resolve&&resolve(result)},promise.inspect=inspect,inspect){var inspected=inspect();"rejected"===inspected.state&&(promise.exception=inspected.reason),promise.valueOf=function(){var inspected=inspect();return"pending"===inspected.state||"rejected"===inspected.state?promise:inspected.value}}return promise}function when(value,fulfilled,rejected,progressed){return Q(value).then(fulfilled,rejected,progressed)}function nearer(value){if(isPromise(value)){var inspected=value.inspect();if("fulfilled"===inspected.state)return inspected.value}return value}function isPromise(object){return isObject(object)&&"function"==typeof object.promiseDispatch&&"function"==typeof object.inspect}function isPromiseAlike(object){return isObject(object)&&"function"==typeof object.then}function isPending(object){return isPromise(object)&&"pending"===object.inspect().state}function isFulfilled(object){return!isPromise(object)||"fulfilled"===object.inspect().state}function isRejected(object){return isPromise(object)&&"rejected"===object.inspect().state}function resetUnhandledRejections(){unhandledReasons.length=0,unhandledRejections.length=0,trackUnhandledRejections||(trackUnhandledRejections=!0)}function trackRejection(promise,reason){trackUnhandledRejections&&(unhandledRejections.push(promise),unhandledReasons.push(reason&&"undefined"!=typeof reason.stack?reason.stack:"(no stack) "+reason))}function untrackRejection(promise){if(trackUnhandledRejections){var at=array_indexOf(unhandledRejections,promise);-1!==at&&(unhandledRejections.splice(at,1),unhandledReasons.splice(at,1))}}function reject(reason){var rejection=Promise({when:function(rejected){return rejected&&untrackRejection(this),rejected?rejected(reason):this}},function fallback(){return this},function inspect(){return{state:"rejected",reason:reason}});return trackRejection(rejection,reason),rejection}function fulfill(value){return Promise({when:function(){return value},get:function(name){return value[name]},set:function(name,rhs){value[name]=rhs},"delete":function(name){delete value[name]},post:function(name,args){return null===name||void 0===name?value.apply(void 0,args):value[name].apply(value,args)},apply:function(thisp,args){return value.apply(thisp,args)},keys:function(){return object_keys(value)}},void 0,function inspect(){return{state:"fulfilled",value:value}})}function coerce(promise){var deferred=defer();return nextTick(function(){try{promise.then(deferred.resolve,deferred.reject,deferred.notify)}catch(exception){deferred.reject(exception)}}),deferred.promise}function master(object){return Promise({isDef:function(){}},function fallback(op,args){return dispatch(object,op,args)},function(){return Q(object).inspect()})}function spread(value,fulfilled,rejected){return Q(value).spread(fulfilled,rejected)}function async(makeGenerator){return function(){function continuer(verb,arg){var result;if("undefined"==typeof StopIteration){try{result=generator[verb](arg)}catch(exception){return reject(exception)}return result.done?result.value:when(result.value,callback,errback)}try{result=generator[verb](arg)}catch(exception){return isStopIteration(exception)?exception.value:reject(exception)}return when(result,callback,errback)}var generator=makeGenerator.apply(this,arguments);var callback=continuer.bind(continuer,"next");var errback=continuer.bind(continuer,"throw");return callback()}}function spawn(makeGenerator){Q.done(Q.async(makeGenerator)())}function _return(value){throw new QReturnValue(value)}function promised(callback){return function(){return spread([this,all(arguments)],function(self,args){return callback.apply(self,args)})}}function dispatch(object,op,args){return Q(object).dispatch(op,args)}function all(promises){return when(promises,function(promises){var countDown=0;var deferred=defer();return array_reduce(promises,function(undefined,promise,index){var snapshot;isPromise(promise)&&"fulfilled"===(snapshot=promise.inspect()).state?promises[index]=snapshot.value:(++countDown,when(promise,function(value){promises[index]=value,0===--countDown&&deferred.resolve(promises)},deferred.reject,function(progress){deferred.notify({index:index,value:progress})}))},void 0),0===countDown&&deferred.resolve(promises),deferred.promise})}function allResolved(promises){return when(promises,function(promises){return promises=array_map(promises,Q),when(all(array_map(promises,function(promise){return when(promise,noop,noop)})),function(){return promises})})}function allSettled(promises){return Q(promises).allSettled()}function progress(object,progressed){return Q(object).then(void 0,void 0,progressed)}function nodeify(object,nodeback){return Q(object).nodeify(nodeback)}var hasStacks=!1;try{throw new Error}catch(e){hasStacks=!!e.stack}var qStartingLine=captureLine();var qFileName;var noop=function(){};var nextTick=function(){function flush(){for(;head.next;){head=head.next;var task=head.task;head.task=void 0;var domain=head.domain;domain&&(head.domain=void 0,domain.enter());try{task()}catch(e){if(isNodeJS)throw domain&&domain.exit(),setTimeout(flush,0),domain&&domain.enter(),e;setTimeout(function(){throw e},0)}domain&&domain.exit()}flushing=!1}var head={task:void 0,next:null};var tail=head;var flushing=!1;var requestTick=void 0;var isNodeJS=!1;if(nextTick=function(task){tail=tail.next={task:task,domain:isNodeJS&&process.domain,next:null},flushing||(flushing=!0,requestTick())},"undefined"!=typeof process&&process.nextTick)isNodeJS=!0,requestTick=function(){process.nextTick(flush)};else if("function"==typeof setImmediate)requestTick="undefined"!=typeof window?setImmediate.bind(window,flush):function(){setImmediate(flush)};else if("undefined"!=typeof MessageChannel){var channel=new MessageChannel;channel.port1.onmessage=function(){requestTick=requestPortTick,channel.port1.onmessage=flush,flush()};var requestPortTick=function(){channel.port2.postMessage(0)};requestTick=function(){setTimeout(flush,0),requestPortTick()}}else requestTick=function(){setTimeout(flush,0)};return nextTick}();var call=Function.call;var array_slice=uncurryThis(Array.prototype.slice);var array_reduce=uncurryThis(Array.prototype.reduce||function(callback,basis){var index=0,length=this.length;if(1===arguments.length)for(;;){if(index in this){basis=this[index++];break}if(++index>=length)throw new TypeError}for(;length>index;index++)index in this&&(basis=callback(basis,this[index],index));return basis});var array_indexOf=uncurryThis(Array.prototype.indexOf||function(value){for(var i=0;i<this.length;i++)if(this[i]===value)return i;return-1});var array_map=uncurryThis(Array.prototype.map||function(callback,thisp){var self=this;var collect=[];return array_reduce(self,function(undefined,value,index){collect.push(callback.call(thisp,value,index,self))},void 0),collect});var object_create=Object.create||function(prototype){function Type(){}return Type.prototype=prototype,new Type};var object_hasOwnProperty=uncurryThis(Object.prototype.hasOwnProperty);var object_keys=Object.keys||function(object){var keys=[];for(var key in object)object_hasOwnProperty(object,key)&&keys.push(key);return keys};var object_toString=uncurryThis(Object.prototype.toString);var QReturnValue;QReturnValue="undefined"!=typeof ReturnValue?ReturnValue:function(value){this.value=value};var STACK_JUMP_SEPARATOR="From previous event:";Q.resolve=Q,Q.nextTick=nextTick,Q.longStackSupport=!1,Q.defer=defer,defer.prototype.makeNodeResolver=function(){var self=this;return function(error,value){error?self.reject(error):self.resolve(arguments.length>2?array_slice(arguments,1):value)}},Q.Promise=promise,Q.promise=promise,promise.race=race,promise.all=all,promise.reject=reject,promise.resolve=Q,Q.passByCopy=function(object){return object},Promise.prototype.passByCopy=function(){return this},Q.join=function(x,y){return Q(x).join(y)},Promise.prototype.join=function(that){return Q([this,that]).spread(function(x,y){if(x===y)return x;throw new Error("Can't join: not the same: "+x+" "+y)})},Q.race=race,Promise.prototype.race=function(){return this.then(Q.race)},Q.makePromise=Promise,Promise.prototype.toString=function(){return"[object Promise]"},Promise.prototype.then=function(fulfilled,rejected,progressed){function _fulfilled(value){try{return"function"==typeof fulfilled?fulfilled(value):value}catch(exception){return reject(exception)}}function _rejected(exception){if("function"==typeof rejected){makeStackTraceLong(exception,self);try{return rejected(exception)}catch(newException){return reject(newException)}}return reject(exception)}function _progressed(value){return"function"==typeof progressed?progressed(value):value}var self=this;var deferred=defer();var done=!1;return nextTick(function(){self.promiseDispatch(function(value){done||(done=!0,deferred.resolve(_fulfilled(value)))},"when",[function(exception){done||(done=!0,deferred.resolve(_rejected(exception)))}])}),self.promiseDispatch(void 0,"when",[void 0,function(value){var newValue;var threw=!1;try{newValue=_progressed(value)}catch(e){if(threw=!0,!Q.onerror)throw e;Q.onerror(e)}threw||deferred.notify(newValue)}]),deferred.promise},Q.when=when,Promise.prototype.thenResolve=function(value){return this.then(function(){return value})},Q.thenResolve=function(promise,value){return Q(promise).thenResolve(value)},Promise.prototype.thenReject=function(reason){return this.then(function(){throw reason})},Q.thenReject=function(promise,reason){return Q(promise).thenReject(reason)},Q.nearer=nearer,Q.isPromise=isPromise,Q.isPromiseAlike=isPromiseAlike,Q.isPending=isPending,Promise.prototype.isPending=function(){return"pending"===this.inspect().state},Q.isFulfilled=isFulfilled,Promise.prototype.isFulfilled=function(){return"fulfilled"===this.inspect().state},Q.isRejected=isRejected,Promise.prototype.isRejected=function(){return"rejected"===this.inspect().state};var unhandledReasons=[];var unhandledRejections=[];var trackUnhandledRejections=!0;Q.resetUnhandledRejections=resetUnhandledRejections,Q.getUnhandledReasons=function(){return unhandledReasons.slice()},Q.stopUnhandledRejectionTracking=function(){resetUnhandledRejections(),trackUnhandledRejections=!1},resetUnhandledRejections(),Q.reject=reject,Q.fulfill=fulfill,Q.master=master,Q.spread=spread,Promise.prototype.spread=function(fulfilled,rejected){return this.all().then(function(array){return fulfilled.apply(void 0,array)},rejected)},Q.async=async,Q.spawn=spawn,Q["return"]=_return,Q.promised=promised,Q.dispatch=dispatch,Promise.prototype.dispatch=function(op,args){var self=this;var deferred=defer();return nextTick(function(){self.promiseDispatch(deferred.resolve,op,args)}),deferred.promise},Q.get=function(object,key){return Q(object).dispatch("get",[key])},Promise.prototype.get=function(key){return this.dispatch("get",[key])},Q.set=function(object,key,value){return Q(object).dispatch("set",[key,value])},Promise.prototype.set=function(key,value){return this.dispatch("set",[key,value])},Q.del=Q["delete"]=function(object,key){return Q(object).dispatch("delete",[key])},Promise.prototype.del=Promise.prototype["delete"]=function(key){return this.dispatch("delete",[key])},Q.mapply=Q.post=function(object,name,args){return Q(object).dispatch("post",[name,args])},Promise.prototype.mapply=Promise.prototype.post=function(name,args){return this.dispatch("post",[name,args])},Q.send=Q.mcall=Q.invoke=function(object,name){return Q(object).dispatch("post",[name,array_slice(arguments,2)])},Promise.prototype.send=Promise.prototype.mcall=Promise.prototype.invoke=function(name){return this.dispatch("post",[name,array_slice(arguments,1)])},Q.fapply=function(object,args){return Q(object).dispatch("apply",[void 0,args])},Promise.prototype.fapply=function(args){return this.dispatch("apply",[void 0,args])},Q["try"]=Q.fcall=function(object){return Q(object).dispatch("apply",[void 0,array_slice(arguments,1)])},Promise.prototype.fcall=function(){return this.dispatch("apply",[void 0,array_slice(arguments)])},Q.fbind=function(object){var promise=Q(object);var args=array_slice(arguments,1);return function fbound(){return promise.dispatch("apply",[this,args.concat(array_slice(arguments))])}},Promise.prototype.fbind=function(){var promise=this;var args=array_slice(arguments);return function fbound(){return promise.dispatch("apply",[this,args.concat(array_slice(arguments))])}},Q.keys=function(object){return Q(object).dispatch("keys",[])},Promise.prototype.keys=function(){return this.dispatch("keys",[])},Q.all=all,Promise.prototype.all=function(){return all(this)},Q.allResolved=deprecate(allResolved,"allResolved","allSettled"),Promise.prototype.allResolved=function(){return allResolved(this)},Q.allSettled=allSettled,Promise.prototype.allSettled=function(){return this.then(function(promises){return all(array_map(promises,function(promise){function regardless(){return promise.inspect()}return promise=Q(promise),promise.then(regardless,regardless)}))})},Q.fail=Q["catch"]=function(object,rejected){return Q(object).then(void 0,rejected)},Promise.prototype.fail=Promise.prototype["catch"]=function(rejected){return this.then(void 0,rejected)},Q.progress=progress,Promise.prototype.progress=function(progressed){return this.then(void 0,void 0,progressed)},Q.fin=Q["finally"]=function(object,callback){return Q(object)["finally"](callback)},Promise.prototype.fin=Promise.prototype["finally"]=function(callback){return callback=Q(callback),this.then(function(value){return callback.fcall().then(function(){return value})},function(reason){return callback.fcall().then(function(){throw reason})})},Q.done=function(object,fulfilled,rejected,progress){return Q(object).done(fulfilled,rejected,progress)},Promise.prototype.done=function(fulfilled,rejected,progress){var onUnhandledError=function(error){nextTick(function(){if(makeStackTraceLong(error,promise),!Q.onerror)throw error;Q.onerror(error)})};var promise=fulfilled||rejected||progress?this.then(fulfilled,rejected,progress):this;"object"==typeof process&&process&&process.domain&&(onUnhandledError=process.domain.bind(onUnhandledError)),promise.then(void 0,onUnhandledError)},Q.timeout=function(object,ms,message){return Q(object).timeout(ms,message)},Promise.prototype.timeout=function(ms,message){var deferred=defer();var timeoutId=setTimeout(function(){deferred.reject(new Error(message||"Timed out after "+ms+" ms"))},ms);return this.then(function(value){clearTimeout(timeoutId),deferred.resolve(value)},function(exception){clearTimeout(timeoutId),deferred.reject(exception)},deferred.notify),deferred.promise},Q.delay=function(object,timeout){return void 0===timeout&&(timeout=object,object=void 0),Q(object).delay(timeout)},Promise.prototype.delay=function(timeout){return this.then(function(value){var deferred=defer();return setTimeout(function(){deferred.resolve(value)},timeout),deferred.promise})},Q.nfapply=function(callback,args){return Q(callback).nfapply(args)},Promise.prototype.nfapply=function(args){var deferred=defer();var nodeArgs=array_slice(args);return nodeArgs.push(deferred.makeNodeResolver()),this.fapply(nodeArgs).fail(deferred.reject),deferred.promise},Q.nfcall=function(callback){var args=array_slice(arguments,1);return Q(callback).nfapply(args)},Promise.prototype.nfcall=function(){var nodeArgs=array_slice(arguments);var deferred=defer();return nodeArgs.push(deferred.makeNodeResolver()),this.fapply(nodeArgs).fail(deferred.reject),deferred.promise},Q.nfbind=Q.denodeify=function(callback){var baseArgs=array_slice(arguments,1);return function(){var nodeArgs=baseArgs.concat(array_slice(arguments));var deferred=defer();return nodeArgs.push(deferred.makeNodeResolver()),Q(callback).fapply(nodeArgs).fail(deferred.reject),deferred.promise}},Promise.prototype.nfbind=Promise.prototype.denodeify=function(){var args=array_slice(arguments);return args.unshift(this),Q.denodeify.apply(void 0,args)},Q.nbind=function(callback,thisp){var baseArgs=array_slice(arguments,2);return function(){function bound(){return callback.apply(thisp,arguments)}var nodeArgs=baseArgs.concat(array_slice(arguments));var deferred=defer();return nodeArgs.push(deferred.makeNodeResolver()),Q(bound).fapply(nodeArgs).fail(deferred.reject),deferred.promise}},Promise.prototype.nbind=function(){var args=array_slice(arguments,0);return args.unshift(this),Q.nbind.apply(void 0,args)},Q.nmapply=Q.npost=function(object,name,args){return Q(object).npost(name,args)},Promise.prototype.nmapply=Promise.prototype.npost=function(name,args){var nodeArgs=array_slice(args||[]);var deferred=defer();return nodeArgs.push(deferred.makeNodeResolver()),this.dispatch("post",[name,nodeArgs]).fail(deferred.reject),deferred.promise},Q.nsend=Q.nmcall=Q.ninvoke=function(object,name){var nodeArgs=array_slice(arguments,2);var deferred=defer();return nodeArgs.push(deferred.makeNodeResolver()),Q(object).dispatch("post",[name,nodeArgs]).fail(deferred.reject),deferred.promise},Promise.prototype.nsend=Promise.prototype.nmcall=Promise.prototype.ninvoke=function(name){var nodeArgs=array_slice(arguments,1);var deferred=defer();return nodeArgs.push(deferred.makeNodeResolver()),this.dispatch("post",[name,nodeArgs]).fail(deferred.reject),deferred.promise},Q.nodeify=nodeify,Promise.prototype.nodeify=function(nodeback){return nodeback?void this.then(function(value){nextTick(function(){nodeback(null,value)})},function(error){nextTick(function(){nodeback(error)})}):this};var qEndingLine=captureLine();return Q}),!function(){"use strict";var a=function(a,b){var c=0,d=0,e=0,f=0,g=0,h=a.length-1,i=new Array(b);for(c=0;h>c;c++){for(f=c,d=c+1;h>d;d++)Math.abs(a[c][d])>Math.abs(a[c][f])&&(f=d);for(e=c;h+1>e;e++)g=a[e][c],a[e][c]=a[e][f],a[e][f]=g;for(d=c+1;h>d;d++)for(e=h;e>=c;e--)a[e][d]-=a[e][c]*a[c][d]/a[c][c]}for(d=h-1;d>=0;d--){for(g=0,e=d+1;h>e;e++)g+=a[e][d]*i[e];i[d]=(a[h][d]-g)/a[d][d]}return i},b={linear:function(a){for(var b=[0,0,0,0,0],c=0,d=[];c<a.length;c++)null!=a[c][1]&&(b[0]+=a[c][0],b[1]+=a[c][1],b[2]+=a[c][0]*a[c][0],b[3]+=a[c][0]*a[c][1],b[4]+=a[c][1]*a[c][1]);for(var e=(c*b[3]-b[0]*b[1])/(c*b[2]-b[0]*b[0]),f=b[1]/c-e*b[0]/c,g=0,h=a.length;h>g;g++){var i=[a[g][0],a[g][0]*e+f];d.push(i)}var j="y = "+Math.round(100*e)/100+"x + "+Math.round(100*f)/100;return{equation:[e,f],points:d,string:j}},linearThroughOrigin:function(a){for(var b=[0,0],c=0,d=[];c<a.length;c++)null!=a[c][1]&&(b[0]+=a[c][0]*a[c][0],b[1]+=a[c][0]*a[c][1]);for(var e=b[1]/b[0],f=0,g=a.length;g>f;f++){var h=[a[f][0],a[f][0]*e];d.push(h)}var i="y = "+Math.round(100*e)/100+"x";return{equation:[e],points:d,string:i}},exponential:function(a){var b=[0,0,0,0,0,0],c=0,d=[];for(i=a.length;i>c;c++)null!=a[c][1]&&(b[0]+=a[c][0],b[1]+=a[c][1],b[2]+=a[c][0]*a[c][0]*a[c][1],b[3]+=a[c][1]*Math.log(a[c][1]),b[4]+=a[c][0]*a[c][1]*Math.log(a[c][1]),b[5]+=a[c][0]*a[c][1]);for(var e=b[1]*b[2]-b[5]*b[5],f=Math.pow(Math.E,(b[2]*b[3]-b[5]*b[4])/e),g=(b[1]*b[4]-b[5]*b[3])/e,h=0,i=a.length;i>h;h++){var j=[a[h][0],f*Math.pow(Math.E,g*a[h][0])];d.push(j)}var k="y = "+Math.round(100*f)/100+"e^("+Math.round(100*g)/100+"x)";return{equation:[f,g],points:d,string:k}},logarithmic:function(a){var b=[0,0,0,0],c=0,d=[];for(h=a.length;h>c;c++)null!=a[c][1]&&(b[0]+=Math.log(a[c][0]),b[1]+=a[c][1]*Math.log(a[c][0]),b[2]+=a[c][1],b[3]+=Math.pow(Math.log(a[c][0]),2));for(var e=(c*b[1]-b[2]*b[0])/(c*b[3]-b[0]*b[0]),f=(b[2]-e*b[0])/c,g=0,h=a.length;h>g;g++){var i=[a[g][0],f+e*Math.log(a[g][0])];d.push(i)}var j="y = "+Math.round(100*f)/100+" + "+Math.round(100*e)/100+" ln(x)";return{equation:[f,e],points:d,string:j}},power:function(a){var b=[0,0,0,0],c=0,d=[];for(h=a.length;h>c;c++)null!=a[c][1]&&(b[0]+=Math.log(a[c][0]),b[1]+=Math.log(a[c][1])*Math.log(a[c][0]),b[2]+=Math.log(a[c][1]),b[3]+=Math.pow(Math.log(a[c][0]),2));for(var e=(c*b[1]-b[2]*b[0])/(c*b[3]-b[0]*b[0]),f=Math.pow(Math.E,(b[2]-e*b[0])/c),g=0,h=a.length;h>g;g++){var i=[a[g][0],f*Math.pow(a[g][0],e)];d.push(i)}var j="y = "+Math.round(100*f)/100+"x^"+Math.round(100*e)/100;return{equation:[f,e],points:d,string:j}},polynomial:function(b,c){"undefined"==typeof c&&(c=2);for(var d=[],e=[],f=[],g=0,h=0,i=0,j=c+1;j>i;i++){for(var k=0,l=b.length;l>k;k++)null!=b[k][1]&&(g+=Math.pow(b[k][0],i)*b[k][1]);d.push(g),g=0;for(var m=[],n=0;j>n;n++){for(var k=0,l=b.length;l>k;k++)null!=b[k][1]&&(h+=Math.pow(b[k][0],i+n));m.push(h),h=0}e.push(m)}e.push(d);for(var o=a(e,j),i=0,l=b.length;l>i;i++){for(var p=0,q=0;q<o.length;q++)p+=o[q]*Math.pow(b[i][0],q);f.push([b[i][0],p])}for(var r="y = ",i=o.length-1;i>=0;i--)r+=i>1?Math.round(o[i]*Math.pow(10,i))/Math.pow(10,i)+"x^"+i+" + ":1==i?Math.round(100*o[i])/100+"x + ":Math.round(100*o[i])/100;return{equation:o,points:f,string:r}},lastvalue:function(a){for(var b=[],c=null,d=0;d<a.length;d++)a[d][1]?(c=a[d][1],b.push([a[d][0],a[d][1]])):b.push([a[d][0],c]);return{equation:[c],points:b,string:""+c}}},c=function(a,c,d){return"string"==typeof a?b[a](c,d):void 0};"undefined"!=typeof exports?module.exports=c:window.regression=c}();var UXHand=new function(){this._synchronize=function(){var deferred=Q.defer();var localData=JSON.parse(localStorage.getItem("UXHandData"));return null==this._data.scores.left&&null==this._data.scores.right&&null==this._data.scores.both&&localData?(this._data=localData,deferred.resolve()):localStorage.setItem("UXHandData",JSON.stringify(this._data)),deferred.promise},this.compatibility=function(){try{return"localStorage"in window&&null!==window.localStorage}catch(e){return!1}},this.touchTest=function(){try{return document.createEvent("TouchEvent"),!0}catch(e){return!1}},this.options=function(){var userOptions=window.UXHandOptions;var output={certainty:.2,cycleDelay:2e4,destroyClasses:!0,destroyData:!0,root:document.body,threshold:50};if(userOptions)try{for(var key in userOptions)output[key]=userOptions[key]}catch(e){}return output},this.cycle=function(){try{this._calc()}catch(e){}finally{var _data=this._data;this._domClasses(_data),this._synchronize()}},this._setupListeners=function(){var rootElement=document.body;rootElement.addEventListener("touchstart",function(e){UXHand._events.touchstart(e)}),rootElement.addEventListener("touchend",function(e){UXHand._events.touchend(e)}),rootElement.addEventListener("touchmove",function(e){UXHand._events.touchmove(e)})},this._events={touchstart:function(e){var dataObj=e.originalEvent;dataObj||(dataObj=e),UXHand._last.start=dataObj},touchend:function(e){var dataObj=e.originalEvent;dataObj||(dataObj=e),UXHand._last.end=dataObj.changedTouches,UXHand.cycle()},touchmove:function(e){UXHand._last.moved=!0,UXHand._last.drag.push(e)}},this._calc=function(){if(this._last){var _last=this._last;var output=[];var vectors=[{y:_last.start.touches[0].clientY,x:_last.start.touches[0].clientX},{y:_last.end[0].clientY,x:_last.end[0].clientX}];var drag=function(output){output.push(vectors[0].y>vectors[1].y?"up":vectors[0].y==vectors[1].y?"horizontal":"downw"),output.push(vectors[0].x<vectors[1].x?"right":vectors[0].x==vectors[1].x?"vertical":"left")};var tap=function(output){vectors[0].x<area.w?UXHand._data.scores.left++:vectors[0].x>area.w+area.x&&UXHand._data.scores.right++};var area=this.wireFrame.areas();if(_last.moved?(output.push("Move detected"),drag(output)):(output.push("Touch detected"),tap(output)),output.indexOf("vertical")>-1)vectors[0].x<area.w?this._data.scores.left++:vectors[0].x>area.w+area.x&&this._data.scores.right++;else{var measurePath={left:0,right:0};[].forEach.call(_last.drag,function(drag,index){var dragData=_last.drag[index].touches[0];var position={x:dragData.clientX,y:dragData.clientY};if(_last.drag[index+1]){var nextDragData=_last.drag[index+1].touches[0];var nextPosition={x:nextDragData.clientX,y:nextDragData.clientY};nextPosition.x>position.x&&nextPosition.y<position.y?measurePath.right++:nextPosition.x<position.x&&nextPosition.y<position.y?measurePath.left++:nextPosition.x>position.x&&nextPosition.y>position.y?measurePath.left++:nextPosition.x<position.x&&nextPosition.y>position.y&&measurePath.right++}}),measurePath.left>measurePath.right?UXHand._data.scores.left++:measurePath.right>measurePath.left&&UXHand._data.scores.right++}}},this._domClasses=function(_data){var update=function(value){var classes=value.split(",");var html=document.querySelector("html"),htmlCurrent=html.className.indexOf(" ")>-1?html.className.split(" "):[];var update=htmlCurrent;classes.forEach(function(name){update.push(name)}),html.className=update.join(" ")};var reset=function(){var html=document.querySelector("html"),htmlCurrent=html.className.split(" ");var inHouseClasses=["righthand","lefthand","bothhands"];inHouseClasses.forEach(function(inHouse){htmlCurrent.splice(inHouse,1)}),html.className=htmlCurrent};var count=_data.scores.left+_data.scores.right+_data.scores.both;if(document.getElementById("textfield")&&(document.getElementById("textfield").innerHTML=count),_data&&!(count<this.options().threshold)){_data.scores.left>_data.scores.right*(1+this.options().certainty)?(reset(),update("lefthand")):_data.scores.right>_data.scores.left*(1+this.options().certainty)&&(reset(),update("righthand"));var average=(_data.scores.right+_data.scores.left)/2;_data.scores.both>average&&update("bothhands")}},this.destroy=function(){localStorage.removeItem("UXHandData")},this.wireFrame=new function(){this.areas=function(){var gap=UXHand.options().certainty,x=screen.width*gap,w=screen.width/2-x/2;return{gap:gap,x:x,w:w}},this.errorGap=function(){var area=this.areas();return{x:[0,area.w+area.x]}},this.render=function(){var area=this.areas();var rendering=["<div ","style='","position:absolute;","top:0;","bottom:0;","left:",area.w,"px;","width:",area.x,"px;","background-color:rgba(0,0,0,0.2);","display:inline-block;","' />"];$("body").prepend(rendering.join("")),rendering=["<div class='lefthand'","style='","position:absolute;","bottom:0;","left:0;","width:",area.w,"px;","height:",.575*screen.height,"px;","background-color:#3F51B5;opacity:1;","' />"],$("body").prepend(rendering.join("")),rendering=["<div class='righthand'","style='","position:absolute;","bottom:0;","right:0;","width:",area.w,"px;","height:",.575*screen.height,"px;","background-color:#3F51B5;opacity:1;","' />"],$("body").prepend(rendering.join(""))}},this.version="0.2.2",this.init=function(){this.compatibility()&&this.touchTest()&&(this._synchronize().then(function(){UXHand._setupListeners(),UXHand.cycle()}),this.wireFrame.render())},this._data={scores:{left:null,right:null,both:null}},this._last={start:null,end:null,drag:[],moved:!1}};UXHand.init();