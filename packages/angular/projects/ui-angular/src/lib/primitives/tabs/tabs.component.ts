import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
  Output,
  EventEmitter,
} from '@angular/core';
import { nanoid } from 'nanoid';
import { TabItemComponent } from '../tab-item/tab-item.component';

@Component({
  selector: 'amplify-tabs',
  templateUrl: './tabs.component.html',
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabItemComponent) tabs: QueryList<TabItemComponent>;
  @Output() tabChange = new EventEmitter();

  ngAfterContentInit(): void {
    // assign ids
    this.tabs.forEach((tab, index) => {
      tab.id = `radix-id-${nanoid(12)}-1-content-${index}`;
      tab.labelledById = `radix-id-${nanoid(12)}-1-trigger-${index}`;
    });

    // find active tab
    // TODO(enhancement): more declarative way for choosing the initial tab to render
    const activeTabs = this.tabs.filter((tab) => tab.active);

    // set active tab
    if (activeTabs.length !== 1) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabItemComponent): void {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
  }

  handleTabClick(tab: TabItemComponent): void {
    if (tab.active) return; // don't do anything if clicks the current active tab
    this.tabChange.emit();
    this.selectTab(tab);
  }
}
