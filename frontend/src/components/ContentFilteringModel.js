import React,{Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

export default class ContentFilteringModel extends Component {
    constructor(props){
        super(props);
        this.state = {
            classes : null,
        }
        this.useCSSStyles = this.useCSSStyles.bind(this);
    }

    
    componentDidMount () {
        this.useCSSStyles();
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
            <InputLabel id="demo-simple-select-label">Select Model</InputLabel>
              <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.props.model}
                        onChange={this.props.handleSelectChange}
                        >
          <MenuItem value="gb">Naive Gaussian Bayes</MenuItem>
          <MenuItem value="rf">Random Forest</MenuItem>
          <MenuItem value="lr">Logistic Regression</MenuItem>
        </Select>
        </React.Fragment>
        )
    }
} 