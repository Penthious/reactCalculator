import React, {
    Component,
} from 'react';

import Display from './Display';
import Buttons from './Buttons';

// css
import '../styles/calculator.sass';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstInput: '',
            secondInput: '',
            thirdInput: '',
            output: '',
            firstInputDecimal: false,
            thirdInputDecimal: false,
        };
    }

    // sets the state of output
    setOutput = (output) => {
        if (this.state.firstInput.lastIndexOf('.') === -1) {
            this.setState({
                firstInputDecimal: false,
            });
        }
        this.setState({
            output: `${this.state.firstInput} ${this.state.secondInput} ${this.state.thirdInput}`,
            firstInput: `${output}`,
            thirdInput: '',
            thirdInputDecimal: false,
        });
    };

    // tells what value to pass to this.setOutput
    handleOutput = () => {
        const firstNumber  = Number(this.state.firstInput);
        const secondNumber = Number(this.state.thirdInput);
        switch (this.state.secondInput) {
            case '+':
                this.setOutput(firstNumber + secondNumber);
                break;
            case '-':
                this.setOutput(firstNumber - secondNumber);
                break;
            case '*':
                this.setOutput(firstNumber * secondNumber);
                break;
            case '/':
                this.setOutput(firstNumber / secondNumber);
                break;
            case '%':
                this.setOutput(firstNumber % secondNumber);
                break;
            case '^':
                this.setOutput(firstNumber ** secondNumber);
                break;
            default:
                break;
        }
    };

    // handles how value affects the current state
    handleInputChange = (value) => {
        if (value === '+' || value === '-' || value === '/' || value === '*' || value === '%' || value === '^') {
            if (this.state.firstInput !== '.') {
                this.handleSecondInput(value);
            }
        } else if (value === '.') {
            this.handleDecimal();
        } else if (value === 'AC') {
            this.handleClear();
        } else if (value === 'DEL') {
            this.handleDelete();
        } else if (value === '=') {
            if (this.state.firstInput && this.state.secondInput && this.state.thirdInput && this.state.thirdInput !== '.' && this.state.firstInput !== '.') {
                this.handleOutput();
            }
        } else if (this.state.secondInput === '') {
            this.handleFirstInput(value);
        } else if (this.state.secondInput !== '') {
            this.handleThirdInput(value);
        }
    };

    // Updates the state of firstInput
    handleFirstInput = (value) => {
        this.setState({
            firstInput: `${this.state.firstInput}${value}`,
        });
    };

    // Updates the state of secondInput
    handleSecondInput = (value) => {
        this.setState({
            secondInput: value,
        });
    };

    // Updates the state of thirdInput
    handleThirdInput = (value) => {
        this.setState({
            thirdInput: `${this.state.thirdInput}${value}`,
        });
    };

    // adds the decimal to the correct input
    handleDecimal = () => {
        if (this.state.secondInput === '' && this.state.firstInputDecimal === false) {
            this.setState({
                firstInput: `${this.state.firstInput}.`,
                firstInputDecimal: true,
            });
        } else if (this.state.secondInput !== '' && this.state.thirdInputDecimal === false) {
            this.setState({
                thirdInput: `${this.state.thirdInput}.`,
                thirdInputDecimal: true,
            });
        }
    };

    // resets all current state values back to empty string
    handleClear = () => {
        this.setState({
            firstInput: '',
            secondInput: '',
            thirdInput: '',
            output: '',
            firstInputDecimal: false,
            thirdInputDecimal: false,
        });
    };

    // removes the furthest to the right value in the input field
    handleDelete = () => {
        if (this.state.firstInput !== '' && this.state.secondInput !== '' && this.state.thirdInput !== '') {
            console.log();
            if (this.state.thirdInput.lastIndexOf('.') === this.state.thirdInput.lastIndexOf('') - 1) {
                this.setState({
                    thirdInputDecimal: false,
                });
            }
            this.setState({
                thirdInput: this.state.thirdInput.slice(0, -1),
            });
        } else if (this.state.firstInput !== '' && this.state.secondInput !== '' && this.state.thirdInput === '') {
            this.setState({
                secondInput: this.state.secondInput.slice(0, -1),
            });
        } else if (this.state.firstInput !== '' && this.state.secondInput === '' && this.state.thirdInput === '') {
            if (this.state.firstInput.lastIndexOf('.') === this.state.firstInput.lastIndexOf('') - 1) {
                this.setState({
                    firstInputDecimal: false,
                });
            }
            this.setState({
                firstInput: this.state.firstInput.slice(0, -1),
            });
        }
    };


    render() {
        return (
            <div className="container">
                <Display{...this.state} />
                <Buttons {...this.state} handleInputChange={this.handleInputChange} />
            </div>
        );
    }
}

Calculator.propTypes    = {};
Calculator.defaultProps = {};

export default Calculator;
