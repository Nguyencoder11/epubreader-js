/******/ var __webpack_modules__ = ({

/***/ 263:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isValue         = __webpack_require__(175)
  , isPlainFunction = __webpack_require__(873)
  , assign          = __webpack_require__(596)
  , normalizeOpts   = __webpack_require__(148)
  , contains        = __webpack_require__(214);

var d = (module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== "string") {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
		w = contains.call(dscr, "w");
	} else {
		c = w = true;
		e = false;
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
});

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== "string") {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (!isValue(get)) {
		get = undefined;
	} else if (!isPlainFunction(get)) {
		options = get;
		get = set = undefined;
	} else if (!isValue(set)) {
		set = undefined;
	} else if (!isPlainFunction(set)) {
		options = set;
		set = undefined;
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
	} else {
		c = true;
		e = false;
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),

/***/ 11:
/***/ ((module) => {



// eslint-disable-next-line no-empty-function
module.exports = function () {};


/***/ }),

/***/ 596:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = __webpack_require__(339)() ? Object.assign : __webpack_require__(595);


/***/ }),

/***/ 339:
/***/ ((module) => {



module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};


/***/ }),

/***/ 595:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var keys  = __webpack_require__(93)
  , value = __webpack_require__(134)
  , max   = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),

/***/ 762:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var _undefined = __webpack_require__(11)(); // Support ES3 engines

module.exports = function (val) { return val !== _undefined && val !== null; };


/***/ }),

/***/ 93:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = __webpack_require__(380)() ? Object.keys : __webpack_require__(232);


/***/ }),

/***/ 380:
/***/ ((module) => {



module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};


/***/ }),

/***/ 232:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isValue = __webpack_require__(762);

var keys = Object.keys;

module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };


/***/ }),

/***/ 148:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isValue = __webpack_require__(762);

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),

/***/ 499:
/***/ ((module) => {



module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),

/***/ 134:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isValue = __webpack_require__(762);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),

/***/ 214:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



module.exports = __webpack_require__(525)() ? String.prototype.contains : __webpack_require__(521);


/***/ }),

/***/ 525:
/***/ ((module) => {



var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};


/***/ }),

/***/ 521:
/***/ ((module) => {



var indexOf = String.prototype.indexOf;

module.exports = function (searchString /*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),

/***/ 68:
/***/ ((module, exports, __webpack_require__) => {



var d        = __webpack_require__(263)
  , callable = __webpack_require__(499)

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;


/***/ }),

/***/ 80:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isPrototype = __webpack_require__(202);

module.exports = function (value) {
	if (typeof value !== "function") return false;

	if (!hasOwnProperty.call(value, "length")) return false;

	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.call !== "function") return false;
		if (typeof value.apply !== "function") return false;
	} catch (error) {
		return false;
	}

	return !isPrototype(value);
};


/***/ }),

/***/ 181:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isValue = __webpack_require__(175);

// prettier-ignore
var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};


/***/ }),

/***/ 873:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isFunction = __webpack_require__(80);

var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

module.exports = function (value) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};


/***/ }),

/***/ 202:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isObject = __webpack_require__(181);

module.exports = function (value) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};


/***/ }),

/***/ 175:
/***/ ((module) => {



// ES3 safe
var _undefined = void 0;

module.exports = function (value) { return value !== _undefined && value !== null; };


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Reader: () => (/* binding */ Reader)
});

// EXTERNAL MODULE: ./node_modules/event-emitter/index.js
var event_emitter = __webpack_require__(68);
;// CONCATENATED MODULE: ./src/utils.js
const d = (obj, prop) => obj ? obj[prop] : undefined

const q = (src, dst, ext, prop) => {
    let val
    if (typeof dst[prop] === "boolean") {
        switch (prop) {
            case "annotations":
            case "bookmarks":
                val = dst[prop] ? src[prop] : dst[prop]
                break;
            default:
                val = dst[prop]
                break;
        }
    } else if (prop === "arrows") {
        val = dst[prop]
    } else {
        val = d(ext, prop) === undefined ? src[prop] : dst[prop]
    }
    return val
}

const extend = (src, dst, ext) => {
    for (let prop in src) {
        if (prop === "bookPath") {
            continue
        } else if (dst[prop] instanceof Array) {
            dst[prop] = ext ? (src[prop] ? src[prop] : dst[prop]) : src[prop]
        } else if (dst[prop] instanceof Object) {
            extend(src[prop], dst[prop], d(ext, prop)) // recursive call
        } else {
            dst[prop] = ext ? q(src, dst, ext, prop) : src[prop]
        }
    }
}

const uuid = () => {
    let d = new Date().getTime()
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        let r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === "x" ? r : (r & 0x7 | 0x8)).toString(16)
    })
    return uuid
}

const detectMobile = () => {
    const matches = [
        /Android/i,
        /BlackBerry/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /Windows Phone/i,
        /webOS/i
    ]
    return matches.some((i) => navigator.userAgent.match(i))
}
;// CONCATENATED MODULE: ./src/storage.js
class Storage {

	constructor() {

		this.name = "epubreader-js";
		this.version = 1.0;
		this.db;
		this.indexedDB = window.indexedDB ||
			window.webkitIndexedDB ||
			window.mozIndexedDB ||
			window.OIndexedDB ||
			window.msIndexedDB;

		if (this.indexedDB === undefined) {

			console.error("The IndexedDB API not available in your browser.");
		}
	}

	init(callback) {

		if (this.indexedDB === undefined) {
			callback();
			return;
		}

		const time = Date.now();
		const onerror = (e) => console.error("IndexedDB", e);
		const request = indexedDB.open(this.name, this.version);
		request.onupgradeneeded = (e) => {

			const db = e.target.result;
			if (db.objectStoreNames.contains("entries") === false) {
				db.createObjectStore("entries");
			}
		}

		request.onsuccess = (e) => {

			this.db = e.target.result;
			this.db.onerror = onerror;
			callback();
			console.log(`storage.init: ${Date.now() - time} ms`);
		}

		request.onerror = onerror;
	}

	get(callback) {

		if (this.db === undefined) {
			callback();
			return;
		}

		const time = Date.now();
		const transaction = this.db.transaction(["entries"], "readwrite");
		const objectStore = transaction.objectStore("entries");
		const request = objectStore.get(0);
		request.onsuccess = (e) => {

			callback(e.target.result);
			console.log(`storage.get: ${Date.now() - time} ms`);
		}
	}

	set(data, callback) {

		if (this.db === undefined) {
			callback();
			return;
		}

		const time = Date.now();
		const transaction = this.db.transaction(["entries"], "readwrite");
		const objectStore = transaction.objectStore("entries");
		const request = objectStore.put(data, 0);
		request.onsuccess = () => {

			callback();
			console.log(`storage.set: ${Date.now() - time} ms`);
		}
	}

	clear() {

		if (this.db === undefined) {
			return;
		}

		const time = Date.now();
		const transaction = this.db.transaction(["entries"], "readwrite");
		const objectStore = transaction.objectStore("entries");
		const request = objectStore.clear();
		request.onsuccess = () => {

			console.log(`storage.clear: ${Date.now() - time} ms`);
		}
	}
}
;// CONCATENATED MODULE: ./src/strings.js
class Strings {

