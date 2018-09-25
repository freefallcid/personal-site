import React from "react";
import * as PropTypes from "prop-types";

class InfiniteScroll extends React.Component {
  state = {
    numberToShow: this.props.perPage
  }

  update() {
    const { perPage } = this.props;
    const { numberToShow } = this.state;

    const distanceToBottom = document.body.scrollHeight - window.innerHeight - window.scrollY;

    if (distanceToBottom < 500) {
      this.setState({ numberToShow: numberToShow + perPage })
    }
    this.ticking = false
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.update())
    }
  }

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
  }

  render() {
    const { items, render } = this.props;
    const { numberToShow } = this.state;

    const itemsToShow = items.slice(0, numberToShow);

    return render(itemsToShow)
  }
}

InfiniteScroll.propTypes = {
  items: PropTypes.array.isRequired,
  perPage: PropTypes.number.isRequired,
  render: PropTypes.func.isRequired
}

export default InfiniteScroll
