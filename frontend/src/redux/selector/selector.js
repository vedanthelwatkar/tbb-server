import { createSelector } from "@reduxjs/toolkit";

export const brandingSelector = createSelector(
  (state) => state,
  (state) => state.BrandingSlice
);

export const configurationSelector = createSelector(
  (state) => state,
  (state) => state.ConfigurationSlice
);

export const contactsSelector = createSelector(
  (state) => state,
  (state) => state.ContactsSlice
);

export const bookSelector = createSelector(
  (state) => state,
  (state) => state.BookSlice
);
