var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var FormLane;
(function (FormLane) {
    var FormLaneSetting = (function () {
        function FormLaneSetting(apiKey, serverUri) {
            this.apiKey = apiKey;
            this.serverUri = serverUri;
        }
        return FormLaneSetting;
    }());
    FormLane.FormLaneSetting = FormLaneSetting;
    var FormLaneWidget = (function () {
        function FormLaneWidget(formLaneSetting) {
            this._version = '1.0.0.7';
            this._isVisible = false;
            this.formLaneSetting = null;
            this.formLaneSetting = formLaneSetting;
        }
        Object.defineProperty(FormLaneWidget.prototype, "isVisible", {
            get: function () {
                return this._isVisible;
            },
            enumerable: false,
            configurable: true
        });
        FormLaneWidget.prototype.processData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var nodes, articlesCall, _loop_1, this_1, i, state_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (document == null || document.body == null) {
                                return [2];
                            }
                            nodes = document.querySelectorAll('[data-spotlane-site-id]');
                            articlesCall = this.memoizePromiseFn(this.getArticles);
                            _loop_1 = function (i) {
                                var node, siteId, articleId, articleFilterName, articleFilterValue, articleSortKey, articleSortDirection, articles, filteredList, template, sorted, i_1;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            node = nodes[i];
                                            siteId = node.dataset.spotlaneSiteId;
                                            articleId = node.dataset.spotlaneArticleId;
                                            articleFilterName = node.dataset.spotlaneFilterName;
                                            articleFilterValue = node.dataset.spotlaneFilterValue;
                                            articleSortKey = node.dataset.spotlaneArticleSortKey;
                                            articleSortDirection = node.dataset.spotlaneArticleSortDirection;
                                            if (siteId === undefined) {
                                                return [2, { value: void 0 }];
                                            }
                                            if (articleSortDirection != 'asc' && articleSortDirection != 'desc') {
                                                articleSortDirection = 'asc';
                                            }
                                            return [4, articlesCall(siteId, articleId)];
                                        case 1:
                                            articles = _b.sent();
                                            if (articles === undefined || articles === null) {
                                                return [2, { value: void 0 }];
                                            }
                                            if (!this_1.isNullOrEmpty(articleFilterName) && !this_1.isNullOrEmpty(articleFilterValue)) {
                                                filteredList = articles.reduce(function (acc, innerList) {
                                                    var filteredInnerList = innerList.filter(function (jsonItem) { return jsonItem.key === articleFilterName && jsonItem.value === articleFilterValue; });
                                                    if (filteredInnerList.length > 0) {
                                                        acc.push(innerList);
                                                    }
                                                    return acc;
                                                }, []);
                                                articles = filteredList;
                                            }
                                            template = node.cloneNode(true);
                                            sorted = false;
                                            if (articleSortKey != null) {
                                                articles.sort(function (a, b) {
                                                    var keyAString = a.find(function (item) { return item.key === articleSortKey; }).value;
                                                    var keyBString = b.find(function (item) { return item.key === articleSortKey; }).value;
                                                    var keyA = parseInt(keyAString);
                                                    var keyB = parseInt(keyBString);
                                                    if (articleSortDirection === 'asc') {
                                                        if (keyB < keyA) {
                                                            return -1;
                                                        }
                                                        else if (keyB > keyA) {
                                                            return 1;
                                                        }
                                                        else {
                                                            return 0;
                                                        }
                                                    }
                                                    else {
                                                        if (keyA < keyB) {
                                                            return -1;
                                                        }
                                                        else if (keyA > keyB) {
                                                            return 1;
                                                        }
                                                        else {
                                                            return 0;
                                                        }
                                                    }
                                                });
                                                sorted = true;
                                            }
                                            if (!sorted) {
                                                articles = articles.slice(0).reverse();
                                            }
                                            for (i_1 = 0; i_1 < articles.length; i_1++) {
                                                this_1.processArticle(articles[i_1], template, node);
                                            }
                                            node.parentNode.removeChild(node.parentNode.firstElementChild);
                                            return [2];
                                    }
                                });
                            };
                            this_1 = this;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < nodes.length)) return [3, 4];
                            return [5, _loop_1(i)];
                        case 2:
                            state_1 = _a.sent();
                            if (typeof state_1 === "object")
                                return [2, state_1.value];
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3, 1];
                        case 4:
                            ;
                            return [2];
                    }
                });
            });
        };
        FormLaneWidget.prototype.processArticle = function (articleKeyValues, template, element) {
            var articleDiv = template.cloneNode(true);
            for (var j = 0; j < articleKeyValues.length; j++) {
                var articleKeyValue = articleKeyValues[j];
                var targetNodes = articleDiv.querySelectorAll('[data-spotlane-article-key-name]');
                for (var i = 0; i < targetNodes.length; i++) {
                    this.processDataAttributes(articleKeyValues, articleKeyValue, targetNodes[i]);
                }
                this.processDataAttributes(articleKeyValues, articleKeyValue, articleDiv);
            }
            ;
            element.after(articleDiv);
        };
        FormLaneWidget.prototype.processDataAttributes = function (articleKeyValues, articleKeyValue, targetNode) {
            var _this = this;
            if (targetNode.dataset === undefined) {
                return;
            }
            var articleKeyName = targetNode.dataset.spotlaneArticleKeyName;
            var isJson = this.isValidJSON(articleKeyName);
            if (!isJson) {
                if (!articleKeyName || articleKeyName !== articleKeyValue.key) {
                    return;
                }
            }
            var articleFormat = targetNode.dataset.spotlaneArticleFormat;
            var textOnly = document.createElement('div');
            textOnly.innerHTML = articleKeyValue.value;
            switch (articleFormat) {
                case null || undefined:
                default:
                    {
                        targetNode.innerHTML = textOnly.innerText;
                        break;
                    }
                case "html":
                    {
                        targetNode.innerHTML = articleKeyValue.value;
                        break;
                    }
                case "image":
                    {
                        targetNode.innerHTML = textOnly.innerText;
                        targetNode.src = articleKeyValue.value;
                        var hdImage = articleKeyValues.find(function (a) { return a.key === articleKeyValue.key + '-HD'; });
                        if (hdImage) {
                            targetNode.src = hdImage.value;
                        }
                        break;
                    }
                case "class":
                    {
                        if (articleKeyValue.value) {
                            var classList = articleKeyValue.value.split(" ");
                            classList.forEach(function (className) {
                                if (_this.isNullOrEmpty(className)) {
                                    return;
                                }
                                targetNode.classList.add(className);
                            });
                        }
                        break;
                    }
                case "link":
                    {
                        targetNode.innerHTML = textOnly.innerText;
                        var dataAttributeValue_1 = targetNode.dataset.spotlaneArticleHrefName;
                        if (dataAttributeValue_1 != null) {
                            var keyValue = articleKeyValues.find(function (akv) { return akv.key == dataAttributeValue_1; });
                            if (keyValue != null && !this.isNullOrEmpty(keyValue.value)) {
                                targetNode.href = keyValue.value;
                            }
                        }
                        dataAttributeValue_1 = targetNode.dataset.spotlaneArticlePlaceholderName;
                        if (dataAttributeValue_1 != null) {
                            var keyValue = articleKeyValues.find(function (akv) { return akv.key == dataAttributeValue_1; });
                            if (keyValue != null) {
                                targetNode.title = keyValue.value;
                            }
                        }
                        dataAttributeValue_1 = targetNode.dataset.spotlaneArticleTargetName;
                        if (dataAttributeValue_1 != null) {
                            var keyValue = articleKeyValues.find(function (akv) { return akv.key == dataAttributeValue_1; });
                            if (keyValue != null) {
                                targetNode.target = keyValue.value;
                            }
                        }
                        break;
                    }
                case "attr":
                    {
                        if (articleKeyName != null && isJson) {
                            var json_1 = JSON.parse(articleKeyName);
                            var jsonKeyValues_1 = Object.keys(json_1).map(function (key) { return [key, json_1[key]]; });
                            if (jsonKeyValues_1 != null) {
                                var _loop_2 = function (i) {
                                    var keyValue = articleKeyValues.find(function (akv) { return akv.key == jsonKeyValues_1[i][1]; });
                                    if (keyValue != null && !this_2.isNullOrEmpty(keyValue.value)) {
                                        if (keyValue.value == null) {
                                            return { value: void 0 };
                                        }
                                        console.log(json_1);
                                        var existingAttribute = targetNode.getAttribute(jsonKeyValues_1[i][0]);
                                        var newAttributeValue = keyValue.value;
                                        if (existingAttribute != null) {
                                            newAttributeValue = existingAttribute + newAttributeValue;
                                        }
                                        targetNode.setAttribute(jsonKeyValues_1[i][0], newAttributeValue);
                                    }
                                };
                                var this_2 = this;
                                for (var i = 0; i < jsonKeyValues_1.length; i++) {
                                    var state_2 = _loop_2(i);
                                    if (typeof state_2 === "object")
                                        return state_2.value;
                                }
                            }
                        }
                        break;
                    }
            }
        };
        FormLaneWidget.prototype.getArticles = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                var res, payload, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4, fetch(url)];
                        case 1:
                            res = _a.sent();
                            return [4, res.json()];
                        case 2:
                            payload = _a.sent();
                            return [2, payload];
                        case 3:
                            error_1 = _a.sent();
                            console.log(error_1);
                            return [3, 4];
                        case 4: return [2];
                    }
                });
            });
        };
        FormLaneWidget.prototype.isNullOrEmpty = function (text) {
            return text === undefined || text === null || text.match(/^ *$/) !== null;
        };
        FormLaneWidget.prototype.memoizePromiseFn = function (fn) {
            var _this = this;
            var cache = new Map();
            return function (siteId, articleId) {
                var url = _this.formLaneSetting.serverUri + "/api/v1/FormEntries/KeyValues/" + siteId;
                if (articleId != null) {
                    url += '/' + articleId;
                }
                url += '?apiKey=' + _this.formLaneSetting.apiKey;
                url += '&culture=' + navigator.language || navigator.languages[0];
                if (cache.has(url)) {
                    return cache.get(url);
                }
                cache.set(url, fn(url).catch(function (error) {
                    cache.delete(url);
                    return Promise.reject(error);
                }));
                return cache.get(url);
            };
        };
        ;
        FormLaneWidget.prototype.isValidJSON = function (jsonString) {
            try {
                JSON.parse(jsonString);
                return true;
            }
            catch (error) {
                return false;
            }
        };
        return FormLaneWidget;
    }());
    FormLane.FormLaneWidget = FormLaneWidget;
})(FormLane || (FormLane = {}));
//# sourceMappingURL=formlane-widget.js.map