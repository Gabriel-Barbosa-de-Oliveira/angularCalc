import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize application s variables ', () => {
    expect(component.executedOperation).toBe('');
    expect(component.currentOperation).toBe('');
    expect(component.operator).toBe('');
    expect(component.answered).toBe(false);
    expect(component.settedOperation).toBe(false);
    expect(component.calculationString).toBe(''); 
  });

  it('should insert first number to main text', () => {
    component.pressKey("1");
    expect(component.currentOperation).toBe("1");
  });

  it('should insert operator to main text', () => {
    component.pressKey("1");
    component.pressKey("x");
    expect(component.currentOperation).toBe("1x");
  });

  it('should insert second to main text', () => {
    component.pressKey("1");
    component.pressKey("x");
    component.pressKey("2");
    expect(component.currentOperation).toBe("1x2");
  });

  it('should clear calculator operations with only one number', () => {
    component.pressKey("1");
    expect(component.currentOperation).toBe("1");
    component.clearAllOperations();
    expect(component.currentOperation).toBe("");
    expect(component.executedOperation).toBe("");
    expect(component.settedOperation).toBe(false);
  });

  it('should clear calculator operations when operator is already set', () => {
    component.pressKey("1");
    component.pressKey("x");
    expect(component.currentOperation).toBe("1x");
    component.clearAllOperations();
    expect(component.currentOperation).toBe("");
    expect(component.executedOperation).toBe("");
    expect(component.settedOperation).toBe(false);
  });

  it('should clear calculator operations when operator is fully set', () => {
    component.pressKey("1");
    component.pressKey("x");
    component.pressKey("2");
    expect(component.currentOperation).toBe("1x2");
    component.clearAllOperations();
    expect(component.currentOperation).toBe("");
    expect(component.executedOperation).toBe("");
    expect(component.settedOperation).toBe(false);
  });

  it('should give result do plus operation', () => {
    component.pressKey("1");
    component.pressKey("+");
    component.pressKey("2");
    component.getAnswer();
    expect(component.currentOperation).toBe("3");
  });

  it('should give result do minus operation', () => {
    component.pressKey("1");
    component.pressKey("-");
    component.pressKey("2");
    component.getAnswer();
    expect(component.currentOperation).toBe("-1");
  });

  it('should give result do division operation', () => {
    component.pressKey("14");
    component.pressKey("/");
    component.pressKey("2");
    component.getAnswer();
    expect(component.currentOperation).toBe("7");
  });

  it('should give result do multiplication operation', () => {
    component.pressKey("7");
    component.pressKey("x");
    component.pressKey("2");
    component.getAnswer();
    expect(component.currentOperation).toBe("14");
  });

  it('should give result infinity to division/0 operation', () => {
    component.pressKey("7");
    component.pressKey("/");
    component.pressKey("0");
    component.getAnswer();
    expect(component.currentOperation).toBe("Infinity");
  });

  it('should give error message to invalid operation', () => {
    component.pressKey("7");
    component.pressKey("%");
    component.pressKey("0");
    component.getAnswer();
    expect(component.currentOperation).toBe("ERROR");
    expect(component.executedOperation).toBe("ERROR: Invalid Operation");
  });

});
