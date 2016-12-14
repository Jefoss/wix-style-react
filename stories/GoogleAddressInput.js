import React, {Component, PropTypes} from 'react';
import {storiesOf} from '@kadira/storybook';
import Markdown from './utils/Components/Markdown';
import GoogleAddressInput from '../src/GoogleAddressInput';
import GoogleAddressInputReadme from '../src/GoogleAddressInput/README.md';
import clients from '../src/clients';

class ControlledGoogleAddressInput extends Component {
  static propTypes = {
    result: PropTypes.bool
  };

  constructor({value}) {
    super();
    this.state = {value};
  }

  render() {
    const onSet = event => event && this.setState({value: event.originValue});
    const onChange = event => event && this.setState({value: event.target.value});

    return (
      <GoogleAddressInput
        {...this.props}
        value={this.state.value}
        onSet={onSet}
        onChange={onChange}
        placeholder="Enter Address..."
        Client={clients.GoogleMapsClient}
        />
    );
  }
}

storiesOf('Inputs', module)
  .add('GoogleAddressInput', () => (
    <div>
      <Markdown source={GoogleAddressInputReadme}/>

      <h1>Examples</h1>

      <div>
        <h3>GoogleAddressInput</h3>
        <ControlledGoogleAddressInput countryCode="US"/>
      </div>

      <div>
        <h3>Value prefix</h3>
        <ControlledGoogleAddressInput countryCode="US" valuePrefix="hello"/>
      </div>

      <div>
        <h3>Error</h3>
        <ControlledGoogleAddressInput countryCode="US" error/>
      </div>
    </div>
  ));




// import React from 'react';
// import {GoogleAddressInput} from '../src/index.js';
// import {clients} from '../src/index.js';

// class GoogleAddressInputStory extends React.Component {

//     constructor() {
//         super();
//         this.state = {result: null, controlledValue:'Hatomer'}
//     }

//     render() {
//         return (
//             <div style={{width:'900px'}}>

//                 <h2>Google Address Input Box <small style={{fontSize:'11px'}}><a target='_blank' href='https://github.com/wix/wix-style-react/blob/master/stories/GoogleAddressInput.js'>source</a></small></h2>
//                 <p>Address input box (using Google Maps).</p>

//                 <div style={{width:'400px'}} className={'ltr'} >
//                     <GoogleAddressInput countryCode={'US'} Client={clients.GoogleMapsClient} onSet={result => this.setState({result})} placeholder={'Enter Address...'}/>
//                 </div>
//                 <small>
//                     Result: {JSON.stringify(this.state.result, null, 4)}
//                 </small>

//                 <h3>Attributes</h3>
//                 <table className='attributes'>
//                     <tbody>
//                         <tr>
//                             <th>Attribute name</th>
//                             <th>Value</th>
//                             <th>Description</th>
//                         </tr>
//                         <tr>
//                             <td>countryCode</td>
//                             <td>string (optional, but highly recommended)</td>
//                             <td>Country code used to help with suggestions and geocoding</td>
//                         </tr>
//                         <tr>
//                             <td>onSet</td>
//                             <td>optional (but highly recommended)</td>
//                             <td>Callback for results. Will return an object containing: originValue (value in the search), googleResult (google geocode result for the search), address (which will include: formatted (google formatted address), country, countryCode, street, number, postalCode, latLng (lat, lng))</td>
//                         </tr>
//                         <tr>
//                             <td>Client</td>
//                             <td>Class (required)</td>
//                             <td>Google map client implementation (should implement autocomplete and geocode functions). Normally you would use wix-style-react/clients/GoogleMapsClient</td>
//                         </tr>
//                         <tr>
//                             <td>placeholder</td>
//                             <td>string (optional)</td>
//                             <td>Placeholder for the input box</td>
//                         </tr>
//                         <tr>
//                             <td>defaultValue</td>
//                             <td>string (optional)</td>
//                             <td>Initial value to display</td>
//                         </tr>
//                         <tr>
//                             <td>value</td>
//                             <td>string (optional)</td>
//                             <td>Controlled mode - value to display</td>
//                         </tr>
//                         <tr>
//                             <td>valuePrefix</td>
//                             <td>string (optional)</td>
//                             <td>Value to place before every search term (normally should not be used)</td>
//                         </tr>
//                         <tr>
//                             <td>types</td>
//                             <td>array of strings (optional)</td>
//                             <td>Limit the autocomplete to specific types (see <a href='https://developers.google.com/places/supported_types#table3'>here</a> for list)</td>
//                         </tr>
//                         <tr>
//                             <td>filterTypes</td>
//                             <td>array of strings (optional)</td>
//                             <td>Lower level filtering of autocomplete result types (see <a href='https://developers.google.com/places/supported_types'>here</a> for list)</td>
//                         </tr>
//                         <tr>
//                             <td>error</td>
//                             <td>boolean (optional, default false)</td>
//                             <td>Should display error marker</td>
//                         </tr>
//                         <tr>
//                             <td>onChange</td>
//                             <td>callback (optional)</td>
//                             <td></td>
//                         </tr>
//                         <tr>
//                             <td>onFocus</td>
//                             <td>callback (optional)</td>
//                             <td></td>
//                         </tr>
//                         <tr>
//                             <td>onBlur</td>
//                             <td>callback (optional)</td>
//                             <td></td>
//                         </tr>
//                     </tbody>
//                 </table>

//                 <h3>Usage Examples</h3> 
//                 <h4>defaultValue</h4>
//                 Input should contain address, and be editable.
//                 <br/>
//                 <br/>
//                 <div style={{width:'400px'}} className={'ltr'} >
//                     <GoogleAddressInput countryCode={'US'} Client={clients.GoogleMapsClient} placeholder={'Enter Address...'} defaultValue={'Default Address'}/>
//                 </div>

//                 <h4>value</h4>
//                 Controlled mode
//                 <br/>
//                 <br/>
//                 <div style={{width:'400px'}} className={'ltr'} >
//                     <GoogleAddressInput 
//                       countryCode={'US'} 
//                       Client={clients.GoogleMapsClient} 
//                       placeholder={'Enter Address...'} 
//                       value={this.state.controlledValue}
//                       onChange={(e) => this.setState({controlledValue:e.target.value})}
//                       onSet={(e) => e && this.setState({controlledValue:e.originValue})}
//                       />
//                 </div>

//             </div>
//         );
//     }
// }

// export default GoogleAddressInputStory;

