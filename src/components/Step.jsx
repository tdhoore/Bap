// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';

const Step = ({store, id}) => {
  return (
    <div
      className='step'
      data-id={id}
      onClick={e => store.handleShowInstruction(e)}
    />
  );
};

export default observer(Step);
