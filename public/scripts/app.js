var Board = React.createClass({
  getInitialState: function(){
    return {data: ''}
  },
  loadGame: function(){
    $.ajax({
      url: 'http://elmemo-backend.herokuapp.com/new/',
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    this.loadGame();
    console.log(this.state.data);
    var rows = [];
    for (var i=0; i < 4; i++) {
      for (var j=0; j < 4; j++) {
        rows.push(<Field key={i+''+j} value={i+' '+j}></Field>);
      };
      rows.push(React.createElement('br', {key: i}))
    };
    return (
      React.createElement('div', {className: "Board"},
        rows
      )
    )
  }
});

var Field = React.createClass({
  handleClick: function() {
    console.log(this.props.value);
  },
  postFileld: function(){
    $.ajax({
      url: 'http://elmemo-backend.herokuapp.com/game/' + game_id + '?field=' + field_id,
      dataType: 'json',
      type: 'POST',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      React.createElement('span', {className: "Field", onClick: this.handleClick},
        this.props.value
      )
    );
  },
  getInitialState: function(){
    return {value: ''}
  }
});

ReactDOM.render(
  React.createElement(Board, null),
  document.getElementById('content')
);
