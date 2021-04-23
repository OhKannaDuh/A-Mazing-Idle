(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function PriorityQ(comp) {
    if (!comp || comp.length !== 2) {
        throw 'a valid comparator function required';
    }
    this.comp = comp;
    this.items = [];
}

PriorityQ.prototype.push = function (item) {
    for (var i = 0; i < this.items.length; i++) {
        if (this.comp(item, this.items[i])) {
            this.items.splice(i, 0, item);
            return;
        }
    }
    this.items[i] = item;
};

PriorityQ.prototype.pop = function () {
    return this.items.shift();
};

PriorityQ.prototype.peek = function () {
    return this.items[0];
};

PriorityQ.prototype.size = function () {
    return this.items.length;
};

PriorityQ.prototype.clear = function () {
    this.items = [];
};

PriorityQ.prototype.isEmpty = function () {
    return this.items.length === 0;
};

module.exports.PriorityQ = PriorityQ;


},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMazeAlgorithmTypeByBiome = exports.getMazeGridByBiome = exports.BIOME_UPGRADE_UNLOCKS = exports.BIOME_ITEM_UNLOCKS = exports.POWER_UP_UNLOCKS = exports.getBiomeColorPalette = exports.getBiomeUpgradeCost = exports.getPointsPerVisitBaseAmount = exports.getFruitItemByBiomeKey = undefined;

var _ColorConstants = require("./ColorConstants");

var _ItemConstants = require("./ItemConstants");

var _UpgradeConstants = require("./UpgradeConstants");

var _FruitConstants = require("./FruitConstants");

var _MazeUtils = require("../managers/MazeUtils");

var _PowerUpConstants = require("./PowerUpConstants");

var getFruitItemByBiomeKey = exports.getFruitItemByBiomeKey = function getFruitItemByBiomeKey(biomeKey) {
    if (biomeKey >= 0 && biomeKey < 5) {
        return _FruitConstants.FRUIT_TIER_1;
    } else if (biomeKey >= 5 && biomeKey < 10) {
        return _FruitConstants.FRUIT_TIER_2;
    } else if (biomeKey >= 10 && biomeKey < 15) {
        return _FruitConstants.FRUIT_TIER_3;
    } else if (biomeKey >= 15 && biomeKey < 20) {
        return _FruitConstants.FRUIT_TIER_4;
    } else if (biomeKey >= 20) {
        return _FruitConstants.FRUIT_TIER_5;
    }
    console.error("Invalid fruit item for biome tier: " + biomeKey);
};
var getPointsPerVisitBaseAmount = exports.getPointsPerVisitBaseAmount = function getPointsPerVisitBaseAmount(biomeKey) {
    return 1 + .25 * biomeKey;
};
var getBiomeUpgradeCost = exports.getBiomeUpgradeCost = function getBiomeUpgradeCost(biomeKey) {
    if (biomeKey < _UpgradeConstants.BIOME_UPGRADE_COST_ARR.length) {
        return _UpgradeConstants.BIOME_UPGRADE_COST_ARR[biomeKey];
    }
    var lastBiomeUpgradeCost = _UpgradeConstants.BIOME_UPGRADE_COST_ARR[_UpgradeConstants.BIOME_UPGRADE_COST_ARR.length - 1];
    return lastBiomeUpgradeCost * Math.pow(_UpgradeConstants.BIOME_UPGRADE_BASE_MULTPLIER, biomeKey + 1 - _UpgradeConstants.BIOME_UPGRADE_COST_ARR.length);
};
var getBiomeColorPalette = exports.getBiomeColorPalette = function getBiomeColorPalette(biomeKey) {
    if (biomeKey >= 0) {
        return _ColorConstants.BIOME_0_COLOR_PALETTE;
    }
    return _ColorConstants.BIOME_0_COLOR_PALETTE;
};
var POWER_UP_UNLOCKS = exports.POWER_UP_UNLOCKS = new Map([[_PowerUpConstants.PowerUpKey.SPEED_UP, 7], [_PowerUpConstants.PowerUpKey.POINTS_MULTIPLIER, 10]]);
var BIOME_ITEM_UNLOCKS = exports.BIOME_ITEM_UNLOCKS = new Map([[_ItemConstants.MazeItemKey.FRUIT, 1], [_ItemConstants.MazeItemKey.MULTIPLIER, 2], [_ItemConstants.MazeItemKey.BRAIN, 7], [_ItemConstants.MazeItemKey.BLACK_HOLE, 12], [_ItemConstants.MazeItemKey.UNLIMITED_SPLITS, 14], [_ItemConstants.MazeItemKey.GHOST, 16]]);
var BIOME_UPGRADE_UNLOCKS = exports.BIOME_UPGRADE_UNLOCKS = new Map([[_UpgradeConstants.UpgradeKey.BIOME, 0], [_UpgradeConstants.UpgradeKey.AUTO_MOVE, 1], [_UpgradeConstants.UpgradeKey.POINTS_PER_VISIT, 1], [_UpgradeConstants.UpgradeKey.BOT_MOVEMENT_SPEED, 1], [_UpgradeConstants.UpgradeKey.PRIORITIZE_UNVISITED, 2], [_UpgradeConstants.UpgradeKey.MAZE_SIZE_UPGRADE, 2], [_UpgradeConstants.UpgradeKey.AVOID_REVISIT_LAST_POSITION, 3], [_UpgradeConstants.UpgradeKey.MAZE_COMPLETION_BONUS, 3], [_UpgradeConstants.UpgradeKey.AUTO_EXIT_MAZE, 4], [_UpgradeConstants.UpgradeKey.PLAYER_MOVE_INDEPENDENTLY, 4], [_UpgradeConstants.UpgradeKey.FRUIT_SPAWN, 5], [_UpgradeConstants.UpgradeKey.TELEPORT_BOT_BACK_TO_PLAYER, 5], [_UpgradeConstants.UpgradeKey.TELEPORT_PLAYER_BACK_TO_BOT, 5], [_UpgradeConstants.UpgradeKey.FRUIT_PICKUP_POINTS, 6], [_UpgradeConstants.UpgradeKey.BOT_SPLIT_DIRECTION, 6], [_UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES, 7], [_UpgradeConstants.UpgradeKey.BRAIN_SPAWN, 7], [_UpgradeConstants.UpgradeKey.SPEED_UP_ACTIVATE_DURATION, 8], [_UpgradeConstants.UpgradeKey.POINTS_PER_REVISIT, 9], [_UpgradeConstants.UpgradeKey.SPEED_UP_ACTIVATE_DURATION, 9], [_UpgradeConstants.UpgradeKey.BRAIN_TILE_DISTANCE, 10], [_UpgradeConstants.UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE, 10], [_UpgradeConstants.UpgradeKey.SPEED_UP_MULTIPLIER_STRENGTH, 11], [_UpgradeConstants.UpgradeKey.BOT_SMART_MERGE, 11], [_UpgradeConstants.UpgradeKey.MULTIPLIER_POWER_UP_ACTIVATE_DURATION, 11], [_UpgradeConstants.UpgradeKey.MULTIPLIER_POWER_UP_STRENGTH, 12], [_UpgradeConstants.UpgradeKey.BOT_LUCKY_GUESS, 13], [_UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALLS, 14]]);
var getMazeGridByBiome = exports.getMazeGridByBiome = function getMazeGridByBiome(biomeKey) {
    if (biomeKey >= 0 && biomeKey < 8) {
        return _MazeUtils.MazeGridType.SQUARE;
    } else if (biomeKey >= 8 && biomeKey < 12) {
        return _MazeUtils.MazeGridType.RECTANGLE;
    } else if (biomeKey >= 12 && biomeKey < 16) {
        return _MazeUtils.MazeGridType.PLUS_SIGN;
    } else if (biomeKey >= 16 && biomeKey < 20) {
        return _MazeUtils.MazeGridType.DIAMOND;
    } else {
        return getMazeGridByBiome(biomeKey % 20);
    }
};
var getMazeAlgorithmTypeByBiome = exports.getMazeAlgorithmTypeByBiome = function getMazeAlgorithmTypeByBiome(biomeKey) {
    if (biomeKey >= 0 && biomeKey < 5) {
        return _MazeUtils.MazeAlgorithmType.BACK_TRACKER;
    } else if (biomeKey >= 5 && biomeKey < 8) {
        return _MazeUtils.MazeAlgorithmType.BINARY_TREE;
    } else if (biomeKey >= 8 && biomeKey < 12) {
        return _MazeUtils.MazeAlgorithmType.PRIMS;
    } else {
        return getMazeAlgorithmTypeByBiome(biomeKey % 12);
    }
};

},{"../managers/MazeUtils":21,"./ColorConstants":3,"./FruitConstants":4,"./ItemConstants":5,"./PowerUpConstants":6,"./UpgradeConstants":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BIOME_1_COLOR_PALETTE = exports.BIOME_0_COLOR_PALETTE = exports.BIOME_1_COLORS = exports.BIOME_0_COLORS = exports.DEFAULT_COLORS = undefined;

var _BiomeColorPalette = require('../models/BiomeColorPalette');

var _BiomeColorPalette2 = _interopRequireDefault(_BiomeColorPalette);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_COLORS = exports.DEFAULT_COLORS = {
    PLAYER_COLOR: '#1EC438',
    RNG_BOT_COLOR: 'black',
    EMPTY_COLOR: 'white',
    VISITED_TILE_COLOR: '#7CFCFF',
    MAZE_WALL_COLOR: '#EEE',
    DEAD_END_COLOR: '#F13241',
    SMART_PATHING_PLAYER_COLOR: '#DBAED8',
    MULTIPLIER_ITEM_PLAYER_COLOR: '#E3E95C',
    UNLIMITED_SPLIT_BOT_PLAYER_COLOR: '#3E9BC7',
    GHOST_ITEM_PLAYER_COLOR: 'white'
};
var BIOME_0_COLORS = exports.BIOME_0_COLORS = {
    PLAYER_COLOR: '#ffde7d',
    RNG_BOT_COLOR: '#ff5722',
    EMPTY_COLOR: 'white',
    VISITED_TILE_COLOR: '#3fc1c9',
    MAZE_WALL_COLOR: '#f5f5f5',
    DEAD_END_COLOR: '#fc5185',
    SMART_PATHING_PLAYER_COLOR: '#DBAED8',
    MULTIPLIER_ITEM_PLAYER_COLOR: '#E3E95C',
    UNLIMITED_SPLIT_BOT_PLAYER_COLOR: '#3E9BC7',
    GHOST_ITEM_PLAYER_COLOR: 'white'
};
var BIOME_1_COLORS = exports.BIOME_1_COLORS = {
    PLAYER_COLOR: '#00b8a9',
    RNG_BOT_COLOR: '#2f5d62',
    EMPTY_COLOR: 'white',
    VISITED_TILE_COLOR: '#ffde7d',
    MAZE_WALL_COLOR: '#864000',
    DEAD_END_COLOR: '#fc5185',
    SMART_PATHING_PLAYER_COLOR: '#DBAED8',
    MULTIPLIER_ITEM_PLAYER_COLOR: '#E3E95C',
    UNLIMITED_SPLIT_BOT_PLAYER_COLOR: '#3E9BC7',
    GHOST_ITEM_PLAYER_COLOR: 'white'
};
var BIOME_0_COLOR_PALETTE = exports.BIOME_0_COLOR_PALETTE = new _BiomeColorPalette2.default(BIOME_0_COLORS.PLAYER_COLOR, BIOME_0_COLORS.RNG_BOT_COLOR, BIOME_0_COLORS.EMPTY_COLOR, BIOME_0_COLORS.VISITED_TILE_COLOR, BIOME_0_COLORS.MAZE_WALL_COLOR, BIOME_0_COLORS.DEAD_END_COLOR, BIOME_0_COLORS.SMART_PATHING_PLAYER_COLOR, BIOME_0_COLORS.MULTIPLIER_ITEM_PLAYER_COLOR, BIOME_0_COLORS.UNLIMITED_SPLIT_BOT_PLAYER_COLOR);
var BIOME_1_COLOR_PALETTE = exports.BIOME_1_COLOR_PALETTE = new _BiomeColorPalette2.default(DEFAULT_COLORS.PLAYER_COLOR, DEFAULT_COLORS.RNG_BOT_COLOR, DEFAULT_COLORS.EMPTY_COLOR, DEFAULT_COLORS.VISITED_TILE_COLOR, DEFAULT_COLORS.MAZE_WALL_COLOR, DEFAULT_COLORS.DEAD_END_COLOR, DEFAULT_COLORS.SMART_PATHING_PLAYER_COLOR, DEFAULT_COLORS.MULTIPLIER_ITEM_PLAYER_COLOR, DEFAULT_COLORS.UNLIMITED_SPLIT_BOT_PLAYER_COLOR);

},{"../models/BiomeColorPalette":38}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FRUIT_TIER_5 = exports.FRUIT_TIER_4 = exports.FRUIT_TIER_3 = exports.FRUIT_TIER_2 = exports.FRUIT_TIER_1 = undefined;

var _ItemConstants = require("./ItemConstants");

var FRUIT_TIER_1 = exports.FRUIT_TIER_1 = {
    fruitTier: 1,
    imageUrl: _ItemConstants.BANANA_IMAGE_URL
};
var FRUIT_TIER_2 = exports.FRUIT_TIER_2 = {
    fruitTier: 2,
    imageUrl: _ItemConstants.APPLE_IMAGE_URL
};
var FRUIT_TIER_3 = exports.FRUIT_TIER_3 = {
    fruitTier: 3,
    imageUrl: _ItemConstants.GRAPES_IMAGE_URL
};
var FRUIT_TIER_4 = exports.FRUIT_TIER_4 = {
    fruitTier: 4,
    imageUrl: _ItemConstants.ORANGE_IMAGE_URL
};
var FRUIT_TIER_5 = exports.FRUIT_TIER_5 = {
    fruitTier: 5,
    imageUrl: _ItemConstants.CHERRY_IMAGE_URL
};

},{"./ItemConstants":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var MazeItemKey = exports.MazeItemKey = undefined;
(function (MazeItemKey) {
    MazeItemKey["FRUIT"] = "FRUIT";
    MazeItemKey["BRAIN"] = "BRAIN";
    MazeItemKey["MULTIPLIER"] = "MULTIPLIER";
    MazeItemKey["BLACK_HOLE"] = "BLACK_HOLE";
    MazeItemKey["UNLIMITED_SPLITS"] = "UNLIMITED_SPLITS";
    MazeItemKey["GHOST"] = "GHOST";
})(MazeItemKey || (exports.MazeItemKey = MazeItemKey = {}));
var BANANA_IMAGE_URL = exports.BANANA_IMAGE_URL = 'img/banana2.png';
var APPLE_IMAGE_URL = exports.APPLE_IMAGE_URL = 'img/apple.png';
var ORANGE_IMAGE_URL = exports.ORANGE_IMAGE_URL = 'img/orange.png';
var GRAPES_IMAGE_URL = exports.GRAPES_IMAGE_URL = 'img/grapes.png';
var CHERRY_IMAGE_URL = exports.CHERRY_IMAGE_URL = 'img/cherry.png';
var FRUIT_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY = exports.FRUIT_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY = 0.0005;
var FRUIT_SPAWN_BASE_PROBABILITY = exports.FRUIT_SPAWN_BASE_PROBABILITY = 0.005;
var FRUIT_PICKUP_POINTS_BASE_AMOUNT_MULTIPLIER = exports.FRUIT_PICKUP_POINTS_BASE_AMOUNT_MULTIPLIER = 1.2;
var BRAIN_SPAWN_BASE_PROBABILITY = exports.BRAIN_SPAWN_BASE_PROBABILITY = 0.001;
var BRAIN_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY = exports.BRAIN_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY = 0.0015;
var BRAIN_STARTING_TILE_DISTANCE = exports.BRAIN_STARTING_TILE_DISTANCE = 20;
var BLACK_HOLE_ITEM_SPAWN_BASE_PROBABILITY = exports.BLACK_HOLE_ITEM_SPAWN_BASE_PROBABILITY = 0.002;
var BLACK_HOLE_ITEM_SPAWN_BASE_INCREASE_AMOUNT_PER_BIOME = exports.BLACK_HOLE_ITEM_SPAWN_BASE_INCREASE_AMOUNT_PER_BIOME = 0.001;
var UNLIMITED_SPLITS_PROBABILITY = exports.UNLIMITED_SPLITS_PROBABILITY = 0.0015;
var GHOST_ITEM_SPAWN_PROBABILITY = exports.GHOST_ITEM_SPAWN_PROBABILITY = 0.0015;
var GHOST_ITEM_STARTING_TILE_DISTANCE = exports.GHOST_ITEM_STARTING_TILE_DISTANCE = 20;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var PowerUpKey = exports.PowerUpKey = undefined;
(function (PowerUpKey) {
    PowerUpKey["POINTS_MULTIPLIER"] = "POINTS_MULTIPLIER";
    PowerUpKey["SPEED_UP"] = "SPEED_UP";
})(PowerUpKey || (exports.PowerUpKey = PowerUpKey = {}));
var POWER_UP_TO_UI_KEY_MAP = exports.POWER_UP_TO_UI_KEY_MAP = new Map([[PowerUpKey.POINTS_MULTIPLIER, 'pointsMultiplierPowerUpButton'], [PowerUpKey.SPEED_UP, 'speedUpPowerUpButton']]);
var POINTS_MULTIPLIER_POWER_UP_BASE_DURATION = exports.POINTS_MULTIPLIER_POWER_UP_BASE_DURATION = 10000;
var POINTS_MULTIPLIER_POWER_UP_BASE_DURATION_INCREASE = exports.POINTS_MULTIPLIER_POWER_UP_BASE_DURATION_INCREASE = 5000;
var POINTS_MULTIPLIER_POWER_UP_BASE_COOLDOWN = exports.POINTS_MULTIPLIER_POWER_UP_BASE_COOLDOWN = 30000;
var POINTS_MULTIPLIER_POWER_UP_BASE_STRENGTH = exports.POINTS_MULTIPLIER_POWER_UP_BASE_STRENGTH = 2;
var POINTS_MULTIPLIER_POWER_UP_BASE_STRENGTH_MULTIPLIER = exports.POINTS_MULTIPLIER_POWER_UP_BASE_STRENGTH_MULTIPLIER = 0.5;
var SPEED_UP_POWER_UP_BASE_DURATION = exports.SPEED_UP_POWER_UP_BASE_DURATION = 10000;
var SPEED_UP_POWER_UP_BASE_DURATION_INCREASE = exports.SPEED_UP_POWER_UP_BASE_DURATION_INCREASE = 5000;
var SPEED_UP_POWER_UP_BASE_COOLDOWN = exports.SPEED_UP_POWER_UP_BASE_COOLDOWN = 30000;
var SPEED_UP_POWER_UP_BASE_STRENGTH = exports.SPEED_UP_POWER_UP_BASE_STRENGTH = 1.5;
var SPEED_UP_POWER_UP_BASE_STRENGTH_INCREASE = exports.SPEED_UP_POWER_UP_BASE_STRENGTH_INCREASE = 0.25;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var UpgradeKey = exports.UpgradeKey = undefined;
(function (UpgradeKey) {
    // Bot
    UpgradeKey["AUTO_MOVE"] = "AUTO_MOVE";
    UpgradeKey["PRIORITIZE_UNVISITED"] = "PRIORITIZE_UNVISITED";
    UpgradeKey["AVOID_REVISIT_LAST_POSITION"] = "AVOID_REVISIT_LAST_POSITION";
    UpgradeKey["AUTO_EXIT_MAZE"] = "AUTO_EXIT_MAZE";
    UpgradeKey["PLAYER_MOVE_INDEPENDENTLY"] = "PLAYER_MOVE_INDEPENDENTLY";
    UpgradeKey["TELEPORT_BOT_BACK_TO_PLAYER"] = "TELEPORT_BOT_BACK_TO_PLAYER";
    UpgradeKey["TELEPORT_PLAYER_BACK_TO_BOT"] = "TELEPORT_PLAYER_BACK_TO_BOT";
    UpgradeKey["BOT_SPLIT_DIRECTION"] = "BOT_SPLIT_DIRECTION";
    UpgradeKey["BOT_SPLIT_BOT_AUTO_MERGE"] = "BOT_SPLIT_BOT_AUTO_MERGE";
    UpgradeKey["BOT_SMART_MERGE"] = "BOT_SMART_MERGE";
    UpgradeKey["BOT_MOVEMENT_SPEED"] = "BOT_MOVEMENT_SPEED";
    UpgradeKey["BOT_REMEMBER_DEADEND_TILES"] = "BOT_REMEMBER_DEADEND_TILES";
    UpgradeKey["BOT_LUCKY_GUESS"] = "BOT_LUCKY_GUESS";
    // Maze
    UpgradeKey["MAZE_SIZE_UPGRADE"] = "MAZE_SIZE_UPGRADE";
    UpgradeKey["POINTS_PER_VISIT"] = "POINTS_PER_VISIT";
    UpgradeKey["POINTS_PER_REVISIT"] = "POINTS_PER_REVISIT";
    UpgradeKey["MAZE_COMPLETION_BONUS"] = "MAZE_COMPLETION_BONUS";
    // Items
    UpgradeKey["FRUIT_SPAWN"] = "FRUIT_SPAWN";
    UpgradeKey["BRAIN_SPAWN"] = "BRAIN_SPAWN";
    UpgradeKey["BRAIN_TILE_DISTANCE"] = "BRAIN_TILE_DISTANCE";
    UpgradeKey["FRUIT_PICKUP_POINTS"] = "FRUIT_PICKUP_POINTS";
    // Power Ups
    UpgradeKey["SPEED_UP_ACTIVATE_DURATION"] = "SPEED_UP_ACTIVATE_DURATION";
    UpgradeKey["SPEED_UP_MULTIPLIER_STRENGTH"] = "SPEED_UP_MULTIPLIER_STRENGTH";
    UpgradeKey["MULTIPLIER_POWER_UP_ACTIVATE_DURATION"] = "MULTIPLIER_POWER_UP_ACTIVATE_DURATION";
    UpgradeKey["MULTIPLIER_POWER_UP_STRENGTH"] = "MULTIPLIER_POWER_UP_STRENGTH";
    // "Feature" Upgrades
    UpgradeKey["DESTRUCTIBLE_WALLS"] = "DESTRUCTIBLE_WALLS";
    // Biomes
    UpgradeKey["BIOME"] = "BIOME";
})(UpgradeKey || (exports.UpgradeKey = UpgradeKey = {}));
var UpgradeType = exports.UpgradeType = undefined;
(function (UpgradeType) {
    UpgradeType["BOT"] = "BOT";
    UpgradeType["MAZE"] = "MAZE";
    UpgradeType["MOVEMENT"] = "MOVEMENT";
    UpgradeType["ITEM"] = "ITEM";
    UpgradeType["OTHER"] = "OTHER";
    UpgradeType["POWER_UP"] = "POWER_UP";
})(UpgradeType || (exports.UpgradeType = UpgradeType = {}));
// Bot
var BOT_AUTO_MOVE_UPGRADE_COST = exports.BOT_AUTO_MOVE_UPGRADE_COST = 100;
var PRIORITIZE_UNVISITED_UPGRADE_COST = exports.PRIORITIZE_UNVISITED_UPGRADE_COST = 300;
var AVOID_REVISIT_LAST_POSITION_UPGRADE_COST = exports.AVOID_REVISIT_LAST_POSITION_UPGRADE_COST = 500;
var ALLOW_PLAYER_TO_MOVE_INDEPENDENTLY_UPGRADE_COST = exports.ALLOW_PLAYER_TO_MOVE_INDEPENDENTLY_UPGRADE_COST = 500;
var AUTO_EXIT_MAZE_UPGRADE_BASE_COST = exports.AUTO_EXIT_MAZE_UPGRADE_BASE_COST = 250;
var AUTO_EXIT_MAZE_UPGRADE_BASE_COST_MULTIPLIER = exports.AUTO_EXIT_MAZE_UPGRADE_BASE_COST_MULTIPLIER = 2;
var TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST = exports.TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST = 750;
var TELEPORT_BOT_BACK_TO_PLAYER_UPGRADE_COST = exports.TELEPORT_BOT_BACK_TO_PLAYER_UPGRADE_COST = 750;
var SPLIT_DIRECTION_UPGRADE_BASE_COST = exports.SPLIT_DIRECTION_UPGRADE_BASE_COST = 5000;
var SPLIT_DIRECTION_UPGRADE_BASE_MULTIPLIER = exports.SPLIT_DIRECTION_UPGRADE_BASE_MULTIPLIER = 3;
var SPLIT_BOT_AUTO_MERGE_UPGRADE_COST = exports.SPLIT_BOT_AUTO_MERGE_UPGRADE_COST = 50000;
var BOT_SMART_MERGE_UPGRADE_COST = exports.BOT_SMART_MERGE_UPGRADE_COST = 50000;
var BOT_MOVEMENT_UPGRADE_BASE_COST = exports.BOT_MOVEMENT_UPGRADE_BASE_COST = 10;
var BOT_MOVEMENT_UPGRADE_BASE_COST_MUTLIPLIER = exports.BOT_MOVEMENT_UPGRADE_BASE_COST_MUTLIPLIER = 1.1;
var BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST = exports.BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST = 1000;
var BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST_MULTIPLIER = exports.BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST_MULTIPLIER = 3;
var BOT_LUCKY_GUESS_UPGRADE_BASE_COST = exports.BOT_LUCKY_GUESS_UPGRADE_BASE_COST = 5000;
var BOT_LUCKY_GUESS_UPGRADE_BASE_COST_MULTIPLIER = exports.BOT_LUCKY_GUESS_UPGRADE_BASE_COST_MULTIPLIER = 1.7;
var BOT_LUCKY_GUESS_UPGRADE_INCREASE_AMOUNT = exports.BOT_LUCKY_GUESS_UPGRADE_INCREASE_AMOUNT = 0.01;
// Maze
var MAZE_COMPLETION_BONUS_BASE_MULTIPLIER = exports.MAZE_COMPLETION_BONUS_BASE_MULTIPLIER = 0.75;
var MAZE_COMPLETION_BONUS_UPGRADE_SIZE_MULTIPLIER = exports.MAZE_COMPLETION_BONUS_UPGRADE_SIZE_MULTIPLIER = 1.1;
var MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST = exports.MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST = 100;
var MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST_MULTIPLIER = exports.MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST_MULTIPLIER = 1.2;
var MAZE_SIZE_UPGRADE_BASE_COST = exports.MAZE_SIZE_UPGRADE_BASE_COST = 300;
var MAZE_SIZE_UPGRADE_BASE_COST_MULTIPLIER = exports.MAZE_SIZE_UPGRADE_BASE_COST_MULTIPLIER = 1.8;
var POINTS_PER_VISIT_UPGRADE_BASE_COST = exports.POINTS_PER_VISIT_UPGRADE_BASE_COST = 10;
var POINTS_PER_VISIT_UPGRADE_BASE_COST_MULTIPLIER = exports.POINTS_PER_VISIT_UPGRADE_BASE_COST_MULTIPLIER = 1.3;
var POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER = exports.POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER = 1.05;
var POINTS_PER_REVISIT_UPGRADE_BASE_COST = exports.POINTS_PER_REVISIT_UPGRADE_BASE_COST = 1000;
var POINTS_PER_REVISIT_UPGRADE_BASE_COST_MULTIPLIER = exports.POINTS_PER_REVISIT_UPGRADE_BASE_COST_MULTIPLIER = 1.14;
var TILE_REVISIT_BASE_MULTIPLIER = exports.TILE_REVISIT_BASE_MULTIPLIER = 0;
var TILE_REVISIT_BASE_MULTIPLIER_INCREASE_PERCENT = exports.TILE_REVISIT_BASE_MULTIPLIER_INCREASE_PERCENT = 0.0075;
var DESTRUCTIBLE_WALL_BASE_SPAWN_RATE = exports.DESTRUCTIBLE_WALL_BASE_SPAWN_RATE = 0.001;
var DESTRUCTIBLE_WALL_BASE_SPAWN_RATE_INCREASE_PER_BIOME = exports.DESTRUCTIBLE_WALL_BASE_SPAWN_RATE_INCREASE_PER_BIOME = 0.001;
// Items
var FRUIT_SPAWN_UPGRADE_BASE_COST = exports.FRUIT_SPAWN_UPGRADE_BASE_COST = 100;
var FRUIT_SPAWN_UPGRADE_BASE_COST_MULTIPLIER = exports.FRUIT_SPAWN_UPGRADE_BASE_COST_MULTIPLIER = 1.35;
var FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST = exports.FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST = 100;
var FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST_MULTIPLIER = exports.FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST_MULTIPLIER = 1.35;
var BRAIN_SPAWN_RATE_UPGRADE_BASE_COST = exports.BRAIN_SPAWN_RATE_UPGRADE_BASE_COST = 100;
var BRAIN_SPAWN_RATE_UPGRADE_BASE_COST_MULTIPLIER = exports.BRAIN_SPAWN_RATE_UPGRADE_BASE_COST_MULTIPLIER = 2;
var BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST = exports.BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST = 10000;
var BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST_MULTIPLIER = exports.BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST_MULTIPLIER = 1.5;
var BRAIN_TILE_DISTANCE_UPGRADE_INCREASE_AMOUNT = exports.BRAIN_TILE_DISTANCE_UPGRADE_INCREASE_AMOUNT = 5;
// Power Ups
var MULTIPLIER_POWER_UP_STRENGTH_BASE_COST = exports.MULTIPLIER_POWER_UP_STRENGTH_BASE_COST = 40000;
var MULTIPLIER_POWER_UP_STRENGTH_BASE_COST_MULTIPLIER = exports.MULTIPLIER_POWER_UP_STRENGTH_BASE_COST_MULTIPLIER = 1.5;
var MULTIPLIER_POWER_UP_SPAWN_RATE_BASE_COST = exports.MULTIPLIER_POWER_UP_SPAWN_RATE_BASE_COST = 20000;
var MULTIPLIER_POWER_UP_SPAWN_RATE_COST_MULTIPLIER = exports.MULTIPLIER_POWER_UP_SPAWN_RATE_COST_MULTIPLIER = 1.5;
var SPEED_UP_POWER_UP_ACTIVATE_DURATION_BASE_COST = exports.SPEED_UP_POWER_UP_ACTIVATE_DURATION_BASE_COST = 10000;
var SPEED_UP_POWER_UP_ACTIVATE_DURATION_COST_MULTIPLIER = exports.SPEED_UP_POWER_UP_ACTIVATE_DURATION_COST_MULTIPLIER = 1.5;
var SPEED_UP_MULTIPLIER_STRENGTH_BASE_COST = exports.SPEED_UP_MULTIPLIER_STRENGTH_BASE_COST = 10000;
var SPEED_UP_MULTIPLIER_STRENGTH_COST_MULTIPLIER = exports.SPEED_UP_MULTIPLIER_STRENGTH_COST_MULTIPLIER = 1.5;
var BIOME_UPGRADE_COST_ARR = exports.BIOME_UPGRADE_COST_ARR = [200, 400, 1000, 2000, 4000, 8000, 15000, 25000, 40000, 70000, 120000, 240000];
var BIOME_UPGRADE_BASE_MULTPLIER = exports.BIOME_UPGRADE_BASE_MULTPLIER = 1.5;
var UPGRADE_TYPE_TO_UI_KEY_MAP = exports.UPGRADE_TYPE_TO_UI_KEY_MAP = new Map([[UpgradeType.BOT, "botUpgradeHeader"], [UpgradeType.ITEM, "itemUpgradeHeader"], [UpgradeType.MAZE, "mazeUpgradeHeader"], [UpgradeType.MOVEMENT, "movementUpgradeHeader"], [UpgradeType.POWER_UP, "powerUpUpgradeHeader"], [UpgradeType.OTHER, null]]);

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.printMazeCompleteData = exports.DEV_MODE_AUTOSTART = exports.DEV_MODE_DISABLE_UI = exports.IS_FREE_MODE_ENABLED = exports.DEBUG_ALL_BUTTONS_VISIBLE = exports.IS_DEV_MODE_ENABLED = undefined;

var _Game = require("../managers/Game");

var _Game2 = _interopRequireDefault(_Game);

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _MazeUtils = require("../managers/MazeUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IS_DEV_MODE_ENABLED = exports.IS_DEV_MODE_ENABLED = false;
var DEBUG_ALL_BUTTONS_VISIBLE = exports.DEBUG_ALL_BUTTONS_VISIBLE = false;
var IS_FREE_MODE_ENABLED = exports.IS_FREE_MODE_ENABLED = true;
var DEV_MODE_DISABLE_UI = exports.DEV_MODE_DISABLE_UI = false;
var DEV_MODE_AUTOSTART = exports.DEV_MODE_AUTOSTART = false;
var game1;
var iterationCount = 0;
var maxIterationCount = 100;
var getMazeData = function getMazeData() {
    game1 = new _Game2.default(DEV_MODE_DISABLE_UI, true);
    // game1.points.rngBotPrioritizeUnvisited = Boolean($(`#debugInputPrioritizeUnvisited`).val());
    // // game1.points.rngBotAvoidRevisitLastPosition = Boolean($(`#debugAvoidRevisit`).val());
    // game1.points.rngBotAutoExitMaze = Boolean($(`#debugAutoExit`).val());
    // game1.points.mazeSizeUpgradeCount = parseInt($(`#debugMazeUpgradeCount`).val().toString());
    // maxIterationCount = parseInt($(`#debugMaxIterations`).val().toString());
    // game1.points.rngMovementSpeedUpgrades = 1000;
    // game1.points.pointsPerVisitUpgradeCount = 0;
    // game1.points.rngMovementSpeedUpgrades = 20;
    console.info('start debug maze');
    game1.startGame();
};
var sumMoves = 0;
var sumPoints = 0;
var printAverages = function printAverages() {
    var mazeSize = _MazeUtils.DEFAULT_MAZE_SIZE + game1.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.MAZE_SIZE_UPGRADE);
    $("#debugResult").append("Avg Moves: " + (sumMoves / iterationCount).toFixed(2) + "<br>");
    $("#debugResult").append("Avg New Tile Visits: " + (sumPoints / iterationCount).toFixed(2) + "<br>");
    $("#debugResult").append("Avg Tile Revisits: " + ((sumMoves - sumPoints) / iterationCount).toFixed(2) + "<br>");
    $("#debugResult").append("Maze size: " + mazeSize + "<br>");
};
var printMazeCompleteData = exports.printMazeCompleteData = function printMazeCompleteData(game) {
    var moveCount = game.maze.moveCount;
    // let totalTime = game.rngBot.getBotMoveInterval() * moveCount;
    var points = game.points.points;
    var completionBonus = game.points.getMazeCompletionBonus();
    $('#debugTable > tbody').append("<tr>");
    $('#debugTable > tbody').append("<td>" + (1 + iterationCount) + ":   </td>");
    $('#debugTable > tbody').append("<td>" + moveCount + "</td>");
    // $('#debugTable > tbody').append(`<td>${totalTime}</td>`);
    $('#debugTable > tbody').append("<td>" + (points - completionBonus).toFixed(2) + "</td>");
    $('#debugTable > tbody').append("<td>" + points.toFixed(2) + "</td>");
    $('#debugTable > tbody').append("</tr>");
    sumMoves += moveCount;
    sumPoints += points - completionBonus;
    iterationCount++;
    if (iterationCount == maxIterationCount) {
        printAverages();
        return;
    }
    game.points.points = 0;
    game.startGame();
};
var debugHeader = function debugHeader() {
    $('#debugTable > tbody').append("<tr>");
    $('#debugTable > tbody').append("<th>#</td>");
    $('#debugTable > tbody').append("<th>Move Count</th>");
    $('#debugTable > tbody').append("<th>Points</th>");
    $('#debugTable > tbody').append("<th>Points (+comp)</th>");
    $('#debugTable > tbody').append("</tr>");
};
$(document).ready(function () {
    if (!IS_DEV_MODE_ENABLED) return;
    $('#debugRunButton').click(function () {
        $('#debugTable > tbody').empty();
        $("#debugResult").empty();
        iterationCount = 0;
        sumMoves = 0;
        sumPoints = 0;
        debugHeader();
        getMazeData();
    });
});

},{"../constants/UpgradeConstants":7,"../managers/Game":18,"../managers/MazeUtils":21}],9:[function(require,module,exports){
"use strict";

var _devUtils = require("./dev/devUtils");

var _Game = require("./managers/Game");

var _Game2 = _interopRequireDefault(_Game);

var _UpgradeConstants = require("./constants/UpgradeConstants");

var _MazeUtils = require("./managers/MazeUtils");

var _PowerUpConstants = require("./constants/PowerUpConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UP_KEY = 38;
var DOWN_KEY = 40;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var W_KEY = 87;
var S_KEY = 83;
var A_KEY = 65;
var D_KEY = 68;
var E_KEY = 69;
var Q_KEY = 81;
var ONE_KEY = 49;
var TWO_KEY = 50;
var ESCAPE_KEY = 27;
$(document).ready(function () {
    if (_devUtils.IS_DEV_MODE_ENABLED && !_devUtils.DEV_MODE_AUTOSTART) return;
    var game = new _Game2.default();
    game.reloadFromLocalStorage();
    //TODO: this should be in UI
    $(document).keydown(function (event) {
        // Up
        if (event.keyCode === UP_KEY || event.keyCode === W_KEY) {
            var currPlayerId = game.players.getPlayerOrDefaultBotId();
            game.players.movePlayer(currPlayerId, _MazeUtils.DIRECTION_UP, true);
            event.preventDefault();
        }
        // Down
        else if (event.keyCode === DOWN_KEY || event.keyCode === S_KEY) {
                var _currPlayerId = game.players.getPlayerOrDefaultBotId();
                game.players.movePlayer(_currPlayerId, _MazeUtils.DIRECTION_DOWN, true);
                event.preventDefault();
            }
            // Left
            else if (event.keyCode === LEFT_KEY || event.keyCode === A_KEY) {
                    var _currPlayerId2 = game.players.getPlayerOrDefaultBotId();
                    game.players.movePlayer(_currPlayerId2, _MazeUtils.DIRECTION_LEFT, true);
                    event.preventDefault();
                }
                // Right
                else if (event.keyCode === RIGHT_KEY || event.keyCode === D_KEY) {
                        var _currPlayerId3 = game.players.getPlayerOrDefaultBotId();
                        game.players.movePlayer(_currPlayerId3, _MazeUtils.DIRECTION_RIGHT, true);
                        event.preventDefault();
                    }
                    // E = Teleport Bot to Player
                    else if (event.keyCode === E_KEY) {
                            if (game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.TELEPORT_PLAYER_BACK_TO_BOT)) {
                                game.maze.teleportPlayerBackToBot();
                            }
                            event.preventDefault();
                        }
                        // Q = Teleport Player to Bot
                        else if (event.keyCode === Q_KEY) {
                                if (game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.TELEPORT_PLAYER_BACK_TO_BOT)) {
                                    game.maze.teleportBotBackToPlayer();
                                }
                                event.preventDefault();
                            }
                            // 1 = Speed Up Powerup
                            else if (event.keyCode === ONE_KEY) {
                                    game.powerUps.activatePowerUp(_PowerUpConstants.PowerUpKey.SPEED_UP);
                                    event.preventDefault();
                                }
                                // 2 = Point multiplier Powerup
                                else if (event.keyCode === TWO_KEY) {
                                        game.powerUps.activatePowerUp(_PowerUpConstants.PowerUpKey.POINTS_MULTIPLIER);
                                        event.preventDefault();
                                    } else if (event.keyCode === ESCAPE_KEY) {
                                        game.ui.closeAllModals();
                                    }
    });
});

},{"./constants/PowerUpConstants":6,"./constants/UpgradeConstants":7,"./dev/devUtils":8,"./managers/Game":18,"./managers/MazeUtils":21}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MazeUtils = require("../managers/MazeUtils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MazeItem = function () {
    function MazeItem(game, tile, mazeItemKey, backgroundImagePath, pickUpStatsKey) {
        _classCallCheck(this, MazeItem);

        this.game = game;
        this.tile = tile;
        this.tileKey = (0, _MazeUtils.generateTileKey)(tile.x, tile.y);
        this.mazeItemKey = mazeItemKey;
        this.backgroundImagePath = backgroundImagePath;
        this.pickUpStatsKey = pickUpStatsKey;
    }

    _createClass(MazeItem, [{
        key: "getBackgroundImagePath",
        value: function getBackgroundImagePath() {
            return this.backgroundImagePath;
        }
    }, {
        key: "drawItem",
        value: function drawItem() {
            $("#" + this.tileKey).css("background-image", "url(\"" + this.getBackgroundImagePath() + "\")");
            $("#" + this.tileKey).css("background-repeat", "no-repeat");
            $("#" + this.tileKey).css("background-position", "center");
            $("#" + this.tileKey).css("background-size", '22px');
        }
    }, {
        key: "removeItem",
        value: function removeItem() {
            $("#" + this.tileKey).css("background-size", "");
            $("#" + this.tileKey).css("background-image", "");
        }
    }, {
        key: "triggerPickup",
        value: function triggerPickup(playerId) {
            this.removeItem();
            this.game.stats.addStatsToKey(1, this.pickUpStatsKey);
        }
    }], [{
        key: "getItemSpawnProbability",
        value: function getItemSpawnProbability(game) {
            return 0;
        }
    }]);

    return MazeItem;
}();

