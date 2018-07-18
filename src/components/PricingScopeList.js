import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '../components/SvgIcon';

export default class PricingScopeList extends Component {
  static propTypes = {
    list: PropTypes.array
  }

  render(){

    const { list } = this.props;

    return(
      <div className="pricing-scope__list">
        { list.map((col, i) => (
          <div className="pricing-scope__list-col" key={i}>
            { col.map((el, ind) => (
              <div className="pricing-scope__list-el" key={ind}>
                <SvgIcon name="check" />
                <span>{el}</span>
              </div>
            )) }
          </div>
        )) }

      </div>
    )
  }
}
