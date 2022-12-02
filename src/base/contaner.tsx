import React, { Children, FC } from 'react'
import {tw,css} from 'twind/css'
const headerstyle = css`
padding : 20px 50px;

@media only screen and (max-width: 600px) {
    padding : 0;
}
`
interface IProps {
    children : React.ReactNode
}

/**
* @author
* @function @Container
**/

const Container = ({children} : IProps) => {
  return (
    <div className={tw(headerstyle)}>{children}</div>
   )
 }

 export default Container;
