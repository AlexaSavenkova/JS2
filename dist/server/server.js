/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/cart.js":
/*!****************************!*\
  !*** ./src/server/cart.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// добавила пересчет общей суммы и количества наименований в файле userCart.json\nconst add = (cart, req) => {\n  cart.contents.push(req.body);\n  cart.amount += req.body.price;\n  cart.countGoods += 1;\n  return {\n    name: req.body.product_name,\n    newCart: JSON.stringify(cart, null, 4)\n  };\n};\n\nconst change = (cart, req) => {\n  const find = cart.contents.find(el => el.id_product === +req.params.id);\n  find.quantity += req.body.quantity;\n  cart.amount += find.price * req.body.quantity;\n  return {\n    name: find.product_name,\n    newCart: JSON.stringify(cart, null, 4)\n  };\n};\n\nconst remove = (cart, req) => {\n  if (req.params.id === 'all') {\n    cart.countGoods = 0;\n    cart.amount = 0;\n    cart.contents = [];\n    return {\n      name: 'All cart items',\n      newCart: JSON.stringify(cart, null, 4)\n    };\n  } else {\n    const find = cart.contents.find(el => el.id_product === +req.params.id);\n    cart.countGoods -= 1;\n    cart.amount -= find.price;\n    cart.contents.splice(cart.contents.indexOf(find), 1);\n    return {\n      name: find.product_name,\n      newCart: JSON.stringify(cart, null, 4)\n    };\n  }\n};\n\nmodule.exports = {\n  add,\n  change,\n  remove\n};\n\n//# sourceURL=webpack:///./src/server/cart.js?");

/***/ }),

/***/ "./src/server/cartRouter.js":
/*!**********************************!*\
  !*** ./src/server/cartRouter.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst handler = __webpack_require__(/*! ./handlers */ \"./src/server/handlers.js\");\n\nconst router = express.Router();\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst cartPath = path.resolve(__dirname, './db/userCart.json');\nrouter.get('/', (req, res) => {\n  fs.readFile(cartPath, 'utf-8', (err, data) => {\n    if (err) {\n      res.send(JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      res.send(data);\n    }\n  });\n});\nrouter.post('/', (req, res) => {\n  handler(req, res, 'add', cartPath);\n});\nrouter.put('/:id', (req, res) => {\n  handler(req, res, 'change', cartPath);\n});\nrouter.delete('/:id', (req, res) => {\n  handler(req, res, 'remove', cartPath);\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/server/cartRouter.js?");

/***/ }),

/***/ "./src/server/handlers.js":
/*!********************************!*\
  !*** ./src/server/handlers.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst cart = __webpack_require__(/*! ./cart */ \"./src/server/cart.js\");\n\nconst logger = __webpack_require__(/*! ./logger */ \"./src/server/logger.js\");\n/**\n * обновили словарь\n * @type {{add: *, change: *, remove: *}}\n */\n\n\nconst actions = {\n  add: cart.add,\n  change: cart.change,\n  remove: cart.remove\n};\n/**\n * подключили логгер\n * @param req\n * @param res\n * @param action\n * @param file\n */\n\nconst handler = (req, res, action, file) => {\n  fs.readFile(file, 'utf-8', (err, data) => {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      const {\n        name,\n        newCart\n      } = actions[action](JSON.parse(data), req);\n      fs.writeFile(file, newCart, err => {\n        if (err) {\n          res.send('{\"result\": 0}');\n        } else {\n          logger(name, action);\n          res.send('{\"result\": 1}');\n        }\n      });\n    }\n  });\n};\n\nmodule.exports = handler;\n\n//# sourceURL=webpack:///./src/server/handlers.js?");

/***/ }),

/***/ "./src/server/logger.js":
/*!******************************!*\
  !*** ./src/server/logger.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const moment = __webpack_require__(/*! moment */ \"moment\");\n\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst statsPath = path.resolve(__dirname, './db/stats.json');\n\nconst logger = (name, action) => {\n  fs.readFile(statsPath, 'utf-8', (err, data) => {\n    if (err) {\n      console.log(err);\n    } else {\n      const stat = JSON.parse(data);\n      stat.push({\n        time: moment().format('MMMM Do YYYY, h:mm:ss a'),\n        prod_name: name,\n        action: action\n      });\n      fs.writeFile(statsPath, JSON.stringify(stat, null, 4), err => {\n        if (err) {\n          console.log(err);\n        }\n      });\n    }\n  });\n};\n\nmodule.exports = logger;\n\n//# sourceURL=webpack:///./src/server/logger.js?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst cors = __webpack_require__(/*! cors */ \"cors\");\n\nconst cartRouter = __webpack_require__(/*! ./cartRouter */ \"./src/server/cartRouter.js\");\n\nconst app = express();\napp.use(express.json());\napp.use(cors());\napp.use(express.static(path.resolve(__dirname, '../public'))); // еще вариант\n// app.use(express.static(path.join(__dirname, '..', 'public')));\n\napp.use('/api/cart', cartRouter);\napp.get('/api/products', (req, res) => {\n  fs.readFile(path.resolve(__dirname, './db/products.json'), 'utf-8', (err, data) => {\n    if (err) {\n      res.send(JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      res.send(data);\n    }\n  });\n}); // use port 3000 unless there exists a preconfigured port\n\nconst port = process.env.PORT || 3000;\napp.listen(port, () => {\n  console.log(`Server started at port ${port}`);\n});\n\n//# sourceURL=webpack:///./src/server/server.js?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });