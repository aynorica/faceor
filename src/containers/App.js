import React, { Component } from 'react';
import { connect } from 'react-redux';
import {setImageUrlLoad, inputLoad, setBoxDetails, loadUserInfo} from './actions';
import Particles from 'react-particles-js';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Navigation from '../components/Navigation/Navigation';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import './App.css';

const mapStateToProps = (state) => {
    return {
        input: state.inputLoad.input,
        imageUrl: state.imageUrlLoad.imageUrl,
        box: state.boxDetails.box,
        user: state.userInfo.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInputChange: (event) => dispatch(inputLoad(event.target.value)),
        onImageURLChange: (text) => dispatch(setImageUrlLoad(text)),
        setBoxDetails: (object) => dispatch(setBoxDetails(object)),
        loadUser: (userObject) => dispatch(loadUserInfo(userObject))
    }
};

const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};

const initialState = {
    route: 'signin',
    isSignedIn: false,
};



class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }




    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    };

    onButtonSubmit = () => {
        const { input, user, onImageURLChange, setBoxDetails } = this.props;
        onImageURLChange(input);

            fetch('https://damp-retreat-33615.herokuapp.com/imageurl', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    input: input
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('https://damp-retreat-33615.herokuapp.com/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(user, { entries: count}))
                        })
                        .catch(console.log);

                }
                setBoxDetails(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    };

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    };



    render() {
        const { isSignedIn, route } = this.state;
        const { user, onInputChange, box, imageUrl, loadUser } = this.props;
        return (
            <div className="App">
                <Particles className='particles'
                           params={particlesOptions}
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                { route === 'home'
                    ? <div>
                        <Logo />
                        <Rank
                            name={user.name}
                            entries={user.entries}
                        />
                        <ImageLinkForm
                            onInputChange={onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition box={box} imageUrl={imageUrl} />
                    </div>
                    : (
                        route === 'signin'
                            ? <Signin loadUser={loadUser} onRouteChange={this.onRouteChange}/>
                            : <Register loadUser={loadUser} onRouteChange={this.onRouteChange}/>
                    )
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
