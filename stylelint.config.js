// eslint-disable-next-line import/no-extraneous-dependencies
const { rules: { 'order/properties-order': recessOrder } } = require('stylelint-config-recess-order');

const recessOrderWithEmptyLinesBetween = recessOrder.map((block) => ({
    ...block,
    emptyLineBefore: 'always',
}));

module.exports = {
    extends: [
        'stylelint-config-recommended-scss',
        'stylelint-config-sass-guidelines',
        'stylelint-config-recess-order',
    ],
    rules: {
        indentation: [4, { baseIndentLevel: 0 }],
        'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['v-deep'] }],
        'max-nesting-depth': [2, { ignoreAtRules: ['each', 'media', 'supports', 'include'] }],
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['export'] }],
        'selector-class-pattern': null,
        'no-empty-source': null,
        'order/properties-alphabetical-order': null,
        'order/properties-order': recessOrderWithEmptyLinesBetween,
    },
};
