var Board = React.createClass({
  render: function() {
    var rows = [];
    for (var i=0; i < 4; i++) {
      for (var j=0; j < 4; j++) {
        rows.push(<Field key={i+''+j} value = {i * 4 + j} />);
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
    console.log('click!');
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
