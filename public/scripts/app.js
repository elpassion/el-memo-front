var Board = React.createClass({
  getInitialState: function(){
    this.loadGame();
    return {data: []};
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
    console.log(this.state.data);
    var board = this.state.data;
    var fields = [];
    if(board.length > 0){
      for (var i = 0 ; i < 4; i++) {
        for (var j=0; j < 4; j++) {
          fields.push(<Field key={i+''+j} value={board[i * 4 + j].value} id={i * 4 + j}></Field>);
        };
        fields.push(React.createElement('br', {key: i}))
      };
    }
    return (
      React.createElement('div', {className: "Board"},
        <a href="#" onClick={this.loadGame}>New Game</a>, <br/>, <div className="fields">{fields}</div>
      )
    )
  }
});

var Field = React.createClass({
  getInitialState: function(){
    return {id: '', value: ''}
  },
  handleClick: function() {
    console.log(this.props.id);
  },
  postField: function(){
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
  }
});

ReactDOM.render(
  React.createElement(Board, null),
  document.getElementById('content')
);
