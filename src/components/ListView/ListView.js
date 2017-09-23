// @flow

import React from 'react';

import { noop } from '../../util';
import './ListView.css';

export interface Props<Item> {
  items: Item[];
  selectable: boolean;
  multiple_selection: boolean;
  on_select_item: (Item) => any;
  item_renderer: (Item, (Item) => any) => any;
}

export default class ListView<T> extends React.Component<Props<T>> {
  static defaultProps = {
    items: [],
    selectable: true,
    multiple_selection: false,
    on_select_item: noop,
    item_renderer: (i, click) => null
  }

  render() {
    return (
      <ul className="ListView">
        { this.props.items.map((item, i) => (
          <li key={i}>{this.props.item_renderer(item, this.props.on_select_item)}</li>
        )) }
      </ul>
    );
  }
}
