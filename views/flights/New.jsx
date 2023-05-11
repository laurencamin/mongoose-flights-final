const React = require("react")
const DefaultLayout = require("../layout/Default")

class New extends React.Component {
  render() {
    return(
      <DefaultLayout 
        title="New Flight"
        link="/flight"
        text="Add A Flight"
      >
        <h1>Add Your Own Flight!</h1>
        <form action="/flight" method="POST">
          Name: <input type="text" name="name" />
          Airport: <input type="text" select name="airport" />
          Flight Number: <input type="number">
          </input>
          <input type="submit" value="Create Flight" />       
        </form>
      </DefaultLayout>
    )
  }
}

module.exports = New