	constructor(reader) {

		this.language = reader.settings.language || "en";
		this.values = {
			en: {
				"toolbar/sidebar": "Sidebar",
				"toolbar/prev": "Previous page",
				"toolbar/next": "Next page",
				"toolbar/openbook": "Open book",
				"toolbar/openbook/error": "Your browser does not support the required features.\nPlease use a modern browser such as Google Chrome, or Mozilla Firefox.",
				"toolbar/bookmark": "Add this page to bookmarks",
				"toolbar/fullscreen": "Fullscreen",
				"toolbar/background": "Change background",

				"sidebar/close": "Close Sidebar",
				"sidebar/contents": "Contents",
				"sidebar/bookmarks": "Bookmarks",
				"sidebar/bookmarks/add": "Add",
				"sidebar/bookmarks/remove": "Remove",
				"sidebar/bookmarks/clear": "Clear",
				"sidebar/annotations": "Annotations",
				"sidebar/annotations/add": "Add",
				"sidebar/annotations/remove": "Remove",
				"sidebar/annotations/clear": "Clear",
				"sidebar/annotations/anchor": "Anchor",
				"sidebar/annotations/cancel": "Cancel",
				"sidebar/search": "Search",
				"sidebar/search/placeholder": "Search",
				"sidebar/settings": "Settings",
				"sidebar/settings/language": "Language",
				"sidebar/settings/fontsize": "Font size (%)",
				"sidebar/settings/flow": "Flow",
				"sidebar/settings/pagination": ["Pagination", "Generate pagination"],
				"sidebar/settings/spread": "Spread",
				"sidebar/settings/spread/minwidth": "Minimum spread width",
				"sidebar/metadata": "Metadata",
				"sidebar/metadata/title": "Title",
				"sidebar/metadata/creator": "Creator",
				"sidebar/metadata/description": "Description",
				"sidebar/metadata/pubdate": "Pubdate",
				"sidebar/metadata/publisher": "Publisher",
				"sidebar/metadata/identifier": "Identifier",
				"sidebar/metadata/language": "Language",
				"sidebar/metadata/rights": "Rights",
				"sidebar/metadata/modified_date": "Modified date",
				"sidebar/metadata/layout": "Layout", // rendition:layout
				"sidebar/metadata/flow": "Flow", // rendition:flow
				"sidebar/metadata/spread": "Spread", // rendition:spread
				"sidebar/metadata/direction": "Direction", // page-progression-direction

				"notedlg/label": "Note",
				"notedlg/add": "Add",

				"status/fullscreen": "Fullscreen",
				"status/": "",
			},
			fr: {
				"toolbar/sidebar": "Barre latérale",
				"toolbar/prev": "???",
				"toolbar/next": "???",
				"toolbar/openbook": "Ouvrir un livre local",
				"toolbar/openbook/error": "Votre navigateur ne prend pas en charge les fonctions nécessaires.\nVeuillez utiliser un navigateur moderne tel que Google Chrome ou Mozilla Firefox.",
				"toolbar/bookmark": "Insérer un marque page ici",
				"toolbar/fullscreen": "Plein écran",
				"toolbar/background": "Changer l'arrière-plan",

				"sidebar/close": "???",
				"sidebar/contents": "Sommaire",
				"sidebar/bookmarks": "Marque-pages",
				"sidebar/bookmarks/add": "Ajouter",
				"sidebar/bookmarks/remove": "Retirer",
				"sidebar/bookmarks/clear": "Tout enlever",
				"sidebar/annotations": "Annotations",
				"sidebar/annotations/add": "Ajouter",
				"sidebar/annotations/remove": "Retirer",
				"sidebar/annotations/clear": "Tout enlever",
				"sidebar/annotations/anchor": "Ancre",
				"sidebar/annotations/cancel": "Annuler",
				"sidebar/search": "Rechercher",
				"sidebar/search/placeholder": "rechercher",
				"sidebar/settings": "Réglages",
				"sidebar/settings/language": "Langue",
				"sidebar/settings/fontsize": "???",
				"sidebar/settings/flow": "???",
				"sidebar/settings/pagination": ["Pagination", "Établir une pagination"],
				"sidebar/settings/spread": "???",
				"sidebar/settings/spread/minwidth": "???",
				"sidebar/metadata": "???",
				"sidebar/metadata/title": "???",
				"sidebar/metadata/creator": "???",
				"sidebar/metadata/description": "???",
				"sidebar/metadata/pubdate": "???",
				"sidebar/metadata/publisher": "???",
				"sidebar/metadata/identifier": "???",
				"sidebar/metadata/language": "Langue",
				"sidebar/metadata/rights": "???",
				"sidebar/metadata/modified_date": "???",
				"sidebar/metadata/layout": "???",
				"sidebar/metadata/flow": "???",
				"sidebar/metadata/spread": "???",
				"sidebar/metadata/direction": "???",

				"notedlg/label": "???",
				"notedlg/add": "Ajouter",

				"status/fullscreen": "",
				"status/": "",
			},
			ja: {
				"toolbar/sidebar": "サイドバー",
				"toolbar/prev": "???",
				"toolbar/next": "???",
				"toolbar/openbook": "本を開く",
				"toolbar/openbook/error": "ご利用のブラウザは必要な機能をサポートしていません。\nGoogle Chrome、Mozilla Firefox、その他のモダンなブラウザでご利用ください。",
				"toolbar/bookmark": "このページに栞を設定する",
				"toolbar/fullscreen": "フルスクリーン",
				"toolbar/background": "背景を変更する",

				"sidebar/close": "???",
				"sidebar/contents": "目次",
				"sidebar/bookmarks": "栞",
				"sidebar/bookmarks/add": "追加",
				"sidebar/bookmarks/remove": "削除",
				"sidebar/bookmarks/clear": "クリア",
				"sidebar/annotations": "注釈",
				"sidebar/annotations/add": "追加",
				"sidebar/bookmarks/remove": "削除",
				"sidebar/annotations/clear": "クリア",
				"sidebar/annotations/anchor": "アンカー",
				"sidebar/annotations/cancel": "キャンセル",
				"sidebar/search": "検索",
				"sidebar/search/placeholder": "検索",
				"sidebar/settings": "設定",
				"sidebar/settings/language": "表示言語",
				"sidebar/settings/fontsize": "???",
				"sidebar/settings/flow": "???",
				"sidebar/settings/pagination": ["ページネーション", "ページネーションを生成します。"],
				"sidebar/settings/spread": "???",
				"sidebar/settings/spread/minwidth": "???",
				"sidebar/metadata": "???",
				"sidebar/metadata/title": "???",
				"sidebar/metadata/creator": "???",
				"sidebar/metadata/description": "???",
				"sidebar/metadata/pubdate": "???",
				"sidebar/metadata/publisher": "???",
				"sidebar/metadata/identifier": "???",
				"sidebar/metadata/language": "表示言語",
				"sidebar/metadata/rights": "???",
				"sidebar/metadata/modified_date": "???",
				"sidebar/metadata/layout": "???",
				"sidebar/metadata/flow": "???",
				"sidebar/metadata/spread": "???",
				"sidebar/metadata/direction": "???",

				"notedlg/label": "???",
				"notedlg/add": "追加",

				"status/fullscreen": "",
				"status/": "",
			},
			ru: {
				"toolbar/sidebar": "Боковая панель",
				"toolbar/prev": "Предыдущая страница",
				"toolbar/next": "Следущая страница",
				"toolbar/openbook": "Открыть книгу",
				"toolbar/openbook/error": "Ваш браузер не поддерживает необходимые функции.\nПожалуйста, используйте современный браузер, такой как Google Chrome или Mozilla Firefox.",
				"toolbar/bookmark": "Добавить эту страницу в закладки",
				"toolbar/fullscreen": "Полноэкранный режим",
				"toolbar/background": "изменить фон",

				"sidebar/close": "Закрыть боковую панель",
				"sidebar/contents": "Содержание",
				"sidebar/bookmarks": "Закладки",
				"sidebar/bookmarks/add": "Добавить",
				"sidebar/bookmarks/remove": "Удалить",
				"sidebar/bookmarks/clear": "Очистить",
				"sidebar/annotations": "Аннотации",
				"sidebar/annotations/add": "Добавить",
				"sidebar/annotations/remove": "Удалить",
				"sidebar/annotations/clear": "Очистить",
				"sidebar/annotations/anchor": "Метка",
				"sidebar/annotations/cancel": "Отмена",
				"sidebar/search": "Поиск",
				"sidebar/search/placeholder": "Поиск",
				"sidebar/settings": "Настройки",
				"sidebar/settings/language": "Язык",
				"sidebar/settings/fontsize": "Размер шрифта",
				"sidebar/settings/flow": "Поток",
				"sidebar/settings/pagination": ["Нумерация страниц", "Генерировать нумерацию страниц"],
				"sidebar/settings/spread": "Разворот",
				"sidebar/settings/spread/minwidth": "Мин. ширина колонки",
				"sidebar/metadata": "Метаданные",
				"sidebar/metadata/title": "Заголовок",
				"sidebar/metadata/creator": "Автор",
				"sidebar/metadata/description": "Описание",
				"sidebar/metadata/pubdate": "Дата публикации",
				"sidebar/metadata/publisher": "Издатель",
				"sidebar/metadata/identifier": "Идентификатор",
				"sidebar/metadata/language": "Язык",
				"sidebar/metadata/rights": "Лицензия",
				"sidebar/metadata/modified_date": "Дата изменения",
				"sidebar/metadata/layout": "Макет",
				"sidebar/metadata/flow": "Поток",
				"sidebar/metadata/spread": "Разворот",
				"sidebar/metadata/direction": "Направление",

				"notedlg/label": "Заметка",
				"notedlg/add": "Добавить",

				"status/fullscreen": "",
				"status/": "",
			},
			vi: {
				"toolbar/sidebar": "Thanh bên",
				"toolbar/prev": "Trang trước",
				"toolbar/next": "Trang kế tiếp",
				"toolbar/openbook": "Mở sách",
				"toolbar/openbook/error": "Trình duyệt của bạn không hỗ trợ các tính năng cần thiết. Vui lòng sử dụng trình duyệt hiện đại như Google Chrome hoặc Mozilla Firefox.",
				"toolbar/bookmark": "Thêm trang này vào dấu trang",
				"toolbar/fullscreen": "Toàn màn hình",
				"toolbar/background": "Đổi màu nền",

				"sidebar/close": "Đóng thanh bên",
				"sidebar/contents": "Nội dung",
				"sidebar/bookmarks": "Dấu trang",
				"sidebar/bookmarks/add": "Thêm dấu trang",
				"sidebar/bookmarks/remove": "Xóa dấu trang",
				"sidebar/bookmarks/clear": "???",
				"sidebar/annotations": "Chú thích",
				"sidebar/annotations/add": "Thêm chú thích",
				"sidebar/annotations/remove": "Xóa chú thích",
				"sidebar/annotations/clear": "???",
				"sidebar/annotations/anchor": "???",
				"sidebar/annotations/cancel": "???",
				"sidebar/search": "Tìm kiếm",
				"sidebar/search/placeholder": "???",
				"sidebar/settings": "Cài đặt",
				"sidebar/settings/language": "Ngôn ngữ",
				"sidebar/settings/fontsize": "Cỡ chữ (%)",
				"sidebar/settings/flow": "???",
				"sidebar/settings/pagination": ["???", "???"],
				"sidebar/settings/spread": "???",
				"sidebar/settings/spread/minwidth": "????",
				"sidebar/metadata": "Metadata",
				"sidebar/metadata/title": "Chủ đề",
				"sidebar/metadata/creator": "Người sáng tạo",
				"sidebar/metadata/description": "Mô tả",
				"sidebar/metadata/pubdate": "Ngày tạo",
				"sidebar/metadata/publisher": "Nhà xuất bản",
				"sidebar/metadata/identifier": "Định dạng",
				"sidebar/metadata/language": "Ngôn ngữ",
				"sidebar/metadata/rights": "Quyền",
				"sidebar/metadata/modified_date": "Ngày sửa đổi",
				"sidebar/metadata/layout": "???", // rendition:layout
				"sidebar/metadata/flow": "???", // rendition:flow
				"sidebar/metadata/spread": "???", // rendition:spread
				"sidebar/metadata/direction": "???", // page-progression-direction

				"notedlg/label": "???",
				"notedlg/add": "???",

				"status/fullscreen": "Toàn màn hình",
				"status/": "",
			}
		};

		reader.on("languagechanged", (value) => {
			this.language = value;
		});
	}

	get(key) { return this.values[this.language][key] || "???"; }
}
;// CONCATENATED MODULE: ./src/ui.js
/**
 * @author mrdoob https://github.com/mrdoob/ui.js
 */

const ERROR_MSG = "is not an instance of UIElement.";

/**
 * UIElement
 * @param {string} tag
 */
class UIElement {

	constructor(tag) {

		this.dom = document.createElement(tag);
	}

	add() {

		for (let i = 0; i < arguments.length; i++) {

			const argument = arguments[i];

			if (argument instanceof UIElement) {

				this.dom.appendChild(argument.dom);

			} else if (Array.isArray(argument)) {

				for (let j = 0; j < argument.length; j++) {

					const element = argument[j];

					if (element instanceof UIElement) {

						this.dom.appendChild(element.dom);
					} else {

						console.error("UIElement:", element, ERROR_MSG);
					}
				}
			} else {

				console.error("UIElement:", argument, ERROR_MSG);
			}
		}
		return this;
	}

	remove() {

		for (let i = 0; i < arguments.length; i++) {

			const argument = arguments[i];

			if (argument instanceof UIElement) {

				this.dom.removeChild(argument.dom);

			} else if (Number.isInteger(argument)) {

				this.dom.removeChild(this.dom.childNodes[argument]);
			} else {

				console.error("UIElement:", argument, ERROR_MSG);
			}
		}
		return this;
	}

	clear() {

		while (this.dom.children.length) {

			this.dom.removeChild(this.dom.lastChild);
		}
		return this;
	}

	setId(id) {

		this.dom.id = id;
		return this;
	}

	getId() {

		return this.dom.id;
	}

	removeAttribute(name) {

		this.dom.removeAttribute(name);
		return this;
	}

	setClass(name) {

		this.dom.className = name;
		return this;
	}

	addClass(name) {

		this.dom.classList.add(name);
		return this;
	}

	removeClass(name) {

		this.dom.classList.remove(name);
		return this;
	}

	setStyle(key, value) {

		this.dom.style[key] = value;
		return this;
	}

	getTitle() {

		return this.dom.title;
	}

	setTitle(title) {

		if (this.dom.title !== title && title)
			this.dom.title = title;
		return this;
	}

	getTextContent() {

		return this.dom.textContent;
	}

	setTextContent(text) {

		if (this.dom.textContent !== text && text)
			this.dom.textContent = text;
		return this;
	}

	getBoundingClientRect() {

		return this.dom.getBoundingClientRect();
	}
}

/**
 * UISpan
 * @param {string} text
 */
class UISpan extends UIElement {

	constructor(text) {

		super("span");
		this.setTextContent(text);
	}
}