exports.default = MazeItem;

},{"../managers/MazeUtils":21}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MazeUtils = require("../../managers/MazeUtils");

var _Stats = require("../../models/Stats");

var _ItemConstants = require("../../constants/ItemConstants");

var _MazeItem2 = require("../MazeItem");

var _MazeItem3 = _interopRequireDefault(_MazeItem2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BACKGROUND_IMAGE_PATH = 'img/blackHole.png';

var BlackHoleMazeItem = function (_MazeItem) {
    _inherits(BlackHoleMazeItem, _MazeItem);

    function BlackHoleMazeItem(game, tile, mazeItemKey) {
        _classCallCheck(this, BlackHoleMazeItem);

        return _possibleConstructorReturn(this, (BlackHoleMazeItem.__proto__ || Object.getPrototypeOf(BlackHoleMazeItem)).call(this, game, tile, mazeItemKey, BACKGROUND_IMAGE_PATH, _Stats.StatsKey.TOTAL_BLACK_HOLE_ITEMS_PICKED_UP));
    }

    _createClass(BlackHoleMazeItem, [{
        key: "triggerPickup",
        value: function triggerPickup(playerId) {
            _get(BlackHoleMazeItem.prototype.__proto__ || Object.getPrototypeOf(BlackHoleMazeItem.prototype), "triggerPickup", this).call(this, playerId);
            var newTile = (0, _MazeUtils.getRandomMazeTile)(this.game);
            this.game.maze.updatePlayerTile(playerId, newTile);
        }
    }], [{
        key: "getItemSpawnProbability",
        value: function getItemSpawnProbability(game) {
            var biomeDiff = game.biomes.getItemUnlockBiomeDiffCount(_ItemConstants.MazeItemKey.BLACK_HOLE);
            return _ItemConstants.BLACK_HOLE_ITEM_SPAWN_BASE_PROBABILITY + biomeDiff * _ItemConstants.BLACK_HOLE_ITEM_SPAWN_BASE_INCREASE_AMOUNT_PER_BIOME;
        }
    }]);

    return BlackHoleMazeItem;
}(_MazeItem3.default);

exports.default = BlackHoleMazeItem;

},{"../../constants/ItemConstants":5,"../../managers/MazeUtils":21,"../../models/Stats":46,"../MazeItem":10}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Stats = require("../../models/Stats");

var _UpgradeConstants = require("../../constants/UpgradeConstants");

var _ItemConstants = require("../../constants/ItemConstants");

var _MazeItem2 = require("../MazeItem");

var _MazeItem3 = _interopRequireDefault(_MazeItem2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BACKGROUND_IMAGE_PATH = 'img/brain.png';

var BrainMazeItem = function (_MazeItem) {
    _inherits(BrainMazeItem, _MazeItem);

    function BrainMazeItem(game, tile, mazeItemKey) {
        _classCallCheck(this, BrainMazeItem);

        return _possibleConstructorReturn(this, (BrainMazeItem.__proto__ || Object.getPrototypeOf(BrainMazeItem)).call(this, game, tile, mazeItemKey, BACKGROUND_IMAGE_PATH, _Stats.StatsKey.TOTAL_BRAIN_ITEMS_PICKED_UP));
    }

    _createClass(BrainMazeItem, [{
        key: "triggerPickup",
        value: function triggerPickup(playerId) {
            _get(BrainMazeItem.prototype.__proto__ || Object.getPrototypeOf(BrainMazeItem.prototype), "triggerPickup", this).call(this, playerId);
            if (!this.game.players.playerMap.has(playerId)) return;
            var tileDistance = BrainMazeItem.getBrainTileDistanceAmount(this.game);
            this.game.players.getPlayer(playerId).smartPathingTileDistanceRemaining += tileDistance;
        }
    }], [{
        key: "getBrainTileDistanceAmount",
        value: function getBrainTileDistanceAmount(game) {
            var upgradeLevel = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BRAIN_TILE_DISTANCE);
            return _ItemConstants.BRAIN_STARTING_TILE_DISTANCE + upgradeLevel * _UpgradeConstants.BRAIN_TILE_DISTANCE_UPGRADE_INCREASE_AMOUNT;
        }
    }, {
        key: "getItemSpawnProbability",
        value: function getItemSpawnProbability(game) {
            var upgradeLevel = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BRAIN_SPAWN);
            return _ItemConstants.BRAIN_SPAWN_BASE_PROBABILITY + _ItemConstants.BRAIN_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY * upgradeLevel;
        }
    }]);

    return BrainMazeItem;
}(_MazeItem3.default);

exports.default = BrainMazeItem;

},{"../../constants/ItemConstants":5,"../../constants/UpgradeConstants":7,"../../models/Stats":46,"../MazeItem":10}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _UpgradeConstants = require("../../constants/UpgradeConstants");

var _ItemConstants = require("../../constants/ItemConstants");

var _MazeItem2 = require("../MazeItem");

var _MazeItem3 = _interopRequireDefault(_MazeItem2);

var _Stats = require("../../models/Stats");

var _BiomeConstants = require("../../constants/BiomeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FruitMazeItem = function (_MazeItem) {
    _inherits(FruitMazeItem, _MazeItem);

    function FruitMazeItem(game, tile, mazeItemKey) {
        _classCallCheck(this, FruitMazeItem);

        return _possibleConstructorReturn(this, (FruitMazeItem.__proto__ || Object.getPrototypeOf(FruitMazeItem)).call(this, game, tile, mazeItemKey, null, _Stats.StatsKey.TOTAL_FRUIT_ITEMS_PICKED_UP));
    }

    _createClass(FruitMazeItem, [{
        key: "getBackgroundImagePath",
        value: function getBackgroundImagePath() {
            return FruitMazeItem.getCurrentFruitType(this.game).imageUrl;
        }
    }, {
        key: "triggerPickup",
        value: function triggerPickup(playerId) {
            _get(FruitMazeItem.prototype.__proto__ || Object.getPrototypeOf(FruitMazeItem.prototype), "triggerPickup", this).call(this, playerId);
            var points = FruitMazeItem.getFruitPickupPointsAmount(this.game);
            this.game.points.addPoints(points, playerId, [_Stats.StatsKey.TOTAL_POINTS_EARNED_FROM_FRUITS]);
        }
    }], [{
        key: "getCurrentFruitType",
        value: function getCurrentFruitType(game) {
            return (0, _BiomeConstants.getFruitItemByBiomeKey)(game.biomes.getCurrentBiomeKey());
        }
    }, {
        key: "getFruitPickupPointsAmount",
        value: function getFruitPickupPointsAmount(game) {
            var upgradeLevelMultiplier = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.FRUIT_PICKUP_POINTS);
            var fruitTier = FruitMazeItem.getCurrentFruitType(game).fruitTier;
            var pointsPerVisit = game.points.getPointsPerVisit();
            return (4.5 * upgradeLevelMultiplier + fruitTier * 5 + 10) * pointsPerVisit;
        }
    }, {
        key: "getItemSpawnProbability",
        value: function getItemSpawnProbability(game) {
            var upgradeLevel = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.FRUIT_SPAWN);
            return _ItemConstants.FRUIT_SPAWN_BASE_PROBABILITY + _ItemConstants.FRUIT_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY * upgradeLevel;
        }
    }]);

    return FruitMazeItem;
}(_MazeItem3.default);

exports.default = FruitMazeItem;

},{"../../constants/BiomeConstants":2,"../../constants/ItemConstants":5,"../../constants/UpgradeConstants":7,"../../models/Stats":46,"../MazeItem":10}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _ItemConstants = require("../../constants/ItemConstants");

var _MazeItem2 = require("../MazeItem");

var _MazeItem3 = _interopRequireDefault(_MazeItem2);

var _Stats = require("../../models/Stats");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BACKGROUND_IMAGE_PATH = 'img/ghost.png';

var GhostMazeItem = function (_MazeItem) {
    _inherits(GhostMazeItem, _MazeItem);

    function GhostMazeItem(game, tile, mazeItemKey) {
        _classCallCheck(this, GhostMazeItem);

        return _possibleConstructorReturn(this, (GhostMazeItem.__proto__ || Object.getPrototypeOf(GhostMazeItem)).call(this, game, tile, mazeItemKey, BACKGROUND_IMAGE_PATH, _Stats.StatsKey.TOTAL_GHOST_ITEMS_PICKED_UP));
    }

    _createClass(GhostMazeItem, [{
        key: "triggerPickup",
        value: function triggerPickup(playerId) {
            _get(GhostMazeItem.prototype.__proto__ || Object.getPrototypeOf(GhostMazeItem.prototype), "triggerPickup", this).call(this, playerId);
            var player = this.game.players.getPlayer(playerId);
            if (player) {
                player.addGhostPathingDistance(_ItemConstants.GHOST_ITEM_STARTING_TILE_DISTANCE);
            }
        }
    }], [{
        key: "getItemSpawnProbability",
        value: function getItemSpawnProbability() {
            return _ItemConstants.GHOST_ITEM_SPAWN_PROBABILITY;
        }
    }]);

    return GhostMazeItem;
}(_MazeItem3.default);

exports.default = GhostMazeItem;

},{"../../constants/ItemConstants":5,"../../models/Stats":46,"../MazeItem":10}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _ItemConstants = require("../../constants/ItemConstants");

var _MazeItem2 = require("../MazeItem");

var _MazeItem3 = _interopRequireDefault(_MazeItem2);

var _Stats = require("../../models/Stats");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BACKGROUND_IMAGE_PATH = 'img/unlimitedSplits.png';
var BEST_GIRLFRIEND_IN_THE_WORLD = 'mandyisreallyreallygreatcuteprettyexcellent_Iamvoluteertodoallthehousekeepingforherwhatevermakesherhappy';

var UnlimitedSplitsItem = function (_MazeItem) {
    _inherits(UnlimitedSplitsItem, _MazeItem);

    function UnlimitedSplitsItem(game, tile, mazeItemKey) {
        _classCallCheck(this, UnlimitedSplitsItem);

        return _possibleConstructorReturn(this, (UnlimitedSplitsItem.__proto__ || Object.getPrototypeOf(UnlimitedSplitsItem)).call(this, game, tile, mazeItemKey, BACKGROUND_IMAGE_PATH, _Stats.StatsKey.TOTAL_UNLIMITED_SPLITS_ITEMS_PICKED_UP));
    }

    _createClass(UnlimitedSplitsItem, [{
        key: "triggerPickup",
        value: function triggerPickup(playerId) {
            _get(UnlimitedSplitsItem.prototype.__proto__ || Object.getPrototypeOf(UnlimitedSplitsItem.prototype), "triggerPickup", this).call(this, playerId);
            var player = this.game.players.getPlayer(playerId);
            if (player) {
                player.setIsUnlimitedSplitItemActive(true);
            }
        }
    }], [{
        key: "getItemSpawnProbability",
        value: function getItemSpawnProbability() {
            return _ItemConstants.UNLIMITED_SPLITS_PROBABILITY;
        }
    }]);

    return UnlimitedSplitsItem;
}(_MazeItem3.default);

exports.default = UnlimitedSplitsItem;

},{"../../constants/ItemConstants":5,"../../models/Stats":46,"../MazeItem":10}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BiomeManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BiomeConstants = require("../constants/BiomeConstants");

var _UpgradeConstants = require("../constants/UpgradeConstants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BiomeManager = exports.BiomeManager = function () {
    function BiomeManager(game) {
        _classCallCheck(this, BiomeManager);

        this.game = game;
    }

    _createClass(BiomeManager, [{
        key: "getBasePointsPerVisitValue",
        value: function getBasePointsPerVisitValue() {
            return (0, _BiomeConstants.getPointsPerVisitBaseAmount)(this.getCurrentBiomeKey());
        }
    }, {
        key: "getCurrentBiomeKey",
        value: function getCurrentBiomeKey() {
            var biomeLevel = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BIOME);
            return biomeLevel;
        }
    }, {
        key: "getNextBiomeKey",
        value: function getNextBiomeKey() {
            var nextBiomeLevel = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BIOME) + 1;
            return nextBiomeLevel;
        }
    }, {
        key: "isMazeItemUnlocked",
        value: function isMazeItemUnlocked(itemKey) {
            // Assume unlocked if unlisted.
            return _BiomeConstants.BIOME_ITEM_UNLOCKS.has(itemKey) ? this.isBiomeKeyUnlocked(_BiomeConstants.BIOME_ITEM_UNLOCKS.get(itemKey)) : true;
        }
    }, {
        key: "isUpgradeUnlocked",
        value: function isUpgradeUnlocked(upgradeKey) {
            // Assume unlocked if unlisted.
            return _BiomeConstants.BIOME_UPGRADE_UNLOCKS.has(upgradeKey) ? this.isBiomeKeyUnlocked(_BiomeConstants.BIOME_UPGRADE_UNLOCKS.get(upgradeKey)) : true;
        }
    }, {
        key: "isBiomeKeyUnlocked",
        value: function isBiomeKeyUnlocked(biomeKey) {
            var currentBiomeKey = this.getCurrentBiomeKey();
            return currentBiomeKey >= biomeKey;
        }
    }, {
        key: "isPowerUpUnlocked",
        value: function isPowerUpUnlocked(powerUpKey) {
            var requiredBiomeKey = _BiomeConstants.POWER_UP_UNLOCKS.get(powerUpKey);
            return this.isBiomeKeyUnlocked(requiredBiomeKey);
        }
    }, {
        key: "getItemsUnlockBiomeKey",
        value: function getItemsUnlockBiomeKey(itemKey) {
            return _BiomeConstants.BIOME_ITEM_UNLOCKS.has(itemKey) ? _BiomeConstants.BIOME_ITEM_UNLOCKS.get(itemKey) : 0;
        }
        // Get the number of biomes that a particular item has been unlocked for.

    }, {
        key: "getItemUnlockBiomeDiffCount",
        value: function getItemUnlockBiomeDiffCount(itemKey) {
            return this.getCurrentBiomeKey() - this.getItemsUnlockBiomeKey(itemKey);
        }
    }, {
        key: "getUpgradeUnlockBiomeDiffCount",
        value: function getUpgradeUnlockBiomeDiffCount(upgradeKey) {
            return this.getCurrentBiomeKey() - _BiomeConstants.BIOME_UPGRADE_UNLOCKS.get(upgradeKey);
        }
    }]);

    return BiomeManager;
}();

},{"../constants/BiomeConstants":2,"../constants/UpgradeConstants":7}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ColorManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BiomeConstants = require("../constants/BiomeConstants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColorManager = exports.ColorManager = function () {
    function ColorManager(game) {
        _classCallCheck(this, ColorManager);

        this.game = game;
    }

    _createClass(ColorManager, [{
        key: "getBiomeColorPalette",
        value: function getBiomeColorPalette() {
            var currentBiome = this.game.biomes.getCurrentBiomeKey();
            return (0, _BiomeConstants.getBiomeColorPalette)(currentBiome);
        }
    }, {
        key: "getPlayerColor",
        value: function getPlayerColor() {
            return this.getBiomeColorPalette().playerColor;
        }
    }, {
        key: "getBotColor",
        value: function getBotColor() {
            return this.getBiomeColorPalette().botColor;
        }
    }, {
        key: "getTileColor",
        value: function getTileColor() {
            return this.getBiomeColorPalette().tileColor;
        }
    }, {
        key: "getVisitedTileColor",
        value: function getVisitedTileColor() {
            return this.getBiomeColorPalette().visitedTileColor;
        }
    }, {
        key: "getMazeWallColor",
        value: function getMazeWallColor() {
            return this.getBiomeColorPalette().mazeWallColor;
        }
    }, {
        key: "getDeadEndTileColor",
        value: function getDeadEndTileColor() {
            return this.getBiomeColorPalette().deadEndColor;
        }
    }, {
        key: "getMultiplierItemPlayerColor",
        value: function getMultiplierItemPlayerColor() {
            return this.getBiomeColorPalette().multiplierItemPlayerColor;
        }
    }, {
        key: "getUnlimitedSplitPlayerColor",
        value: function getUnlimitedSplitPlayerColor() {
            return this.getBiomeColorPalette().unlimitedSplitBotPlayerColor;
        }
    }, {
        key: "getGhostItemPlayerColor",
        value: function getGhostItemPlayerColor() {
            return this.getBiomeColorPalette().ghostItemPlayerColor;
        }
    }, {
        key: "getSmartPathingPlayerColor",
        value: function getSmartPathingPlayerColor() {
            return this.getBiomeColorPalette().smartPathingPlayerColor;
        }
    }]);

    return ColorManager;
}();

},{"../constants/BiomeConstants":2}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _devUtils = require("../dev/devUtils");

var _MazeManager = require("./MazeManager");

var _PointsManager = require("./PointsManager");

var _RNGBotManager = require("./RNGBotManager");

var _UserInterface = require("./UserInterface");

var _UpgradeManager = require("./UpgradeManager");

var _Serializable2 = require("../models/Serializable");

var _SaveManager = require("./SaveManager");

var _PlayerManager = require("./PlayerManager");

var _MazeItemManager = require("./MazeItemManager");

var _StatsManager = require("./StatsManager");

var _BiomeManager = require("./BiomeManager");

var _ColorManager = require("./ColorManager");

var _OfflineManager = require("./OfflineManager");

var _PowerUpManager = require("./PowerUpManager");

var _Stats = require("../models/Stats");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SERIALIZABLE_PROPERTIES = ['points', 'upgrades', 'stats', 'offline'];

var Game = function (_Serializable) {
    _inherits(Game, _Serializable);

    function Game() {
        var isDisableUi = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var isDevMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, Game);

        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, SERIALIZABLE_PROPERTIES));

        _this.isDevMode = isDevMode;
        _this.isDisableUi = isDisableUi;
        _this.maze = new _MazeManager.MazeManager(_this);
        _this.points = new _PointsManager.Points(_this, _this.isDevMode);
        _this.rngBot = new _RNGBotManager.RNGBotManager(_this, _this.isDevMode);
        _this.biomes = new _BiomeManager.BiomeManager(_this);
        _this.ui = new _UserInterface.UserInterface(_this, _this.isDisableUi);
        _this.upgrades = new _UpgradeManager.UpgradeManager(_this);
        _this.players = new _PlayerManager.PlayerManager(_this);
        _this.save = new _SaveManager.SaveManager(_this);
        _this.items = new _MazeItemManager.MazeItemManager(_this);
        _this.stats = new _StatsManager.StatsManager(_this);
        _this.colors = new _ColorManager.ColorManager(_this);
        _this.powerUps = new _PowerUpManager.PowerUpManager(_this);
        _this.offline = new _OfflineManager.OfflineManager(_this);
        _this.upgrades.initUpgrades();
        _this.upgrades.updateAllUpgradeUi();
        _this.ui.init();
        _this.stats.initStatsMap();
        return _this;
    }

    _createClass(Game, [{
        key: "hardResetGame",
        value: function hardResetGame() {
            this.save.clearLocalStorage();
            this.resetGame();
            this.maze = new _MazeManager.MazeManager(this);
            this.points.points = 0;
            this.upgrades.initUpgrades();
            this.stats.initStatsMap();
            this.startGame();
            this.save.enableSaveTimer();
        }
    }, {
        key: "reloadFromLocalStorage",
        value: function reloadFromLocalStorage() {
            this.save.loadGameSaveFromLocalStorage();
            this.resetGame();
            this.startGame();
            this.save.enableSaveTimer();
            this.upgrades.hideAllUpgradeNewTextForUnlockedUpgrades();
        }
    }, {
        key: "startGame",
        value: function startGame() {
            this.ui.updateAllStatsKey();
            this.upgrades.updateAllUpgradeUi();
            this.powerUps.updateAllPowerUpsUi();
            this.players.resetAllPlayers();
            this.ui.deleteMaze();
            this.maze.newMaze();
            this.ui.printMazeV2(this.maze.maze);
            this.players.createDefaultPlayer();
            this.rngBot.enableGlobalRngBot();
        }
    }, {
        key: "completeMaze",
        value: function completeMaze(playerId) {
            this.rngBot.disableGlobalMovement();
            this.players.resetAllPlayers();
            this.points.addMazeCompletionBonus(playerId);
            this.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_MAZES_COMPLETED);
            this.stats.clearCurrentMazeStats();
            if (this.isDevMode) {
                (0, _devUtils.printMazeCompleteData)(this);
                return;
            }
            this.startGame();
        }
    }, {
        key: "resetGame",
        value: function resetGame() {
            this.rngBot.disableGlobalMovement();
            this.rngBot.disableReEnableBotMovementTimer();
            this.players.resetAllPlayers();
        }
    }]);

    return Game;
}(_Serializable2.Serializable);

exports.default = Game;

},{"../dev/devUtils":8,"../models/Serializable":45,"../models/Stats":46,"./BiomeManager":16,"./ColorManager":17,"./MazeItemManager":19,"./MazeManager":20,"./OfflineManager":22,"./PlayerManager":23,"./PointsManager":24,"./PowerUpManager":25,"./RNGBotManager":26,"./SaveManager":27,"./StatsManager":28,"./UpgradeManager":29,"./UserInterface":30}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MazeItemManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ItemConstants = require("../constants/ItemConstants");

var _UnlimitedSplitsItem = require("../items/definitions/UnlimitedSplitsItem");

var _UnlimitedSplitsItem2 = _interopRequireDefault(_UnlimitedSplitsItem);

var _BlackHoleMazeItem = require("../items/definitions/BlackHoleMazeItem");

var _BlackHoleMazeItem2 = _interopRequireDefault(_BlackHoleMazeItem);

var _BrainMazeItem = require("../items/definitions/BrainMazeItem");

var _BrainMazeItem2 = _interopRequireDefault(_BrainMazeItem);

var _FruitMazeItem = require("../items/definitions/FruitMazeItem");

var _FruitMazeItem2 = _interopRequireDefault(_FruitMazeItem);

var _GhostMazeItem = require("../items/definitions/GhostMazeItem");

var _GhostMazeItem2 = _interopRequireDefault(_GhostMazeItem);

