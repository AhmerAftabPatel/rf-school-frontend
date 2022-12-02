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
      <StyledContainer>
        <div className={tw(`mb-5 text-center`)}>
          {/* <h4 className={tw(`text-base text-indigo-600 font-semibold tracking-wide uppercase`)}>Facilities</h4> */}
          {/* <BaseHeading Heading={"Curriculum"} size="large"/> */}
          <h2 className={tw(`mt-2 text-5xl lg:text-7xl font-bold tracking-tight text-blue-900`)} data-aos="fade-in" >Curriculum</h2>
          {/* <div dangerouslySetInnerHTML={{ __html: facilities[0]?.description }}></div> */}
          {/* <p className={tw('mt-2 text-xl text')}> */}
            {/* Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for */}
            {/* previewing layouts and visual mockups. */}
          {/* </p> */}
        </div>
        <AcademicsInfo type='general' curriculum={curriculum}/>
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.div`{
    // padding
}`

export default Curriculam;
