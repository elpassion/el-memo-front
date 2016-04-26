var Board = React.createClass({
  getInitialState: function(){
    this.createGame();
    return {
        data: [],
        gameUrl: ''
    };
  },
  createGame: function(){
    $.ajax({
      url: 'http://elmemo-backend.herokuapp.com/new/',
      dataType: 'json',
      success: function(data) {
        this.setState({gameUrl: data.game})
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
          var fieldFromApi = board[i * 4 + j]
          fields.push(<Field key={fieldFromApi.id} value={fieldFromApi.value} id={fieldFromApi.id} gameUrl={this.state.gameUrl}></Field>);
        };
        fields.push(React.createElement('br', {key: i}))
      };
    }
    return (
      React.createElement('div', {className: "Board"},
        <a href="#" onClick={this.createGame}>New Game</a>, <br/>, <div className="fields">{fields}</div>
      )
    )
  }
});

var Field = React.createClass({
  getInitialState: function(){
    return {id: '', value: '', gameUrl: ''}
  },
  handleClick: function() {
    $.ajax({
      url: this.props.gameUrl + '?field1=' + this.props.id,
      dataType: 'json',
      success: function(data) {
        this.props.value = '123';
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
