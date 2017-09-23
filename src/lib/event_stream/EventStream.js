// @flow

import { Observable, Subscription } from './Observable';

export default class EventStream extends Observable<Event> {
  _element: Element;
  _event_name: string;
  _subcribers: Array<(Event) => void>;

  constructor(element: Element, event_name: string) {
    super();

    this._element = element;
    this._event_name = event_name;
    this._subcribers = [];
  }

  subscribe(func: (Event) => void): Subscription {
    if (this._subcribers.length === 0)  {
      this._element.addEventListener(this._event_name, this._on_event);
    }

    this._subcribers.push(func);

    let subscription = new Subscription();
    subscription.on_destroy(() => this._on_destroy(func));

    return subscription;
  }

  _on_event = (event: Event) => {
    this._subcribers.forEach(subcriber => subcriber(event));
  }

  _on_destroy = (func: (Event) => void) => {
    if (this._subcribers.length === 0) {
      return;
    }

    const index_of_subcriber = this._subcribers.indexOf(func);
    if (index_of_subcriber >= 0) {
      this._subcribers.splice(index_of_subcriber, 1);
    }

    if (this._subcribers.length === 0) {
      this._element.removeEventListener(this._event_name, this._on_event);
    }
  }
}
