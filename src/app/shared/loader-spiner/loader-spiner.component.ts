import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnDestroy } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-loader-spiner',
  templateUrl: './loader-spiner.component.html',
  styleUrls: ['./loader-spiner.component.scss']
})
export class LoaderSpinerComponent implements OnDestroy {

  public isSpinnerVisible = true;

  @Input() public backgroundColor = 'rgba(0, 115, 170, 0.69)';

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.isSpinnerVisible = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.isSpinnerVisible = false;
        }
      },
      () => {
        this.isSpinnerVisible = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
  }

}
