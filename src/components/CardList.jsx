import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
// import useMarkerFromFirebase from '../hooks/useMarkerFromFirebase';
import Card from './Card';
import CardFilter from './CardFilter';
import FilteredCardList from './FilteredCardList';
import useMarkerFromFirebase from '../hooks/useMarkerFromFirebase';
import useMarker from '../hooks/useMarker';

function CardList() {
  const { kakao } = window;
  const { searchAddress } = useSelector((state) => state.search);
  const { isFiltered } = useSelector((state) => state.filter);
  const { selectedMarker } = useSelector((state) => state.marker);
  const marker = useSelector((state) => state.marker);
  const { markers } = useMarker({ kakao, searchAddress });
  const [resultMarkers, setResultMarkers] = useState([]);
  const { markersFromFirebase } = useMarkerFromFirebase(searchAddress);

  useEffect(() => {
    setResultMarkers(markersFromFirebase ? markersFromFirebase : []);
  }, [markersFromFirebase]);
  useEffect(() => {
    console.log(markers);
    const resultData = [];
    for (let i = 0; i < marker.crawlingData?.length; i++) {
      resultData.push({ ...markers[i], ...marker.crawlingData[i] });
      setResultMarkers([...resultData]);
    }
  }, [marker.crawlingData]);

  return (
    <StCardListContainer>
      <CardFilter />
      {isFiltered ? (
        <FilteredCardList markers={resultMarkers} />
      ) : (
        <StCardList>
          {resultMarkers?.map((item) => (
            <Card
              key={item.id}
              resultMarkers={item}
              place_name={item.place_name}
              address={item.road_address_name}
              number={item.phone}
              vote={item.vote}
              menus={item.menus}
              bannerImg={item.bannerImg}
              businessHours={item.businessHours}
              id={item.id}
              x={item.x}
              y={item.y}
            />
          ))}
        </StCardList>
      )}
    </StCardListContainer>
  );
}

export default CardList;

const StCardListContainer = styled.section``;

export const StCardList = styled.ul`
  display: flex;
  justify-content: flex-start;
  //

  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  //background-color: aqua;
  @media screen and (max-width: 1763px) {
    width: 840px;
  }
  @media screen and (max-width: 1463px) {
    width: 800px;
  }
  @media screen and (max-width: 1425px) {
    width: 760px;
  }
  @media screen and (max-width: 1383px) {
    width: 680px;
  }
  @media screen and (max-width: 1304px) {
    width: 660px;
  }
  @media screen and (max-width: 1283px) {
    width: 640px;
  }
`;
