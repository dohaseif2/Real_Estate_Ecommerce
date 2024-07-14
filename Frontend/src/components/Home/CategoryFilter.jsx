import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, ButtonBase } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import { fetchCategories } from 'store/home/categoriesSlice';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VillaIcon from '@mui/icons-material/Villa';
import StudioIcon from '@mui/icons-material/Business';
import OfficeIcon from '@mui/icons-material/Work';
import TownhouseIcon from '@mui/icons-material/Home';
import CommercialIcon from '@mui/icons-material/Domain';

const iconMapping = {
  Apartment: <ApartmentIcon  style={{ fontSize: 80 }}/>,
  Villa: <VillaIcon style={{ fontSize: 80 }}/>,
  Studio: <StudioIcon style={{ fontSize: 80 }}/>,
  Office: <OfficeIcon style={{ fontSize: 80 }}/>,
  House: <TownhouseIcon style={{ fontSize: 80 }}/>,
  Commercial: <CommercialIcon style={{ fontSize: 80 }}/>
};

const StyledButton = styled(ButtonBase)(({ theme, active }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: active ? '#EE2027' : '#fff',
  color: active ? '#fff' : '#000',
  padding: theme.spacing(0.5),
  margin: theme.spacing(1),
  transition: 'background-color 0.3s, color 0.3s',
  width: '200px',
  height: '200px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  '&:hover': {
    backgroundColor: '#EE2027',
    color: '#fff',
  },
  textAlign: 'center',
}));

const StyledSlider = styled(Slider)({
  width: '100%',
  '.slick-slide': {
    display: 'flex',
    justifyContent: 'center',
  },
  '& .slick-prev, & .slick-next': {
    zIndex: 1,
    backgroundColor: 'transperant',
    borderRadius: '10px',
    height: '40px',
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .slick-prev:before, & .slick-next:before': {
    color: '#EE2027',
    fontSize: '35px',
  },
});

const ArrowWrapper = styled(Box)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  '&.prev': {
    left: '-20px',
  },
  '&.next': {
    right: '-20px',
  },
});

const ViewAllLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: '#000000', // Fallback color
  fontSize:'18px',
  fontWeight:'bold',
  '&:hover': {
    color:  '#000000', // Fallback color
  },
  '&::after': {
    content: '""',
    display: 'block',
    width: '0',
    height: '2px',
    background:  '#EE2027', // Fallback color
    transition: 'width 0.3s',
  },
  '&:hover::after': {
    width: '100%',
  },
}));

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(state => state.categories.list);
  const status = useSelector(state => state.categories.status);
  const [activeCategory, setActiveCategory] = useState(null);
  const [type, setType] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleCategoryClick = (categoryType) => {
    setType(categoryType);
    navigate(`/properties?pt=${categoryType}`);
  };

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <ArrowWrapper className="next" onClick={onClick}>
        <div className="slick-next" />
      </ArrowWrapper>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <ArrowWrapper className="prev" onClick={onClick}>
        <div className="slick-prev" />
      </ArrowWrapper>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: categories.length < 4 ? categories.length : 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: categories.length < 2 ? categories.length : 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Box position="relative" p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography sx={{fontSize:'16px', fontWeight: 'bold'}} color="#EE2027">PROPERTY TYPE</Typography>
      </Box>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Try Searching For</Typography>
         <ViewAllLink href="/all-services">
          View All Services →
        </ViewAllLink>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" position="relative">
        <StyledSlider {...settings}>
          {categories.map((category) => (
            <div key={category.id}>
              <StyledButton
                onClick={() => handleCategoryClick(category.id)}
                active={activeCategory === category.name ? 1 : 0}
              >
                {iconMapping[category.name] || <ApartmentIcon />}
                <Typography variant="h6">{category.name}</Typography>
                <Typography variant="body2">{category.properties.length} Properties</Typography>
              </StyledButton>
            </div>
          ))}
        </StyledSlider>
      </Box>
    </Box>
  );
};

export default CategoryFilter;
