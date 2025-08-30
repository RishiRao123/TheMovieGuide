import React from "react";
import Header from "../components/Header";
import PopularSection from "../features/Movies/PopularSection";
import TrendingTvSection from "../features/TvSeries/TrendingTvSection";
import TopRatedSection from "../features/Movies/TopratedSection";
import TrendingSection from "../features/Movies/TrendingSection";
import UpComingSection from "../features/Movies/UpComingSection";
import Section  from "../components/Section";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <TrendingSection></TrendingSection>
      <PopularSection></PopularSection>
      <TopRatedSection></TopRatedSection>
      <TrendingTvSection></TrendingTvSection>
      <UpComingSection></UpComingSection>
      <Section></Section>
    </div>
  );
};

export default Home;
