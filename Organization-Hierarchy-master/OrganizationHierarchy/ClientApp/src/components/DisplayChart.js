import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

require('highcharts/modules/sankey')(Highcharts);
require('highcharts/modules/organization')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);
export default class DisplayChart extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            stateOptions: this.props.stateOptions
        }
    }

   /* componentWillReceiveProps( someProps ) {
        console.log(someProps);
        this.setState({ stateOptions : someProps  })
    }*/

    render() {
        console.log(this.state.stateOptions);
        return (
            <div>
                <figure className="highcharts-figure">
                    <div id="container">
                        <HighchartsReact highcharts={Highcharts} options={this.state.stateOptions} />
                    </div>
                </figure>
            </div>
        );
    }
}
