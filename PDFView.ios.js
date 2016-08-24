'use strict';

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  requireNativeComponent,
  View,
} from 'react-native';

class PDFView extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  _onChange(event:Event) {
    const {numPages, height, width} = event.nativeEvent;
    this.props.onLoadComplete && this.props.onLoadComplete({
      numPages: Number(numPages),
      height: Number(height),
      width: Number(width)
    });
  }

  render() {
    return <PDFCustomView ref={component => this._root = component} {...this.props} onChange={this._onChange}/>;
  }
}

PDFView.propTypes = {
  ...View.propTypes,
  src: PropTypes.string,
  path: PropTypes.string,
  pageNumber: PropTypes.number,
  zoom: PropTypes.number,
  onLoadComplete: PropTypes.func
};

//var PDFCustomView = requireNativeComponent('RNPDFView', null);

var PDFCustomView = requireNativeComponent('RNPDFView', PDFView, {
  nativeOnly: {onChange: true}
});

export default PDFView;