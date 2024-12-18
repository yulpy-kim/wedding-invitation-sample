import React, { useEffect, useRef, useState } from 'react';
import data from '../assets/image_data.json';
import pinIcon from '../assets/location-pin.png';
import brideAccountData from '../assets/bride_account_number_data.json';
import groomAccountData from '../assets/groom_account_number_data.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container as MapDiv, NaverMap, Marker, useNavermaps} from 'react-naver-maps';
import '../App.css';
import ImageModal from '../components/imageModal';
import AccountModal from '../components/accountModal';
import mainphoto from '../pages/함준영님-34.jpg'
import subphoto from '../pages/sub.jpg'
import ment from '../pages/IMG_0236.jpg'
import { Snackbar, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Snowfall from 'react-snowfall';


const FadeInSection = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // 중복 관찰 방지
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
};


function Bride() {
  // state for image modal
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  // state for account modal
  const [ buttonText, setButtonText ] = useState("복사하기"); 
  const [ clickedAccountData, setClickedAccountData ] = useState(null);
  const [ copiedAccount, setCopiedAccount ] = useState(null);

  const navermaps = useNavermaps()

  const handleClick = (item, index) => {
    //setCurrentIndex(index);
    //setClickedImg(item.link);
  };
  const accountClick = (account_data) => {
    setClickedAccountData(account_data.data);
  };


  const handleRotationRight = () => {
    const totalLength = data.data.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      const newUrl = data.data[0].link;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = data.data.filter((item) => {
      return data.data.indexOf(item) === newIndex;
      });
    const newItem = newUrl[0].link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };
  
  const handleRotationLeft = () => {
    const totalLength = data.data.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      const newUrl = data.data[totalLength-1].link;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = data.data.filter((item) => {
      return data.data.indexOf(item) === newIndex;
      });
    const newItem = newUrl[0].link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="outside">
      <div className='main container'>
        <div className="row justify-content-md-center">
          <Snowfall color="white" snowflakeCount={50}/>
          <div className="col col-md-2 col-lg-3">
          </div>

          <div className="col-md">
            <div className='mainsection'>
              <div>
                <img src={mainphoto} className='main-image' alt='t1'></img>
              </div>
              <FadeInSection>
                <div className='mainsection-text'>
                  <div className='mainsection-text-2'>
                    함준영 <span className='text2-inner'> 그리고 </span> 김유리
                  </div>
                  <div className='mainsection-text-3'>2025. 02. 08 토요일 오후 4시 30분<br/>드레스가든 청담</div>
                </div>
              </FadeInSection>
            </div>
            <div className='invitation-section'>
              <FadeInSection>
                <div className='invitation-section-text2'>
                  마음을 담아<br/>
                  소중한 분들을 초대합니다.<br/>
                  ㅡ<br/><br/>
                  나랑 놀자 어디 가지 말고 그리울 틈 없도록<br/>
                  나랑 살자 아주 오랫동안 우리 같이 살자<br/>
                  검정치마 - 나랑 아니면 中<br/><br/>
                  같이 있을 때 가장 편안하고 같이 놀 때 제일 즐겁습니다.<br/>
                  평생 느끼고 싶은 감정이기에 앞으로를 약속하고자 합니다.<br/><br/>
                  저희의 새로운 시작을 그려나갈 첫 장,<br/>
                  늘 곁에서 아껴주신 감사한 분들을 모습니다.<br/>
                </div>
                <div className='invitation-section-text3'>
                  함형인・최금란<span className='text3-inner'>의 아들</span> 준영
                </div>
                <div className='invitation-section-text3'>
                  김기태・박재영<span className='text3-inner'>의 딸</span> 유리
                </div>
              </FadeInSection>
            </div>
            <div className='gallery-section'>
              <FadeInSection>
                <div className='gallery-section-text'>
                  GALLERY
                </div>
              </FadeInSection>
            </div>
            <FadeInSection>
              <div>
                <div className='gallery-image-list-wrapper row'>
                    {data.data.map((item, index) => (
                      <div key={index} className='col-4'>
                        <img className='gallery-image' src={subphoto} alt={item.text} onClick={()=> handleClick(item, index)}/>
                      </div>
                    ))}
                </div>
                {clickedImg && <ImageModal 
                clickedImg={clickedImg}
                handleRotationRight={handleRotationRight}
                handleRotationLeft={handleRotationLeft}
                setClickedImg={setClickedImg}
                />}
              </div>
            </FadeInSection>
            <div className='location-section'>
              <FadeInSection>
              <div className='location-section-text1'>
                LOCATION
              </div>
              </FadeInSection>
            </div>
            <div className='location-map-section'>
              <MapDiv
                style={{
                  width: '100%',
                  height: '350px'
                }}
              >
                <NaverMap 
                  defaultCenter={new navermaps.LatLng(37.5206757,127.0558977)}
                  defaultZoom={18}>
                </NaverMap>
                <div></div>
              </MapDiv>
            </div>
            <FadeInSection>
            <div className='location-how-publictrans-section'>
              <div className='location-how-publictrans-section-text1'>위치</div>
              <div className='location-how2-section-text2'>서울 강남구 영동대로 707</div>
            </div>
            <div className='location-how-publictrans-section'>
              <div className='location-how-publictrans-section-text1'>대중교통</div>
              <div className='location-how2-section-text2'>청담역 13번 출구</div>
            </div>
            <div className='location-how-publictrans-section'>
              <div className='location-how-publictrans-section-text1'>주차</div>
              <div className='location-how2-section-text2'>건물 내 기계식 주차</div>
            </div>
            </FadeInSection>
            <FadeInSection>
            <div className='congratulatory-section'>
              <div className='congratulatory-section-text'>마음 전하실 곳</div>
                <div 
                  className='congratulatory-section-btn' 
                  onClick={() => accountClick(groomAccountData)}>신랑측</div>
                <div 
                  className='congratulatory-section-btn'
                  onClick={() => accountClick(brideAccountData)}>신부측</div>
            </div>
            </FadeInSection>
            {clickedAccountData && <AccountModal 
              clickedAccountData={clickedAccountData}
              setClickedAccountData={setClickedAccountData}
              copiedAccount={copiedAccount}
              setCopiedAccount={setCopiedAccount}
              buttonText={buttonText}
              setButtonText={setButtonText}
              />}
          </div>
          <img src={ment} className='main-image' alt='t1'></img>
          <div className="col col-md-2 col-lg-3">
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Bride;