var _DestructibleWallUpgrade = require("../upgrades/definitions/maze/DestructibleWallUpgrade");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MazeItemManager = exports.MazeItemManager = function () {
    function MazeItemManager(game) {
        _classCallCheck(this, MazeItemManager);

        this.game = game;
    }

    _createClass(MazeItemManager, [{
        key: "isMazeItemUnlocked",
        value: function isMazeItemUnlocked(mazeItemKey) {
            return this.game.biomes.isMazeItemUnlocked(mazeItemKey);
        }
    }, {
        key: "getAllUnlockedMazeItemKeys",
        value: function getAllUnlockedMazeItemKeys() {
            var unlockedMazeItemKeys = [];
            for (var mazeItemKey in _ItemConstants.MazeItemKey) {
                if (this.isMazeItemUnlocked(mazeItemKey)) {
                    unlockedMazeItemKeys.push(mazeItemKey);
                }
            }
            return unlockedMazeItemKeys;
        }
    }, {
        key: "getMazeItemSpawnProbability",
        value: function getMazeItemSpawnProbability(mazeItemKey) {
            if (mazeItemKey === _ItemConstants.MazeItemKey.FRUIT) {
                return _FruitMazeItem2.default.getItemSpawnProbability(this.game);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.BRAIN) {
                return _BrainMazeItem2.default.getItemSpawnProbability(this.game);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.MULTIPLIER) {
                return 0;
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.BLACK_HOLE) {
                return _BlackHoleMazeItem2.default.getItemSpawnProbability(this.game);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.UNLIMITED_SPLITS) {
                return _UnlimitedSplitsItem2.default.getItemSpawnProbability();
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.GHOST) {
                return _GhostMazeItem2.default.getItemSpawnProbability();
            } else {
                console.error('Failed to create maze item of type.  No valid type: ' + mazeItemKey);
                return 0;
            }
        }
    }, {
        key: "getRandomlySpawnedMazeItemKey",
        value: function getRandomlySpawnedMazeItemKey() {
            var randomNumber = Math.random();
            var totalProb = 0;
            var unlockedMazeItemKeys = this.getAllUnlockedMazeItemKeys();
            // Spawn all items based on probability
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = unlockedMazeItemKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var mazeItemKey = _step.value;

                    totalProb += this.getMazeItemSpawnProbability(mazeItemKey);
                    if (randomNumber < totalProb) {
                        return mazeItemKey;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            _DestructibleWallUpgrade.DestructibleWallUpgrade.getDestructibleWallSpawnProbability(this.game);
            return null;
        }
    }, {
        key: "createMazeItem",
        value: function createMazeItem(tile, mazeItemKey) {
            var mazeItem = null;
            if (mazeItemKey === _ItemConstants.MazeItemKey.FRUIT) {
                mazeItem = new _FruitMazeItem2.default(this.game, tile, mazeItemKey);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.BRAIN) {
                mazeItem = new _BrainMazeItem2.default(this.game, tile, mazeItemKey);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.BLACK_HOLE) {
                mazeItem = new _BlackHoleMazeItem2.default(this.game, tile, mazeItemKey);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.UNLIMITED_SPLITS) {
                mazeItem = new _UnlimitedSplitsItem2.default(this.game, tile, mazeItemKey);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.GHOST) {
                mazeItem = new _GhostMazeItem2.default(this.game, tile, mazeItemKey);
            } else {
                console.error('Failed to create maze item of type.  No valid type: ' + mazeItemKey);
                return;
            }
            if (this.hasMazeItem(tile)) {
                console.error('Cannot create item. Tile is already occupied.');
                return;
            }
            // Apply item to grid cell
            var mazeCell = this.game.maze.getGrid().getCell(tile);
            if (mazeCell) {
                mazeCell.setMazeItem(mazeItem);
            }
        }
    }, {
        key: "getMazeItem",
        value: function getMazeItem(tile) {
            if (!this.hasMazeItem(tile)) return null;
            return this.game.maze.getGrid().getCell(tile).getMazeItem();
        }
    }, {
        key: "hasMazeItem",
        value: function hasMazeItem(tile) {
            var mazeCell = this.game.maze.getGrid().getCell(tile);
            return mazeCell != null && mazeCell.hasMazeItem();
        }
    }, {
        key: "drawItem",
        value: function drawItem(tile) {
            if (!this.hasMazeItem(tile)) return;
            this.getMazeItem(tile).drawItem();
        }
    }, {
        key: "pickupItem",
        value: function pickupItem(tile, playerId) {
            if (!tile || !this.hasMazeItem(tile)) return;
            var mazeCell = this.game.maze.getGrid().getCell(tile);
            if (mazeCell) {
                var mazeItem = mazeCell.getMazeItem();
                mazeItem.triggerPickup(playerId);
                mazeCell.deleteItem();
            }
        }
    }, {
        key: "generateMazeItems",
        value: function generateMazeItems() {
            var cellList = this.game.maze.getGrid().getAllCells();
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = cellList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var cell = _step2.value;

                    // Spawn items randomly
                    var mazeItemKey = this.getRandomlySpawnedMazeItemKey();
                    if (mazeItemKey) {
                        this.game.items.createMazeItem(cell.getTile(), mazeItemKey);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: "applyItemToAllBots",
        value: function applyItemToAllBots(mazeItem, playerId) {
            var playerIdList = this.game.players.getPlayerIdList().filter(function (pid) {
                return pid !== playerId;
            });
            // Apply item to as many bots as possible based on upgrade level.
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = playerIdList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var extraBotPlayerId = _step3.value;

                    mazeItem.triggerPickup(extraBotPlayerId);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }]);

    return MazeItemManager;
}();

},{"../constants/ItemConstants":5,"../items/definitions/BlackHoleMazeItem":11,"../items/definitions/BrainMazeItem":12,"../items/definitions/FruitMazeItem":13,"../items/definitions/GhostMazeItem":14,"../items/definitions/UnlimitedSplitsItem":15,"../upgrades/definitions/maze/DestructibleWallUpgrade":65}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MazeManager = exports.DEFAULT_PLAYER_ID = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MazeUtils = require("./MazeUtils");

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _Stats = require("../models/Stats");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_PLAYER_ID = exports.DEFAULT_PLAYER_ID = 0;
var MAX_SPLITS_POSSIBLE = 4;

var MazeManager = exports.MazeManager = function () {
    function MazeManager(game) {
        var isDevMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, MazeManager);

        this.game = game;
        this.isDevMode = isDevMode;
        this.maze = null;
        this.smartPathMaze = null;
        this.mazeId = 0;
    }

    _createClass(MazeManager, [{
        key: "getGrid",
        value: function getGrid() {
            return this.maze ? this.maze.grid : null;
        }
    }, {
        key: "getNextMazeSize",
        value: function getNextMazeSize() {
            return _MazeUtils.DEFAULT_MAZE_SIZE + this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.MAZE_SIZE_UPGRADE);
        }
    }, {
        key: "getMazeId",
        value: function getMazeId() {
            return this.mazeId;
        }
    }, {
        key: "newMaze",
        value: function newMaze() {
            this.mazeId++;
            var mazeSize = this.getNextMazeSize();
            this.maze = (0, _MazeUtils.generateMazeGridAndAlgorithm)(this.game, mazeSize);
            this.smartPathMaze = (0, _MazeUtils.generateMazeSmartPathingArr)(this.game, this.maze);
            this.game.items.generateMazeItems();
        }
    }, {
        key: "markVisited",
        value: function markVisited(tile, playerId) {
            var isTileVisited = this.getGrid().isVisited(tile);
            this.game.points.addVisitPoints(isTileVisited, playerId);
            if (isTileVisited) {
                this.game.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_TILES_REVISITED);
            } else {
                this.game.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_TILES_VISITED);
            }
            this.getGrid().setVisited(tile);
        }
    }, {
        key: "getSmartPathingDistanceFromExit",
        value: function getSmartPathingDistanceFromExit(tile) {
            return this.smartPathMaze[tile.y][tile.x];
        }
    }, {
        key: "setTileBackgroundColor",
        value: function setTileBackgroundColor(tile) {
            var isPlayer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var tileColor = this.getTileBackgroundColor(tile);
            var new_tile_key = (0, _MazeUtils.generateTileKey)(tile.x, tile.y);
            var border_radius_value = isPlayer ? "90%" : "0%";
            $("#" + new_tile_key).html("<div style=\"background-color:" + tileColor + "; border-radius: " + border_radius_value + ";-moz-border-radius: " + border_radius_value + "; width: 100%; height: 100%; z-index: -1\"></div>");
            $("#" + new_tile_key).css("background-color", this.game.colors.getVisitedTileColor());
        }
    }, {
        key: "spawnSplitBot",
        value: function spawnSplitBot(player, dirArr) {
            var currMazeId = this.game.maze.getMazeId();
            var currTile = this.game.players.getCurrTile(player.id);
            for (var i = 0; i < dirArr.length; i++) {
                // Player must move first to accommodate enforced movement.
                // Enforced movement will be first index of tile vectors
                if (i === 0) {
                    // Move the original bot
                    this.game.players.movePlayer(player.id, dirArr[i]);
                    continue;
                }
                // Spawn new split bot in the new tile
                var newTile = (0, _MazeUtils.getNewTilePositionByVector)(currTile, dirArr[i]);
                var newPlayer = this.game.players.createNewPlayerObj(newTile, currMazeId);
                if (newPlayer) {
                    this.game.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_NUMBER_OF_BOT_SPLITS);
                    newPlayer.setIsUnlimitedSplitItemActive(player.isUnlimitedSplitItemActive());
                }
            }
        }
        //TODO: move to colormanager

    }, {
        key: "getTileBackgroundColor",
        value: function getTileBackgroundColor(tile) {
            // Check for a player in the tile
            var playerColor = this.game.players.getPlayerColorAtTile(tile);
            if (playerColor != null) {
                return playerColor;
            }
            if (this.maze.grid.getCell(tile).isMarkedAsDeadEnd()) {
                return this.game.colors.getDeadEndTileColor();
            }
            if (this.getGrid().isVisited(tile)) {
                return this.game.colors.getVisitedTileColor();
            }
            return this.game.colors.getTileColor();
        }
    }, {
        key: "updatePlayerTileByTileVector",
        value: function updatePlayerTileByTileVector(playerId, dirVector) {
            var playerCurrTile = this.game.players.getCurrTile(playerId);
            var newTile = (0, _MazeUtils.getNewTilePositionByVector)(playerCurrTile, dirVector);
            this.updatePlayerTile(playerId, newTile);
        }
    }, {
        key: "updatePlayerTile",
        value: function updatePlayerTile(playerId, newTile) {
            var player = this.game.players.getPlayer(playerId);
            if (this.getGrid().isMazeExitTile(newTile)) {
                this.game.completeMaze(playerId);
                return;
            }
            // Clear destructible tiles after they move away from the tile
            this.clearDestructibleTilesFromTile(player.currTile);
            player.prevTile = { x: player.currTile.x, y: player.currTile.y };
            player.currTile = { x: newTile.x, y: newTile.y };
            this.markVisited(newTile, playerId);
            this.updateDeadEndTileValue(newTile);
            this.updatePlayerDeadEndPathing(playerId);
            this.setTileBackgroundColor(player.prevTile);
            this.setTileBackgroundColor(newTile, true);
            // Pick up items if any are on the tile
            this.game.items.pickupItem(newTile, playerId);
            this.handlePlayerMerges(newTile);
        }
    }, {
        key: "handlePlayerMerges",
        value: function handlePlayerMerges(tile) {
            if (!this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE)) return;
            // Assume only two possible players on a single tile since they all move one at a time
            var playerIdsAtTileArr = this.game.players.getPlayerIdsAtTile(tile);
            if (playerIdsAtTileArr.length <= 1) return;
            if (playerIdsAtTileArr.length > 2) {
                console.error("False assumption about max number of players per tile: " + playerIdsAtTileArr.length);
                return;
            }
            var player1 = this.game.players.getPlayer(playerIdsAtTileArr[0]);
            var player2 = this.game.players.getPlayer(playerIdsAtTileArr[1]);
            var playerToMerge = this.pickPlayerToMerge(player1, player2);
            var playerToLive = playerToMerge === player1 ? player2 : player1;
            if (!playerToMerge) return;
            // Pass along any bot passives.
            playerToLive.mergePlayerPassives(playerToMerge);
            this.game.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_NUMBER_OF_BOT_MERGES);
            this.game.players.deletePlayer(playerToMerge.id);
        }
    }, {
        key: "pickPlayerToMerge",
        value: function pickPlayerToMerge(player1, player2) {
            if (!player1 || !player2) return null;
            // Manual controlled players don't merge
            if (player1.isManuallyControlled) return player2;
            if (player2.isManuallyControlled) return player1;
            if (this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.BOT_SMART_MERGE)) {
                // If a player is coming from a dead end, don't merge them
                if (player1.isPathingFromDeadEnd()) {
                    return player2;
                } else if (player2.isPathingFromDeadEnd()) {
                    return player1;
                }
            }
            return player1;
        }
    }, {
        key: "clearDestructibleTilesFromTile",
        value: function clearDestructibleTilesFromTile(tile) {
            this.clearDestructibleTileByVector(tile, _MazeUtils.DIRECTION_UP, _MazeUtils.MazeDirectionIndex.UP);
            this.clearDestructibleTileByVector(tile, _MazeUtils.DIRECTION_DOWN, _MazeUtils.MazeDirectionIndex.DOWN);
            this.clearDestructibleTileByVector(tile, _MazeUtils.DIRECTION_LEFT, _MazeUtils.MazeDirectionIndex.LEFT);
            this.clearDestructibleTileByVector(tile, _MazeUtils.DIRECTION_RIGHT, _MazeUtils.MazeDirectionIndex.RIGHT);
        }
    }, {
        key: "clearDestructibleTileByVector",
        value: function clearDestructibleTileByVector(tile, direction, mazeDirectionIndex) {
            var neighborTile = (0, _MazeUtils.getNewTilePositionByVector)(tile, direction);
            if (!this.maze.grid.isValidTile(neighborTile)) return;
            // Neighbor has inverse direction
            var neighborDirectionIndex = (0, _MazeUtils.getInverseDirectionIndex)(mazeDirectionIndex);
            if (this.getGrid().getCellWallType(tile, mazeDirectionIndex) === _MazeUtils.MazeWallTypes.DESTRUCTIBLE_WALL && this.getGrid().getCellWallType(neighborTile, neighborDirectionIndex) === _MazeUtils.MazeWallTypes.DESTRUCTIBLE_WALL) {
                this.maze.getCell(tile).setWallTypeAtIndex(mazeDirectionIndex, _MazeUtils.MazeWallTypes.NO_WALL);
                this.maze.getCell(neighborTile).setWallTypeAtIndex(neighborDirectionIndex, _MazeUtils.MazeWallTypes.NO_WALL);
                // Update the UI with the new tile border css.
                this.game.ui.setTileCssV2(this.maze, tile);
                this.game.ui.setTileCssV2(this.maze, neighborTile);
            }
        }
    }, {
        key: "canMove",
        value: function canMove(tile, dirVector) {
            var isExcludeExit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var isIgnoreDestructibleWalls = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            var isIgnoreWalls = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

            var newTile = (0, _MazeUtils.getNewTilePositionByVector)(tile, dirVector);
            // Check if maze exit and is valid tile
            if (this.getGrid().isMazeExitTile(newTile) && !isExcludeExit) return true;
            if (!this.maze.grid.isValidTile(newTile)) return false;
            if (isIgnoreWalls) return true;
            var tileVal = null;
            // Check for walls in current tile in each direction
            if (dirVector === _MazeUtils.DIRECTION_UP) {
                tileVal = this.getGrid().getCellWallType(tile, _MazeUtils.MazeDirectionIndex.UP);
            } else if (dirVector === _MazeUtils.DIRECTION_DOWN) {
                tileVal = this.getGrid().getCellWallType(tile, _MazeUtils.MazeDirectionIndex.DOWN);
            } else if (dirVector === _MazeUtils.DIRECTION_LEFT) {
                tileVal = this.getGrid().getCellWallType(tile, _MazeUtils.MazeDirectionIndex.LEFT);
            } else if (dirVector === _MazeUtils.DIRECTION_RIGHT) {
                tileVal = this.getGrid().getCellWallType(tile, _MazeUtils.MazeDirectionIndex.RIGHT);
            }
            return tileVal === _MazeUtils.MazeWallTypes.NO_WALL || isIgnoreDestructibleWalls && tileVal === _MazeUtils.MazeWallTypes.DESTRUCTIBLE_WALL;
        }
    }, {
        key: "getPossibleSplitBotCount",
        value: function getPossibleSplitBotCount(validDirCount, player) {
            if (validDirCount <= 1) {
                return 0;
            }
            if (player && player.isUnlimitedSplitItemActive()) {
                return Math.min(validDirCount, MAX_SPLITS_POSSIBLE);
            }
            // Total bots active
            var shouldIgnoreManualPlayer = this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.PLAYER_MOVE_INDEPENDENTLY);
            var rngBotCount = this.game.players.getPlayerCount(shouldIgnoreManualPlayer);
            var splitUpgradeCount = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_SPLIT_DIRECTION);
            // One bot auto-allowed, and +1 extra bot allowed per upgrade
            var allowedSplits = Math.max(0, splitUpgradeCount + 1 - rngBotCount);
            return Math.min(validDirCount, allowedSplits);
        }
    }, {
        key: "teleportPlayerBackToBot",
        value: function teleportPlayerBackToBot() {
            var manualPlayer = this.game.players.getManuallyControlledPlayer();
            var primaryBot = this.game.players.getFirstAutoBot();
            if (!manualPlayer || !primaryBot) return;
            // Move player and delete the bot.
            this.updatePlayerTile(manualPlayer.id, primaryBot.currTile);
            this.game.players.deletePlayer(primaryBot.id);
        }
    }, {
        key: "teleportBotBackToPlayer",
        value: function teleportBotBackToPlayer() {
            var manualPlayer = this.game.players.getManuallyControlledPlayer();
            var primaryBot = this.game.players.getFirstAutoBot();
            if (!manualPlayer || !primaryBot) return;
            // Move player and delete the bot.
            this.updatePlayerTile(primaryBot.id, manualPlayer.currTile);
            this.game.players.deletePlayer(primaryBot.id);
        }
    }, {
        key: "getValidDirectionsByPlayerId",
        value: function getValidDirectionsByPlayerId(playerId) {
            var player = this.game.players.getPlayer(playerId);
            return this.getValidDirectionsByTile(player.currTile, player.isGhostItemActive());
        }
    }, {
        key: "getValidDirectionsByTile",
        value: function getValidDirectionsByTile(tile) {
            var _this = this;

            var isIgnoreWalls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var isIncludeDestructible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            return _MazeUtils.DIRECTIONS_ARR.filter(function (dir) {
                return _this.canMove(tile, dir, false, isIncludeDestructible, isIgnoreWalls);
            });
        }
    }, {
        key: "getDeadEndValue",
        value: function getDeadEndValue(tile, validDirsArr) {
            var _this2 = this;

            var upgradeCount = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES);
            var deadEndCount = 0,
                deadEndMaxVal = 0;
            // Count dead ends from valid dirs
            validDirsArr.forEach(function (dir) {
                var newTile = (0, _MazeUtils.getNewTilePositionByVector)(tile, dir);
                var cell = _this2.getGrid().getCell(newTile);
                if (cell && cell.isMarkedAsDeadEnd()) {
                    deadEndCount++;
                    deadEndMaxVal = Math.max(cell.getDeadEndCelLValue(), deadEndMaxVal);
                }
            });
            // All but one are deadends -- return the max value if within upgrade limit
            if (deadEndCount === validDirsArr.length - 1 && deadEndMaxVal < upgradeCount) {
                return deadEndMaxVal + 1;
            }
            return null;
        }
    }, {
        key: "updateDeadEndTileValue",
        value: function updateDeadEndTileValue(tile) {
            var upgradeCount = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES);
            if (upgradeCount === 0) {
                return;
            }
            var validDirsArr = this.getValidDirectionsByTile(tile, false, true);
            if (validDirsArr.length === 1) {
                this.game.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_NUMBER_DEAD_ENDS_MARKED);
                var cell = this.getGrid().getCell(tile);
                if (cell) {
                    cell.setDeadEndCellValue(1);
                }
                return;
            }
            var deadEndDistance = this.getDeadEndValue(tile, validDirsArr);
            if (deadEndDistance != null) {
                this.game.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_NUMBER_DEAD_ENDS_MARKED);
                var _cell = this.getGrid().getCell(tile);
                if (_cell) {
                    _cell.setDeadEndCellValue(deadEndDistance);
                }
            }
        }
    }, {
        key: "filterPlayerExitMazeDirection",
        value: function filterPlayerExitMazeDirection(playerId, validDirs) {
            var _this3 = this;

            if (!this.game.players.playerExists(playerId)) return null;
            var currTile = this.game.players.getPlayer(playerId).currTile;
            var currDistance = this.getSmartPathingDistanceFromExit(currTile);
            // Find best direction
            var exitMazeDir = validDirs.find(function (dir) {
                var newTile = (0, _MazeUtils.getNewTilePositionByVector)(currTile, dir);
                // Exit tile or one step closer to exit. If distance 1, MUST be exit tile.
                return _this3.getGrid().isMazeExitTile(newTile) || currDistance !== 1 && _this3.maze.grid.isValidTile(newTile) && _this3.getSmartPathingDistanceFromExit(newTile) === currDistance - 1;
            });
            // This will happen for "luck" because the "expected" directions will not always include the exit pathway
            if (exitMazeDir == null) {
                return null;
            }
            return exitMazeDir;
        }
    }, {
        key: "filterAvoidRevisitLastPosition",
        value: function filterAvoidRevisitLastPosition(playerId, validDirs) {
            var _this4 = this;

            if (!this.game.players.playerExists(playerId)) return;
            // Find any tiles that are not the previous tile.
            var noRevisitDirsArr = validDirs.filter(function (dir) {
                var previousTile = _this4.game.players.getPreviousTile(playerId);
                var newTile = (0, _MazeUtils.getNewTilePositionByVector)(_this4.game.players.getCurrTile(playerId), dir);
                return !(0, _MazeUtils.isTileEqual)(newTile, previousTile);
            });
            return noRevisitDirsArr;
        }
    }, {
        key: "prioritizeUnvisitedDirection",
        value: function prioritizeUnvisitedDirection(playerId, validDirs) {
            var _this5 = this;

            if (!this.game.players.playerExists(playerId)) return [];
            // Find any unvisited tiles within reach.
            var unvisitedDirsArr = validDirs.filter(function (dir) {
                var newTile = (0, _MazeUtils.getNewTilePositionByVector)(_this5.game.players.getCurrTile(playerId), dir);
                return !_this5.getGrid().isVisited(newTile);
            });
            return unvisitedDirsArr;
        }
    }, {
        key: "filterDeadEndTiles",
        value: function filterDeadEndTiles(playerId, validDirs) {
            var _this6 = this;

            if (!this.game.players.playerExists(playerId)) return [];
            var nonDeadEndTiles = validDirs.filter(function (dir) {
                var newTile = (0, _MazeUtils.getNewTilePositionByVector)(_this6.game.players.getCurrTile(playerId), dir);
                var cell = _this6.maze.grid.getCell(newTile);
                //TODO: this is pretty hacky. Exit cells are not actually part of the grid.
                return cell ? !cell.isMarkedAsDeadEnd() : true;
            });
            return nonDeadEndTiles;
        }
    }, {
        key: "getTotalPossiblePaths",
        value: function getTotalPossiblePaths(playerId) {
            if (!this.game.players.playerMap.has(playerId)) return 0;
            var tile = this.game.players.getPlayer(playerId).currTile;
            // Test if there are more than 1 valid directions (assuming pre-visited)
            var validDirs = this.getValidDirectionsByTile(tile, false, true);
            // Filter out dead ends
            if (this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES) >= 1) {
                var filteredDirs = this.game.maze.filterDeadEndTiles(playerId, validDirs);
                validDirs = filteredDirs;
            }
            return validDirs.length;
        }
        // Dead end pathing is for smart merging purposes.
        // Allows us to keep track if player is moving away from a dead end and prioritizes that player during merges.

    }, {
        key: "updatePlayerDeadEndPathing",
        value: function updatePlayerDeadEndPathing(playerId) {
            var player = this.game.players.getPlayer(playerId);
            if (!player) return;
            var isPathingFromDeadEnd = player.isPathingFromDeadEnd();
            var totalPossiblePaths = this.getTotalPossiblePaths(playerId);
            // If only single path (excluding dead-end markings), must be dead end.
            if (totalPossiblePaths === 1) {
                player.setIsPathingFromDeadEnd(true);
            }
            // If more than forward/back direction, not a dead end anymore!
            if (totalPossiblePaths > 2) {
                player.setIsPathingFromDeadEnd(false);
            }
        }
    }]);

    return MazeManager;
}();

},{"../constants/UpgradeConstants":7,"../models/Stats":46,"./MazeUtils":21}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getExitDirectionByGridLocation = exports.getGridCellByLocation = exports.GridLocation = exports.generateMazeSmartPathingArr = exports.generateMazeArr = exports.getCellNeighborDirectionIndex = exports.getCellNeighborTileVector = exports.getTileFromTileKey = exports.generateTileKey = exports.isTileEqual = exports.getNewTilePositionByVector = exports.getRandomInteger = exports.getRandomMazeTile = exports.getInverseTileVector = exports.getInverseDirectionIndex = exports.getMazeDirectionIndexFromTileVector = exports.getTileVectorFromMazeDirectionIndex = exports.generateMazeGridAndAlgorithm = exports.DEFAULT_MAZE_SIZE = exports.STARTING_POSITION = exports.DIRECTIONS_ARR = exports.DIRECTION_RIGHT = exports.DIRECTION_LEFT = exports.DIRECTION_DOWN = exports.DIRECTION_UP = exports.MazeWallTypes = exports.MazeDirectionIndex = exports.MazeGridType = exports.MazeAlgorithmType = exports.DEFAULT_TILE_WIDTH_CSS = undefined;

var _BiomeConstants = require("../constants/BiomeConstants");

var _BackTrackerMaze = require("../maze/BackTrackerMaze");

var _BinaryTreeMaze = require("../maze/BinaryTreeMaze");

var _PrimsMaze = require("../maze/PrimsMaze");

