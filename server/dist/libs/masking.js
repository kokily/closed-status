"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var masking = function (name) {
    if (name.length > 2) {
        var originalName_1 = name.split('');
        originalName_1.forEach(function (name, i) {
            if (i === 0 || i === originalName_1.length - 1)
                return;
            originalName_1[i] = '*';
        });
        var combineName = originalName_1.join();
        return combineName.replace(/,/g, '');
    }
    else {
        return name.replace(/.$/, '*');
    }
};
exports.default = masking;
