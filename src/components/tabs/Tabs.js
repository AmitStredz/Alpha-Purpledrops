// Tabs by @cassidoo
// github.com/cassidoo/react--tabs

import React, { useState, createContext, useContext, Children } from "react";

// Customize your colors
let tabBackgroundColorClass = "bg-white";
let borderColorClass = "border-pink-300";
let hoverBorderColorClass = "hover:border-accent-900";
let textColorClass = "text-black";
let hoverTextColorClass = "hover:text-pink-600";

const TabsContext = createContext();

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

const TabContext = createContext();

function TabList({ children }) {
  const wrappedChildren = Children.map(children, (child, index) => (
    <TabContext.Provider value={index}>{child}</TabContext.Provider>
  ));
  return <ul className="flex flex-wrap justify-start">{wrappedChildren}</ul>;
}

function Tab({ children, isDisabled, ...rest }) {
  const index = useContext(TabContext);
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  const isActive = index === activeIndex;

  let selectedTabClasses = isActive
    ? "text-black bg-white rounded-t-lg"
    : "text-white bg-transparent";

  return (
    <li
      className={`inline-block cursor-pointer font-medium mr-2 p-4  ${selectedTabClasses} ${
        isDisabled
          ? "disabled cursor-not-allowed opacity-50"
          : isActive
          ? `active`
          : ""
      }`}
      onClick={isDisabled ? undefined : () => setActiveIndex(index)}
      key={index + "tab"}
      {...rest}
    >
      {children}
    </li>
  );
}

function TabPanels({ children }) {
  const { activeIndex } = useContext(TabsContext);
  return <div>{children[activeIndex]}</div>;
}

function TabPanel({ children }) {
  return children;
}

function ComposedTabs({ data }) {
  return (
    <Tabs>
      <TabList>
        {data.map((tab, i) => (
          <Tab isDisabled={tab.disabled} key={`tw-tab-${i}`}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {data.map((tab, i) => (
          <TabPanel key={`tw-tabp-${i}`}>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export { Tabs, TabList, Tab, TabPanels, TabPanel, ComposedTabs };