var DEFAULT_TILE_WIDTH_CSS = exports.DEFAULT_TILE_WIDTH_CSS = '20px';
var MazeAlgorithmType = exports.MazeAlgorithmType = undefined;
(function (MazeAlgorithmType) {
    MazeAlgorithmType["BACK_TRACKER"] = "BACK_TRACKER";
    MazeAlgorithmType["BINARY_TREE"] = "BINARY_TREE";
    MazeAlgorithmType["PRIMS"] = "PRIMS";
})(MazeAlgorithmType || (exports.MazeAlgorithmType = MazeAlgorithmType = {}));
var MazeGridType = exports.MazeGridType = undefined;
(function (MazeGridType) {
    MazeGridType["SQUARE"] = "SQUARE";
    MazeGridType["RECTANGLE"] = "RECTANGLE";
    MazeGridType["PLUS_SIGN"] = "PLUS_SIGN";
    MazeGridType["DIAMOND"] = "DIAMOND";
})(MazeGridType || (exports.MazeGridType = MazeGridType = {}));
var MazeDirectionIndex = exports.MazeDirectionIndex = undefined;
(function (MazeDirectionIndex) {
    MazeDirectionIndex[MazeDirectionIndex["UP"] = 0] = "UP";
    MazeDirectionIndex[MazeDirectionIndex["RIGHT"] = 1] = "RIGHT";
    MazeDirectionIndex[MazeDirectionIndex["DOWN"] = 2] = "DOWN";
    MazeDirectionIndex[MazeDirectionIndex["LEFT"] = 3] = "LEFT";
})(MazeDirectionIndex || (exports.MazeDirectionIndex = MazeDirectionIndex = {}));
var MazeWallTypes = exports.MazeWallTypes = undefined;
(function (MazeWallTypes) {
    MazeWallTypes[MazeWallTypes["WALL"] = 0] = "WALL";
    MazeWallTypes[MazeWallTypes["NO_WALL"] = 1] = "NO_WALL";
    MazeWallTypes[MazeWallTypes["DESTRUCTIBLE_WALL"] = 2] = "DESTRUCTIBLE_WALL";
    MazeWallTypes[MazeWallTypes["OUT_OF_BOUNDS_WALL"] = 3] = "OUT_OF_BOUNDS_WALL";
})(MazeWallTypes || (exports.MazeWallTypes = MazeWallTypes = {}));
var DIRECTION_UP = exports.DIRECTION_UP = { x: 0, y: -1 };
var DIRECTION_DOWN = exports.DIRECTION_DOWN = { x: 0, y: 1 };
var DIRECTION_LEFT = exports.DIRECTION_LEFT = { x: -1, y: 0 };
var DIRECTION_RIGHT = exports.DIRECTION_RIGHT = { x: 1, y: 0 };
var DIRECTIONS_ARR = exports.DIRECTIONS_ARR = [DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT];
var STARTING_POSITION = exports.STARTING_POSITION = { x: 0, y: 0 };
var DEFAULT_MAZE_SIZE = exports.DEFAULT_MAZE_SIZE = 4;
var generateMazeGridAndAlgorithm = exports.generateMazeGridAndAlgorithm = function generateMazeGridAndAlgorithm(game, mazeSize) {
    var biomeKey = game.biomes.getCurrentBiomeKey();
    var mazeGridType = (0, _BiomeConstants.getMazeGridByBiome)(biomeKey);
    var mazeAlgorithmType = (0, _BiomeConstants.getMazeAlgorithmTypeByBiome)(biomeKey);
    if (mazeAlgorithmType === MazeAlgorithmType.PRIMS) {
        return new _PrimsMaze.PrimsMaze(game, mazeSize, mazeGridType);
    } else if (mazeAlgorithmType === MazeAlgorithmType.BACK_TRACKER) {
        return new _BackTrackerMaze.BacktrackerMaze(game, mazeSize, mazeGridType);
    } else if (mazeAlgorithmType === MazeAlgorithmType.BINARY_TREE) {
        return new _BinaryTreeMaze.BinaryTreeMaze(game, mazeSize, mazeGridType);
    } else {
        throw "Invalid maze algorithm type: " + mazeAlgorithmType;
    }
};
var getTileVectorFromMazeDirectionIndex = exports.getTileVectorFromMazeDirectionIndex = function getTileVectorFromMazeDirectionIndex(mazeDirIndex) {
    if (mazeDirIndex === MazeDirectionIndex.UP) {
        return DIRECTION_UP;
    } else if (mazeDirIndex === MazeDirectionIndex.DOWN) {
        return DIRECTION_DOWN;
    }
    if (mazeDirIndex === MazeDirectionIndex.LEFT) {
        return DIRECTION_LEFT;
    }
    if (mazeDirIndex === MazeDirectionIndex.RIGHT) {
        return DIRECTION_RIGHT;
    }
    return null;
};
var getMazeDirectionIndexFromTileVector = exports.getMazeDirectionIndexFromTileVector = function getMazeDirectionIndexFromTileVector(tileVector) {
    if (isTileEqual(tileVector, DIRECTION_UP)) {
        return MazeDirectionIndex.UP;
    } else if (isTileEqual(tileVector, DIRECTION_DOWN)) {
        return MazeDirectionIndex.DOWN;
    }
    if (isTileEqual(tileVector, DIRECTION_LEFT)) {
        return MazeDirectionIndex.LEFT;
    }
    if (isTileEqual(tileVector, DIRECTION_RIGHT)) {
        return MazeDirectionIndex.RIGHT;
    }
    console.error("Invalid tile vector being converted to direction index: " + tileVector.x + "," + tileVector.y);
    return null;
};
var getInverseDirectionIndex = exports.getInverseDirectionIndex = function getInverseDirectionIndex(mazeDirIndex) {
    if (mazeDirIndex === MazeDirectionIndex.UP) {
        return MazeDirectionIndex.DOWN;
    } else if (mazeDirIndex === MazeDirectionIndex.DOWN) {
        return MazeDirectionIndex.UP;
    } else if (mazeDirIndex === MazeDirectionIndex.LEFT) {
        return MazeDirectionIndex.RIGHT;
    } else if (mazeDirIndex === MazeDirectionIndex.RIGHT) {
        return MazeDirectionIndex.LEFT;
    }
    return null;
};
var getInverseTileVector = exports.getInverseTileVector = function getInverseTileVector(tileVector) {
    return { x: -tileVector.x, y: -tileVector.y };
};
var getRandomMazeTile = exports.getRandomMazeTile = function getRandomMazeTile(game) {
    var cellList = game.maze.getGrid().getAllCells();
    var randomIndex = getRandomInteger(0, cellList.length - 1);
    return cellList[randomIndex].getTile();
};
var getRandomInteger = exports.getRandomInteger = function getRandomInteger(min, max) {
    if (min === max) return max;
    return Math.floor(Math.random() * (max - min + 1) + min);
};
var getNewTilePositionByVector = exports.getNewTilePositionByVector = function getNewTilePositionByVector(tile, vector) {
    return { x: tile.x + vector.x, y: tile.y + vector.y };
};
var isTileEqual = exports.isTileEqual = function isTileEqual(tile1, tile2) {
    return tile1.x === tile2.x && tile1.y === tile2.y;
};
var generateTileKey = exports.generateTileKey = function generateTileKey(x, y) {
    return x + "-" + y;
};
var getTileFromTileKey = exports.getTileFromTileKey = function getTileFromTileKey(tileKey) {
    var keys = tileKey.split('-');
    return { x: parseInt(keys[0]), y: parseInt(keys[1]) };
};
var getCellNeighborTileVector = exports.getCellNeighborTileVector = function getCellNeighborTileVector(startCell, endCell) {
    // Assumption: these are actually neighboring cells
    var cellDiff = { x: endCell.x - startCell.x, y: endCell.y - startCell.y };
    return cellDiff;
};
var getCellNeighborDirectionIndex = exports.getCellNeighborDirectionIndex = function getCellNeighborDirectionIndex(startCell, endCell) {
    var tileVector = getCellNeighborTileVector(startCell, endCell);
    return getMazeDirectionIndexFromTileVector(tileVector);
};
var generateMazeArr = exports.generateMazeArr = function generateMazeArr(x, y, defaultValue) {
    var mazeArr = new Array();
    for (var i = 0; i < y; i++) {
        mazeArr[i] = new Array();
        for (var j = 0; j < x; j++) {
            mazeArr[i][j] = defaultValue;
        }
    }
    return mazeArr;
};
// Generates a maze with a number in each position representing the distance from exit using optimal pathing.
var generateMazeSmartPathingArr = exports.generateMazeSmartPathingArr = function generateMazeSmartPathingArr(game, maze) {
    var smartPathArr = generateMazeArr(maze.grid.sizeX, maze.grid.sizeY, 0);
    //TODO: figure out how to handle exit tile better
    var lastTile = maze.grid.internalExitTile;
    // Mark first tile visited first -- canMove() cannot handle starting outside of the maze (ie. exit point).
    smartPathArr[lastTile.y][lastTile.x] = 1;
    var tileQueue = [lastTile];
    var stepCount = 2;
    // BFS iteration
    while (tileQueue.length > 0) {
        var loopSize = tileQueue.length;
        // One step in all directions for each tile
        for (var i = 0; i < loopSize; i++) {
            var tile = tileQueue.shift();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = DIRECTIONS_ARR[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var dir = _step.value;

                    // Only test valid directions (ie. non-wall, etc.)
                    //TODO: this needs to handle destructible walls
                    if (game.maze.canMove(tile, dir, true, true)) {
                        var newTile = getNewTilePositionByVector(tile, dir);
                        // Don't revisit tiles
                        if (smartPathArr[newTile.y][newTile.x] === 0) {
                            smartPathArr[newTile.y][newTile.x] = stepCount;
                            tileQueue.push(newTile);
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        stepCount++;
    }
    return smartPathArr;
};
var GridLocation = exports.GridLocation = undefined;
(function (GridLocation) {
    GridLocation["TOP_LEFT"] = "TOP_LEFT";
    GridLocation["TOP_MIDDLE"] = "TOP_MIDDLE";
    GridLocation["TOP_RIGHT"] = "TOP_RIGHT";
    GridLocation["BOTTOM_LEFT"] = "BOTTOM_LEFT";
    GridLocation["BOTTOM_MIDDLE"] = "BOTTOM_MIDDLE";
    GridLocation["BOTTOM_RIGHT"] = "BOTTOM_RIGHT";
    GridLocation["MIDDLE_LEFT"] = "MIDDLE_LEFT";
    GridLocation["MIDDLE_RIGHT"] = "MIDDLE_RIGHT";
    GridLocation["MIDDLE_MIDDLE"] = "MIDDLE_MIDDLE";
})(GridLocation || (exports.GridLocation = GridLocation = {}));
var getGridCellByLocation = exports.getGridCellByLocation = function getGridCellByLocation(grid, gridLocation) {
    var maxX = grid.sizeX - 1,
        maxY = grid.sizeY - 1;
    var minX = 0,
        minY = 0;
    if (gridLocation == GridLocation.TOP_LEFT) {
        return grid.getCell({ x: minX, y: minY });
    } else if (gridLocation == GridLocation.TOP_RIGHT) {
        return grid.getCell({ x: maxX, y: minY });
    } else if (gridLocation == GridLocation.BOTTOM_LEFT) {
        return grid.getCell({ x: minX, y: maxY });
    } else if (gridLocation == GridLocation.BOTTOM_RIGHT) {
        return grid.getCell({ x: maxX, y: maxY });
    } else if (gridLocation == GridLocation.TOP_MIDDLE) {
        return grid.getCell({ x: getMiddle(maxX), y: minY });
    } else if (gridLocation == GridLocation.BOTTOM_MIDDLE) {
        return grid.getCell({ x: getMiddle(maxX), y: maxY });
    } else if (gridLocation == GridLocation.MIDDLE_LEFT) {
        return grid.getCell({ x: minX, y: getMiddle(maxY) });
    } else if (gridLocation == GridLocation.MIDDLE_RIGHT) {
        return grid.getCell({ x: maxX, y: getMiddle(maxY) });
    } else if (gridLocation == GridLocation.MIDDLE_MIDDLE) {
        return grid.getCell({ x: getMiddle(maxX), y: getMiddle(maxY) });
    }
    console.error('Invalid GridLocation: ', gridLocation);
    return null;
};
var getMiddle = function getMiddle(end) {
    return Math.floor(end / 2);
};
var getExitDirectionByGridLocation = exports.getExitDirectionByGridLocation = function getExitDirectionByGridLocation(gridLocation) {
    if (gridLocation == GridLocation.TOP_LEFT) {
        return DIRECTION_LEFT;
    } else if (gridLocation == GridLocation.TOP_RIGHT) {
        return DIRECTION_RIGHT;
    } else if (gridLocation == GridLocation.BOTTOM_LEFT) {
        return DIRECTION_LEFT;
    } else if (gridLocation == GridLocation.BOTTOM_RIGHT) {
        return DIRECTION_RIGHT;
    } else if (gridLocation == GridLocation.TOP_MIDDLE) {
        return DIRECTION_UP;
    } else if (gridLocation == GridLocation.BOTTOM_MIDDLE) {
        return DIRECTION_DOWN;
    } else if (gridLocation == GridLocation.MIDDLE_LEFT) {
        return DIRECTION_LEFT;
    } else if (gridLocation == GridLocation.MIDDLE_RIGHT) {
        return DIRECTION_RIGHT;
    } else if (gridLocation == GridLocation.MIDDLE_MIDDLE) {
        return null;
    }
    console.error('Invalid GridLocation exit: ', gridLocation);
    return null;
};

},{"../constants/BiomeConstants":2,"../maze/BackTrackerMaze":35,"../maze/BinaryTreeMaze":36,"../maze/PrimsMaze":37}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OfflineManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Serializable2 = require("../models/Serializable");

var _Stats = require("../models/Stats");

var _UserInterface = require("./UserInterface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SERIALIZABLE_PROPERTIES = ['saveTimeStamp', 'offlinePointsPerSecond'];
var MAX_OFFLINE_TIME_IN_MS = 60 * 60 * 1000;
var MIN_TIME_FOR_BANNER_MS = 30000;

var OfflineManager = exports.OfflineManager = function (_Serializable) {
    _inherits(OfflineManager, _Serializable);

    function OfflineManager(game) {
        _classCallCheck(this, OfflineManager);

        var _this = _possibleConstructorReturn(this, (OfflineManager.__proto__ || Object.getPrototypeOf(OfflineManager)).call(this, SERIALIZABLE_PROPERTIES));

        _this.game = game;
        return _this;
    }

    _createClass(OfflineManager, [{
        key: "processOfflinePoints",
        value: function processOfflinePoints() {
            var offlinePointsEarned = this.calculateOfflinePoints();
            // Ignore points history
            this.game.points.addPoints(offlinePointsEarned, null, null, true);
            if (this.shouldShowOfflineModal()) {
                this.game.ui.showModalByType(_UserInterface.ModalType.OFFLINE_SCORE_MODAL);
            }
        }
    }, {
        key: "shouldShowOfflineModal",
        value: function shouldShowOfflineModal() {
            var offlineTimeDiffInMs = this.getUTCTimeStampInMs() - this.saveTimeStamp;
            return offlineTimeDiffInMs > MIN_TIME_FOR_BANNER_MS;
        }
    }, {
        key: "calculateOfflinePoints",
        value: function calculateOfflinePoints() {
            var offlineTimeDiffInMs = this.getUTCTimeStampInMs() - this.saveTimeStamp;
            var allowedOfflineTimeInMs = Math.min(offlineTimeDiffInMs, MAX_OFFLINE_TIME_IN_MS);
            var offlinePointsEarned = this.offlinePointsPerSecond * (allowedOfflineTimeInMs / 1000);
            this.updateOfflineModal(offlineTimeDiffInMs, allowedOfflineTimeInMs, this.offlinePointsPerSecond, offlinePointsEarned);
            return offlinePointsEarned;
        }
    }, {
        key: "updateOfflineModal",
        value: function updateOfflineModal(totalDurationInMs, allowedOfflineTimeInMs, offlinePointsPerSec, offlinePointsEarned) {
            $("#offlineModalDuration").text(_UserInterface.UserInterface.getPrettyPrintNumber(totalDurationInMs / 1000));
            $("#offlineModalMaxOfflineTime").text(_UserInterface.UserInterface.getPrettyPrintNumber(allowedOfflineTimeInMs / 1000));
            $("#offlineModalPointsPerSecond").text(_UserInterface.UserInterface.getPrettyPrintNumber(offlinePointsPerSec));
            $("#offlineModalPointsEarned").text(_UserInterface.UserInterface.getPrettyPrintNumber(offlinePointsEarned));
        }
    }, {
        key: "getUTCTimeStampInMs",
        value: function getUTCTimeStampInMs() {
            return Math.floor(new Date().getTime());
        }
    }, {
        key: "serialize",
        value: function serialize() {
            // Always update timestamp before saving
            this.saveTimeStamp = this.getUTCTimeStampInMs();
            this.offlinePointsPerSecond = this.game.stats.getStat(_Stats.StatsKey.AVERAGE_POINTS_EARNED_PER_SECOND);
            return _get(OfflineManager.prototype.__proto__ || Object.getPrototypeOf(OfflineManager.prototype), "serialize", this).call(this);
        }
    }]);

    return OfflineManager;
}(_Serializable2.Serializable);

},{"../models/Serializable":45,"../models/Stats":46,"./UserInterface":30}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlayerManager = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _MazeUtils = require("./MazeUtils");

var _Player = require("../models/Player");

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerManager = exports.PlayerManager = function () {
    function PlayerManager(game) {
        _classCallCheck(this, PlayerManager);

        this.game = game;
        this.playerMap = new Map();
    }

    _createClass(PlayerManager, [{
        key: "resetAllPlayers",
        value: function resetAllPlayers() {
            this.playerMap.clear();
        }
    }, {
        key: "createDefaultPlayer",
        value: function createDefaultPlayer() {
            this.createNewPlayerObj(this.game.maze.getGrid().internalStartTile, this.game.maze.getMazeId());
        }
    }, {
        key: "createNewPlayerObj",
        value: function createNewPlayerObj(startTile, expectedMazeId) {
            // Ensure spawning is done on the expected maze id
            if (expectedMazeId && expectedMazeId !== this.game.maze.getMazeId()) {
                return;
            }
            var newPlayer = new _Player2.default(this.game, this.getNewPlayerId(), startTile, startTile);
            this.playerMap.set(newPlayer.id, newPlayer);
            this.game.maze.updatePlayerTile(newPlayer.id, startTile);
            return newPlayer;
        }
    }, {
        key: "getManuallyControlledPlayer",
        value: function getManuallyControlledPlayer() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.playerMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        id = _step$value[0],
                        player = _step$value[1];

                    if (player.isManuallyControlled) {
                        return player;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return null;
        }
    }, {
        key: "getPlayerOrDefaultBotId",
        value: function getPlayerOrDefaultBotId() {
            var manualPlayer = this.getManuallyControlledPlayer();
            return manualPlayer ? manualPlayer.id : this.getFirstAutoBotId();
        }
    }, {
        key: "getIsPlayerManuallyControlling",
        value: function getIsPlayerManuallyControlling() {
            return this.getManuallyControlledPlayer() == null ? false : true;
        }
    }, {
        key: "getPlayerCount",
        value: function getPlayerCount() {
            var isExcludeManualControl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            // If manual controlling, don't count
            return this.playerMap.size - (isExcludeManualControl && this.getIsPlayerManuallyControlling() ? 1 : 0);
        }
    }, {
        key: "isAutoBotPresent",
        value: function isAutoBotPresent() {
            // Check if any non-manual controlled 
            return this.getFirstAutoBot() != null;
        }
    }, {
        key: "getFirstAutoBot",
        value: function getFirstAutoBot() {
            // Find first bot that is not manually controlled
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.playerMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2),
                        id = _step2$value[0],
                        player = _step2$value[1];

                    if (!player.isManuallyControlled) {
                        return player;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return null;
        }
    }, {
        key: "getFirstAutoBotId",
        value: function getFirstAutoBotId() {
            var bot = this.getFirstAutoBot();
            return bot ? bot.id : null;
        }
    }, {
        key: "movePlayer",
        value: function movePlayer(playerId, dirVector) {
            var isManual = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var player = this.getPlayer(playerId);
            if (player == null) return;
            if (!this.game.maze.canMove(player.currTile, dirVector, false, false, player.isGhostItemActive())) {
                // If player can't move, ensure no destructible tiles are holding them
                this.game.maze.clearDestructibleTilesFromTile(player.currTile);
                return;
            }
            // Disable auto-move on current player
            player.isManuallyControlled = isManual;
            player.moveCount++;
            player.reduceSmartPathingDistance();
            // Reset timer for auto-moves
            if (isManual) {
                // Spawn new bot unless it exists already.
                if (this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.PLAYER_MOVE_INDEPENDENTLY)) {
                    if (!this.isAutoBotPresent()) {
                        this.createNewPlayerObj(this.getCurrTile(playerId), this.game.maze.getMazeId());
                    }
                    // If independence upgraded, don't re-enable the timer to have a bot take over.
                    this.game.rngBot.disableReEnableBotMovementTimer();
                } else {
                    // Only set the movement timer if independent movement disabled.
                    this.game.rngBot.enableReEnableBotMovementTimer();
                }
            }
            this.game.maze.updatePlayerTileByTileVector(playerId, dirVector);
        }
    }, {
        key: "getPlayerIdList",
        value: function getPlayerIdList() {
            var playerIdArr = [];
            this.playerMap.forEach(function (player) {
                playerIdArr.push(player.id);
            });
            return playerIdArr;
        }
        // Assumption: there should only be max 2 players on the same tile at a time.

    }, {
        key: "getPlayerIdsAtTile",
        value: function getPlayerIdsAtTile(tile) {
            var playerIdList = [];
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.playerMap[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _step3$value = _slicedToArray(_step3.value, 2),
                        id = _step3$value[0],
                        player = _step3$value[1];

                    if ((0, _MazeUtils.isTileEqual)(tile, player.currTile)) {
                        playerIdList.push(player.id);
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return playerIdList;
        }
    }, {
        key: "getNewPlayerId",
        value: function getNewPlayerId() {
            for (var i = 0;; i++) {
                if (!this.playerMap.has(i)) return i;
            }
        }
    }, {
        key: "deletePlayer",
        value: function deletePlayer(playerId) {
            if (!this.playerMap.has(playerId)) return;
            var player = this.getPlayer(playerId);
            var currTile = player.currTile;
            this.playerMap.delete(playerId);
            this.game.maze.setTileBackgroundColor(currTile, true);
        }
    }, {
        key: "getPlayer",
        value: function getPlayer(playerId) {
            if (!this.playerMap.has(playerId)) return null;
            return this.playerMap.get(playerId);
        }
    }, {
        key: "getPlayerColorAtTile",
        value: function getPlayerColorAtTile(tile) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.playerMap.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var player = _step4.value;

                    if ((0, _MazeUtils.isTileEqual)(tile, player.currTile)) {
                        if (player.isManuallyControlled) {
                            return this.game.colors.getPlayerColor();
                        } else if (player.isSmartPathingActive()) {
                            return this.game.colors.getSmartPathingPlayerColor();
                        } else if (player.isMultiplierPowerUpActive()) {
                            return this.game.colors.getMultiplierItemPlayerColor();
                        } else if (player.isUnlimitedSplitItemActive()) {
                            return this.game.colors.getUnlimitedSplitPlayerColor();
                        } else if (player.isGhostItemActive()) {
                            return this.game.colors.getGhostItemPlayerColor();
                        } else {
                            return this.game.colors.getBotColor();
                        }
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return null;
        }
    }, {
        key: "isOccupiedByPlayer",
        value: function isOccupiedByPlayer(tile) {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.playerMap[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var _step5$value = _slicedToArray(_step5.value, 2),
                        id = _step5$value[0],
                        player = _step5$value[1];

                    if ((0, _MazeUtils.isTileEqual)(tile, player.currTile)) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            return false;
        }
    }, {
        key: "getPreviousTile",
        value: function getPreviousTile(playerId) {
            if (!this.playerMap.has(playerId)) return null;
            return this.getPlayer(playerId).prevTile;
        }
    }, {
        key: "getCurrTile",
        value: function getCurrTile(playerId) {
            if (!this.playerMap.has(playerId)) return null;
            return this.getPlayer(playerId).currTile;
        }
    }, {
        key: "playerExists",
        value: function playerExists(playerId) {
            return this.playerMap.has(playerId);
        }
    }, {
        key: "playerHasSmartPathing",
        value: function playerHasSmartPathing(playerId) {
            if (!this.playerMap.has(playerId)) return false;
            return this.game.players.getPlayer(playerId).isSmartPathingActive();
        }
    }, {
        key: "shouldPlayerAutoPath",
        value: function shouldPlayerAutoPath(playerId) {
            var currTile = this.getPlayer(playerId).currTile;
            var currDistanceFromExit = this.game.maze.getSmartPathingDistanceFromExit(currTile);
            // TODO: these should be separated from one another
            var autoExitMazeUpgradeLevel = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.AUTO_EXIT_MAZE);
            var playerHasSmartPathing = this.playerHasSmartPathing(playerId);
            // Check if within X tiles of exit (1 per upgrade) and player has no smart pathing
            if (currDistanceFromExit > autoExitMazeUpgradeLevel && !playerHasSmartPathing) {
                return false;
            }
            return true;
        }
    }]);

    return PlayerManager;
}();

},{"../constants/UpgradeConstants":7,"../models/Player":42,"./MazeUtils":21}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Points = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _Serializable2 = require("../models/Serializable");

var _Stats = require("../models/Stats");

var _PointsHistoryTracker = require("../models/PointsHistoryTracker");

var _PowerUpConstants = require("../constants/PowerUpConstants");

var _PointsMultiplierStrengthUpgrade = require("../upgrades/definitions/powerUps/PointsMultiplierStrengthUpgrade");

var _MazeCompletionBonusUpgrade = require("../upgrades/definitions/maze/MazeCompletionBonusUpgrade");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SERIALIZABLE_PROPERTIES = ['points'];
var BASE_POINT_MULTPLIER = 1;

var Points = exports.Points = function (_Serializable) {
    _inherits(Points, _Serializable);

    function Points(game) {
        var isDevMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, Points);

        var _this = _possibleConstructorReturn(this, (Points.__proto__ || Object.getPrototypeOf(Points)).call(this, SERIALIZABLE_PROPERTIES));

        _this.game = game;
        _this.isDevMode = isDevMode;
        _this.points = 0.0;
        _this.pointsHistoryTracker = new _PointsHistoryTracker.PointsHistoryTracker(_this.game, _Stats.StatsKey.AVERAGE_POINTS_EARNED_PER_SECOND);
        return _this;
    }

    _createClass(Points, [{
        key: "resetPoints",
        value: function resetPoints() {
            this.points = 0.0;
            this.pointsHistoryTracker.resetHistory();
        }
    }, {
        key: "addPoints",
        value: function addPoints(pointsEarned) {
            var playerId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var statsKeyList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var ignorePointsHistory = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            this.points += pointsEarned;
            this.game.stats.addStatsToKeyList(pointsEarned, statsKeyList);
            this.game.stats.addStatsToKey(pointsEarned, _Stats.StatsKey.TOTAL_POINTS_EARNED);
            // These points do not apply to points history (average)
            if (!ignorePointsHistory) {
                this.game.points.pointsHistoryTracker.addNumber(pointsEarned);
            }
            this.game.upgrades.updateAllUpgradeUi();
            this.game.ui.setPointsText();
        }
    }, {
        key: "spendPoints",
        value: function spendPoints(amount) {
            this.points = Math.max(0, this.points - amount);
            this.game.stats.addStatsToKey(amount, _Stats.StatsKey.TOTAL_POINTS_SPENT);
            this.game.ui.setPointsText();
            this.game.upgrades.updateAllUpgradeUi();
        }
    }, {
        key: "getPointMultplier",
        value: function getPointMultplier() {
            var pointMultpliers = _PointsMultiplierStrengthUpgrade.PointsMultiplierStrengthUpgrade.getPointsMultiplierStrength(this.game);
            return this.game.powerUps.isPowerUpActive(_PowerUpConstants.PowerUpKey.POINTS_MULTIPLIER) ? pointMultpliers : BASE_POINT_MULTPLIER;
        }
    }, {
        key: "getPointsPerVisit",
        value: function getPointsPerVisit() {
            var isVisitedAlready = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var upgradeLevel = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.POINTS_PER_VISIT);
            var basePointsAmount = this.game.biomes.getBasePointsPerVisitValue();
            var pointsPerTile = basePointsAmount * Math.pow(_UpgradeConstants.POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER, upgradeLevel);
            if (isVisitedAlready) {
                pointsPerTile *= this.getPointsPerRevisitMultiplier();
            }
            return pointsPerTile;
        }
    }, {
        key: "getPointsPerRevisitMultiplier",
        value: function getPointsPerRevisitMultiplier() {
            var upgradeLevel = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.POINTS_PER_REVISIT);
            return _UpgradeConstants.TILE_REVISIT_BASE_MULTIPLIER + upgradeLevel * _UpgradeConstants.TILE_REVISIT_BASE_MULTIPLIER_INCREASE_PERCENT;
        }
    }, {
        key: "addVisitPoints",
        value: function addVisitPoints(isVisitedAlready, playerId) {
            var points = this.getPointsPerVisit(isVisitedAlready);
            if (points === 0) return;
            var multipliedPoints = points * this.getPointMultplier();
            this.game.stats.addStatsToKey(multipliedPoints - points, _Stats.StatsKey.TOTAL_POINTS_EARNED_FROM_MULTIPLIER_ITEM);
            var stats = isVisitedAlready ? [_Stats.StatsKey.TOTAL_POINTS_EARNED_FROM_REVISITED_TILES] : [_Stats.StatsKey.TOTAL_POINTS_EARNED_FROM_VISITED_TILES];
            this.addPoints(multipliedPoints, playerId, stats);
        }
    }, {
        key: "addMazeCompletionBonus",
        value: function addMazeCompletionBonus(playerId) {
            var bonus = _MazeCompletionBonusUpgrade.MazeCompletionBonusUpgrade.getMazeCompletionBonus(this.game);
            this.addPoints(bonus, playerId, [_Stats.StatsKey.TOTAL_POINTS_EARNED_FROM_MAZE_COMPLETIONS]);
        }
    }]);

    return Points;
}(_Serializable2.Serializable);

},{"../constants/PowerUpConstants":6,"../constants/UpgradeConstants":7,"../models/PointsHistoryTracker":43,"../models/Serializable":45,"../models/Stats":46,"../upgrades/definitions/maze/MazeCompletionBonusUpgrade":66,"../upgrades/definitions/powerUps/PointsMultiplierStrengthUpgrade":74}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PowerUpManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PowerUpConstants = require("../constants/PowerUpConstants");

var _PointsMultiplierPowerUp = require("../powerUps/PointsMultiplierPowerUp");

var _SpeedUpPowerUp = require("../powerUps/SpeedUpPowerUp");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PowerUpManager = exports.PowerUpManager = function () {
    function PowerUpManager(game) {
        _classCallCheck(this, PowerUpManager);

        this.game = game;
        this.powerUpMap = new Map();
        this.initPowerUpMap();
    }

    _createClass(PowerUpManager, [{
        key: "isPowerUpUnlocked",
        value: function isPowerUpUnlocked(powerUpKey) {
            return this.game.biomes.isPowerUpUnlocked(powerUpKey);
        }
    }, {
        key: "getAllUnlockedPowerUpKeys",
        value: function getAllUnlockedPowerUpKeys() {
            var unlockedPowerUpItemKeys = [];
            for (var powerUpKey in _PowerUpConstants.PowerUpKey) {
                if (this.isPowerUpUnlocked(powerUpKey)) {
                    unlockedPowerUpItemKeys.push(powerUpKey);
                }
            }
            return unlockedPowerUpItemKeys;
        }
    }, {
        key: "updateAllPowerUpsUi",
        value: function updateAllPowerUpsUi() {
            for (var powerUpKey in _PowerUpConstants.PowerUpKey) {
                this.powerUpMap.get(powerUpKey).updateUi();
            }
        }
    }, {
        key: "initPowerUpMap",
        value: function initPowerUpMap() {
            for (var powerUpKey in _PowerUpConstants.PowerUpKey) {
                this.createPowerUp(powerUpKey);
            }
        }
    }, {
        key: "createPowerUp",
        value: function createPowerUp(powerUpKey) {
            if (powerUpKey === _PowerUpConstants.PowerUpKey.POINTS_MULTIPLIER) {
                this.powerUpMap.set(powerUpKey, new _PointsMultiplierPowerUp.PointsMultiplierPowerUp(this.game));
            } else if (powerUpKey === _PowerUpConstants.PowerUpKey.SPEED_UP) {
                this.powerUpMap.set(powerUpKey, new _SpeedUpPowerUp.SpeedUpPowerUp(this.game));
            } else {
                console.error('Failed to create maze item of type.  No valid type: ' + powerUpKey);
                return;
            }
        }
    }, {
        key: "getPowerUpActivateDuration",
        value: function getPowerUpActivateDuration(powerUpKey) {
            if (powerUpKey === _PowerUpConstants.PowerUpKey.POINTS_MULTIPLIER) {
                return _PointsMultiplierPowerUp.PointsMultiplierPowerUp.getActivateDuration(this.game);
            } else if (powerUpKey === _PowerUpConstants.PowerUpKey.SPEED_UP) {
                return _SpeedUpPowerUp.SpeedUpPowerUp.getActivateDuration(this.game);
            }
            console.error('Invalid power up key for activate duration.');
        }
    }, {
        key: "getPowerUpCooldownDuration",
        value: function getPowerUpCooldownDuration(powerUpKey) {
            if (powerUpKey === _PowerUpConstants.PowerUpKey.POINTS_MULTIPLIER) {
                return _PointsMultiplierPowerUp.PointsMultiplierPowerUp.getCooldownTimerDuration();
            } else if (powerUpKey === _PowerUpConstants.PowerUpKey.SPEED_UP) {
                return _SpeedUpPowerUp.SpeedUpPowerUp.getCooldownTimerDuration(this.game);
            }
            console.error('Invalid power up key for cooldown duration.');
        }
    }, {
        key: "getPowerUp",
        value: function getPowerUp(powerUpKey) {
            return this.powerUpMap.get(powerUpKey);
        }
    }, {
        key: "activatePowerUp",
        value: function activatePowerUp(powerUpKey) {
            if (!this.isPowerUpUnlocked(powerUpKey)) return;
            this.getPowerUp(powerUpKey).activatePowerUpTimer();
        }
    }, {
        key: "isPowerUpActive",
        value: function isPowerUpActive(powerUpKey) {
            return this.powerUpMap.get(powerUpKey).isPowerUpActive();
        }
    }]);

    return PowerUpManager;
}();

},{"../constants/PowerUpConstants":6,"../powerUps/PointsMultiplierPowerUp":47,"../powerUps/SpeedUpPowerUp":48}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RNGBotManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PowerUpConstants = require("../constants/PowerUpConstants");

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _BotLuckUpgrade = require("../upgrades/definitions/bots/BotLuckUpgrade");

var _MazeUtils = require("./MazeUtils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BASE_MOVEMENT_SPEED = 1000;
var BASE_MOVEMENT_REDUCTION = 0.98;
var AUTO_RE_ENABLE_RNG_BOT_TIMER = 3000;
var DEV_MODE_MOVEMENT_SPEED = 1;

var RNGBotManager = exports.RNGBotManager = function () {
    function RNGBotManager(game, isDevMode) {
        _classCallCheck(this, RNGBotManager);

        this.getRandomInt = function (max) {
            return Math.floor(Math.random() * Math.floor(max));
        };
        this.getRandomXValues = function (arr, pickX) {
            return _.sampleSize(arr, pickX);
        };
        this.game = game;
        this.isDevMode = isDevMode;
        this.rngBotGlobalInterval = null;
        this.rngBotReEnableMovementTimer = null;
    }

    _createClass(RNGBotManager, [{
        key: "enableGlobalRngBot",
        value: function enableGlobalRngBot() {
            var _this = this;

            var upgradeSpeed = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_MOVEMENT_SPEED);
            var isSpeedPowerUpActive = this.game.powerUps.isPowerUpActive(_PowerUpConstants.PowerUpKey.SPEED_UP);
            clearInterval(this.rngBotGlobalInterval);
            this.rngBotGlobalInterval = setInterval(function () {
                if (!_this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.AUTO_MOVE)) return;
                // Move each player.
                _this.game.players.getPlayerIdList().forEach(function (playerId) {
                    var player = _this.game.players.getPlayer(playerId);
                    if (player == null || player.isManuallyControlled) return;
                    _this.moveRandomly(playerId);
                });
                // Reset the interval with the new time interval
                if (upgradeSpeed !== _this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_MOVEMENT_SPEED) || isSpeedPowerUpActive !== _this.game.powerUps.isPowerUpActive(_PowerUpConstants.PowerUpKey.SPEED_UP)) {
                    _this.disableGlobalRngBot();
                    _this.enableGlobalRngBot();
                }
            }, this.getBotMoveInterval(this.isDevMode));
        }
    }, {
        key: "getBotMoveInterval",
        value: function getBotMoveInterval() {
            var isDevMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (isDevMode) return DEV_MODE_MOVEMENT_SPEED;
            var speedPowerUpMultiplier = this.game.powerUps.isPowerUpActive(_PowerUpConstants.PowerUpKey.SPEED_UP) ? .5 : 1;
            return BASE_MOVEMENT_SPEED * speedPowerUpMultiplier * Math.pow(BASE_MOVEMENT_REDUCTION, this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_MOVEMENT_SPEED));
        }
    }, {
        key: "disableGlobalRngBot",
        value: function disableGlobalRngBot() {
            clearInterval(this.rngBotGlobalInterval);
            this.rngBotGlobalInterval = null;
            clearInterval(this.rngBotReEnableMovementTimer);
            this.rngBotReEnableMovementTimer = null;
        }
        // After a short delay, manually controlled bots will start moving again.

    }, {
        key: "enableReEnableBotMovementTimer",
        value: function enableReEnableBotMovementTimer() {
            var _this2 = this;

            this.disableReEnableBotMovementTimer();
            this.rngBotReEnableMovementTimer = setTimeout(function () {
                var player = _this2.game.players.getManuallyControlledPlayer();
                if (!player) return;
                player.isManuallyControlled = false;
                _this2.disableReEnableBotMovementTimer();
            }, AUTO_RE_ENABLE_RNG_BOT_TIMER);
        }
    }, {
        key: "disableReEnableBotMovementTimer",
        value: function disableReEnableBotMovementTimer() {
            clearTimeout(this.rngBotReEnableMovementTimer);
            this.rngBotReEnableMovementTimer = null;
        }
    }, {
        key: "disableGlobalMovement",
        value: function disableGlobalMovement() {
            clearInterval(this.rngBotGlobalInterval);
            this.rngBotGlobalInterval = null;
        }
    }, {
        key: "moveRandomly",
        value: function moveRandomly(playerId) {
            if (!this.game.players.playerExists(playerId)) return;
            var dirArr = this.chooseRandomDirectionsArr(playerId);
            var player = this.game.players.getPlayer(playerId);
            if (dirArr.length === 0) {
                // If player can't move, ensure no destructible tiles are holding them
                if (player != null) this.game.maze.clearDestructibleTilesFromTile(player.currTile);
                return;
            }
            if (dirArr.length === 1) {
                this.game.players.movePlayer(playerId, dirArr[0]);
            } else {
                this.game.maze.spawnSplitBot(player, dirArr);
            }
        }
    }, {
        key: "chooseRandomDirectionsArr",
        value: function chooseRandomDirectionsArr(playerId) {
            // All possible directions
            var validDirs = this.game.maze.getValidDirectionsByPlayerId(playerId);
            var player = this.game.players.getPlayer(playerId);
            if (validDirs.length === 0 || !player) {
                return [];
            }
            // Filter all directions based on upgrades applied (excluding luck)
            var filteredValidDirs = this.getFilteredDirectionList(validDirs, playerId);
            // Determine how many splits should be allowed
            var possibleNewSplits = this.game.maze.getPossibleSplitBotCount(validDirs.length, player);
            // Check for Auto-Exit, Smart pathing, and lucky guess
            var enforcedDirection = this.getEnforcedDirection(validDirs, filteredValidDirs, playerId);
            if (enforcedDirection) {
                // Filter out enforced direction from "extra" directions
                filteredValidDirs = filteredValidDirs.filter(function (dir) {
                    return !(0, _MazeUtils.isTileEqual)(enforcedDirection, dir);
                });
                //(*) Enforced dirctions MUST BE first in the list. Current player takes first move.
                // Add extra directions for splitting purposes -- allow splitting despite knowing correct direction
                // Prioritize the enforced direction, but allow other unvisited (filtered) directions
                return possibleNewSplits > 0 && filteredValidDirs.length > 0 ? [enforcedDirection].concat(this.getRandomXValues(filteredValidDirs, possibleNewSplits)) : [enforcedDirection];
            }
            // Determine if there is an unvisited tile -- only allow splitting if so.
            var hasUnvisitedTile = this.game.maze.prioritizeUnvisitedDirection(playerId, filteredValidDirs).length > 0;
            if (filteredValidDirs.length === 0) {
                return [];
            }
            // Must have at least two possible directions and one split available.
            else if (hasUnvisitedTile && possibleNewSplits > 0 && filteredValidDirs.length >= 2) {
                    var numDirectionsToPick = Math.min(possibleNewSplits + 1, filteredValidDirs.length);
                    return this.getRandomXValues(filteredValidDirs, numDirectionsToPick);
                }
                // Randomly pick one.
                else {
                        return [filteredValidDirs[this.getRandomInt(filteredValidDirs.length)]];
                    }
        }
    }, {
        key: "getEnforcedDirection",
        value: function getEnforcedDirection(validDirs, upgradeFilteredDirs, playerId) {
            var enforcedDirection = null;
            // Check for Auto-Exit and Smart pathing
            if (this.game.players.shouldPlayerAutoPath(playerId)) {
                enforcedDirection = this.game.maze.filterPlayerExitMazeDirection(playerId, validDirs);
            }
            // Check for lucky guess moves.  Skip if enforced direction already applied.
            if (!enforcedDirection && this.isMovementLucky(validDirs.length)) {
                // Use FILTERED set of directions such that you don't backtrack randomly based on "luck"
                enforcedDirection = this.game.maze.filterPlayerExitMazeDirection(playerId, upgradeFilteredDirs);
            }
            return enforcedDirection;
        }
        // Filter out directions based on bot upgrades

    }, {
        key: "getFilteredDirectionList",
        value: function getFilteredDirectionList(validDirs, playerId) {
            if (!validDirs) {
                return null;
            }
            // Remove all dead end tiles from possible directions.
            if (this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES) >= 1) {
                var filteredDirs = this.game.maze.filterDeadEndTiles(playerId, validDirs);
                if (filteredDirs.length > 0) {
                    validDirs = filteredDirs;
                }
            }
            // // Prioritize any adjacent unvisited tiles if any.
            if (this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.PRIORITIZE_UNVISITED)) {
                var unvisitedDirsArr = this.game.maze.prioritizeUnvisitedDirection(playerId, validDirs);
                if (unvisitedDirsArr.length > 0) {
                    return unvisitedDirsArr;
                }
            }
            // Avoid revisiting the last position if possible.
            if (this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.AVOID_REVISIT_LAST_POSITION)) {
                var noRevisitDirs = this.game.maze.filterAvoidRevisitLastPosition(playerId, validDirs);
                if (noRevisitDirs.length > 0) {
                    return noRevisitDirs;
                }
            }
            // No fancy moves, just choose random ones.
            return validDirs;
        }
    }, {
        key: "isMovementLucky",
        value: function isMovementLucky(dirCount) {
            if (!this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.BOT_LUCKY_GUESS)) {
                return false;
            }
            var luckOdds = _BotLuckUpgrade.BotLuckyGuessUpgrade.getLuckyGuessIncreasePercentage(this.game);
            // Example (2 dir): 50% + 3% = 53% likely to guess correct
            // Example (3 dir): 33% + 3% = 36% likely to guess correct
            var correctChoiceOdds = 1.0 / dirCount + luckOdds;
            return correctChoiceOdds > 1 - Math.random();
        }
    }]);

    return RNGBotManager;
}();

},{"../constants/PowerUpConstants":6,"../constants/UpgradeConstants":7,"../upgrades/definitions/bots/BotLuckUpgrade":53,"./MazeUtils":21}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SAVE_GAME_INTERVAL = 20000;
var SAVE_GAME_LOCAL_STORE_KEY = 'a-mazing-idle';
var SAVE_TOAST_VISIBILITY_DURATION = 3000;

