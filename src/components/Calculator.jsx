import React, {
    Component,
} from 'react';

import Display from './Display';
import Buttons from './Buttons';

/**
 * Css
 */
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

    /**
     * sets the state of output
     */
    setOutput = (output) => {
        /**
         * Checks to see if firstInput has '.'
         * if not resets firstInputDecimal to false
         */
        if (this.state.firstInput.lastIndexOf('.') === -1 || this.state.firstInput == '0.0') {
            this.setState({
                firstInputDecimal: false,
            });
        }

        /**
         * Sets output to the string literal of
         * firstInput secondInput thirdInput IE: 4 * 10
         *
         * Sets firstInput to the total value of
         * firstInput(4) secondInput(+) thirdInput(10) = output(14)
         *
         * Sets thirdInput and thirdInputDecimal back to default
         */
        this.setState({
            output: `${this.state.firstInput} ${this.state.secondInput} ${this.state.thirdInput}`,
            firstInput: `${output}`,
            thirdInput: '',
            thirdInputDecimal: false,
        });
    };

    /**
     * Tells what value to pass to this.setOutput
     */
    handleOutput = () => {
        const firstNumber = Number(this.state.firstInput);
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
                this.setOutput(firstNumber**secondNumber);
                break;
            default:
                break;
        }
    };

    /**
     * Handles how value affects the current state
     */
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

    /**
     * Updates the state of firstInput
     */
    handleFirstInput = (value) => {
        this.setState({
            firstInput: `${this.state.firstInput}${value}`,
        });
    };

    /**
     * Updates the state of secondInput
     */
    handleSecondInput = (value) => {
        this.setState({
            secondInput: value,
        });
    };

    /**
     * Updates the state of thirdInput
     */
    handleThirdInput = (value) => {
        this.setState({
            thirdInput: `${this.state.thirdInput}${value}`,
        });
    };

    /**
     * Adds the decimal to the correct input
      */
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

    /**
     * Resets all current state values back to the default value
      */
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

    /**
     * Removes the furthest to the right value depending on
     * what input field is currently active
     */
    handleDelete = () => {
        if (this.state.firstInput !== '' && this.state.secondInput !== '' && this.state.thirdInput !== '') {
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
                <Display {...this.state} />
                <Buttons {...this.state} handleInputChange={this.handleInputChange} />
            </div>
        );
    }
}

export default Calculator;
