import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public executedOperation: string;
  public operand1: number;
  public operand2: number;
  public operator: string;
  public currentOperation: string;
  public answered: boolean;
  public settedOperation: boolean;
  public calculationString: string;

  constructor() {
    this.initializeVariables();
  }

  private initializeVariables() {
    this.executedOperation = '';
    this.currentOperation = '';
    this.operator = '';
    this.answered = false;
    this.settedOperation = false;
    this.calculationString = '';
  }

  public pressKey(key: string) {
    this.discoverOperationType(key);
    this.mapCurrentOperationIfItIsValid(key);
  }

  private discoverOperationType(key: string) {
    if (this.checkIfOperatorIsAnAction(key)) {
      this.mapSettedOperationIfLastCaracterIsAnAction();
      if ((!this.settedOperation) || (this.currentOperation !== ''))
        this.mapOperator(key);
    }
  }

  private checkIfOperatorIsAnAction(key: string) {
    return key === '/' || key === 'x' || key === '-' || key === '+';
  }

  private mapSettedOperationIfLastCaracterIsAnAction() {
    if (this.checkIfOperatorIsAnAction(this.currentOperation[this.currentOperation.length - 1])) {
      this.settedOperation = true;
    }
  }

  private mapOperator(key: string) {
    this.operand1 = parseFloat(this.currentOperation);
    this.operator = key;
    this.settedOperation = true;
  }

  private mapCurrentOperationIfItIsValid(key: string) {
    if (this.currentOperation.length < 10)
      this.currentOperation += key;
  }

  public clearAllOperations() {
    this.resetSettedOperation();
    this.resetCurrentOperation();
    this.resetExecutedOperation();
  }

  private resetSettedOperation() {
    this.settedOperation = false;
  }
  
  private resetCurrentOperation() {
    this.currentOperation = '';
  }

  private resetExecutedOperation() {
    this.executedOperation = '';
  }


  getAnswer() {
    this.calculationString = this.currentOperation;
    this.operand2 = parseFloat(this.currentOperation.split(this.operator)[1]);
    if (this.operator === '/') {
      this.executedOperation = this.currentOperation;
      this.currentOperation = (this.operand1 / this.operand2).toString();
      this.executedOperation = this.calculationString;
      if (this.currentOperation.length > 9) {
        this.currentOperation = this.currentOperation.substr(0, 9);
      }
    } else if (this.operator === 'x') {
      this.executedOperation = this.currentOperation;
      this.currentOperation = (this.operand1 * this.operand2).toString();
      this.executedOperation = this.calculationString;
      if (this.currentOperation.length > 9) {
        this.currentOperation = 'ERROR';
        this.executedOperation = 'Range Exceeded';
      }
    } else if (this.operator === '-') {
      this.executedOperation = this.currentOperation;
      this.currentOperation = (this.operand1 - this.operand2).toString();
      this.executedOperation = this.calculationString;
    } else if (this.operator === '+') {
      this.executedOperation = this.currentOperation;
      this.currentOperation = (this.operand1 + this.operand2).toString();
      this.executedOperation = this.calculationString;
      if (this.currentOperation.length > 9) {
        this.currentOperation = 'ERROR';
        this.executedOperation = 'Range Exceeded';
      }
    } else {
      this.currentOperation = 'ERROR';
      this.executedOperation = 'ERROR: Invalid Operation';
    }
    this.answered = true;
  }
}