var SaveManager = exports.SaveManager = function () {
    function SaveManager(game) {
        var _this = this;

        _classCallCheck(this, SaveManager);

        this.createSaveJsonObject = function () {
            var gamePropList = _this.game.getSerializablePropertyList();
            var gameJson = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = gamePropList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var gameProp = _step.value;

                    gameJson[gameProp] = _this.game[gameProp].serialize();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return JSON.stringify(gameJson);
        };
        this.importSaveJsonObject = function (jsonObj) {
            for (var gameProp in jsonObj) {
                _this.game[gameProp].deserialize(jsonObj[gameProp]);
            }
        };
        this.game = game;
        this.saveInterval = null;
    }

    _createClass(SaveManager, [{
        key: 'enableSaveTimer',
        value: function enableSaveTimer() {
            var _this2 = this;

            this.disableSaveTimer();
            this.saveInterval = setInterval(function () {
                _this2.saveGameToLocalStorage();
            }, SAVE_GAME_INTERVAL);
        }
    }, {
        key: 'disableSaveTimer',
        value: function disableSaveTimer() {
            clearInterval(this.saveInterval);
            this.saveInterval = null;
        }
    }, {
        key: 'saveGameToLocalStorage',
        value: function saveGameToLocalStorage() {
            this.game.ui.showSaveModalForDuration(SAVE_TOAST_VISIBILITY_DURATION);
            var saveJson = this.createSaveJsonObject();
            this.persistSaveToLocalStorage(saveJson);
        }
    }, {
        key: 'loadGameSaveFromLocalStorage',
        value: function loadGameSaveFromLocalStorage() {
            var gameObj = this.getSaveJsonFromLocalStorage();
            if (!gameObj) return;
            this.importSaveJsonObject(gameObj);
            this.game.offline.processOfflinePoints();
        }
    }, {
        key: 'importGameSaveFromString',
        value: function importGameSaveFromString(saveJsonString) {
            // Disable save timer to prevent overrides
            this.game.save.disableSaveTimer();
            // Attempt to parse and save new string
            if (this.tryParseSaveJson(saveJsonString) == null) {
                this.game.save.enableSaveTimer();
                return false;
            }
            this.persistSaveToLocalStorage(saveJsonString);
            this.game.reloadFromLocalStorage();
            return true;
        }
    }, {
        key: 'persistSaveToLocalStorage',
        value: function persistSaveToLocalStorage(jsonString) {
            localStorage.setItem(SAVE_GAME_LOCAL_STORE_KEY, jsonString);
        }
    }, {
        key: 'getSaveJsonFromLocalStorage',
        value: function getSaveJsonFromLocalStorage() {
            var json = localStorage.getItem(SAVE_GAME_LOCAL_STORE_KEY);
            if (json === null || json === "") {
                return null;
            }
            return this.tryParseSaveJson(json);
        }
    }, {
        key: 'tryParseSaveJson',
        value: function tryParseSaveJson(json) {
            try {
                return JSON.parse(json);
            } catch (e) {
                console.error('Failed to parse local game save.  Error: ' + e.message + '.  \n\nLocal Save Json: ' + json);
                return null;
            }
        }
    }, {
        key: 'clearLocalStorage',
        value: function clearLocalStorage() {
            localStorage.clear();
        }
    }, {
        key: 'copySaveToClipboard',
        value: function copySaveToClipboard() {
            var saveJson = this.getSaveJsonFromLocalStorage();
            if (!saveJson) return;
            var el = document.createElement('textarea');
            el.value = JSON.stringify(saveJson);
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
    }]);

    return SaveManager;
}();

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StatsManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Serializable2 = require("../models/Serializable");

var _Stats = require("../models/Stats");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_STAT_VALUE = 0;
var SERIALIZABLE_PROPERTIES = ['statsMap', 'saveTimeStamp'];

var StatsManager = exports.StatsManager = function (_Serializable) {
    _inherits(StatsManager, _Serializable);

    function StatsManager(game) {
        _classCallCheck(this, StatsManager);

        var _this = _possibleConstructorReturn(this, (StatsManager.__proto__ || Object.getPrototypeOf(StatsManager)).call(this, SERIALIZABLE_PROPERTIES));

        _this.statsMap = new Map();
        _this.game = game;
        return _this;
    }

    _createClass(StatsManager, [{
        key: "initStatsMap",
        value: function initStatsMap() {
            for (var statsKey in _Stats.StatsKey) {
                this.statsMap.set(statsKey, DEFAULT_STAT_VALUE);
            }
            this.game.ui.updateAllStatsKey();
        }
    }, {
        key: "clearCurrentMazeStats",
        value: function clearCurrentMazeStats() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _Stats.CURRENT_MAZE_STATS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var currMazeStat = _step.value;

                    this.statsMap.set(currMazeStat, DEFAULT_STAT_VALUE);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "getStat",
        value: function getStat(statsKey) {
            if (!this.hasMazeStat(statsKey)) return 0;
            return this.statsMap.get(statsKey);
        }
    }, {
        key: "hasMazeStat",
        value: function hasMazeStat(statsKey) {
            return this.statsMap.has(statsKey);
        }
    }, {
        key: "addStatsToKey",
        value: function addStatsToKey(value, statsKey) {
            var oldValue = this.getStat(statsKey);
            this.statsMap.set(statsKey, value + oldValue);
            this.game.ui.updateStatsKey(statsKey);
        }
    }, {
        key: "setStatsToKey",
        value: function setStatsToKey(value, statsKey) {
            this.statsMap.set(statsKey, value);
            this.game.ui.updateStatsKey(statsKey);
        }
    }, {
        key: "addStatsToKeyList",
        value: function addStatsToKeyList(amount, statsKeyList) {
            if (!statsKeyList) return;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = statsKeyList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var statsKey = _step2.value;

                    this.addStatsToKey(amount, statsKey);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: "deserialize",
        value: function deserialize(jsonObj) {
            _get(StatsManager.prototype.__proto__ || Object.getPrototypeOf(StatsManager.prototype), "deserialize", this).call(this, jsonObj);
            // Reset average points earned at each reload
            this.statsMap.set(_Stats.StatsKey.AVERAGE_POINTS_EARNED_PER_SECOND, 0);
        }
    }]);

    return StatsManager;
}(_Serializable2.Serializable);

},{"../models/Serializable":45,"../models/Stats":46}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UpgradeManager = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AvoidRevisitLastPositionUpgrade = require("../upgrades/definitions/bots/AvoidRevisitLastPositionUpgrade");

var _PrioritizeUnvisitedUpgrade = require("../upgrades/definitions/bots/PrioritizeUnvisitedUpgrade");

var _AutoExitMazeUpgrade = require("../upgrades/definitions/bots/AutoExitMazeUpgrade");

var _PlayerMoveIndependentlyUpgrade = require("../upgrades/definitions/movement/PlayerMoveIndependentlyUpgrade");

var _TeleportPlayerBacktoBotUpgrade = require("../upgrades/definitions/movement/TeleportPlayerBacktoBotUpgrade");

var _TeleportBotBackToPlayerUpgrade = require("../upgrades/definitions/movement/TeleportBotBackToPlayerUpgrade");

var _FruitPickupPointsMultiplierUpgrade = require("../upgrades/definitions/items/FruitPickupPointsMultiplierUpgrade");

var _FruitSpawnRateUpgrade = require("../upgrades/definitions/items/FruitSpawnRateUpgrade");

var _BrainSpawnRateUpgrade = require("../upgrades/definitions/items/BrainSpawnRateUpgrade");

var _BrainTileDistanceUpgrade = require("../upgrades/definitions/items/BrainTileDistanceUpgrade");

var _BotRememberDeadEndTilesUpgrade = require("../upgrades/definitions/bots/BotRememberDeadEndTilesUpgrade");

var _MazeCompletionBonusUpgrade = require("../upgrades/definitions/maze/MazeCompletionBonusUpgrade");

var _BotMovementSpeedUpgrade = require("../upgrades/definitions/bots/BotMovementSpeedUpgrade");

var _PointsPerVisitUpgrade = require("../upgrades/definitions/maze/PointsPerVisitUpgrade");

var _PointsPerRevisitUpgrade = require("../upgrades/definitions/maze/PointsPerRevisitUpgrade");

var _MazeSizeUpgrade = require("../upgrades/definitions/maze/MazeSizeUpgrade");

var _BotSplitDirectionUpgrade = require("../upgrades/definitions/bots/BotSplitDirectionUpgrade");

var _BotSplitAutoMergeUpgrade = require("../upgrades/definitions/bots/BotSplitAutoMergeUpgrade");

var _BotSmartMergeUpgrade = require("../upgrades/definitions/bots/BotSmartMergeUpgrade");

var _BotLuckUpgrade = require("../upgrades/definitions/bots/BotLuckUpgrade");

var _DestructibleWallUpgrade = require("../upgrades/definitions/maze/DestructibleWallUpgrade");

var _BotAutoMoveUpgrade = require("../upgrades/definitions/bots/BotAutoMoveUpgrade");

var _PointsMultiplierActivateDurationUpgrade = require("../upgrades/definitions/powerUps/PointsMultiplierActivateDurationUpgrade");

var _PointsMultiplierStrengthUpgrade = require("../upgrades/definitions/powerUps/PointsMultiplierStrengthUpgrade");

var _SpeedUpMultiplierStrengthUpgrade = require("../upgrades/definitions/powerUps/SpeedUpMultiplierStrengthUpgrade");

var _SpeedUpActivateDurationUpgrade = require("../upgrades/definitions/powerUps/SpeedUpActivateDurationUpgrade");

var _BiomeUpgrade = require("../upgrades/definitions/maze/BiomeUpgrade");

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _Serializable2 = require("../models/Serializable");

var _UserInterface = require("./UserInterface");

var _devUtils = require("../dev/devUtils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UPGRADE_MAP_PROPERTY_KEY = 'upgradeMap';
var SERIALIZABLE_PROPERTIES = [UPGRADE_MAP_PROPERTY_KEY];

var UpgradeManager = exports.UpgradeManager = function (_Serializable) {
    _inherits(UpgradeManager, _Serializable);

    function UpgradeManager(game) {
        _classCallCheck(this, UpgradeManager);

        var _this = _possibleConstructorReturn(this, (UpgradeManager.__proto__ || Object.getPrototypeOf(UpgradeManager)).call(this, SERIALIZABLE_PROPERTIES));

        _this.game = game;
        return _this;
    }

    _createClass(UpgradeManager, [{
        key: "initUpgrades",
        value: function initUpgrades() {
            this.upgradeMap = new Map();
            // Maze / Points
            this.createUpgrade(new _PointsPerVisitUpgrade.PointsPerVisitUpgrade(this.game, _UpgradeConstants.UpgradeKey.POINTS_PER_VISIT));
            this.createUpgrade(new _MazeCompletionBonusUpgrade.MazeCompletionBonusUpgrade(this.game, _UpgradeConstants.UpgradeKey.MAZE_COMPLETION_BONUS));
            this.createUpgrade(new _MazeSizeUpgrade.MazeSizeUpgrade(this.game, _UpgradeConstants.UpgradeKey.MAZE_SIZE_UPGRADE));
            this.createUpgrade(new _PointsPerRevisitUpgrade.PointsPerRevisitUpgrade(this.game, _UpgradeConstants.UpgradeKey.POINTS_PER_REVISIT));
            // Bot
            this.createUpgrade(new _BotAutoMoveUpgrade.BotAutoMoveUpgrade(this.game, _UpgradeConstants.UpgradeKey.AUTO_MOVE));
            this.createUpgrade(new _AutoExitMazeUpgrade.AutoExitMazeUpgrade(this.game, _UpgradeConstants.UpgradeKey.AUTO_EXIT_MAZE));
            this.createUpgrade(new _AvoidRevisitLastPositionUpgrade.AvoidRevisitLastPositionUpgrade(this.game, _UpgradeConstants.UpgradeKey.AVOID_REVISIT_LAST_POSITION));
            this.createUpgrade(new _BotMovementSpeedUpgrade.BotMovementSpeedUpgrade(this.game, _UpgradeConstants.UpgradeKey.BOT_MOVEMENT_SPEED));
            this.createUpgrade(new _BotSplitAutoMergeUpgrade.BotSplitAutoMergeUpgrade(this.game, _UpgradeConstants.UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE));
            this.createUpgrade(new _BotSmartMergeUpgrade.BotSmartMergeUpgrade(this.game, _UpgradeConstants.UpgradeKey.BOT_SMART_MERGE));
            this.createUpgrade(new _BotSplitDirectionUpgrade.BotSplitDirectionUpgrade(this.game, _UpgradeConstants.UpgradeKey.BOT_SPLIT_DIRECTION));
            this.createUpgrade(new _BotRememberDeadEndTilesUpgrade.BotRememberDeadEndTilesUpgrade(this.game, _UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES));
            this.createUpgrade(new _BrainTileDistanceUpgrade.BrainTileDistanceUpgrade(this.game, _UpgradeConstants.UpgradeKey.BRAIN_TILE_DISTANCE));
            this.createUpgrade(new _PlayerMoveIndependentlyUpgrade.PlayerMoveIndependentlyUpgrade(this.game, _UpgradeConstants.UpgradeKey.PLAYER_MOVE_INDEPENDENTLY));
            this.createUpgrade(new _PrioritizeUnvisitedUpgrade.PrioritizeUnvisitedUpgrade(this.game, _UpgradeConstants.UpgradeKey.PRIORITIZE_UNVISITED));
            this.createUpgrade(new _TeleportPlayerBacktoBotUpgrade.TeleportPlayerBacktoBotUpgrade(this.game, _UpgradeConstants.UpgradeKey.TELEPORT_PLAYER_BACK_TO_BOT));
            this.createUpgrade(new _TeleportBotBackToPlayerUpgrade.TeleportBotBackToPlayerUpgrade(this.game, _UpgradeConstants.UpgradeKey.TELEPORT_BOT_BACK_TO_PLAYER));
            this.createUpgrade(new _BotLuckUpgrade.BotLuckyGuessUpgrade(this.game, _UpgradeConstants.UpgradeKey.BOT_LUCKY_GUESS));
            // Item
            this.createUpgrade(new _FruitPickupPointsMultiplierUpgrade.FruitPickupPointsMultiplierUpgrade(this.game, _UpgradeConstants.UpgradeKey.FRUIT_PICKUP_POINTS));
            this.createUpgrade(new _FruitSpawnRateUpgrade.FruitSpawnRateUpgrade(this.game, _UpgradeConstants.UpgradeKey.FRUIT_SPAWN));
            this.createUpgrade(new _BrainSpawnRateUpgrade.BrainSpawnRateUpgrade(this.game, _UpgradeConstants.UpgradeKey.BRAIN_SPAWN));
            // Power Up
            this.createUpgrade(new _SpeedUpActivateDurationUpgrade.SpeedUpActivateDurationUpgrade(this.game, _UpgradeConstants.UpgradeKey.SPEED_UP_ACTIVATE_DURATION));
            this.createUpgrade(new _SpeedUpMultiplierStrengthUpgrade.SpeedUpMultiplierStrengthUpgrade(this.game, _UpgradeConstants.UpgradeKey.SPEED_UP_MULTIPLIER_STRENGTH));
            this.createUpgrade(new _PointsMultiplierActivateDurationUpgrade.PointsMultiplierActivateDurationUpgrade(this.game, _UpgradeConstants.UpgradeKey.MULTIPLIER_POWER_UP_ACTIVATE_DURATION));
            this.createUpgrade(new _PointsMultiplierStrengthUpgrade.PointsMultiplierStrengthUpgrade(this.game, _UpgradeConstants.UpgradeKey.MULTIPLIER_POWER_UP_STRENGTH));
            // Features
            this.createUpgrade(new _DestructibleWallUpgrade.DestructibleWallUpgrade(this.game, _UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALLS));
            // Biomes
            this.createUpgrade(new _BiomeUpgrade.BiomeUpgrade(this.game, _UpgradeConstants.UpgradeKey.BIOME));
        }
    }, {
        key: "updateAllUpgradeUi",
        value: function updateAllUpgradeUi() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.upgradeMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        upgradeKey = _step$value[0],
                        upgrade = _step$value[1];

                    upgrade.updateUiProperties();
                    upgrade.updateUiDisabled();
                    upgrade.updateVisibility();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.updateUpgradeSectionVisibility();
        }
    }, {
        key: "hideAllUpgradeNewTextForUnlockedUpgrades",
        value: function hideAllUpgradeNewTextForUnlockedUpgrades() {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.upgradeMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2),
                        upgradeKey = _step2$value[0],
                        upgrade = _step2$value[1];

                    if (upgrade.isUnlocked()) {
                        upgrade.setVisibilityOfNewText(false);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: "createUpgrade",
        value: function createUpgrade(upgrade) {
            this.upgradeMap.set(upgrade.upgradeKey, upgrade);
        }
    }, {
        key: "getUpgrade",
        value: function getUpgrade(upgradeKey) {
            if (!this.hasUpgrade(upgradeKey)) {
                console.error("Unexpected upgrade key requested: " + upgradeKey);
                return null;
            }
            return this.upgradeMap.get(upgradeKey);
        }
    }, {
        key: "hasUpgrade",
        value: function hasUpgrade(upgradeKey) {
            return this.upgradeMap.has(upgradeKey);
        }
    }, {
        key: "getUpgradeLevel",
        value: function getUpgradeLevel(upgradeKey) {
            if (!this.hasUpgrade(upgradeKey)) return 0;
            return this.getUpgrade(upgradeKey).upgradeLevel;
        }
    }, {
        key: "isUpgraded",
        value: function isUpgraded(upgradeKey) {
            if (!this.hasUpgrade(upgradeKey)) return false;
            return this.getUpgrade(upgradeKey).getIsUpgraded();
        }
    }, {
        key: "serializeProperty",
        value: function serializeProperty(property) {
            // Upgrade map will export the upgrade level of each key
            if (property === UPGRADE_MAP_PROPERTY_KEY) {
                var obj = {};
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.upgradeMap[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _step3$value = _slicedToArray(_step3.value, 2),
                            k = _step3$value[0],
                            v = _step3$value[1];

                        obj[k] = v.upgradeLevel;
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                return obj;
            } else {
                return _get(UpgradeManager.prototype.__proto__ || Object.getPrototypeOf(UpgradeManager.prototype), "serializeProperty", this).call(this, property);
            }
        }
    }, {
        key: "deserializeProperty",
        value: function deserializeProperty(property, value) {
            // Upgrade map will restore the upgrade level of each key
            if (property === UPGRADE_MAP_PROPERTY_KEY) {
                for (var upgradeKey in value) {
                    if (this.upgradeMap.has(upgradeKey)) {
                        this.upgradeMap.get(upgradeKey).upgradeLevel = parseInt(value[upgradeKey]);
                    } else {
                        console.error("Failed to deserialize upgrade key: ", upgradeKey);
                    }
                }
            } else {
                return _get(UpgradeManager.prototype.__proto__ || Object.getPrototypeOf(UpgradeManager.prototype), "deserializeProperty", this).call(this, property, value);
            }
        }
    }, {
        key: "isUnlocked",
        value: function isUnlocked(upgradeKey) {
            if (!this.hasUpgrade(upgradeKey)) return false;
            return this.upgradeMap.get(upgradeKey).isUnlocked();
        }
    }, {
        key: "isUpgradeAvailableForUpgradeType",
        value: function isUpgradeAvailableForUpgradeType(upgradeType) {
            for (var upgradeKey in _UpgradeConstants.UpgradeKey) {
                var upgrade = this.getUpgrade(upgradeKey);
                if (upgrade && upgrade.upgradeType === upgradeType && !upgrade.isMaxUpgradeLevel() && upgrade.isUnlocked()) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: "updateUpgradeSectionVisibility",
        value: function updateUpgradeSectionVisibility() {
            for (var upgradeType in _UpgradeConstants.UpgradeType) {
                var isUpgradeAvailable = this.isUpgradeAvailableForUpgradeType(upgradeType);
                var uiKey = _UpgradeConstants.UPGRADE_TYPE_TO_UI_KEY_MAP.get(upgradeType);
                if (uiKey) {
                    _UserInterface.UserInterface.setIdVisible(uiKey, isUpgradeAvailable || _devUtils.DEBUG_ALL_BUTTONS_VISIBLE);
                }
            }
        }
    }]);

    return UpgradeManager;
}(_Serializable2.Serializable);

exports.default = UpgradeManager;

},{"../constants/UpgradeConstants":7,"../dev/devUtils":8,"../models/Serializable":45,"../upgrades/definitions/bots/AutoExitMazeUpgrade":50,"../upgrades/definitions/bots/AvoidRevisitLastPositionUpgrade":51,"../upgrades/definitions/bots/BotAutoMoveUpgrade":52,"../upgrades/definitions/bots/BotLuckUpgrade":53,"../upgrades/definitions/bots/BotMovementSpeedUpgrade":54,"../upgrades/definitions/bots/BotRememberDeadEndTilesUpgrade":55,"../upgrades/definitions/bots/BotSmartMergeUpgrade":56,"../upgrades/definitions/bots/BotSplitAutoMergeUpgrade":57,"../upgrades/definitions/bots/BotSplitDirectionUpgrade":58,"../upgrades/definitions/bots/PrioritizeUnvisitedUpgrade":59,"../upgrades/definitions/items/BrainSpawnRateUpgrade":60,"../upgrades/definitions/items/BrainTileDistanceUpgrade":61,"../upgrades/definitions/items/FruitPickupPointsMultiplierUpgrade":62,"../upgrades/definitions/items/FruitSpawnRateUpgrade":63,"../upgrades/definitions/maze/BiomeUpgrade":64,"../upgrades/definitions/maze/DestructibleWallUpgrade":65,"../upgrades/definitions/maze/MazeCompletionBonusUpgrade":66,"../upgrades/definitions/maze/MazeSizeUpgrade":67,"../upgrades/definitions/maze/PointsPerRevisitUpgrade":68,"../upgrades/definitions/maze/PointsPerVisitUpgrade":69,"../upgrades/definitions/movement/PlayerMoveIndependentlyUpgrade":70,"../upgrades/definitions/movement/TeleportBotBackToPlayerUpgrade":71,"../upgrades/definitions/movement/TeleportPlayerBacktoBotUpgrade":72,"../upgrades/definitions/powerUps/PointsMultiplierActivateDurationUpgrade":73,"../upgrades/definitions/powerUps/PointsMultiplierStrengthUpgrade":74,"../upgrades/definitions/powerUps/SpeedUpActivateDurationUpgrade":75,"../upgrades/definitions/powerUps/SpeedUpMultiplierStrengthUpgrade":76,"./UserInterface":30}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserInterface = exports.ModalType = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MazeUtils = require("./MazeUtils");

var _Stats = require("../models/Stats");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FINISH_LINE_ICON = "img/finishLine.png";
var MAZE_BORDER_WIDTH = "4px";
var ModalType = exports.ModalType = undefined;
(function (ModalType) {
    ModalType["CONTROLS_MODAL"] = "CONTROLS_MODAL";
    ModalType["STATS_MODAL"] = "STATS_MODAL";
    ModalType["SETTINGS_MODAL"] = "SETTINGS_MODAL";
    ModalType["OFFLINE_SCORE_MODAL"] = "OFFLINE_SCORE_MODAL";
    ModalType["HELP_MODAL"] = "HELP_MODAL";
    ModalType["IMPORT_SAVE_MODAL"] = "IMPORT_SAVE_MODAL";
})(ModalType || (exports.ModalType = ModalType = {}));

var UserInterface = exports.UserInterface = function () {
    function UserInterface(game) {
        var disableUi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, UserInterface);

        this.game = game;
        this.disableUi = disableUi;
    }

    _createClass(UserInterface, [{
        key: "init",
        value: function init() {
            if (this.disableUi) return;
            this.initText();
            this.initEvents();
        }
    }, {
        key: "initText",
        value: function initText() {
            this.setPointsText();
        }
    }, {
        key: "initEvents",
        value: function initEvents() {
            var _this = this;

            $("#manualSaveGame").click(function () {
                return _this.game.save.saveGameToLocalStorage();
            });
            $("#deleteSaveGame").click(function () {
                return _this.game.save.clearLocalStorage();
            });
            $("#newGame").click(function () {
                return _this.game.hardResetGame();
            });
            $("#clearAllStats").click(function () {
                return _this.game.stats.initStatsMap();
            });
            $("#statsButton").click(function (e) {
                return _this.showModalByType(ModalType.STATS_MODAL, true, e);
            });
            $("#helpButton").click(function (e) {
                _this.showModalByType(ModalType.SETTINGS_MODAL, false);
                _this.showModalByType(ModalType.HELP_MODAL, true, e);
            });
            $("#importSaveOpenModalButton").click(function (e) {
                $("#importSaveErrorLabel").text("");
                _this.showModalByType(ModalType.SETTINGS_MODAL, false);
                _this.showModalByType(ModalType.IMPORT_SAVE_MODAL, true, e);
            });
            $("#openControlsModalButton").click(function (e) {
                _this.showModalByType(ModalType.SETTINGS_MODAL, false);
                _this.showModalByType(ModalType.CONTROLS_MODAL, true, e);
            });
            $("#settingsButton").click(function (e) {
                return _this.showModalByType(ModalType.SETTINGS_MODAL, true, e);
            });
            $("#copySaveJson").click(function () {
                return _this.game.save.copySaveToClipboard();
            });
            $("#importSaveModalButton").click(function () {
                var saveJson = $("#importSaveTextArea").val();
                var importSuccess = _this.game.save.importGameSaveFromString(saveJson);
                if (importSuccess) {
                    _this.showModalByType(ModalType.IMPORT_SAVE_MODAL, false);
                }
                $("#importSaveErrorLabel").text(importSuccess ? "" : "Failed to import save json.");
            });
        }
    }, {
        key: "setPointsText",
        value: function setPointsText() {
            $("#points").text("Points: " + UserInterface.getPrettyPrintNumber(this.game.points.points));
        }
    }, {
        key: "printMazeV2",
        value: function printMazeV2(maze) {
            // Extends one before/beyond grid to handle an exit cell.
            for (var y = -1; y < maze.grid.sizeY + 1; y++) {
                $("#maze > tbody").append("<tr>");
                for (var x = -1; x < maze.grid.sizeX + 1; x++) {
                    var tileKey = (0, _MazeUtils.generateTileKey)(x, y);
                    // Place cell element
                    $("#maze > tbody").append("<td id=\"" + tileKey + "\">&nbsp;</td>");
                    // Draw edges
                    this.setTileCssV2(maze, { x: x, y: y });
                    // Draw item if present
                    this.game.items.drawItem({ x: x, y: y });
                }
                $("#maze > tbody").append("</tr>");
            }
            this.setFinishLineIcon(maze.grid.externalExitTile);
        }
    }, {
        key: "setTileCssV2",
        value: function setTileCssV2(maze, tile) {
            var cssSelector = (0, _MazeUtils.generateTileKey)(tile.x, tile.y);
            $("#" + cssSelector).css("border-top", this.getMazeBorderCss(maze.getCellWallType(tile, _MazeUtils.MazeDirectionIndex.UP)));
            $("#" + cssSelector).css("border-right", this.getMazeBorderCss(maze.getCellWallType(tile, _MazeUtils.MazeDirectionIndex.RIGHT)));
            $("#" + cssSelector).css("border-bottom", this.getMazeBorderCss(maze.getCellWallType(tile, _MazeUtils.MazeDirectionIndex.DOWN)));
            $("#" + cssSelector).css("border-left", this.getMazeBorderCss(maze.getCellWallType(tile, _MazeUtils.MazeDirectionIndex.LEFT)));
        }
    }, {
        key: "getMazeBorderCss",
        value: function getMazeBorderCss(val) {
            var borderColor = this.game.colors.getMazeWallColor();
            if (val === _MazeUtils.MazeWallTypes.WALL) {
                return MAZE_BORDER_WIDTH + " solid " + borderColor;
            } else if (val === _MazeUtils.MazeWallTypes.DESTRUCTIBLE_WALL) {
                return "2px dotted " + borderColor;
            } else if (val === _MazeUtils.MazeWallTypes.OUT_OF_BOUNDS_WALL || val == null) {
                return "";
            } else {
                return MAZE_BORDER_WIDTH + " solid transparent";
            }
        }
    }, {
        key: "deleteMaze",
        value: function deleteMaze() {
            if (this.disableUi) return;
            $("#maze td").remove();
            $("#maze tr").remove();
        }
    }, {
        key: "updateStatsKey",
        value: function updateStatsKey(statsKey) {
            if (!_Stats.STATS_TO_UI_ID_MAP.has(statsKey)) {
                console.debug("No stats key UI registered for: ", statsKey);
                return;
            }
            var statsValue = this.game.stats.getStat(statsKey);
            var statsUiId = _Stats.STATS_TO_UI_ID_MAP.get(statsKey);
            if (!$("#" + statsUiId)) {
                console.info("No UI component registerd to stats key: ", statsUiId);
                return;
            }
            $("#" + statsUiId).text(" " + UserInterface.getPrettyPrintNumber(statsValue));
        }
    }, {
        key: "updateAllStatsKey",
        value: function updateAllStatsKey() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _Stats.STATS_TO_UI_ID_MAP.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var statsKey = _step.value;

                    this.updateStatsKey(statsKey);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "setFinishLineIcon",
        value: function setFinishLineIcon(tile) {
            var tileKey = (0, _MazeUtils.generateTileKey)(tile.x, tile.y);
            $("#" + tileKey).css("background-image", "url(\"" + FINISH_LINE_ICON + "\")");
            $("#" + tileKey).css("background-repeat", "no-repeat");
            $("#" + tileKey).css("background-position", "center");
            $("#" + tileKey).css("background-size", "20px");
            $("#" + tileKey).css("background-color", "white");
            $("#" + tileKey).css("border-bottom", "3px solid " + this.game.colors.getMazeWallColor());
        }
    }, {
        key: "showModalByType",
        value: function showModalByType(modalType) {
            var setVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var clickEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            // Prevent clicks from propagating to the global modal closing click event
            if (clickEvent) clickEvent.stopPropagation();
            if (modalType === ModalType.SETTINGS_MODAL) {
                this.showModalVisibleById("settingsModal", setVisible);
            } else if (modalType === ModalType.OFFLINE_SCORE_MODAL) {
                // this.showModalVisibleById("offlineModal", setVisible);
            } else if (modalType === ModalType.STATS_MODAL) {
                this.showModalVisibleById("statsModal", setVisible);
            } else if (modalType === ModalType.HELP_MODAL) {
                this.showModalVisibleById("helpModal", setVisible);
            } else if (modalType === ModalType.IMPORT_SAVE_MODAL) {
                this.showModalVisibleById("importSaveModal", setVisible);
            } else if (modalType === ModalType.CONTROLS_MODAL) {
                this.showModalVisibleById("controlsModal", setVisible);
            } else {
                console.error("Invalid modal to show: " + modalType);
            }
        }
    }, {
        key: "showModalVisibleById",
        value: function showModalVisibleById(modalId) {
            var setVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            UserInterface.setIdVisible(modalId, setVisible);
            if (!setVisible) return;
            // Close dialog when clicked away from
            $(document).click(function (e) {
                if ($(e.target).closest("#" + modalId).length === 0) {
                    UserInterface.setIdVisible(modalId, false);
                    $(document).unbind("click");
                }
            });
        }
    }, {
        key: "closeAllModals",
        value: function closeAllModals() {
            for (var modalType in ModalType) {
                this.showModalByType(modalType, false);
            }
        }
    }, {
        key: "showSaveModalForDuration",
        value: function showSaveModalForDuration(visibilityDuration) {
            UserInterface.setIdVisible('saveToastModal', true);
            setTimeout(function () {
                UserInterface.setIdVisible('saveToastModal', false);
            }, visibilityDuration);
        }
    }], [{
        key: "getPrettyPrintNumber",
        value: function getPrettyPrintNumber(num) {
            if (!num) return "0";
            return numberformat.formatShort(num);
        }
    }, {
        key: "getDecimalPrettyPrintNumber",
        value: function getDecimalPrettyPrintNumber(num) {
            var decimalLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            return parseFloat(num.toFixed(decimalLength)).toLocaleString();
        }
    }, {
        key: "setIdVisible",
        value: function setIdVisible(uid) {
            var setVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            $("#" + uid).css("display", setVisible ? "block" : "none");
        }
    }]);

    return UserInterface;
}();

},{"../models/Stats":46,"./MazeUtils":21}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DiamondMazeGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MazeUtils = require("../managers/MazeUtils");

var _MazeGrid2 = require("../models/MazeGrid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Odd based diamond (single edge piece on each side)
//     X
//   X X X
// X X X X X
//   X X X
//     X <-- edge middle piece
//TODO: should pull this into the class and remove pre-constructor requirements.
// Estimated length based on corresponding areas from input X
// Always use odd number since even doesn't make area calculation any closer
var getDiamondOddLength = function getDiamondOddLength(sizeX) {
    // Calculate an area that closely resembles (X * X) dimensions
    var closestArea = Math.sqrt(2 * sizeX * sizeX - 1);
    var flooredLength = Math.floor(closestArea);
    // Only odd lengths are allowed.
    if (isOdd(flooredLength)) {
        return flooredLength;
    }
    // If not odd, ceil will provide odd number. 
    else {
            return Math.ceil(closestArea);
        }
};
var isOdd = function isOdd(num) {
    return num % 2 === 1;
};

var DiamondMazeGrid = exports.DiamondMazeGrid = function (_MazeGrid) {
    _inherits(DiamondMazeGrid, _MazeGrid);

    function DiamondMazeGrid(game, mazeSizeX) {
        _classCallCheck(this, DiamondMazeGrid);

        var diamondOddLength = getDiamondOddLength(mazeSizeX);
        return _possibleConstructorReturn(this, (DiamondMazeGrid.__proto__ || Object.getPrototypeOf(DiamondMazeGrid)).call(this, game, diamondOddLength, diamondOddLength, _MazeUtils.MazeGridType.DIAMOND));
    }

    _createClass(DiamondMazeGrid, [{
        key: "generateMazeGrid",
        value: function generateMazeGrid() {
            // Generate a normal grid and then mark cells dead
            _get(DiamondMazeGrid.prototype.__proto__ || Object.getPrototypeOf(DiamondMazeGrid.prototype), "generateMazeGrid", this).call(this);
            this.markDeadCells();
        }
        // Number of tiles from wall until edge middle piece

    }, {
        key: "getSingleSideDistance",
        value: function getSingleSideDistance() {
            return (this.sizeX - 1) / 2;
        }
    }, {
        key: "markDeadCells",
        value: function markDeadCells() {
            var edgeDistance = this.getSingleSideDistance();
            // Top left edge
            for (var y = 0; y < edgeDistance; y++) {
                for (var x = 0; x < edgeDistance - y; x++) {
                    this.setDeadCell({ x: x, y: y });
                }
            }
            // Bottom left edge
            for (var _y = edgeDistance + 1; _y < this.sizeY; _y++) {
                for (var _x = 0; _x < _y - edgeDistance; _x++) {
                    this.setDeadCell({ x: _x, y: _y });
                }
            }
            // Top right edge
            for (var _y2 = 0; _y2 < edgeDistance; _y2++) {
                for (var _x2 = _y2 + edgeDistance + 1; _x2 < this.sizeX; _x2++) {
                    this.setDeadCell({ x: _x2, y: _y2 });
                }
            }
            // Bottom right edge
            for (var _y3 = edgeDistance + 1; _y3 < this.sizeY; _y3++) {
                for (var _x3 = this.sizeX - _y3 + edgeDistance; _x3 < this.sizeX; _x3++) {
                    this.setDeadCell({ x: _x3, y: _y3 });
                }
            }
        }
    }, {
        key: "getValidStartLocations",
        value: function getValidStartLocations() {
            return [_MazeUtils.GridLocation.MIDDLE_LEFT, _MazeUtils.GridLocation.MIDDLE_RIGHT, _MazeUtils.GridLocation.TOP_MIDDLE, _MazeUtils.GridLocation.BOTTOM_MIDDLE];
        }
    }, {
        key: "getValidExitLocations",
        value: function getValidExitLocations() {
            return [_MazeUtils.GridLocation.MIDDLE_RIGHT, _MazeUtils.GridLocation.MIDDLE_LEFT, _MazeUtils.GridLocation.TOP_MIDDLE, _MazeUtils.GridLocation.BOTTOM_MIDDLE];
        }
    }, {
        key: "getDefaultStartingLocation",
        value: function getDefaultStartingLocation() {
            return _MazeUtils.GridLocation.MIDDLE_LEFT;
        }
    }, {
        key: "getDefaultExitLocation",
        value: function getDefaultExitLocation() {
            return _MazeUtils.GridLocation.MIDDLE_RIGHT;
        }
    }]);

    return DiamondMazeGrid;
}(_MazeGrid2.MazeGrid);

},{"../managers/MazeUtils":21,"../models/MazeGrid":41}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlusSignMazeGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MazeUtils = require("../managers/MazeUtils");

var _MazeGrid2 = require("../models/MazeGrid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlusSignMazeGrid = exports.PlusSignMazeGrid = function (_MazeGrid) {
    _inherits(PlusSignMazeGrid, _MazeGrid);

    function PlusSignMazeGrid(game, mazeSizeX) {
        _classCallCheck(this, PlusSignMazeGrid);

        var bufferX = Math.ceil(mazeSizeX / 3);
        var bufferY = Math.ceil(mazeSizeX / 3);
        return _possibleConstructorReturn(this, (PlusSignMazeGrid.__proto__ || Object.getPrototypeOf(PlusSignMazeGrid)).call(this, game, mazeSizeX + bufferX, mazeSizeX + bufferY, _MazeUtils.MazeGridType.PLUS_SIGN));
    }

    _createClass(PlusSignMazeGrid, [{
        key: "generateMazeGrid",
        value: function generateMazeGrid() {
            // Generate a normal grid and then mark cells dead
            _get(PlusSignMazeGrid.prototype.__proto__ || Object.getPrototypeOf(PlusSignMazeGrid.prototype), "generateMazeGrid", this).call(this);
            var xRange = this.getXRange();
            var yRange = this.getYRange();
            // Top left
            this.markCellRangeCornerDead(0, xRange, 0, yRange);
            // Bottom Left
            this.markCellRangeCornerDead(0, xRange, this.sizeY - yRange, this.sizeY);
            // Top Right
            this.markCellRangeCornerDead(this.sizeX - xRange, this.sizeX, 0, yRange);
            // Bottom Right
            this.markCellRangeCornerDead(this.sizeX - xRange, this.sizeX, this.sizeY - yRange, this.sizeY);
        }
    }, {
        key: "getXRange",
        value: function getXRange() {
            return Math.ceil(this.sizeX / 3);
        }
    }, {
        key: "getYRange",
        value: function getYRange() {
            return Math.ceil(this.sizeY / 3);
        }
    }, {
        key: "markCellRangeCornerDead",
        value: function markCellRangeCornerDead(xStart, xEnd, yStart, yEnd) {
            for (var x = xStart; x < xEnd; x++) {
                for (var y = yStart; y < yEnd; y++) {
                    this.setDeadCell({ x: x, y: y });
                }
            }
        }
    }, {
        key: "getValidStartLocations",
        value: function getValidStartLocations() {
            return [_MazeUtils.GridLocation.MIDDLE_LEFT, _MazeUtils.GridLocation.TOP_MIDDLE, _MazeUtils.GridLocation.BOTTOM_MIDDLE, _MazeUtils.GridLocation.MIDDLE_RIGHT];
        }
    }, {
        key: "getValidExitLocations",
        value: function getValidExitLocations() {
            return [_MazeUtils.GridLocation.MIDDLE_RIGHT, _MazeUtils.GridLocation.TOP_MIDDLE, _MazeUtils.GridLocation.BOTTOM_MIDDLE, _MazeUtils.GridLocation.MIDDLE_LEFT];
        }
    }, {
        key: "getDefaultStartingLocation",
        value: function getDefaultStartingLocation() {
            return _MazeUtils.GridLocation.MIDDLE_LEFT;
        }
    }, {
        key: "getDefaultExitLocation",
        value: function getDefaultExitLocation() {
            return _MazeUtils.GridLocation.MIDDLE_RIGHT;
        }
    }]);

    return PlusSignMazeGrid;
}(_MazeGrid2.MazeGrid);

},{"../managers/MazeUtils":21,"../models/MazeGrid":41}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RectangleMazeGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MazeUtils = require("../managers/MazeUtils");

var _MazeGrid2 = require("../models/MazeGrid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LENGTH_TO_WIDTH_RATIO = 1.5;

var RectangleMazeGrid = exports.RectangleMazeGrid = function (_MazeGrid) {
    _inherits(RectangleMazeGrid, _MazeGrid);

    function RectangleMazeGrid(game, mazeSizeX) {
        _classCallCheck(this, RectangleMazeGrid);

        // Use really crazy math.  And it works.  Don't question it.
        var shortSide = Math.ceil(mazeSizeX / LENGTH_TO_WIDTH_RATIO);
        var longSide = Math.floor(Math.pow(mazeSizeX, 2) / shortSide);
        return _possibleConstructorReturn(this, (RectangleMazeGrid.__proto__ || Object.getPrototypeOf(RectangleMazeGrid)).call(this, game, shortSide, longSide, _MazeUtils.MazeGridType.RECTANGLE));
    }

    _createClass(RectangleMazeGrid, [{
        key: "getValidStartLocations",
        value: function getValidStartLocations() {
            return [_MazeUtils.GridLocation.BOTTOM_LEFT, _MazeUtils.GridLocation.BOTTOM_RIGHT, _MazeUtils.GridLocation.TOP_LEFT, _MazeUtils.GridLocation.TOP_RIGHT];
        }
    }, {
        key: "getValidExitLocations",
        value: function getValidExitLocations() {
            return [_MazeUtils.GridLocation.BOTTOM_RIGHT, _MazeUtils.GridLocation.BOTTOM_LEFT, _MazeUtils.GridLocation.TOP_LEFT, _MazeUtils.GridLocation.TOP_RIGHT];
        }
    }, {
        key: "getDefaultStartingLocation",
        value: function getDefaultStartingLocation() {
            return _MazeUtils.GridLocation.TOP_LEFT;
        }
    }, {
        key: "getDefaultExitLocation",
        value: function getDefaultExitLocation() {
            return _MazeUtils.GridLocation.BOTTOM_RIGHT;
        }
    }]);

    return RectangleMazeGrid;
}(_MazeGrid2.MazeGrid);

},{"../managers/MazeUtils":21,"../models/MazeGrid":41}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SquareMazeGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MazeUtils = require("../managers/MazeUtils");

var _MazeGrid2 = require("../models/MazeGrid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SquareMazeGrid = exports.SquareMazeGrid = function (_MazeGrid) {
    _inherits(SquareMazeGrid, _MazeGrid);

    function SquareMazeGrid(game, mazeSizeX) {
        _classCallCheck(this, SquareMazeGrid);

        return _possibleConstructorReturn(this, (SquareMazeGrid.__proto__ || Object.getPrototypeOf(SquareMazeGrid)).call(this, game, mazeSizeX, mazeSizeX, _MazeUtils.MazeGridType.RECTANGLE));
    }

    _createClass(SquareMazeGrid, [{
        key: "getValidStartLocations",
        value: function getValidStartLocations() {
            return [_MazeUtils.GridLocation.TOP_LEFT, _MazeUtils.GridLocation.BOTTOM_LEFT, _MazeUtils.GridLocation.BOTTOM_RIGHT, _MazeUtils.GridLocation.TOP_RIGHT];
        }
    }, {
        key: "getValidExitLocations",
        value: function getValidExitLocations() {
            return [_MazeUtils.GridLocation.BOTTOM_RIGHT, _MazeUtils.GridLocation.BOTTOM_LEFT, _MazeUtils.GridLocation.TOP_LEFT, _MazeUtils.GridLocation.TOP_RIGHT];
        }
    }, {
        key: "getDefaultStartingLocation",
        value: function getDefaultStartingLocation() {
            return _MazeUtils.GridLocation.TOP_LEFT;
        }
    }, {
        key: "getDefaultExitLocation",
        value: function getDefaultExitLocation() {
            return _MazeUtils.GridLocation.BOTTOM_RIGHT;
        }
    }]);

    return SquareMazeGrid;
}(_MazeGrid2.MazeGrid);

},{"../managers/MazeUtils":21,"../models/MazeGrid":41}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BacktrackerMaze = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MazeUtils = require("../managers/MazeUtils");

