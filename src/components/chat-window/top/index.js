import React, { memo } from 'react';
import { useCurrentRoom } from '../../../context/current-room.context';
import { Link } from 'react-router-dom';
import { Icon, ButtonToolbar } from 'rsuite';
import { useMediaQuery } from '../../../hooks/custom-hooks';
import RoomInfoBtnModal from './RoomInfoBtnModal';

const Top = () => {
  // custom helper hook from current-room-context which has an arg - selector
  // for selector, we are going to pass state & pick object's name key
  // v for value which is a reference to object, can't access object directly

  // now, we only consume 'name' from context object,
  // this component will not get re-render when other context object's values get changed
  const name = useCurrentRoom(v => v.name); // arg - selector
  // console.log(name)

  // custom media query hook
  const isMobile = useMediaQuery('(max-width: 992px)');

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex align-items-center">
          <Icon
            componentClass={Link}
            to="/"
            icon="arrow-circle-left"
            size="2x"
            className={
              isMobile
                ? 'd-inline-block p-0 mr-2 text-blue link-unstyled'
                : 'd-none'
            }
          />
          <span className="text-disappear">{name}</span>
        </h4>

        <ButtonToolbar className="white-space:no-wrap">todo</ButtonToolbar>
      </div>

      <div className="d-flex justify-content-between align-items-center">
       <span>todo</span>
       <RoomInfoBtnModal />
      </div>
    </div>
  );
};

// Note: need to wrap this component with React.memo for useContextSelector to work
export default memo(Top);