/**
 * UIDiv
 */
class UIDiv extends UIElement {

	constructor() {

		super("div");
	}

	setClass(className) {
		this.dom.className = className;
		return this;
	}

	addClass(className) {
		this.dom.classList.add(className);
		return this;
	}
}

/**
 * UIRow
 */
class UIRow extends UIDiv {

	constructor() {

		super();

		this.dom.className = "row";
	}
}

/**
 * UIPanel
 */
class UIPanel extends UIDiv {

	constructor() {

		super();

		this.dom.className = "panel";
	}
}

/**
 * UILabel
 * @param {string} text
 * @param {string} id
 */
class UILabel extends UIElement {

	constructor(text, id) {

		super("label");

		this.dom.textContent = text;
		if (id) this.dom.htmlFor = id;
	}
}

/**
 * UILink
 * @param {string} href
 * @param {string} text
 */
class UILink extends UIElement {

	constructor(href, text) {

		super("a");

		this.dom.href = href || "#";
		this.dom.textContent = text || "";
	}

	setHref(url) {

		this.dom.href = url;
		return this;
	}
}

/**
 * UIText
 * @param {string} text
 */
class UIText extends UISpan {

	constructor(text) {

		super();

		this.dom.textContent = text;
	}

	getValue() {

		return this.dom.textContent;
	}

	setValue(text) {

		this.dom.textContent = text;
		return this;
	}
}

/**
 * UITextArea
 */
class UITextArea extends UIElement {

	constructor() {

		super("textarea");

		this.dom.spellcheck = false;
		this.dom.onkeydown = (e) => {

			e.stopPropagation();
		};
	}

	getValue() {

		return this.dom.value;
	}

	setValue(value) {

		this.dom.value = value;
		return this;
	}
}

/**
 * UISelect
 */
class UISelect extends UIElement {

	constructor() {

		super("select");
	}

	setMultiple(boolean) {

		this.dom.multiple = boolean || false;
		return this;
	}

	setOptions(options) {

		const selected = this.dom.value;
		this.clear();

		for (const key in options) {

			const option = document.createElement("option");
			option.value = key;
			option.text = options[key];
			this.dom.appendChild(option);
		}
		this.dom.value = selected;
		return this;
	}

	getValue() {

		return this.dom.value;
	}

	setValue(value) {

		value = String(value);

		if (this.dom.value !== value)
			this.dom.value = value;
		return this;
	}
}

/**
 * UIInput
 * @param {*} type
 * @param {*} value
 * @param {*} title
 */
class UIInput extends UIElement {

	constructor(type, value, title) {

		super("input");

		this.dom.type = type;
		this.dom.onkeydown = (e) => {

			e.stopPropagation();
		};
		this.setValue(value);
		this.setTitle(title);
	}

	getName() {

		return this.dom.name;
	}

	setName(name) {

		this.dom.name = name;
		return this;
	}

	getType() {

		return this.dom.type;
	}

	setType(type) {

		this.dom.type = type;
		return this;
	}

	getValue() {

		return this.dom.value;
	}

	setValue(value) {

		if (this.dom.value !== value && value !== undefined)
			this.dom.value = value;
		return this;
	}
}

/**
 * UIColor
 */
class UIColor extends UIElement {

	constructor() {

		super("input");

		try {

			this.dom.type = "color";
			this.dom.value = "#ffffff";

		} catch (e) {

			console.exception(e);
		}
	}

	getValue() {

		return this.dom.value;
	}

	getHexValue() {

		return parseInt(this.dom.value.substr(1), 16);
	}

	setValue(value) {

		this.dom.value = value;
		return this;
	}

	setHexValue(hex) {

		this.dom.value = "#" + ("000000" + hex.toString(16)).slice(-6);
		return this;
	}
}

/**
 * UINumber
 * @param {number} value
 * @param {number} step
 * @param {number} min
 * @param {number} max
 * @param {number} precision
 */
class UINumber extends UIElement {

	constructor(value, step, min, max, precision) {

		super("input");

		this.dom.type = "number";
		this.dom.step = step || 1;
		this.dom.onkeydown = (e) => {

			e.stopPropagation();
		};
		this.value = value || 0;
		this.min = min || -Infinity;
		this.max = max || +Infinity;
		this.precision = precision || 0;
		this.setValue(value);
		this.dom.onchange = (e) => {

			this.setValue(this.value);
		};
	}

	getName() {

		return this.dom.name;
	}

	setName(name) {

		this.dom.name = name;
		return this;
	}

	setPrecision(precision) {

		this.precision = precision;
		this.setValue(this.value);
		return this;
	}

	setRange(min, max) {

		this.min = min;
		this.max = max;
		this.dom.min = min;
		this.dom.max = max;
		return this;
	}

	setStep(step) {

		this.dom.step = step;
		return this;
	}

	getValue() {

		return parseFloat(this.dom.value);
	}

	setValue(value) {

		if (value !== undefined) {
			value = parseFloat(value);

			if (value < this.min)
				value = this.min;
			if (value > this.max)
				value = this.max;

			this.value = value;
			this.dom.value = value.toFixed(this.precision);
		}
		return this;
	}
}

/**
 * UIBreak
 */
class UIBreak extends UIElement {

	constructor() {

		super("br");
	}
}

/**
 * UIHorizontalRule
 */
class UIHorizontalRule extends UIElement {

	constructor() {

		super("hr");
	}
}

/**
 * UIProgress
 * @param {*} value
 */
class UIProgress extends UIElement {

	constructor(value) {

		super("progress");

		this.dom.value = value;
	}

	setValue(value) {

		this.dom.value = value;
		return this;
	}
}

/**
 * UITabbedPanel
 * @param {string} align (horizontal | vertical)
 */
class UITabbedPanel extends UIDiv {

	constructor(align) {

		super();

		this.align = align || "horizontal";
		this.tabs = [];
		this.panels = [];
		this.selector = new UISpan().setClass("tab-selector");
		this.menuDiv = new UIDiv().setClass("menu");
		this.tabsDiv = new UIDiv().setClass("tabs");
		this.tabsDiv.add(this.selector);
		this.panelsDiv = new UIDiv().setClass("panels");
		this.selected = "";
		this.add(this.menuDiv);
		this.add(this.tabsDiv);
		this.add(this.panelsDiv);
	}

	addMenu(items) {
		this.menuDiv.add(items);
	}

	addTab(id, label, items) {

		const tab = new UITab(label, this);
		tab.setId(id);
		tab.setClass("box");
		this.tabs.push(tab);
		this.tabsDiv.add(tab);

		const panel = new UIDiv();
		panel.setId(id);
		panel.add(items);
		this.panels.push(panel);
		this.panelsDiv.add(panel);
		this.select(id);
	}

	select(id) {

		for (let tab of this.tabs) {
			if (tab.dom.id === id) {
				tab.addClass("selected");
				this.transformSelector(tab);
			} else if (tab.dom.id === this.selected) {
				tab.removeClass("selected");
			}
		}

		for (let panel of this.panels) {
			if (panel.dom.id === id) {
				panel.dom.style.display = "block";
			} else if (panel.dom.id === this.selected) {
				panel.dom.style.display = "none";
			}
		}

		this.selected = id;
		return this;
	}

	setLabel(id, text) {

		for (let tab of this.tabs) {
			if (tab.dom.id === id) {
				tab.setTitle(text);
				break;
			}
		}
	}

	transformSelector(tab) {

		let size;
		const rect = tab.getBoundingClientRect();
		if (this.align === "horizontal") {
			size = rect.width * this.tabs.indexOf(tab);
			this.selector.dom.style.transform = `translateX(${size}px)`;
		} else {
			size = rect.height * this.tabs.indexOf(tab);
			this.selector.dom.style.transform = `translateY(${size}px)`;
		}
	}
}

/**
 * UITab
 * @param {string} text
 * @param {UITabbedPanel} parent
 */
class UITab extends UIDiv {

	constructor(text, parent) {

		super();
		this.button = new UIInput("button");
		this.button.dom.title = text;
		this.dom.onclick = (e) => {

			parent.select(this.dom.id);
			e.preventDefault();
		};
		this.add(this.button);
	}
}

/**
 * UIList
 * @param {UIItem} parent
 */
class UIList extends UIElement {

	constructor(parent) {

		super("ul");
		this.parent = parent && parent.parent; // LI->UL
		this.expanded = false;
	}

	expand() {

		this.expanded = true;
		this.dom.style.display = "block";
		if (this.parent)
			this.parent.expand();
		return this;
	}

	collaps() {

		this.expanded = false;
		this.dom.style.display = "none";
		return this;
	}
}

/**
 * UIItem
 * @param {UIList} parent
 */
class UIItem extends UIElement {

	constructor(parent) {

		super("li");
		this.parent = parent; // UL
		this.selected = false;
	}

	add() {
		let len = 0;
		const box = new UIDiv().setId("item-box");
		for (let i = 0; i < arguments.length; i++) {
			const argument = arguments[i];
			if (argument instanceof UIList) {
				super.add(argument);
			} else {
				box.add(argument);
				len++;
			}
		}
		if (len) super.add(box);
		return this;
	}

	select() {

		this.selected = true;
		this.setClass("selected");
		return this;
	}

	unselect() {

		this.selected = false;
		this.removeAttribute("class");
		return this;
	}
}

/**
 * UIBox
 * @param {UIElement} items
 */
class UIBox extends UIElement {

	constructor(items) {

		super("div");
		this.setClass("box");
		this.add(items);
	}
}

/**
 * UIButton
 * @param {UIButton} items
 */
class UIButton extends UIElement {
	constructor(items) {
		super("button");
	}
}
;// CONCATENATED MODULE: ./src/sidebar/search.js


class SearchPanel extends UIPanel {

	constructor(reader) {

		super();
		const container = new UIDiv().setClass("list-container");
		const strings = reader.strings;

		let searchQuery = undefined;
		const search = new UIInput("search").setId("nav-q");
		search.dom.placeholder = strings.get("sidebar/search/placeholder");
		search.dom.onsearch = () => {

			const value = search.getValue();

			if (value.length === 0) {
				this.items.clear();
			} else if (searchQuery !== value) {
				this.items.clear();
				this.doSearch(value).then(results => {

					results.forEach(data => {
						this.set(data);
					});
				});
			}
			searchQuery = value;
		};

		this.setId("search");
		this.items = new UIList();
		container.add(this.items);
		this.add([new UIBox(search), container]);
		this.reader = reader;
		this.selector = undefined;
		//
		// improvement of the highlighting of keywords is required...
		//
	}

	/**
	 * Searching the entire book
	 * @param {*} q Query keyword
	 * @returns The search result array.
	 */
	async doSearch(q) {

		const book = this.reader.book;
		const results = await Promise.all(
			book.spine.spineItems.map(item => item.load(book.load.bind(book))
				.then(item.find.bind(item, q)).finally(item.unload.bind(item))));
		return await Promise.resolve([].concat.apply([], results));
	}

