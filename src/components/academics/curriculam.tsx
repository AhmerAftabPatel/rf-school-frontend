import React, { FC } from 'react';
import { AcademicsInfo } from './academicinfo';
import { tw } from 'twind';
import styled from 'styled-components'
import BaseHeading from '@/base/BaseHeader';
interface IProps {
  curriculum : any
}

/**
 * @author
 * @function @Curriculam
 **/

const Curriculam: FC<IProps> = ({curriculum}) => {
  return (
    <>
      <div>
        <div className={tw(`mb-5 text-center`)}>
          <h2 className={tw(`mt-2 text-5xl lg:text-7xl font-bold tracking-tight text-blue-900`)} >Curriculum</h2>
        </div>
        <AcademicsInfo type='general' curriculum={curriculum}/>
      </div>
    </>
  );
};



export default Curriculam;
