import React from "react";
// import { BuilderComponent } from '@builder.io/react';
import "../../config/builder";

interface BuilderPageProps {
  model?: string;
  content?: unknown;
  url?: string;
}

const BuilderPage: React.FC<BuilderPageProps> = ({
  model = "page",
  content,
  url,
}) => {
  // Builder.io temporarily disabled - return our main app content
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">
        Builder.io Integration Disabled
      </h2>
      <p className="text-gray-400">
        Using native Elite Sports Intelligence Platform instead
      </p>
    </div>
  );
};

export default BuilderPage;
