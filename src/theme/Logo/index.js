import React from 'react';
import Grid from '../../components/foundation/layout/Grid';

export default function Logo() {
  return (
    <Grid.Row>
      <img
        alt="Logo"
        style={{ display: 'block', margin: 'auto' }}
        src="/images/Logo.png"
      />
    </Grid.Row>
  );
}