	set(data) {

		const link = new UILink("#" + data.cfi, data.excerpt);
		const item = new UIItem();
		link.dom.onclick = () => {

			if (this.selector && this.selector !== item)
				this.selector.unselect();
			
			item.select();
			this.selector = item;
			this.reader.rendition.display(data.cfi);
			return false;
		};
		item.add(link);
		this.items.add(item);
	}
}
;// CONCATENATED MODULE: ./src/toolbar.js



class Toolbar {

	constructor(reader) {

		const strings = reader.strings;
		const settings = reader.settings;

		const container = new UIDiv().setId("toolbar");
		const keys = [
			"toolbar/sidebar",
			"toolbar/prev",
			"toolbar/next",
			"toolbar/openbook",
			"toolbar/openbook/error",
			"toolbar/bookmark",
			"toolbar/fullscreen",
			"toolbar/background",
			"toolbar/search",
			"toolbar/close",
		];

		/*------------------------ Toolbar Menu 1 --------------------------*/
		const menu1 = new UIDiv().setClass("menu-1");
		const openerBox = new UIDiv().setId("btn-m").setClass("box");
		const openerBtn = new UIInput("button");
		openerBtn.dom.title = strings.get(keys[0]);
		openerBtn.dom.onclick = (e) => {

			reader.emit("sidebaropener", true);
			openerBtn.dom.blur();
			e.preventDefault();
		};
		openerBox.add(openerBtn);
		menu1.add(openerBox);

		let prevBox, prevBtn;
		let nextBox, nextBtn;
		if (settings.arrows === "toolbar") {
			prevBox = new UIDiv().setId("btn-p").setClass("box");
			prevBtn = new UIInput("button");
			prevBtn.setTitle(strings.get(keys[1]));
			prevBtn.dom.onclick = (e) => {

				reader.emit("prev");
				e.preventDefault();
				prevBtn.dom.blur();
			};
			prevBox.add(prevBtn);
			menu1.add(prevBox);

			nextBox = new UIDiv().setId("btn-n").setClass("box");
			nextBtn = new UIInput("button");
			nextBtn.dom.title = strings.get(keys[2]);
			nextBtn.dom.onclick = (e) => {

				reader.emit("next");
				e.preventDefault();
				nextBtn.dom.blur();
			};
			nextBox.add(nextBtn);
			menu1.add(nextBox);
		}

		/* ------------------------ Button Logo ------------------------- */
		const logoBox = new UIDiv().setId("btn-logo").setClass("logo");
		const logoLink = new UILink().setId("logo-link").setHref("#").setTextContent("LOGO");

		logoBox.add(logoLink);
		menu1.add(logoBox);

		/* ------------------------ Button Index List (muc luc) -------------------------- */
		let tocBox, tocBtn;
		tocBox = new UIDiv().setId("btn-t").setClass("box");
		tocBtn = new UIInput("button");

		// load toc content title for toc list
		tocBtn.dom.onclick = (e) => {
			e.stopPropagation();
			reader.book.loaded.navigation.then((toc) => {
				showToc(toc);
			})
		}

		tocBox.add(tocBtn);
		menu1.add(tocBox);

		// Function to show the toc list
		function showToc(toc) {
			let existingToc = document.getElementById("toolbar-toc-list");

			if (existingToc) {
				existingToc.remove();
			} else {
				let tocList = document.createElement("ul");
				tocList.setAttribute("id", "toolbar-toc-list");

				let tocTitle = document.createElement("h3");
				tocTitle.textContent = "Mục lục";

				tocList.appendChild(tocTitle);

				toc.forEach((chapter) => {
					let tocItem = document.createElement("li");
					let tocLink = document.createElement("a");

					tocLink.href = "#";
					tocLink.textContent = chapter.label;

					tocLink.onclick = (e) => {
						e.preventDefault();

						document.querySelectorAll("#toolbar-toc-list li a").forEach((link) => {
							link.classList.remove("active");
						})

						tocLink.classList.add("active");

						// show the chapter with the title chosed in toc list
						reader.rendition.display(chapter.href);
					};

					tocItem.appendChild(tocLink);
					tocList.appendChild(tocItem);
				});

				tocBox.dom.appendChild(tocList);
			}

			let tocList = document.getElementById("toolbar-toc-list");
			tocList.classList.toggle("active");
		}



		/* ------------------------ Button My Bookmark (bookmark cua toi) --------------------------*/
		let bookmarksBox, bookmarksBtn;
		bookmarksBox = new UIDiv().setId("btn-d").setClass("box");
		bookmarksBtn = new UIInput("button");

		bookmarksBtn.dom.onclick = (e) => {
			e.stopPropagation();
			showBookmarks();
		}

		bookmarksBox.add(bookmarksBtn);
		menu1.add(bookmarksBox);

		function showBookmarks() {
			let bookmarksList = document.getElementById("toolbar-bookmarks-list");

			if (!bookmarksList) {
				bookmarksList = document.createElement("ul");
				bookmarksList.setAttribute("id", "toolbar-bookmarks-list");
				bookmarkBox.dom.appendChild(bookmarksList);
			}

			updateBookmarksList();
			bookmarksList.classList.toggle("active");
		}

		reader.on("bookmarked", (boolean, cfi) => {
			updateBookmarksList();
		})

		function updateBookmarksList() {
			let bookmarksList = document.getElementById("toolbar-bookmarks-list");

			if (!bookmarksList) return;

			bookmarksList.innerHTML = "";

			let title = document.createElement("h3");
			title.textContent = "Bookmarks của tui";
			bookmarksList.appendChild(title);

			reader.settings.bookmarks.forEach((cfi, index) => {
				let bookmarkItem = document.createElement("li");
				let bookmarkLink = document.createElement("a");
				let deleteBtn = document.createElement("span");

				bookmarkLink.href = "#";
				bookmarkLink.textContent = `Bookmark ${index + 1}`;

				bookmarkLink.onclick = (e) => {
					e.preventDefault();

					document.querySelectorAll("#toolbar-bookmarks-list li a").forEach((link) => {
						link.classList.remove("active");
					});

					bookmarkLink.classList.add("active");

					reader.rendition.display(cfi);
				};

				deleteBtn.innerHTML = '<i class="bi bi-trash-fill"></i>';
				deleteBtn.onclick = (e) => {
					e.stopPropagation();
					reader.removeBookmarkFromToolbar(cfi);
				};

				bookmarkItem.appendChild(bookmarkLink);
				bookmarkItem.appendChild(deleteBtn);
				bookmarksList.appendChild(bookmarkItem);
			})
		}

		// Hàm xóa bookmark từ toolbar
		reader.removeBookmarkFromToolbar = function (cfi) {

			let bookmarksList = document.getElementById("toolbar-bookmarks-list");
			if (!bookmarksList) return;

			let bookmarkItems = bookmarksList.querySelectorAll("li");
			let targetItem = Array.from(bookmarkItems).find(item => {
				return item.querySelector("a").textContent.includes(cfi);
			});

			if (targetItem) {
				targetItem.remove();
			}

			const index = reader.settings.bookmarks.indexOf(cfi);
			if (index !== -1) {
				reader.settings.bookmarks.splice(index, 1);
			}

			reader.emit("bookmarked", false, cfi);
			reader.bookmarksPanel.removeBookmark(cfi);
		};



		/* ------------------------ Button Highlight And Note ---------------------------- */
		let annotationsBox, annotationsBtn;
		annotationsBox = new UIDiv().setId("btn-a").setClass("box");
		annotationsBtn = new UIInput("button");

		// show annotations list when click icon on toolbar
		annotationsBtn.dom.onclick = (e) => {
			e.stopPropagation();
			showAnnotations();
		}

		annotationsBox.add(annotationsBtn);
		menu1.add(annotationsBox);

		// Function to show the annotations list
		function showAnnotations() {
			let existingList = document.getElementById("toolbar-annotations-list");

			if (!existingList) {
				let annotationsList = document.createElement("ul");
				annotationsList.setAttribute("id", "toolbar-annotations-list");

				let title = document.createElement("h3");
				title.textContent = "Highlights & Ghi chú";

				annotationsList.appendChild(title);

				reader.settings.annotations.forEach((note) => {
					let noteItem = document.createElement("li");
					let noteLink = document.createElement("a");
					let deleteBtn = document.createElement("span");

					noteLink.href = "#";
					noteLink.textContent = note.text;

					noteLink.onclick = (e) => {
						e.preventDefault();

						document.querySelectorAll("#toolbar-annotations-list li a").forEach((link) => {
							link.classList.remove("active");
						})

						noteLink.classList.add("active");

						reader.rendition.display(note.cfi);
					}

					deleteBtn.innerHTML = '<i class="bi bi-trash-fill"></i>';
					// emit event to delete annotation items
					deleteBtn.onclick = (e) => {
						e.stopPropagation();
						reader.removeNoteFromToolbar(note);
					}

					noteItem.appendChild(noteLink);
					noteItem.appendChild(deleteBtn);
					annotationsList.appendChild(noteItem);
				})

				annotationsBox.dom.appendChild(annotationsList);
			}

			let annotationsList = document.getElementById("toolbar-annotations-list");
			annotationsList.classList.toggle("active");
		}

		reader.removeNoteFromToolbar = function (note) {
			let annotationsList = document.getElementById("toolbar-annotations-list");
			if (!annotationsList) return;

			let noteItems = annotationsList.querySelectorAll("li");
			let targetItem = Array.from(noteItems).find(item => {
				item.querySelector('a').textContent === note.text;
			})

			if (targetItem) {
				targetItem.remove();
			}

			const annotationsPanel = reader.annotationsPanel;
			if (annotationsPanel) {
				annotationsPanel.removeNote(note);
				annotationsPanel.update();
			}

			const index = reader.settings.annotations.findIndex((n) => n.cfi === note.cfi);
			if (index !== -1) {
				reader.settings.annotations.splice(index, 1);
			}

			reader.rendition.annotations.remove(note.cfi, "highlight");
		}




		/* ----------------------------- Current Page -------------------------------- */
		const centerPageCount = new UIDiv().setClass("menu-center");

		const centerLabel = new UILabel().setClass("toolbar-center-label");
		centerLabel.setTextContent("Determined");

		const curOfTotal = new UIDiv().setClass("page-map");
		const curPageIndex = new UISpan().setClass("current-page-index").setTextContent("1");
		const separator = new UIText().setTextContent(" của ");
		const totalPage = new UISpan().setClass("total-pages").setTextContent("200");

		curOfTotal.add(curPageIndex);
		curOfTotal.add(separator);
		curOfTotal.add(totalPage);

		centerPageCount.add(centerLabel);
		centerPageCount.add(curOfTotal);



		/*------------------------ Toolbar Menu 2 --------------------------*/
		const menu2 = new UIDiv().setClass("menu-2");
		// Button change background
		let backgroundBox, colorPicker;
		if (settings.background) {
			// Init elements: background box div, input color picker
			backgroundBox = new UIDiv().setId("btn-bg").setClass("box");
			colorPicker = new UIInput("color").setClass("color-picker");
			colorPicker.dom.title = strings.get(keys[7]);

			// Handle event get color from color table of input color
			colorPicker.dom.oninput = (e) => {
				const selectedColor = e.target.value;

				// Emit 'colorchanged' event with selected color
				reader.emit("colorchanged", selectedColor);
			}

			backgroundBox.add(colorPicker);
			menu2.add(backgroundBox);
		}


		// Button "A-", "A+" and input (hidden) for font-size
		let fontLabel = new UILabel().setClass("font-size-px").setTextContent("Fontsize (px):")
		let fontSizeBox = new UIDiv().setId("btn-fontsize").setClass("box");
		let decreaseFontBtn = new UIInput("button").setClass("btn-font-decrease");
		let increaseFontBtn = new UIInput("button").setClass("btn-font-increase");
		let fontSizeInput = new UIInput("text").setClass("input-font-size");

		let fontSize = settings.fontSize || 16;
		fontSizeInput.dom.value = fontSize;

		decreaseFontBtn.dom.textContent = "-";
		decreaseFontBtn.dom.onclick = () => {
			fontSize = Math.max(8, fontSize - 1);
			fontSizeInput.dom.value = fontSize;

			reader.emit("styleschanged", { fontSize: fontSize });
		};

		increaseFontBtn.dom.textContent = "+";
		increaseFontBtn.dom.onclick = () => {
			fontSize = Math.min(72, fontSize + 1);
			fontSizeInput.dom.value = fontSize;

			reader.emit("styleschanged", { fontSize: fontSize });
		};

		fontSizeInput.dom.onchange = () => {
			let newSize = parseInt(fontSizeInput.dom.value, 10);
			if (!isNaN(newSize) && newSize >= 8 && newSize <= 72) {
				fontSize = newSize;

				reader.emit("styleschanged", { fontSize: fontSize });
			} else {
				fontSizeInput.dom.value = fontSize;
			}
		};

		fontSizeBox.add(fontLabel);
		fontSizeBox.add(decreaseFontBtn);
		fontSizeBox.add(fontSizeInput);
		fontSizeBox.add(increaseFontBtn);
		menu2.add(fontSizeBox);


		// Button open file
		let openbookBtn;
		if (settings.openbook) {
			const onload = (e) => {

				reader.storage.clear();
				reader.storage.set(e.target.result, () => {
					reader.unload();
					reader.init(e.target.result);
					const url = new URL(window.location.origin);
					window.history.pushState({}, "", url);
				});
			};
			const onerror = (e) => {
				console.error(e);
			};
			const openbookBox = new UIDiv().setId("btn-o").setClass("box");
			openbookBtn = new UIInput("file");
			openbookBtn.dom.title = strings.get(keys[3]);
			openbookBtn.dom.accept = "application/epub+zip";
			openbookBtn.dom.onchange = (e) => {

				if (e.target.files.length === 0)
					return;

				if (window.FileReader) {

					const fr = new FileReader();
					fr.onload = onload;
					fr.readAsArrayBuffer(e.target.files[0]);
					fr.onerror = onerror;
				} else {
					alert(strings.get(keys[4]));
				}

			};
			openbookBtn.dom.onclick = (e) => {

				openbookBtn.dom.blur();
			};
			openbookBox.add(openbookBtn);
			menu2.add(openbookBox);
		}


		// Button search 
		let searchBox, searchBtn;
		let searchInput, searchResults;
		searchBox = new UIDiv().setId("btn-s").setClass("box");
		searchBtn = new UIInput("button");
		searchBtn.setTitle(strings.get(keys[8]));

		searchBtn.dom.onclick = (e) => {
			e.stopPropagation();
			showSearchPopup();
		}

		searchBox.add(searchBtn);
		menu2.add(searchBox);

		function showSearchPopup() {
			let existingPopup = document.getElementById("toolbar-search-list");
			if (!existingPopup) {
				let searchPopup = document.createElement("div");
				searchPopup.setAttribute("id", "toolbar-search-list");
				searchPopup.classList.add("search-popup");

				let searchContainer = document.createElement("div");
				searchContainer.classList.add("search-container");

				let searchIcon = document.createElement("span");
				searchIcon.classList.add("search-icon");
				searchIcon.innerHTML = '<i class="bi bi-search"></i>';

				let searchInput = document.createElement("input");
				searchInput.setAttribute("type", "search");
				searchInput.setAttribute("placeholder", "Search");
				searchInput.setAttribute("id", "nav-q");
				searchInput.setAttribute("class", "toolbar-search-input");

				searchContainer.appendChild(searchIcon);
				searchContainer.appendChild(searchInput);

				let resultContainer = document.createElement("ul");
				resultContainer.setAttribute('id', 'toolbar-search-results');

				let searchPanel = new SearchPanel(reader);
				searchInput.oninput = async () => {
					let query = searchInput.value.trim();
					if (query.length > 0) {
						let results = await searchPanel.doSearch(query);
						resultContainer.innerHTML = "";

						if (results.length === 0) {
							let noResultItem = document.createElement("li");
							noResultItem.innerText = "Không tìm thấy kết quả trùng khớp";
							noResultItem.style.color = "gray";
							noResultItem.style.padding = "8px";
							resultContainer.appendChild(noResultItem);
						}

						results.forEach((data) => {
							let item = document.createElement("li");
							let link = document.createElement("a");
							link.href = "#" + data.cfi;
							link.textContent = data.excerpt;
							link.onclick = (e) => {
								e.preventDefault();
								searchPanel.reader.rendition.display(data.cfi);
							}
							item.appendChild(link);
							resultContainer.appendChild(item);
						})
					} else {
						resultContainer.innerHTML = "";
					}
				}

				searchPopup.appendChild(searchContainer);
				searchPopup.appendChild(resultContainer);
				searchBox.dom.appendChild(searchPopup);
			}

			let searchPopup = document.getElementById("toolbar-search-list");
			searchPopup.classList.toggle("active");
		}


		// Button Bookmark
		let bookmarkBox, bookmarkBtn;
		if (settings.bookmarks) {
			bookmarkBox = new UIDiv().setId("btn-b").setClass("box");
			bookmarkBtn = new UIInput("button");
			bookmarkBtn.setTitle(strings.get(keys[5]));
			bookmarkBtn.dom.onclick = (e) => {

				const cfi = this.locationCfi;
				const val = reader.isBookmarked(cfi) === -1;
				reader.emit("bookmarked", val);
				e.preventDefault();
				bookmarkBtn.dom.blur();
			};
			bookmarkBox.add(bookmarkBtn);
			menu2.add(bookmarkBox);
		}

		// Button Full Screen
		let fullscreenBtn;
		if (settings.fullscreen) {

			const fullscreenBox = new UIDiv().setId("btn-f").setClass("box");
			fullscreenBtn = new UIInput("button");
			fullscreenBtn.setTitle(strings.get(keys[6]));
			fullscreenBtn.dom.onclick = (e) => {

				this.toggleFullScreen();
				e.preventDefault();
			};

			document.onkeydown = (e) => {

				if (e.key === "F11") {
					e.preventDefault();
					this.toggleFullScreen();
				}
			};

			document.onfullscreenchange = (e) => {

				const w = window.screen.width === e.target.clientWidth;
				const h = window.screen.height === e.target.clientHeight;

				if (w && h) {
					fullscreenBox.addClass("resize-small");
				} else {
					fullscreenBox.removeClass("resize-small");
				}
			};
			fullscreenBox.add(fullscreenBtn);
			menu2.add(fullscreenBox);
		}

		container.add([menu1, centerPageCount, menu2]);
		document.body.appendChild(container.dom);

		// Button Close
		let closeBox, closeBtn;
		closeBox = new UIDiv().setId("btn-close").setClass("box");
		closeBtn = new UIInput("button").setClass("active");
		closeBtn.setTitle(strings.get(keys[9]));



		closeBox.add(closeBtn);
		menu2.add(closeBox);


		//-- events --//

		reader.on("relocated", (location) => {

			if (settings.bookmarks) {
				const cfi = location.start.cfi;
				const val = reader.isBookmarked(cfi) === -1;
				if (val) {
					bookmarkBox.removeClass("bookmarked");
				} else {
					bookmarkBox.addClass("bookmarked");
				}
				this.locationCfi = cfi; // save location cfi
			}
			if (settings.arrows === "toolbar") {
				prevBox.dom.style.display = location.atStart ? "none" : "block";
				nextBox.dom.style.display = location.atEnd ? "none" : "block";
			}
		});

		reader.on("bookmarked", (boolean) => {

			if (boolean) {
				bookmarkBox.addClass("bookmarked");
			} else {
				bookmarkBox.removeClass("bookmarked");
			}
		});

		reader.on("languagechanged", (value) => {

			openerBtn.setTitle(strings.get(keys[0]));

			if (settings.arrows === "toolbar") {
				prevBtn.setTitle(strings.get(keys[1]));
				nextBtn.setTitle(strings.get(keys[2]));
			}
			if (settings.openbook) {
				openbookBtn.setTitle(strings.get(keys[3]));
			}
			if (settings.bookmarks) {
				bookmarkBtn.setTitle(strings.get(keys[5]));
			}
			if (settings.fullscreen) {
				fullscreenBtn.setTitle(strings.get(keys[6]));
			}
			if (settings.background) {
				backgroundBtn.setTitle(strings.get(keys[7]));
			}

		});
	}

