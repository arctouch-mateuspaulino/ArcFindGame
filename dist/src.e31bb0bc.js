// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
var submitInput = document.querySelector(".input__submit");
var listItem = document.querySelectorAll(".list__column .item__answer .p__text");
var icon = document.querySelectorAll(".list__column .item__answer i");
var message = document.querySelector(".modal__information h4");
var inputs = document.querySelector(".form__input");
var scoreGame = document.querySelector(".footer__score-game span");
var showWord = document.querySelectorAll(".item__answer .span_answer");
var setMessageTips = document.querySelector(".section__message");
var flagTime = true;
var foundIsTrue = false;
var subWordFound = false;
var counterGameScore = 0;
var duration = 300;
var count;
var timer = duration,
    min,
    sec;
var wordsFound = [];
var wordList = [];
var InputValue;
var currentPercent;
var validateWordsSimiliarity = false;
listItem.forEach(function (item, i) {
  wordList.push(item.innerHTML);
});
var validateWrongAnswer = false;

document.onkeyup = function (Key) {
  if (Key.which == 13) {
    submit();
  }
};

var isTrue = false;
submitInput.addEventListener("click", submit);

function submit() {
  var keyword = document.getElementById("input__text").value;
  wordsSimiliarity(keyword, wordList);
  listItem.forEach(function (item, i) {
    if (keyword.toUpperCase() == item.innerHTML.toUpperCase()) {
      validateWrongAnswer = verifyWordsFound(item, showWord[i], icon[i]);
    }
  });

  if (!keyword == "") {
    if (validateWrongAnswer == false) {
      inputs.className = "form__input wrong-answer";
    }

    setTimeout(function () {
      inputs.className = "form__input";
    }, 1000);
    startTimer();
    CleanInput();
  }
}

var highestPercentage = 0;

function wordsSimiliarity(typedWord, wordList) {
  function verify(typedWord, wordListItem) {
    var wordRight = 0;
    var minLength;
    typedWord.length > wordListItem.length ? minLength = wordListItem.length : minLength = typedWord.length;
    typedWord.length < wordListItem.length ? maxLength = wordListItem.length : maxLength = typedWord.length;

    for (var i = 0; i < minLength; i++) {
      if (typedWord[i] == wordListItem[i]) {
        wordRight++;
      }
    }

    var percent = wordRight / maxLength * 100;

    if (percent > highestPercentage) {
      highestPercentage = percent;
    }

    setMessageTips.style.display = "block";

    if (highestPercentage == 100) {
      setMessageTips.innerHTML = "Congratulations! you're right";
      return isTrue = true;
    } else if (highestPercentage > 70 && highestPercentage < 95) {
      setMessageTips.innerHTML = "You're close to getting it right";
      return isTrue = false;
    } else if (highestPercentage > 50 && highestPercentage < 70) {
      setMessageTips.innerHTML = "Almost there";
      return isTrue = false;
    } else {
      setMessageTips.innerHTML = "You missed";
      return isTrue = false;
    }
  }

  wordList.forEach(function (wordListItem) {
    verify(typedWord.toUpperCase(), wordListItem.toUpperCase());
  });
  highestPercentage = 0;
}

function verifyWordsFound(words, showWordSpan, i) {
  if (!wordsFound.includes(words.innerHTML)) {
    words.style.visibility = "visible";
    words.parentElement.classList.remove("not-selected");
    getPosition(words.parentElement);
    i.style.visibility = "visible";
    showWordSpan.innerHTML = words.innerHTML;
    counterGameScore++;
    scoreGame.innerHTML = counterGameScore;
    wordsFound.push(words.innerHTML);

    if (counterGameScore == 20) {
      showModal();
      clearInterval(count);
    }

    return true;
  }

  return false;
}

var gameSection = document.querySelector(".game__section");

function getPosition(wordParentElement) {
  positionWord = wordParentElement.parentElement.getBoundingClientRect();
  gameSection.scrollTo(0, positionWord.top);
}

function startTimer() {
  if (flagTime == true) {
    var counter = document.querySelector(".footer__timer-text");
    count = setInterval(function () {
      counter.innerHTML = allGameTime(timer);
      timer--;
      timePlayer(timer);

      if (timer < 0) {
        clearInterval(count);
        showModal();
      }
    }, 1000);
    flagTime = false;
  }
}

function timePlayer(timer) {
  var gameTimePlayer = 299 - timer;
  allGameTime(gameTimePlayer);
}

function allGameTime(timer) {
  min = parseInt(timer / 60);
  sec = parseInt(timer % 60);
  return timePlayed = "".concat(("0" + min).slice(-2), ":").concat(("0" + sec).slice(-2));
} //Tooltip Functions


var liItem = document.querySelectorAll(".item__answer");
liItem.forEach(function (d, i) {
  d.addEventListener("mouseover", function () {
    this.querySelector(".p__tooltip").style.display = "inline-table";
  });
});
liItem.forEach(function (d, i) {
  d.addEventListener("mouseout", function () {
    this.querySelector(".p__tooltip").style.display = "none";
  });
}); //Modal Functions

function showModal() {
  var modalElement = document.querySelector(".modal__endgame");
  var score = document.querySelector(".span__score");
  var time = document.querySelector(".p__time");
  var scoreTime = document.querySelector(".span__time");
  modalElement.style.display = "flex";
  timer < 0 ? time.innerHTML = "Time's out" : scoreTime.innerHTML = timePlayed;
  score.innerHTML = counterGameScore;
  setMessage(counterGameScore);
}

var iconCloseModal = document.querySelector(".fa-times");
iconCloseModal.addEventListener("click", function () {
  var modalElement = document.querySelector(".modal__endgame");
  modalElement.style.display = "none";
  window.location.replace('index.html');
});
var resetButton = document.querySelector(".footer__button");
resetButton.addEventListener("click", function () {
  window.location.replace('index.html');
});

var CleanInput = function CleanInput() {
  return document.getElementById("input__text").value = "";
};

function setMessage(score) {
  score <= 5 ? message.innerHTML = "You can do better!" : score > 5 && score <= 10 ? message.innerHTML = "You're getting better, try again." : score > 10 && score <= 15 ? message.innerHTML = "You're near to the victory." : score < 15 ? message.innerHTML = "Congratulations on getting all the keywords right" : message.innerHTML = "Congratulations";
}
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49512" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map