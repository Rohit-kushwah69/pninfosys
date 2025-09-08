// store.ts
import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from './features/adminAuth/adminAuthSlice'
import { adminAuthApi } from './features/adminAuth/adminAuthApi';
import { sliderApi } from './features/slider/sliderApi';
import { courseApi } from './features/course/courseApi';
import { portfolioApi } from './features/portfolio/portfolioApi';
import { eventApi } from './features/event/eventApi';
import { teamApi } from './features/team/teamApi';
import { internshipApi } from './features/internship/internshipApi';
import { contactApi } from './features/contact/contactApi';
import { learningApi } from './features/learning/learningApi';
import { experienceApi } from './features/experience/experienceApi';
import { studentApi } from './features/student/studentApi';
import { contactCardApi } from './features/contactCard/contactCardApi';
import { courseEnquiryApi } from './features/courseEnquiry/courseEnquiryApi';
import { technologyApi } from './features/technology/technologyApi';



export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [sliderApi.reducerPath]: sliderApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [technologyApi.reducerPath]: technologyApi.reducer,
    [portfolioApi.reducerPath]: portfolioApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [internshipApi.reducerPath]: internshipApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [contactCardApi.reducerPath]: contactCardApi.reducer,
    [learningApi.reducerPath]: learningApi.reducer,
    [experienceApi.reducerPath]: experienceApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [courseEnquiryApi.reducerPath]: courseEnquiryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(adminAuthApi.middleware)
      .concat(sliderApi.middleware)
      .concat(courseApi.middleware)
      .concat(technologyApi.middleware)
      .concat(portfolioApi.middleware)
      .concat(eventApi.middleware)
      .concat(teamApi.middleware)
      .concat(internshipApi.middleware)
      .concat(contactApi.middleware)
      .concat(contactCardApi.middleware)
      .concat(learningApi.middleware)
      .concat(experienceApi.middleware)
      .concat(studentApi.middleware)
      .concat(courseEnquiryApi.middleware)
});

