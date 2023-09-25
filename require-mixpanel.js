'use strict'

const utils= require('eslint-plugin-vue/lib/utils')

function vIdentifierIsAttribute(attribute) {
    const { name, argument } = attribute.key
    if (typeof name === 'undefined') return false
    return name.rawName === ':' && argument.rawName === 'mixpanelEventName'

}

function hasAttribute(node) {
    return node.startTag.attributes.some(attribute => {
        return typeof attribute.key.name === "string" ? (attribute.key.name.toLowerCase() === 'mixpaneleventname') : vIdentifierIsAttribute(attribute)
    })
}

function create(context) {
    const options = context.options[0] || {}
    const elementsToCheck = options.elements || ['button']

    return utils.defineTemplateBodyVisitor(context, {
        [`VElement`](node) {
                if (elementsToCheck.includes(node.rawName)) {
                    if (!hasAttribute(node)) {
                        context.report({
                            node,
                            message: `Missing "mixpanelEventName" attribute in <${ node.rawName }>`,
                        })
                    }
                }
        }
    })
}

module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "Enforce that a DOM element have the specified attribute",
            fixable: "code",
            schema: [{
                type: 'object',
                properties: {
                    elements: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                        uniqueItems: true,
                        default: ['button'],
                    },
                },
                additionalProperties: false,
                // fixable: 'code',
            }],
        }
    },
    create
}