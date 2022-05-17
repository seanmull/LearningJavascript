var _ = require('lodash')

_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 });

_.join(['a', 'b', 'c'], '~');
