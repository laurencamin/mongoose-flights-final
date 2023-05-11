const React = require("react");
const DefaultLayout = require("../layout/Default")

class Index extends React.Component {
  render() {
    const { flights } = this.props
    return(
        <DefaultLayout link="/flight/new" text="View Flights Here">
        <ul>
            {flights.map((flight, i) => {
                return (
                    <li key={i}>
                        The 
                        <a href={`/flight/${i}`}>
                            {flight.name}
                        </a>{" "}
                        is {flight.number} <br></br>
                        <br />
                        <a href={`/flight/${flight._id}/show`} >Show Flights</a>
                        <form action={`/flight/${flight._id}?_method=GET`} 
                        method="POST" > 
                    </form>
                    </li>
                );
            })}
        </ul>
        </DefaultLayout> 
    )
  }
}

module.exports = Index