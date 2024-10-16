const svgTemplate = `<svg width='{{width}}' height='{{height}}'><circle cx='{{cx}}' cy='{{cy}}' r='{{radius}}' fill='{{color}}'/></svg>`;

console.log(generateCircle(50, [100, 100], "blue"));
console.log(generateCircle(30, [75, 50], "red"));

/**
 * @param {number} radius circle radius
 * @param {[number, number]} center position tuple
 * @param {string} color valid html color string
 * @returns SVG string
 */
function generateCircle(radius, center, color) {
    return renderTemplate(svgTemplate, {
        color,
        radius,
        cx: center[0],
        cy: center[1],
        width: radius * 2 + center[0],
        height: radius * 2 + center[1],
    });
}

/**
 * @param {string} template template string to be hydrated with data
 * @param {Record<string, any>} replacements map of variables and values to use
 * @returns template string after making replacements
 */
function renderTemplate(template, replacements) {
    return Object.keys(replacements).reduce((output, variable) => {
        return output.replaceAll(`{{${variable}}}`, replacements[variable]);
    }, template);
}
