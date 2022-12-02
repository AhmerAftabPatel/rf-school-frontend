import React, { FC } from 'react';
import { tw } from 'twind';
interface IProps {
  description : string,
  heading : string
}

/**
 * @author
 * @function @Intro
 **/

export const Intro: FC<IProps> = ({heading,description}) => {
  return (
    <div className={tw('p-5')}>
      <h1 className={tw('text-5xl text-blue-600 font-italic')}>{heading}</h1>
      <div className={tw('h-2 w-20 bg-green-600 my-6')} />
      {/* <h1 className={tw('text-center text-6xl text-blue-200 font-bold')}>ADMISSIONS</h1>
      <hr /> */}
      <br />
      <h1 className={tw('text-4xl font-semibold')}>We are here to help</h1>
      <div className={tw('text-xl py-4')}>
        <p>
          {description}
        </p>
      </div>
    </div>
  );
};
