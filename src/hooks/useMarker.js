import useMarkerFromFirebase from './useMarkerFromFirebase';
import useMarkerFromKaKao from './useMarkerFromKakao';

export default function useMarker({ kakao, searchAddress }) {
  const { markersFromFirebase, isLoadingFromFirebase } = useMarkerFromFirebase();
  const { refetch, markersFromKaKao, isLoadingFromKakao } = useMarkerFromKaKao({ kakao, searchAddress });

  const markers = markersFromKaKao ? markersFromKaKao : []; 

  return {
    refetch,
    markers,
    isLoadingFromFirebase,
    isLoadingFromKakao,
    markersFromFirebase,
    markersFromKaKao
  };
}
