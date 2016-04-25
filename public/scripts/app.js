var Board = React.createClass({
  render: function() {
    var rows = [];
    for (var i=0; i < 4; i++) {
      for (var j=0; j < 4; j++) {
        rows.push(<Field key={i+''+j}/>);
      };
      rows.push(React.createElement('br', {key: i}))
    };
    return <div>{rows}</div>;
  }
});

var Field = React.createClass({
  render: function() {
    return (
      React.createElement('span', {className: "Field"},
        "Field"
      )
    );
  }
});

ReactDOM.render(
  React.createElement(Board, null),
  document.getElementById('content')
);