var _Maze2 = require("../models/Maze");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BacktrackerMaze = exports.BacktrackerMaze = function (_Maze) {
    _inherits(BacktrackerMaze, _Maze);

    function BacktrackerMaze(game, mazeSizeX, mazeGridType) {
        _classCallCheck(this, BacktrackerMaze);

        var _this = _possibleConstructorReturn(this, (BacktrackerMaze.__proto__ || Object.getPrototypeOf(BacktrackerMaze)).call(this, game, mazeSizeX, mazeGridType, _MazeUtils.MazeAlgorithmType.BACK_TRACKER));

        _this.currentTile = null;
        _this.stack = [];
        _this.isDone = false;
        _this.generateMaze();
        return _this;
    }

    _createClass(BacktrackerMaze, [{
        key: "generateMaze",
        value: function generateMaze() {
            this.currentTile = this.getCell(this.grid.internalStartTile);
            this.backtrackDFS();
            _get(BacktrackerMaze.prototype.__proto__ || Object.getPrototypeOf(BacktrackerMaze.prototype), "generateMaze", this).call(this);
        }
    }, {
        key: "backtrackDFS",
        value: function backtrackDFS() {
            while (!this.isDone) {
                if (!this.currentTile.isVisited) {
                    this.currentTile.setVisited();
                    this.stack.push(this.currentTile);
                }
                // Add neighbors
                var unvisitedNeighborList = [];
                var neighbors = this.getNeighbors(this.currentTile);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = neighbors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var neigh = _step.value;

                        if (!neigh.isVisited) {
                            unvisitedNeighborList.push(neigh);
                        }
                    }
                    // Pick a random unvisited neighbour
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (unvisitedNeighborList.length > 0) {
                    var randomIndex = Math.floor(Math.random() * unvisitedNeighborList.length);
                    var nextTile = unvisitedNeighborList[randomIndex];
                    // Remove Walls
                    this.removeWallBetweenCells(this.currentTile, nextTile);
                    // Assign new current tile
                    this.currentTile = nextTile;
                }
                // Allow edge pieces with only single connections to connect with already-visited tiles
                else if (neighbors.length === 1) {
                        var _nextTile = neighbors[0];
                        // Remove Walls
                        this.removeWallBetweenCells(this.currentTile, _nextTile);
                        // Assign new current tile
                        this.currentTile = _nextTile;
                    }
                    // If all neighbours visited, pick a random unvisited cell
                    else if (this.stack.length > 0) {
                            this.currentTile = this.stack.pop();
                        } else {
                            this.isDone = true;
                        }
            }
            // Backtracker does not guarantee "odd" shaped grids (ie. diamond)
            // will actually visit every single tile.  Clean up any unvisited cells after.
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.grid.getAllCells()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var cell = _step2.value;

                    if (!cell.isVisited) {
                        var _neighbors = this.getNeighbors(cell);
                        if (_neighbors && _neighbors.length > 0) {
                            this.removeWallBetweenCells(cell, _neighbors[0]);
                        } else {
                            console.error("Impossible to reach cell for backtracker.  Unable to cleanup.");
                        }
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }]);

    return BacktrackerMaze;
}(_Maze2.Maze);

},{"../managers/MazeUtils":21,"../models/Maze":39}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BinaryTreeMaze = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MazeUtils = require("../managers/MazeUtils");

var _Maze2 = require("../models/Maze");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//TODO: why can i not import the regular one.
var DIRECTION_UP = { x: 0, y: -1 };
var DIRECTION_LEFT = { x: -1, y: 0 };
var VALID_DIR_ARR = [DIRECTION_LEFT, DIRECTION_UP];

var BinaryTreeMaze = exports.BinaryTreeMaze = function (_Maze) {
    _inherits(BinaryTreeMaze, _Maze);

    function BinaryTreeMaze(game, mazeSizeX, mazeGridType) {
        _classCallCheck(this, BinaryTreeMaze);

        if (mazeGridType === _MazeUtils.MazeGridType.PLUS_SIGN || mazeGridType === _MazeUtils.MazeGridType.DIAMOND) {
            console.error("Invalid grid type " + mazeGridType + " for binary tree maze.");
            mazeGridType = _MazeUtils.MazeGridType.SQUARE;
        }

        var _this = _possibleConstructorReturn(this, (BinaryTreeMaze.__proto__ || Object.getPrototypeOf(BinaryTreeMaze)).call(this, game, mazeSizeX, mazeGridType, _MazeUtils.MazeAlgorithmType.BINARY_TREE));

        _this.generateMaze();
        return _this;
    }

    _createClass(BinaryTreeMaze, [{
        key: "generateMaze",
        value: function generateMaze() {
            for (var y = 0; y < this.grid.sizeY; y++) {
                for (var x = 0; x < this.grid.sizeX; x++) {
                    if (!this.grid.isValidTile({ x: x, y: y })) continue;
                    var validDirs = this.getValidDirs(x, y);
                    if (validDirs.length === 0) {
                        continue;
                    }
                    // Choose random direction and determine it's inverse
                    var randomIndex = (0, _MazeUtils.getRandomInteger)(0, validDirs.length - 1);
                    var randomTileVector = validDirs[randomIndex];
                    var inverseTileVector = (0, _MazeUtils.getInverseTileVector)(randomTileVector);
                    // Get current tile and neighbour tile
                    var currentTile = { x: x, y: y };
                    var newTile = (0, _MazeUtils.getNewTilePositionByVector)(currentTile, randomTileVector);
                    // Convert to maze grid cell
                    var currentCell = this.getCell(currentTile);
                    var newCell = this.getCell(newTile);
                    // Remove wall connecting neighbors
                    // this.removeWallByTileVector(currentCell, randomTileVector);
                    // this.removeWallByTileVector(newCell, inverseTileVector);
                    this.removeWallBetweenCells(currentCell, newCell);
                }
            }
            _get(BinaryTreeMaze.prototype.__proto__ || Object.getPrototypeOf(BinaryTreeMaze.prototype), "generateMaze", this).call(this);
        }
    }, {
        key: "getValidDirs",
        value: function getValidDirs(x, y) {
            // Biased LEFT and UP. Defend against edge case movements.
            var validDirs = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = VALID_DIR_ARR[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var dir = _step.value;

                    var testTile = (0, _MazeUtils.getNewTilePositionByVector)(dir, { x: x, y: y });
                    if (this.grid.isValidTile(testTile)) {
                        validDirs.push(dir);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return validDirs;
        }
    }]);

    return BinaryTreeMaze;
}(_Maze2.Maze);

},{"../managers/MazeUtils":21,"../models/Maze":39}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PrimsMaze = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MazeUtils = require("../managers/MazeUtils");

var _Maze2 = require("../models/Maze");

var _priorityjs = require("priorityjs");

var _priorityjs2 = _interopRequireDefault(_priorityjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrimsMaze = exports.PrimsMaze = function (_Maze) {
    _inherits(PrimsMaze, _Maze);

    function PrimsMaze(game, mazeSizeX, mazeGridType) {
        _classCallCheck(this, PrimsMaze);

        var _this = _possibleConstructorReturn(this, (PrimsMaze.__proto__ || Object.getPrototypeOf(PrimsMaze)).call(this, game, mazeSizeX, mazeGridType, _MazeUtils.MazeAlgorithmType.PRIMS));

        _this.visitedCellSet = new Set();
        _this.nextToVisitSet = new Set();
        // Consider making this random.
        _this.startingX = _this.grid.internalStartTile.x;
        _this.startingY = _this.grid.internalStartTile.y;
        _this.queue = new _priorityjs2.default.PriorityQ(function (dirCellPair1, dirCellPair2) {
            var cell1Dir = _this.mapPriorityVal(dirCellPair1);
            var cell2Dir = _this.mapPriorityVal(dirCellPair2);
            return cell1Dir <= cell2Dir;
        });
        _this.generateMaze();
        return _this;
    }

    _createClass(PrimsMaze, [{
        key: "mapPriorityVal",
        value: function mapPriorityVal(dirCellPair) {
            return Math.random();
            // const dir = dirCellPair[0];
            // const val = Math.random();
            // if (dir === MazeDirectionIndex.UP) return val*.1;
            // if (dir === MazeDirectionIndex.DOWN) return val*5;
            // if (dir === MazeDirectionIndex.RIGHT) return val*5;
            // if (dir === MazeDirectionIndex.LEFT) return val*.1;
            // return 0; 
        }
    }, {
        key: "getDistanceFromStart",
        value: function getDistanceFromStart(cell) {
            return Math.sqrt(Math.pow(cell.x - this.startingX, 2) + Math.pow(cell.y - this.startingY, 2));
        }
    }, {
        key: "generateMaze",
        value: function generateMaze() {
            var startCell = this.getCell({ x: this.startingX, y: this.startingY });
            this.setCellVisited(startCell);
            this.addUnvisitedNeighborsToNext(startCell);
            this.prims();
        }
    }, {
        key: "getNextCellToVisit",
        value: function getNextCellToVisit() {
            var nextCell = this.queue.pop()[1];
            // Remove from to-visit list
            var nextTileKey = nextCell.getTileKey();
            this.nextToVisitSet.delete(nextTileKey);
            return this.getCellByTileKey(nextTileKey);
        }
    }, {
        key: "prims",
        value: function prims() {
            while (this.queue.size() > 0) {
                // Choose a random unvisited cell
                var currentCell = this.getNextCellToVisit();
                if (this.isCellVisited(currentCell)) {
                    return;
                }
                this.setCellVisited(currentCell);
                this.addUnvisitedNeighborsToNext(currentCell);
                // Get all visited neighbors
                var visitedNeighbors = this.getVisitedNeighbors(currentCell);
                if (visitedNeighbors.length === 0) {
                    console.error("Prim has failed me");
                    return;
                }
                // Pick a random visited neighbor
                var neighborCell = visitedNeighbors[(0, _MazeUtils.getRandomInteger)(0, visitedNeighbors.length - 1)];
                // Remove wall between current and neighbor cell
                this.removeWallBetweenCells(currentCell, neighborCell);
            }
        }
    }, {
        key: "addUnvisitedNeighborsToNext",
        value: function addUnvisitedNeighborsToNext(cell) {
            var neighbors = this.getNeighbors(cell);
            // Add all unvisited neighbors to the to-visit list
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = neighbors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var neighbor = _step.value;

                    // Avoid duplicate adding neighbors (visited + already in queue)
                    if (!this.isCellVisited(neighbor) && !this.nextToVisitSet.has(neighbor.getTileKey())) {
                        var dirIndex = (0, _MazeUtils.getCellNeighborDirectionIndex)(cell, neighbor);
                        this.nextToVisitSet.add(neighbor.getTileKey());
                        this.queue.push([dirIndex, neighbor]);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "getVisitedNeighbors",
        value: function getVisitedNeighbors(cell) {
            var _this2 = this;

            var visitedNeighbors = this.getNeighbors(cell).filter(function (neighbor) {
                return _this2.isCellVisited(neighbor);
            });
            return visitedNeighbors;
        }
        //TODO: visited cell set needs MazeGrid integration

    }, {
        key: "setCellVisited",
        value: function setCellVisited(cell) {
            this.visitedCellSet.add(cell.getTileKey());
        }
    }, {
        key: "isCellVisited",
        value: function isCellVisited(cell) {
            return this.visitedCellSet.has(cell.getTileKey());
        }
    }]);

    return PrimsMaze;
}(_Maze2.Maze);

},{"../managers/MazeUtils":21,"../models/Maze":39,"priorityjs":1}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ColorConstants = require("../constants/ColorConstants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BiomeColorPalette = function BiomeColorPalette(playerColor, botColor, emptyColor, visitedTileColor, mazeWallColor) {
    var deadEndColor = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _ColorConstants.DEFAULT_COLORS.DEAD_END_COLOR;
    var smartPathingPlayerColor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : _ColorConstants.DEFAULT_COLORS.SMART_PATHING_PLAYER_COLOR;
    var multiplierItemPlayerColor = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : _ColorConstants.DEFAULT_COLORS.MULTIPLIER_ITEM_PLAYER_COLOR;
    var unlimitedSplitBotPlayerColor = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : _ColorConstants.DEFAULT_COLORS.UNLIMITED_SPLIT_BOT_PLAYER_COLOR;
    var ghostItemPlayerColor = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : _ColorConstants.DEFAULT_COLORS.GHOST_ITEM_PLAYER_COLOR;

    _classCallCheck(this, BiomeColorPalette);

    this.playerColor = playerColor;
    this.botColor = botColor;
    this.tileColor = emptyColor;
    this.visitedTileColor = visitedTileColor;
    this.mazeWallColor = mazeWallColor;
    this.deadEndColor = deadEndColor;
    this.smartPathingPlayerColor = smartPathingPlayerColor;
    this.multiplierItemPlayerColor = multiplierItemPlayerColor;
    this.unlimitedSplitBotPlayerColor = unlimitedSplitBotPlayerColor;
    this.ghostItemPlayerColor = ghostItemPlayerColor;
};

exports.default = BiomeColorPalette;

},{"../constants/ColorConstants":3}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Maze = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MazeUtils = require("../managers/MazeUtils");

var _PlusSignMazeGrid = require("../mazeGrid/PlusSignMazeGrid");

var _RectangleMazeGrid = require("../mazeGrid/RectangleMazeGrid");

var _DiamondMazeGrid = require("../mazeGrid/DiamondMazeGrid");

var _SquareMazeGrid = require("../mazeGrid/SquareMazeGrid");

var _DestructibleWallUpgrade = require("../upgrades/definitions/maze/DestructibleWallUpgrade");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Maze = exports.Maze = function () {
    function Maze(game, mazeSizeX, mazeGridType, mazeAlgorithmType) {
        _classCallCheck(this, Maze);

        this.game = game;
        this.mazeAlgorithmType = mazeAlgorithmType;
        this.generateGrid(mazeSizeX, mazeGridType);
    }

    _createClass(Maze, [{
        key: "generateMaze",
        value: function generateMaze() {
            // Reset visited array
            this.grid.resetVisitedTiles();
        }
    }, {
        key: "generateGrid",
        value: function generateGrid(mazeSizeX, mazeGridType) {
            if (mazeGridType === _MazeUtils.MazeGridType.SQUARE) {
                this.grid = new _SquareMazeGrid.SquareMazeGrid(this.game, mazeSizeX);
            } else if (mazeGridType === _MazeUtils.MazeGridType.PLUS_SIGN) {
                this.grid = new _PlusSignMazeGrid.PlusSignMazeGrid(this.game, mazeSizeX);
            } else if (mazeGridType === _MazeUtils.MazeGridType.RECTANGLE) {
                this.grid = new _RectangleMazeGrid.RectangleMazeGrid(this.game, mazeSizeX);
            } else if (mazeGridType === _MazeUtils.MazeGridType.DIAMOND) {
                this.grid = new _DiamondMazeGrid.DiamondMazeGrid(this.game, mazeSizeX);
            } else {
                throw "You didn't make this yet! " + mazeGridType;
            }
        }
    }, {
        key: "getCell",
        value: function getCell(tile) {
            return this.grid.getCell(tile);
        }
    }, {
        key: "getCellByTileKey",
        value: function getCellByTileKey(tileKey) {
            return this.getCell((0, _MazeUtils.getTileFromTileKey)(tileKey));
        }
    }, {
        key: "getCellWallType",
        value: function getCellWallType(tile, wallDirectionIndex) {
            var cell = this.grid.getCell(tile, true);
            return cell ? cell.walls[wallDirectionIndex] : null;
        }
    }, {
        key: "getNeighbors",
        value: function getNeighbors(cell) {
            var neighborsArr = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _MazeUtils.DIRECTIONS_ARR[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var dir = _step.value;

                    var neighbor = this.grid.getCell({ x: cell.x + dir.x, y: cell.y + dir.y });
                    if (neighbor) {
                        neighborsArr.push(neighbor);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return neighborsArr;
        }
    }, {
        key: "removeWallByDirIndex",
        value: function removeWallByDirIndex(mazeCell, directionIndex) {
            var wallType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _MazeUtils.MazeWallTypes.NO_WALL;

            mazeCell.setWallTypeAtIndex(directionIndex, wallType);
        }
    }, {
        key: "removeWallBetweenCells",
        value: function removeWallBetweenCells(mazeCell, neighborCell) {
            // Calculate vector between tiles and convert it to a wall direction index
            var tileVector = (0, _MazeUtils.getCellNeighborTileVector)(mazeCell, neighborCell);
            var directionIndex = (0, _MazeUtils.getMazeDirectionIndexFromTileVector)(tileVector);
            var neighorDirectionIndex = (0, _MazeUtils.getInverseDirectionIndex)(directionIndex);
            // Determine randomly if this wall is going to be destructible
            var wallType = this.isDestructibleWall() ? _MazeUtils.MazeWallTypes.DESTRUCTIBLE_WALL : _MazeUtils.MazeWallTypes.NO_WALL;
            this.removeWallByDirIndex(mazeCell, directionIndex, wallType);
            this.removeWallByDirIndex(neighborCell, neighorDirectionIndex, wallType);
        }
    }, {
        key: "isDestructibleWall",
        value: function isDestructibleWall() {
            var prob = _DestructibleWallUpgrade.DestructibleWallUpgrade.getDestructibleWallSpawnProbability(this.game);
            var randomNumber = Math.random();
            return prob > randomNumber;
        }
    }]);

    return Maze;
}();

},{"../managers/MazeUtils":21,"../mazeGrid/DiamondMazeGrid":31,"../mazeGrid/PlusSignMazeGrid":32,"../mazeGrid/RectangleMazeGrid":33,"../mazeGrid/SquareMazeGrid":34,"../upgrades/definitions/maze/DestructibleWallUpgrade":65}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MazeCell = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MazeUtils = require('../managers/MazeUtils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MazeCell = exports.MazeCell = function () {
    function MazeCell(x, y) {
        var isDeadCell = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck(this, MazeCell);

        this.x = x;
        this.y = y;
        this.walls = [_MazeUtils.MazeWallTypes.WALL, _MazeUtils.MazeWallTypes.WALL, _MazeUtils.MazeWallTypes.WALL, _MazeUtils.MazeWallTypes.WALL];
        this.isVisited = false;
        this.setDeadCell(isDeadCell);
    }

    _createClass(MazeCell, [{
        key: 'setWallTypeAtIndex',
        value: function setWallTypeAtIndex(wallDirectionIndex, wallType) {
            this.walls[wallDirectionIndex] = wallType;
        }
    }, {
        key: 'isMarkedAsDeadEnd',
        value: function isMarkedAsDeadEnd() {
            return !!this.deadEndCellValue;
        }
    }, {
        key: 'getDeadEndCelLValue',
        value: function getDeadEndCelLValue() {
            return this.deadEndCellValue;
        }
    }, {
        key: 'setDeadEndCellValue',
        value: function setDeadEndCellValue(deadEndCellValue) {
            this.deadEndCellValue = deadEndCellValue;
        }
    }, {
        key: 'getTile',
        value: function getTile() {
            return { x: this.x, y: this.y };
        }
    }, {
        key: 'getTileKey',
        value: function getTileKey() {
            return (0, _MazeUtils.generateTileKey)(this.x, this.y);
        }
    }, {
        key: 'setVisited',
        value: function setVisited() {
            var isVisited = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this.isVisited = isVisited;
        }
    }, {
        key: 'isCellDead',
        value: function isCellDead() {
            return this._isCellDead;
        }
    }, {
        key: 'setDeadCell',
        value: function setDeadCell() {
            var isDead = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this._isCellDead = isDead;
            if (this._isCellDead) {
                this.walls = [_MazeUtils.MazeWallTypes.OUT_OF_BOUNDS_WALL, _MazeUtils.MazeWallTypes.OUT_OF_BOUNDS_WALL, _MazeUtils.MazeWallTypes.OUT_OF_BOUNDS_WALL, _MazeUtils.MazeWallTypes.OUT_OF_BOUNDS_WALL];
            }
        }
    }, {
        key: 'getMazeItem',
        value: function getMazeItem() {
            return this.mazeItem;
        }
    }, {
        key: 'setMazeItem',
        value: function setMazeItem(mazeItem) {
            this.mazeItem = mazeItem;
        }
    }, {
        key: 'hasMazeItem',
        value: function hasMazeItem() {
            return this.mazeItem != null;
        }
    }, {
        key: 'deleteItem',
        value: function deleteItem() {
            if (!this.hasMazeItem()) {
                return;
            }
            this.mazeItem = null;
        }
    }]);

    return MazeCell;
}();

},{"../managers/MazeUtils":21}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MazeGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MazeUtils = require("../managers/MazeUtils");

var _MazeCell = require("./MazeCell");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MazeGrid = exports.MazeGrid = function () {
    function MazeGrid(game, sizeX, sizeY, mazeGridType) {
        _classCallCheck(this, MazeGrid);

        this.isRandomStartLocation = false;
        this.game = game;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.mazeGridType = mazeGridType;
        this.tileCount = 0;
        this.generateMazeGrid();
        this.setStartAndEndTile();
    }

    _createClass(MazeGrid, [{
        key: "generateMazeGrid",
        value: function generateMazeGrid() {
            // Default fill the whole grid with regular cells
            this.grid = [];
            for (var y = 0; y < this.sizeY; y++) {
                this.grid[y] = new Array();
                for (var x = 0; x < this.sizeX; x++) {
                    this.grid[y][x] = new _MazeCell.MazeCell(x, y);
                    this.tileCount++;
                }
            }
        }
    }, {
        key: "setStartAndEndTile",
        value: function setStartAndEndTile() {
            var startGridLocation = this.chooseMazeStartGridLocation();
            var startGridCell = (0, _MazeUtils.getGridCellByLocation)(this, startGridLocation);
            if (!startGridCell || startGridCell.isCellDead()) {
                throw 'Invalid grid cell starting point.';
            }
            this.internalStartTile = startGridCell;
            var exitGridLocation = this.chooseMazeEndGridLocation(startGridLocation);
            var exitGridCell = (0, _MazeUtils.getGridCellByLocation)(this, exitGridLocation);
            if (!exitGridCell || exitGridCell.isCellDead()) {
                throw 'Invalid grid cell ending point.';
            }
            this.internalExitTile = exitGridCell;
            this.exitDirectionVector = (0, _MazeUtils.getExitDirectionByGridLocation)(exitGridLocation);
            this.externalExitTile = (0, _MazeUtils.getNewTilePositionByVector)(this.internalExitTile, this.exitDirectionVector);
            this.getCell(this.internalExitTile).setWallTypeAtIndex((0, _MazeUtils.getMazeDirectionIndexFromTileVector)(this.exitDirectionVector), _MazeUtils.MazeWallTypes.NO_WALL);
        }
    }, {
        key: "resetVisitedTiles",
        value: function resetVisitedTiles() {
            for (var y = 0; y < this.sizeY; y++) {
                for (var x = 0; x < this.sizeX; x++) {
                    this.getCell({ x: x, y: y }, true).setVisited(false);
                }
            }
        }
    }, {
        key: "setDeadCell",
        value: function setDeadCell(tile) {
            this.tileCount--;
            this.getCell(tile).setDeadCell();
        }
    }, {
        key: "isValidTile",
        value: function isValidTile(tile) {
            var includeDeadCells = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            //TODO: this should actually check the physical cell
            return tile.x >= 0 && tile.x < this.sizeX && tile.y >= 0 && tile.y < this.sizeY && (includeDeadCells || !this.grid[tile.y][tile.x].isCellDead());
        }
    }, {
        key: "getCell",
        value: function getCell(tile) {
            var includeDeadCells = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!this.isValidTile(tile, includeDeadCells)) {
                return null;
            }
            return this.grid[tile.y][tile.x];
        }
    }, {
        key: "isVisited",
        value: function isVisited(tile) {
            // Exit tile is not visited.
            if ((0, _MazeUtils.isTileEqual)(tile, this.externalExitTile)) return false;
            var cell = this.getCell(tile);
            if (cell) {
                return cell.isVisited;
            }
        }
    }, {
        key: "setVisited",
        value: function setVisited(tile) {
            if (!this.isValidTile(tile)) return;
            this.getCell(tile).setVisited();
        }
    }, {
        key: "getCellByTileKey",
        value: function getCellByTileKey(tileKey) {
            return this.getCell((0, _MazeUtils.getTileFromTileKey)(tileKey));
        }
    }, {
        key: "getCellWallType",
        value: function getCellWallType(tile, wallDirectionIndex) {
            return this.getCell(tile).walls[wallDirectionIndex];
        }
    }, {
        key: "getTileCount",
        value: function getTileCount() {
            return this.tileCount;
        }
    }, {
        key: "isMazeExitTile",
        value: function isMazeExitTile(tile) {
            return (0, _MazeUtils.isTileEqual)(tile, this.externalExitTile);
        }
    }, {
        key: "getAllCells",
        value: function getAllCells() {
            var cellList = [];
            for (var y = 0; y < this.sizeY; y++) {
                for (var x = 0; x < this.sizeX; x++) {
                    var cell = this.getCell({ x: x, y: y });
                    if (cell && !cell.isCellDead()) {
                        cellList.push(cell);
                    }
                }
            }
            return cellList;
        }
    }, {
        key: "chooseMazeStartGridLocation",
        value: function chooseMazeStartGridLocation() {
            var validStartLocations = this.getValidStartLocations();
            if (this.isRandomStartLocation) {
                return validStartLocations[(0, _MazeUtils.getRandomInteger)(0, validStartLocations.length - 1)];
            }
            return this.getDefaultStartingLocation();
        }
    }, {
        key: "chooseMazeEndGridLocation",
        value: function chooseMazeEndGridLocation(startingLocation) {
            var validEndLocationsSet = new Set(this.getValidExitLocations());
            validEndLocationsSet.delete(startingLocation);
            var validEndLocations = Array.from(validEndLocationsSet);
            if (this.isRandomStartLocation) {
                return validEndLocations[(0, _MazeUtils.getRandomInteger)(0, validEndLocations.length - 1)];
            }
            return this.getDefaultExitLocation();
        }
    }, {
        key: "getValidStartLocations",
        value: function getValidStartLocations() {
            throw "No start location defined for grid type: " + this.mazeGridType + ".";
        }
    }, {
        key: "getValidExitLocations",
        value: function getValidExitLocations() {
            throw "No exit location defined for grid type: " + this.mazeGridType;
        }
    }, {
        key: "getDefaultStartingLocation",
        value: function getDefaultStartingLocation() {
            throw "No default starat location defined for grid type: " + this.mazeGridType;
        }
    }, {
        key: "getDefaultExitLocation",
        value: function getDefaultExitLocation() {
            throw "No default exit location defined for grid type: " + this.mazeGridType;
        }
    }]);

    return MazeGrid;
}();

},{"../managers/MazeUtils":21,"./MazeCell":40}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PowerUpConstants = require("../constants/PowerUpConstants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player(game, id) {
        var currTile = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var prevTile = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        _classCallCheck(this, Player);

        this.game = game;
        this.id = id;
        this.currTile = currTile;
        this.prevTile = prevTile;
        this.moveCount = 0;
        this.smartPathingTileDistanceRemaining = 0;
        this._ghostItemTileDistanceRemaining = 0;
        this.isManuallyControlled = false;
        this._isUnlimitedSplitItemActive = false;
        this._isPathingFromDeadEnd = false;
    }

    _createClass(Player, [{
        key: "isSmartPathingActive",
        value: function isSmartPathingActive() {
            return this.smartPathingTileDistanceRemaining > 0;
        }
    }, {
        key: "reduceSmartPathingDistance",
        value: function reduceSmartPathingDistance() {
            var distance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            this.smartPathingTileDistanceRemaining = Math.max(0, this.smartPathingTileDistanceRemaining - distance);
        }
    }, {
        key: "isMultiplierPowerUpActive",
        value: function isMultiplierPowerUpActive() {
            return this.game.powerUps.isPowerUpActive(_PowerUpConstants.PowerUpKey.POINTS_MULTIPLIER);
        }
    }, {
        key: "isUnlimitedSplitItemActive",
        value: function isUnlimitedSplitItemActive() {
            return this._isUnlimitedSplitItemActive;
        }
    }, {
        key: "setIsUnlimitedSplitItemActive",
        value: function setIsUnlimitedSplitItemActive(setActive) {
            this._isUnlimitedSplitItemActive = setActive;
        }
    }, {
        key: "isGhostItemActive",
        value: function isGhostItemActive() {
            return this._ghostItemTileDistanceRemaining > 0;
        }
    }, {
        key: "addGhostPathingDistance",
        value: function addGhostPathingDistance(distance) {
            this._ghostItemTileDistanceRemaining = Math.max(0, this._ghostItemTileDistanceRemaining + distance);
        }
    }, {
        key: "isPathingFromDeadEnd",
        value: function isPathingFromDeadEnd() {
            return this._isPathingFromDeadEnd;
        }
    }, {
        key: "setIsPathingFromDeadEnd",
        value: function setIsPathingFromDeadEnd(isPathingFromDeadEnd) {
            this._isPathingFromDeadEnd = isPathingFromDeadEnd;
        }
    }, {
        key: "mergePlayerPassives",
        value: function mergePlayerPassives(mergedPlayer) {
            if (mergedPlayer.isSmartPathingActive()) {
                this.smartPathingTileDistanceRemaining += mergedPlayer.smartPathingTileDistanceRemaining;
            }
            if (mergedPlayer.isGhostItemActive()) {
                this._ghostItemTileDistanceRemaining += mergedPlayer._ghostItemTileDistanceRemaining;
            }
            if (mergedPlayer.isUnlimitedSplitItemActive()) {
                this.setIsUnlimitedSplitItemActive(mergedPlayer.isUnlimitedSplitItemActive());
            }
        }
    }]);

    return Player;
}();

