import React from "react";

type HeaderContentProps = {
  mainContent: string;
  infoContent: string;
};

const HeaderContent: React.FC<HeaderContentProps> = (
  props: HeaderContentProps
) => {
  return (
    <div className="flex-col text-2xl mt-28">
      <h2 className="font-bold uppercase text-center">
        <span className="border-b-2 pb-2">{props.mainContent}</span>
      </h2>
      <p className="mt-5 text-center text-sm text-slate-600">
        {props.infoContent}
      </p>
    </div>
  );
};

export default HeaderContent;
