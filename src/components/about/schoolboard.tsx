import React, { FC } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { tw } from 'twind';
import {school_board} from  '../../../strings/aboutstring'
interface IProps {}

/**
 * @author
 * @function @SchoolBoard
 **/

export const SchoolBoard: FC<IProps> = (props) => {
  return (
    <div className={tw('p-4')}>
      <Grid stackable>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Image src="/images/School-Board.png" size="huge" />
          </Grid.Column>
          <Grid.Column>
            <h1 className={tw('text-4xl font-bold my-5')}>School Board</h1>

            <p className={tw('text-xl')}>
              {school_board}
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};
