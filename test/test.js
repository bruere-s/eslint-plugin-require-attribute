const { RuleTester } = require('eslint')
const requireMixpanel = require('../require-mixpanel.js')
const ruleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: { ecmaVersion: 2015 }
})
ruleTester.run('require-mixpanel', requireMixpanel, {
    valid: [
        {
            code: '<template><button mixpanelEventName="toto">Click me!</button></template>',
        },
        {
            code: '<template><button :mixpanelEventName="toto">Click me!</button></template>',
        }
    ],
    invalid: [
        {
            code: '<template><button>Click me!</button></template>',
            errors: [
                {
                    message: 'Missing "mixpanelEventName" attribute in <button>',
                    type: 'VElement',
                },
            ],
        },
    ],
})