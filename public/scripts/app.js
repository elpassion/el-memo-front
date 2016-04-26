var Board = React.createClass({
  getInitialState: function(){
    return {
        data: [],
        gameUrl: '',
        field1: '',
        field2: '',
        is_won: false,
        gameTimeout: '',
        icons: [
          <img src="images/memo_03.png"></img>,
          <img src="images/memo_05.png"></img>,
          <img src="images/memo_07.png"></img>,
          <img src="images/memo_09.png"></img>,
          <img src="images/memo_11.png"></img>,
          <img src="images/memo_13.png"></img>,
          <img src="images/memo_15.png"></img>,
          <img src="images/memo_17.png"></img>
        ]
    };
  },
  createGame: function(){
    $.ajax({
      url: 'http://elmemo-backend.herokuapp.com/new/',
      dataType: 'json',
      success: function(data) {
        this.setState({gameUrl: data.game, is_won: false});
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
        this.setState({data: data.fields});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var board = this.state.data;
    var fields = [];
    if(board.length > 0){
      for (var i = 0 ; i < 4; i++) {
        for (var j=0; j < 4; j++) {
          var fieldFromApi = board[i * 4 + j]
          fields.push(<Field key={fieldFromApi.id}
                              value={this.state.icons[fieldFromApi.value]}
                              id={fieldFromApi.id}
                              func={function(id) { this.onFieldClick(id) }.bind(this) }
                              ></Field>);
        };
        fields.push(React.createElement('br', {key: i}))
      };
    }
    return (
      React.createElement('div', {className: "Board"},
        <div className="header"><img class="logo" src="/images/logo.png"></img></div>, <a href="#" id="newGameLink" onClick={this.createGame}><div className="button-link"></div></a>, <br/>, <div className="fields">{fields}</div>, <Status value={this.state.is_won ? "You won! :)" : ""}/>
      )
    )
  },
  onFieldClick: function(fieldId) {
     if(this.state.field1 == '') {
        this.setState({field1: fieldId}, this.revealField(fieldId, ''));
     } else if(this.state.field2 == '') {
        this.setState({field2: fieldId}, this.revealField(this.state.field1, fieldId));
     } else {
        this.setState({field1: fieldId, field2: ''}, this.revealField(fieldId, ''));
     }
     clearTimeout(this.state.gameTimeout)
     var gameTimeout = setTimeout(function(){this.hideFields()}.bind(this), 1500);
     this.setState({gameTimeout: gameTimeout})
  },
  revealField : function(field1, field2){
    $.ajax({
      url: this.state.gameUrl + '?field1=' + field1 + "&field2=" + field2,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data.fields, is_won: data["is_won?"]})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },
  hideFields: function(){
    this.setState({field1: '', field2: ''}, this.revealField('', ''));
  }
});

var Status = React.createClass({
  render: function(){
    return React.createElement('div', {className: "Status"}, this.props.value)
  }
});

var Field = React.createClass({
  getInitialState: function(){
    return {id: '', value: '', func: ''}
  },
  handleClick: function() {
    this.props.func(this.props.id);
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
