import React, { FC } from 'react';
import { AcademicsInfo } from './academicinfo';
import { tw } from 'twind';
import styled from 'styled-components';
import BaseHeading from '@/base/BaseHeader';
interface IProps {
  curriculum: any;
  mobile : boolean;
}

/**
 * @author
 * @function @Curriculam
 **/

const Curriculam: FC<IProps> = ({ curriculum, mobile }) => {
  return (
    <>
      <div>
        <div className={tw(`mb-5 text-center`)}>
          <h2 className={tw(`mt-2 lg:text-7xl text-4xl font-bold tracking-tight text-blue-900`)}>Curriculum</h2>
        </div>
        <AcademicsInfo type="general" curriculum={curriculum} mobile={mobile}/>
      </div>
    </>
  );
};

export default Curriculam;
