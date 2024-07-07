/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  FormGroup,
  RadioGroup,
  Radio,
  CardMedia,
  IconButton,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import governorates from 'assets/governorates.json';
import cities from 'assets/cities.json';
import { addProperty, clearState } from 'store/propertySlice';
import { fetchAmenities } from '../store/amenitiesSlice';
import { fetchPropertyTypes } from '../store/propertyTypesSlice';
import validationSchema from '../utils/validationSchema';

const FormWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f0f2f5',
  padding: '50px 0',
});

const ImageContainer = styled('div')({
  position: 'relative',
  width: '100%',
});

const DeleteButton = styled(IconButton)({
  position: 'absolute',
  top: '-3px',
  right: '0px',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});

function AddProperty() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { amenities, status, error } = useSelector((state) => state.amenities);
  const { propertyTypes, status: propertyTypesStatus } = useSelector(
    (state) => state.propertyTypes
  );

  const [cityOptions, setCityOptions] = useState([]);
  const selectedState = watch('state');
  const selectedListingType = watch('listing_type');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedState) {
      const filteredCities = cities.filter(
        (city) => city.governorate_id === selectedState
      );
      setCityOptions(filteredCities);
      setValue('city', '');
    } else {
      setCityOptions([]);
    }
  }, [selectedState, setValue]);

  useEffect(() => {
    dispatch(fetchAmenities());
    dispatch(fetchPropertyTypes());
  }, [dispatch]);

  const onSubmit = (data) => {
    const formData = new FormData();

    // Append other fields
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'images' && key !== 'amenities') {
        formData.append(key, value);
      }
    });

    // Append images
    if (data.images) {
      data.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    // Append amenities as an array
    if (Array.isArray(data.amenities)) {
      data.amenities.forEach((amenity, index) => {
        formData.append(`amenities[${index}]`, amenity);
      });
    }

    setIsSubmitting(true);
    dispatch(addProperty(formData));
  };

  useEffect(() => {
    if (isSubmitting) {
      if (status === 'succeeded') {
        toast.success('Property added successfully!');
        reset();
        setSelectedImages([]);
        dispatch(clearState());
        setIsSubmitting(false);
        navigate('/myproperties');
      }
      if (status === 'failed') {
        toast.error(error || 'Failed to add property!');
        dispatch(clearState());
        setIsSubmitting(false);
      }
    }
  }, [status, error, dispatch, reset, isSubmitting]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
    setValue('images', [...selectedImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    setValue('images', updatedImages);
  };

  return (
    <FormWrapper>
      <Card sx={{ maxWidth: 700, width: '100%', boxShadow: 5 }}>
        <Typography variant="h4" gutterBottom align="center" padding={3}>
          Add Property
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  fullWidth
                  {...register('title')}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  {...register('description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <FormControl fullWidth error={!!errors.state}>
                  <InputLabel id="state-label" htmlFor="state">
                    State
                  </InputLabel>
                  <Select
                    labelId="state-label"
                    id="state"
                    {...register('state')}
                    label="State"
                    defaultValue=""
                  >
                    {governorates.map((gov) => (
                      <MenuItem key={gov.id} value={gov.id}>
                        {gov.governorate_name_en}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.state && (
                    <Typography color="error">
                      {errors.state.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6} md={3}>
                <FormControl fullWidth error={!!errors.city}>
                  <InputLabel id="city-label" htmlFor="city">
                    City
                  </InputLabel>
                  <Select
                    labelId="city-label"
                    id="city"
                    {...register('city')}
                    label="City"
                    defaultValue=""
                    disabled={!selectedState}
                  >
                    {cityOptions.map((city) => (
                      <MenuItem key={city.id} value={city.city_name_en}>
                        {city.city_name_en}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.city && (
                    <Typography color="error">{errors.city.message}</Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Street"
                  id="street"
                  fullWidth
                  {...register('street')}
                  error={!!errors.street}
                  helperText={errors.street?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Area"
                  type="number"
                  id="area"
                  fullWidth
                  {...register('area')}
                  error={!!errors.area}
                  helperText={errors.area?.message}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.property_type_id}>
                  <InputLabel id="type-label" htmlFor="property_type_id">
                    Type
                  </InputLabel>
                  <Controller
                    name="property_type_id"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        labelId="type-label"
                        id="property_type_id"
                        {...field}
                        label="Type"
                      >
                        {propertyTypesStatus === 'loading' && (
                          <MenuItem value="" disabled>
                            Loading types...
                          </MenuItem>
                        )}
                        {propertyTypesStatus === 'failed' && (
                          <MenuItem value="" disabled>
                            Error loading types
                          </MenuItem>
                        )}
                        {propertyTypesStatus === 'succeeded' &&
                          propertyTypes.map((type) => (
                            <MenuItem key={type.id} value={type.id}>
                              {type.name}
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  />
                  {errors.property_type_id && (
                    <Typography color="error">
                      {errors.property_type_id.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Rooms"
                  type="number"
                  id="num_of_rooms"
                  fullWidth
                  {...register('num_of_rooms')}
                  error={!!errors.num_of_rooms}
                  helperText={errors.num_of_rooms?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Bathrooms"
                  type="number"
                  id="num_of_bathrooms"
                  fullWidth
                  {...register('num_of_bathrooms')}
                  error={!!errors.num_of_bathrooms}
                  helperText={errors.num_of_bathrooms?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" error={!!errors.amenities}>
                  <FormLabel component="legend">Amenities</FormLabel>
                  <FormGroup row>
                    {status === 'loading' && (
                      <Typography>Loading amenities...</Typography>
                    )}
                    {status === 'failed' && (
                      <Typography color="error">{error}</Typography>
                    )}
                    {status === 'succeeded' &&
                      amenities.map((amenity) => (
                        <FormControlLabel
                          key={amenity.id}
                          control={
                            <Checkbox
                              {...register('amenities')}
                              value={amenity.id}
                            />
                          }
                          label={amenity.name}
                          style={{ marginRight: 8 }}
                        />
                      ))}
                  </FormGroup>
                  {errors.amenities && (
                    <Typography color="error">
                      {errors.amenities.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" error={!!errors.listing_type}>
                  <FormLabel component="legend">Listing Type</FormLabel>
                  <RadioGroup row defaultValue="Rent">
                    <FormControlLabel
                      value="rent"
                      {...register('listing_type')}
                      control={<Radio />}
                      label="Rent"
                    />
                    <FormControlLabel
                      value="buy"
                      {...register('listing_type')}
                      control={<Radio />}
                      label="Sell"
                    />
                  </RadioGroup>
                  {errors.listing_type && (
                    <Typography color="error">
                      {errors.listing_type.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={
                    selectedListingType === 'rent' ? 'Price / month' : 'Price'
                  }
                  type="number"
                  id="price"
                  fullWidth
                  {...register('price')}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  id="image-upload"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    fullWidth
                  >
                    Upload Images
                  </Button>
                </label>
                {selectedImages.length > 0 && (
                  <Box mt={2}>
                    <Typography variant="subtitle1">
                      Selected Images:
                    </Typography>
                    <Grid container spacing={2}>
                      {selectedImages.map((image, index) => (
                        <Grid item key={image.name} xs={12} md={4}>
                          <ImageContainer>
                            <Card>
                              <CardMedia
                                component="img"
                                height="200"
                                image={URL.createObjectURL(image)}
                                alt={image.name}
                              />
                              <DeleteButton
                                color="secondary"
                                onClick={() => handleRemoveImage(index)}
                              >
                                <RemoveCircleOutline />
                              </DeleteButton>
                            </Card>
                          </ImageContainer>
                        </Grid>
                      ))}
                      <Grid item xs={12} md={4}>
                        <label htmlFor="image-upload">
                          <Card
                            sx={{
                              height: '200px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              border: '1px dashed gray',
                            }}
                          >
                            <IconButton
                              color="primary"
                              aria-label="add more images"
                              component="span"
                            >
                              <AddIcon />
                            </IconButton>
                          </Card>
                        </label>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                >
                  Add
                </Button>
                <Button
                  type="reset"
                  variant="contained"
                  onClick={() => setSelectedImages([])}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </FormWrapper>
  );
}

export default AddProperty;
