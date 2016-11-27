# Wix Style - React
'Wix Style' is a common name to the different UX style libraries designed by the UX guild (for dashboard, settings, editor, and viewer). The wix-style-react package contains React implemenations for the different components in the style library.

## Demo
Storybook can be seen [here](https://wix.github.io/wix-style-react/).

## Getting Started
### Storybook
Storybook will allow you to see all the different components implemented, and the different usages of each one of them.
```
    npm install
    npm start
```
### Using in a Project
#### Install the npm
```
    npm install --save wix-style-react
```
#### Update webpack
The files are brought 'uncompiled' and 'unpacked'. You will need to make sure webpack standard loaders run on this project by adding 'node_modules/wix-style-react/src' to your loaders' include array, for example:
```javascript
    {
        test: /\.scss$/,
        include:['node_modules/wix-style-react/src')],
        loaders: [
            'style-loader',
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'postcss-loader',
            'sass-loader'
        ]
    }
```
#### Use in your code
```javascript
    import * as WixStyle from 'wix-style-react';

    export default (props) => {
        return (
            <WixStyle.Button style='blue'>Click me!</WixStyle.Button>
        );
    }
```
Optimization: If you prefer to include only specific elements, you can do so by:
```javascript
    import Button from 'wix-style-react/dist/src/Button';

    export default (props) => {
        return (
            <Button style='blue'>Click me!</Button>
        );
    }
```
#### Notes
See the Storybook, and the story fields, for all the elements and the different parameters they receive.

__Important__: Make sure your body contains either the 'ltr' or 'rtl' class (dependent, of course, on the displayed language).

This project is currently still in initial development. It is advisable to be dependent on a specific version of this component for the time being.

### Test Kit
This package comes with test-kits for the different components. Each component can receive an id parameter, which can be used by the test-kits to access different functionalities of the component. For example:
```javascript
import ButtonDriver from 'wix-style-react/dist/testkit/Button';
new ButtonDriver(id).click()
```

## Contributing
You're more than welcome to contribute by creating pull-requests.

## License
This project is offered under MIT License.
