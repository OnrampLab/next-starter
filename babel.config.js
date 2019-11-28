module.exports = {
    "presets": [
      "next/babel"
    ],
    "plugins": [
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      ['babel-plugin-react-remove-properties', {
        properties: ['data-testid']
      }],
      [
        "module-resolver",
        {
          "root": [
            "./"
          ],
          "alias": {
            "@app": "./src/app",
            "^@onr/(.+)": "./src/modules/\\1"
          }
        }
      ],
      [
        "babel-plugin-styled-components",
        {
          "ssr": true,
          "displayName": true,
          "preprocess": false
        }
      ],
      [
        "import",
        {
          "libraryName": "antd"
        }, "ant"
      ],
      [
        "import",
        {
          "libraryName": "react-feather",
          "libraryDirectory": "dist/icons"
        },
        "react-feather"
      ]
    ]
}