exports.default = Player;

},{"../constants/PowerUpConstants":6}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SLIDING_WINDOW_LENGTH = 40;

var PointsHistoryTracker = exports.PointsHistoryTracker = function () {
    function PointsHistoryTracker(game, statsKey) {
        _classCallCheck(this, PointsHistoryTracker);

        this.currIndex = 0;
        this.game = game;
        this.statsKey = statsKey;
        this.resetHistory();
    }

    _createClass(PointsHistoryTracker, [{
        key: "resetHistory",
        value: function resetHistory() {
            this.slidingWindow = new Array(SLIDING_WINDOW_LENGTH).fill(0);
            this.currentTotal = 0;
            this.currentDataPoints = 0;
            this.currIndex = 0;
            clearInterval(this.timer);
        }
    }, {
        key: "startTimer",
        value: function startTimer() {
            var _this = this;

            this.timer = setInterval(function () {
                // Add total from previous second.
                var prevIndex = _this.currIndex;
                var nextIndex = _this.getNextIndex();
                // Add most recently completed bucket
                _this.currentTotal += _this.slidingWindow[prevIndex];
                // Subtract the new bucket indexes total and zero it out
                _this.currentTotal -= _this.slidingWindow[nextIndex];
                _this.slidingWindow[nextIndex] = 0;
                // Update index after the fact.
                _this.currIndex = nextIndex;
                // Update average
                _this.updateStatsAverage();
                // Keep track of current points -- always short 1 data point from max
                _this.currentDataPoints = _this.currentDataPoints + 1 < _this.slidingWindow.length ? _this.currentDataPoints + 1 : _this.slidingWindow.length - 1;
            }, 1000);
        }
    }, {
        key: "getNextIndex",
        value: function getNextIndex() {
            return ++this.currIndex === this.slidingWindow.length ? 0 : this.currIndex;
        }
    }, {
        key: "updateStatsAverage",
        value: function updateStatsAverage() {
            var average = this.getAverage();
            this.game.stats.setStatsToKey(average, this.statsKey);
        }
    }, {
        key: "getAverage",
        value: function getAverage() {
            if (this.currentDataPoints === 0) return 0;
            return this.currentTotal / this.currentDataPoints;
        }
    }, {
        key: "addNumber",
        value: function addNumber(value) {
            if (!this.timer) {
                this.startTimer();
            }
            this.slidingWindow[this.currIndex] += value;
        }
    }]);

    return PointsHistoryTracker;
}();

},{}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PowerUp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PowerUpConstants = require("../constants/PowerUpConstants");

var _UserInterface = require("../managers/UserInterface");

var _devUtils = require("../dev/devUtils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UI_UPDATE_INTERVAL = 100;

var PowerUp = exports.PowerUp = function () {
    function PowerUp(game, powerUpKey, activateStatsKey) {
        _classCallCheck(this, PowerUp);

        this.game = game;
        this.powerUpKey = powerUpKey;
        this.activateStatsKey = activateStatsKey;
        this.resetAllTimers();
        this.initClick();
    }

    _createClass(PowerUp, [{
        key: "getUiStringName",
        value: function getUiStringName() {
            throw "No power up string name for powerup " + this.powerUpKey;
        }
    }, {
        key: "isPowerUpActiveOnPlayerId",
        value: function isPowerUpActiveOnPlayerId(playerId) {
            return this.isPowerUpActive();
        }
    }, {
        key: "getUiStatusString",
        value: function getUiStatusString() {
            if (this._isPowerUpActive) {
                return "ACTIVE: " + this.formatDisplayString(this.getActivateTimeLeft());
            } else if (this._isPowerUpOnCoolDown) {
                return "COOLDOWN: " + this.formatDisplayString(this.getCooldownTimeLeft());
            } else {
                return "READY";
            }
        }
    }, {
        key: "isPowerUpActive",
        value: function isPowerUpActive() {
            return this._isPowerUpActive;
        }
    }, {
        key: "getUiHtml",
        value: function getUiHtml() {
            return "<div class=\"button_label text\">" + this.getUiStringName() + "<br>" + this.getUiStatusString() + "</div>";
        }
    }, {
        key: "formatDisplayString",
        value: function formatDisplayString(duration) {
            return _UserInterface.UserInterface.getDecimalPrettyPrintNumber(duration / 1000, 1);
        }
    }, {
        key: "getCooldownTimeLeft",
        value: function getCooldownTimeLeft() {
            return this.game.powerUps.getPowerUpCooldownDuration(this.powerUpKey) - this.cooldownDurationCounterMs;
        }
    }, {
        key: "getActivateTimeLeft",
        value: function getActivateTimeLeft() {
            return this.game.powerUps.getPowerUpActivateDuration(this.powerUpKey) - this.activateDurationCounterMs;
        }
    }, {
        key: "resetAllTimers",
        value: function resetAllTimers() {
            var updateUiAfter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.resetActivateTimer();
            this.resetCooldownTimer();
            this.resetUiTimer(updateUiAfter);
        }
    }, {
        key: "resetUiTimer",
        value: function resetUiTimer() {
            var updateUiAfter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            clearInterval(this.uiUpdateTimer);
            this.uiUpdateTimer = null;
            if (updateUiAfter) {
                this.updateUi();
            }
        }
    }, {
        key: "resetActivateTimer",
        value: function resetActivateTimer() {
            clearTimeout(this.activateTimer);
            this.activateTimer = null;
            this.activateDurationCounterMs = 0;
            this._isPowerUpActive = false;
        }
    }, {
        key: "resetCooldownTimer",
        value: function resetCooldownTimer() {
            clearTimeout(this.cooldownTimer);
            this.cooldownTimer = null;
            this.cooldownDurationCounterMs = 0;
            this._isPowerUpOnCoolDown = false;
        }
    }, {
        key: "activatePowerUpTimer",
        value: function activatePowerUpTimer() {
            var _this = this;

            if (this.activateTimer || this.cooldownTimer) {
                return;
            }
            this.resetAllTimers();
            this._isPowerUpActive = true;
            this.activateUiTimer();
            this.activateTimer = setTimeout(function () {
                _this._isPowerUpActive = false;
                _this.activateCooldownTimer();
            }, this.game.powerUps.getPowerUpActivateDuration(this.powerUpKey));
        }
    }, {
        key: "activateCooldownTimer",
        value: function activateCooldownTimer() {
            var _this2 = this;

            if (this.cooldownTimer) {
                return;
            }
            this.resetAllTimers();
            this._isPowerUpOnCoolDown = true;
            this.activateUiTimer();
            this.cooldownTimer = setTimeout(function () {
                _this2._isPowerUpOnCoolDown = false;
                _this2.resetAllTimers();
                _this2.updateUi();
            }, this.game.powerUps.getPowerUpCooldownDuration(this.powerUpKey));
        }
    }, {
        key: "activateUiTimer",
        value: function activateUiTimer() {
            var _this3 = this;

            if (this.uiUpdateTimer) {
                return;
            }
            this.game.stats.addStatsToKey(1, this.activateStatsKey);
            this.updateUi();
            this.uiUpdateTimer = setInterval(function () {
                if (_this3._isPowerUpOnCoolDown) {
                    _this3.cooldownDurationCounterMs += UI_UPDATE_INTERVAL;
                } else if (_this3._isPowerUpActive) {
                    _this3.activateDurationCounterMs += UI_UPDATE_INTERVAL;
                }
                _this3.updateUi();
            }, UI_UPDATE_INTERVAL);
        }
    }, {
        key: "isButtonDisabled",
        value: function isButtonDisabled() {
            return this._isPowerUpActive || this._isPowerUpOnCoolDown;
        }
    }, {
        key: "isButtonVisible",
        value: function isButtonVisible() {
            return this.game.powerUps.isPowerUpUnlocked(this.powerUpKey) || _devUtils.DEBUG_ALL_BUTTONS_VISIBLE;
        }
    }, {
        key: "getUiElement",
        value: function getUiElement() {
            return $("#" + this.getUiKey());
        }
    }, {
        key: "getUiKey",
        value: function getUiKey() {
            return _PowerUpConstants.POWER_UP_TO_UI_KEY_MAP.get(this.powerUpKey);
        }
    }, {
        key: "updateUi",
        value: function updateUi() {
            this.getUiElement().html(this.getUiHtml());
            this.getUiElement().prop('disabled', this.isButtonDisabled());
            this.getUiElement().css('display', this.isButtonVisible() ? 'block' : 'none');
        }
    }, {
        key: "initClick",
        value: function initClick() {
            var _this4 = this;

            this.getUiElement().unbind("click");
            this.getUiElement().click(function () {
                return _this4.activatePowerUpTimer();
            });
        }
    }], [{
        key: "getCooldownTimerDuration",
        value: function getCooldownTimerDuration(game) {
            throw "No duration set for powerup.";
        }
    }, {
        key: "getActivateDuration",
        value: function getActivateDuration(game) {
            throw "No duration set for powerup.";
        }
    }]);

    return PowerUp;
}();

},{"../constants/PowerUpConstants":6,"../dev/devUtils":8,"../managers/UserInterface":30}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAP_TYPE_PREFIX = "~~";

var Serializable = exports.Serializable = function () {
    function Serializable() {
        var basicPropertyList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, Serializable);

        this.serializablePropertyList = [];
        this.serializablePropertyList = basicPropertyList;
    }

    _createClass(Serializable, [{
        key: 'stringifyMap',
        value: function stringifyMap(value) {
            return JSON.stringify([].concat(_toConsumableArray(value.entries())));
        }
    }, {
        key: 'destringifyMap',
        value: function destringifyMap(value) {
            // Trim prefix
            var str = value.substr(MAP_TYPE_PREFIX.length);
            return JSON.parse(str).reduce(function (m, _ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    val = _ref2[1];

                return m.set(key, val);
            }, new Map());
        }
    }, {
        key: 'serializeProperty',
        value: function serializeProperty(property) {
            if (_typeof(this[property]) === 'object') {
                return MAP_TYPE_PREFIX + this.stringifyMap(this[property]);
            }
            return this[property];
        }
    }, {
        key: 'deserializeProperty',
        value: function deserializeProperty(property, value) {
            if (value && typeof value === 'string' && value.startsWith(MAP_TYPE_PREFIX)) {
                this[property] = this.destringifyMap(value);
            } else {
                this[property] = value;
            }
        }
    }, {
        key: 'getSerializablePropertyList',
        value: function getSerializablePropertyList() {
            return this.serializablePropertyList;
        }
    }, {
        key: 'serialize',
        value: function serialize() {
            var gamePropList = this.getSerializablePropertyList();
            var jsonObj = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = gamePropList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var prop = _step.value;

                    jsonObj[prop] = this.serializeProperty(prop);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return jsonObj;
        }
    }, {
        key: 'deserialize',
        value: function deserialize(jsonObj) {
            for (var prop in jsonObj) {
                this.deserializeProperty(prop, jsonObj[prop]);
            }
        }
    }]);

    return Serializable;
}();

},{}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var StatsKey = exports.StatsKey = undefined;
(function (StatsKey) {
    // Points Stats
    StatsKey["TOTAL_POINTS_EARNED"] = "TOTAL_POINTS_EARNED";
    StatsKey["TOTAL_POINTS_SPENT"] = "TOTAL_POINTS_SPENT";
    StatsKey["TOTAL_POINTS_EARNED_FROM_VISITED_TILES"] = "TOTAL_POINTS_EARNED_FROM_VISITED_TILES";
    StatsKey["TOTAL_POINTS_EARNED_FROM_REVISITED_TILES"] = "TOTAL_POINTS_EARNED_FROM_REVISITED_TILES";
    StatsKey["TOTAL_POINTS_EARNED_FROM_MAZE_COMPLETIONS"] = "TOTAL_POINTS_EARNED_FROM_MAZE_COMPLETIONS";
    StatsKey["TOTAL_POINTS_EARNED_FROM_FRUITS"] = "TOTAL_POINTS_EARNED_FROM_FRUITS";
    StatsKey["TOTAL_POINTS_EARNED_FROM_MULTIPLIER_ITEM"] = "TOTAL_POINTS_EARNED_FROM_MULTIPLIER_ITEM";
    // Tile stats
    StatsKey["TOTAL_TILES_VISITED"] = "TOTAL_TILES_VISITED";
    StatsKey["TOTAL_TILES_REVISITED"] = "TOTAL_TILES_REVISITED";
    StatsKey["TOTAL_MAZES_COMPLETED"] = "TOTAL_MAZES_COMPLETED";
    // Item Stats
    StatsKey["TOTAL_FRUIT_ITEMS_PICKED_UP"] = "TOTAL_FRUIT_ITEMS_PICKED_UP";
    StatsKey["TOTAL_BRAIN_ITEMS_PICKED_UP"] = "TOTAL_BRAIN_ITEMS_PICKED_UP";
    StatsKey["TOTAL_BLACK_HOLE_ITEMS_PICKED_UP"] = "TOTAL_BLACK_HOLE_ITEMS_PICKED_UP";
    StatsKey["TOTAL_UNLIMITED_SPLITS_ITEMS_PICKED_UP"] = "TOTAL_UNLIMITED_SPLITS_ITEMS_PICKED_UP";
    StatsKey["TOTAL_GHOST_ITEMS_PICKED_UP"] = "TOTAL_GHOST_ITEMS_PICKED_UP";
    //TODO: Power Ups
    StatsKey["TOTAL_MULTIPLIER_POWERUPS_USED"] = "TOTAL_MULTIPLIER_POWERUPS_USED";
    StatsKey["TOTAL_SPEED_UP_POWERUPS_USED"] = "TOTAL_SPEED_UP_POWERUPS_USED";
    // Bot Stats
    StatsKey["TOTAL_NUMBER_OF_BOT_SPLITS"] = "TOTAL_NUMBER_OF_BOT_SPLITS";
    StatsKey["TOTAL_NUMBER_OF_BOT_MERGES"] = "TOTAL_NUMBER_OF_BOT_MERGES";
    StatsKey["TOTAL_NUMBER_DEAD_ENDS_MARKED"] = "TOTAL_NUMBER_DEAD_ENDS_MARKED";
    // Current Maze Stats
    StatsKey["CURRENT_MAZE_POINTS_EARNED"] = "CURRENT_MAZE_POINTS_EARNED";
    StatsKey["CURRENT_MAZE_UNIQUE_TILES_VISITED"] = "CURRENT_MAZE_UNIQUE_TILES_VISITED";
    StatsKey["CURRENT_MAZE_TILES_REVISITED"] = "CURRENT_MAZE_TOTAL_TILES_REVISITED";
    StatsKey["AVERAGE_POINTS_EARNED_PER_SECOND"] = "AVERAGE_POINTS_EARNED_PER_SECOND";
    //TODO: eventually do these probably
    // TOTAL_MANUAL_TILES_VISITED = "TOTAL_MANUAL_TILES_VISITED",
    // TOTAL_DESTRUCTIBLE_WALLS_DESTROYED = "TOTAL_DESTRUCTIBLE_WALLS_DESTROYED",
    // TOTAL_BRAIN_ITEM_TILE_DISTANCE = "TOTAL_BRAIN_ITEM_TILE_DISTANCE",
    // DEAD_ENDS_AVOIDED
})(StatsKey || (exports.StatsKey = StatsKey = {}));
var STATS_TO_UI_ID_MAP = exports.STATS_TO_UI_ID_MAP = new Map([
// Points Stats
[StatsKey.TOTAL_POINTS_EARNED, 'statsTotalPointsEarned'], [StatsKey.TOTAL_POINTS_SPENT, 'statsTotalPointsSpent'], [StatsKey.TOTAL_POINTS_EARNED_FROM_VISITED_TILES, 'statsTotalPointsEarnedFromVisitedTiles'], [StatsKey.TOTAL_POINTS_EARNED_FROM_REVISITED_TILES, 'statsTotalPointsEarnedFromRevisitedTiles'], [StatsKey.TOTAL_POINTS_EARNED_FROM_MAZE_COMPLETIONS, 'statsTotalPointsEarnedFromMazeCompletions'], [StatsKey.TOTAL_POINTS_EARNED_FROM_FRUITS, 'statsTotalPointsEarnedFromFruits'], [StatsKey.TOTAL_POINTS_EARNED_FROM_MULTIPLIER_ITEM, 'statsTotalPointsEarnedFromMultiplierItem'],
// Current Stats
// [StatsKey.CURRENT_MAZE_POINTS_EARNED, 'statsCurrentMazePointsEarned'],
// [StatsKey.CURRENT_MAZE_UNIQUE_TILES_VISITED, 'statsCurrentMazeUniqueTilesVisited'],
// [StatsKey.CURRENT_MAZE_TILES_REVISITED, 'statsCurrentMazePointsEarned'],
// Bot Stats
[StatsKey.TOTAL_NUMBER_OF_BOT_SPLITS, 'statsTotalNumberOfBotSplits'], [StatsKey.TOTAL_NUMBER_OF_BOT_MERGES, 'statsTotalNumberOfBotMerges'], [StatsKey.TOTAL_NUMBER_DEAD_ENDS_MARKED, 'statsTotalDeadEndsMarked'],
// Tile Stats
[StatsKey.TOTAL_TILES_VISITED, 'statsTotalTilesVisited'], [StatsKey.TOTAL_TILES_REVISITED, 'statsTotalTilesRevisited'], [StatsKey.TOTAL_MAZES_COMPLETED, 'statsTotalMazesCompleted'],
// Item Stats
[StatsKey.TOTAL_FRUIT_ITEMS_PICKED_UP, 'statsTotalFruitItemsPickedUp'], [StatsKey.TOTAL_BRAIN_ITEMS_PICKED_UP, 'statsTotalBrainItemsPickedUp'], [StatsKey.TOTAL_BLACK_HOLE_ITEMS_PICKED_UP, 'statsTotalBlackHoleItemsPickedUp'],
// Average
[StatsKey.AVERAGE_POINTS_EARNED_PER_SECOND, 'averagePointsEarnedPerSecond']]);
var CURRENT_MAZE_STATS = exports.CURRENT_MAZE_STATS = new Set([StatsKey.CURRENT_MAZE_POINTS_EARNED, StatsKey.CURRENT_MAZE_TILES_REVISITED, StatsKey.CURRENT_MAZE_UNIQUE_TILES_VISITED]);

},{}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PointsMultiplierPowerUp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PowerUpConstants = require("../constants/PowerUpConstants");

var _PowerUp2 = require("../models/PowerUp");

var _Stats = require("../models/Stats");

var _PointsMultiplierActivateDurationUpgrade = require("../upgrades/definitions/powerUps/PointsMultiplierActivateDurationUpgrade");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PointsMultiplierPowerUp = exports.PointsMultiplierPowerUp = function (_PowerUp) {
    _inherits(PointsMultiplierPowerUp, _PowerUp);

    function PointsMultiplierPowerUp(game) {
        _classCallCheck(this, PointsMultiplierPowerUp);

        return _possibleConstructorReturn(this, (PointsMultiplierPowerUp.__proto__ || Object.getPrototypeOf(PointsMultiplierPowerUp)).call(this, game, _PowerUpConstants.PowerUpKey.POINTS_MULTIPLIER, _Stats.StatsKey.TOTAL_MULTIPLIER_POWERUPS_USED));
    }

    _createClass(PointsMultiplierPowerUp, [{
        key: "getUiStringName",
        value: function getUiStringName() {
            return 'Points Multiplier (2)';
        }
    }], [{
        key: "getCooldownTimerDuration",
        value: function getCooldownTimerDuration() {
            return _PowerUpConstants.POINTS_MULTIPLIER_POWER_UP_BASE_COOLDOWN;
        }
    }, {
        key: "getActivateDuration",
        value: function getActivateDuration(game) {
            return _PointsMultiplierActivateDurationUpgrade.PointsMultiplierActivateDurationUpgrade.getMultiplierPowerUpActivateDuration(game);
        }
    }]);

    return PointsMultiplierPowerUp;
}(_PowerUp2.PowerUp);

},{"../constants/PowerUpConstants":6,"../models/PowerUp":44,"../models/Stats":46,"../upgrades/definitions/powerUps/PointsMultiplierActivateDurationUpgrade":73}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpeedUpPowerUp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PowerUpConstants = require("../constants/PowerUpConstants");

var _PowerUp2 = require("../models/PowerUp");

var _Stats = require("../models/Stats");

var _SpeedUpActivateDurationUpgrade = require("../upgrades/definitions/powerUps/SpeedUpActivateDurationUpgrade");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpeedUpPowerUp = exports.SpeedUpPowerUp = function (_PowerUp) {
    _inherits(SpeedUpPowerUp, _PowerUp);

    function SpeedUpPowerUp(game) {
        _classCallCheck(this, SpeedUpPowerUp);

        return _possibleConstructorReturn(this, (SpeedUpPowerUp.__proto__ || Object.getPrototypeOf(SpeedUpPowerUp)).call(this, game, _PowerUpConstants.PowerUpKey.SPEED_UP, _Stats.StatsKey.TOTAL_SPEED_UP_POWERUPS_USED));
    }

    _createClass(SpeedUpPowerUp, [{
        key: "getUiStringName",
        value: function getUiStringName() {
            return 'Speed Up (1)';
        }
    }], [{
        key: "getCooldownTimerDuration",
        value: function getCooldownTimerDuration(game) {
            return _PowerUpConstants.SPEED_UP_POWER_UP_BASE_COOLDOWN;
        }
    }, {
        key: "getActivateDuration",
        value: function getActivateDuration(game) {
            return _SpeedUpActivateDurationUpgrade.SpeedUpActivateDurationUpgrade.getSpeedUpPowerUpActivateDuration(game);
        }
    }]);

    return SpeedUpPowerUp;
}(_PowerUp2.PowerUp);

},{"../constants/PowerUpConstants":6,"../models/PowerUp":44,"../models/Stats":46,"../upgrades/definitions/powerUps/SpeedUpActivateDurationUpgrade":75}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _devUtils = require('../dev/devUtils');

var _UserInterface = require('../managers/UserInterface');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TOOLTIP_UI_ID_SUFFIX = "Tooltip";
var BUTTON_TEXT_UI_ID_SUFFIX = "Text";
var BUTTON_UI_ID_SUFFIX = "Button";
var NEW_TEXT_SUFFIX = "NewText";

