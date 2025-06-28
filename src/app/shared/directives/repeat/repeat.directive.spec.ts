import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RepeatDirective } from './repeat.directive';

@Component({
  standalone: true,
  imports: [RepeatDirective],
  template: `
    <div *repeat="count as c; let i = index" class="repeated">{{ i }}</div>
  `
})
class TestHostComponent {
  count = 3;
}

describe('RepeatDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render 3 repeated elements', () => {
    const elements = fixture.debugElement.queryAll(By.css('.repeated'));
    expect(elements.length).toBe(3);
    expect(elements.map(e => e.nativeElement.textContent.trim())).toEqual(['0', '1', '2']);
  });

  it('should update when input changes', () => {
    component.count = 5;
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('.repeated'));
    expect(elements.length).toBe(5);
    expect(elements.map(e => e.nativeElement.textContent.trim())).toEqual(['0', '1', '2', '3', '4']);
  });
});
