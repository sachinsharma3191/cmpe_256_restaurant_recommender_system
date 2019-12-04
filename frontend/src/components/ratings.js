import React,{Component} from 'react';import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

class Ratings extends Component {
    constructor(props){
        super(props);
        this.state = {
            filtering : '',
            username: '',
            recommendations: [],
            classes : null
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.showRecommendations = this.showRecommendations.bind(this);
    }

    componentDidMount(){
        this.useCSSStyles();
    }

    handleSelectChange(event) {
        this.setState({filtering : event.target.value})
    }
    
    handleInputChange(event){
        this.setState( {username : event.target.value});
    }

    showRecommendations(){

    }
    
    useCSSStyles() {
        const useStyles = makeStyles(theme => ({
            formControl: {
              margin: theme.spacing(1),
              minWidth: 120,
            },
            selectEmpty: {
              marginTop: theme.spacing(2),
            },
          }));
          return useStyles;
    }

    render(){
        const classes = this.useCSSStyles();
        return (
          <React.Fragment>
              
    <form className={classes.formControl} noValidate autoComplete="off">
<TextField id="standard-basic" label="Enter Username"onChange={this.handleInputChange} />
<br/><br/>
<InputLabel id="demo-simple-select-label">Filtering</InputLabel><Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.filtering}
          onChange={this.handleSelectChange}
        >
          <MenuItem value="collaborative">Collaborative Filtering</MenuItem>
          <MenuItem value="content">Content Filtering</MenuItem>
        </Select>
        <br/>
        <br/>
        <Button variant="contained" color="primary">
        Show Recommendations
      </Button>
      </form>
         </React.Fragment>);
    }
}

export default Ratings;