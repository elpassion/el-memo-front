var Board = React.createClass({
  getInitialState: function(){
    this.createGame();
    return {data: []};
  },
  createGame: function(){
    $.ajax({
      url: 'http://elmemo-backend.herokuapp.com/new/',
      dataType: 'json',
      success: function(data) {
        this.loadGame(data.game)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  loadGame: function(gameUrl){
    $.ajax({
          url: gameUrl,
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
        <a href="#" onClick={this.createGame}>New Game</a>, <br/>, fields
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
