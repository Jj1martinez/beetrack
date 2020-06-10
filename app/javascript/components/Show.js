import React from "react"
import PropTypes from "prop-types"
class Show extends React.Component {
  render () {
    return (
      <React.Fragment>
        Hola hola
      </React.Fragment>
    );
  }
}

Show.propTypes = {
  greeting: PropTypes.string
};
export default Show
