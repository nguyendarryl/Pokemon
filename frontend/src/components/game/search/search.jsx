import React from 'react';
import { withRouter } from 'react-router-dom';

const splashImg = './images/bg.jpg'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: "",
      currentUserId: this.props.currentUser.user.id
      //,
      // loaded: false
    };
  }

  componentDidMount() {
    console.log('we here at search');
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  joinGame(e) {
    e.preventDefault();
    const gameId = document.getElementById('search-game-id').value
    this.props.fetchGame(gameId).then(res => {
      this.props.history.push(`/game/play/${res.game._id}`);
    });
  }

  createGame() {
    console.dir(this.props.currentUser.user.id);
    const game = {
      user1: this.state.currentUserId,
      user2: 'nobody',
      winner: 'nobody',
      loser: 'nobody'
    }
    this.props.createGame(game)
      //.then(res => {
      //  this.props.history.push(`/game/play/${res.game._id}`)
      //});
  }

  render() {
    return (
      <div id="game-lobby-div">
        <div id="game-lobby-content">
          <div id="game-lobby-title">Find a Game</div>
          <div id="game-lobby">
            <div id="game-search-create">
              <button onClick={() => this.createGame()} className="create-game">Create Game</button>
            </div>
            <div id="game-search-join">
              <input type="text" value={this.state.gameId} onChange={this.update("gameId")} id="search-game-id" placeholder="Game ID" />
              <input id="join-game-btn" type="submit" value="Join" onClick={(e) => this.joinGame(e)} />
            </div>
          </div>
        </div>
        <div id="game-lobby-background">
          <img src={splashImg} alt="background" className="splash-image" />
        </div>
      </div>
    );
  }
}

export default withRouter(Search);