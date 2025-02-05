import { createSelector } from "@reduxjs/toolkit";

export const authSelector = createSelector(
  (state) => state,
  (state) => state.AuthSlice
);

export const getConstantsSelector = createSelector(
  (state) => state,
  (state) => state.GetConstantsSlice
);

export const brandingSelector = createSelector(
  (state) => state,
  (state) => state.BrandingSlice
);

export const profileSelector = createSelector(
  (state) => state,
  (state) => state.ProfileSlice
);

export const configurationSelector = createSelector(
  (state) => state,
  (state) => state.ConfigurationSlice
);

export const analyticsSelector = createSelector(
  (state) => state,
  (state) => state.AnalyticsSlice
);

export const bookSelector = createSelector(
  (state) => state,
  (state) => state.BookSlice
);

export const statusSelector = createSelector(
  (state) => state,
  (state) => state.StatusSlice
);