	toggleFullScreen() {

		document.activeElement.blur();

		if (document.fullscreenElement === null) {
			document.documentElement.requestFullscreen();
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}
}
;// CONCATENATED MODULE: ./src/content.js


class Content {

	constructor(reader) {

		const settings = reader.settings;
		const container = new UIDiv().setId("content");

		let prev;
		if (settings.arrows === "content") {

			prev = new UIDiv().setId("prev").setClass("arrow");
			prev.dom.onclick = (e) => {

				reader.emit("prev");
				e.preventDefault();
			};
			const iconLeft = new UISpan();
			iconLeft.dom.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
			prev.add(iconLeft);
			container.add(prev);
		}

		const viewer = new UIDiv().setId("viewer");
		container.add(viewer);

		// Handle the 'colorchanged' event to change background of 'viewer'
		reader.on("colorchanged", (color) => {
			viewer.dom.style.backgroundColor = color;
		});

		let next;
		if (settings.arrows === "content") {
			next = new UIDiv().setId("next").setClass("arrow");
			next.dom.onclick = (e) => {

				reader.emit("next");
				e.preventDefault();
			};
			const iconRight = new UISpan();
			iconRight.dom.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
			next.add(iconRight);
			container.add(next);
		}

		const loader = new UIDiv().setId("loader");
		const divider = new UIDiv().setId("divider");
		const overlay = new UIDiv().setId("overlay");
		overlay.dom.onclick = (e) => {
			reader.emit("sidebaropener", false);
			e.preventDefault();
		};

		container.add([loader, divider, overlay]);
		document.body.appendChild(container.dom);

		//-- events --//

		reader.on("bookready", (cfg) => {

			viewer.setClass(cfg.flow);
			loader.dom.style.display = "block";
		});

		reader.on("bookloaded", () => {

			loader.dom.style.display = "none";
		});

		reader.on("layout", (props) => {

			if (props.spread && props.width > props.spreadWidth) {
				divider.dom.style.display = "block";
			} else {
				divider.dom.style.display = "none";
			}
		});

		reader.on("flowchanged", (value) => {

			viewer.setClass(value);
		});

		reader.on("relocated", (location) => {

			if (settings.arrows === "content") {
				if (location.atStart) {
					prev.addClass("disabled");
				} else {
					prev.removeClass("disabled");
				}
				if (location.atEnd) {
					next.addClass("disabled");
				} else {
					next.removeClass("disabled");
				}
			}
		});

		reader.on("prev", () => {

			if (settings.arrows === "content") {
				prev.addClass("active");
				setTimeout(() => { prev.removeClass("active"); }, 100);
			}
		});

		reader.on("next", () => {

			if (settings.arrows === "content") {
				next.addClass("active");
				setTimeout(() => { next.removeClass("active"); }, 100);
			}
		});

		reader.on("sidebaropener", (value) => {

			overlay.dom.style.display = value ? "block" : "none";
		});

		reader.on("viewercleanup", () => {

			viewer.clear();
		});
	}
}
;// CONCATENATED MODULE: ./src/sidebar/toc.js


class TocPanel extends UIPanel {

