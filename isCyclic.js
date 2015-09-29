
/* 
 * Author: Tony Brix
 * License: MIT
 * Description: Check if an object is cyclic. Log the cyclic object and the path itself.
 */

//modified from http://blog.vjeux.com/2011/javascript/cyclic-object-detection.html
object.prototype.isCyclic = function () {
	var seenObjects = [];
	var loopStarter = null;
	var keyString = "";
	var loopFinished = false;
	function detect(obj) {
		if (obj && typeof obj === "object") {
			if (seenObjects.indexOf(obj) !== -1) {
				loopStarter = obj;
				return true;
			}
			seenObjects.push(obj);
			for (var key in obj) {
				if (obj.hasOwnProperty(key) && detect(obj[key])) {
					if (!loopFinished) {
						keyString = "." + key + keyString;
						if (loopStarter === obj) {
							loopFinished = true;
						}
					}
					return true;
				}
			}
			seenObjects.pop();
		}
		return false;
	}
	var cyclic = detect(this);
	if (cyclic) {
		console.log(loopStarter, keyString.substring(1));
	}
	return cyclic;
}
