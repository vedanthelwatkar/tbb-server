import React, { useState } from "react";
import { useSelector } from "react-redux";
import { configurationSelector } from "../redux/selector/selector";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Smile, Sparkle, BookOpen } from "lucide-react";
import nature from "../assets/image.png";

const About = ({ sectionRefs }) => {
  const { configurationData } = useSelector(configurationSelector);
  const [activeTab, setActiveTab] = useState("philosophy");

  if (!configurationData.about)
    return (
      <section className="py-32 bg-tertiary animate-pulse">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-textBase mb-8">
            <div className="h-6 bg-tertiary rounded w-1/2 mx-auto"></div>
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="h-64 w-64 rounded-full bg-tertiary md:h-96 md:w-96"></div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="h-4 bg-tertiary rounded w-full"></div>
              <div className="h-4 bg-tertiary rounded w-full"></div>
              <div className="h-4 bg-tertiary rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </section>
    );

  const tabData = {
    philosophy: {
      icon: <Sparkle className="w-6 h-6 text-green-500" />,
      title: "My Philosophy",
    },
    approach: {
      icon: <BookOpen className="w-6 h-6 text-red-500" />,
      title: "My Approach",
    },
    experience: {
      icon: <Smile className="w-6 h-6 text-yellow-500" />,
      title: "My Experience",
    },
  };

  return (
    <section
      ref={sectionRefs?.about}
      className="py-16 pb-0 bg-gradient-to-t from-tertiary to-background"
    >
      <div className="container mx-auto px-4">
        <TextGenerateEffect
          className="text-4xl md:text-5xl font-bold text-center text-primary mb-12"
          words="About Priya"
        />
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar className="w-64 h-64 mx-auto">
              <AvatarImage src={nature} alt="Therapist portrait" />
              <AvatarFallback>TBB</AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="flex-1 space-y-6">
            <Tabs defaultValue="philosophy" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                {Object.entries(tabData).map(([key, { title }]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    onClick={() => setActiveTab(key)}
                    className="data-[state=active]:bg-secondary data-[state=active]:text-textBase"
                  >
                    {title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {configurationData?.about.map((item, index) => (
                <TabsContent key={index} value={Object.keys(tabData)[index]}>
                  <Card>
                    <CardContent className="overflow-auto pt-6 h-[60vh]">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center space-x-4 mb-4"
                      >
                        {tabData[activeTab].icon}
                        <h3 className="text-2xl font-semibold text-textBase">
                          {tabData[activeTab].title}
                        </h3>
                      </motion.div>
                      <p className="text-lg text-textSecondary leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
