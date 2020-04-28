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

  public printResult() {
    this.operand2 = parseFloat(this.currentOperation.split(this.operator)[1]);
    this.executeAction(this.getPossibleOperators()[this.operator]);
    this.answered = true;
  }

  private executeAction(action: any) {
    if (action)
      action();
    else
      this.setErrorMessage('ERROR: Invalid Operation', 'ERROR');
  }

  private plusOperation() {
    this.mapExecutedOperation()
    this.currentOperation = (this.operand1 + this.operand2).toString();
    this.setRangeExceededError();
  }

  private minusOperation() {
    this.mapExecutedOperation()
    this.currentOperation = (this.operand1 - this.operand2).toString();
  }

  private multiplicationOperation() {
    this.mapExecutedOperation()
    this.currentOperation = (this.operand1 * this.operand2).toString();
    this.setRangeExceededError();
  }

  private divisionOperation() {
    this.mapExecutedOperation()
    this.currentOperation = (this.operand1 / this.operand2).toString();
    if (this.currentOperation.length > 9)
      this.currentOperation = this.currentOperation.substr(0, 9);
  }

  private mapExecutedOperation() {
    this.executedOperation = this.currentOperation;
  }

  private setRangeExceededError() {
    if (this.currentOperation.length > 9)
      this.setErrorMessage('ERROR', 'Range Exceeded');
  }

  private setErrorMessage(executedOperation: string, currentOperation: string) {
    this.executedOperation = executedOperation;
    this.currentOperation = currentOperation;
  }

  private getPossibleOperators() {
    return {
      "+": this.getPlusOperationFunction(),
      "-": this.getMinusOperationFunction(),
      "x": this.getMultiplicationFunction(),
      "/": this.getDivisionOperationFunction()
    }
  }

  private getPlusOperationFunction() {
    return () => { this.plusOperation() };
  }

  private getMinusOperationFunction() {
    return () => { this.minusOperation() };
  }
  private getMultiplicationFunction() {
    return () => { this.multiplicationOperation() };
  }

  private getDivisionOperationFunction() {
    return () => { this.divisionOperation() };
  }
}