	constructor(reader) {

		super();
		const container = new UIDiv().setClass("list-container");
		const strings = reader.strings;
		const keys = [
			"sidebar/contents"
		];
		const label = new UIText(strings.get(keys[0])).setClass("label");
		this.reader = reader;
		this.selector = undefined; // save reference to selected tree item
		this.setId("contents");
		this.add(new UIBox(label).addClass("header"));

		//-- events --//

		reader.on("bookready", () => {
			reader.book.loaded.navigation.then((toc) => {
				container.clear();
				container.add(this.generateToc(toc));
				this.add(container);
				console.log(toc);
				
			})
		});

		reader.on("languagechanged", (value) => {

			label.setValue(strings.get(keys[0]));
		});
	}

	generateToc(toc, parent) {

		const list = new UIList(parent);

		toc.forEach((chapter) => {

			const link = new UILink(chapter.href, chapter.label);
			const item = new UIItem(list).setId(chapter.id);
			const ibtn = new UISpan();

			link.dom.onclick = (e) => {

				if (this.selector && this.selector !== item)
					this.selector.unselect();

				item.select();
				this.selector = item;
				this.reader.settings.sectionId = chapter.id;
				this.reader.rendition.display(chapter.href);
				e.preventDefault();
			};
			item.add([ibtn, link]);
			this.reader.navItems[chapter.href] = {
				id: chapter.id,
				label: chapter.label
			};

			if (this.reader.settings.sectionId === chapter.id) {
				list.expand();
				item.select();
				this.selector = item;
			}

			if (chapter.subitems && chapter.subitems.length > 0) {

				const subItems = this.generateToc(chapter.subitems, item);
				ibtn.setClass("toggle-collapsed");
				ibtn.dom.onclick = () => {

					if (subItems.expanded) {
						subItems.collaps();
						ibtn.setClass("toggle-collapsed");
					} else {
						subItems.expand();
						ibtn.setClass("toggle-expanded");
					}
					return false;
				};
				item.add(subItems);
			}

			list.add(item);
		});

		return list;
	}
}
;// CONCATENATED MODULE: ./src/sidebar/bookmarks.js


class BookmarksPanel extends UIPanel {

	constructor(reader) {

		super();
		const container = new UIDiv().setClass("list-container");
		const strings = reader.strings;
		const keys = [
			"sidebar/bookmarks",
			"sidebar/bookmarks/clear"
		];
		const headerLabel = new UIText(strings.get(keys[0])).setClass("label");
		const clearBtn = new UIInput("button", strings.get(keys[1]));
		clearBtn.dom.onclick = (e) => {

			this.clearBookmarks();
			reader.emit("bookmarked", false);
			e.preventDefault();
		};
		this.add(new UIBox([headerLabel, clearBtn]).addClass("header"));
		this.selector = undefined;
		this.bookmarks = new UIList();
		container.add(this.bookmarks);
		this.setId("bookmarks");
		this.add(container);
		this.reader = reader;

		const update = () => {

			clearBtn.dom.disabled = reader.settings.bookmarks.length === 0;
		};

		//-- events --//

		reader.on("displayed", (renderer, cfg) => {

			cfg.bookmarks.forEach((cfi) => {

				this.setBookmark(cfi);
			});
			update();
		});

		reader.on("relocated", (location) => {

			this.locationCfi = location.start.cfi; // save location cfi
		});

		reader.on("bookmarked", (boolean, cfi) => {
			if (boolean) {
				this.appendBookmark();
			} else {
				this.removeBookmark(cfi);
			}
			update();
		});

		reader.on("languagechanged", (value) => {

			headerLabel.setValue(strings.get(keys[0]));
			clearBtn.setValue(strings.get(keys[1]));
		});
	}

	appendBookmark() {

		const cfi = this.locationCfi;

		if (this.reader.isBookmarked(cfi) > -1) {
			return;
		}
		this.setBookmark(cfi);
		this.reader.settings.bookmarks.push(cfi);

	}

	removeBookmark(cfi) {
		const _cfi = cfi || this.locationCfi;
		const index = this.reader.isBookmarked(_cfi);
		if (index === -1) {
			return;
		}
		this.bookmarks.remove(index);
		this.reader.settings.bookmarks.splice(index, 1);
	}

	clearBookmarks() {

		this.bookmarks.clear();
		this.reader.settings.bookmarks = [];
	}

	setBookmark(cfi) {
		const link = new UILink();
		const item = new UIItem();
		const btnr = new UISpan().setClass("btn-remove");
		const navItem = this.reader.navItemFromCfi(cfi);
		let idref;
		let label;

		if (navItem === undefined) {
			const spineItem = this.reader.book.spine.get(cfi);
			idref = spineItem.idref;
			label = spineItem.idref
		} else {
			idref = navItem.id;
			label = navItem.label;
		}

		link.setHref("#" + cfi);
		link.dom.onclick = (e) => {

			if (this.selector && this.selector !== item) {
				this.selector.unselect();
			}
			item.select();
			this.selector = item;
			this.reader.rendition.display(cfi);
			e.preventDefault();
		};
		link.setTextContent(label);

		btnr.dom.onclick = (e) => {

			this.reader.emit("bookmarked", false, cfi);
			e.preventDefault();
		};

		item.add([link, btnr]);
		item.setId(idref);
		this.bookmarks.add(item);
	}
}
;// CONCATENATED MODULE: ./src/sidebar/annotations.js


class AnnotationsPanel extends UIPanel {

	constructor(reader) {

		super();
		const container = new UIDiv().setClass("list-container");
		const strings = reader.strings;
		const keys = [
			"sidebar/annotations",
			"sidebar/annotations/clear"
		];
		const headerLabel = new UIText(strings.get(keys[0])).setClass("label");
		const clearBtn = new UIInput("button", strings.get(keys[1]));
		clearBtn.dom.onclick = (e) => {

			this.clearNotes();
			e.preventDefault();
		};
		this.add(new UIBox([headerLabel, clearBtn]).addClass("header"));
		this.selector = undefined;
		this.notes = new UIList();
		container.add(this.notes);
		this.setId("annotations");
		this.add(container);
		this.reader = reader;
		this.update = () => {

			clearBtn.dom.disabled = reader.settings.annotations.length === 0;
		};

		//-- events --//

		reader.on("navigation", (cfg) => {

			cfg.annotations.forEach((note) => {

				this.set(note);
			});
			this.update();
		});

		reader.on("noteadded", (note) => {
			this.set(note);
			this.update();
		});

		reader.on("languagechanged", (value) => {

			headerLabel.setValue(strings.get(keys[0]));
			clearBtn.setValue(strings.get(keys[1]));
		});
	}

	set(note) {

		const link = new UILink("#" + note.cfi, note.text);
		const item = new UIItem().setId("note-" + note.uuid);
		const btnr = new UISpan().setClass("btn-remove");
		const call = () => { };

		link.dom.onclick = (e) => {

			if (this.selector && this.selector !== item) {
				this.selector.unselect();
			}
			item.select();
			this.selector = item;
			this.reader.rendition.display(note.cfi);
			e.preventDefault();
		};

		btnr.dom.onclick = (e) => {

			this.removeNote(note);
			e.preventDefault();
		};

		item.add([link, btnr]);
		this.notes.add(item);
		this.reader.rendition.annotations.add(
			"highlight", note.cfi, {}, call, "note-highlight", {});
		this.update();

		const toolbarList = document.getElementById("toolbar-annotations-list");
		if (toolbarList) {
			const toolbarNoteItem = document.createElement("li");
			const toolbarNoteLink = document.createElement("a");
			toolbarNoteLink.href = "#";
			toolbarNoteLink.textContent = note.text; // sửa lại nếu cần
			toolbarNoteLink.onclick = (e) => {
				e.preventDefault();
				this.reader.rendition.display(note.cfi);
			};
			toolbarNoteItem.appendChild(toolbarNoteLink);

			const deleteBtn = document.createElement("span");
			deleteBtn.innerHTML = '<i class="bi bi-trash-fill"></i>';

			deleteBtn.onclick = (e) => {
				e.stopPropagation();
				this.reader.removeNoteFromToolbar(note);
			}
			toolbarNoteItem.appendChild(deleteBtn);
			toolbarList.appendChild(toolbarNoteItem);
		}
	}

	removeNote(note) {

		const index = this.reader.settings.annotations.indexOf(note);
		if (index === -1)
			return;

		this.notes.remove(index);
		this.reader.settings.annotations.splice(index, 1);
		this.reader.rendition.annotations.remove(note.cfi, "highlight");
		this.update();

		const toolbarList = document.getElementById("toolbar-annotations-list");
		if (toolbarList) {
			const toolbarItems = toolbarList.querySelectorAll("li");
			toolbarItems.forEach(item => {
				if (item.querySelector("a").textContent === note.text) {
					item.remove();
				}
			})
		}
	}

	clearNotes() {

		this.reader.settings.annotations.forEach(note => {
			this.reader.rendition.annotations.remove(note.cfi, "highlight");
		});
		this.notes.clear();
		this.reader.settings.annotations = [];
		this.update();
	}
}
;// CONCATENATED MODULE: ./src/sidebar/settings.js


class SettingsPanel extends UIPanel {

