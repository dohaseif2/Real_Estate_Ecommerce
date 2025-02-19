import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/Auth/authSlice';
import userReducer from 'store/userSlice';
import reportUsersReducer from 'store/reportUsersSlice';
import reportPropertiesReducer from 'store/reportPropertiesSlice';
import propertyDetailsReducer from 'store/propertyDetailsSlice';
import propertyReducer from 'store/propertySlice';
import propertyTypesReducer from 'store/propertyTypesSlice';
import propertyTypeReducer from 'store/home/propertyTypeSlice';
import propertiesReducer from 'store/home/propertiesSlice';
import wishlistReducer from 'store/home/wishlistSlice';
import categoriesReducer from 'store/home/categoriesSlice';
import overviewReducer from 'store/overviewSlice';
import userDetailsReducer from 'store/userDetailsSlice';
import amenitiesReducer from 'store/amenitiesSlice';
import locationsReducer from 'store/home/locationsSlice';
import tourRequestReducer from 'store/tourRequestSlice';
import propertySearchReducer from 'store/propertySearchSlice';
import notificationsReducer from 'store/Notifications/notificationsSlice';
import tourReducer from 'store/tourSlice';
import reviewsSlice from 'store/reviewsSlice';
import userPropertyReducer from 'store/userPropertiesSlice';
import propertyUpdatesReducer from 'store/propertyupdateSlice';
import userReviewsReducer from 'store/userReviews/userReviewsSlice';
import averageRatingReducer from 'store/userReviews/averageRatingSlice';

const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    reportUsers: reportUsersReducer,
    reportProperties: reportPropertiesReducer,
    propertyDetails: propertyDetailsReducer,
    property: propertyReducer,
    tourRequest: tourRequestReducer,
    propertyTypes: propertyTypesReducer,
    propertyType: propertyTypeReducer,
    properties: propertiesReducer,
    propertyUpdates: propertyUpdatesReducer,
    propertySearch: propertySearchReducer,
    wishlist: wishlistReducer,
    categories: categoriesReducer,
    overview: overviewReducer,
    userDetails: userDetailsReducer,
    amenities: amenitiesReducer,
    locations: locationsReducer,
    notifications: notificationsReducer,
    tours: tourReducer,
    reviews: reviewsSlice,
    userProperties: userPropertyReducer,
    userReviews: userReviewsReducer,
    averageRating: averageRatingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default reduxStore;
