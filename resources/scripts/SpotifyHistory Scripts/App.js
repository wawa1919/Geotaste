

class App extends Component {
  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    const isUserAuthorized = urlParams.has('authorized') ? true : false;

    this.state = {
      isUserAuthorized,
      musicHistory: [],
    };
  }

  componentDidMount() {
    const { isUserAuthorized } = this.state;
  
    if (isUserAuthorized) {
      fetch('http://localhost:5000/history')
        .then(res => res.json())
        .then(data => {
          this.setState({
            musicHistory: data,
          });
        })
        .catch(error => console.log(error));
    }
  }
  
  render() {
    const { isUserAuthorized, musicHistory } = this.state;
    const connectSpotify = isUserAuthorized ? (
      ''
    ) : (
      <a href="http://localhost:5000/login">Connect your Spotify account</a>
    );

    const TableItem = (item, index) => (
      <tr key={item.played_at}>
        <td>{index + 1}</td>
        <td>{item.track_name}</td>
        <td>{format(item.played_at, 'D MMM YYYY, hh:mma')}</td>
      </tr>
    );

    const RecentlyPlayed = () => (
      <div className="recently-played">
        <h2>Recent Tracks</h2>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Song title</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{musicHistory.map((e, index) => TableItem(e, index))}</tbody>
        </table>
      </div>
    );


  }
}

export default App;