	constructor(reader) {

		super();
		super.setId("settings");

		const strings = reader.strings;
		const keys = [
			"sidebar/settings",
			"sidebar/settings/language",
			"sidebar/settings/fontsize",
			"sidebar/settings/flow",
			"sidebar/settings/spread",
			"sidebar/settings/spread/minwidth"
		];
		const headerLabel = new UIText(strings.get(keys[0])).setClass("label");
		this.add(new UIBox(headerLabel).addClass("header"));

		const languageLabel = new UILabel(strings.get(keys[1]), "language-ui");
		const languageRow = new UIRow();
		const language = new UISelect().setOptions({
			en: "English",
			fr: "French",
			ja: "Japanese",
			ru: "Russian",
			vi: "Vietnamese"
		});
		language.dom.onchange = (e) => {

			reader.emit("languagechanged", e.target.value);
		};
		language.setId("language-ui");
		languageRow.add(languageLabel);
		languageRow.add(language);

		const fontSizeLabel = new UILabel(strings.get(keys[2]), "fontsize");
		const fontSizeRow = new UIRow();
		const fontSize = new UINumber(16, 1);

		fontSize.dom.onchange = (e) => {
			const newSize = parseInt(e.target.value);

			if (newSize >= 8 && newSize <= 72) {
				reader.emit("styleschanged", {
					fontSize: newSize
				});
			}
		};

		fontSize.setId("fontsize");
		fontSizeRow.add(fontSizeLabel);
		fontSizeRow.add(fontSize);
		fontSize.dom.disabled = true;

		//-- flow configure --//

		const flowLabel = new UILabel(strings.get(keys[3]), "flow");
		const flowRow = new UIRow();
		const flow = new UISelect().setOptions({
			paginated: "Paginated",
			scrolled: "Scrolled"
		});
		flow.dom.onchange = (e) => {

			reader.emit("flowchanged", e.target.value);

			if (e.target.value === "scrolled") {
				reader.emit("spreadchanged", {
					mod: "none",
					min: undefined
				});
			} else {
				reader.emit("spreadchanged", {
					mod: undefined,
					min: undefined
				});
			}
		};
		flow.setId("flow");
		flowRow.add(flowLabel);
		flowRow.add(flow);

		//-- spdead configure --//

		const minSpreadWidth = new UINumber(800, 1);
		const spreadLabel = new UILabel(strings.get(keys[4]), "spread");
		const spreadRow = new UIRow();
		const spread = new UISelect().setOptions({
			none: "None",
			auto: "Auto"
		});
		spread.dom.onchange = (e) => {

			reader.emit("spreadchanged", {
				mod: e.target.value,
				min: undefined
			});
			minSpreadWidth.dom.disabled = e.target.value === "none";
		};
		spread.setId("spread");

		spreadRow.add(spreadLabel);
		spreadRow.add(spread);

		const minSpreadWidthLabel = new UILabel(strings.get(keys[5]), "min-spread-width");
		const minSpreadWidthRow = new UIRow();
		minSpreadWidth.dom.onchange = (e) => {

			reader.emit("spreadchanged", {
				mod: undefined,
				min: parseInt(e.target.value)
			});
		};
		minSpreadWidth.setId("min-spread-width");
		minSpreadWidthRow.add(minSpreadWidthLabel);
		minSpreadWidthRow.add(minSpreadWidth);

		//-- pagination --//

		const paginationStr = strings.get("sidebar/settings/pagination");
		const paginationRow = new UIRow();
		const pagination = new UIInput("checkbox", false, paginationStr[1]);
		pagination.setId("pagination");
		pagination.dom.onclick = (e) => {

			// not implemented
		};

		paginationRow.add(new UILabel(paginationStr[0], "pagination"));
		paginationRow.add(pagination);

		this.add(new UIBox([
			languageRow,
			fontSizeRow,
			flowRow,
			spreadRow,
			minSpreadWidthRow,
			//paginationRow
		]));

		//-- events --//

		reader.on("bookready", (cfg) => {

			language.setValue(cfg.language);
			fontSize.setValue(cfg.styles.fontSize);
			flow.setValue(cfg.flow);
			spread.setValue(cfg.spread.mod);
			minSpreadWidth.setValue(cfg.spread.min);
			minSpreadWidth.dom.disabled = cfg.spread.mod === "none";
		});

		reader.on("layout", (props) => {

			if (props.flow === "scrolled") {
				spread.setValue("none");
				spread.dom.disabled = true;
				minSpreadWidth.dom.disabled = true;
			} else {
				spread.dom.disabled = false;
			}
		});

		reader.on("languagechanged", (value) => {

			headerLabel.setTextContent(strings.get(keys[0]));
			languageLabel.setTextContent(strings.get(keys[1]));
			fontSizeLabel.setTextContent(strings.get(keys[2]));
			flowLabel.setTextContent(strings.get(keys[3]));
			spreadLabel.setTextContent(strings.get(keys[4]));
			minSpreadWidthLabel.setTextContent(strings.get(keys[5]));
		});
	}
}
;// CONCATENATED MODULE: ./src/sidebar/metadata.js


class MetadataPanel extends UIPanel {

	constructor(reader) {

		super();
		const container = new UIDiv().setClass("list-container");
		const strings = reader.strings;
		const labels = {};
		const key = "sidebar/metadata";
		const label = new UIText(strings.get(key)).setClass("label");
		this.add(new UIBox(label).addClass("header"));
		labels[key] = label;

		this.items = new UIList();
		this.setId("metadata");
		this.add(container);

		const init = (prop, meta) => {
			if (meta[prop] === undefined ||
				meta[prop] === null || (typeof meta[prop] === "string" && meta[prop].length === 0)) {
				return;
			}
			const item = new UIItem();
			const label = new UIText().setClass("label");
			const value = new UIText().setClass("value");
			label.setValue(strings.get(key + "/" + prop).toUpperCase());
			if (prop === "description") {
				value.dom.innerHTML = meta[prop];
			} else {
				value.setValue(meta[prop]);
			}
			labels[key + "/" + prop] = label;
			item.add([label, value]);
			this.items.add(item);
		}

		//-- events --//

		reader.on("metadata", (meta) => {

			this.items.clear();
			container.clear();
			container.add(this.items);
			document.title = meta.title;
			for (const prop in meta) {
				init(prop, meta);
			}
		});

		reader.on("languagechanged", (value) => {

			for (const prop in labels) {
				let text;
				if (prop === key) {
					text = strings.get(prop);
				} else {
					text = strings.get(prop).toUpperCase();
				}
				labels[prop].setValue(text);
			}
		});
	}
}
;// CONCATENATED MODULE: ./src/sidebar.js








class Sidebar {

	constructor(reader) {

		const strings = reader.strings;
		const controls = reader.settings;
		const keys = [
			"sidebar/close",
			"sidebar/contents",
			"sidebar/bookmarks",
			"sidebar/annotations",
			"sidebar/search",
			"sidebar/settings",
			"sidebar/metadata"
		];

		const container = new UITabbedPanel("vertical").setId("sidebar");

		const openerBox = new UIDiv().setId("btn-p").addClass("box");
		const openerBtn = new UIInput("button");
		openerBtn.setTitle(strings.get(keys[0]));
		openerBtn.dom.onclick = (e) => {

			reader.emit("sidebaropener", false);
			e.preventDefault();
			openerBtn.dom.blur();
		};
		openerBox.add(openerBtn);
		container.addMenu(openerBox);

		container.addTab("btn-t", strings.get(keys[1]), new TocPanel(reader));
		if (controls.bookmarks) {
			const bookmarkPanel = new BookmarksPanel(reader);
			container.addTab("btn-d", strings.get(keys[2]), bookmarkPanel);
			reader.bookmarksPanel = bookmarkPanel;
		}
		if (controls.annotations) {
			const annotationPanel = new AnnotationsPanel(reader);
			container.addTab("btn-a", strings.get(keys[3]), annotationPanel);
			reader.annotationsPanel = annotationPanel;
		}

		container.addTab("btn-s", strings.get(keys[4]), new SearchPanel(reader));
		container.addTab("btn-c", strings.get(keys[5]), new SettingsPanel(reader));
		container.addTab("btn-i", strings.get(keys[6]), new MetadataPanel(reader));
		container.select("btn-t");

		document.body.appendChild(container.dom);

		//-- events --//

		reader.on("sidebaropener", (value) => {

			if (value) {
				container.setClass("open");
			} else {
				container.removeAttribute("class");
			}
		});

		reader.on("languagechanged", (value) => {

			openerBtn.setTitle(strings.get(keys[0]));
			container.setLabel("btn-t", strings.get(keys[1]));
			if (controls.bookmarks) {
				container.setLabel("btn-d", strings.get(keys[2]));
			}
			if (controls.annotations) {
				container.setLabel("btn-a", strings.get(keys[3]));
			}
			container.setLabel("btn-s", strings.get(keys[4]));
			container.setLabel("btn-c", strings.get(keys[5]));
			container.setLabel("btn-i", strings.get(keys[6]));
		});
	}
}
;// CONCATENATED MODULE: ./src/notedlg.js



class NoteDlg {

    constructor(reader) {

        const container = new UIDiv().setId("notedlg");
        const strings = reader.strings;
        const keys = [
            "notedlg/label",
            "notedlg/add"
        ];
        const label = new UILabel(strings.get(keys[0]), "note-input");
        const textBox = new UIInput("text", "").setId("note-input");
        textBox.dom.oninput = (e) => {

            this.update();
            e.preventDefault();
        };

        const addBtn = new UIInput("button", strings.get(keys[1]));
        addBtn.dom.disabled = true;
        addBtn.dom.onclick = (e) => {

            const note = {
                cfi: this.cfi,
                date: new Date(),
                text: textBox.getValue(),
                uuid: uuid()
            };
            this.range = undefined;
            reader.settings.annotations.push(note);
            reader.emit("noteadded", note);
            container.removeAttribute("class");
            e.preventDefault();
            addBtn.dom.blur();
        };

        this.update = () => {

            addBtn.dom.disabled = !(this.range && textBox.getValue().length > 0);
        };

        container.add(new UIBox([label, textBox, addBtn]).addClass("control"));
        document.body.appendChild(container.dom);

        //-- events --//

        reader.on("selected", (cfi, contents) => {

            this.cfi = cfi;
            this.range = contents.range(cfi);
            this.update();
            container.setClass("open");
            textBox.setValue("");
        });

        reader.on("unselected", () => {

            this.range = undefined;
            this.update();
            container.removeAttribute("class");
        });

        reader.on("languagechanged", (value) => {

            label.setTextContent(strings.get(keys[0]));
            addBtn.setValue(strings.get(keys[1]));
        });
    }
}
;// CONCATENATED MODULE: ./src/status.js


class Status {
    constructor(reader) {
        const strings = reader.strings;
        const settings = reader.settings;

        const container = new UIDiv().setId("status-bar");
        const keys = [
            "status/fullscreen",
            "status/apprec",
        ];

        /* ---------------------------- Status Bar ----------------------------- */
        const leftText = new UIDiv().setClass("status-title");
        const rightAction = new UIDiv().setClass("status-action");

        let text = new UILabel().setClass("status-text").setTextContent("Trang cuối của chương");
        leftText.add(text);


        // Button apps rectangle
        let appRecBtn;
        const appRecBox = new UIDiv().setId("btn-ar").setClass("box");
        appRecBtn = new UIInput("button");
        appRecBtn.setTitle(strings.get(keys[1]));

        appRecBtn.dom.onclick = (e) => {
            e.preventDefault();
            toggleBookList();
        };

        appRecBox.add(appRecBtn);
        rightAction.add(appRecBox);

        function toggleBookList() {
            const bookList = [
                { title: "Determined", author: "Robert M. Sapolsky", page: 1 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 2 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 3 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 4 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 5 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 6 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 7 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 8 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 9 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 10 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 11 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 12 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 13 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 14 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 15 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 16 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 17 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 18 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 19 },
                { title: "Determined", author: "Robert M. Sapolsky", page: 20 },
            ];

            let existingModal = document.getElementById('book-list-modal');
            if (!existingModal) {
                let modal = document.createElement('div');
                modal.setAttribute('id', 'book-list-modal');
                modal.setAttribute('class', 'book-modal');

                let modalContent = document.createElement('div');
                modalContent.setAttribute('class', 'book-modal-content');

                let bookGrid = document.createElement('div');
                bookGrid.setAttribute('class', 'book-grid');
                bookList.forEach((book) => {
                    let bookItem = document.createElement('div');
                    bookItem.setAttribute('class', 'book-item');
                    bookItem.innerHTML = `
                        <div class="book-info">
                            <p class="book-title">${book.title}</p>
                            <p class="book-author">${book.author}</p>
                        </div>
                        <div class="book-cover">${book.page}</div>
                    `;
                    bookGrid.appendChild(bookItem);
                });

                modalContent.appendChild(bookGrid);
                modal.appendChild(modalContent);

                container.dom.appendChild(modal);
            }

            let modal = document.getElementById('book-list-modal');
            modal.classList.toggle("active");
        }


        // Button Full Screen
        let fullscreenBtn;
        if (settings.fullscreen) {

            const fullscreenBox = new UIDiv().setId("btn-f").setClass("box");
            fullscreenBtn = new UIInput("button");
            fullscreenBtn.setTitle(strings.get(keys[0]));
            fullscreenBtn.dom.onclick = (e) => {

                this.toggleFullScreen();
                e.preventDefault();
            };

            document.onkeydown = (e) => {

                if (e.key === "F11") {
                    e.preventDefault();
                    this.toggleFullScreen();
                }
            };

            document.onfullscreenchange = (e) => {

                // const w = window.screen.width === e.target.clientWidth;
                // const h = window.screen.height === e.target.clientHeight;

                if (document.fullscreenElement) {
                    fullscreenBox.addClass("resize-small");
                } else {
                    fullscreenBox.removeClass("resize-small");
                }
            };


            fullscreenBox.add(fullscreenBtn);
            rightAction.add(fullscreenBox);
        }

        reader.on("languagechanged", (value) => {
            if (settings.fullscreen) {
                fullscreenBtn.setTitle(strings.get(keys[0]));
            }
        });


        container.add([leftText, rightAction]);
        document.body.appendChild(container.dom);
    }

