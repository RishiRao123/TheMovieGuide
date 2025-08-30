import React, { useState } from "react";

// This component demonstrates a basic tabs implementation
// using only React state and Tailwind CSS.

const SimpleTabs = () => {
  // State to keep track of the currently active tab.
  // 'trending' is the default active tab.
  const [activeTab, setActiveTab] = useState("trending");

  // An array of objects to define the tabs and their content.
  // This makes it easy to add, remove, or modify tabs in the future.
  const tabs = [
    {
      id: "trending",
      label: "Trending",
      content: (
        <div>
          <h3 className='text-xl font-semibold text-white'>Trending Content</h3>
          <p className='mt-2 text-gray-400'>
            This is the content for the trending tab. You can place any
            component or JSX here.
          </p>
        </div>
      ),
    },
    {
      id: "popular",
      label: "Popular",
      content: (
        <div>
          <h3 className='text-xl font-semibold text-white'>Popular Content</h3>
          <p className='mt-2 text-gray-400'>
            Here you'll find the most popular items. This content is different
            from the trending tab.
          </p>
        </div>
      ),
    },
    {
      id: "new",
      label: "New Releases",
      content: (
        <div>
          <h3 className='text-xl font-semibold text-white'>New Releases</h3>
          <p className='mt-2 text-gray-400'>
            Check out the latest releases here. This area is updated frequently.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className='w-full max-w-md mx-auto p-4'>
      {/* This div acts as the TabsList container */}
      <div className='inline-flex h-10 items-center justify-center rounded-md bg-gray-800 p-1'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            // This is the core logic for styling the active tab.
            // We conditionally apply classes based on the activeTab state.
            className={`
              inline-flex items-center justify-center whitespace-nowrap rounded-sm 
              px-3 py-1.5 text-sm font-medium transition-all
              ${
                activeTab === tab.id
                  ? "bg-gray-900 text-white shadow-sm" // Active state styles
                  : "text-gray-400 hover:bg-gray-700/50" // Inactive state styles
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* This div acts as the container for the TabsContent */}
      <div className='mt-4'>
        {tabs.map((tab) => (
          // We conditionally render the content based on the activeTab state.
          // The content for the active tab gets 'block', others get 'hidden'.
          <div
            key={tab.id}
            className={activeTab === tab.id ? "block" : "hidden"}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleTabs;
