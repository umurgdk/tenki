// @flow

import React from 'react';

import EventStream from '../../lib/event_stream/EventStream';
import type { IObservable } from '../../lib/event_stream/Observable';

export interface Props {
  throttle: number;
  min_chars: number;
  ref_observable: (IObservable<string>) => any;
}

export default class AutoCompleteInput extends React.Component<Props> {
  _input: ?HTMLInputElement;

  static defaultProps = {
    throttle: 300,
    min_chars: 3
  }

  componentDidMount() {
    // FlowFixMes added because we know at this point this._input is valid

    // $FlowFixMe
    const observable = new EventStream(this._input, 'keyup')
      // $FlowFixMe
      .map(e => this._input.value)
      .distinct()
      .throttle(this.props.throttle)
      .filter(txt => txt.length >= this.props.min_chars);

    this.props.ref_observable(observable);
  }

  render() {
    const { throttle, min_chars, ref_observable, ...rest_props } = this.props;
    return <input ref={i => this._input = i} {...rest_props} />;
  }
}
