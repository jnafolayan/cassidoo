/**
 * @template T
 * @typedef {T|null} Nullable<T>
 */

/**
 * @typedef {object} RetObj
 * @property {Nullable<string>} title
 * @property {Nullable<string>} source
 */

getRSS("https://feed.syntax.fm/")
    .then(prettyPrint)
    .catch((err) => console.log(err.message));

/**
 * @param {RetObj} retObj
 */
function prettyPrint(retObj) {
    console.log(`${retObj.title}, ${retObj.source}`);
}

/**
 * @param {string} url
 * @returns {Promise<RetObj>}
 */
function getRSS(url) {
    /**
     * @type {RetObj}
     */
    const retObj = { title: null, source: null };

    return fetch(url, { mode: "cors" })
        .then(toTextResponse)
        .then(maybeParseXML)
        .then(getFeedTitle(retObj))
        .then(getFeedSource(retObj))
        .then(() => retObj);
}

/**
 * @param {RetObj} out
 * @returns {(Document) => Document}
 */
function getFeedSource(out) {
    return (xmlDoc) => {
        out.source =
            getFirstNonEmpty(xmlDoc, "channel > link")?.textContent ?? null;
        return xmlDoc;
    };
}

/**
 * @param {RetObj} out
 * @returns {(Document) => Document}
 */
function getFeedTitle(out) {
    return (xmlDoc) => {
        out.title =
            getFirstNonEmpty(xmlDoc, "channel > title")?.textContent ?? null;
        return xmlDoc;
    };
}

/**
 * @param {string} text
 * @returns {Document}
 */
function maybeParseXML(text) {
    return new DOMParser().parseFromString(text, "text/xml");
}

/**
 * @param {Response} res
 * @returns {string}
 */
function toTextResponse(res) {
    return res.text();
}

/**
 * @param {Document} xmlDoc
 * @param {string} selector
 * @returns {Element | undefined}
 */
function getFirstNonEmpty(xmlDoc, selector) {
    const nodes = xmlDoc.querySelectorAll(selector);
    return Array.from(nodes).find((node) => node.textContent.trim() != "");
}
