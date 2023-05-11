const React = require("react")
const Nav = require("../components/Nav")

class Show extends React.Component {
  render() {
    const flight = this.props.flight
    return (
      <div>
        <Nav link="/flights" text="Home" />
        <h1> Flights Show Page </h1>
          The {flight.name} number is {flight.number} <br />
      </div>
    )
  }
}

module.exports = Show