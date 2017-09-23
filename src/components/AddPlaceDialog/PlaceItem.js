// @flow

import React from 'react';

import type { Place } from '../../lib/types/Place';

export interface Props {
  place: Place;
  on_click: (p: Place) => any;
}

export default class PlaceItem extends React.Component<Props> {
  on_click = () => {
    this.props.on_click(this.props.place);
  }

  render() {
    return <button className="PlaceItem" onClick={this.on_click}>{this.props.place.name}</button>
  }
}
