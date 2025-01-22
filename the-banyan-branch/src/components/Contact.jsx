import React from "react";
import { useSelector } from "react-redux";
import {
  configurationSelector,
  contactsSelector,
} from "../redux/selector/selector";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const Contact = ({ sectionRefs }) => {
  const { contactsData } = useSelector(contactsSelector);
  const { configurationData } = useSelector(configurationSelector);

  if (!configurationData.contact)
    return (
      <section className="py-16 bg-white animate-pulse">
        <div className="container mx-auto px-4">
          <div className="h-12 bg-tertiary rounded w-1/2 mx-auto mb-8"></div>
          <div className="max-w-md mx-auto">
            <div className="h-6 bg-tertiary rounded w-3/4 mx-auto mb-4"></div>
            <div className="my-2 text-center">
              <div className="h-4 bg-tertiary rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-tertiary rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-tertiary rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-tertiary rounded w-3/4 mx-auto mb-2"></div>
            </div>
          </div>
        </div>
      </section>
    );

  return (
    <section ref={sectionRefs?.contact} className="py-16 bg-inherit">
      <div className="container mx-auto px-4">
        <TextGenerateEffect
          words={
            configurationData?.contact && configurationData?.contact[0]?.title
          }
          className="text-3xl  font-semibold text-center text-textBase mb-8"
        />
        <div className="max-w-md mx-auto">
          <p className="text-center text-textSecondary mb-4">
            {configurationData?.contact &&
              configurationData?.contact[0]?.description}
          </p>
          <div className="my-2 text-center">
            <p className="text-textBase">{contactsData.name}</p>
            <p className="text-textBase">{`Email: ${contactsData.email}`}</p>
            <p className="text-textBase">{`Phone: ${contactsData.phone}`}</p>
            <p className="text-textBase">{contactsData.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
