// perm function
var perm = function (s) {
    var result = [];
    if (s.length <= 1) {
        return [s];
    } else {
        for (var i = 0; i < s.length; i++) {
            var c = s[i];
            var newStr = s.slice(0, i) + s.slice(i + 1, s.length);
            console.log('c', c, 'newStr', newStr)
            var l = perm(newStr);
            for (var j = 0; j < l.length; j++) {
                var tmp = c + l[j];
                result.push(tmp);
            }
        }
    }
    return result;
}; 

perm('abc');