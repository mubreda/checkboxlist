import React from 'react';
import styled from 'styled-components';
import MinusIcon from '../../icons/MinusIcon';
import RightIcon from '../../icons/RightIcon';

const Checkboxe = styled.div`
    width: 25px;
    height: 25px;
    border: 2px solid #7f7f82;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &.checkbox-selected{
      border-color: var(--blue);
      background-color: var(--blue);
    }
    &.checkbox-halfselected{
      border-color: var(--blue);
      background-color: var(--blue);
    }
`;

export default function Checkbox({ status = 'unselected' }) {
  const currentStatus = React.useMemo(() => `checkbox-${status}`, [status]);
  const currentIcon = React.useCallback(
    () => (status === 'selected' ? <RightIcon data-testid={`icon-${status}`} /> : <MinusIcon />),
    [status],
  );

  return (
    <Checkboxe role="checkbox" className={`checkbox ${currentStatus}`} aria-checked>
      { status !== 'unselected' && currentIcon()}
    </Checkboxe>
  );
}
