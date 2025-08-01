import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedSection from '../Featured/FeaturedSection';
import About from '../About/About';
import Testimonials from '../Testimonials/Testimonials';
import FeaturedClasses from '../FeaturedClass/FeaturedClasses';
import Newsletter from '../Newsletter/Newsletter';
import TeamSection from '../TeamSection/TeamSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <About></About>
            <FeaturedClasses></FeaturedClasses>
            <Testimonials></Testimonials>
            <Newsletter></Newsletter>
            <TeamSection></TeamSection>
        </div>
    );
};

export default Home;