// @flow

export interface IObservable<Item> {
  subscribe(func: (Item) => void): Subscription;
}

export class Subscription {
  _callbacks: Array<() => void>;

  constructor() {
    this._callbacks = [];
  }

  on_destroy(callback: () => void): Subscription {
    this._callbacks.push(callback);
    return this;
  }

  destroy() {
    this._callbacks.forEach(cb => cb());
  }
}

export type Desubscriber = () => void;

export class Observable<T> implements IObservable<T> {
  subscribe(func: (T) => void): Subscription {
    throw new Error('Observable class shouldnt use directly');
  }

  map<F>(func: (T) => F): MapObservable<T, F> {
    return new MapObservable(this, func);
  }

  flat_map_latest<F>(func: (T) => IObservable<F>): FlatMapLatestObservable<T, F> {
    return new FlatMapLatestObservable(this, func);
  }

  filter(func: (T) => boolean): FilterObservable<T> {
    return new FilterObservable(this, func);
  }

  throttle(delay_ms: number): ThrottleObservable<T> {
    return new ThrottleObservable(this, delay_ms);
  }

  distinct(): DistinctObservable<T> {
    return new DistinctObservable(this);
  }
}

export class FilterObservable<T> extends Observable<T> {
  _observable: IObservable<T>;
  _filter: (T) => boolean;

  constructor(observable: IObservable<T>, filter: (T) => boolean) {
    super();

    this._observable = observable;
    this._filter = filter;
  }

  subscribe(func: (T) => void): Subscription {
    return this._observable
      .subscribe(item => {
        if (this._filter(item)) {
          func(item);
        }
      });
  }
}

export class MapObservable<T, F> extends Observable<F> {
  _observable: IObservable<T>;
  _mapper: (T) => F;

  constructor(observable: IObservable<T>, mapper: (T) => F) {
    super();

    this._observable = observable;
    this._mapper = mapper;
  }

  subscribe(func: (F) => void): Subscription {
    return this._observable.subscribe(item => func(this._mapper(item)));
  }
}

export class FlatMapLatestObservable<T, F> extends Observable<F> {
  _observabe: IObservable<T>;
  _mapper: (T) => IObservable<F>;

  constructor(observable: IObservable<T>, mapper: (T) => IObservable<F>) {
    super();

    this._observabe = observable;
    this._mapper = mapper;
  }

  subscribe(func: (F) => void): Subscription {
    let last_subscription: Subscription | null = null;

    return this._observabe.subscribe(item => {
      if (last_subscription) {
        last_subscription.destroy();
      }

      last_subscription = this._mapper(item).subscribe(item => func(item));
    });
  }
}

export class ThrottleObservable<T> extends Observable<T> {
  _observable: IObservable<T>;
  _delay_ms: number;

  constructor(observable: IObservable<T>, delay_ms: number) {
    super();

    this._observable = observable;
    this._delay_ms = delay_ms;
  }

  subscribe(func: (T) => void): Subscription {
    let timeout = null;

    return this._observable
      .subscribe(item => {
        if (timeout !== null) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(() => func(item), this._delay_ms);
      })
      .on_destroy(() => {
        if (timeout) {
          clearTimeout(timeout);
        }
      });
  }
}

export class PromiseObservable<T> extends Observable<T> {
  _promise: Promise<T>;

  constructor(promise: Promise<T>) {
    super();
    this._promise = promise;
  }

  subscribe(func: (T) => void): Subscription {
    let cancelled = false;

    this._promise.then(val => {
      if (!cancelled) {
        func(val);
      }
    });

    let subscription = new Subscription();
    subscription.on_destroy(() => cancelled = true);

    return subscription;
  }
}

export class DistinctObservable<T> extends Observable<T> {
  _observabe: IObservable<T>;

  constructor(observable: IObservable<T>) {
    super();
    this._observabe = observable;
  }

  subscribe(func: (T) => void): Subscription {
    let last_item: T | null = null;
    return this._observabe.subscribe(item => {
      if (last_item && last_item == item) {
        return;
      }

      last_item = item;
      func(item);
    });
  }
}
