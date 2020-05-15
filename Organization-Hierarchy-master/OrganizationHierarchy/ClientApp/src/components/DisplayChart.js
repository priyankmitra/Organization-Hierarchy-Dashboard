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
            stateOptions: props.stateOptions
        }
    }

    render() {
        return (
            
            <div style={{ backgroundColor: '#041706' }}>
                <figure className="highcharts-figure">
                    <div id="container" style={{marginTop : "-17px"}}>
                        <HighchartsReact highcharts={Highcharts} options={this.props.stateOptions} updateArgs={[true]} />
                    </div>
                </figure>
            </div>
        );
    }
}
