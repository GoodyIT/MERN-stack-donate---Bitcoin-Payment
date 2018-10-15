import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import TextField from '@material-ui/core/TextField';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProjectItem from './ProjectItem';

import './App.css';
import '../../assets/css/cards_gallery.css';
import { fetchProjects } from './AppActions';

class UserBrowseProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            search: '',
            country: '',
            region: '',
        };

        this.searchProject = this.searchProject.bind(this);
    }

    componentWillMount() {
        if (typeof(window) !== "undefined") {
            const token = window.localStorage.getItem('smartproject');
            if (token == null || token == 'null') {
                browserHistory.push('/signin');
            }
            this.setState({ ...this.state, token});
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchProjects());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.projects !== nextProps.projects && nextProps.projects && nextProps.projects.length > 0) {
            this.setState({ ...this.state, loading: false });
        }
    }
    
    searchProject = name => event => {
        this.setState({
            ...this.state,
            search: event.target.value,
        });
    };

    selectCountry (val) {
        const city = val ? this.state.city : '';
        this.setState({ country: val, city });
    }
    
    selectRegion (val) {
        this.setState({ city: val });
    }

    gotoHome = (id) => {
        browserHistory.push(`/${id}`);
    }

    filterData = () => {
        const newData = [];
        const keyword = this.state.search.toLowerCase();
        for (const idx in this.props.projects) {
            const val = this.props.projects[idx];
            if (val._id.toLowerCase().includes(keyword) || val.title.toLowerCase().includes(keyword) || val.subTitle.toLowerCase().includes(keyword) || val.shortDescription.includes(keyword) || val.address.country.includes(keyword) || val.address.city.includes(keyword)) {
                if (this.state.country) {
                    if (this.state.country == val.address.country) {
                        newData.push(val);
                    }
                } else if (this.state.city) {
                    if (this.state.city == val.address.city) {
                        newData.push(val);
                    }
                } else {
                    newData.push(val);
                }
            }
        }
        return newData;
    }

    render() {
        const { country, region } = this.state;
        let gallery = '';
        const newProjects = this.filterData();
        if (newProjects) {
            gallery = newProjects.map(project => {
                return <ProjectItem project={project} gotoHome={this.gotoHome}/>
            });
        }

        return (
            <section className="gallery-block cards-gallery">
                <div className=" mt-5" style={{ paddingTop: '70px' }}>
                    <Header activePage={this.state.activePage} token={this.state.token}/>
                    {this.state.loading && <div>...loading</div>}
                    <div className="heading text-center">
                        <h2 className="fb text-uppercase">Global's #1 Project Funding</h2>
                    </div>
                    {!this.state.loading && <div className="row ml-1 mb-sm-5 d-flex align-items-baseline">
                        <TextField
                            id="outlined-search"
                            label="Search Project"
                            className="ml-3 ml-sm-0"
                            type="search"
                            value={this.state.search}
                            placeholder="id, location or title"
                            onChange={this.searchProject('')}
                            margin="normal"
                        />
                        <div className="mb-sm-2" style={{ height: '36px' }}>
                            <CountryDropdown
                                defaultOptionLabel="Choose a country"
                                value={this.state.country}
                                onChange={(val) => this.selectCountry(val)}
                                style={{
                                    fontSize: '1.25rem',
                                    padding: '0.25rem',
                                    marginLeft: '1rem' }} />
                            <RegionDropdown
                                country={country}
                                value={this.state.city}
                                blankOptionLabel="No country selected."
                                defaultOptionLabel="Now select a region"
                                style={{
                                    fontSize: '1.25rem',
                                    padding: '0.25rem' }}
                                onChange={(val) => this.selectRegion(val)} />
                        </div>
                        <div className="row">
                            {gallery}
                        </div>
                    </div>}
                    <Footer />
                </div>
            </section>
        );
    }
}

UserBrowseProjects.propTypes = {
    dispatch: PropTypes.func.isRequired,
      // intl: PropTypes.object.isRequired,
  };
  
  // Retrieve data from store as props
function mapStateToProps(state) {
    return {
        projects: state.app.projects,
    };
}

export default connect(mapStateToProps)(UserBrowseProjects);
