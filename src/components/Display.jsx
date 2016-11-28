import React, {
    Component,
    PropTypes,
} from 'react';

class Display extends Component {
    render() {
        return (
            <div>
                <div className="inputScreen">
                    <input type="text" value={this.props.firstInput} disabled />
                    <input type="text" value={this.props.secondInput} disabled />
                    <input type="text" value={this.props.thirdInput} disabled />
                </div>
                <div className="results">
                    <input disabled value={this.props.output} />
                </div>
            </div>
        );
    }
}

Display.propTypes    = {};
Display.defaultProps = {};

export default Display;
