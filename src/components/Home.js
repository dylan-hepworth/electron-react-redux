import React, { Component } from 'react';
import {
    View,
    Button,
    TitleBar,
    Toolbar,
    SearchField
} from 'react-desktop/macOs';
import { Link } from 'react-router-dom';

const electron = window.require('electron');
// const fs = electron.remote.require('fs');
const {dialog} = electron.remote;

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: null
        }
    }

    handleChange = e => {
        this.setState({
            search: e.target.value
        });
    }

    clearSearch = () => {
        this.setState({
            search: null
        });
    }

    handleClick = () => {
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory', 'multiSelections'],
        });
    }

    render() {
        return (
            <>
                <TitleBar inset>
                    <Toolbar height="43" horizontalAlignment="right">
                    <SearchField
                        placeholder="Search"
                        defaultValue=""
                        onChange={this.handleChange}
                        value={this.state.search}
                        onCancel={this.clearSearch}
                    />
                    </Toolbar>
                </TitleBar>
                <View padding="20px">
                    <Button color="blue" onClick={this.handleClick}>Click Me</Button>
                    <Link to="/idk" title="Some Link">Link Test</Link>
                </View>
            </>
        );
    }
}