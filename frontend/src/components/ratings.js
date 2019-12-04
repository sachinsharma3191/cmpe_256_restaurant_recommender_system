import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Select from '@material-ui/core/Select';
import CollabFilteringModel from './CollabFilteringModel';
import ConentFilteringModel from './ContentFilteringModel';
import * as data from './data';
import ContentFilteringModel from './ContentFilteringModel';

class Ratings extends Component {
    constructor(props){
        super(props);
        this.state = {
            filtering : '',
            username: '',
            recommendations: [],
            classes : null,
              svd: [],
              svdpp: [],
              als: [],
              showCollabModel : '',
              showContentModel : '',
              showRecommendations : false,
              isCollabFiltering: false,
              isContentFiltering : false,
          
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.showRecommendations = this.showRecommendations.bind(this);
        this.handleCollabModelChange = this.handleCollabModelChange.bind(this);
        this.handleContentModelChange = this.handleContentModelChange.bind(this);
        this.handleRecommendations = this.handleRecommendations.bind(this);
    }

    componentDidMount(){
        this.useCSSStyles();
        this.setState({als : data.als, svd : data.svd, svdpp: data.svdpp});
    }

    handleInputChange(event){
      this.setState( {username : event.target.value});
    }

  
    handleSelectChange(event) {
      this.setState({filtering : event.target.value})
      if("collaborative" === event.target.value){
        this.setState( { isCollabFiltering  : true});
        this.setState( { isContentFiltering : false});
      }
      else if("content" === event.target.value){
        this.setState( { isCollabFiltering  : false});
        this.setState( { isContentFiltering : true});
      }    
    }

    handleCollabModelChange(event){
      this.setState({ showCollabModel : event.target.value});
    }
  
    handleContentModelChange(event){
      this.setState({ showContentModel : event.target.value});
    }

    handleRecommendations(data){
      const {username} = this.state;
      let recommendations = [];
      for(let array of data){
          if(array[0] === username){
              recommendations = array.slice(1,array.length);
          }
      }
      this.setState({recommendations : recommendations});
  }

    showRecommendations(){
      const {als,svd,svdpp} = this.state;
      this.setState({ showRecommendations : true})
         if(this.state.filtering === "collaborative"){
             if(this.state.showCollabModel === "als"){
                this.handleRecommendations(als);
             }
             else if(this.state.showCollabModel === "svd"){
              this.handleRecommendations(svd);
             }
             else if(this.state.showCollabModel === "svdpp"){
              this.handleRecommendations(svdpp);
            }
         }
         else if(this.state.filtering === "content"){
          if(this.state.showContentModel === "gb"){
            console.log("naive bayes");
         }
         else if(this.state.showContentModel === "lr"){
          console.log("logistic regression");
         }
         else if(this.state.showContentModel === "rf"){
          console.log("random forest");
        }
         }
    }
    
    useCSSStyles() {
        const useStyles = makeStyles(theme => ({
          root: {
            flexGrow: 1,
            maxWidth: 752,
          },
          demo: {
            backgroundColor: theme.palette.background.paper,
          },
          title: {
            margin: theme.spacing(4, 0, 2),
          },
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
        const {showRecommendations, isCollabFiltering,isContentFiltering, recommendations} = this.state;
        let subFilter = null;
        if(isCollabFiltering){
           subFilter = <div>
                        <CollabFilteringModel 
                            handleSelectChange = {(event) => this.handleCollabModelChange(event)}
                            model = {this.state.showCollabModel}
                            />
                            <br/><br/>
                          </div>
        }
        if(isContentFiltering){
            subFilter = <div>
                            <ContentFilteringModel
                                  handleSelectChange = {(event) => this.handleContentModelChange(event)}
                                  model = {this.state.showContentModel}/>
                            <br/><br/>
                          </div>
        }
        let restRecomm = null;
        if(showRecommendations){
            restRecomm =     <div>
                                <br/><br/>
                                <Typography variant="subtitle1" gutterBottom>
                                      Recommendations for {this.state.username}
                                </Typography>
                                <List>
                                  {
                                      recommendations.map((recommend,index) => <ListItem key={index}>{recommend}</ListItem>)
                                  }
                                 </List>
                        </div>
          
        }
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
        {
          subFilter
        }
       
        <Button variant="contained" color="primary" onClick = {this.showRecommendations}>
        Show Recommendations
      </Button>
      
      </form>

      {
        restRecomm}
      }
         </React.Fragment>);
    }
}

export default Ratings;