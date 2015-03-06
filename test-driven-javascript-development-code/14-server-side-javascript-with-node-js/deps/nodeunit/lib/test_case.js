module.exports = function (suite, name, tests) {
    if (!tests || !name || !suite || typeof suite != "object") {
        throw new TypeError("suite, name or tests object not provided");
    }

    var setUp = tests.setUp;
    var tearDown = tests.tearDown;

    Object.keys(tests).forEach(function (testName) {
        if (/^(setUp|tearDown)$/.test(testName)) {
            return;
        }

        suite[name + " " + testName] = function (nodeUnit) {
            var testCtx = {};

            if (setUp) {
                setUp.call(testCtx);
            }

            if (tearDown) {
                var done = nodeUnit.done;

                nodeUnit.done = function () {
                    tearDown.call(testCtx);
                    done.call(nodeUnit);
                };
            }

            try {
                tests[testName].call(testCtx, nodeUnit);
            } catch (e) {
                if (tearDown) {
                    tearDown.call(testCtx);
                }

                throw e;
            }
        };
    });
};