var Upgrade = function () {
    function Upgrade(game, upgradeType, uiId) {
        var tooltipText = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
        var upgradeKey = arguments[4];

        var _this = this;

        var upgradeCount = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
        var isSinglePurchase = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

        _classCallCheck(this, Upgrade);

        this.isSinglePurchase = false;
        this.buyUpgrade = function () {
            if (!_this.canAffordToBuyUpgrade()) {
                console.error('Cannot afford to buy.');
                return;
            }
            var cost = _this.getCost();
            _this.upgradeLevel++;
            _this.game.points.spendPoints(cost);
            _this.updateUiProperties();
            _this.updateUiDisabled();
            _this.updateVisibility();
        };
        this.game = game;
        this.upgradeType = upgradeType;
        this.upgradeKey = upgradeKey;
        this.uiId = uiId;
        this.tooltipText = tooltipText;
        this.upgradeLevel = upgradeCount;
        this.isSinglePurchase = isSinglePurchase;
        this.currentUiTextDeduper = null;
        this.initClickEvent();
        this.initUiButton();
    }

    _createClass(Upgrade, [{
        key: 'getIsUpgraded',
        value: function getIsUpgraded() {
            return this.isUnlocked() && this.upgradeLevel >= 1;
        }
    }, {
        key: 'canAffordToBuyUpgrade',
        value: function canAffordToBuyUpgrade() {
            return _devUtils.IS_FREE_MODE_ENABLED || this.getCost() <= this.game.points.points;
        }
    }, {
        key: 'setUiText',
        value: function setUiText(text) {
            // De-dupe UI text updates
            if (text === this.currentUiTextDeduper) return;
            this.currentUiTextDeduper = text;
            $('#' + this.getButtonTextUiId()).text(text);
        }
    }, {
        key: 'getButtonUiId',
        value: function getButtonUiId() {
            return '' + this.uiId + BUTTON_UI_ID_SUFFIX;
        }
    }, {
        key: 'getButtonTextUiId',
        value: function getButtonTextUiId() {
            return '' + this.uiId + BUTTON_TEXT_UI_ID_SUFFIX;
        }
    }, {
        key: 'getButtonTooltipUiId',
        value: function getButtonTooltipUiId() {
            return '' + this.uiId + TOOLTIP_UI_ID_SUFFIX;
        }
    }, {
        key: 'getNewTextUiId',
        value: function getNewTextUiId() {
            return '' + this.uiId + NEW_TEXT_SUFFIX;
        }
    }, {
        key: 'initUiButton',
        value: function initUiButton() {
            var _this2 = this;

            // Inject a button text + the span to be used as a tooltip
            // Wrapper div with: <new tag><button><button text><tooltip>
            var newText = '<p id=\'' + this.getNewTextUiId() + '\' class=\'upgradeNewText\'>New!</p>';
            var buttonTextHtml = '<div id=\'' + this.getButtonTextUiId() + '\' class=\'button_label\'></div>';
            var tooltipHtml = '<span id=\'' + this.getButtonTooltipUiId() + '\' class=\'tooltip\'>' + this.tooltipText + '</span>';
            var button = '<button id=\'' + this.getButtonUiId() + '\'>' + buttonTextHtml + tooltipHtml + '</button>';
            $('#' + this.uiId).html('' + newText + button);
            $('#' + this.getButtonUiId()).hover(function () {
                // Start hover
                _this2.setVisibilityOfNewText(false);
                _UserInterface.UserInterface.setIdVisible(_this2.getButtonTooltipUiId(), true);
            }, function () {
                // End-hover
                _UserInterface.UserInterface.setIdVisible(_this2.getButtonTooltipUiId(), false);
            });
        }
    }, {
        key: 'setVisibilityOfNewText',
        value: function setVisibilityOfNewText(setVisible) {
            setVisible = setVisible && this.isUnlocked();
            $('#' + this.getNewTextUiId()).css("visibility", setVisible ? "visible" : "hidden");
        }
    }, {
        key: 'updateVisibility',
        value: function updateVisibility() {
            var setVisible = this.isUnlocked() && !this.isMaxUpgradeLevel() || _devUtils.DEBUG_ALL_BUTTONS_VISIBLE;
            $('#' + this.uiId).css("display", setVisible ? "flex" : "none");
        }
    }, {
        key: 'updateUiDisabled',
        value: function updateUiDisabled() {
            $('#' + this.uiId).prop("disabled", this.isDisabled());
        }
    }, {
        key: 'initClickEvent',
        value: function initClickEvent() {
            var _this3 = this;

            $('#' + this.uiId).unbind("click");
            $('#' + this.uiId).click(function () {
                return _this3.buyUpgrade();
            });
        }
    }, {
        key: 'isDisabled',
        value: function isDisabled() {
            //TODO: refactor out isSinglePurchase
            return this.isMaxUpgradeLevel() || !this.canAffordToBuyUpgrade();
        }
    }, {
        key: 'updateUiProperties',
        value: function updateUiProperties() {
            throw 'updateUiProperties must be implemented.';
        }
    }, {
        key: 'getCost',
        value: function getCost() {
            throw 'getCost must be implemented.';
        }
    }, {
        key: 'isUnlocked',
        value: function isUnlocked() {
            return this.game.biomes.isUpgradeUnlocked(this.upgradeKey) && this.isAllPrerequisiteUpgradesComplete() || _devUtils.DEBUG_ALL_BUTTONS_VISIBLE;
        }
    }, {
        key: 'prettyPrint',
        value: function prettyPrint(val) {
            return _UserInterface.UserInterface.getPrettyPrintNumber(val);
        }
    }, {
        key: 'getPrettyPrintCost',
        value: function getPrettyPrintCost() {
            return this.prettyPrint(this.getCost());
        }
    }, {
        key: 'isMaxUpgradeLevel',
        value: function isMaxUpgradeLevel() {
            return this.isSinglePurchase && this.upgradeLevel >= 1;
        }
    }, {
        key: 'isAllPrerequisiteUpgradesComplete',
        value: function isAllPrerequisiteUpgradesComplete() {
            var _this4 = this;

            var prereqUpgradeKeys = this.getPreReqUpgradeKeys();
            return prereqUpgradeKeys.every(function (key) {
                return _this4.game.upgrades.isUpgraded(key);
            });
        }
    }, {
        key: 'getPreReqUpgradeKeys',
        value: function getPreReqUpgradeKeys() {
            return [];
        }
    }]);

    return Upgrade;
}();

exports.default = Upgrade;

},{"../dev/devUtils":8,"../managers/UserInterface":30}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AutoExitMazeUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotAutoExitMaze';
var TOOLTIP_TEXT = 'When a bot is within X non-walled tiles of the maze exit, it will automatically navigate to the exit.';

var AutoExitMazeUpgrade = exports.AutoExitMazeUpgrade = function (_Upgrade) {
    _inherits(AutoExitMazeUpgrade, _Upgrade);

    function AutoExitMazeUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, AutoExitMazeUpgrade);

        return _possibleConstructorReturn(this, (AutoExitMazeUpgrade.__proto__ || Object.getPrototypeOf(AutoExitMazeUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(AutoExitMazeUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Auto Exit Maze Distance (" + this.upgradeLevel + " tiles): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.AUTO_EXIT_MAZE_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.AUTO_EXIT_MAZE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return AutoExitMazeUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AvoidRevisitLastPositionUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotAvoidRevisitLastPosition';
var TOOLTIP_TEXT = 'Bots will avoid revisiting the position that they were just at.';

var AvoidRevisitLastPositionUpgrade = exports.AvoidRevisitLastPositionUpgrade = function (_Upgrade) {
    _inherits(AvoidRevisitLastPositionUpgrade, _Upgrade);

    function AvoidRevisitLastPositionUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, AvoidRevisitLastPositionUpgrade);

        return _possibleConstructorReturn(this, (AvoidRevisitLastPositionUpgrade.__proto__ || Object.getPrototypeOf(AvoidRevisitLastPositionUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(AvoidRevisitLastPositionUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Basic Avoid Revisit: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.AVOID_REVISIT_LAST_POSITION_UPGRADE_COST;
        }
    }]);

    return AvoidRevisitLastPositionUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotAutoMoveUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'butBotAutoMove';
var TOOLTIP_TEXT = 'Bot will automatically move on its own!';

var BotAutoMoveUpgrade = exports.BotAutoMoveUpgrade = function (_Upgrade) {
    _inherits(BotAutoMoveUpgrade, _Upgrade);

    function BotAutoMoveUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BotAutoMoveUpgrade);

        return _possibleConstructorReturn(this, (BotAutoMoveUpgrade.__proto__ || Object.getPrototypeOf(BotAutoMoveUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(BotAutoMoveUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Bot Auto Move: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.BOT_AUTO_MOVE_UPGRADE_COST;
        }
    }]);

    return BotAutoMoveUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotLuckyGuessUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotLuckyGuess';
var TOOLTIP_TEXT = "When bot is faced with a choice of direction, the bot will be lucky in guessing direction by an extra " + _UpgradeConstants.BOT_LUCKY_GUESS_UPGRADE_INCREASE_AMOUNT * 100 + "% (ie. 51%/49% of choosing correct direction at level 1).";

var BotLuckyGuessUpgrade = exports.BotLuckyGuessUpgrade = function (_Upgrade) {
    _inherits(BotLuckyGuessUpgrade, _Upgrade);

    function BotLuckyGuessUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BotLuckyGuessUpgrade);

        return _possibleConstructorReturn(this, (BotLuckyGuessUpgrade.__proto__ || Object.getPrototypeOf(BotLuckyGuessUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(BotLuckyGuessUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Bot Lucky Guess (" + this.upgradeLevel + "%): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.BOT_LUCKY_GUESS_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.BOT_LUCKY_GUESS_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }], [{
        key: "getLuckyGuessIncreasePercentage",
        value: function getLuckyGuessIncreasePercentage(game) {
            return game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_LUCKY_GUESS) * _UpgradeConstants.BOT_LUCKY_GUESS_UPGRADE_INCREASE_AMOUNT;
        }
    }]);

    return BotLuckyGuessUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotMovementSpeedUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotMoveFaster';
var TOOLTIP_TEXT = 'Bots will avoid revisiting the position that they were just at.';

var BotMovementSpeedUpgrade = exports.BotMovementSpeedUpgrade = function (_Upgrade) {
    _inherits(BotMovementSpeedUpgrade, _Upgrade);

    function BotMovementSpeedUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BotMovementSpeedUpgrade);

        return _possibleConstructorReturn(this, (BotMovementSpeedUpgrade.__proto__ || Object.getPrototypeOf(BotMovementSpeedUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(BotMovementSpeedUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var interval = _UserInterface.UserInterface.getPrettyPrintNumber(this.game.rngBot.getBotMoveInterval());
            this.setUiText("Bot Movement Speed (" + interval + " ms): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.BOT_MOVEMENT_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.BOT_MOVEMENT_UPGRADE_BASE_COST_MUTLIPLIER, this.upgradeLevel);
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.AUTO_MOVE];
        }
    }]);

    return BotMovementSpeedUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../../managers/UserInterface":30,"../../Upgrade":49}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotRememberDeadEndTilesUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotRememberDeadEnds';
var TOOLTIP_TEXT = 'Bots will automatically mark deadends up to X tiles as RED and will not revisit them.';

var BotRememberDeadEndTilesUpgrade = exports.BotRememberDeadEndTilesUpgrade = function (_Upgrade) {
    _inherits(BotRememberDeadEndTilesUpgrade, _Upgrade);

    function BotRememberDeadEndTilesUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BotRememberDeadEndTilesUpgrade);

        return _possibleConstructorReturn(this, (BotRememberDeadEndTilesUpgrade.__proto__ || Object.getPrototypeOf(BotRememberDeadEndTilesUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(BotRememberDeadEndTilesUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Remember Dead Ends (" + this.upgradeLevel + " Tiles): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return BotRememberDeadEndTilesUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotSmartMergeUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotSmartMergeUpgrade';
var TOOLTIP_TEXT = 'When a bot merge occurs, the resulting direction of the bot will be away from deadends.';

var BotSmartMergeUpgrade = exports.BotSmartMergeUpgrade = function (_Upgrade) {
    _inherits(BotSmartMergeUpgrade, _Upgrade);

    function BotSmartMergeUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BotSmartMergeUpgrade);

        return _possibleConstructorReturn(this, (BotSmartMergeUpgrade.__proto__ || Object.getPrototypeOf(BotSmartMergeUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(BotSmartMergeUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Bot Smart Merge: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.BOT_SMART_MERGE_UPGRADE_COST;
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE];
        }
    }]);

    return BotSmartMergeUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotSplitAutoMergeUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buySplitBotAutoMerge';
var TOOLTIP_TEXT = 'When bots step on the same tile, they will merge together and re-split elsewhere on the next available opportunity.';

var BotSplitAutoMergeUpgrade = exports.BotSplitAutoMergeUpgrade = function (_Upgrade) {
    _inherits(BotSplitAutoMergeUpgrade, _Upgrade);

    function BotSplitAutoMergeUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BotSplitAutoMergeUpgrade);

        return _possibleConstructorReturn(this, (BotSplitAutoMergeUpgrade.__proto__ || Object.getPrototypeOf(BotSplitAutoMergeUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(BotSplitAutoMergeUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Bot Split Auto Merge: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.SPLIT_BOT_AUTO_MERGE_UPGRADE_COST;
        }
    }]);

    return BotSplitAutoMergeUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotSplitDirectionUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotSplitDirections';
var TOOLTIP_TEXT = 'Bots will split into two different bots when different pathways are available to it up to X total times.';

var BotSplitDirectionUpgrade = exports.BotSplitDirectionUpgrade = function (_Upgrade) {
    _inherits(BotSplitDirectionUpgrade, _Upgrade);

    function BotSplitDirectionUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BotSplitDirectionUpgrade);

        return _possibleConstructorReturn(this, (BotSplitDirectionUpgrade.__proto__ || Object.getPrototypeOf(BotSplitDirectionUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(BotSplitDirectionUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Bot Split Direction (" + this.upgradeLevel + " splits): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.SPLIT_DIRECTION_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.SPLIT_DIRECTION_UPGRADE_BASE_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return BotSplitDirectionUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PrioritizeUnvisitedUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotPrioritizeUnvisited';
var TOOLTIP_TEXT = 'Bots will always prioritize an unvisited tile before a previously visited one.';

var PrioritizeUnvisitedUpgrade = exports.PrioritizeUnvisitedUpgrade = function (_Upgrade) {
    _inherits(PrioritizeUnvisitedUpgrade, _Upgrade);

    function PrioritizeUnvisitedUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, PrioritizeUnvisitedUpgrade);

        return _possibleConstructorReturn(this, (PrioritizeUnvisitedUpgrade.__proto__ || Object.getPrototypeOf(PrioritizeUnvisitedUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(PrioritizeUnvisitedUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Basic Prioritize Unvisited: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.PRIORITIZE_UNVISITED_UPGRADE_COST;
        }
    }]);

    return PrioritizeUnvisitedUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BrainSpawnRateUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _BrainMazeItem = require("../../../items/definitions/BrainMazeItem");

var _BrainMazeItem2 = _interopRequireDefault(_BrainMazeItem);

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBrainSpawnRateUpgrade';
var TOOLTIP_TEXT = 'Brains spawn more frequently. Brains auto-path your bots to the exit up to X distance.';

var BrainSpawnRateUpgrade = exports.BrainSpawnRateUpgrade = function (_Upgrade) {
    _inherits(BrainSpawnRateUpgrade, _Upgrade);

    function BrainSpawnRateUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BrainSpawnRateUpgrade);

        return _possibleConstructorReturn(this, (BrainSpawnRateUpgrade.__proto__ || Object.getPrototypeOf(BrainSpawnRateUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(BrainSpawnRateUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var spawnProbability = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(_BrainMazeItem2.default.getItemSpawnProbability(this.game) * 100, 2);
            this.setUiText("Brain Item Spawn Rate (" + spawnProbability + "%): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.BRAIN_SPAWN_RATE_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.BRAIN_SPAWN_RATE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return BrainSpawnRateUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../../items/definitions/BrainMazeItem":12,"../../../managers/UserInterface":30,"../../Upgrade":49}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BrainTileDistanceUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _BrainMazeItem = require("../../../items/definitions/BrainMazeItem");

var _BrainMazeItem2 = _interopRequireDefault(_BrainMazeItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBrainTileDistanceUpgrade';
var TOOLTIP_TEXT = 'Bots with an active brain item will auto path X more tiles.';

var BrainTileDistanceUpgrade = exports.BrainTileDistanceUpgrade = function (_Upgrade) {
    _inherits(BrainTileDistanceUpgrade, _Upgrade);

    function BrainTileDistanceUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BrainTileDistanceUpgrade);

        return _possibleConstructorReturn(this, (BrainTileDistanceUpgrade.__proto__ || Object.getPrototypeOf(BrainTileDistanceUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(BrainTileDistanceUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var tileDistance = _BrainMazeItem2.default.getBrainTileDistanceAmount(this.game);
            this.setUiText("Brain Tile Distance (" + tileDistance + " tiles): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return BrainTileDistanceUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../../items/definitions/BrainMazeItem":12,"../../Upgrade":49}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FruitPickupPointsMultiplierUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _FruitMazeItem = require("../../../items/definitions/FruitMazeItem");

var _FruitMazeItem2 = _interopRequireDefault(_FruitMazeItem);

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyFruitPickupPointsUpgrade';
var TOOLTIP_TEXT = 'Fruits pickups are worth more points!';

var FruitPickupPointsMultiplierUpgrade = exports.FruitPickupPointsMultiplierUpgrade = function (_Upgrade) {
    _inherits(FruitPickupPointsMultiplierUpgrade, _Upgrade);

    function FruitPickupPointsMultiplierUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, FruitPickupPointsMultiplierUpgrade);

        return _possibleConstructorReturn(this, (FruitPickupPointsMultiplierUpgrade.__proto__ || Object.getPrototypeOf(FruitPickupPointsMultiplierUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(FruitPickupPointsMultiplierUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var pts = _UserInterface.UserInterface.getPrettyPrintNumber(_FruitMazeItem2.default.getFruitPickupPointsAmount(this.game));
            this.setUiText("Fruit Pickup Points (" + pts + " pts): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return FruitPickupPointsMultiplierUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../../items/definitions/FruitMazeItem":13,"../../../managers/UserInterface":30,"../../Upgrade":49}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FruitSpawnRateUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _FruitMazeItem = require("../../../items/definitions/FruitMazeItem");

var _FruitMazeItem2 = _interopRequireDefault(_FruitMazeItem);

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyFruitSpawnRateUpgrade';
var TOOLTIP_TEXT = 'Fruits spawn more frequently.';

var FruitSpawnRateUpgrade = exports.FruitSpawnRateUpgrade = function (_Upgrade) {
    _inherits(FruitSpawnRateUpgrade, _Upgrade);

    function FruitSpawnRateUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, FruitSpawnRateUpgrade);

        return _possibleConstructorReturn(this, (FruitSpawnRateUpgrade.__proto__ || Object.getPrototypeOf(FruitSpawnRateUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(FruitSpawnRateUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var spawnProbability = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(_FruitMazeItem2.default.getItemSpawnProbability(this.game) * 100, 2);
            this.setUiText("Fruit Spawn Rate (" + spawnProbability + "%): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.FRUIT_SPAWN_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.FRUIT_SPAWN_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return FruitSpawnRateUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../../items/definitions/FruitMazeItem":13,"../../../managers/UserInterface":30,"../../Upgrade":49}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BiomeUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _BiomeConstants = require("../../../constants/BiomeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBiomeUpgrade';
var TOOLTIP_TEXT = 'This will bring you to a new biome with more difficult mazes, but with better items and increased point rewards!';

var BiomeUpgrade = exports.BiomeUpgrade = function (_Upgrade) {
    _inherits(BiomeUpgrade, _Upgrade);

    function BiomeUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BiomeUpgrade);

        return _possibleConstructorReturn(this, (BiomeUpgrade.__proto__ || Object.getPrototypeOf(BiomeUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.OTHER, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(BiomeUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Unlock New Biome (" + this.upgradeLevel + "): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            var nextBiomeKey = this.game.biomes.getCurrentBiomeKey();
            return (0, _BiomeConstants.getBiomeUpgradeCost)(nextBiomeKey);
        }
    }]);

    return BiomeUpgrade;
}(_Upgrade3.default);

},{"../../../constants/BiomeConstants":2,"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DestructibleWallUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'noop';
var TOOLTIP_TEXT = '';

var DestructibleWallUpgrade = exports.DestructibleWallUpgrade = function (_Upgrade) {
    _inherits(DestructibleWallUpgrade, _Upgrade);

    function DestructibleWallUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, DestructibleWallUpgrade);

        return _possibleConstructorReturn(this, (DestructibleWallUpgrade.__proto__ || Object.getPrototypeOf(DestructibleWallUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MAZE, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(DestructibleWallUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {}
    }, {
        key: "getCost",
        value: function getCost() {
            return 0;
        }
        // NOTE: this probability is based on the number of connections -- NOT number of tiles

    }], [{
        key: "getDestructibleWallSpawnProbability",
        value: function getDestructibleWallSpawnProbability(game) {
            if (!game.biomes.isUpgradeUnlocked(_UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALLS)) {
                return 0;
            }
            // How many biomes has this been unlocked -- increase by some amount each time.
            var biomeDiff = game.biomes.getUpgradeUnlockBiomeDiffCount(_UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALLS);
            return _UpgradeConstants.DESTRUCTIBLE_WALL_BASE_SPAWN_RATE + biomeDiff * _UpgradeConstants.DESTRUCTIBLE_WALL_BASE_SPAWN_RATE_INCREASE_PER_BIOME;
        }
    }]);

    return DestructibleWallUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MazeCompletionBonusUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyMazeCompletionBonusUpgrade';
var TOOLTIP_TEXT = 'Each maze completion is worth more points! Larger mazes are worth more points.';

var MazeCompletionBonusUpgrade = exports.MazeCompletionBonusUpgrade = function (_Upgrade) {
    _inherits(MazeCompletionBonusUpgrade, _Upgrade);

    function MazeCompletionBonusUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, MazeCompletionBonusUpgrade);

        return _possibleConstructorReturn(this, (MazeCompletionBonusUpgrade.__proto__ || Object.getPrototypeOf(MazeCompletionBonusUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MAZE, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(MazeCompletionBonusUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var str = _UserInterface.UserInterface.getPrettyPrintNumber(MazeCompletionBonusUpgrade.getMazeCompletionBonus(this.game));
            this.setUiText("Maze Completion Bonus (" + str + " pts): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }], [{
        key: "getMazeCompletionBonus",
        value: function getMazeCompletionBonus(game) {
            var grid = game.maze.getGrid();
            var tileCount = grid ? grid.getTileCount() : 0;
            var upgradeLevel = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.MAZE_COMPLETION_BONUS);
            return tileCount * (1 + _UpgradeConstants.MAZE_COMPLETION_BONUS_BASE_MULTIPLIER * upgradeLevel);
        }
    }]);

    return MazeCompletionBonusUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../../managers/UserInterface":30,"../../Upgrade":49}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MazeSizeUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyMazeSize';
var TOOLTIP_TEXT = 'Maze is increased in size by 1 for both x/y dimension! This will also increase the maze completion bonus.';

var MazeSizeUpgrade = exports.MazeSizeUpgrade = function (_Upgrade) {
    _inherits(MazeSizeUpgrade, _Upgrade);

    function MazeSizeUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, MazeSizeUpgrade);

        return _possibleConstructorReturn(this, (MazeSizeUpgrade.__proto__ || Object.getPrototypeOf(MazeSizeUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MAZE, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(MazeSizeUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var mazeSize = this.game.maze.getNextMazeSize();
            this.setUiText("Maze Size (" + mazeSize + "x" + mazeSize + " tiles): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.MAZE_SIZE_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.MAZE_SIZE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return MazeSizeUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PointsPerRevisitUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyPointsPerRevisit';
var TOOLTIP_TEXT = 'Get more points when you revisit a tile!';

var PointsPerRevisitUpgrade = exports.PointsPerRevisitUpgrade = function (_Upgrade) {
    _inherits(PointsPerRevisitUpgrade, _Upgrade);

    function PointsPerRevisitUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, PointsPerRevisitUpgrade);

        return _possibleConstructorReturn(this, (PointsPerRevisitUpgrade.__proto__ || Object.getPrototypeOf(PointsPerRevisitUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MAZE, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(PointsPerRevisitUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Points Per Re-Visit (" + this.upgradeLevel + "%): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.POINTS_PER_REVISIT_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.POINTS_PER_REVISIT_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return PointsPerRevisitUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PointsPerVisitUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyPointsPerVisit';
var TOOLTIP_TEXT = 'Get more points per tile that you visit for the first time!';

var PointsPerVisitUpgrade = exports.PointsPerVisitUpgrade = function (_Upgrade) {
    _inherits(PointsPerVisitUpgrade, _Upgrade);

    function PointsPerVisitUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, PointsPerVisitUpgrade);

        return _possibleConstructorReturn(this, (PointsPerVisitUpgrade.__proto__ || Object.getPrototypeOf(PointsPerVisitUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MAZE, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(PointsPerVisitUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var pointsPerVisit = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(this.game.points.getPointsPerVisit(), 2);
            this.setUiText("Points Per Visit (" + pointsPerVisit + " pts): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.POINTS_PER_VISIT_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.POINTS_PER_VISIT_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return PointsPerVisitUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../../managers/UserInterface":30,"../../Upgrade":49}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlayerMoveIndependentlyUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyPlayerMoveIndependently';
var TOOLTIP_TEXT = 'Players can have one bot moving at the same time as they manually move.';

var PlayerMoveIndependentlyUpgrade = exports.PlayerMoveIndependentlyUpgrade = function (_Upgrade) {
    _inherits(PlayerMoveIndependentlyUpgrade, _Upgrade);

    function PlayerMoveIndependentlyUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, PlayerMoveIndependentlyUpgrade);

        return _possibleConstructorReturn(this, (PlayerMoveIndependentlyUpgrade.__proto__ || Object.getPrototypeOf(PlayerMoveIndependentlyUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MOVEMENT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(PlayerMoveIndependentlyUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Player Can Move Independently: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.ALLOW_PLAYER_TO_MOVE_INDEPENDENTLY_UPGRADE_COST;
        }
    }]);

    return PlayerMoveIndependentlyUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TeleportBotBackToPlayerUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotTeleportToPlayer';
var TOOLTIP_TEXT = "Players can teleport their bot back to the themselves by pressing 'q'.";

var TeleportBotBackToPlayerUpgrade = exports.TeleportBotBackToPlayerUpgrade = function (_Upgrade) {
    _inherits(TeleportBotBackToPlayerUpgrade, _Upgrade);

    function TeleportBotBackToPlayerUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, TeleportBotBackToPlayerUpgrade);

        return _possibleConstructorReturn(this, (TeleportBotBackToPlayerUpgrade.__proto__ || Object.getPrototypeOf(TeleportBotBackToPlayerUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MOVEMENT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(TeleportBotBackToPlayerUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Teleport Bot Back to Player: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.TELEPORT_BOT_BACK_TO_PLAYER_UPGRADE_COST;
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.PLAYER_MOVE_INDEPENDENTLY];
        }
    }]);

    return TeleportBotBackToPlayerUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TeleportPlayerBacktoBotUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyPlayerTeleportToBot';
var TOOLTIP_TEXT = "Players can teleport their themselves back to the bot by pressing 'e'.";

var TeleportPlayerBacktoBotUpgrade = exports.TeleportPlayerBacktoBotUpgrade = function (_Upgrade) {
    _inherits(TeleportPlayerBacktoBotUpgrade, _Upgrade);

    function TeleportPlayerBacktoBotUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, TeleportPlayerBacktoBotUpgrade);

        return _possibleConstructorReturn(this, (TeleportPlayerBacktoBotUpgrade.__proto__ || Object.getPrototypeOf(TeleportPlayerBacktoBotUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MOVEMENT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(TeleportPlayerBacktoBotUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Teleport Player Back to Bot: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST;
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.PLAYER_MOVE_INDEPENDENTLY];
        }
    }]);

    return TeleportPlayerBacktoBotUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PointsMultiplierActivateDurationUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _PowerUpConstants = require("../../../constants/PowerUpConstants");

var _PointsMultiplierPowerUp = require("../../../powerUps/PointsMultiplierPowerUp");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyMultiplierPowerUpActivateDurationUpgrade';
var TOOLTIP_TEXT = 'Points multiplier item applies a multiplier to all items and visited tiles. This upgrade will increase the strength.';

var PointsMultiplierActivateDurationUpgrade = exports.PointsMultiplierActivateDurationUpgrade = function (_Upgrade) {
    _inherits(PointsMultiplierActivateDurationUpgrade, _Upgrade);

    function PointsMultiplierActivateDurationUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, PointsMultiplierActivateDurationUpgrade);

        return _possibleConstructorReturn(this, (PointsMultiplierActivateDurationUpgrade.__proto__ || Object.getPrototypeOf(PointsMultiplierActivateDurationUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.POWER_UP, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(PointsMultiplierActivateDurationUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Points Multiplier Activate Duration (" + _PointsMultiplierPowerUp.PointsMultiplierPowerUp.getActivateDuration(this.game) / 1000 + "s): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.MULTIPLIER_POWER_UP_SPAWN_RATE_BASE_COST * Math.pow(_UpgradeConstants.MULTIPLIER_POWER_UP_SPAWN_RATE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }], [{
        key: "getMultiplierPowerUpActivateDuration",
        value: function getMultiplierPowerUpActivateDuration(game) {
            var upgradeLevel = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.MULTIPLIER_POWER_UP_ACTIVATE_DURATION);
            return _PowerUpConstants.POINTS_MULTIPLIER_POWER_UP_BASE_DURATION + upgradeLevel * _PowerUpConstants.POINTS_MULTIPLIER_POWER_UP_BASE_DURATION_INCREASE;
        }
    }]);

    return PointsMultiplierActivateDurationUpgrade;
}(_Upgrade3.default);

},{"../../../constants/PowerUpConstants":6,"../../../constants/UpgradeConstants":7,"../../../powerUps/PointsMultiplierPowerUp":47,"../../Upgrade":49}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PointsMultiplierStrengthUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _PowerUpConstants = require("../../../constants/PowerUpConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyMultiplierPowerUpStrengthUpgrade';
var TOOLTIP_TEXT = 'Points multiplier power up will increase in strength.';

var PointsMultiplierStrengthUpgrade = exports.PointsMultiplierStrengthUpgrade = function (_Upgrade) {
    _inherits(PointsMultiplierStrengthUpgrade, _Upgrade);

    function PointsMultiplierStrengthUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, PointsMultiplierStrengthUpgrade);

        return _possibleConstructorReturn(this, (PointsMultiplierStrengthUpgrade.__proto__ || Object.getPrototypeOf(PointsMultiplierStrengthUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.POWER_UP, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(PointsMultiplierStrengthUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Points Multiplier Strength (" + PointsMultiplierStrengthUpgrade.getPointsMultiplierStrength(this.game) + "x): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.MULTIPLIER_POWER_UP_STRENGTH_BASE_COST * Math.pow(_UpgradeConstants.MULTIPLIER_POWER_UP_STRENGTH_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }], [{
        key: "getPointsMultiplierStrength",
        value: function getPointsMultiplierStrength(game) {
            var upgradeLevel = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.MULTIPLIER_POWER_UP_STRENGTH);
            return _PowerUpConstants.POINTS_MULTIPLIER_POWER_UP_BASE_STRENGTH + _PowerUpConstants.POINTS_MULTIPLIER_POWER_UP_BASE_STRENGTH_MULTIPLIER * upgradeLevel;
        }
    }]);

    return PointsMultiplierStrengthUpgrade;
}(_Upgrade3.default);

},{"../../../constants/PowerUpConstants":6,"../../../constants/UpgradeConstants":7,"../../Upgrade":49}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpeedUpActivateDurationUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _SpeedUpPowerUp = require("../../../powerUps/SpeedUpPowerUp");

var _PowerUpConstants = require("../../../constants/PowerUpConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyPowerUpSpeedUpActivateDuration';
var TOOLTIP_TEXT = 'The speed up power up will stay active for a longer duration!  More points!';

var SpeedUpActivateDurationUpgrade = exports.SpeedUpActivateDurationUpgrade = function (_Upgrade) {
    _inherits(SpeedUpActivateDurationUpgrade, _Upgrade);

    function SpeedUpActivateDurationUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, SpeedUpActivateDurationUpgrade);

        return _possibleConstructorReturn(this, (SpeedUpActivateDurationUpgrade.__proto__ || Object.getPrototypeOf(SpeedUpActivateDurationUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.POWER_UP, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(SpeedUpActivateDurationUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Speed Up Activate Duration  (" + _SpeedUpPowerUp.SpeedUpPowerUp.getActivateDuration(this.game) / 1000 + "s): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.SPEED_UP_POWER_UP_ACTIVATE_DURATION_BASE_COST * Math.pow(_UpgradeConstants.SPEED_UP_POWER_UP_ACTIVATE_DURATION_COST_MULTIPLIER, this.upgradeLevel);
        }
    }], [{
        key: "getSpeedUpPowerUpActivateDuration",
        value: function getSpeedUpPowerUpActivateDuration(game) {
            var upgradeLevel = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.SPEED_UP_ACTIVATE_DURATION);
            return _PowerUpConstants.SPEED_UP_POWER_UP_BASE_DURATION + upgradeLevel * _PowerUpConstants.SPEED_UP_POWER_UP_BASE_DURATION_INCREASE;
        }
    }]);

    return SpeedUpActivateDurationUpgrade;
}(_Upgrade3.default);

},{"../../../constants/PowerUpConstants":6,"../../../constants/UpgradeConstants":7,"../../../powerUps/SpeedUpPowerUp":48,"../../Upgrade":49}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpeedUpMultiplierStrengthUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _PowerUpConstants = require("../../../constants/PowerUpConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buySpeedUpMultiplierStrengthUpgrade';
var TOOLTIP_TEXT = 'The speed up power up is stronger so bots move even faster!  More points!';

var SpeedUpMultiplierStrengthUpgrade = exports.SpeedUpMultiplierStrengthUpgrade = function (_Upgrade) {
    _inherits(SpeedUpMultiplierStrengthUpgrade, _Upgrade);

    function SpeedUpMultiplierStrengthUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, SpeedUpMultiplierStrengthUpgrade);

        return _possibleConstructorReturn(this, (SpeedUpMultiplierStrengthUpgrade.__proto__ || Object.getPrototypeOf(SpeedUpMultiplierStrengthUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.POWER_UP, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(SpeedUpMultiplierStrengthUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Speed Up Multiplier Value  (" + SpeedUpMultiplierStrengthUpgrade.getSpeedUpMultiplier(this.game) + "x): " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.SPEED_UP_MULTIPLIER_STRENGTH_BASE_COST * Math.pow(_UpgradeConstants.SPEED_UP_MULTIPLIER_STRENGTH_COST_MULTIPLIER, this.upgradeLevel);
        }
    }], [{
        key: "getSpeedUpMultiplier",
        value: function getSpeedUpMultiplier(game) {
            var upgradeLevel = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.SPEED_UP_MULTIPLIER_STRENGTH);
            return _PowerUpConstants.SPEED_UP_POWER_UP_BASE_STRENGTH + upgradeLevel * _PowerUpConstants.SPEED_UP_POWER_UP_BASE_STRENGTH_INCREASE;
        }
    }]);

    return SpeedUpMultiplierStrengthUpgrade;
}(_Upgrade3.default);

},{"../../../constants/PowerUpConstants":6,"../../../constants/UpgradeConstants":7,"../../Upgrade":49}]},{},[9]);
