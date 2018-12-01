import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { CSSTransitionGroup } from "react-transition-group";

export default class IconItems extends Component {
  render() {
    const icons = this.props.slotQuantity.map((el, index) => {
      return (
        <Avatar key={index} className="cardIcon">
          <FastfoodIcon />
        </Avatar>
      );
    });
    return (
      <CSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {icons}
      </CSSTransitionGroup>
    );
  }
}