    toggleFullScreen() {

        document.activeElement.blur();

        if (document.fullscreenElement === null) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

;// CONCATENATED MODULE: ./src/reader.js











class Reader {

	constructor(bookPath, settings) {

		const preinit = (data) => {
			const url = new URL(window.location);
			let path = bookPath;
			if (settings && !settings.openbook) {
				path = bookPath;
				if (data) this.storage.clear();
			} else if (data && url.search.length === 0) {
				path = data;
			}
			this.cfgInit(path, settings);
			this.strings = new Strings(this);
			this.toolbar = new Toolbar(this);
			this.content = new Content(this);
			this.status = new Status(this);
			this.sidebar = new Sidebar(this);
			if (this.settings.annotations) {
				this.notedlg = new NoteDlg(this);
			}
			this.init();
		}

		this.settings = undefined;
		this.isMobile = detectMobile();
		this.storage = new Storage();
		const openbook = settings && settings.openbook;

		if (this.storage.indexedDB && (!settings || openbook)) {
			this.storage.init(() => this.storage.get((data) => preinit(data)));
		} else {
			preinit();
		}

		window.onbeforeunload = this.unload.bind(this);
		window.onhashchange = this.hashChanged.bind(this);
		window.onkeydown = this.keyboardHandler.bind(this);
		window.onwheel = (e) => {
			if (e.ctrlKey) {
				e.preventDefault();
			}
		};
	}

	/**
	 * Initialize book.
	 * @param {*} bookPath
	 * @param {*} settings
	 */
	init(bookPath, settings) {

		this.emit("viewercleanup");
		this.navItems = {};

		if (arguments.length > 0) {

			this.cfgInit(bookPath, settings);
		}

		this.book = ePub(this.settings.bookPath);
		this.rendition = this.book.renderTo("viewer", {
			manager: this.settings.manager,
			flow: this.settings.flow,
			spread: this.settings.spread.mod,
			minSpreadWidth: this.settings.spread.min,
			width: "100%",
			height: "100%",
			snap: true
		});

		const cfi = this.settings.previousLocationCfi;
		if (cfi) {
			this.displayed = this.rendition.display(cfi);
		} else {
			this.displayed = this.rendition.display();
		}

		this.displayed.then((renderer) => {
			this.emit("displayed", renderer, this.settings);
		});

		this.book.ready.then(() => {
			this.emit("bookready", this.settings);
		}).then(() => {
			this.emit("bookloaded");
		});

		this.book.loaded.metadata.then((meta) => {
			this.emit("metadata", meta);
		});

		this.book.loaded.navigation.then((toc) => {
			this.emit("bookready", toc);
		});

		this.rendition.on("click", (e) => {
			const selection = e.view.document.getSelection();
			if (selection.type !== "Range") {
				this.emit("unselected");
			}
		});

		this.rendition.on("layout", (props) => {
			this.emit("layout", props);
		});

		this.rendition.on("selected", (cfiRange, contents) => {
			this.setLocation(cfiRange);
			this.emit("selected", cfiRange, contents);
		});

		this.rendition.on("relocated", (location) => {
			this.setLocation(location.start.cfi);
			this.emit("relocated", location);
		});

		this.rendition.on("keydown", this.keyboardHandler.bind(this));

		this.on("prev", () => {
			if (this.book.package.metadata.direction === "rtl") {
				this.rendition.next();
			} else {
				this.rendition.prev();
			}
		});

		this.on("next", () => {
			if (this.book.package.metadata.direction === "rtl") {
				this.rendition.prev();
			} else {
				this.rendition.next();
			}
		});

		this.on("languagechanged", (value) => {
			this.settings.language = value;
		});

		this.on("flowchanged", (value) => {
			this.settings.flow = value;
			this.rendition.flow(value);
		});

		this.on("spreadchanged", (value) => {
			const mod = value.mod || this.settings.spread.mod;
			const min = value.min || this.settings.spread.min;
			this.settings.spread.mod = mod;
			this.settings.spread.min = min;
			this.rendition.spread(mod, min);
		});

		this.on("styleschanged", (value) => {
			const fontSize = value.fontSize;
			this.settings.styles.fontSize = fontSize;
			this.rendition.themes.fontSize(fontSize + "px");
		});
	}

	/* ------------------------------- Common ------------------------------- */

	navItemFromCfi(cfi) {

		// This feature was added to solve the problem of duplicate titles in 
		// bookmarks. But this still has no solution because when reloading the 
		// reader, rendition cannot get the range from the previously saved CFI.
		const range = this.rendition.getRange(cfi);
		const idref = range ? range.startContainer.parentNode.id : undefined;
		const location = this.rendition.currentLocation();
		const href = location.start.href;
		return this.navItems[href + "#" + idref] || this.navItems[href];
	}

	/* ------------------------------ Bookmarks ----------------------------- */

	/**
	 * Verifying the current page in bookmarks.
	 * @param {*} cfi
	 * @returns The index of the bookmark if it exists, or -1 otherwise.
	 */
	isBookmarked(cfi) {
		return this.settings.bookmarks.indexOf(cfi);
	}

	/* ----------------------------- Annotations ---------------------------- */

	isAnnotated(note) {

		return this.settings.annotations.indexOf(note);
	}

	/* ------------------------------ Settings ------------------------------ */

	/**
	 * Initialize book settings.
	 * @param {any} bookPath
	 * @param {any} settings
	 */
	cfgInit(bookPath, settings) {

		this.entryKey = md5(bookPath).toString();
		this.settings = {
			bookPath: bookPath,
			arrows: this.isMobile ? "none" : "content", // none | content | toolbar
			manager: this.isMobile ? "continuous" : "default",
			restore: true,
			history: true,
			openbook: this.storage.indexedDB ? true : false,
			language: "en",
			sectionId: undefined,
			bookmarks: [],   // array | false
			annotations: [], // array | false
			flow: "paginated", // paginated | scrolled
			spread: {
				mod: "auto", // auto | none
				min: 800
			},
			styles: {
				fontSize: 16	// Default fontsize by 'px'
			},
			pagination: undefined, // not implemented
			fullscreen: document.fullscreenEnabled,
			background: [],	// Setting for change background "viewer"
		};

		extend(settings || {}, this.settings);

		if (this.settings.restore) {
			this.applySavedSettings(settings || {});
		} else {
			this.removeSavedSettings();
		}
	}

	/**
	 * Checks if the book setting can be retrieved from localStorage.
	 * @returns true if the book key exists, or false otherwise.
	 */
	isSaved() {

		return localStorage && localStorage.getItem(this.entryKey) !== null;
	}

	/**
	 * Removing the current book settings from local storage.
	 * @returns true if the book settings were deleted successfully, or false
	 * otherwise.
	 */
	removeSavedSettings() {

		if (!this.isSaved())
			return false;

		localStorage.removeItem(this.entryKey);
		return true;
	}

	/**
	 * Applies saved settings from local storage.
	 * @param {*} external External settings
	 * @returns True if the settings were applied successfully, false otherwise.
	 */
	applySavedSettings(external) {

		if (!this.isSaved())
			return false;

		let stored;
		try {
			stored = JSON.parse(localStorage.getItem(this.entryKey));
		} catch (e) {
			console.exception(e);
		}

		if (stored) {
			extend(stored, this.settings, external);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Saving the current book settings in local storage.
	 */
	saveSettings() {

		this.settings.previousLocationCfi = this.rendition.location.start.cfi;
		const cfg = Object.assign({}, this.settings);
		delete cfg.arrows;
		delete cfg.manager;
		delete cfg.history;
		delete cfg.restore;
		delete cfg.openbook;
		delete cfg.pagination;
		delete cfg.fullscreen;
		delete cfg.background;
		localStorage.setItem(this.entryKey, JSON.stringify(cfg));
	}

	setLocation(cfi) {

		const baseUrl = this.book.archived ? undefined : this.book.url;
		const url = new URL(window.location, baseUrl);
		url.hash = "#" + cfi;

		// Update the History Location
		if (this.settings.history && window.location.hash !== url.hash) {
			// Add CFI fragment to the history
			window.history.pushState({}, "", url);
			this.currentLocationCfi = cfi;
		}
	}

	//-- event handlers --//

	unload() {

		if (this.settings.restore && localStorage) {
			this.saveSettings();
		}
	}

	hashChanged() {

		const hash = window.location.hash.slice(1);
		this.rendition.display(hash);
	}

	keyboardHandler(e) {

		const step = 1;
		let value = this.settings.styles.fontSize;

		switch (e.key) {

			case "=":
			case "+":
				value += step;
				this.emit("styleschanged", { fontSize: value });
				break;
			case "-":
				value -= step;
				this.emit("styleschanged", { fontSize: value });
				break;
			case "0":
				value = 16;
				this.emit("styleschanged", { fontSize: value });
				break;
			case "ArrowLeft":
				this.emit("prev");
				break;
			case "ArrowRight":
				this.emit("next");
				break;
		}
	}
}

event_emitter(Reader.prototype);
var __webpack_exports__Reader = __webpack_exports__.Reader;
export { __webpack_exports__Reader as Reader };

//# sourceMappingURL=epubreader.js.map